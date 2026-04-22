'use client';

import Link from 'next/link';
import { useWishlist } from '@/contexts/WishlistContext';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { fetchSavedProperties } from './actions';
import { useEffect, useState, useRef, useCallback } from 'react';
import type { Property } from '@/types';
import { Button } from '@/components/ui/buttons/Button';

export default function SavedPage() {
  const { wishlist } = useWishlist();
  const [properties, setProperties] = useState<Property[]>([]);
  const [batchIndex, setBatchIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(wishlist.length > 0);
  
  const observerRef = useRef<IntersectionObserver>();
  const sentinelRef = useRef<HTMLDivElement>(null);
  
  // Initial load when wishlist becomes available
  useEffect(() => {
    if (wishlist.length === 0) {
      setIsLoading(false);
      setHasMore(false);
      return;
    }
    
    const loadInitialBatch = async () => {
      setIsLoading(true);
      try {
        const firstBatch = wishlist.slice(0, 10);
        const { data } = await fetchSavedProperties(firstBatch);
        setProperties((data ?? []) as unknown as Property[]);
        setBatchIndex(1);
        setHasMore(10 < wishlist.length);
      } catch (error) {
        console.error('Failed to load saved properties:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInitialBatch();
  }, [wishlist]);
  
  // Reset when wishlist changes (user adds/removes items)
  useEffect(() => {
    setProperties([]);
    setBatchIndex(0);
    setHasMore(wishlist.length > 0);
  }, [wishlist]);
  
  // Load more properties (infinite scroll)
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    const nextIds = wishlist.slice(batchIndex * 10, (batchIndex + 1) * 10);
    if (nextIds.length === 0) {
      setHasMore(false);
      return;
    }
    
    setIsLoading(true);
    try {
      const { data } = await fetchSavedProperties(nextIds);
      setProperties(prev => [...prev, ...(data ?? []) as unknown as Property[]]);
      setBatchIndex(prev => prev + 1);
      setHasMore((batchIndex + 1) * 10 < wishlist.length);
    } catch (error) {
      console.error('Failed to load more saved properties:', error);
    } finally {
      setIsLoading(false);
    }
  }, [batchIndex, wishlist, hasMore, isLoading]);
  
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
    <div style={{ padding: '24px 16px 40px', background: 'var(--color-canvas)', minHeight: '100dvh' }}>
      <p className="section-label" style={{ marginBottom: '4px' }}>Your Collection</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700,
        color: 'var(--color-text-primary)', margin: '0 0 24px', letterSpacing: '-0.02em' }}>
        Saved Properties
      </h1>

      {/* Result count */}
      {wishlist.length > 0 && (
        <div style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          fontWeight: 500,
          margin: '0 0 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          {wishlist.length} saved properties
          {!hasMore && wishlist.length > 10 && (
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
      )}

      {!isLoading && wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 24px' }}>
          <p style={{ fontSize: '3rem', marginBottom: '16px' }}>💛</p>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            No saved properties yet
          </p>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
            Tap the ♡ on any property to save it here
          </p>
          <Button asChild>
            <Link href="/properties">
              Browse Properties
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <PropertyGrid properties={properties} loading={false} />
          
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
              aria-label="Load more saved properties"
            />
          )}
        </>
      )}
    </div>
  );
}
