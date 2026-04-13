import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/my-properties', '/my-queries', '/profile'];

// Auth-only routes — signed-in users should be bounced out
const GUEST_ONLY_ROUTES = ['/auth/login', '/auth/register'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // ── Guest-only guard ──────────────────────────────────────────
  // Signed-in users must not access login / register screens.
  if (user && GUEST_ONLY_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ── Protected-route guard ─────────────────────────────────────
  // Unauthenticated users cannot access personal pages.
  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  if (isProtected && !user) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Role guard ────────────────────────────────────────────────
  // Only customers are allowed in this app.
  if (user && isProtected) {
    const { data: profile } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile && profile.role !== 'customer') {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    // Protected routes (auth required)
    '/my-properties/:path*',
    '/my-queries/:path*',
    '/profile/:path*',
    // Guest-only routes (no auth allowed)
    '/auth/login',
    '/auth/register',
  ],
};
