'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get('search') ?? '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Only navigate after the user has actually typed — prevents auto-redirect on mount
  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!hasInteracted.current) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set('search', value.trim());
      } else {
        params.delete('search');
      }
      params.delete('page');
      router.push(`/properties?${params.toString()}`);
    }, 350);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="neuro-input"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'var(--shadow-float)',
      }}
    >
      <Search size={18} color="var(--color-terra)" strokeWidth={2} style={{ flexShrink: 0 }} />
      <input
        id="property-search"
        type="search"
        value={value}
        onChange={e => { hasInteracted.current = true; setValue(e.target.value); }}
        placeholder="Search by location, type…"
        aria-label="Search properties"
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.9375rem',
        }}
      />
      {value && (
        <button
          onClick={() => setValue('')}
          aria-label="Clear search"
          style={{ background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-text-muted)', display: 'flex', padding: 0 }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
