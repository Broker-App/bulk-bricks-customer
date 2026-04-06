'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Mail, CheckCircle, AlertCircle, Loader2, Pencil } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function EditProfilePage() {
  const router = useRouter();
  const supabase = createClient();
  const { profile, user, loading, refreshProfile } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone]       = useState('');
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [success, setSuccess]   = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? '');
      setPhone(profile.phone ?? '');
    }
  }, [profile]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmedName = fullName.trim();
    if (!trimmedName) { setError('Full name cannot be empty.'); return; }

    setSaving(true);
    try {
      const { error: dbError } = await supabase
        .from('users')
        .update({ full_name: trimmedName, phone: phone.trim() || null })
        .eq('id', user!.id);
      if (dbError) throw dbError;
      await refreshProfile();
      setSuccess(true);
      setTimeout(() => router.push('/profile'), 1400);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  /* ── Loading skeleton ───────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--color-terra) 0%, #7a2200 100%)',
          padding: '48px 24px 80px',
        }} />
        <div style={{ maxWidth: '480px', margin: '-48px auto 0', padding: '0 20px 56px' }}>
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
            padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '16px',
          }}>
            {[80, 20, 48, 48, 48, 48].map((h, i) => (
              <div key={i} className="skeleton" style={{
                height: `${h}px`,
                width: i === 0 ? '80px' : i === 1 ? '50%' : '100%',
                borderRadius: i === 0 ? '50%' : '10px',
                margin: i === 0 ? '0 auto' : undefined,
              }} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Success flash ──────────────────────────────────────────────────────── */
  if (success) {
    return (
      <div style={{
        background: 'var(--color-canvas)', minHeight: '100dvh',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
      }}>
        <div style={{
          background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
          padding: '56px 32px', textAlign: 'center', maxWidth: '340px', width: '100%',
        }}>
          <div style={{
            width: '68px', height: '68px', borderRadius: '50%',
            background: 'var(--color-success-bg)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
          }}>
            <CheckCircle size={32} color="var(--color-success)" strokeWidth={2} />
          </div>
          <p style={{
            fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
            color: 'var(--color-text-primary)', margin: '0 0 8px',
          }}>
            Profile Updated!
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
            Redirecting you back…
          </p>
        </div>
      </div>
    );
  }

  /* ── Main form ──────────────────────────────────────────────────────────── */
  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-terra) 0%, #7a2200 100%)',
        padding: '44px 24px 80px',
      }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <p style={{
            color: 'rgba(255,255,255,0.55)', fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 5px',
          }}>
            Account
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.25rem)',
            fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em',
          }}>
            Edit Profile
          </h1>
        </div>
      </div>

      {/* Single unified card */}
      <div style={{ maxWidth: '480px', margin: '-52px auto 0', padding: '0 20px 64px' }}>
        <form
          onSubmit={handleSave}
          noValidate
          style={{
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}
        >
          {/* ── Avatar strip ─────────────────────────────────────────────── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '16px',
            padding: '24px 28px 20px',
            borderBottom: '1px solid var(--color-border-subtle)',
            background: 'linear-gradient(160deg, var(--color-terra-muted) 0%, var(--color-surface-2) 100%)',
          }}>
            {/* Avatar circle */}
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', flexShrink: 0,
              background: 'var(--color-terra)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            }}>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '1.25rem',
                fontWeight: 700, color: '#fff', letterSpacing: '-0.02em',
              }}>
                {profile ? getInitials(fullName || profile.full_name) : '…'}
              </span>
            </div>
            {/* Copy */}
            <div>
              <p style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: '1rem', color: 'var(--color-text-primary)',
                margin: '0 0 2px',
              }}>
                {profile?.full_name ?? 'Your Profile'}
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Update your personal details
              </p>
            </div>
            {/* Edit pencil badge */}
            <div style={{
              marginLeft: 'auto', width: '36px', height: '36px', borderRadius: '50%',
              background: 'var(--color-terra)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Pencil size={15} color="#fff" strokeWidth={2.5} />
            </div>
          </div>

          {/* ── Fields ───────────────────────────────────────────────────── */}
          <div style={{ padding: '24px 28px 0', display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Error */}
            {error && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: '10px',
                padding: '12px 14px',
                background: 'var(--color-danger-bg)',
                border: '1px solid var(--color-danger)',
                borderRadius: 'var(--radius-md)',
              }}>
                <AlertCircle size={15} color="var(--color-danger)" style={{ flexShrink: 0, marginTop: '1px' }} />
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-danger)', lineHeight: 1.5 }}>
                  {error}
                </span>
              </div>
            )}

            {/* Full Name */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="edit-full-name" style={labelStyle}>
                Full Name <span style={{ color: 'var(--color-danger)' }}>*</span>
              </label>
              <div className="neuro-input" style={{ position: 'relative' }}>
                <input
                  id="edit-full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                  disabled={saving}
                  style={{ padding: '10px 12px' }}
                />
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="edit-phone" style={labelStyle}>
                Phone{' '}
                <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>
                  (optional)
                </span>
              </label>
              <div className="neuro-input" style={{ position: 'relative' }}>
                <div style={iconWrap}>
                  <Phone size={15} color="var(--color-text-muted)" />
                </div>
                <input
                  id="edit-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  disabled={saving}
                  style={{ padding: '10px 12px 10px 30px' }}
                />
              </div>
            </div>

            {/* Email — read-only */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="edit-email" style={labelStyle}>
                Email{' '}
                <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>
                  (cannot be changed)
                </span>
              </label>
              <div className="neuro-input" style={{ position: 'relative', opacity: 0.55 }}>
                <div style={iconWrap}>
                  <Mail size={15} color="var(--color-text-muted)" />
                </div>
                <input
                  id="edit-email"
                  type="email"
                  value={profile?.email ?? ''}
                  readOnly
                  disabled
                  style={{ padding: '10px 12px 10px 30px', cursor: 'not-allowed' }}
                />
              </div>
            </div>
          </div>

          {/* ── Buttons ───────────────────────────────────────────────────── */}
          <div style={{
            padding: '24px 28px 28px',
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '12px',
          }}>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => router.back()}
              disabled={saving}
              style={{ padding: '13px 0' }}
            >
              Cancel
            </button>
            <button
              id="edit-profile-save"
              type="submit"
              className="btn-terra"
              disabled={saving}
              style={{
                padding: '13px 0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              }}
            >
              {saving ? (
                <>
                  <Loader2 size={16} strokeWidth={2.5} style={{ animation: 'spin 0.8s linear infinite' }} />
                  Saving…
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ── Shared micro-styles ──────────────────────────────────────────────────── */
const labelStyle: React.CSSProperties = {
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: 'var(--color-text-secondary)',
  letterSpacing: '0.01em',
};

const iconWrap: React.CSSProperties = {
  position: 'absolute',
  left: '13px',
  top: '50%',
  transform: 'translateY(-50%)',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
};
