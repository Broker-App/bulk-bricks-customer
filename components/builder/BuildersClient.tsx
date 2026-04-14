'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Search, X, ShieldCheck } from 'lucide-react';
import { BuilderCard } from '@/components/property/BuilderCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { loadBuilders } from '@/app/builders/actions';
import type { BuilderWithStats } from '@/lib/queries/builders';

interface BuildersClientProps {
  initialBuilders: BuilderWithStats[];
  initialTotalCount: number;
}

export function BuildersClient({ initialBuilders, initialTotalCount }: BuildersClientProps) {
  const [builders, setBuilders] = useState<BuilderWithStats[]>(initialBuilders);
  const [page, setPage] = useState(1); // Next page to fetch (0 already loaded)
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  const observerRef = useRef<IntersectionObserver>();
  const sentinelRef = useRef<HTMLDivElement>(null);
  
  const hasMore = builders.length < totalCount;
  
  // Debounce search query (350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 350);
    
    return () => clearTimeout(timer);
  }, [query]);
  
  // Handle search changes
  useEffect(() => {
    if (debouncedQuery !== query) return; // Only run when debounced value matches
    
    const handleSearch = async () => {
      setIsLoading(true);
      try {
        const result = await loadBuilders(0, debouncedQuery);
        setBuilders(result.data);
        setTotalCount(result.totalCount);
        setPage(1); // Reset to next page
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    handleSearch();
  }, [debouncedQuery]);
  
  // Load more builders (infinite scroll)
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    setIsLoading(true);
    try {
      const result = await loadBuilders(page, debouncedQuery);
      setBuilders(prev => [...prev, ...result.data]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Load more failed:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedQuery, hasMore, isLoading]);
  
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
      {/* ── CSS ─────────────────────────────────────────────── */}
      <style>{`
        .builder-mobile-bar   { display: flex; }
        .builder-desktop-card { display: none; }
        @media (min-width: 640px) {
          .builder-mobile-bar   { display: none; }
          .builder-desktop-card { display: flex; }
        }
        .builders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        @media (min-width: 640px) {
          .builders-grid { 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px; 
          }
        }
        @media (min-width: 1400px) {
          .builders-grid { 
            grid-template-columns: repeat(5, 1fr);
            gap: 24px; 
          }
        }
        @media (min-width: 1600px) {
          .builders-grid { 
            grid-template-columns: repeat(6, 1fr);
          }
        }
        .builder-profile-card:hover {
          box-shadow: var(--shadow-card-hover);
          transform: translateY(-4px);
        }
        .builder-profile-cta:hover {
          background: var(--color-terra-muted) !important;
          border-color: var(--color-terra) !important;
          color: var(--color-terra) !important;
        }
        /* Search input */
        .builders-search-wrap {
          position: relative;
          width: 100%;
          max-width: 480px;
        }
        .builders-search-input {
          width: 100%;
          padding: 11px 40px 11px 42px;
          background: var(--color-surface);
          border: 1.5px solid var(--color-border-default);
          border-radius: var(--radius-pill);
          font-family: var(--font-ui);
          font-size: 0.9375rem;
          color: var(--color-text-primary);
          outline: none;
          box-shadow: var(--shadow-card);
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
          box-sizing: border-box;
        }
        .builders-search-input::placeholder { color: var(--color-text-muted); }
        .builders-search-input:focus {
          border-color: var(--color-terra);
          box-shadow: var(--shadow-card), 0 0 0 3px var(--color-terra-muted);
        }
        .builders-search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: var(--color-text-muted);
          display: flex;
          align-items: center;
        }
        .builders-search-clear {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: var(--color-border-default);
          border: none;
          border-radius: 50%;
          width: 20px; height: 20px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: var(--color-text-muted);
          transition: background 0.15s ease;
          padding: 0;
        }
        .builders-search-clear:hover { background: var(--color-border-strong); }
        /* Loading skeleton */
        .skeleton-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        @media (min-width: 640px) {
          .skeleton-grid { 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px; 
          }
        }
        @media (min-width: 1400px) {
          .skeleton-grid { 
            grid-template-columns: repeat(5, 1fr);
            gap: 24px; 
          }
        }
        @media (min-width: 1600px) {
          .skeleton-grid { 
            grid-template-columns: repeat(6, 1fr);
          }
        }
      `}</style>

      {/* ── Page Header ── */}
      <div style={{ marginBottom: '24px' }}>
        <p className="section-label" style={{ marginBottom: '6px' }}>Our Partners</p>
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap',
          marginBottom: '8px',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 800,
            color: 'var(--color-text-primary)',
            margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2,
          }}>
            Verified Builders
          </h1>
          {builders.length > 0 && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'var(--color-success-bg)', color: 'var(--color-success)',
              fontSize: '0.8125rem', fontWeight: 700,
              padding: '6px 14px', borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--color-success)',
            }}>
              <ShieldCheck size={14} strokeWidth={2.5} />
              {builders.length} Verified
            </span>
          )}
        </div>
        <p style={{
          fontSize: '0.9375rem', color: 'var(--color-text-secondary)',
          margin: '0 0 20px', lineHeight: 1.6,
        }}>
          Every builder on Bulk Bricks has been verified by our team.
        </p>
        
        {/* Result count */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.8125rem',
          color: 'var(--color-text-muted)',
          fontWeight: 500,
          marginBottom: '16px',
        }}>
          Showing {builders.length} of {totalCount} builders
          {!hasMore && builders.length > 0 && (
            <span style={{
              background: 'var(--color-success-bg)',
              color: 'var(--color-success)',
              padding: '2px 8px',
              borderRadius: '99px',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}>
              All loaded ✓
            </span>
          )}
        </div>

        {/* ── Search Bar ── */}
        <div className="builders-search-wrap">
          <span className="builders-search-icon">
            <Search size={17} strokeWidth={2} />
          </span>
          <input
            id="builder-search"
            type="search"
            className="builders-search-input"
            placeholder="Search builders by name…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          {query && (
            <button
              className="builders-search-clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              <X size={11} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>


      {/* ── Grid / Empty ── */}
      {builders.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '64px 24px',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-subtle)',
        }}>
          <p style={{ fontSize: '2.5rem', marginBottom: '12px', lineHeight: 1 }}>🏗️</p>
          <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '1.0625rem', margin: '0 0 6px' }}>
            {query.trim() ? 'No builders found' : 'No builders listed yet'}
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: 0 }}>
            {query.trim() ? 'Try a different search term.' : 'Check back soon — verified builders are being added.'}
          </p>
        </div>
      ) : (
        <>
          <div className="builders-grid">
            {builders.map(builder => (
              <BuilderCard key={builder.id} builder={builder} />
            ))}
          </div>
          
          {/* Loading skeletons */}
          {isLoading && (
            <div className="skeleton-grid">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}
          
          {/* Intersection Observer sentinel */}
          {hasMore && (
            <div 
              ref={sentinelRef} 
              style={{ height: '20px', width: '100%' }}
              aria-label="Load more builders"
            />
          )}
        </>
      )}
    </>
  );
}
