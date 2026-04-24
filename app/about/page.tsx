import { HeroSection } from './_components/HeroSection';
import { ProblemSection } from './_components/ProblemSection';
import { ConceptSection } from './_components/ConceptSection';
import { HowItWorksSection } from './_components/HowItWorksSection';
import { WhyBulkSection } from './_components/WhyBulkSection';
import { BuildersSection } from './_components/BuildersSection';
import { StatsSection } from './_components/StatsSection';
import { CtaSection } from './_components/CtaSection';

export const metadata = {
  title: 'About Us — Bulk Bricks',
  description: 'Discover how Bulk Bricks is transforming property buying in India through the power of group buying — giving buyers direct builder access and exclusive group pricing.',
};

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'Home Buyer, Mumbai',
    content: 'Bulk Bricks helped me join an exclusive group buying opportunity! I connected directly with the builder and got special group discounts. Better pricing, direct communication.',
    rating: 5,
    location: 'Mumbai, Maharashtra',
  },
  {
    name: 'Priya Sharma',
    role: 'First-time Buyer, Bangalore',
    content: "As a first-time home buyer, I was nervous about the process. Bulk Bricks made it so simple. I joined the builder's WhatsApp group and got updates directly from the source.",
    rating: 5,
    location: 'Bangalore, Karnataka',
  },
  {
    name: 'Amit Patel',
    role: 'Property Investor, Ahmedabad',
    content: "I've bought 3 properties through Bulk Bricks. The transparency is unmatched. I can talk to builders directly and get better deals through group buying opportunities.",
    rating: 5,
    location: 'Ahmedabad, Gujarat',
  },
  {
    name: 'Deepak Verma',
    role: 'Builder, Delhi NCR',
    content: "Bulk Bricks has revolutionized how we connect with genuine buyers. We get serious inquiries and can communicate directly. It's a win-win for both builders and buyers.",
    rating: 5,
    location: 'Gurgaon, Haryana',
  },
  {
    name: 'Sneha Reddy',
    role: 'Home Buyer, Hyderabad',
    content: 'The WhatsApp group feature is brilliant! I got real-time construction updates and could clarify doubts immediately. Saved time and money compared to traditional channels.',
    rating: 5,
    location: 'Hyderabad, Telangana',
  },
  {
    name: 'Vikram Malhotra',
    role: 'Builder, Pune',
    content: "We've seen 40% better conversion rates since joining Bulk Bricks. Buyers who come through the platform are well-informed and serious about purchasing.",
    rating: 5,
    location: 'Pune, Maharashtra',
  },
];

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>

      {/* 1 ── Hero */}
      <HeroSection />

      {/* 2 ── The Problem */}
      <ProblemSection />

      {/* 3 ── The Concept */}
      <ConceptSection />

      {/* 4 ── How It Works */}
      <HowItWorksSection />

      {/* 5 ── Why Bulk Buying */}
      <WhyBulkSection />

      {/* 6 ── Verified Builders */}
      <BuildersSection />

      {/* 7 ── By the Numbers */}
      <StatsSection />

      {/* 8 ── Testimonials (preserved as-is) */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) 24px', background: 'var(--color-canvas)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p className="section-label" style={{ marginBottom: '8px', textAlign: 'center' }}>Success Stories</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
            fontWeight: 700, color: 'var(--color-text-primary)',
            textAlign: 'center', margin: '0 auto 48px',
            letterSpacing: '-0.02em', maxWidth: '500px',
          }}>
            What Our Users Say
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
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
                  position: 'absolute', top: '16px', right: '20px',
                  fontSize: '2rem', color: 'var(--color-terra-muted)',
                  fontFamily: 'Georgia, serif', opacity: 0.3,
                }}>
                  &ldquo;
                </div>

                {/* Rating stars */}
                <div style={{ marginBottom: '16px' }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#FFB800', fontSize: '1.1rem', marginRight: '2px' }}>★</span>
                  ))}
                </div>

                {/* Content */}
                <p style={{
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.7, fontSize: '0.95rem',
                  margin: '0 0 20px', fontStyle: 'italic',
                  position: 'relative', zIndex: 1,
                }}>
                  {testimonial.content}
                </p>

                {/* Author */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  paddingTop: '16px', borderTop: '1px solid var(--color-border-subtle)',
                }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    background: 'var(--color-terra-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-terra)', fontWeight: 700,
                    fontSize: '1.1rem', fontFamily: 'var(--font-display)', flexShrink: 0,
                  }}>
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                      {testimonial.name}
                    </p>
                    <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                      {testimonial.role}
                    </p>
                    <p style={{ margin: 0, color: 'var(--color-terra)', fontSize: '0.8rem', fontWeight: 500 }}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 ── Final CTA */}
      <CtaSection />

    </div>
  );
}
