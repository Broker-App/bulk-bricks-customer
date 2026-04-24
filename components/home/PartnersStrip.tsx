'use client';

/* ─────────────────────────────────────────────────────────────────────────────
   PartnersStrip — reusable animated partner logos section
   ─────────────────────────────────────────────────────────────────────────────
   Usage:
     <PartnersStrip />
     <PartnersStrip heading="Builder Network" subtext="50+ verified developers" compact />
     <PartnersStrip partners={MY_PARTNERS} showHeading={false} />
   ────────────────────────────────────────────────────────────────────────────── */

export interface Partner {
  id: string;
  name: string;
  /** Absolute URL or /public path e.g. "/logos/tata.svg" */
  logo?: string;
  /** Short fallback monogram when no logo provided */
  monogram?: string;
  /** Accent colour for monogram tile */
  color?: string;
  /** Optional category tag */
  category?: string;
}

/* ── Default partners (swap in real logos when available) ──────────────────── */
export const DEFAULT_PARTNERS: Partner[] = [
  { id: 'tata',        name: 'Tata Housing',        monogram: 'TH', color: '#1A3C6E', category: 'Mumbai' },
  { id: 'godrej',      name: 'Godrej Properties',   monogram: 'GP', color: '#006B3C', category: 'Pan India' },
  { id: 'lodha',       name: 'Lodha Group',          monogram: 'LG', color: '#C8102E', category: 'Mumbai' },
  { id: 'sobha',       name: 'Sobha Ltd.',           monogram: 'SL', color: '#B8860B', category: 'Bangalore' },
  { id: 'prestige',    name: 'Prestige Group',       monogram: 'PG', color: '#6B2D8B', category: 'Bangalore' },
  { id: 'brigade',     name: 'Brigade Group',        monogram: 'BG', color: '#C0552A', category: 'Bangalore' },
  { id: 'puravankara', name: 'Puravankara',          monogram: 'PV', color: '#00718F', category: 'Bangalore' },
  { id: 'mahindra',    name: 'Mahindra Lifespaces',  monogram: 'ML', color: '#A93226', category: 'Pan India' },
  { id: 'dlf',         name: 'DLF Limited',          monogram: 'DL', color: '#2C3E50', category: 'Delhi NCR' },
  { id: 'kolte',       name: 'Kolte-Patil',          monogram: 'KP', color: '#1E8449', category: 'Pune' },
];

interface PartnersStripProps {
  heading?: string;
  subtext?: string;
  partners?: Partner[];
  compact?: boolean;
  showHeading?: boolean;
}

