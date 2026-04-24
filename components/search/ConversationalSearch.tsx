'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Home, Building, ChevronDown } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/buttons/Button';
import type { Amenity } from '@/types';

/* ─── Budget options (full rupees) ──────────────────────────────── */
const BUDGET_OPTIONS = [
  { label: 'any budget',    min: '',         max: ''         },
  { label: 'under ₹50L',   min: '',         max: '5000000'  },
  { label: '₹50L – 1Cr',  min: '5000000',  max: '10000000' },
  { label: '₹1Cr – 2Cr',  min: '10000000', max: '20000000' },
  { label: '₹2Cr+',       min: '20000000', max: ''         },
];

/* ─── Popular searches — fill state rather than navigate ─────────── */
const POPULAR: { label: string; state: Partial<SearchState> }[] = [
  {
    label: 'Residential in Mumbai',
    state: { category: 'residential', typeId: '', city: 'Mumbai', area: '', budgetIndex: 0 },
  },
  {
    label: 'Commercial Properties',
    state: { category: 'commercial', typeId: '', city: '', area: '', budgetIndex: 0 },
  },
  {
    label: 'Budget Under ₹50L',
    state: { category: '', typeId: '', city: '', area: '', budgetIndex: 1 },
  },
  {
    label: 'Luxury Homes ₹2Cr+',
    state: { category: 'residential', typeId: '', city: '', area: '', budgetIndex: 3 },
  },
  {
    label: 'Bangalore Apartments',
    state: { category: 'residential', typeId: 'Apartment', city: 'Bangalore', area: '', budgetIndex: 0 },
  },
  {
    label: 'Delhi Commercial',
    state: { category: 'commercial', typeId: '', city: 'Delhi', area: '', budgetIndex: 0 },
  },
  {
    label: 'Pune Villas',
    state: { category: 'residential', typeId: 'Villa', city: 'Pune', area: '', budgetIndex: 2 },
  },
  {
    label: 'With Parking',
    state: { category: '', typeId: '', city: '', area: '', budgetIndex: 0, amenityId: '1' },
  },
  {
    label: 'Gym & Pool',
    state: { category: '', typeId: '', city: '', area: '', budgetIndex: 0, amenityId: '2' },
  },
  {
    label: 'Chennai Under ₹1Cr',
    state: { category: '', typeId: '', city: 'Chennai', area: '', budgetIndex: 2 },
  },
];

interface SearchState {
  category: string;
  typeId: string;
  city: string;
  area: string;
  budgetIndex: number;
  amenityId: string;
}

/* ─── Styled inline select ───────────────────────────────────────── */
function Word({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontSize: 'clamp(1rem, 2.5vw, 1.15rem)',
      color: 'var(--color-text-secondary)',
      fontFamily: 'var(--font-ui)',
      fontWeight: 400,
      alignSelf: 'center',
      flexShrink: 0,
      lineHeight: 1,
    }}>
      {children}
    </span>
  );
}

function InlineDrop({
  id,
  value,
  onChange,
  children,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  const hasValue = !!value;
  return (
    <select
      id={id}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: '7px 10px',
        fontSize: 'clamp(0.9375rem, 2.2vw, 1.05rem)',
        fontFamily: 'var(--font-ui)',
        fontWeight: 700,
        color: hasValue ? 'var(--color-terra)' : 'var(--color-text-muted)',
        background: hasValue ? 'var(--color-terra-muted)' : 'var(--color-canvas)',
        border: `1.5px solid ${hasValue ? 'var(--color-terra-border)' : 'var(--color-border-default)'}`,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        outline: 'none',
        maxWidth: '100%',
        appearance: 'auto',
        transition: 'all 0.15s ease',
        flexShrink: 0,
      }}
    >
      {children}
    </select>
  );
}

