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
  signOut:  () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  session:  null,
  user:     null,
  profile:  null,
  loading:  true,
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

  // Prevent duplicate fetches on rapid auth state changes
  const fetchingRef = useRef(false);

  // ── Fetch public.users profile ─────────────────────────────────────────────
  const fetchProfile = useCallback(async (userId: string) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .eq('role', 'customer')
        .single();

      if (error || !data) {
        // Non-customer account (builder/admin) — sign them out
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setProfile(null);
        return;
      }

      setProfile(data as Customer);
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
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    // Listen for sign-in / sign-out events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Sign out ───────────────────────────────────────────────────────────────
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    router.push('/');
  }, [supabase, router]);

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext);
}
