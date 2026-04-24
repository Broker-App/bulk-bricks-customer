'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';

// ── Replace this with the actual YouTube video ID when available ──
const VIDEO_ID = 'YOUR_YOUTUBE_VIDEO_ID';
const VIDEO_EMBED = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`;

const HIGHLIGHTS = [
  {
    title: 'Browse 500+ Verified Properties',
    desc: 'Filter by city, budget, and property type — no account or commitment needed.',
  },
  {
    title: 'Pay Once, Access the Builder Directly',
    desc: 'A single flat fee unlocks the builder\'s private WhatsApp group for that property.',
  },
  {
    title: 'Negotiate as a Group',
    desc: 'Coordinate with other buyers in the group to get pricing and terms individuals can\'t access alone.',
  },
  {
    title: 'No Hidden Costs or Commissions',
    desc: 'You pay only the access fee — never a percentage of the property price.',
  },
];

export function VideoExplainer() {
  const [playing, setPlaying] = useState(false);

  return (
    <section style={{
      background: 'var(--color-surface)',
      borderTop: '1px solid var(--color-border-subtle)',
      borderBottom: '1px solid var(--color-border-subtle)',
      padding: 'clamp(48px, 8vw, 80px) 24px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section header */}
        <div style={{ marginBottom: 'clamp(32px, 5vw, 52px)' }}>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--color-terra)', marginBottom: '10px',
          }}>
            See It In Action
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
            fontWeight: 800, color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em', margin: '0 0 12px', lineHeight: 1.1,
          }}>
            How Bulk Bricks works —{' '}
            <span style={{ color: 'var(--color-terra)' }}>in 3 minutes</span>
          </h2>
          <p style={{
            color: 'var(--color-text-secondary)', lineHeight: 1.75,
            fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
            maxWidth: '520px', margin: 0,
          }}>
            From browsing to direct builder access — see exactly what happens when you unlock a
            property on Bulk Bricks.
          </p>
        </div>

        {/* Two-column layout */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: 'clamp(28px, 5vw, 56px)', alignItems: 'flex-start',
        }}>

          {/* ── Video player ── */}
          <div style={{ flex: '1 1 320px', maxWidth: '620px' }}>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              background: 'var(--color-canvas)',
              boxShadow: 'var(--shadow-card-hover)',
              aspectRatio: '16/9',
            }}>
              {playing ? (
                <iframe
                  src={VIDEO_EMBED}
                  title="How Bulk Bricks works"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    border: 'none',
                  }}
                />
              ) : (
                /* ── Thumbnail / play state ── */
                <div
                  role="button"
                  aria-label="Play video: How Bulk Bricks works"
                  tabIndex={0}
                  onClick={() => setPlaying(true)}
                  onKeyDown={e => e.key === 'Enter' && setPlaying(true)}
                  style={{
                    position: 'absolute', inset: 0, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(145deg, #2D1A12 0%, #5C2C1A 45%, #8B4513 100%)',
                  }}
                >
                  {/* Subtle grid texture overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `radial-gradient(circle at 25% 35%, rgba(196,90,47,0.25) 0%, transparent 50%),
                                      radial-gradient(circle at 75% 65%, rgba(196,90,47,0.15) 0%, transparent 45%)`,
                  }} />

                  {/* Floating label cards */}
                  <div style={{
                    position: 'absolute', top: '20px', left: '20px',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '6px 14px',
                    display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF' }}>
                      Group Buying Explained
                    </span>
                  </div>

                  <div style={{
                    position: 'absolute', bottom: '20px', right: '20px',
                    background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
                    borderRadius: 'var(--radius-md)', padding: '6px 12px',
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.03em' }}>
                      3:00
                    </span>
                  </div>

                  {/* Headline text in thumbnail */}
                  <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 48px' }}>
                    <p style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                      fontWeight: 800, color: '#FFFFFF',
                      lineHeight: 1.2, letterSpacing: '-0.02em',
                      margin: '0 0 28px', textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                    }}>
                      Buy smarter.<br />Buy together.
                    </p>

                    {/* Play button */}
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '50%',
                      background: 'var(--color-terra)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto',
                      boxShadow: '0 0 0 8px rgba(196,90,47,0.25), 0 8px 24px rgba(0,0,0,0.4)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    }}>
                      <Play size={26} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '3px' }} />
                    </div>

                    <p style={{
                      marginTop: '16px',
                      fontSize: '0.8125rem', color: 'rgba(255,255,255,0.65)',
                      fontWeight: 500,
                    }}>
                      Click to watch
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Video caption */}
            <p style={{
              marginTop: '12px', fontSize: '0.8125rem',
              color: 'var(--color-text-muted)', lineHeight: 1.6,
              textAlign: 'center',
            }}>
              A 3-minute walkthrough of the Bulk Bricks platform — from browsing to unlocking
              builder access and joining a buying group.
            </p>
          </div>

          {/* ── Info column ── */}
          <div style={{ flex: '1 1 260px', maxWidth: '400px' }}>
            <p style={{
              fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '20px',
            }}>
              What you'll learn
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {HIGHLIGHTS.map(({ title, desc }, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  padding: '18px 0',
                  borderBottom: i < HIGHLIGHTS.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'var(--color-terra-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: '1px',
                  }}>
                    <CheckCircle size={14} color="var(--color-terra)" strokeWidth={2.5} />
                  </div>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      fontSize: '0.9375rem', color: 'var(--color-text-primary)',
                      margin: '0 0 4px',
                    }}>{title}</p>
                    <p style={{
                      fontSize: '0.875rem', color: 'var(--color-text-secondary)',
                      lineHeight: 1.65, margin: 0,
                    }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Button asChild variant="terra" size="md">
                <Link href="/properties">Start Browsing Properties →</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/about">Learn More About Bulk Bricks <ArrowRight size={14} /></Link>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
