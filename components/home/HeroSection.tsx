'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Users, BadgePercent, ArrowUpRight } from 'lucide-react';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryPills } from '../search/CategoryPills';

/* ─── Feature card ────────────────────────────────────────────── */
function FeatureCard({
  icon: Icon,
  title,
  highlight,
  desc,
  badge,
}: {
  icon: React.ElementType;
  title: string;
  highlight: string;
  desc: string;
  badge?: string;
}) {
  return (
    <div className="hero-feature-card">
      {badge && <span className="hero-feature-badge">{badge}</span>}
      <div className="hero-feature-icon">
        <Icon size={22} strokeWidth={2} color="var(--color-terra)" />
      </div>
      <div style={{ minWidth: 0 }}>
        <p className="hero-feature-title">{title}</p>
        <p className="hero-feature-highlight">{highlight}</p>
        <p className="hero-feature-desc">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Social proof strip ──────────────────────────────────────── */
function SocialProof() {
  /* Using initials-style avatars so no external images are needed */
  const people = [
    { initials: 'RK', hue: 20 },
    { initials: 'PS', hue: 35 },
    { initials: 'AM', hue: 50 },
    { initials: 'VN', hue: 15 },
    { initials: 'SR', hue: 40 },
  ];

  return (
    <div className="hero-social-proof">
      {/* Avatar stack */}
      <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {people.map((p, i) => (
          <div
            key={i}
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: `hsl(${p.hue}, 75%, 65%)`,
              border: '2px solid var(--color-surface)',
              marginLeft: i === 0 ? 0 : -9,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.625rem',
              fontWeight: 700,
              color: '#fff',
              zIndex: people.length - i,
              position: 'relative',
              letterSpacing: 0,
            }}
          >
            {p.initials}
          </div>
        ))}
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'var(--color-terra)',
            border: '2px solid var(--color-surface)',
            marginLeft: -9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.5rem',
            fontWeight: 700,
            color: '#fff',
            position: 'relative',
            zIndex: 0,
          }}
        >
          150+
        </div>
      </div>

      {/* Text */}
      <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
        We&apos;ve saved{' '}
        <strong style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>₹25 Crore</strong>
        {' '}for 150+ families —{' '}
        <span style={{ color: 'var(--color-terra)', fontWeight: 600 }}>10–15% below market price.</span>
      </p>
    </div>
  );
}

/* ─── Hero Section ────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <div className="hero-root">

      {/* ── Main terracotta banner ─────────────────────────────── */}
      <section className="hero-banner">
        {/* Subtle tile texture overlay */}
        <div className="hero-tile-overlay" aria-hidden="true" />

        {/* Left: copy + CTA */}
        <div className="hero-copy">
          <p className="hero-eyebrow">Looking to buy your Dream Home?</p>

          <h1 className="hero-headline">
            Find Properties.<br />
            <span className="hero-headline-white">Pay Zero<br />Brokerage.</span>
          </h1>

          <p className="hero-subtext">
            Get direct builder access + exclusive group buying discounts.
            100% broker commission passed back to you.
          </p>

          <Link href="/properties" className="hero-cta-btn">
            Explore Properties <ArrowUpRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Right: building photo */}
        <div className="hero-image-wrap" aria-hidden="true">
          <Image
            src="/hero-building.png"
            alt="Modern residential apartment"
            width={600}
            height={500}
            priority
            className="hero-building-img"
          />
        </div>
      </section>

      {/* ── Search bar — sits below the banner on the canvas ─── */}
      <div className="hero-search-outer">
        <Suspense fallback={null}>
          <SearchBar />
          {/* ── Category Pills ─────────────────────────────────────────────── */}
          <CategoryPills />

        </Suspense>
      </div>

      {/* ── Feature cards ─────────────────────────────────────── */}
      <div className="hero-features-row">
        <FeatureCard
          icon={Users}
          title="Buy as a Group"
          highlight="Get 5–10% Extra Discount"
          desc="Serious buyers team up & negotiate better deals with builders."
        />
        <FeatureCard
          icon={BadgePercent}
          title="100% Broker Commission Passback"
          highlight="We pass the full commission back to you"
          desc="Every rupee of broker commission becomes extra savings for you."
          badge="Limited Time Offer"
        />
      </div>

      {/* ── Social proof ──────────────────────────────────────── */}
      <SocialProof />

    </div>
  );
}
