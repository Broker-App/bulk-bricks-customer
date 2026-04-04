'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { formatINR } from '@/utils/format';
import type { Property } from '@/types';

interface AccessGateProps {
  property: Property;
}

export function AccessGate({ property }: AccessGateProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserId(user?.id ?? null);
      if (!user) { setLoading(false); return; }

      supabase
        .from('customer_access')
        .select('id')
        .eq('customer_id', user.id)
        .eq('property_id', property.id)
        .maybeSingle()
        .then(({ data }) => {
          setHasAccess(!!data);
          setLoading(false);
        });
    });
  }, [property.id]);

  const price = property.target_price != null ? formatINR(property.target_price) : null;

  if (loading) {
    return (
      <div className="sticky-cta-bar">
        <div className="skeleton" style={{ height: '48px', flex: 1, borderRadius: 'var(--radius-lg)' }} />
      </div>
    );
  }

  // ── 1. Unlocked ─────────────────────────────────────────────────────────────
  if (hasAccess && property.whatsapp_group_link) {
    return (
      <div className="sticky-cta-bar">
        <div style={{ flex: 1 }}>
          {price && <p className="price-text">{price}</p>}
          <span className="chip chip-unlocked">✓ Unlocked</span>
        </div>
        <a
          href={property.whatsapp_group_link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp"
          style={{ padding: '14px 20px', textDecoration: 'none' }}
        >
          WhatsApp Group
        </a>
      </div>
    );
  }

  // ── 2. Guest ─────────────────────────────────────────────────────────────────
  if (!userId) {
    return (
      <div className="sticky-cta-bar">
        <div style={{ flex: 1 }}>
          {price && <p className="price-text">{price}</p>}
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>onwards</p>
        </div>
        <Link href="/auth/login" className="btn-terra" style={{ padding: '14px 28px', textDecoration: 'none' }}>
          Login to Unlock
        </Link>
      </div>
    );
  }

  // ── 3. Locked (logged in, not paid) ─────────────────────────────────────────
  return (
    <div className="sticky-cta-bar">
      <div style={{ flex: 1 }}>
        {price && <p className="price-text">{price}</p>}
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0 }}>onwards</p>
      </div>
      <button
        className="btn-unlock"
        style={{ padding: '14px 24px' }}
        onClick={() => alert('Razorpay payment coming soon')}
      >
        <Lock size={15} strokeWidth={2.5} />
        Unlock Access
      </button>
    </div>
  );
}
