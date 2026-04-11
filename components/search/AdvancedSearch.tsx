'use client';

import { useState } from 'react';
import { Search, Filter, X, ChevronDown, MapPin, Home, DollarSign, Square, Bed, Bath } from 'lucide-react';

interface AdvancedSearchProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minArea?: number;
  maxArea?: number;
  amenities?: string[];
}

const propertyTypes = [
  { value: '', label: 'All Types' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'house', label: 'Independent House' },
  { value: 'villa', label: 'Villa' },
  { value: 'plot', label: 'Land/Plot' },
  { value: 'commercial', label: 'Commercial' },
];

const amenities = [
  { value: 'parking', label: 'Parking' },
  { value: 'gym', label: 'Gym' },
  { value: 'pool', label: 'Swimming Pool' },
  { value: 'security', label: '24/7 Security' },
  { value: 'lift', label: 'Lift' },
  { value: 'garden', label: 'Garden' },
  { value: 'power_backup', label: 'Power Backup' },
  { value: 'water_supply', label: '24/7 Water Supply' },
];

export function AdvancedSearch({ isOpen = false, onClose, onSearch }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<SearchFilters>({});

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities?.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...(prev.amenities || []), amenity]
    }));
  };

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const handleReset = () => {
    setFilters({});
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: '24px',
      margin: '0 16px 24px',
      boxShadow: 'var(--shadow-card)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'var(--color-terra)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Filter size={20} color="white" />
          </div>
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              margin: 0
            }}>
              Advanced Search
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              margin: '2px 0 0'
            }}>
              Find properties that match your exact needs
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'var(--color-canvas)',
            border: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={16} color="var(--color-text-secondary)" />
        </button>
      </div>

      {/* Search Form */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Location */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: '8px'
          }}>
            <MapPin size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Location
          </label>
          <input
            type="text"
            placeholder="Enter city, area, or landmark"
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '0.9375rem',
              color: 'var(--color-text-primary)',
              background: 'var(--color-canvas)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Property Type */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: '8px'
          }}>
            <Home size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Property Type
          </label>
          <select
            value={filters.propertyType || ''}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: '0.9375rem',
              color: 'var(--color-text-primary)',
              background: 'var(--color-canvas)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: '8px'
          }}>
            <DollarSign size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Price Range (Lakhs)
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              style={{
                flex: 1,
                padding: '12px 14px',
                fontSize: '0.9375rem',
                color: 'var(--color-text-primary)',
                background: 'var(--color-canvas)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                outline: 'none'
              }}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              style={{
                flex: 1,
                padding: '12px 14px',
                fontSize: '0.9375rem',
                color: 'var(--color-text-primary)',
                background: 'var(--color-canvas)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: '8px'
            }}>
              <Bed size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Min Bedrooms
            </label>
            <select
              value={filters.minBedrooms || ''}
              onChange={(e) => handleFilterChange('minBedrooms', e.target.value ? Number(e.target.value) : undefined)}
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '0.9375rem',
                color: 'var(--color-text-primary)',
                background: 'var(--color-canvas)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--color-text-secondary)',
              marginBottom: '8px'
            }}>
              <Bath size={14} style={{ display: 'inline', marginRight: '6px' }} />
              Min Bathrooms
            </label>
            <select
              value={filters.minBathrooms || ''}
              onChange={(e) => handleFilterChange('minBathrooms', e.target.value ? Number(e.target.value) : undefined)}
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '0.9375rem',
                color: 'var(--color-text-primary)',
                background: 'var(--color-canvas)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>

        {/* Area Range */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: '8px'
          }}>
            <Square size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Area Range (sq.ft.)
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              type="number"
              placeholder="Min"
              value={filters.minArea || ''}
              onChange={(e) => handleFilterChange('minArea', e.target.value ? Number(e.target.value) : undefined)}
              style={{
                flex: 1,
                padding: '12px 14px',
                fontSize: '0.9375rem',
                color: 'var(--color-text-primary)',
                background: 'var(--color-canvas)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                outline: 'none'
              }}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxArea || ''}
              onChange={(e) => handleFilterChange('maxArea', e.target.value ? Number(e.target.value) : undefined)}
              style={{
                flex: 1,
                padding: '12px 14px',
                fontSize: '0.9375rem',
                color: 'var(--color-text-primary)',
                background: 'var(--color-canvas)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Amenities */}
        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
            marginBottom: '12px'
          }}>
            Amenities
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' }}>
            {amenities.map(amenity => (
              <label
                key={amenity.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  background: filters.amenities?.includes(amenity.value) ? 'var(--color-terra-muted)' : 'var(--color-canvas)',
                  border: `1px solid ${filters.amenities?.includes(amenity.value) ? 'var(--color-terra)' : 'var(--color-border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  color: filters.amenities?.includes(amenity.value) ? 'var(--color-terra)' : 'var(--color-text-primary)',
                  transition: 'all 0.2s ease'
                }}
              >
                <input
                  type="checkbox"
                  checked={filters.amenities?.includes(amenity.value) || false}
                  onChange={() => handleAmenityToggle(amenity.value)}
                  style={{ margin: 0 }}
                />
                {amenity.label}
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button
            onClick={handleSearch}
            style={{
              flex: 1,
              padding: '14px 20px',
              background: 'var(--color-terra)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <Search size={16} />
            Search Properties
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '14px 20px',
              background: 'var(--color-canvas)',
              color: 'var(--color-text-secondary)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.9375rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
