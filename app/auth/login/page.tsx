'use client';

import { useState, useRef, Suspense } from 'react';
import { Button } from '@/components/ui/buttons/Button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const next         = searchParams.get('next') ?? '/profile';
  const supabase     = createClient();

  const emailRef    = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email    = emailRef.current!.value.trim();
    const password = passwordRef.current!.value;

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoading(false);
      if (error.message.includes('Invalid login')) {
        setError('Incorrect email or password. Please try again.');
      } else if (error.message.includes('Email not confirmed')) {
        setError('Please confirm your email before signing in.');
      } else {
        setError(error.message);
      }
      return;
    }

    router.push(next);
    router.refresh();
  };

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--color-canvas)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.75rem',
            fontWeight: 700,
            color: 'var(--color-terra)',
            letterSpacing: '-0.02em',
            margin: 0,
          }}>
            Bulk<span style={{ color: 'var(--color-text-primary)' }}>Bricks</span>
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-card)',
          padding: '32px 28px',
        }}>
          {/* Heading */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: '0 0 6px',
            letterSpacing: '-0.02em',
          }}>
            Welcome back
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: '0 0 28px' }}>
            Sign in to your Bulk Bricks account
          </p>

          {/* Error banner */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'var(--color-danger-bg)',
              border: '1px solid var(--color-danger)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              marginBottom: '20px',
            }}>
              <AlertCircle size={16} color="var(--color-danger)" style={{ flexShrink: 0 }} />
              <p style={{ color: 'var(--color-danger)', fontSize: '0.875rem', margin: 0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600,
                  color: 'var(--color-text-secondary)', marginBottom: '8px' }}
              >
                Email
              </label>
              <div className="neuro-input" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="login-email"
                  ref={emailRef}
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your registered email"
                  style={{
                    flex: 1, padding: '12px 14px',
                    fontFamily: 'var(--font-ui)', fontSize: '0.9375rem',
                    color: 'var(--color-text-primary)',
                    background: 'none', border: 'none', outline: 'none',
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600,
                  color: 'var(--color-text-secondary)', marginBottom: '8px' }}
              >
                Password
              </label>
              <div className="neuro-input" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="login-password"
                  ref={passwordRef}
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  style={{
                    flex: 1, padding: '12px 14px',
                    fontFamily: 'var(--font-ui)', fontSize: '0.9375rem',
                    color: 'var(--color-text-primary)',
                    background: 'none', border: 'none', outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  style={{
                    padding: '0 14px', background: 'none', border: 'none',
                    cursor: 'pointer', color: 'var(--color-text-muted)',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              id="login-submit"
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                fontSize: '0.9375rem', marginTop: '4px',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>

          </form>

          {/* Footer link */}
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" style={{ color: 'var(--color-terra)', fontWeight: 600, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </div>

        {/* Back to browse */}
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
          <Link href="/" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
            ← Continue browsing without signing in
          </Link>
        </p>
      </div>
    </div>
  );
}

