'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Star, Users, MapPin, ArrowUpDown, Home, IndianRupee, X } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/buttons/Button';
import { createClient } from '@/lib/supabase/client';

interface FilterSheetProps {
  open: boolean;
  onClose: () => void;
}

const labelStyle: React.CSSProperties = {
  fontSize: '0.8125rem', fontWeight: 600,
  color: 'var(--color-text-secondary)',
  marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px',
};
const selectStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 'var(--radius-md)',
  border: '1px solid var(--color-border-default)',
  background: 'var(--color-surface-3)',
  color: 'var(--color-text-primary)',
  fontFamily: 'var(--font-ui)', fontSize: '0.9rem', outline: 'none',
  cursor: 'pointer',
};
const inputStyle: React.CSSProperties = {
  ...selectStyle, cursor: 'text',
};
const toggleBtn = (active: boolean): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: '7px',
  padding: '9px 16px', borderRadius: 'var(--radius-pill)',
  border: `1.5px solid ${active ? 'var(--color-terra)' : 'var(--color-border-default)'}`,
  background: active ? 'var(--color-terra-muted)' : 'transparent',
  color: active ? 'var(--color-terra)' : 'var(--color-text-secondary)',
  cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600,
  transition: 'all 0.15s ease', flexShrink: 0,
});

const PRICE_PRESETS = [
  { label: 'Under ₹50L',   min: '',          max: '5000000' },
  { label: '₹50L – 1Cr',  min: '5000000',   max: '10000000' },
  { label: '₹1Cr – 2Cr',  min: '10000000',  max: '20000000' },
  { label: '₹2Cr – 5Cr',  min: '20000000',  max: '50000000' },
  { label: 'Above ₹5Cr',  min: '50000000',  max: '' },
];

