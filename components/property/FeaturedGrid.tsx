'use client';

import { PropertyCard } from './PropertyCard';
import type { Property } from '@/types';

interface FeaturedGridProps {
  properties: Property[];
}

export function FeaturedGrid({ properties }: FeaturedGridProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px',
        padding: '8px 16px',
        overflowX: 'auto',
        gridAutoFlow: 'column',
        gridAutoColumns: '280px',
      }}
      className="featured-scroll"
    >
      {properties.map(p => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
