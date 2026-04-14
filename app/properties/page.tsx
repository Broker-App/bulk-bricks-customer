import { Suspense } from 'react';
import { fetchProperties } from '@/lib/queries/properties';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import FilterBar from './FilterBar';
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
  const page = Math.max(0, parseInt(sp.page ?? '0', 10));

  const { data, count } = await fetchProperties({
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
    page,
    pageSize:       12,
  });

  const properties = (data ?? []) as unknown as Property[];
  const totalPages = Math.ceil((count ?? 0) / 12);

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
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
          {count ?? 0} {count === 1 ? 'property' : 'properties'} found
        </p>
        <PropertyGrid properties={properties} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <a
                key={i}
                href={`/properties?${new URLSearchParams({ ...sp, page: String(i) }).toString()}`}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', textDecoration: 'none',
                  fontWeight: 600, fontSize: '0.875rem',
                  background: i === page ? 'var(--color-terra)' : 'var(--color-surface)',
                  color: i === page ? '#fff' : 'var(--color-text-secondary)',
                  border: '1.5px solid var(--color-border-default)',
                }}
              >
                {i + 1}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
