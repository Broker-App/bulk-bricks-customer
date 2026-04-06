import Image from 'next/image';
import { Layers } from 'lucide-react';
import type { Amenity } from '@/types';

interface AmenityListProps {
  amenities: Amenity[];
}

export function AmenityList({ amenities }: AmenityListProps) {
  if (amenities.length === 0) return null;

  return (
    <div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600,
        color: 'var(--color-text-primary)', marginBottom: '14px' }}>
        Amenities
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '12px',
        }}
      >
        {amenities.map(amenity => (
          <div
            key={amenity.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 10px',
              background: 'var(--color-surface-2)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-subtle)',
              textAlign: 'center',
            }}
          >
            {amenity.icon_url ? (
              <Image src={amenity.icon_url} alt={amenity.title} width={24} height={24}
                style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
            ) : (
              <div style={{
                width: '24px', height: '24px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-text-muted)',
              }}>
                <Layers size={20} strokeWidth={1.5} />
              </div>
            )}
            <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-text-secondary)',
              lineHeight: 1.3 }}>
              {amenity.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
