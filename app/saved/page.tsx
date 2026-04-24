'use client';

import Link from 'next/link';
import { useWishlist } from '@/contexts/WishlistContext';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { useEffect, useState, useRef, useCallback } from 'react';
import type { Property } from '@/types';
import { Button } from '@/components/ui/buttons/Button';

export default function SavedPage() {
  const { wishlist } = useWishlist();
  const [displayedCount, setDisplayedCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load more properties when user clicks button
  const loadMore = useCallback(() => {
    if (displayedCount >= wishlist.length) return;
    
    setIsLoading(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + 8, wishlist.length));
      setIsLoading(false);
    }, 300);
  }, [wishlist, displayedCount]);
  
  // Reset displayed count when wishlist changes
  useEffect(() => {
    setDisplayedCount(Math.min(8, wishlist.length));
  }, [wishlist]);
  
  // Get the properties to display
  const displayedProperties = wishlist.slice(0, displayedCount);

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
          {displayedCount >= wishlist.length && wishlist.length > 8 && (
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
          <PropertyGrid properties={displayedProperties} loading={false} />
          
          {/* Load more button */}
          {displayedCount < wishlist.length && (
            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <Button 
                onClick={loadMore}
                disabled={isLoading}
                style={{ minWidth: '160px' }}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
