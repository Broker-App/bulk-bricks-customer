'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { loadMoreProperties } from './actions';
import type { Property } from '@/types';
import type { PropertyFilters } from '@/types';

interface Props {
  initialProperties: Property[];
  totalCount: number;
  filters: PropertyFilters;
}

export function PropertiesInfiniteScrollClient({ 
  initialProperties, 
  totalCount, 
  filters 
}: Props) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [page, setPage] = useState(1); // Next page to fetch - page 0 already SSR'd
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProperties.length < totalCount);
  
  const observerRef = useRef<IntersectionObserver>();
  const sentinelRef = useRef<HTMLDivElement>(null);
  
  // Reset client state when filter props change (SSR re-render with new URL)
  useEffect(() => {
    setProperties(initialProperties);
    setPage(1);
    setHasMore(initialProperties.length < totalCount);
  }, [initialProperties, totalCount]);
  
  // Load more properties (infinite scroll)
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    try {
      const result = await loadMoreProperties(filters, page);
      const newData = (result.data || []) as unknown as Property[];
      setProperties(prev => [...prev, ...newData]);
      setPage(prev => prev + 1);
      
      // Check if we've loaded all properties
      if (properties.length + newData.length >= totalCount) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Load more failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, filters, hasMore, isLoading, properties.length, totalCount]);
  
  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!sentinelRef.current) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    
    observerRef.current.observe(sentinelRef.current);
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore, hasMore, isLoading]);
  
  return (
    <>
      {/* Result count */}
      <div style={{
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        fontWeight: 500,
        margin: '0 0 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {totalCount} properties found
        {!hasMore && properties.length > 0 && (
          <span style={{
            background: 'var(--color-success-bg)',
            color: 'var(--color-success)',
            padding: '2px 8px',
            borderRadius: '99px',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}>
            All loaded
          </span>
        )}
      </div>
      
      {/* Properties grid */}
      {properties.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '64px 24px',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-subtle)',
        }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '12px', lineHeight: 1 }}>{'\ud83c\udfe0'}</p>
          <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '1.0625rem', margin: '0 0 6px' }}>
            No properties found
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: 0 }}>
            Try adjusting your filters or search terms.
          </p>
        </div>
      ) : (
        <>
          <PropertyGrid properties={properties} />
          
          {/* Loading skeletons */}
          {isLoading && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
              marginTop: '20px',
            }}>
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
          
          {/* Intersection Observer sentinel */}
          {hasMore && (
            <div 
              ref={sentinelRef} 
              style={{ height: '20px', width: '100%' }}
              aria-label="Load more properties"
            />
          )}
        </>
      )}
    </>
  );
}
