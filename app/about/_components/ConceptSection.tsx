import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { MotionFade } from './MotionFade';

const FACTS = [
  {
    label: 'Group rates',
    text: 'Negotiated directly with the builder — not marked up by agents',
  },
  {
    label: 'One flat fee',
    text: 'A fixed access cost — never a percentage of your purchase price',
  },
  {
    label: 'Direct contact',
    text: 'Builder\'s WhatsApp group — no intermediary filtering your questions',
  },
];

export function ConceptSection() {
  return (
    <section style={{
      padding: 'clamp(64px, 10vw, 100px) 24px',
      background: 'var(--color-canvas)',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', gap: 'clamp(32px, 6vw, 72px)',
      }}>

        {/* ── Image column ── */}
        <MotionFade
          delay={0.05} y={32}
          style={{ flex: '1 1 300px', maxWidth: '500px' }}
        >
          <div style={{
            borderRadius: 'var(--radius-xl)', overflow: 'hidden',
            boxShadow: 'var(--shadow-card-hover)',
            background: 'var(--color-terra-muted)',
          }}>
            <Image
              src="/about-group-savings.png"
              alt="Group savings — the power of collective buying"
              width={500} height={420}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </MotionFade>

        {/* ── Text column ── */}
        <div style={{ flex: '1 1 300px', maxWidth: '480px' }}>

          <MotionFade delay={0.1}>
            <p style={{
              fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--color-terra)',
              marginBottom: '14px',
            }}>
              The Bulk Bricks Way
            </p>
          </MotionFade>

          <MotionFade delay={0.15}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800, color: 'var(--color-text-primary)',
              lineHeight: 1.1, letterSpacing: '-0.03em',
              margin: '0 0 20px',
            }}>
              When buyers unite,{' '}
              <span style={{ color: 'var(--color-terra)' }}>prices drop.</span>
            </h2>
          </MotionFade>

          <MotionFade delay={0.2}>
            <p style={{
              color: 'var(--color-text-secondary)', lineHeight: 1.85,
              fontSize: '1rem', margin: '0 0 36px',
            }}>
              Bulk buying is the same principle behind wholesale markets — applied to real estate.
              When multiple serious buyers approach a builder together, the dynamic shifts completely.
              Builders gain guaranteed volume. Buyers gain pricing and access that individuals
              could never achieve alone.
            </p>
          </MotionFade>

          {/* Fact items */}
          <MotionFade delay={0.27}>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '0',
              borderTop: '1px solid var(--color-border-subtle)',
            }}>
              {FACTS.map(({ label, text }) => (
                <div key={label} style={{
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  padding: '16px 0',
                  borderBottom: '1px solid var(--color-border-subtle)',
                }}>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                    background: 'var(--color-terra-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: '2px',
                  }}>
                    <CheckCircle size={13} color="var(--color-terra)" strokeWidth={2.5} />
                  </div>
                  <div>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: '0.9375rem', color: 'var(--color-text-primary)',
                      display: 'block', marginBottom: '2px',
                    }}>
                      {label}
                    </span>
                    <span style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.875rem', lineHeight: 1.65,
                    }}>
                      {text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </MotionFade>
        </div>
      </div>
    </section>
  );
}
