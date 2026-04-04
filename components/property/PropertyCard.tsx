'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, MapPin, Users, Star } from 'lucide-react';
import { Chip } from '@/components/ui/Chip';
import { Avatar } from '@/components/ui/Avatar';
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

  const coverImage = property.images?.find(img => img.is_cover) ?? property.images?.[0];
  const builder = property.builder;
  const isFull = property.is_group_enabled &&
    property.group_size != null &&
    property.slots_filled >= property.group_size;

  return (
    <div className="pwa-card" style={{ position: 'relative' }}>
      {/* Cover image */}
      <Link href={`/properties/${property.id}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div
          style={{
            width: '100%',
            aspectRatio: compact ? '16/9' : '4/3',
            background: 'var(--color-img-placeholder)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={coverImage.alt_text ?? property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                fontSize: '0.75rem',
              }}
            >
              No Image
            </div>
          )}

          {/* Chips overlay */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
            }}
          >
            {property.property_type && (
              <Chip variant="type">{property.property_type.name}</Chip>
            )}
            {property.is_featured && <Chip variant="featured" icon={<Star size={11} strokeWidth={2.5} />}>Featured</Chip>}
            {property.is_group_enabled && (
              <Chip variant={isFull ? 'full' : 'group'} icon={<Users size={11} strokeWidth={2.5} />}>
                {isFull ? 'Group Full' : 'Group Buy'}
              </Chip>
            )}
            {property.status === 'sold' && <Chip variant="sold">Sold</Chip>}
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '12px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              margin: '0 0 4px',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {property.title}
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--color-text-muted)',
              fontSize: '0.8125rem',
              marginBottom: '10px',
            }}
          >
            <MapPin size={12} strokeWidth={2} />
            {property.location_area
              ? `${property.location_area}, ${property.location_city}`
              : property.location_city}
          </div>

          {property.target_price != null && (
            <p className="price-text" style={{ marginBottom: '10px' }}>
              {formatINR(property.target_price)}
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  color: 'var(--color-text-muted)',
                  marginLeft: '4px',
                }}
              >
                onwards
              </span>
            </p>
          )}

          {/* Builder row */}
          {builder && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Avatar name={builder.company_name} src={builder.logo_url} size="sm" />
              <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                {builder.company_name}
              </span>
              {builder.status === 'verified' && (
                <Chip variant="verified" style={{ padding: '1px 6px', fontSize: '10px' }}>✓</Chip>
              )}
            </div>
          )}

          {/* Slot bar */}
          {property.is_group_enabled && property.group_size != null && !compact && (
            <div style={{ marginTop: '10px' }}>
              <SlotBar filled={property.slots_filled} total={property.group_size} />
            </div>
          )}
        </div>
      </Link>

      {/* Favorite button (outside Link to avoid nested anchors) */}
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
