import { MotionFade } from './MotionFade';

const PAINS = [
  {
    num: '01',
    title: 'Broker markups inflate every price',
    body: 'Agents silently add 1–3% on top of builder rates. On a ₹80L property, that\'s ₹2.4L gone — before you\'ve seen a single brick.',
  },
  {
    num: '02',
    title: 'Builder contact is locked behind layers',
    body: 'You never reach the source. Questions are filtered, delayed, and reinterpreted by intermediaries who have no obligation to be honest.',
  },
  {
    num: '03',
    title: 'Individual buyers have zero leverage',
    body: 'Walking in alone, you take the listed price or leave. Builders hold their best deals for bulk commitments — and individuals never qualify.',
  },
];

export function ProblemSection() {
  return (
    <section style={{
      padding: 'clamp(64px, 10vw, 100px) 24px',
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Editorial label */}
        <MotionFade>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--color-text-muted)',
            marginBottom: '16px',
          }}>The Old Way</p>
        </MotionFade>

        {/* Pull-headline */}
        <MotionFade delay={0.08}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
            fontWeight: 800, color: 'var(--color-text-primary)',
            lineHeight: 1.1, letterSpacing: '-0.03em',
            margin: '0 0 56px',
          }}>
            Traditional property buying
            <br />
            <span style={{ color: 'var(--color-danger)', fontStyle: 'italic' }}>was rigged against you.</span>
          </h2>
        </MotionFade>

        {/* Pain items — editorial numbered list, no cards */}
        <div>
          {PAINS.map(({ num, title, body }, i) => (
            <MotionFade key={num} delay={0.1 + i * 0.1}>
              <div style={{
                display: 'flex', gap: '32px', alignItems: 'flex-start',
                padding: '36px 0',
                borderTop: '1px solid var(--color-border-subtle)',
              }}>
                {/* Large number */}
                <span style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: 'var(--color-border-default)',
                  lineHeight: 1, flexShrink: 0, letterSpacing: '-0.04em',
                  minWidth: '56px',
                }}>{num}</span>

                {/* Text */}
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700,
                    fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)',
                    color: 'var(--color-text-primary)',
                    margin: '0 0 10px', letterSpacing: '-0.01em',
                  }}>{title}</h3>
                  <p style={{
                    color: 'var(--color-text-secondary)', lineHeight: 1.8,
                    fontSize: '1rem', margin: 0,
                  }}>{body}</p>
                </div>
              </div>
            </MotionFade>
          ))}

          {/* Closing rule + bridge text */}
          <MotionFade delay={0.45}>
            <div style={{
              borderTop: '1px solid var(--color-border-subtle)',
              paddingTop: '40px', marginTop: '0',
            }}>
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 700, color: 'var(--color-terra)',
                letterSpacing: '-0.02em', margin: 0, fontStyle: 'italic',
              }}>
                &ldquo;We built Bulk Bricks to flip this entirely.&rdquo;
              </p>
            </div>
          </MotionFade>
        </div>
      </div>
    </section>
  );
}
