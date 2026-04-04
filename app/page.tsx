import Link from 'next/link';
import { Suspense } from 'react';
import { Search, Unlock, MessageCircle, Users } from 'lucide-react';
import { fetchProperties } from '@/lib/queries/properties';
import { PropertyCarousel } from '@/components/property/PropertyCarousel';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryPills } from '@/components/search/CategoryPills';
import type { Property } from '@/types';

export const metadata = {
  title: 'Bulk Bricks — Find Properties',
  description: 'Discover verified properties from trusted builders across India.',
};

export default async function HomePage() {
  const [featuredRes, groupRes, recentRes] = await Promise.all([
    fetchProperties({ isFeatured: true, pageSize: 8 }),
    fetchProperties({ isGroupEnabled: true, pageSize: 8 }),
    fetchProperties({ pageSize: 8 }),
  ]);

  const featured = (featuredRes.data ?? []) as unknown as Property[];
  const groupBuy = ((groupRes.data ?? []) as unknown as Property[]).filter(p => !p.is_featured);
  const recent   = (recentRes.data ?? []) as unknown as Property[];

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(160deg, var(--color-surface) 0%, var(--color-canvas) 100%)',
          padding: '40px 20px 28px',
        }}
      >
        <p className="section-label" style={{ marginBottom: '8px' }}>Bulk Bricks</p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.15,
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
          }}
        >
          Find Your<br />
          <span style={{ color: 'var(--color-terra)' }}>Perfect Property</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 24px', fontSize: '0.9375rem' }}>
          Verified listings from trusted builders
        </p>
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
      </section>

      {/* ── Category Pills ─────────────────────────────────────────────── */}
      <Suspense fallback={null}>
        <CategoryPills />
      </Suspense>

      {/* ── Stats strip ───────────────────────────────────────────── */}
      <div style={{ background: 'var(--color-terra)', padding: '16px 20px',
        display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
        {[
          { value: '500+', label: 'Properties' },
          { value: '100+', label: 'Builders' },
          { value: '₹0',  label: 'Brokerage' },
        ].map(({ value, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 800,
              color: '#FFFFFF', margin: '0 0 2px', letterSpacing: '-0.02em' }}>{value}</p>
            <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.75)',
              fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* ── Featured ───────────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section style={{ paddingBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '20px 16px 12px' }}>
            <div>
              <p className="section-label" style={{ marginBottom: '2px' }}>Hand-picked</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
                color: 'var(--color-text-primary)', margin: 0 }}>
                Featured
              </h2>
            </div>
            <Link href="/properties?featured=true"
              style={{ fontSize: '0.875rem', color: 'var(--color-terra)', fontWeight: 600, textDecoration: 'none' }}>
              View all →
            </Link>
          </div>
          <PropertyCarousel properties={featured} />
        </section>
      )}

      {/* ── Group Buy ──────────────────────────────────────────────────── */}
      {groupBuy.length > 0 && (
        <section style={{ paddingBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '20px 16px 12px' }}>
            <div>
              <p className="section-label" style={{ marginBottom: '2px' }}>Better Together</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
                color: 'var(--color-text-primary)', margin: 0,
                display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Users size={18} color="var(--color-terra)" strokeWidth={2.5} />
                Group Buy Deals
              </h2>
            </div>
            <Link href="/properties?group=true"
              style={{ fontSize: '0.875rem', color: 'var(--color-terra)', fontWeight: 600, textDecoration: 'none' }}>
              View all →
            </Link>
          </div>
          <PropertyCarousel properties={groupBuy} />
        </section>
      )}

      {/* ── How It Works ────────────────────────────────────────── */}
      <section style={{ padding: '32px 20px', background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-subtle)' }}>
        <p className="section-label" style={{ marginBottom: '6px', textAlign: 'center' }}>How It Works</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700,
          color: 'var(--color-text-primary)', textAlign: 'center', margin: '0 0 28px', letterSpacing: '-0.02em' }}>
          Connect Directly. Pay Once.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { step: '01', Icon: Search,        title: 'Browse Free',       desc: 'Explore verified listings with no account needed.' },
            { step: '02', Icon: Unlock,         title: 'Unlock Access',     desc: 'Pay once to get the builder’s WhatsApp group link.' },
            { step: '03', Icon: MessageCircle,  title: 'Connect Directly',  desc: 'Join the group. Talk to the builder. Zero brokerage.' },
          ].map(({ step, Icon, title, desc }) => (
            <div key={step} style={{ padding: '20px', background: 'var(--color-surface-2)',
              borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)',
              display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                background: 'var(--color-terra-muted)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} color="var(--color-terra)" strokeWidth={2} />
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.9375rem',
                  color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
                  <span style={{ color: 'var(--color-terra)', marginRight: '6px' }}>{step}</span>{title}
                </p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recent Listings ────────────────────────────────────────────── */}
      <section style={{ padding: '20px 16px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <p className="section-label" style={{ marginBottom: '2px' }}>Just listed</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
              color: 'var(--color-text-primary)', margin: 0 }}>
              Recent Listings
            </h2>
          </div>
          <Link href="/properties"
            style={{ fontSize: '0.875rem', color: 'var(--color-terra)', fontWeight: 600, textDecoration: 'none' }}>
            View all →
          </Link>
        </div>
        <PropertyGrid properties={recent} />
      </section>
    </div>
  );
}
