import { Search, Unlock, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'About Us — Bulk Bricks',
  description: 'Learn how Bulk Bricks connects property buyers directly with verified builders, eliminating brokerage charges.',
};

const STEPS = [
  {
    num: '01',
    title: 'Browse Freely',
    desc: 'Explore hundreds of verified property listings from trusted builders across India — no account needed.',
    Icon: Search,
  },
  {
    num: '02',
    title: 'Pay Once, Unlock Access',
    desc: "When you find the right property, pay a small one-time fee to unlock the builder's WhatsApp group link.",
    Icon: Unlock,
  },
  {
    num: '03',
    title: 'Connect Directly',
    desc: "Join the builder's WhatsApp group and talk directly — no middleman, no brokerage, no recurring fees.",
    Icon: MessageCircle,
  },
];

const STATS = [
  { label: 'Active Properties', value: '500+' },
  { label: 'Verified Builders',  value: '100+' },
  { label: 'Brokerage Saved',    value: '₹0' },
  { label: 'Happy Customers',    value: '2K+' },
];

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(160deg, var(--color-surface) 0%, var(--color-canvas) 100%)',
        padding: 'clamp(48px, 10vw, 96px) 24px clamp(40px, 8vw, 80px)',
        textAlign: 'center',
      }}>
        <p className="section-label" style={{ marginBottom: '10px' }}>Our Story</p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800,
          color: 'var(--color-text-primary)',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
          margin: '0 auto 20px',
          maxWidth: '700px',
        }}>
          Property Discovery Without the{' '}
          <span style={{ color: 'var(--color-terra)' }}>Brokerage</span>
        </h1>
        <p style={{
          color: 'var(--color-text-secondary)',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: '0 auto',
        }}>
          Bulk Bricks was built on a simple idea: buyers deserve to talk directly with builders.
          No agents. No commissions. Just transparent connections.
        </p>
      </section>

      {/* Stats bar */}
      <section style={{
        background: 'var(--color-terra)',
        padding: '32px 24px',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '24px', textAlign: 'center',
        }}>
          {STATS.map(({ label, value }) => (
            <div key={label}>
              <p style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#FFFFFF',
                fontFamily: 'var(--font-display)', margin: '0 0 4px' }}>
                {value}
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) 24px', maxWidth: '900px', margin: '0 auto' }}>
        <p className="section-label" style={{ marginBottom: '8px', textAlign: 'center' }}>Simple Process</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
          fontWeight: 700, color: 'var(--color-text-primary)', textAlign: 'center',
          margin: '0 auto 48px', letterSpacing: '-0.02em', maxWidth: '500px' }}>
          How Bulk Bricks Works
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {STEPS.map(({ num, title, desc, Icon }) => (
            <div key={num} style={{
              padding: '28px 24px',
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-subtle)',
              boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  background: 'var(--color-terra-muted)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={22} color="var(--color-terra)" strokeWidth={2} />
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800,
                  color: 'var(--color-terra)', fontSize: '1.25rem' }}>{num}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700,
                color: 'var(--color-text-primary)', margin: '0 0 10px' }}>
                {title}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.9rem', margin: 0 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: 'clamp(32px, 6vw, 64px) 24px', background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-subtle)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <p className="section-label" style={{ marginBottom: '10px' }}>Our Mission</p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.0625rem', lineHeight: 1.8 }}>
            We believe every property buyer deserves transparency. By cutting out the middleman and
            giving buyers direct access to builder communities, we make real estate more accessible,
            honest, and affordable for everyone.
          </p>
        </div>
      </section>
    </div>
  );
}
