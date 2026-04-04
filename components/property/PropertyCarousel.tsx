import { PropertyCard } from './PropertyCard';
import type { Property } from '@/types';

interface PropertyCarouselProps {
  properties: Property[];
  cardWidth?: number;
}

export function PropertyCarousel({ properties, cardWidth = 280 }: PropertyCarouselProps) {
  if (properties.length === 0) return null;

  return (
    <div className="scroll-x" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
      {properties.map(p => (
        <div key={p.id} style={{ width: cardWidth, minWidth: cardWidth }}>
          <PropertyCard property={p} compact />
        </div>
      ))}
    </div>
  );
}
