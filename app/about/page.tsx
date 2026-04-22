import { Search, Unlock, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'About Us — Bulk Bricks',
  description: 'Learn how Bulk Bricks connects property buyers directly with verified builders through exclusive group buying opportunities.',
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
    desc: "Join the builder's WhatsApp group and talk directly — exclusive group access, better deals, no hidden fees.",
    Icon: MessageCircle,
  },
];

const STATS = [
  { label: 'Active Properties', value: '500+' },
  { label: 'Verified Builders',  value: '100+' },
  { label: 'Group Discounts',    value: '15%+' },
  { label: 'Happy Customers',    value: '2K+' },
];

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'Home Buyer, Mumbai',
    content: 'Bulk Bricks helped me join an exclusive group buying opportunity! I connected directly with the builder and got special group discounts. Better pricing, direct communication.',
    rating: 5,
    location: 'Mumbai, Maharashtra'
  },
  {
    name: 'Priya Sharma',
    role: 'First-time Buyer, Bangalore',
    content: 'As a first-time home buyer, I was nervous about the process. Bulk Bricks made it so simple. I joined the builder\'s WhatsApp group and got updates directly from the source.',
    rating: 5,
    location: 'Bangalore, Karnataka'
  },
  {
    name: 'Amit Patel',
    role: 'Property Investor, Ahmedabad',
    content: 'I\'ve bought 3 properties through Bulk Bricks. The transparency is unmatched. I can talk to builders directly and get better deals through group buying opportunities.',
    rating: 5,
    location: 'Ahmedabad, Gujarat'
  },
  {
    name: 'Deepak Verma',
    role: 'Builder, Delhi NCR',
    content: 'Bulk Bricks has revolutionized how we connect with genuine buyers. We get serious inquiries and can communicate directly. It\'s a win-win for both builders and buyers.',
    rating: 5,
    location: 'Gurgaon, Haryana'
  },
  {
    name: 'Sneha Reddy',
    role: 'Home Buyer, Hyderabad',
    content: 'The WhatsApp group feature is brilliant! I got real-time construction updates and could clarify doubts immediately. Saved time and money compared to traditional channels.',
    rating: 5,
    location: 'Hyderabad, Telangana'
  },
  {
    name: 'Vikram Malhotra',
    role: 'Builder, Pune',
    content: 'We\'ve seen 40% better conversion rates since joining Bulk Bricks. Buyers who come through the platform are well-informed and serious about purchasing.',
    rating: 5,
    location: 'Pune, Maharashtra'
  }
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
          Property Discovery With{' '}
          <span style={{ color: 'var(--color-terra)' }}>Group Benefits</span>
        </h1>
        <p style={{
          color: 'var(--color-text-secondary)',
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: '0 auto',
        }}>
          Bulk Bricks was built on a simple idea: buyers deserve better deals through group buying.
          Direct access. Group benefits. Transparent pricing.
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

      {/* Testimonials */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) 24px', background: 'var(--color-canvas)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p className="section-label" style={{ marginBottom: '8px', textAlign: 'center' }}>Success Stories</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
            fontWeight: 700, color: 'var(--color-text-primary)', textAlign: 'center',
            margin: '0 auto 48px', letterSpacing: '-0.02em', maxWidth: '500px' }}>
            What Our Users Say
          </h2>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '24px' 
          }}>
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} style={{
                padding: '28px 24px',
                background: 'var(--color-surface)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border-subtle)',
                boxShadow: 'var(--shadow-card)',
                position: 'relative',
              }}>
                {/* Quote icon */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '20px',
                  fontSize: '2rem',
                  color: 'var(--color-terra-muted)',
                  fontFamily: 'Georgia, serif',
                  opacity: 0.3,
                }}>
                  "
                </div>

                {/* Rating stars */}
                <div style={{ marginBottom: '16px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#FFB800', fontSize: '1.1rem', marginRight: '2px' }}>
                      ★
                    </span>
                  ))}
                </div>

                {/* Testimonial content */}
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  lineHeight: 1.7, 
                  fontSize: '0.95rem', 
                  margin: '0 0 20px',
                  fontStyle: 'italic',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  {testimonial.content}
                </p>

                {/* Author info */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--color-border-subtle)'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--color-terra-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-terra)',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    fontFamily: 'var(--font-display)',
                  }}>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p style={{ 
                      margin: 0, 
                      fontWeight: 600, 
                      color: 'var(--color-text-primary)',
                      fontSize: '0.95rem'
                    }}>
                      {testimonial.name}
                    </p>
                    <p style={{ 
                      margin: 0, 
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.85rem'
                    }}>
                      {testimonial.role}
                    </p>
                    <p style={{ 
                      margin: 0, 
                      color: 'var(--color-terra)',
                      fontSize: '0.8rem',
                      fontWeight: 500
                    }}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section style={{ padding: 'clamp(32px, 6vw, 64px) 24px', background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-subtle)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <p className="section-label" style={{ marginBottom: '10px' }}>Our Mission</p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.0625rem', lineHeight: 1.8 }}>
            We believe every property buyer deserves better deals. By creating exclusive group buying opportunities and
            giving buyers direct access to builder communities, we make real estate more accessible,
            transparent, and affordable for everyone.
          </p>
        </div>
      </section>
    </div>
  );
}