/* ─── Main Component ─────────────────────────────────────────────── */
export function ConversationalSearch() {
  const router = useRouter();

  const [cities,    setCities]    = useState<string[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [areas,     setAreas]     = useState<string[]>([]);
  const [types,     setTypes]     = useState<string[]>([]);

  const [category,    setCategory]    = useState('');
  const [typeId,      setTypeId]      = useState('');
  const [city,        setCity]        = useState('');
  const [area,        setArea]        = useState('');
  const [budgetIndex, setBudgetIndex] = useState(0);
  const [amenityId,   setAmenityId]   = useState('');
  
  /* Fetch cities + amenities on mount */
  useEffect(() => {
    const sb = createClient();

    sb.from('properties')
      .select('location_city')
      .eq('status', 'active')
      .is('deleted_at', null)
      .then(({ data }) => {
        const unique = [
          ...new Set((data ?? []).map(r => r.location_city as string).filter(Boolean)),
        ].sort();
        setCities(unique);
      });

    sb.from('amenities')
      .select('id, title, icon_url')
      .order('title')
      .then(({ data }) => setAmenities((data ?? []) as Amenity[]));

    sb.from('properties')
      .select('property_type')
      .eq('status', 'active')
      .is('deleted_at', null)
      .not('property_type', 'is', null)
      .then(({ data }) => {
        const uniqueTypes = [
          ...new Set((data ?? []).map(r => r.property_type as string).filter(Boolean)),
        ].sort();
        setTypes(uniqueTypes);
      });
  }, []);

  /* Fetch distinct areas whenever city changes */
  useEffect(() => {
    setArea('');
    setAreas([]);
    if (!city) return;
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
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  /* Apply a popular search preset — fills the sentence, doesn't navigate */
  const applyPreset = (preset: typeof POPULAR[number]) => {
    if (preset.state.category    !== undefined) setCategory(preset.state.category);
    if (preset.state.typeId      !== undefined) setTypeId(preset.state.typeId);
    if (preset.state.city        !== undefined) { setCity(preset.state.city); setArea(''); }
    if (preset.state.area        !== undefined) setArea(preset.state.area);
    if (preset.state.budgetIndex !== undefined) setBudgetIndex(preset.state.budgetIndex);
    if (preset.state.amenityId   !== undefined) setAmenityId(preset.state.amenityId);
  };

  /* Build URL and navigate */
  const handleSearch = () => {
    const params = new URLSearchParams();
    const budget = BUDGET_OPTIONS[budgetIndex];
    if (category)        params.set('category', category);
    if (typeId)          params.set('typeId', typeId);
    if (city)            params.set('city', city);
    if (area)            params.set('area', area);
    if (budget.min)      params.set('minPrice', budget.min);
    if (budget.max)      params.set('maxPrice', budget.max);
    if (amenityId)       params.set('amenities', amenityId);
    router.push(`/properties?${params.toString()}`);
  };

  /* Whether any field is filled (controls sentence highlight) */
  const budgetLabel = BUDGET_OPTIONS[budgetIndex].label;

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: '24px 20px 20px',
      margin: '12px 16px 4px',
      boxShadow: 'var(--shadow-card)',
    }}>

      {/* Header */}
      <div style={{ marginBottom: '18px' }}>
        <p style={{
          fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
          color: 'var(--color-terra)', textTransform: 'uppercase', margin: '0 0 3px',
        }}>
          Smart Search
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700,
          color: 'var(--color-text-primary)', margin: 0, letterSpacing: '-0.01em',
        }}>
          Find Your Perfect Property
        </h2>
      </div>

      {/* ── The Sentence ──────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '8px 10px',
        padding: '18px 16px',
        background: 'var(--color-canvas)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-subtle)',
        marginBottom: '18px',
        lineHeight: 1,
      }}>
        <Word>I&apos;m looking for</Word>

        <InlineDrop id="cs-category" value={category} onChange={setCategory}>
          <option value="">any category of</option>
          <option value="residential">residential</option>
          <option value="commercial">commercial</option>
        </InlineDrop>

        <InlineDrop id="cs-type" value={typeId} onChange={setTypeId}>
          <option value="">property</option>
          {types.map(t => <option key={t} value={t}>{t.toLowerCase()}</option>)}
        </InlineDrop>

        <Word>in</Word>

        <InlineDrop id="cs-city" value={city} onChange={v => { setCity(v); setArea(''); }}>
          <option value="">any city</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </InlineDrop>

        {/* Area — only appears when a city is chosen and has areas */}
        {city && areas.length > 0 && (
          <>
            <Word>in</Word>
            <InlineDrop id="cs-area" value={area} onChange={setArea}>
              <option value="">any area</option>
              {areas.map(a => <option key={a} value={a}>{a}</option>)}
            </InlineDrop>
          </>
        )}

        <Word>with</Word>

        <InlineDrop
          id="cs-budget"
          value={String(budgetIndex)}
          onChange={v => setBudgetIndex(Number(v))}
        >
          {BUDGET_OPTIONS.map((b, i) => (
            <option key={b.label} value={String(i)}>{b.label}</option>
          ))}
        </InlineDrop>

        {amenities.length > 0 && (
          <>
            <Word>that has</Word>
            <InlineDrop id="cs-amenity" value={amenityId} onChange={setAmenityId}>
              <option value="">any amenities</option>
              {amenities.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
            </InlineDrop>
          </>
        )}

              </div>

      {/* ── Search button ──────────────────────────────────────────── */}
      <Button
        id="cs-search-btn"
        onClick={handleSearch}
        style={{ marginBottom: '18px' }}
      >
        <Search size={17} strokeWidth={2.5} />
        Search Properties
      </Button>

      {/* ── Popular searches — pre-fill the sentence ───────────────── */}
      <div style={{
        borderTop: '1px solid var(--color-border-subtle)',
        paddingTop: '14px',
      }}>
        <p style={{
          fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em',
          color: 'var(--color-text-muted)', marginBottom: '10px',
          textTransform: 'uppercase',
        }}>
          Quick Fill
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {POPULAR.map(p => (
            <Button
              key={p.label}
              onClick={() => applyPreset(p)}
              variant="outline"
              size="sm"
              style={{
                padding: '7px 14px',
                fontSize: '0.8125rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}
            >
              ↗ {p.label}
            </Button>
          ))}
        </div>
      </div>

    </div>
  );
}
