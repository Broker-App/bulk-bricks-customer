import Link from 'next/link';
import { Suspense } from 'react';
import { fetchProperties } from '@/lib/queries/properties';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { FeaturedGrid } from '@/components/property/FeaturedGrid';
import { RecentGrid } from '@/components/property/RecentGrid';
import { WhatsAppButton } from '@/components/home/WhatsAppButton';
import { HeroSection } from '@/components/home/HeroSection';
import { HowItWorks } from '@/components/home/HowItWorks';
import { ConversationalSearch } from '@/components/search/ConversationalSearch';
import EMICalculator from '@/components/calculator/EMICalculator';
import { VideoExplainer } from '@/components/home/VideoExplainer';
import type { Property } from '@/types';

export const metadata = {
  title: 'Bulk Bricks — Find Properties',
  description: 'Discover verified properties from trusted builders across India.',
};

export default async function HomePage() {
  const [featuredRes, recentRes] = await Promise.all([
    fetchProperties({ isFeatured: true, pageSize: 4 }),
    fetchProperties({ pageSize: 6 }),
  ]);

  const featured = ((featuredRes.data ?? []) as unknown as Property[]).slice(0, 5);
  const recent = ((recentRes.data ?? []) as unknown as Property[]).slice(0, 8);

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <HeroSection />

      <div>
        <Suspense fallback={null}>
          <ConversationalSearch />
        </Suspense>
      </div>

      {/* ── Featured ───────────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section style={{ paddingBottom: '8px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '20px 16px 12px'
          }}>
            <div>
              <p className="section-label" style={{ marginBottom: '2px' }}>Hand-picked</p>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
                color: 'var(--color-text-primary)', margin: 0
              }}>
                Featured
              </h2>
            </div>
            <Link href="/properties?featured=true"
              style={{ fontSize: '0.875rem', color: 'var(--color-terra)', fontWeight: 600, textDecoration: 'none' }}>
              View all →
            </Link>
          </div>
          <FeaturedGrid properties={featured} />
        </section>
      )}

      
      {/* ── How It Works ────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── Video Explainer ─────────────────────────────────────── */}
      <VideoExplainer />

      {/* ── EMI Calculator ─────────────────────────────────────────────── */}
      <section style={{ 
        padding: '48px 16px', 
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-subtle)',
        borderBottom: '1px solid var(--color-border-subtle)'
      }}>
        <EMICalculator />
      </section>

      {/* ── Recent Listings ────────────────────────────────────────────── */}
      <section style={{ padding: '20px 16px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <p className="section-label" style={{ marginBottom: '2px' }}>Just listed</p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
              color: 'var(--color-text-primary)', margin: 0
            }}>
              Recent Listings
            </h2>
          </div>
          <Link href="/properties"
            style={{ fontSize: '0.875rem', color: 'var(--color-terra)', fontWeight: 600, textDecoration: 'none' }}>
            View all →
          </Link>
        </div>
        <RecentGrid properties={recent} />
      </section>

      {/* ── WhatsApp Button ─────────────────────────────────────────────────── */}
      <WhatsAppButton />
    </div>
  );
}
