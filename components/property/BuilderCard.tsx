import Link from 'next/link';
import { ShieldCheck, TrendingUp, Users, Globe } from 'lucide-react';
import type { BuilderWithStats } from '@/lib/queries/builders';
import type { Builder } from '@/types';

type BuilderCardInput = BuilderWithStats | Builder;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// ─── Component ────────────────────────────────────────────────────────────────
interface BuilderCardProps {
  builder: BuilderCardInput;
}

export function BuilderCard({ builder }: BuilderCardProps) {
  const initials  = getInitials(builder.company_name);
  const hasStats  = 'stats' in builder;
  const sold      = hasStats ? (builder as BuilderWithStats).stats.sold      : null;
  const customers = hasStats ? (builder as BuilderWithStats).stats.customers : null;
  const desc      = 'company_description' in builder
    ? (builder as { company_description?: string | null }).company_description
    : null;
  const websiteUrl = 'website_url' in builder
    ? (builder as { website_url?: string | null }).website_url
    : null;

  // ── Compact mode — property-detail sidebar only (never hasStats) ──────────
  if (!hasStats) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '12px 14px',
        background: 'var(--color-canvas)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-subtle)',
      }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
          background: 'var(--color-terra)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 800,
          letterSpacing: '-0.02em', userSelect: 'none',
        }}>
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <span style={{
              fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.9375rem',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {builder.company_name}
            </span>
            {builder.status === 'verified' && (
              <ShieldCheck size={13} color="var(--color-success)" strokeWidth={2.5} style={{ flexShrink: 0 }} />
            )}
          </div>
          <Link
            href={`/builders/${builder.id}`}
            style={{ fontSize: '0.8125rem', color: 'var(--color-terra)', textDecoration: 'none', fontWeight: 600 }}
          >
            View Profile →
          </Link>
        </div>
      </div>
    );
  }

  // ── Builders-page card — both layouts rendered; CSS toggles which is shown ─
  return (
    <>
      {/* ════════════════════════════════════════
          MOBILE: bar / list layout
          Hidden on ≥640 px via .builder-mobile-bar CSS
      ════════════════════════════════════════ */}
      <div className="builder-mobile-bar" style={{
        alignItems: 'center', gap: '14px',
        padding: '14px 16px',
        background: 'var(--color-surface-2)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-subtle)',
      }}>
        {/* Initials avatar */}
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
          background: 'var(--color-terra)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 800,
          letterSpacing: '-0.02em', userSelect: 'none',
          boxShadow: '0 4px 12px rgba(193, 68, 14, 0.22)',
        }}>
          {initials}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
            <span style={{
              fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.9375rem',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {builder.company_name}
            </span>
            {builder.status === 'verified' && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '3px',
                background: 'var(--color-success-bg)', color: 'var(--color-success)',
                fontSize: '0.625rem', fontWeight: 700,
                padding: '2px 6px', borderRadius: '99px',
                border: '1px solid var(--color-success)',
                lineHeight: 1, whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                <ShieldCheck size={8} strokeWidth={3} />
                Verified
              </span>
            )}
          </div>
          {/* Mini stats */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px',
              fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              <TrendingUp size={11} color="var(--color-terra)" strokeWidth={2.5} />
              <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                {formatCount(sold ?? 0)}
              </strong> sold
            </span>
            <span style={{ width: '1px', height: '12px', background: 'var(--color-border-default)' }} />
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px',
              fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              <Users size={11} color="var(--color-terra)" strokeWidth={2.5} />
              <strong style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                {formatCount(customers ?? 0)}
              </strong> customers
            </span>
          </div>
        </div>

        {/* Link */}
        <Link
          href={`/builders/${builder.id}`}
          style={{
            fontSize: '0.8125rem', color: 'var(--color-text-muted)',
            textDecoration: 'none', fontWeight: 500, flexShrink: 0,
          }}
        >
          View Profile →
        </Link>
      </div>

      {/* ════════════════════════════════════════
          DESKTOP: profile card layout
          Hidden on <640 px via .builder-desktop-card CSS
      ════════════════════════════════════════ */}
      <div
        className="builder-desktop-card builder-profile-card"
        style={{
          background: 'var(--color-surface)',
          backdropFilter: 'blur(12px) saturate(180%)',
          WebkitBackdropFilter: 'blur(12px) saturate(180%)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          flexDirection: 'column',
          transition: 'box-shadow 0.22s ease, transform 0.22s ease, backdrop-filter 0.22s ease',
          cursor: 'pointer',
        }}
      >
        {/* ── Avatar section (portrait top) ── */}
        <div style={{
          background: 'var(--color-terra-muted)',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative rings */}
          <div style={{
            position: 'absolute',
            width: '200px', height: '200px',
            borderRadius: '50%',
            border: '1px solid var(--color-terra-subtle)',
            opacity: 0.5,
          }} />
          <div style={{
            position: 'absolute',
            width: '140px', height: '140px',
            borderRadius: '50%',
            border: '1px solid var(--color-terra-subtle)',
            opacity: 0.65,
          }} />

          {/* Initials */}
          <div style={{
            width: '96px', height: '96px', borderRadius: '50%',
            background: 'var(--color-terra)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800,
            letterSpacing: '-0.03em', userSelect: 'none',
            position: 'relative', zIndex: 1,
            boxShadow: '0 8px 24px rgba(193, 68, 14, 0.30)',
            border: '3px solid rgba(255,255,255,0.25)',
          }}>
            {initials}
          </div>
        </div>

        {/* ── Card body ── */}
        <div style={{
          padding: '18px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          flex: 1,
        }}>
          {/* Name + verified */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap', marginBottom: '5px' }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                margin: 0, lineHeight: 1.2,
              }}>
                {builder.company_name}
              </h3>
              {builder.status === 'verified' && (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '3px',
                  background: 'var(--color-success-bg)', color: 'var(--color-success)',
                  fontSize: '0.625rem', fontWeight: 700,
                  padding: '2px 7px', borderRadius: '99px',
                  border: '1px solid var(--color-success)',
                  lineHeight: 1, whiteSpace: 'nowrap',
                }}>
                  <ShieldCheck size={9} strokeWidth={3} />
                  Verified
                </span>
              )}
            </div>

            {/* Description */}
            <p style={{
              fontSize: '0.8125rem',
              color: 'var(--color-text-secondary)',
              margin: 0, lineHeight: 1.55,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {desc ?? 'Verified real estate developer on Bulk Bricks.'}
            </p>
          </div>

          {/* ── Stats + CTA row ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '8px',
            paddingTop: '4px',
            justifyContent: 'space-between',
          }}>
            {/* Sold */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={13} color="var(--color-terra)" strokeWidth={2.5} />
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '0.9375rem',
                fontWeight: 700, color: 'var(--color-text-primary)',
              }}>
                {formatCount(sold ?? 0)}
              </span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                Sold
              </span>
            </div>

            <div style={{ 
              width: '1px', 
              height: '14px', 
              background: 'var(--color-border-default)',
              flexShrink: 0
            }} />

            {/* Customers */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Users size={13} color="var(--color-terra)" strokeWidth={2.5} />
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '0.9375rem',
                fontWeight: 700, color: 'var(--color-text-primary)',
              }}>
                {formatCount(customers ?? 0)}
              </span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                Customers
              </span>
            </div>

            {/* CTA */}
            <Link
              href={`/builders/${builder.id}`}
              className="builder-profile-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                background: 'var(--color-surface-2)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-border-default)',
                borderRadius: '99px',
                fontSize: '0.75rem',
                fontWeight: 700,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s ease, border-color 0.15s ease, color 0.15s ease',
                flexShrink: 0,
                minWidth: 'fit-content',
              }}
            >
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
