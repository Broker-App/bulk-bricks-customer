'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import type { Customer } from '@/types';

// ─── Context Shape ────────────────────────────────────────────────────────────

interface AuthContextValue {
  session:  Session | null;
  user:     User | null;
  profile:  Customer | null;
  loading:  boolean;
  authError: string | null;
  signOut:  () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  session:  null,
  user:     null,
  profile:  null,
  loading:  true,
  authError: null,
  signOut:  async () => {},
  refreshProfile: async () => {},
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const router  = useRouter();
  const supabase = createClient();

  const [session, setSession]   = useState<Session | null>(null);
  const [user,    setUser]      = useState<User | null>(null);
  const [profile, setProfile]   = useState<Customer | null>(null);
  const [loading, setLoading]   = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Prevent duplicate fetches on rapid auth state changes
  const fetchingRef = useRef(false);

  // ── Fetch public.users profile (optional, for UI data) ───────────────────────
  const fetchProfile = useCallback(async (userId: string): Promise<'success' | 'non_customer' | 'error'> => {
    if (fetchingRef.current) return 'error';
    fetchingRef.current = true;
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error || !data) {
        console.warn('Profile not found, but auth continues:', error);
        setProfile(null);
        return 'error';
      }

      // Only set profile if it's a customer account
      if (data.role === 'customer') {
        setProfile(data as Customer);
        return 'success';
      } else {
        // Non-customer account - return status for handling
        setProfile(null);
        return 'non_customer';
      }
    } finally {
      fetchingRef.current = false;
    }
  }, [supabase]);

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id);
  }, [user, fetchProfile]);

  // ── Bootstrap session on mount + subscribe to auth changes ─────────────────
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setAuthError(null); // Clear any previous auth errors
      setLoading(false); // Auth state resolved, profile is optional
      
      // Fetch profile in background (non-blocking)
      if (session?.user) {
        const status = await fetchProfile(session.user.id);
        if (status === 'non_customer') {
          setAuthError('This application is for customers only. Please sign in with a customer account.');
          await supabase.auth.signOut();
          setSession(null);
          setUser(null);
          setProfile(null);
          router.push('/auth/login?error=non_customer');
        }
      }
    }).catch((error) => {
      console.error('Failed to get session:', error);
      setLoading(false);
    });

    // Listen for sign-in / sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setAuthError(null); // Clear any previous auth errors
        
        if (session?.user) {
          // Fetch profile in background (non-blocking)
          const status = await fetchProfile(session.user.id);
          if (status === 'non_customer') {
            setAuthError('This application is for customers only. Please sign in with a customer account.');
            await supabase.auth.signOut();
            setSession(null);
            setUser(null);
            setProfile(null);
            router.push('/auth/login?error=non_customer');
          }
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase, router, fetchProfile]);

  // ── Sign out ───────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    router.push('/');
  }, [supabase, router]);

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, authError, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext);
}
