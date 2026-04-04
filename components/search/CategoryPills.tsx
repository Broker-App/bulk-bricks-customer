'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Star, Users, type LucideIcon } from 'lucide-react';

const PILLS: { label: string; value: string; Icon?: LucideIcon }[] = [
  { label: 'All',        value: '' },
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial',  value: 'commercial' },
  { label: 'Featured',   value: 'featured', Icon: Star },
  { label: 'Group Buy',  value: 'group',    Icon: Users },
];

export function CategoryPills() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('category') ?? (
    searchParams.get('featured') === 'true' ? 'featured' :
    searchParams.get('group') === 'true'    ? 'group'    : ''
  );

  const handleClick = (value: string) => {
    const params = new URLSearchParams();
    const q = searchParams.get('search');
    if (q) params.set('search', q);
    if (value === 'featured') {
      params.set('featured', 'true');
    } else if (value === 'group') {
      params.set('group', 'true');
    } else if (value) {
      params.set('category', value);
    }
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="scroll-x" style={{ padding: '12px 0', paddingLeft: '16px', paddingRight: '16px' }}>
      {PILLS.map(pill => {
        const isActive = pill.value === current;
        return (
          <button
            key={pill.value}
            id={`category-pill-${pill.value || 'all'}`}
            onClick={() => handleClick(pill.value)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: 'var(--radius-pill)',
              border: `1.5px solid ${isActive ? 'var(--color-terra)' : 'var(--color-border-default)'}`,
              background: isActive ? 'var(--color-terra)' : 'var(--color-surface)',
              color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {pill.Icon && (
              <pill.Icon
                size={13}
                strokeWidth={2.5}
                color={isActive ? '#FFFFFF' : 'var(--color-text-secondary)'}
              />
            )}
            {pill.label}
          </button>
        );
      })}
    </div>
  );
}
