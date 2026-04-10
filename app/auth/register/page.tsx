'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle, Phone } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function RegisterPage() {
  const router   = useRouter();
  const supabase = createClient();

  const nameRef     = useRef<HTMLInputElement>(null);
  const emailRef    = useRef<HTMLInputElement>(null);
  const phoneRef    = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmRef  = useRef<HTMLInputElement>(null);

  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState<string | null>(null);
  const [success,     setSuccess]     = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const fullName = nameRef.current!.value.trim();
    const email    = emailRef.current!.value.trim();
    const phone    = phoneRef.current!.value.trim();
    const password = passwordRef.current!.value;
    const confirm  = confirmRef.current!.value;

    // Client-side validation
    if (!fullName) { setError('Please enter your full name.'); return; }
    if (!phone) { setError('Please enter your mobile number.'); return; }
    if (!/^[6-9]\d{9}$/.test(phone)) { setError('Please enter a valid 10-digit mobile number.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone: phone,
          role: 'customer',
        },
        // If email confirmation is enabled in Supabase, the callback route handles it.
        // If disabled, the user is signed in immediately.
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      if (error.message.includes('already registered')) {
        setError('An account with this email already exists. Try signing in.');
      } else {
        setError(error.message);
      }
      return;
    }

    // If email confirmation is OFF → user is signed in immediately, redirect to profile.
    // If email confirmation is ON → show the success/check-email state.
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      router.push('/profile');
      router.refresh();
    } else {
      setSuccess(true);
    }
  };

  // ── Success / Check-email screen ─────────────────────────────────────────────
  if (success) {
    return (
      <div style={{
        minHeight: '100dvh', background: 'var(--color-canvas)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
            padding: '40px 28px', textAlign: 'center',
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'var(--color-success-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <CheckCircle size={28} color="var(--color-success)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700,
              color: 'var(--color-text-primary)', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
              Check your email
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.9rem', margin: '0 0 28px' }}>
              We&apos;ve sent a confirmation link to your email address. Click it to activate your account.
            </p>
            <Link href="/auth/login" className="btn-terra" style={{ padding: '12px 32px', textDecoration: 'none' }}>
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Registration form ─────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100dvh', background: 'var(--color-canvas)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px',
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700,
            color: 'var(--color-terra)', letterSpacing: '-0.02em', margin: 0,
          }}>
            Bulk<span style={{ color: 'var(--color-text-primary)' }}>Bricks</span>
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
          padding: '32px 28px',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700,
            color: 'var(--color-text-primary)', margin: '0 0 6px', letterSpacing: '-0.02em',
          }}>
            Create account
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: '0 0 28px' }}>
            Join Bulk Bricks and find your perfect property
          </p>

          {/* Error banner */}
          {error && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger)',
              borderRadius: 'var(--radius-md)', padding: '12px 14px', marginBottom: '20px',
            }}>
              <AlertCircle size={16} color="var(--color-danger)" style={{ flexShrink: 0 }} />
              <p style={{ color: 'var(--color-danger)', fontSize: '0.875rem', margin: 0 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Full Name */}
            <div>
              <label htmlFor="reg-name" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600,
                color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Full Name
              </label>
              <input
                id="reg-name"
                ref={nameRef}
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your full name"
                className="neuro-input"
                style={{
                  width: '100%', padding: '12px 14px',
                  fontFamily: 'var(--font-ui)', fontSize: '0.9375rem',
                  color: 'var(--color-text-primary)',
                  background: 'none', border: 'none', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600,
                color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Email
              </label>
              <input
                id="reg-email"
                ref={emailRef}
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email address"
                className="neuro-input"
                style={{
                  width: '100%', padding: '12px 14px',
                  fontFamily: 'var(--font-ui)', fontSize: '0.9375rem',
                  color: 'var(--color-text-primary)',
                  background: 'none', border: 'none', outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label htmlFor="reg-phone" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600,
                color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Mobile Number <span style={{ color: 'var(--color-terra)', fontWeight: 700 }}>*</span>
              </label>
              <div className="neuro-input" style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ 
                  padding: '0 14px', 
                  color: 'var(--color-text-muted)', 
                  fontSize: '0.9375rem',
                  borderRight: '1px solid var(--color-border-subtle)',
                  paddingRight: '8px'
                }}>
                  +91
                </span>
                <input
                  id="reg-phone"
                  ref={phoneRef}
                  type="tel"
                  autoComplete="tel"
                  required
                  maxLength={10}
                  placeholder="Enter 10-digit mobile number"
                  className="neuro-input"
                  style={{
                    flex: 1, padding: '12px 14px',
                    fontFamily: 'var(--font-ui)', fontSize: '0.9375rem',
                    color: 'var(--color-text-primary)',
                    background: 'none', border: 'none', outline: 'none',
                  }}
                />
              </div>
              <p style={{ 
                fontSize: '0.75rem', 
                color: 'var(--color-text-muted)', 
                margin: '4px 0 0',
                lineHeight: 1.4
              }}>
                10-digit mobile number starting with 6, 7, 8, or 9
              </p>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600,
                color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Password
              </label>
              <div className="neuro-input" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="reg-password"
                  ref={passwordRef}
                  type={showPass ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={6}
                  placeholder="Create a strong password"
                  style={{
                    flex: 1, padding: '12px 14px',
                    fontFamily: 'var(--font-ui)', fontSize: '0.9375rem',
                    color: 'var(--color-text-primary)',
                    background: 'none', border: 'none', outline: 'none',
                  }}
                />
                <button type="button" onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  style={{ padding: '0 14px', background: 'none', border: 'none',
                    cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="reg-confirm" style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600,
                color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                Confirm Password
              </label>
              <div className="neuro-input" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="reg-confirm"
                  ref={confirmRef}
                  type={showConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  placeholder="Confirm your password"
                  style={{
                    flex: 1, padding: '12px 14px',
                    fontFamily: 'var(--font-ui)', fontSize: '0.9375rem',
                    color: 'var(--color-text-primary)',
                    background: 'none', border: 'none', outline: 'none',
                  }}
                />
                <button type="button" onClick={() => setShowConfirm(v => !v)}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                  style={{ padding: '0 14px', background: 'none', border: 'none',
                    cursor: 'pointer', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center' }}>
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              disabled={loading}
              className="btn-terra"
              style={{ width: '100%', padding: '14px', fontSize: '0.9375rem', marginTop: '4px',
                opacity: loading ? 0.7 : 1 }}
            >
              {loading
                ? <span className="spinner" style={{ borderTopColor: '#fff', borderColor: 'rgba(255,255,255,0.3)' }} />
                : <><UserPlus size={16} strokeWidth={2.5} /> Create Account</>
              }
            </button>
          </form>

          {/* T&C note */}
          <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            By registering you agree to our{' '}
            <Link href="/terms" style={{ color: 'var(--color-terra)', textDecoration: 'none' }}>Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" style={{ color: 'var(--color-terra)', textDecoration: 'none' }}>Privacy Policy</Link>
          </p>

          {/* Footer link */}
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: 'var(--color-terra)', fontWeight: 600, textDecoration: 'none' }}>
              Sign In
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
