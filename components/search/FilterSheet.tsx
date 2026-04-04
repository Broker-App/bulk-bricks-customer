'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Star, Users } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase/client';
import type { Category } from '@/types';

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
}

const CITIES = ['Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai', 'Delhi', 'Ahmedabad', 'Surat'];

export function FilterSheet({ open, onClose }: FilterSheetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [categories, setCategories] = useState<Category[]>([]);
  const [category,     setCategory]     = useState(searchParams.get('category') ?? '');
  const [typeId,       setTypeId]       = useState(searchParams.get('typeId') ?? '');
  const [city,         setCity]         = useState(searchParams.get('city') ?? '');
  const [minPrice,     setMinPrice]     = useState(searchParams.get('minPrice') ?? '');
  const [maxPrice,     setMaxPrice]     = useState(searchParams.get('maxPrice') ?? '');
  const [featured,     setFeatured]     = useState(searchParams.get('featured') === 'true');
  const [groupEnabled, setGroupEnabled] = useState(searchParams.get('group') === 'true');

  // Fetch property types on open
  useEffect(() => {
    if (!open || categories.length > 0) return;
    createClient()
      .from('categories')
      .select('id, name, slug, parent_id')
      .is('parent_id', null)
      .order('name')
      .then(({ data }) => setCategories((data ?? []) as Category[]));
  }, [open, categories.length]);

  const apply = () => {
    const params = new URLSearchParams();
    if (category)     params.set('category', category);
    if (typeId)       params.set('typeId', typeId);
    if (city)         params.set('city', city);
    if (minPrice)     params.set('minPrice', minPrice);
    if (maxPrice)     params.set('maxPrice', maxPrice);
    if (featured)     params.set('featured', 'true');
    if (groupEnabled) params.set('group', 'true');
    const q = searchParams.get('search');
    if (q) params.set('search', q);
    router.push(`/properties?${params.toString()}`);
    onClose();
  };

  const reset = () => {
    setCategory(''); setTypeId(''); setCity('');
    setMinPrice(''); setMaxPrice('');
    setFeatured(false); setGroupEnabled(false);
    router.push('/properties');
    onClose();
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px', display: 'block',
  };
  const selectStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-md)',
    border: '1px solid var(--color-border-default)', background: 'var(--color-surface-3)',
    color: 'var(--color-text-primary)', fontFamily: 'var(--font-ui)', fontSize: '0.9rem', outline: 'none',
  };
  const inputStyle: React.CSSProperties = { ...selectStyle };
  const toggleStyle = (active: boolean): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: '10px 16px', borderRadius: 'var(--radius-pill)',
    border: `1.5px solid ${active ? 'var(--color-terra)' : 'var(--color-border-default)'}`,
    background: active ? 'var(--color-terra-muted)' : 'transparent',
    color: active ? 'var(--color-terra)' : 'var(--color-text-secondary)',
    cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
    transition: 'all 0.15s ease',
  });

  return (
    <Modal open={open} onClose={onClose} title="Filter Properties">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Property Type (from categories table) */}
        <div>
          <label style={labelStyle}>Property Type</label>
          <select id="filter-type" value={typeId} onChange={e => setTypeId(e.target.value)} style={selectStyle}>
            <option value="">All Types</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Category (Residential / Commercial) */}
        <div>
          <label style={labelStyle}>Category</label>
          <select id="filter-category" value={category} onChange={e => setCategory(e.target.value)} style={selectStyle}>
            <option value="">All Categories</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        {/* City */}
        <div>
          <label style={labelStyle}>City</label>
          <select id="filter-city" value={city} onChange={e => setCity(e.target.value)} style={selectStyle}>
            <option value="">All Cities</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Price range */}
        <div>
          <label style={labelStyle}>Budget Range (₹)</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input id="filter-min-price" type="number" placeholder="Min" value={minPrice}
              onChange={e => setMinPrice(e.target.value)} style={inputStyle} />
            <input id="filter-max-price" type="number" placeholder="Max" value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)} style={inputStyle} />
          </div>
        </div>

        {/* Toggles */}
        <div>
          <label style={labelStyle}>Special Filters</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button style={toggleStyle(featured)} onClick={() => setFeatured(!featured)}>
              <Star size={14} strokeWidth={2} />
              Featured Only
            </button>
            <button style={toggleStyle(groupEnabled)} onClick={() => setGroupEnabled(!groupEnabled)}>
              <Users size={14} strokeWidth={2} />
              Group Buy
            </button>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '8px' }}>
          <Button variant="ghost" style={{ flex: 1 }} onClick={reset}>Reset</Button>
          <Button variant="terra" style={{ flex: 1 }} onClick={apply}>Apply Filters</Button>
        </div>
      </div>
    </Modal>
  );
}
