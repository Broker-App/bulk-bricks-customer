import { Search, Users, MessageCircle } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Explore Verified Properties',
    desc: 'Browse hundreds of active listings from RERA-verified builders across India. Filter by city, budget, and property type — no account required.',
    Icon: Search,
    detail: '500+ active properties across major Indian cities',
  },
  {
    num: '02',
    title: 'Join the Buying Group',
    desc: 'When you find the right property, pay a small one-time fee to unlock the builder\'s WhatsApp group link and join other serious buyers.',
    Icon: Users,
    detail: 'Small one-time fee — not a percentage of your property value',
  },
  {
    num: '03',
    title: 'Negotiate & Buy Direct',
    desc: 'Talk directly to the builder\'s team. As a group, negotiate pricing, payment plans, and booking priority that individual buyers simply can\'t get.',
    Icon: MessageCircle,
    detail: 'Direct access to the builder’s team — negotiate without intermediaries',
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" style={{
      background: 'var(--color-surface)',
      padding: 'clamp(48px, 8vw, 80px) 24px',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}>
      <p className="section-label" style={{ textAlign: 'center', marginBottom: '8px' }}>Your Journey</p>
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
        fontWeight: 700, color: 'var(--color-text-primary)',
        textAlign: 'center', margin: '0 auto 14px',
        letterSpacing: '-0.02em', maxWidth: '540px',
      }}>
        From Discovery to Your Dream Home
      </h2>
      <p style={{
        color: 'var(--color-text-secondary)', textAlign: 'center',
        maxWidth: '440px', margin: '0 auto 56px', lineHeight: 1.7,
      }}>
        Three simple steps, designed to put you in control at every stage.
      </p>

      {/* Steps — vertical on mobile, horizontal on desktop via flex wrap */}
      <div style={{
        maxWidth: '960px', margin: '0 auto',
        display: 'flex', flexWrap: 'wrap', gap: '24px',
        alignItems: 'stretch', justifyContent: 'center',
      }}>
        {STEPS.map(({ num, title, desc, Icon, detail }, i) => (
          <div key={num} style={{
            flex: '1 1 240px', maxWidth: '300px',
            display: 'flex', flexDirection: 'column',
            position: 'relative',
          }}>
            {/* Connector line for desktop (pseudo-element via border trick) */}
            {i < STEPS.length - 1 && (
              <div style={{
                display: 'none', // visible via CSS below on wider screens
                position: 'absolute', top: '22px', right: '-13px',
                width: '24px', height: '2px',
                background: 'var(--color-terra-border)',
                zIndex: 1,
              }} />
            )}

            {/* Step badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'var(--color-terra)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: 'var(--shadow-cta)',
              }}>
                <Icon size={20} color="#FFFFFF" strokeWidth={2} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)', fontWeight: 800,
                fontSize: '0.75rem', color: 'var(--color-text-muted)',
                letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>Step {num}</span>
            </div>

            {/* Card */}
            <div style={{
              flex: 1,
              background: 'var(--color-canvas)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-xl)', padding: '24px',
              boxShadow: 'var(--shadow-card)',
              borderTop: '3px solid var(--color-terra)',
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 700,
                color: 'var(--color-text-primary)', margin: '0 0 10px',
              }}>{title}</h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '0.9rem', margin: '0 0 16px' }}>{desc}</p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'var(--color-terra-muted)', borderRadius: 'var(--radius-pill)',
                padding: '4px 10px',
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-terra)' }}>{detail}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
