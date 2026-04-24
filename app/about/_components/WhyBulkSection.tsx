import Image from 'next/image';
import { MotionFade } from './MotionFade';

const ROWS = [
  {
    img: '/about-group-buying.png',
    label: 'Collective Power',
    title: 'More buyers. More leverage. Better deals.',
    body: 'When buyers approach a builder as a group, the negotiating dynamic shifts. Builders who might ignore a single inquiry will engage seriously with a coordinated group — offering pricing flexibility, priority booking, and payment terms they\'d never extend to individuals.',
    alt: 'Group of buyers representing collective bulk buying power',
    reverse: false,
  },
  {
    img: '/about-direct-access.png',
    label: 'Zero Middlemen',
    title: 'You talk to the builder. Not about the builder.',
    body: "Every property you unlock gives you access to the builder's own WhatsApp group. You ask questions, get construction updates, and have direct conversations with the people responsible for your investment — with no agent translating or filtering what you hear.",
    alt: 'Direct builder access via WhatsApp',
    reverse: true,
  },
  {
    img: '/about-group-savings.png',
    label: 'Transparent Pricing',
    title: 'One flat fee. Group rates. Nothing hidden.',
    body: "You pay a single, fixed fee to unlock access — not a percentage of the property's value. The price you see is the builder's group listing rate, not a retail markup. What you pay for is access to direct negotiation, not a guarantee of savings.",
    alt: 'Savings and transparent pricing illustration',
    reverse: false,
  },
];

export function WhyBulkSection() {
  return (
    <section style={{
      background: 'var(--color-canvas)',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}>
      {/* Section intro */}
      <div style={{ padding: 'clamp(64px, 10vw, 100px) 24px 0', maxWidth: '960px', margin: '0 auto' }}>
        <MotionFade>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '14px',
          }}>The Advantage</p>
        </MotionFade>
        <MotionFade delay={0.08}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
            fontWeight: 800, color: 'var(--color-text-primary)',
            lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 80px',
          }}>
            Why bulk buying changes
            <br />
            <span style={{ color: 'var(--color-terra)' }}>everything about real estate.</span>
          </h2>
        </MotionFade>
      </div>

      {/* Alternating full-width rows */}
      {ROWS.map(({ img, label, title, body, alt, reverse }, i) => (
        <div key={label} style={{
          borderTop: '1px solid var(--color-border-subtle)',
          padding: 'clamp(48px, 8vw, 80px) 0',
        }}>
          <div style={{
            maxWidth: '1100px', margin: '0 auto', padding: '0 24px',
            display: 'flex', flexWrap: 'wrap', gap: '56px',
            alignItems: 'center',
            flexDirection: reverse ? 'row-reverse' : 'row',
          }}>
            {/* Image */}
            <MotionFade delay={0.1} y={32} style={{ flex: '1 1 300px', maxWidth: '480px' }}>
              <Image
                src={img} alt={alt} width={480} height={360}
                style={{
                  width: '100%', height: 'auto', display: 'block',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-card-hover)',
                }}
              />
            </MotionFade>

            {/* Text */}
            <div style={{ flex: '1 1 300px', maxWidth: '460px' }}>
              <MotionFade delay={0.15}>
                <p style={{
                  fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--color-terra)', marginBottom: '16px',
                }}>{label}</p>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.375rem, 3vw, 2rem)',
                  fontWeight: 800, color: 'var(--color-text-primary)',
                  lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 20px',
                }}>{title}</h3>
                <p style={{
                  color: 'var(--color-text-secondary)', lineHeight: 1.85,
                  fontSize: '1rem', margin: 0,
                }}>{body}</p>
              </MotionFade>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
