'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, LogIn, MessageCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Property } from '@/types';

interface AccessGateProps {
  property: Property;
}

export function AccessGate({ property }: AccessGateProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading]     = useState(true);
  const [userId, setUserId]       = useState<string | null>(null);

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

  // Don't render anything while checking — avoids layout flash
  if (loading) return null;

  // ── 1. Unlocked — WhatsApp link ────────────────────────────────────────────
  if (hasAccess && property.whatsapp_group_link) {
    return (
      <a
        href={property.whatsapp_group_link}
        target="_blank"
        rel="noopener noreferrer"
        className="access-fab access-fab--whatsapp"
        aria-label="Open WhatsApp Group"
        style={{ textDecoration: 'none' }}
      >
        <MessageCircle size={22} strokeWidth={2} />
        <span className="fab-label">WhatsApp Group</span>
      </a>
    );
  }

  // ── 2. Guest — not logged in ───────────────────────────────────────────────
  if (!userId) {
    return (
      <Link
        href={`/auth/login?next=/properties/${property.id}`}
        className="access-fab access-fab--terra"
        aria-label="Login to Unlock"
        style={{ textDecoration: 'none' }}
      >
        <LogIn size={20} strokeWidth={2} />
        <span className="fab-label">Login to Unlock</span>
      </Link>
    );
  }

  // ── 3. Locked — logged in, not paid ───────────────────────────────────────
  return (
    <button
      className="access-fab access-fab--terra"
      aria-label="Unlock Access"
      onClick={() => alert('Razorpay payment coming soon')}
    >
      <Lock size={20} strokeWidth={2.5} />
      <span className="fab-label">Unlock Access</span>
    </button>
  );
}
