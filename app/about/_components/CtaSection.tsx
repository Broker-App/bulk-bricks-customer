import Link from 'next/link';
import { MotionFade } from './MotionFade';
import { Button } from '@/components/ui/buttons/Button';

export function CtaSection() {
  return (
    <section style={{
      padding: 'clamp(80px, 12vw, 120px) 24px',
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border-subtle)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle terracotta radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse, var(--color-terra-muted) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '720px', margin: '0 auto',
        position: 'relative', zIndex: 1,
      }}>
        <MotionFade>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--color-terra)',
            marginBottom: '24px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ width: '32px', height: '1.5px', background: 'var(--color-terra)', display: 'inline-block' }} />
            Start Your Journey
          </p>
        </MotionFade>

        <MotionFade delay={0.08}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 800, color: 'var(--color-text-primary)',
            lineHeight: 1.02, letterSpacing: '-0.04em',
            margin: '0 0 24px',
          }}>
            Ready to buy
            <br />
            <span style={{ color: 'var(--color-terra)' }}>smarter?</span>
          </h2>
        </MotionFade>

        <MotionFade delay={0.16}>
          <p style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            lineHeight: 1.85, margin: '0 0 44px', maxWidth: '520px',
          }}>
            Join thousands of buyers already using the power of groups to access verified builders,
            exclusive pricing, and a buying experience built entirely around your interests.
          </p>
        </MotionFade>

        <MotionFade delay={0.22}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            <Button asChild variant="terra" size="lg">
              <Link href="/properties">Browse Properties →</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </MotionFade>

        <MotionFade delay={0.3}>
          <p style={{
            marginTop: '36px', fontSize: '0.8125rem',
            color: 'var(--color-text-muted)', lineHeight: 1.7,
          }}>
            No commitment required. Browse freely — pay only when you&apos;re ready to unlock direct builder access.
          </p>
        </MotionFade>
      </div>
    </section>
  );
}
