'use client';

import { useState } from 'react';
import { Search, MapPin, Home, DollarSign, Bed, Bath, Square, ChevronDown } from 'lucide-react';

interface SearchFilters {
  location?: string;
  propertyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  minArea?: number;
  maxArea?: number;
  furnishing?: string;
  age?: string;
  parking?: string;
  facing?: string;
  amenities?: string[];
}

export function ConversationalSearch() {
  const [filters, setFilters] = useState<SearchFilters>({});

  const locations = [
    { value: '', label: 'Select location' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
  ];

  const propertyTypes = [
    { value: '', label: 'any property' },
    { value: 'apartment', label: 'apartment' },
    { value: 'house', label: 'independent house' },
    { value: 'villa', label: 'villa' },
    { value: 'plot', label: 'land/plot' },
    { value: 'commercial', label: 'commercial space' },
  ];

  const priceRanges = [
    { value: '', label: 'any budget' },
    { value: '0-50', label: 'under 50 Lakhs' },
    { value: '50-100', label: '50-100 Lakhs' },
    { value: '100-200', label: '1-2 Crores' },
    { value: '200-500', label: '2-5 Crores' },
    { value: '500+', label: 'above 5 Crores' },
  ];

  const bedroomOptions = [
    { value: '', label: 'any bedrooms' },
    { value: '1', label: '1 bedroom' },
    { value: '2', label: '2 bedrooms' },
    { value: '3', label: '3 bedrooms' },
    { value: '4', label: '4 bedrooms' },
    { value: '5', label: '5+ bedrooms' },
  ];

  const areaRanges = [
    { value: '', label: 'any size' },
    { value: '0-500', label: 'under 500 sq.ft.' },
    { value: '500-1000', label: '500-1000 sq.ft.' },
    { value: '1000-1500', label: '1000-1500 sq.ft.' },
    { value: '1500-2000', label: '1500-2000 sq.ft.' },
    { value: '2000+', label: 'above 2000 sq.ft.' },
  ];

  const furnishingOptions = [
    { value: '', label: 'any furnishing' },
    { value: 'unfurnished', label: 'unfurnished' },
    { value: 'semi-furnished', label: 'semi-furnished' },
    { value: 'fully-furnished', label: 'fully furnished' },
  ];

  const ageOptions = [
    { value: '', label: 'any age' },
    { value: '0-1', label: 'under 1 year' },
    { value: '1-5', label: '1-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10+', label: 'above 10 years' },
  ];

  const parkingOptions = [
    { value: '', label: 'any parking' },
    { value: 'none', label: 'no parking' },
    { value: '1', label: '1 car parking' },
    { value: '2', label: '2 car parking' },
    { value: '3+', label: '3+ car parking' },
  ];

  const facingOptions = [
    { value: '', label: 'any facing' },
    { value: 'north', label: 'north-facing' },
    { value: 'south', label: 'south-facing' },
    { value: 'east', label: 'east-facing' },
    { value: 'west', label: 'west-facing' },
  ];

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    // Build query string from filters
    const queryParams = new URLSearchParams();
    
    if (filters.location) queryParams.set('location', filters.location);
    if (filters.propertyType) queryParams.set('type', filters.propertyType);
    if (filters.minPrice) queryParams.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) queryParams.set('maxPrice', filters.maxPrice.toString());
    if (filters.minBedrooms) queryParams.set('minBedrooms', filters.minBedrooms.toString());
    if (filters.minBathrooms) queryParams.set('minBathrooms', filters.minBathrooms.toString());
    if (filters.minArea) queryParams.set('minArea', filters.minArea.toString());
    if (filters.maxArea) queryParams.set('maxArea', filters.maxArea.toString());
    if (filters.furnishing) queryParams.set('furnishing', filters.furnishing);
    if (filters.age) queryParams.set('age', filters.age);
    if (filters.parking) queryParams.set('parking', filters.parking);
    if (filters.facing) queryParams.set('facing', filters.facing);
    if (filters.amenities && filters.amenities.length > 0) {
      queryParams.set('amenities', filters.amenities.join(','));
    }

    // Redirect to properties page with filters
    const queryString = queryParams.toString();
    window.location.href = `/properties${queryString ? '?' + queryString : ''}`;
  };

  const handlePriceRangeChange = (value: string) => {
    if (value === '') {
      setFilters(prev => ({ ...prev, minPrice: undefined, maxPrice: undefined }));
    } else if (value === '0-50') {
      setFilters(prev => ({ ...prev, minPrice: 0, maxPrice: 50 }));
    } else if (value === '50-100') {
      setFilters(prev => ({ ...prev, minPrice: 50, maxPrice: 100 }));
    } else if (value === '100-200') {
      setFilters(prev => ({ ...prev, minPrice: 100, maxPrice: 200 }));
    } else if (value === '200-500') {
      setFilters(prev => ({ ...prev, minPrice: 200, maxPrice: 500 }));
    } else if (value === '500+') {
      setFilters(prev => ({ ...prev, minPrice: 500, maxPrice: undefined }));
    }
  };

  const handleAreaRangeChange = (value: string) => {
    if (value === '') {
      setFilters(prev => ({ ...prev, minArea: undefined, maxArea: undefined }));
    } else if (value === '0-500') {
      setFilters(prev => ({ ...prev, minArea: 0, maxArea: 500 }));
    } else if (value === '500-1000') {
      setFilters(prev => ({ ...prev, minArea: 500, maxArea: 1000 }));
    } else if (value === '1000-1500') {
      setFilters(prev => ({ ...prev, minArea: 1000, maxArea: 1500 }));
    } else if (value === '1500-2000') {
      setFilters(prev => ({ ...prev, minArea: 1500, maxArea: 2000 }));
    } else if (value === '2000+') {
      setFilters(prev => ({ ...prev, minArea: 2000, maxArea: undefined }));
    }
  };

  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-xl)',
      padding: '32px',
      margin: '16px 24px',
      boxShadow: 'var(--shadow-card)'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px'
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          margin: '0 0 8px'
        }}>
          Find Your Perfect Property
        </h3>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--color-text-secondary)',
          margin: 0
        }}>
          Complete the sentence below to search properties
        </p>
      </div>

      {/* Conversational Search */}
      <div style={{
        background: 'var(--color-canvas)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        border: '1px solid var(--color-border-subtle)'
      }}>
        {/* Complete Conversational Search Sentence */}
        <div style={{
          fontSize: '1.25rem',
          lineHeight: 2.2,
          color: 'var(--color-text-primary)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '24px'
        }}>
          <span>I want</span>
          
          {/* Property Type */}
          <select
            value={filters.propertyType || ''}
            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            style={{
              padding: '8px 16px',
              fontSize: '1.125rem',
              color: 'var(--color-terra)',
              background: 'var(--color-terra-muted)',
              border: '1px solid var(--color-terra)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {propertyTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <span>located in</span>

          {/* Location */}
          <select
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            style={{
              padding: '8px 16px',
              fontSize: '1.125rem',
              color: 'var(--color-terra)',
              background: 'var(--color-terra-muted)',
              border: '1px solid var(--color-terra)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {locations.map(location => (
              <option key={location.value} value={location.value}>{location.label}</option>
            ))}
          </select>

          <span>with</span>

          {/* Bedrooms */}
          <select
            value={filters.minBedrooms?.toString() || ''}
            onChange={(e) => handleFilterChange('minBedrooms', e.target.value ? Number(e.target.value) : undefined)}
            style={{
              padding: '8px 16px',
              fontSize: '1.125rem',
              color: 'var(--color-terra)',
              background: 'var(--color-terra-muted)',
              border: '1px solid var(--color-terra)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {bedroomOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <span>and</span>

          {/* Bathrooms */}
          <select
            value={filters.minBathrooms?.toString() || ''}
            onChange={(e) => handleFilterChange('minBathrooms', e.target.value ? Number(e.target.value) : undefined)}
            style={{
              padding: '8px 16px',
              fontSize: '1.125rem',
              color: 'var(--color-terra)',
              background: 'var(--color-terra-muted)',
              border: '1px solid var(--color-terra)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="">any bathrooms</option>
            <option value="1">1 bathroom</option>
            <option value="2">2 bathrooms</option>
            <option value="3">3 bathrooms</option>
            <option value="4">4+ bathrooms</option>
          </select>

          <span>within</span>

          {/* Price Range */}
          <select
            value={(() => {
              if (!filters.minPrice && !filters.maxPrice) return '';
              if (filters.minPrice === 0 && filters.maxPrice === 50) return '0-50';
              if (filters.minPrice === 50 && filters.maxPrice === 100) return '50-100';
              if (filters.minPrice === 100 && filters.maxPrice === 200) return '100-200';
              if (filters.minPrice === 200 && filters.maxPrice === 500) return '200-500';
              if (filters.minPrice === 500 && !filters.maxPrice) return '500+';
              return '';
            })()}
            onChange={(e) => handlePriceRangeChange(e.target.value)}
            style={{
              padding: '8px 16px',
              fontSize: '1.125rem',
              color: 'var(--color-terra)',
              background: 'var(--color-terra-muted)',
              border: '1px solid var(--color-terra)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>

          <span>and</span>

          {/* Area Range */}
          <select
            value={(() => {
              if (!filters.minArea && !filters.maxArea) return '';
              if (filters.minArea === 0 && filters.maxArea === 500) return '0-500';
              if (filters.minArea === 500 && filters.maxArea === 1000) return '500-1000';
              if (filters.minArea === 1000 && filters.maxArea === 1500) return '1000-1500';
              if (filters.minArea === 1500 && filters.maxArea === 2000) return '1500-2000';
              if (filters.minArea === 2000 && !filters.maxArea) return '2000+';
              return '';
            })()}
            onChange={(e) => handleAreaRangeChange(e.target.value)}
            style={{
              padding: '8px 16px',
              fontSize: '1.125rem',
              color: 'var(--color-terra)',
              background: 'var(--color-terra-muted)',
              border: '1px solid var(--color-terra)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {areaRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>

          <span>that is</span>

          {/* Furnishing */}
          <select
            value={filters.furnishing || ''}
            onChange={(e) => handleFilterChange('furnishing', e.target.value)}
            style={{
              padding: '6px 14px',
              fontSize: '1rem',
              color: 'var(--color-terra)',
              background: 'var(--color-terra-muted)',
              border: '1px solid var(--color-terra)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {furnishingOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <span>and</span>

          {/* Age */}
          <select
            value={filters.age || ''}
            onChange={(e) => handleFilterChange('age', e.target.value)}
            style={{
              padding: '6px 14px',
              fontSize: '1rem',
              color: 'var(--color-terra)',
              background: 'var(--color-terra-muted)',
              border: '1px solid var(--color-terra)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {ageOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <span>old</span>

          <span>with</span>

          {/* Parking */}
          <select
            value={filters.parking || ''}
            onChange={(e) => handleFilterChange('parking', e.target.value)}
            style={{
              padding: '6px 14px',
              fontSize: '1rem',
              color: 'var(--color-terra)',
              background: 'var(--color-terra-muted)',
              border: '1px solid var(--color-terra)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {parkingOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <span>and</span>

          {/* Facing */}
          <select
            value={filters.facing || ''}
            onChange={(e) => handleFilterChange('facing', e.target.value)}
            style={{
              padding: '6px 14px',
              fontSize: '1rem',
              color: 'var(--color-terra)',
              background: 'var(--color-terra-muted)',
              border: '1px solid var(--color-terra)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            {facingOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          <span>facing</span>
        </div>

        {/* Search Button */}
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            onClick={handleSearch}
            style={{
              padding: '14px 32px',
              background: 'var(--color-terra)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <Search size={18} />
            Search Properties
          </button>
        </div>
      </div>

      {/* Quick Examples */}
      <div style={{ marginTop: '24px' }}>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          marginBottom: '12px',
          fontWeight: 600
        }}>
          Popular Searches:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { location: 'mumbai', propertyType: 'apartment', minBedrooms: 2, label: '2 BHK in Mumbai' },
            { location: 'bangalore', propertyType: 'villa', label: 'Villa in Bangalore' },
            { location: 'pune', propertyType: 'apartment', minBedrooms: 3, label: '3 BHK in Pune' },
            { location: 'delhi', propertyType: 'house', label: 'House in Delhi' },
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => {
                setFilters({
                  location: example.location,
                  propertyType: example.propertyType,
                  minBedrooms: example.minBedrooms
                });
              }}
              style={{
                padding: '6px 12px',
                background: 'var(--color-canvas)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {example.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