/* ── Individual logo card ─────────────────────────────────────────────────── */
function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <div
      title={partner.name}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        flexShrink: 0,
        width: '160px',
      }}
    >
      {/* Logo tile */}
      <div style={{
        width: '140px',
        height: '80px',
        borderRadius: 'var(--radius-xl)',
        background: 'var(--color-surface)',
        border: '1.5px solid var(--color-border-subtle)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        transition: 'box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease',
        cursor: 'default',
      }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = 'var(--shadow-card-hover)';
          el.style.transform = 'translateY(-5px) scale(1.03)';
          el.style.borderColor = 'var(--color-terra-border)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow = 'var(--shadow-card)';
          el.style.transform = 'translateY(0) scale(1)';
          el.style.borderColor = 'var(--color-border-subtle)';
        }}
      >
        {/* Subtle inner glow top edge */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
          borderRadius: 'inherit',
        }} />

        {partner.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={partner.logo}
            alt={partner.name}
            style={{ maxWidth: '110px', maxHeight: '56px', objectFit: 'contain' }}
          />
        ) : (
          /* Monogram badge */
          <div style={{
            width: '60px', height: '60px',
            borderRadius: 'var(--radius-lg)',
            background: partner.color ?? 'var(--color-terra)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 4px 12px ${partner.color ?? '#C1440E'}40`,
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.125rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
            }}>
              {partner.monogram ?? partner.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Partner name */}
      <div style={{ textAlign: 'center' }}>
        <span style={{
          display: 'block',
          fontSize: '0.8125rem',
          fontWeight: 700,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.3,
          maxWidth: '140px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {partner.name}
        </span>
        {partner.category && (
          <span style={{
            display: 'block',
            fontSize: '0.6875rem',
            fontWeight: 500,
            color: 'var(--color-text-muted)',
            marginTop: '2px',
          }}>
            {partner.category}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export function PartnersStrip({
  heading = 'Our Partners',
  subtext = "Trusted by India's leading real estate developers",
  partners = DEFAULT_PARTNERS,
  compact = false,
  showHeading = true,
}: PartnersStripProps) {
  const doubled = [...partners, ...partners];
  const vPad = compact ? '36px' : '56px';

  return (
    <section style={{
      padding: `${vPad} 0`,
      background: 'var(--color-canvas)',
      borderTop: '1px solid var(--color-border-subtle)',
      borderBottom: '1px solid var(--color-border-subtle)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Soft background pattern */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(var(--color-border-subtle) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
        opacity: 0.5,
      }} />

      {/* ── Heading ── */}
      {showHeading && (
        <div style={{ textAlign: 'center', padding: '0 24px', marginBottom: '36px', position: 'relative', zIndex: 1 }}>
          {/* Pill badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'var(--color-terra-muted)',
            border: '1px solid var(--color-terra-border)',
            borderRadius: 'var(--radius-pill)',
            padding: '4px 14px',
            marginBottom: '12px',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--color-terra)', display: 'inline-block',
            }} />
            <span style={{
              fontSize: '0.6875rem', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              color: 'var(--color-terra)',
            }}>
              {heading}
            </span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.375rem, 3vw, 2rem)',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.025em',
            margin: '0 0 8px',
            lineHeight: 1.2,
          }}>
            {subtext}
          </h2>
          <p style={{
            fontSize: '0.9375rem',
            color: 'var(--color-text-muted)',
            margin: 0,
            lineHeight: 1.6,
          }}>
            {partners.length}+ verified builder partnerships — growing every month.
          </p>
        </div>
      )}

      {/* ── Scrolling marquee ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Left fade */}
        <div aria-hidden style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '100px', zIndex: 2,
          pointerEvents: 'none',
          background: 'linear-gradient(to right, var(--color-canvas) 0%, transparent 100%)',
        }} />
        {/* Right fade */}
        <div aria-hidden style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '100px', zIndex: 2,
          pointerEvents: 'none',
          background: 'linear-gradient(to left, var(--color-canvas) 0%, transparent 100%)',
        }} />

        {/* Track */}
        <div style={{
          display: 'flex',
          gap: '24px',
          width: 'max-content',
          animation: 'partners-scroll 32s linear infinite',
          paddingLeft: '24px',
          paddingBottom: '8px', /* room for card lift shadow */
        }}>
          {doubled.map((partner, i) => (
            <PartnerCard key={`${partner.id}-${i}`} partner={partner} />
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 'clamp(24px, 5vw, 64px)',
        flexWrap: 'wrap',
        marginTop: compact ? '24px' : '36px',
        padding: '0 24px',
        position: 'relative', zIndex: 1,
      }}>
        {[
          { value: `${partners.length}+`, label: 'Builder Partners' },
          { value: '₹200Cr+',             label: 'Deals Facilitated' },
          { value: '15 Cities',            label: 'Pan India Presence' },
          { value: '8,000+',              label: 'Happy Buyers' },
        ].map(({ value, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 800,
              color: 'var(--color-terra)',
              margin: '0 0 2px',
              lineHeight: 1,
            }}>{value}</p>
            <p style={{
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
              fontWeight: 500,
              margin: 0,
            }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Keyframe */}
      <style>{`
        @keyframes partners-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="partners-scroll"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
