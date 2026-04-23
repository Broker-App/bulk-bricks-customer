'use client';

import { Search, Unlock, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 1500); // Change step every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .howitworks-section {
          background: var(--color-canvas);
          padding: 52px 0 60px;
          position: relative;
        }
        
        /* Light theme: natural background */
        .howitworks-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/illustration1.png') no-repeat;
          background-position: center 20%;
          background-size: contain;
          z-index: 0;
        }
        
        /* Dark theme: filtered background with yellow glow */
        [data-theme="dark"] .howitworks-section::before {
          background: 
            radial-gradient(ellipse at center, rgba(255, 204, 0, 0.35) 0%, rgba(255, 220, 100, 0.2) 30%, transparent 70%),
            url('/illustration1.png') no-repeat;
          background-position: center 20%, center 20%;
          background-size: contain, contain;
          background-blend-mode: normal, multiply;
        }
        
        .howitworks-content {
          position: relative;
          z-index: 1;
        }
        
        @media (max-width: 767px) {
          .howitworks-section::before {
            display: none;
          }
        }
      `}</style>
      <section className="howitworks-section">
        <div className="howitworks-content">
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '0 20px', marginBottom: 44 }}>
        <p className="section-label" style={{ marginBottom: 8 }}>How It Works</p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
          fontWeight: 800, color: 'var(--color-text-primary)',
          margin: '0 0 10px', letterSpacing: '-0.03em', lineHeight: 1.15,
        }}>
          Your path to a{' '}
          <span style={{ color: 'var(--color-terra)' }}>smarter home deal</span>
        </h2>
        <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', margin: 0, maxWidth: 480, marginInline: 'auto', lineHeight: 1.6 }}>
          From first browse to builder contact - 3 simple steps to connect directly.
        </p>
      </div>

      {/* Steps - vertical timeline with alternating cards for desktop */}
      <div style={{ padding: '0 20px', maxWidth: 900, marginInline: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            {
              step: '01', Icon: Search,
              title: 'Browse Free',
              mobileDesc: 'Explore hundreds of verified builder listings - filter by city, budget, and type with no login required.',
              webDesc: 'Explore hundreds of verified builder listings with detailed property information, high-quality images, and pricing. Use advanced filters to narrow down by city, budget ranges, property types, and amenities. All this without creating an account or providing any personal information.',
              tag: 'No sign-up needed',
            },
            {
              step: '02', Icon: Unlock,
              title: 'Unlock Access',
              mobileDesc: 'Pay a one-time fee to reveal the builder\'s direct WhatsApp group link. Connect directly with builders.',
              webDesc: 'Pay a one-time fee to get exclusive access to the builder\'s direct WhatsApp group link. This eliminates middlemen and brokers, allowing you to communicate directly with the builder. Get instant responses to your queries, schedule site visits, and receive the latest updates directly from the source.',
              tag: 'One-time 99',
            },
            {
              step: '03', Icon: MessageCircle,
              title: 'Connect & Save',
              mobileDesc: 'Join the group, talk directly with the builder, negotiate deals, and enjoy exclusive group discounts.',
              webDesc: 'Join the exclusive WhatsApp group and engage in direct conversations with the builder and other potential buyers. Negotiate better deals, ask detailed questions about construction quality, payment plans, and possession dates. Benefit from exclusive group discounts available only to direct buyers, potentially saving up to 10% on your property purchase.',
              tag: 'Up to 10% off',
            },
          ].map(({ step, Icon, title, mobileDesc, webDesc, tag }, i, arr) => {
            const isActive = activeStep === i;
            const isEven = i % 2 === 1; // Even index (0, 2) = right, Odd index (1) = left
            
            return (
            <div key={step} className={`step-item ${isEven ? 'step-even' : 'step-odd'}`} style={{ 
              display: 'flex', 
              gap: 16, 
              position: 'relative',
              marginBottom: i < arr.length - 1 ? 20 : 0
            }}>
              {/* Icon circle */}
              <div className="step-connector" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                flexShrink: 0, 
                width: 48
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                  background: isActive ? 'var(--color-terra)' : 'var(--color-surface)',
                  border: isActive ? '2px solid var(--color-terra)' : '2px solid var(--color-border-default)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isActive ? '0 0 0 6px var(--color-terra-muted), var(--shadow-cta)' : 'var(--shadow-card)',
                  zIndex: 1, position: 'relative',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <Icon size={20} strokeWidth={2} color={isActive ? '#fff' : 'var(--color-terra)'} />
                </div>
                {i < arr.length - 1 && (
                  <div className="step-connector-line" style={{ 
                    flex: 1, 
                    width: 2, 
                    background: 'linear-gradient(to bottom, var(--color-terra-border), var(--color-border-subtle))', 
                    margin: '4px 0', 
                    minHeight: 32 
                  }} />
                )}
              </div>

              {/* Card */}
              <div className="step-card" style={{
                flex: 1,
                background: isActive ? 'var(--color-terra-muted)' : 'var(--color-surface)',
                border: `1.5px solid ${isActive ? 'var(--color-terra-subtle)' : 'var(--color-border-subtle)'}`,
                borderRadius: 18, padding: '16px 18px',
                boxShadow: isActive ? '0 4px 20px rgba(193,68,14,0.12)' : 'var(--shadow-card)',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', fontWeight: 700,
                    color: isActive ? 'var(--color-terra)' : 'var(--color-text-muted)',
                    letterSpacing: '0.08em',
                  }}>STEP {step}</span>
                  <span style={{
                    fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase',
                    padding: '3px 9px', borderRadius: 999,
                    background: isActive ? 'var(--color-terra)' : 'var(--color-surface-2)',
                    color: isActive ? '#fff' : 'var(--color-text-muted)',
                    border: isActive ? 'none' : '1px solid var(--color-border-subtle)',
                  }}>{tag}</span>
                </div>
                <p style={{ margin: '0 0 5px', fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>{title}</p>
                <p className="step-description-mobile" style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{mobileDesc}</p>
                <p className="step-description-web" style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, display: 'none' }}>{webDesc}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Mobile: all cards on the right, simple vertical timeline, no background */
        @media (max-width: 767px) {
          section {
            background: var(--color-canvas) !important;
          }
          
          .step-item {
            flex-direction: row !important;
          }
          .step-connector {
            order: 1 !important;
          }
          .step-card {
            order: 2 !important;
          }
          
          .step-description-mobile {
            display: block !important;
          }
          
          .step-description-web {
            display: none !important;
          }
        }
        
        /* Desktop: alternating cards with centered timeline and background */
        @media (min-width: 768px) {
          .step-item {
            position: relative;
            justify-content: center;
            align-items: flex-start;
          }
          
          .step-connector {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
          }
          
          .step-connector-line {
            position: absolute;
            top: 52px;
            left: 50%;
            transform: translateX(-50%);
            width: 2px !important;
            min-height: 152px !important;
          }
          
          .step-card {
            width: calc(50% - 40px);
            max-width: 400px;
          }
          
          .step-odd .step-card {
            margin-left: auto;
            order: 2;
          }
          
          .step-even .step-card {
            margin-right: auto;
            order: 1;
          }
          
          .step-odd .step-connector {
            order: 1;
          }
          
          .step-even .step-connector {
            order: 2;
          }
          
          .step-description-mobile {
            display: none !important;
          }
          
          .step-description-web {
            display: block !important;
          }
        }
      `}</style>

      {/* Bottom CTA strip */}
      <div style={{ textAlign: 'center', marginTop: 40, padding: '0 20px' }}>
        <Link href="/properties" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--color-terra)',
          color: '#fff', textDecoration: 'none',
          fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: '0.9375rem',
          padding: '14px 28px', borderRadius: 9999,
          boxShadow: 'var(--shadow-cta)',
        }}>
          Start browsing for free 
        </Link>
        <p style={{ marginTop: 10, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          No credit card required
        </p>
      </div>
        </div>
      </section>
    </>
  );
}
