'use client';

import { useState } from 'react';
import { AdvancedSearch } from './AdvancedSearch';
import { Filter, ChevronDown } from 'lucide-react';

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

export function AdvancedSearchWrapper() {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleSearch = (filters: SearchFilters) => {
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
    if (filters.amenities && filters.amenities.length > 0) {
      queryParams.set('amenities', filters.amenities.join(','));
    }

    // Redirect to properties page with filters
    const queryString = queryParams.toString();
    window.location.href = `/properties${queryString ? '?' + queryString : ''}`;
  };

  if (isAdvancedOpen) {
    return (
      <AdvancedSearch
        isOpen={isAdvancedOpen}
        onClose={() => setIsAdvancedOpen(false)}
        onSearch={handleSearch}
      />
    );
  }

  return (
    <button
      onClick={() => setIsAdvancedOpen(true)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-lg)',
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
        fontWeight: 600,
        cursor: 'pointer',
        margin: '0 auto 24px',
        transition: 'all 0.2s ease'
      }}
    >
      <Filter size={16} />
      Advanced Search
      <ChevronDown size={16} />
    </button>
  );
}
