'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Users, Star, Images, TrendingDown } from 'lucide-react';
import { SlotBar } from '@/components/ui/SlotBar';
import { useWishlist } from '@/contexts/WishlistContext';
import { formatINR } from '@/utils/format';
import type { Property } from '@/types';

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(property.id);

  const coverImage = property.images?.find((img) => img.is_cover) ?? property.images?.[0];
  const imageCount = property.images?.length ?? 0;
  const builder    = property.builder;

  const isGroupEnabled = property.is_group_enabled && property.group_size != null;
  const isFull  = isGroupEnabled && property.slots_filled >= property.group_size!;
  const slotsLeft = isGroupEnabled ? property.group_size! - property.slots_filled : 0;

  const location = property.location_area
    ? `${property.location_area}, ${property.location_city}`
    : property.location_city;

  const categoryLabel = property.category === 'residential' ? 'Residential' : 'Commercial';
  const subtitleParts = [categoryLabel, location].filter(Boolean);

  return (
    <div className="pwa-card" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>

      {/* ── Image ──────────────────────────────────────────────────── */}
      <Link href={`/properties/${property.id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{
          width: '100%',
          aspectRatio: compact ? '16/9' : '16/9',
          background: 'var(--color-img-placeholder)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        }}>
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={coverImage.alt_text ?? property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--color-text-muted)', fontSize: '0.8125rem',
              flexDirection: 'column', gap: '6px',
            }}>
              <Images size={28} strokeWidth={1.5} />
              No Image
            </div>
          )}

          {/* Gradient scrim at bottom for legibility */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)',
            pointerEvents: 'none',
          }} />

          {/* ── Bottom-left: location pill ── */}
          <div style={{
            position: 'absolute', bottom: '10px', left: '10px',
            display: 'flex', alignItems: 'center', gap: '4px',
            background: 'rgba(0,0,0,0.52)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            borderRadius: '99px',
            padding: '4px 10px',
          }}>
            <MapPin size={11} color="#FFFFFF" strokeWidth={2.5} />
            <span style={{
              fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF',
              lineHeight: 1, whiteSpace: 'nowrap',
            }}>
              {property.location_city}
            </span>
          </div>

          {/* ── Bottom-right: image count pill ── */}
          {imageCount > 0 && (
            <div style={{
              position: 'absolute', bottom: '10px', right: '10px',
              display: 'flex', alignItems: 'center', gap: '4px',
              background: 'rgba(0,0,0,0.52)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              borderRadius: '99px',
              padding: '4px 10px',
            }}>
              <Images size={11} color="#FFFFFF" strokeWidth={2} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1 }}>
                {imageCount}
              </span>
            </div>
          )}

          {/* ── Top-left: Featured badge ── */}
          {property.is_featured && (
            <div style={{
              position: 'absolute', top: '10px', left: '10px',
              display: 'flex', alignItems: 'center', gap: '5px',
              background: 'rgba(255,255,255,0.96)',
              borderRadius: '99px',
              padding: '4px 10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}>
              <div style={{
                width: '7px', height: '7px', borderRadius: '50%',
                background: 'var(--color-warning)',
              }} />
              <span style={{
                fontSize: '0.6875rem', fontWeight: 700,
                color: 'var(--color-warning)', letterSpacing: '0.05em',
                textTransform: 'uppercase', lineHeight: 1,
              }}>
                Featured
              </span>
            </div>
          )}

          {/* ── Sold badge ── */}
          {property.status === 'sold' && (
            <div style={{
              position: 'absolute', top: '10px', left: '10px',
              display: 'flex', alignItems: 'center', gap: '5px',
              background: 'rgba(255,255,255,0.96)',
              borderRadius: '99px',
              padding: '4px 10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--color-text-muted)' }} />
              <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--color-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: 1 }}>
                Sold
              </span>
            </div>
          )}
        </div>

        {/* ── Card body ──────────────────────────────────────────────── */}
        <div style={{ padding: '14px 14px 0' }}>

          {/* Title */}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            margin: '0 0 3px',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {property.title}
          </h3>

          {/* Subtitle: Category · Location */}
          <p style={{
            fontSize: '0.8125rem',
            color: 'var(--color-text-muted)',
            margin: '0 0 10px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {subtitleParts.join(' · ')}
          </p>

          {/* Group Buy row + slot bar */}
          {isGroupEnabled && (
            <div style={{ marginBottom: '10px' }}>
              {/* Row: chip + members + slots left */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                {/* "Group" chip */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '3px',
                  padding: '3px 9px',
                  background: isFull ? 'var(--color-concrete-200)' : 'var(--color-terra-muted)',
                  borderRadius: '99px',
                  fontSize: '0.75rem', fontWeight: 700,
                  color: isFull ? 'var(--color-text-muted)' : 'var(--color-terra)',
                }}>
                  <Users size={11} strokeWidth={2.5} />
                  Group
                </span>
                {/* Members count */}
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                  {property.slots_filled}/{property.group_size} members
                </span>
                {/* Slots left */}
                {!isFull && slotsLeft > 0 && (
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-terra)' }}>
                    {slotsLeft} slot{slotsLeft !== 1 ? 's' : ''} left
                  </span>
                )}
                {isFull && (
                  <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-muted)' }}>
                    Group Full
                  </span>
                )}
              </div>
              {/* Progress bar */}
              <SlotBar filled={property.slots_filled} total={property.group_size!} showLabel={false} />
            </div>
          )}
        </div>
      </Link>

      {/* ── Price section + builder row ── */}
      <div style={{ padding: '10px 14px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* Price display */}
        {property.target_price != null && (() => {
          const savings = property.dev_price != null
            ? property.dev_price - property.target_price
            : null;
          return (
            <Link href={`/properties/${property.id}`} style={{ textDecoration: 'none' }}>
              {/* Row 1: target price + savings badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.375rem',
                  fontWeight: 700,
                  color: 'var(--color-terra)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>
                  {formatINR(property.target_price)}
                </span>
                {savings != null && savings > 0 && (
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '3px',
                    padding: '3px 8px',
                    background: 'var(--color-success-bg)',
                    border: '1px solid var(--color-success)',
                    borderRadius: '99px',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'var(--color-success)',
                    letterSpacing: '0.01em',
                    whiteSpace: 'nowrap',
                  }}>
                    <TrendingDown size={11} strokeWidth={2.5} />
                    {formatINR(savings)} off
                  </span>
                )}
              </div>
              {/* Row 2: dev price strikethrough */}
              {property.dev_price != null && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px',
                }}>
                  <span style={{
                    fontSize: '0.8125rem',
                    color: 'var(--color-text-muted)',
                    textDecoration: 'line-through',
                    textDecorationColor: 'var(--color-text-muted)',
                  }}>
                    {formatINR(property.dev_price)}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    color: 'var(--color-text-muted)',
                    fontWeight: 500,
                  }}>
                    Market price
                  </span>
                </div>
              )}
            </Link>
          );
        })()}

        {/* Builder row */}
        {builder && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={12} strokeWidth={2} color="var(--color-text-muted)" />
            <span style={{
              fontSize: '0.8125rem',
              color: 'var(--color-text-secondary)',
              fontWeight: 500,
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {builder.company_name}
            </span>
            {builder.status === 'verified' && (
              <span style={{
                fontSize: '0.6875rem', fontWeight: 700,
                color: 'var(--color-success)',
                background: 'var(--color-success-bg)',
                borderRadius: '99px',
                padding: '2px 7px',
                letterSpacing: '0.03em',
                flexShrink: 0,
              }}>
                ✓ Verified
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Favourite button ── */}
      <button
        className={`btn-favorite${wishlisted ? ' active' : ''}`}
        onClick={() => toggle(property.id)}
        aria-label={wishlisted ? 'Remove from saved' : 'Save property'}
        style={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        <Heart
          size={16}
          strokeWidth={2}
          fill={wishlisted ? 'var(--color-danger)' : 'none'}
          color={wishlisted ? 'var(--color-danger)' : 'var(--color-text-secondary)'}
        />
      </button>
    </div>
  );
}
