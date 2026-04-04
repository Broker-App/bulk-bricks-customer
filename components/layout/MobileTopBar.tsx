'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, User } from 'lucide-react';
import { BOTTOM_NAV_TABS } from '@/lib/navigation';
import { useAuth } from '@/contexts/AuthContext';

const PAGE_TITLES: Record<string, string> = {
  '/':              'Bulk Bricks',
  '/properties':    'Properties',
  '/builders':      'Builders',
  '/saved':         'Favourites',
  '/profile':       'Profile',
  '/my-queries':    'My Queries',
  '/my-properties': 'My Properties',
  '/about':         'About Us',
  '/contact':       'Contact Us',
  '/faq':           'FAQ',
  '/privacy':       'Privacy Policy',
  '/terms':         'Terms & Conditions',
  '/refund':        'Refund Policy',
  '/auth/login':    'Sign In',
  '/auth/register': 'Register',
};

function getTitle(pathname: string): string {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname];
  if (pathname.startsWith('/properties/')) return 'Property Details';
  if (pathname.startsWith('/builders/'))   return 'Builder Profile';
  return 'Bulk Bricks';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

// Root tab hrefs — no back button on these
const ROOT_PATHS = new Set([...BOTTOM_NAV_TABS.map(t => t.href), '/']);

const iconBtnStyle: React.CSSProperties = {
  width: '40px', height: '40px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'none', border: 'none', cursor: 'pointer',
  borderRadius: 'var(--radius-md)',
  WebkitTapHighlightColor: 'transparent',
  flexShrink: 0,
  textDecoration: 'none',
};

export function MobileTopBar() {
  const pathname = usePathname();
  const router   = useRouter();
  const { profile, loading } = useAuth();

  const title    = getTitle(pathname);
  const showBack = !ROOT_PATHS.has(pathname);
  const isProfile = pathname === '/profile';

  return (
    <header
      className="mobile-top-bar"
      style={{
        position: 'sticky', top: 0, zIndex: 60,
        alignItems: 'center', height: '54px', padding: '0 8px', gap: '4px',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border-subtle)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Back button or spacer */}
      {showBack ? (
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          style={{ ...iconBtnStyle, color: 'var(--color-terra)' }}
          onTouchStart={e => (e.currentTarget.style.background = 'var(--color-terra-muted)')}
          onTouchEnd={e   => (e.currentTarget.style.background = 'none')}
        >
          <ChevronLeft size={24} strokeWidth={2.5} />
        </button>
      ) : (
        <div style={{ width: '8px', flexShrink: 0 }} />
      )}

      {/* Page title */}
      <p style={{
        flex: 1,
        fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 700,
        color: 'var(--color-text-primary)', letterSpacing: '-0.01em',
        margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {title}
      </p>

      {/* Profile icon — shows initials when logged in */}
      {loading ? (
        /* Skeleton while session resolves */
        <div className="skeleton" style={{ width: '34px', height: '34px', borderRadius: '50%', marginRight: '4px' }} />
      ) : (
        <Link
          href="/profile"
          aria-label="Profile"
          style={{
            ...iconBtnStyle,
            width: '34px', height: '34px',
            borderRadius: '50%',
            border: `2px solid ${isProfile ? 'var(--color-terra)' : 'var(--color-border-default)'}`,
            background: profile
              ? 'var(--color-terra)'
              : isProfile
              ? 'var(--color-terra)'
              : 'transparent',
            color: (profile || isProfile) ? '#FFFFFF' : 'var(--color-text-secondary)',
            marginRight: '4px',
            transition: 'all 0.15s ease',
          }}
        >
          {profile ? (
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.6875rem', fontWeight: 700 }}>
              {getInitials(profile.full_name)}
            </span>
          ) : (
            <User size={17} strokeWidth={2} />
          )}
        </Link>
      )}
    </header>
  );
}
