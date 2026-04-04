'use client';

import { useState, Suspense } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { FilterSheet } from '@/components/search/FilterSheet';
import { SearchBar } from '@/components/search/SearchBar';
import { CategoryPills } from '@/components/search/CategoryPills';

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
        <button
          id="open-filters-btn"
          onClick={() => setFilterOpen(true)}
          aria-label="Open filters"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '12px 16px', borderRadius: 'var(--radius-pill)',
            background: 'var(--color-surface)', border: '1.5px solid var(--color-border-default)',
            color: 'var(--color-text-secondary)', fontFamily: 'var(--font-ui)',
            fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
            flexShrink: 0, whiteSpace: 'nowrap',
          }}
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>
      <Suspense fallback={null}>
        <CategoryPills />
        <FilterSheet open={filterOpen} onClose={() => setFilterOpen(false)} />
      </Suspense>
    </>
  );
}
