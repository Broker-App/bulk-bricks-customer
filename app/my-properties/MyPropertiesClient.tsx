'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';
import { loadMyProperties } from './actions';
import { PropertyCard } from '@/components/property/PropertyCard';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import type { CustomerAccess } from '@/types';

interface Props {
  initialAccesses: CustomerAccess[];
  totalCount: number;
  customerId: string;
}

export function MyPropertiesClient({
  initialAccesses,
  totalCount,
  customerId,
}: Props) {
  const [accesses, setAccesses] = useState<CustomerAccess[]>(initialAccesses);
  const [page, setPage] = useState(1); // next page to fetch — page 0 SSR'd
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialAccesses.length < totalCount);
  const [total, setTotal] = useState(totalCount);

  const observerRef = useRef<IntersectionObserver>();
  const sentinelRef = useRef<HTMLDivElement>(null);

  // ── Debounce: 350 ms ────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 350);
    return () => clearTimeout(timer);
  }, [query]);

  // ── Search: replace list on query change ────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setIsLoading(true);
      try {
        const result = await loadMyProperties(customerId, 0, debouncedQuery);
        if (!cancelled) {
          const data = (result.data ?? []) as unknown as CustomerAccess[];
          const count = result.count ?? 0;
          setAccesses(data);
          setTotal(count);
          setPage(1);
          setHasMore(data.length < count);
        }
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    run();
    return () => { cancelled = true; };
  }, [debouncedQuery, customerId]);

  // ── Load more (infinite scroll) ─────────────────────────────────────────────
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    setIsLoading(true);
    try {
      const result = await loadMyProperties(customerId, page, debouncedQuery);
      const newData = (result.data ?? []) as unknown as CustomerAccess[];
      const count = result.count ?? 0;
      setAccesses(prev => {
        const merged = [...prev, ...newData];
        setHasMore(merged.length < count);
        return merged;
      });
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Load more failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedQuery, hasMore, isLoading, customerId]);

  // ── Intersection observer ───────────────────────────────────────────────────
  useEffect(() => {
    if (!sentinelRef.current) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && hasMore && !isLoading) loadMore(); },
      { threshold: 0.1 }
    );
    observerRef.current.observe(sentinelRef.current);
    return () => observerRef.current?.disconnect();
  }, [loadMore, hasMore, isLoading]);

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Page header */}
      <div style={{ padding: '24px 16px 0' }}>
        <p className="section-label" style={{ marginBottom: '6px' }}>Your Collection</p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 800,
          color: 'var(--color-text-primary)',
          margin: '0 0 20px',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}>
          My Properties
        </h1>

        {/* Result count */}
        <div style={{
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)',
          fontWeight: 500,
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          {total} unlocked {total === 1 ? 'property' : 'properties'}
          {!hasMore && accesses.length > 0 && (
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

        {/* Search bar */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '480px', marginBottom: '24px' }}>
          <span style={{
            position: 'absolute', left: '14px', top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none', color: 'var(--color-text-muted)',
            display: 'flex', alignItems: 'center',
          }}>
            <Search size={17} strokeWidth={2} />
          </span>
          <input
            id="my-properties-search"
            type="search"
            placeholder="Search by title or city…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '11px 40px 11px 42px',
              background: 'var(--color-surface)',
              border: '1.5px solid var(--color-border-default)',
              borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.9375rem',
              color: 'var(--color-text-primary)',
              outline: 'none',
              boxShadow: 'var(--shadow-card)',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
              boxSizing: 'border-box',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              style={{
                position: 'absolute', right: '12px', top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--color-border-default)',
                border: 'none', borderRadius: '50%',
                width: '20px', height: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--color-text-muted)',
                transition: 'background 0.15s ease', padding: 0,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-border-strong)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-border-default)'; }}
            >
              <X size={11} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div style={{ padding: '0 16px 56px' }}>

        {/* ── Empty state ── */}
        {accesses.length === 0 && !isLoading && (
          <div style={{
            textAlign: 'center', padding: '64px 24px',
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)',
          }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '16px', lineHeight: 1 }}>🔐</p>
            <p style={{
              fontWeight: 700, color: 'var(--color-text-primary)',
              fontSize: '1.0625rem', margin: '0 0 8px',
            }}>
              {debouncedQuery ? 'No matching properties' : 'No unlocked properties yet'}
            </p>
            <p style={{
              color: 'var(--color-text-muted)', fontSize: '0.875rem',
              margin: '0 0 24px', lineHeight: 1.6,
            }}>
              {debouncedQuery
                ? 'Try a different search term.'
                : 'Browse properties and unlock access to connect directly with builders.'}
            </p>
            {!debouncedQuery && (
              <Link
                href="/properties"
                className="btn-terra"
                style={{ textDecoration: 'none', padding: '11px 24px', display: 'inline-block' }}
              >
                Browse Properties →
              </Link>
            )}
          </div>
        )}

        {/* ── Property list ── */}
        {accesses.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}>
            {accesses
              .filter((access) => access.property)
              .map((access) => (
                <PropertyCard key={access.id} property={access.property!} />
              ))}
          </div>
        )}

        {/* Skeleton rows while fetching next page */}
        {isLoading && accesses.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
            marginTop: '16px',
          }}>
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* End-of-list message */}
        {!hasMore && accesses.length > 0 && (
          <p style={{
            textAlign: 'center',
            marginTop: '32px',
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            fontWeight: 500,
          }}>
            All {total} unlocked {total === 1 ? 'property' : 'properties'} shown ✓
          </p>
        )}

        {/* Intersection observer sentinel */}
        {hasMore && accesses.length > 0 && (
          <div
            ref={sentinelRef}
            style={{ height: '20px', width: '100%' }}
            aria-hidden="true"
          />
        )}
      </div>
    </>
  );
}
