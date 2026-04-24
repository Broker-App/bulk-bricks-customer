'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Users, BadgePercent, ArrowUpRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryPills } from '../search/CategoryPills';
import NeoBrutalistButton from '../ui/buttons/NeoBrutalistButton';

/* ─── Feature card ────────────────────────────────────────────── */
function FeatureCard({
  icon: Icon,
  title,
  highlight,
  desc,
  badge,
  stat,
  statLabel,
  accentColor = 'var(--color-terra)',
}: {
  icon: React.ElementType;
  title: string;
  highlight: string;
  desc: string;
  badge?: string;
  stat?: string;
  statLabel?: string;
  accentColor?: string;
}) {
  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--color-surface)',
        borderRadius: 20,
        padding: '1px',
        boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow 0.22s ease, transform 0.22s ease',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card-hover)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {/* gradient border */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 20,
        padding: 1,
        background: `linear-gradient(135deg, ${accentColor}55 0%, var(--color-border-subtle) 60%, transparent 100%)`,
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        pointerEvents: 'none',
      }} />

      <div style={{ borderRadius: 19, background: 'var(--color-surface)', padding: '18px 20px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {/* Icon with glow */}
        <div style={{
          width: 48, height: 48,
          borderRadius: 14,
          background: `color-mix(in srgb, ${accentColor} 12%, var(--color-surface))`,
          border: `1.5px solid color-mix(in srgb, ${accentColor} 25%, transparent)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 4px 16px color-mix(in srgb, ${accentColor} 20%, transparent)`,
        }}>
          <Icon size={22} strokeWidth={2} color={accentColor} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          {badge && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              background: accentColor,
              color: '#fff',
              fontSize: '0.5625rem', fontWeight: 700,
              letterSpacing: '0.06em', textTransform: 'uppercase',
              padding: '3px 8px', borderRadius: 999,
              marginBottom: 6,
            }}>
              <Zap size={9} strokeWidth={2.5} />{badge}
            </span>
          )}
          <p style={{ margin: '0 0 3px', fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
            {title}
          </p>
          <p style={{ margin: '0 0 5px', fontSize: '0.8125rem', fontWeight: 600, color: accentColor }}>
            {highlight}
          </p>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>
            {desc}
          </p>
        </div>

        {/* Stat bubble — desktop accent */}
        {stat && (
          <div style={{
            flexShrink: 0, textAlign: 'center',
            background: `color-mix(in srgb, ${accentColor} 10%, var(--color-canvas))`,
            borderRadius: 12, padding: '8px 12px',
            border: `1px solid color-mix(in srgb, ${accentColor} 20%, transparent)`,
          }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 800, color: accentColor, lineHeight: 1 }}>{stat}</p>
            <p style={{ margin: '3px 0 0', fontSize: '0.5625rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{statLabel}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Social proof strip ──────────────────────────────────────── */
function SocialProof() {
  const people = [
    { initials: 'RK', hue: 20 },
    { initials: 'PS', hue: 200 },
    { initials: 'AM', hue: 150 },
    { initials: 'VN', hue: 270 },
    { initials: 'SR', hue: 35 },
  ];

  const trustPills = [
    { icon: ShieldCheck, label: 'Verified Builders' },
    { icon: Zap,         label: 'Instant Access' },
    { icon: Star,        label: '4.9 Rated' },
  ];

  return (
    <div style={{ padding: '0 16px 24px' }}>
      <div style={{
        background: 'var(--color-surface)',
        borderRadius: 18,
        border: '1px solid var(--color-border-subtle)',
        boxShadow: 'var(--shadow-card)',
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Left: avatar stack + copy */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Avatar stack */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {people.map((p, i) => (
              <div key={i} style={{
                width: 32, height: 32, borderRadius: '50%',
                background: `hsl(${p.hue}, 65%, 58%)`,
                border: '2.5px solid var(--color-surface)',
                marginLeft: i === 0 ? 0 : -10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.625rem', fontWeight: 700, color: '#fff',
                zIndex: people.length - i, position: 'relative',
                boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
              }}>
                {p.initials}
              </div>
            ))}
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--color-terra)',
              border: '2.5px solid var(--color-surface)',
              marginLeft: -10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.5625rem', fontWeight: 800, color: '#fff',
              position: 'relative', zIndex: 0,
              boxShadow: '0 1px 4px rgba(193,68,14,0.3)',
            }}>150+</div>
          </div>

          {/* Stars + text */}
          <div>
            {/* 5-star row */}
            <div style={{ display: 'flex', gap: 2, marginBottom: 3 }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={11} fill="#F59E0B" color="#F59E0B" />
              ))}
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-primary)', marginLeft: 3 }}>4.9</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>
              Saved{' '}
              <strong style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>₹25 Cr+</strong>
              {' '}for{' '}
              <strong style={{ color: 'var(--color-text-primary)', fontWeight: 700 }}>150+ families</strong>
              {' '}—{' '}
              <span style={{ color: 'var(--color-terra)', fontWeight: 600 }}>10–15% below market.</span>
            </p>
          </div>
        </div>

        {/* Right: trust pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {trustPills.map(({ icon: PillIcon, label }) => (
            <div key={label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 10px',
              background: 'var(--color-terra-muted)',
              border: '1px solid var(--color-terra-subtle)',
              borderRadius: 9999,
              fontSize: '0.6875rem', fontWeight: 600,
              color: 'var(--color-terra)',
              whiteSpace: 'nowrap',
            }}>
              <PillIcon size={11} strokeWidth={2.5} />{label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section ────────────────────────────────────────────── */
export function HeroSection() {
  return (
    <div className="hero-root">

      {/* ── Main terracotta banner ─────────────────────────────── */}
      <div className="hero-banner">
        {/* Subtle tile texture overlay */}
        <div className="hero-tile-overlay" aria-hidden="true" />

        {/* Left: copy + CTA */}
        <div className="hero-copy">
          <p className="hero-eyebrow">Looking to buy your Dream Home?</p>

          <h1 className="hero-headline">
            Find Properties.<br />
            <span className="hero-headline-white">Join Group<br />Buying.</span>
          </h1>

          <p className="hero-subtext">
            Get direct builder access + exclusive group buying opportunities.
            Special group discounts and better pricing.
          </p>

          <NeoBrutalistButton 
            asChild
            variant="primary" 
            size="large"
          >
            <Link href="/properties">
              Explore Properties <ArrowUpRight size={18} strokeWidth={2.5} />
            </Link>
          </NeoBrutalistButton>
        </div>

        {/* Right: building photo */}
        <div className="hero-image-wrap" aria-hidden="true">
          <Image
            src="/hero-building2.png"
            alt="Modern residential apartment"
            width={800}
            height={600}
            priority
            className="hero-building-img"
          />
        </div>
      </div>

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
          stat="10%"
          statLabel="Avg saving"
          accentColor="var(--color-terra)"
        />
        <FeatureCard
          icon={BadgePercent}
          title="Exclusive Group Discounts"
          highlight="Better pricing through group buying power"
          desc="Join exclusive property groups and unlock special discounts not available to individual buyers."
          badge="Limited Time Offer"
          stat="150+"
          statLabel="Groups joined"
          accentColor="var(--color-success)"
        />
      </div>

      {/* ── Social proof ──────────────────────────────────────── */}
      <SocialProof />

    </div>
  );
}
