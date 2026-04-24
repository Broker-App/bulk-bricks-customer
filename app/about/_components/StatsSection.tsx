import { MotionFade } from './MotionFade';

export function StatsSection() {
  return (
    <section style={{
      padding: 'clamp(56px, 8vw, 80px) 24px',
      background: 'var(--color-terra)',
    }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <MotionFade>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '40px',
          }}>By the Numbers</p>
        </MotionFade>

        {/* Typographic numbers woven with prose */}
        <MotionFade delay={0.1}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.625rem, 4vw, 2.75rem)',
            fontWeight: 800, lineHeight: 1.35,
            letterSpacing: '-0.025em',
            color: '#FFFFFF',
            margin: '0 0 40px',
          }}>
            Over{' '}
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>500+</span>{' '}
            active properties from{' '}
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>100+</span>{' '}
            verified builders, helping{' '}
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>2,000+</span>{' '}
            buyers secure group discounts of{' '}
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>15%</span>{' '}
            or more.
          </p>
        </MotionFade>

        {/* Stat grid */}
        <MotionFade delay={0.2}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0',
            borderTop: '1px solid rgba(255,255,255,0.2)',
            paddingTop: '32px',
          }}>
            {[
              { value: '500+', label: 'Active Properties' },
              { value: '100+', label: 'Verified Builders' },
              { value: '15%+', label: 'Avg. Group Discount' },
              { value: '2K+', label: 'Buyers Served' },
            ].map(({ value, label }, i, arr) => (
              <div key={label} style={{
                flex: '1 1 120px', textAlign: 'center',
                padding: '16px 8px',
                borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
              }}>
                <p style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                  color: '#FFFFFF', margin: '0 0 4px', lineHeight: 1,
                }}>{value}</p>
                <p style={{
                  fontSize: '0.75rem', fontWeight: 600,
                  color: 'rgba(255,255,255,0.6)', margin: 0,
                  letterSpacing: '0.04em',
                }}>{label}</p>
              </div>
            ))}
          </div>
        </MotionFade>
      </div>
    </section>
  );
}
