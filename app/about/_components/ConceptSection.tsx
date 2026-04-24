import Image from 'next/image';
import { MotionFade } from './MotionFade';

export function ConceptSection() {
  return (
    <section style={{
      padding: 'clamp(64px, 10vw, 100px) 0',
      background: 'var(--color-canvas)',
      borderBottom: '1px solid var(--color-border-subtle)',
      overflow: 'hidden',
    }}>
      {/* Full-width label */}
      <MotionFade>
        <div style={{ padding: '0 24px', maxWidth: '960px', margin: '0 auto 48px' }}>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--color-terra)', marginBottom: 0,
          }}>The Bulk Bricks Way</p>
        </div>
      </MotionFade>

      {/* Asymmetric layout: image bleeds left, text right */}
      <div style={{
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', gap: '0',
      }}>
        {/* Image — bleeds to left edge on desktop */}
        <MotionFade delay={0.1} y={32} style={{ flex: '1 1 320px', minWidth: '280px' }}>
          <div style={{ paddingLeft: 'max(0px, calc((100vw - 960px) / 2))', paddingRight: '0' }}>
            <Image
              src="/about-group-savings.png"
              alt="Group savings — the power of collective buying"
              width={520} height={440}
              style={{
                width: '100%', maxWidth: '540px', height: 'auto', display: 'block',
                borderRadius: '0 var(--radius-xl) var(--radius-xl) 0',
                boxShadow: 'var(--shadow-card-hover)',
              }}
            />
          </div>
        </MotionFade>

        {/* Text — editorial, generous spacing */}
        <div style={{
          flex: '1 1 300px', maxWidth: '480px',
          padding: 'clamp(32px, 5vw, 64px) clamp(24px, 5vw, 64px)',
        }}>
          <MotionFade delay={0.15}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800, color: 'var(--color-text-primary)',
              lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 24px',
            }}>
              When buyers unite,{' '}
              <span style={{ color: 'var(--color-terra)' }}>prices drop.</span>
            </h2>
          </MotionFade>

          <MotionFade delay={0.22}>
            <p style={{
              color: 'var(--color-text-secondary)', lineHeight: 1.9,
              fontSize: '1rem', margin: '0 0 32px',
            }}>
              Bulk buying is the same principle behind wholesale markets — applied to real estate.
              When multiple serious buyers approach a builder together, the dynamic shifts completely.
              Builders gain guaranteed volume. Buyers gain pricing and access that individuals never could achieve alone.
            </p>
          </MotionFade>

          {/* Three inline facts — no borders, just spaced text */}
          <MotionFade delay={0.3}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { stat: 'Group rates', text: 'negotiated directly with the builder — not marked up by agents' },
                { stat: '1 fee', text: 'flat one-time access cost — not a percentage of your purchase price' },
                { stat: 'Direct', text: 'builder contact in a private group — no intermediary filtering your questions' },
              ].map(({ stat, text }) => (
                <div key={stat} style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: '1.375rem', color: 'var(--color-terra)',
                    flexShrink: 0, minWidth: '56px',
                  }}>{stat}</span>
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>{text}</span>
                </div>
              ))}
            </div>
          </MotionFade>
        </div>
      </div>
    </section>
  );
}
