import { PropertyCard } from './PropertyCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import type { Property } from '@/types';

interface PropertyGridProps {
  properties: Property[];
  loading?: boolean;
  skeletonCount?: number;
}

export function PropertyGrid({ properties, loading = false, skeletonCount = 6 }: PropertyGridProps) {
  if (loading) {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          padding: '0',
        }}
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '48px 24px',
          color: 'var(--color-text-muted)',
        }}
      >
        <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🏘️</p>
        <p style={{ fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>
          No properties found
        </p>
        <p style={{ fontSize: '0.875rem' }}>Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}
    >
      {properties.map(p => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
