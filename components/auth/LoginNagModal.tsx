'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usePathname } from 'next/navigation';
import { X, Gift, Star, ArrowRight, LockKeyhole, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/buttons/Button';

const COOLDOWN_MS   = 25 * 60 * 1000; // 25 minutes
const TRIGGER_MS    = 12_000;          // 12 seconds idle on a page

export function LoginNagModal() {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const [show, setShow]   = useState(false);

  useEffect(() => {
    // If auth is resolving or user is signed in — do nothing
    if (loading || user) { setShow(false); return; }
    // Never interrupt the auth flow
    if (pathname.startsWith('/auth')) { setShow(false); return; }
    // Already visible — don't schedule another timer on top of it
    if (show) return;

    const dismissedAt = localStorage.getItem('login_nag_dismissed_at');
    const elapsed     = dismissedAt ? Date.now() - parseInt(dismissedAt, 10) : Infinity;
    const inCooldown  = elapsed < COOLDOWN_MS;

    if (inCooldown) {
      // Schedule the next appearance for when the cooldown actually expires
      // (remaining cooldown + 12-second reading delay)
      const remaining = COOLDOWN_MS - elapsed + TRIGGER_MS;
      const timer = setTimeout(() => setShow(true), remaining);
      return () => clearTimeout(timer);
    }

    // Cooldown has passed — wait for the reading delay then show
    const timer = setTimeout(() => setShow(true), TRIGGER_MS);
    return () => clearTimeout(timer);
  }, [user, loading, pathname, show]);

  if (!show) return null;

  const handleDismiss = () => {
    localStorage.setItem('login_nag_dismissed_at', Date.now().toString());
    setShow(false);
  };

  return (
    /* ── Overlay ────────────────────────────────────────────────── */
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nag-title"
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         9999,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        padding:        '20px 16px',
        background:     'rgba(24, 21, 15, 0.72)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        animation:      'nagFadeIn 0.25s ease',
      }}
    >
      {/* ── Card ── */}
      <div
        style={{
          width:           '100%',
          maxWidth:        '400px',
          background:      'var(--color-surface)',
          border:          '1px solid var(--color-border-subtle)',
          borderRadius:    '20px',
          boxShadow:       'var(--shadow-float)',
          overflow:        'hidden',
          position:        'relative',
          animation:       'nagSlideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      >
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss"
          style={{
            position:   'absolute',
            top:        '14px',
            right:      '14px',
            zIndex:     1,
            padding:    '6px',
            background: 'var(--color-surface-2)',
            border:     '1px solid var(--color-border-subtle)',
            borderRadius: '50%',
            cursor:     'pointer',
            display:    'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color:      'var(--color-text-muted)',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface-3)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-primary)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface-2)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)';
          }}
        >
          <X size={15} strokeWidth={2.5} />
        </button>

        {/* Hero accent bar */}
        <div style={{
          height:     '4px',
          background: 'linear-gradient(90deg, var(--color-terra) 0%, #F4835A 100%)',
        }} />

        <div style={{ padding: '28px 28px 24px' }}>
          {/* Icon */}
          <div style={{
            width:           '52px',
            height:          '52px',
            background:      'var(--color-terra-muted)',
            border:          '1px solid var(--color-terra-border)',
            borderRadius:    '14px',
            display:         'flex',
            alignItems:      'center',
            justifyContent:  'center',
            marginBottom:    '18px',
            color:           'var(--color-terra)',
          }}>
            <LockKeyhole size={24} strokeWidth={2} />
          </div>

          {/* Heading */}
          <h2
            id="nag-title"
            style={{
              fontFamily:    'var(--font-display)',
              fontSize:      '1.4rem',
              fontWeight:    700,
              color:         'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              margin:        '0 0 8px',
            }}
          >
            Unlock Full Access
          </h2>

          <p style={{
            fontFamily:  'var(--font-ui)',
            fontSize:    '0.9rem',
            color:       'var(--color-text-secondary)',
            lineHeight:  1.6,
            margin:      '0 0 22px',
          }}>
            Sign in to view builder contact numbers, save favorites, and get exclusive group-buy discounts.
          </p>

          {/* Perks list */}
          <ul style={{
            listStyle:    'none',
            padding:      0,
            margin:       '0 0 24px',
            display:      'flex',
            flexDirection:'column',
            gap:          '10px',
          }}>
            {[
              'Direct WhatsApp & call access to builders',
              'Save & compare properties across sessions',
              'Early access to group-buy price drops',
            ].map(perk => (
              <li key={perk} style={{
                display:    'flex',
                alignItems: 'flex-start',
                gap:        '10px',
                fontFamily: 'var(--font-ui)',
                fontSize:   '0.8375rem',
                color:      'var(--color-text-secondary)',
              }}>
                <span style={{
                  flexShrink: 0,
                  marginTop:  '1px',
                  width:      '18px',
                  height:     '18px',
                  background: 'var(--color-terra-muted)',
                  borderRadius:'50%',
                  display:    'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Sparkles size={10} color="var(--color-terra)" strokeWidth={2.5} />
                </span>
                {perk}
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Button asChild>
              <Link href="/auth/login" onClick={() => setShow(false)}>
                Sign In
              </Link>
            </Button>

            <button
              onClick={handleDismiss}
              style={{
                background:  'none',
                border:      'none',
                cursor:      'pointer',
                padding:     '10px',
                fontFamily:  'var(--font-ui)',
                fontSize:    '0.8375rem',
                fontWeight:  500,
                color:       'var(--color-text-muted)',
                transition:  'color 0.15s',
                textAlign:   'center',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              Continue exploring as guest
            </button>
          </div>
        </div>
      </div>

      {/* Keyframe animations injected once */}
      <style>{`
        @keyframes nagFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes nagSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </div>
  );
}
