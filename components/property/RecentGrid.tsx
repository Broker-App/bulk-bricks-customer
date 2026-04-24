'use client';

import { PropertyCard } from './PropertyCard';
import type { Property } from '@/types';

interface RecentGridProps {
  properties: Property[];
}

export function RecentGrid({ properties }: RecentGridProps) {
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
      className="recent-scroll"
    >
      {properties.map(p => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
