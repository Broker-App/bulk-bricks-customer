'use client';

import { useState, Suspense } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { FilterSheet } from '@/components/search/FilterSheet';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryPills } from '@/components/search/CategoryPills';

function FilterButton({ onClick }: { onClick: () => void }) {
  const searchParams = useSearchParams();

  // Count active filter params (exclude search and page — those are handled separately)
  const FILTER_KEYS = ['category', 'typeId', 'city', 'area', 'minPrice', 'maxPrice', 'sortBy', 'featured', 'group'];
  const activeCount = FILTER_KEYS.filter(k => !!searchParams.get(k)).length;

  return (
    <button
      id="open-filters-btn"
      onClick={onClick}
      aria-label="Open filters"
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', gap: '6px',
        padding: '12px 16px', borderRadius: 'var(--radius-pill)',
        background: activeCount > 0 ? 'var(--color-terra-muted)' : 'var(--color-surface)',
        border: `1.5px solid ${activeCount > 0 ? 'var(--color-terra)' : 'var(--color-border-default)'}`,
        color: activeCount > 0 ? 'var(--color-terra)' : 'var(--color-text-secondary)',
        fontFamily: 'var(--font-ui)',
        fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
        flexShrink: 0, whiteSpace: 'nowrap',
        transition: 'all 0.15s ease',
      }}
    >
      <SlidersHorizontal size={16} />
      Filters
      {activeCount > 0 && (
        <span style={{
          position: 'absolute',
          top: '-6px', right: '-6px',
          width: '18px', height: '18px',
          borderRadius: '50%',
          background: 'var(--color-terra)',
          color: '#fff',
          fontSize: '0.625rem',
          fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid var(--color-canvas)',
        }}>
          {activeCount}
        </span>
      )}
    </button>
  );
}

export default function PropertiesFilterBar() {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '0 16px', marginBottom: '8px' }}>
        <div style={{ flex: 1 }}>
          <Suspense fallback={null}>
            <SearchBar />
          </Suspense>
        </div>
        <Suspense fallback={
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '12px 16px', borderRadius: 'var(--radius-pill)',
            background: 'var(--color-surface)', border: '1.5px solid var(--color-border-default)',
            color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)',
            fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', flexShrink: 0,
          }}>
            <SlidersHorizontal size={16} /> Filters
          </button>
        }>
          <FilterButton onClick={() => setFilterOpen(true)} />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <CategoryPills />
        <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} />
      </Suspense>
    </>
  );
}
