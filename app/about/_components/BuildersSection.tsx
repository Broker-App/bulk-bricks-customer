import Image from 'next/image';
import Link from 'next/link';
import { MotionFade } from './MotionFade';
import { Button } from '@/components/ui/buttons/Button';

const TIMELINE = [
  { label: 'RERA Registration', detail: 'Active registration number cross-checked with state authority records.' },
  { label: 'Legal Document Review', detail: 'Title deeds, encumbrance certificates, and ownership chain verified.' },
  { label: 'Physical Site Inspection', detail: 'Our team visits each site before listing to confirm construction status.' },
  { label: 'Approval Status Confirmed', detail: 'Building plan approvals, NOCs, and environmental clearances reviewed.' },
];

export function BuildersSection() {
  return (
    <section style={{
      background: 'var(--color-surface)',
      padding: 'clamp(64px, 10vw, 100px) 24px',
      borderBottom: '1px solid var(--color-border-subtle)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', flexWrap: 'wrap', gap: '64px', alignItems: 'flex-start',
      }}>

        {/* Left — text + timeline */}
        <div style={{ flex: '1 1 300px', maxWidth: '520px' }}>
          <MotionFade>
            <p style={{
              fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '14px',
            }}>Builder Trust</p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 800, color: 'var(--color-text-primary)',
              lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 20px',
            }}>
              Every builder is
              <br />
              <span style={{ color: 'var(--color-terra)' }}>manually verified.</span>
            </h2>
            <p style={{
              color: 'var(--color-text-secondary)', lineHeight: 1.85,
              fontSize: '1rem', margin: '0 0 48px',
            }}>
              We don&apos;t list every builder who signs up. Our team reviews legal documents,
              RERA registrations, and conducts physical site inspections before a single property goes live.
            </p>
          </MotionFade>

          {/* Vertical timeline — no cards, just a line + dots */}
          <div style={{ position: 'relative', paddingLeft: '28px' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: '7px', top: '8px',
              bottom: '8px', width: '2px',
              background: 'linear-gradient(to bottom, var(--color-terra), var(--color-border-subtle))',
            }} />

            {TIMELINE.map(({ label, detail }, i) => (
              <MotionFade key={label} delay={0.1 + i * 0.09}>
                <div style={{ marginBottom: i < TIMELINE.length - 1 ? '28px' : 0, position: 'relative' }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute', left: '-24px', top: '4px',
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: 'var(--color-terra)',
                    border: '2px solid var(--color-surface)',
                    boxShadow: '0 0 0 3px var(--color-terra-muted)',
                  }} />
                  <p style={{
                    fontWeight: 700, fontSize: '0.9375rem',
                    color: 'var(--color-text-primary)', margin: '0 0 4px',
                    fontFamily: 'var(--font-display)',
                  }}>{label}</p>
                  <p style={{
                    color: 'var(--color-text-secondary)', fontSize: '0.875rem',
                    lineHeight: 1.7, margin: 0,
                  }}>{detail}</p>
                </div>
              </MotionFade>
            ))}
          </div>

          <MotionFade delay={0.5}>
            <Button asChild variant="ghost" size="sm">
              <Link href="/builders">Meet Our Verified Builders →</Link>
            </Button>
          </MotionFade>
        </div>

        {/* Right — illustration */}
        <MotionFade delay={0.2} y={40} style={{ flex: '1 1 280px', maxWidth: '420px' }}>
          <Image
            src="/about-verified-builders.png"
            alt="Verified builder with professional credentials and shield badge"
            width={420} height={400}
            style={{
              width: '100%', height: 'auto', display: 'block',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-card-hover)',
            }}
          />
        </MotionFade>
      </div>
    </section>
  );
}
