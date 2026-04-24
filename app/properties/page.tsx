import { Suspense } from 'react';
import { fetchProperties } from '@/lib/queries/properties';
import FilterBar from './FilterBar';
import { PropertiesInfiniteScrollClient } from './PropertiesInfiniteScrollClient';
import type { Property, PropertyCategory, PropertyFilters } from '@/types';

export const metadata = {
  title: 'Properties — Bulk Bricks',
  description: 'Browse all active property listings on Bulk Bricks.',
};

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    city?: string;
    area?: string;
    typeId?: string;
    minPrice?: string;
    maxPrice?: string;
    featured?: string;
    group?: string;
    sortBy?: string;
    amenities?: string;   // comma-separated amenity IDs
    page?: string;
  }>;
}

export default async function PropertiesPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  // Build filters object from search params
  const filters: PropertyFilters = {
    search:         sp.search,
    category:       sp.category as PropertyCategory | undefined,
    city:           sp.city,
    area:           sp.area,
    typeId:         sp.typeId,
    minPrice:       sp.minPrice ? Number(sp.minPrice) : undefined,
    maxPrice:       sp.maxPrice ? Number(sp.maxPrice) : undefined,
    isFeatured:     sp.featured === 'true',
    isGroupEnabled: sp.group === 'true',
    sortBy:         sp.sortBy as PropertyFilters['sortBy'],
    amenityIds:     sp.amenities ? sp.amenities.split(',').filter(Boolean) : undefined,
    page:           0, // Always page 0 for SSR
    pageSize:       8,
  };

  const { data, count } = await fetchProperties(filters);
  const initialProperties = (data ?? []) as unknown as Property[];

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>
      {/* Sticky search header — sits below the mobile top bar */}
      <div
        style={{
          position: 'sticky', top: 'var(--mobile-top-bar-height, 0)', zIndex: 40,
          background: 'var(--color-canvas)',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingTop: '12px', paddingBottom: '4px',
        }}
      >
        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>
      </div>

      {/* Results */}
      <div style={{ padding: '16px 16px 40px' }}>
        <Suspense fallback={
          <div style={{ textAlign: 'center', padding: '32px' }}>
            Loading properties...
          </div>
        }>
          <PropertiesInfiniteScrollClient 
            initialProperties={initialProperties} 
            totalCount={count ?? 0} 
            filters={filters} 
          />
        </Suspense>
      </div>
    </div>
  );
}