export function FilterSheet({ open, onClose }: FilterSheetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ── State ─────────────────────────────────────────────────────
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [cities,     setCities]     = useState<string[]>([]);
  const [areas,      setAreas]      = useState<string[]>([]);
  const [loadingAreas, setLoadingAreas] = useState(false);

  const [category,     setCategory]     = useState(searchParams.get('category') ?? '');
  const [typeId,       setTypeId]       = useState(searchParams.get('typeId') ?? '');
  const [city,         setCity]         = useState(searchParams.get('city') ?? '');
  const [area,         setArea]         = useState(searchParams.get('area') ?? '');
  const [minPrice,     setMinPrice]     = useState(searchParams.get('minPrice') ?? '');
  const [maxPrice,     setMaxPrice]     = useState(searchParams.get('maxPrice') ?? '');
  const [sortBy,       setSortBy]       = useState(searchParams.get('sortBy') ?? '');
  const [featured,     setFeatured]     = useState(searchParams.get('featured') === 'true');

  // ── Fetch Categories & Cities on first open ───────────────────
  useEffect(() => {
    if (!open) return;
    const sb = createClient();

    if (propertyTypes.length === 0) {
      sb.from('properties')
        .select('property_type')
        .eq('status', 'active')
        .is('deleted_at', null)
        .not('property_type', 'is', null)
        .then(({ data }) => {
          const uniqueTypes = [
            ...new Set((data ?? []).map(r => r.property_type as string).filter(Boolean)),
          ].sort();
          setPropertyTypes(uniqueTypes);
        });
    }

    if (cities.length === 0) {
      sb.from('properties')
        .select('location_city')
        .eq('status', 'active')
        .is('deleted_at', null)
        .then(({ data }) => {
          const unique = [...new Set((data ?? []).map(r => r.location_city as string).filter(Boolean))].sort();
          setCities(unique);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ── Fetch distinct areas when city changes ────────────────────
  useEffect(() => {
    setArea('');   // reset area when city changes
    setAreas([]);
    if (!city) return;
    setLoadingAreas(true);
    createClient()
      .from('properties')
      .select('location_area')
      .eq('status', 'active')
      .is('deleted_at', null)
      .eq('location_city', city)
      .then(({ data }) => {
        const unique = [
          ...new Set(
            (data ?? [])
              .map(r => r.location_area as string | null)
              .filter((a): a is string => !!a && a.trim() !== '')
          ),
        ].sort();
        setAreas(unique);
        setLoadingAreas(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  // ── Active filter count ───────────────────────────────────────
  const activeCount = [category, typeId, city, area, minPrice, maxPrice, sortBy]
    .filter(v => !!v).length + (featured ? 1 : 0);

  // ── Preset price helper ───────────────────────────────────────
  const applyPreset = (preset: typeof PRICE_PRESETS[number]) => {
    setMinPrice(preset.min);
    setMaxPrice(preset.max);
  };

  const currentPreset = PRICE_PRESETS.find(p => p.min === minPrice && p.max === maxPrice);

  // ── Apply & Reset ─────────────────────────────────────────────
  const apply = () => {
    const params = new URLSearchParams();
    const q = searchParams.get('search');
    if (q)           params.set('search', q);
    if (category)    params.set('category', category);
    if (typeId)      params.set('typeId', typeId);
    if (city)        params.set('city', city);
    if (area.trim()) params.set('area', area.trim());
    if (minPrice)    params.set('minPrice', minPrice);
    if (maxPrice)    params.set('maxPrice', maxPrice);
    if (sortBy)      params.set('sortBy', sortBy);
    if (featured)    params.set('featured', 'true');
    router.push(`/properties?${params.toString()}`);
    onClose();
  };

  const reset = () => {
    setCategory(''); setTypeId(''); setCity(''); setArea('');
    setMinPrice(''); setMaxPrice(''); setSortBy('');
    setFeatured(false);
    router.push('/properties');
    onClose();
  };

  // ── Clear single field helper ─────────────────────────────────
  const ClearBtn = ({ onClick }: { onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        marginLeft: 'auto', background: 'none', border: 'none',
        cursor: 'pointer', color: 'var(--color-text-muted)',
        display: 'flex', alignItems: 'center', padding: 0, fontSize: '0.75rem', gap: '2px',
      }}
    >
      <X size={12} /> Clear
    </button>
  );

  return (
    <Modal open={open} onClose={onClose} title={`Filter Properties${activeCount > 0 ? ` (${activeCount})` : ''}`}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

        {/* ── Category: Residential / Commercial ── */}
        <div>
          <label style={labelStyle}>
            <Home size={13} /> Category
            {category && <ClearBtn onClick={() => setCategory('')} />}
          </label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { v: '',            label: 'All' },
              { v: 'residential', label: 'Residential' },
              { v: 'commercial',  label: 'Commercial' },
            ].map(opt => (
              <button key={opt.v} style={toggleBtn(category === opt.v)} onClick={() => setCategory(opt.v)}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Location Fields in Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {/* Property Type */}
          {propertyTypes.length > 0 && (
            <div>
              <label style={labelStyle}>
                Property Type
                {typeId && <ClearBtn onClick={() => setTypeId('')} />}
              </label>
              <select id="filter-type" value={typeId} onChange={e => setTypeId(e.target.value)} style={selectStyle}>
                <option value="">All Types</option>
                {propertyTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          )}

          {/* City */}
          <div>
            <label style={labelStyle}>
              <MapPin size={13} /> City
              {city && <ClearBtn onClick={() => { setCity(''); setArea(''); setAreas([]); }} />}
            </label>
            <select id="filter-city" value={city} onChange={e => setCity(e.target.value)} style={selectStyle}>
              <option value="">All Cities</option>
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Area shown only when a city is selected */}
          {city && (
            <div>
              <label style={labelStyle}>
                <MapPin size={13} /> Area / Neighbourhood
                {area && <ClearBtn onClick={() => setArea('')} />}
              </label>
              <select
                id="filter-area"
                value={area}
                onChange={e => setArea(e.target.value)}
                style={{
                  ...selectStyle,
                  opacity: loadingAreas ? 0.6 : 1,
                }}
                disabled={loadingAreas || areas.length === 0}
              >
                {loadingAreas ? (
                  <option value="">Loading areas…</option>
                ) : areas.length === 0 ? (
                  <option value="">No specific areas found</option>
                ) : (
                  <>
                    <option value="">All areas in {city}</option>
                    {areas.map(a => <option key={a} value={a}>{a}</option>)}
                  </>
                )}
              </select>
            </div>
          )}
        </div>

        {/* ── Budget ── */}
        <div>
          <label style={labelStyle}>
            <IndianRupee size={13} /> Budget Range
            {(minPrice || maxPrice) && <ClearBtn onClick={() => { setMinPrice(''); setMaxPrice(''); }} />}
          </label>
          {/* Preset chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            {PRICE_PRESETS.map(preset => (
              <button
                key={preset.label}
                style={{
                  padding: '6px 12px', borderRadius: 'var(--radius-pill)',
                  border: `1.5px solid ${currentPreset?.label === preset.label ? 'var(--color-terra)' : 'var(--color-border-default)'}`,
                  background: currentPreset?.label === preset.label ? 'var(--color-terra-muted)' : 'transparent',
                  color: currentPreset?.label === preset.label ? 'var(--color-terra)' : 'var(--color-text-secondary)',
                  fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease',
                }}
                onClick={() => applyPreset(preset)}
              >
                {preset.label}
              </button>
            ))}
          </div>
          {/* Custom range */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <input
              id="filter-min-price"
              type="number"
              placeholder="Min (₹)"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              style={inputStyle}
            />
            <input
              id="filter-max-price"
              type="number"
              placeholder="Max (₹)"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* ── Sort By ── */}
        <div>
          <label style={labelStyle}>
            <ArrowUpDown size={13} /> Sort By
            {sortBy && <ClearBtn onClick={() => setSortBy('')} />}
          </label>
          <select
            id="filter-sort"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={selectStyle}
          >
            <option value="">Default (Featured first)</option>
            <option value="newest">Newest first</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {/* ── Special Filters ── */}
        <div>
          <label style={labelStyle}>Special Filters</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button style={toggleBtn(featured)} onClick={() => setFeatured(!featured)}>
              <Star size={13} strokeWidth={2.5} />
              Featured Only
            </button>
          </div>
        </div>

        {/* ── Actions ── */}
        <div style={{ display: 'flex', gap: '12px', paddingTop: '4px' }}>
          <Button variant="ghost" style={{ flex: 1 }} onClick={reset}>Reset All</Button>
          <Button variant="terra" style={{ flex: 1 }} onClick={apply}>
            Show Results
          </Button>
        </div>
      </div>
    </Modal>
  );
}
