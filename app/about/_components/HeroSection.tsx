import Image from 'next/image';
import Link from 'next/link';
import { MotionFade } from './MotionFade';
import { Button } from '@/components/ui/buttons/Button';

export function HeroSection() {
  return (
    <section style={{
      background: 'var(--color-canvas)',
      padding: 'clamp(64px, 12vw, 64px) 24px clamp(48px, 8vw, 80px)',
      borderBottom: '1px solid var(--color-border-subtle)',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>

        {/* Eyebrow */}
        <MotionFade delay={0}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: '0.6875rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--color-terra)', marginBottom: '28px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <span style={{ width: '32px', height: '1.5px', background: 'var(--color-terra)', display: 'inline-block' }} />
            Group Property Buying, Simplified
          </p>
        </MotionFade>

        {/* Main headline — editorial, big, left-aligned */}
        <MotionFade delay={0.1}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            margin: '0 0 32px',
          }}>
            Buy Smart.
            <br />
            <span style={{ color: 'var(--color-terra)' }}>Buy Together.</span>
          </h1>
        </MotionFade>

        {/* Two-column: subtext + CTAs */}
        <MotionFade delay={0.2}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '40px',
            alignItems: 'flex-start', marginBottom: '64px',
          }}>
            <p style={{
              flex: '1 1 300px', maxWidth: '480px',
              color: 'var(--color-text-secondary)',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              lineHeight: 1.85, margin: 0,
            }}>
              Bulk Bricks connects property buyers directly with verified builders — giving
              you access to group buying opportunities, transparent pricing, and a
              direct line to the builder from day one.
            </p>
            <div style={{
              flex: '0 0 auto', display: 'flex', flexDirection: 'column',
              gap: '12px', paddingTop: '4px',
            }}>
              <Button asChild variant="terra" size="lg">
                <Link href="/properties">Browse Properties →</Link>
              </Button>
              <Button asChild variant="outline" size="md">
                <a href="#how-it-works">See how it works →</a>
              </Button>
            </div>
          </div>
        </MotionFade>

        {/* Full-width illustration — cinematic */}
        <MotionFade delay={0.3} y={40}>
          <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            <Image
              src="/about-group-buying.png"
              alt="Group of buyers representing collective bulk buying power in India"
              width={960} height={480}
              style={{ width: '100%', height: 'clamp(280px, 50vw, 480px)', objectFit: 'cover', display: 'block' }}
              priority
            />
            {/* Floating stat pills */}
            <div style={{
              position: 'absolute', bottom: '24px', left: '24px',
              display: 'flex', gap: '10px', flexWrap: 'wrap',
            }}>
              {[{ v: '500+', l: 'Properties' }, { v: '100+', l: 'Builders' }, { v: 'Direct', l: 'Builder Access' }].map(({ v, l }) => (
                <div key={l} style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '8px 16px',
                  display: 'flex', alignItems: 'baseline', gap: '6px',
                }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.125rem', color: 'var(--color-terra)' }}>{v}</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </MotionFade>
      </div>
    </section>
  );
}
