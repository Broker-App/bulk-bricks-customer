'use client';

import Link from 'next/link';
import { useWishlist } from '@/contexts/WishlistContext';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { Property } from '@/types';

export default function SavedPage() {
  const { wishlist } = useWishlist();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wishlist.length === 0) { setLoading(false); return; }

    const supabase = createClient();
    supabase
      .from('properties')
      .select(`
        id, title, description, category, status, target_price,
        location_city, location_area, is_featured, is_group_enabled,
        group_size, slots_filled, created_at,
        builder:builders(id, company_name, logo_url, status),
        images:property_images(url, alt_text, is_cover, sort_order),
        property_type:categories(name, slug)
      `)
      .in('id', wishlist)
      .eq('status', 'active')
      .is('deleted_at', null)
      .then(({ data }) => {
        setProperties((data ?? []) as unknown as Property[]);
        setLoading(false);
      });
  }, [wishlist]);

  return (
    <div style={{ padding: '24px 16px 40px', background: 'var(--color-canvas)', minHeight: '100dvh' }}>
      <p className="section-label" style={{ marginBottom: '4px' }}>Your Collection</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700,
        color: 'var(--color-text-primary)', margin: '0 0 24px', letterSpacing: '-0.02em' }}>
        Saved Properties
      </h1>

      {!loading && wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 24px' }}>
          <p style={{ fontSize: '3rem', marginBottom: '16px' }}>💛</p>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            No saved properties yet
          </p>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
            Tap the ♡ on any property to save it here
          </p>
          <Link href="/properties" className="btn-terra" style={{ padding: '12px 28px', textDecoration: 'none' }}>
            Browse Properties
          </Link>
        </div>
      ) : (
        <PropertyGrid properties={properties} loading={loading} />
      )}
    </div>
  );
}
