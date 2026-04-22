'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Lock, Users, ChevronRight, LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/lib/supabase/client';
import type { Property } from '@/types';
import { Button } from '@/components/ui/buttons/Button';

interface AccessGateProps {
  property: Property;
  inline?: boolean;
}

export function AccessGate({ property, inline = false }: AccessGateProps) {
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
    return inline ? (
      <Button 
        asChild
        variant="whatsapp"
        style={{ 
          width: '100%', 
          fontSize: '0.9375rem', 
          padding: '16px 42px',
          border: '2px solid #25D366',
          animation: 'pulse-border 2s infinite'
        }}
      >
        <a
          href={property.whatsapp_group_link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <MessageCircle size={22} strokeWidth={2} />
          Join WhatsApp Group
        </a>
      </Button>
    ) : (
      <a
        href={property.whatsapp_group_link}
        target="_blank"
        rel="noopener noreferrer"
        className="access-fab access-fab--whatsapp"
        aria-label="Open WhatsApp Group"
        style={{ textDecoration: 'none' }}
      >
        <MessageCircle size={22} strokeWidth={2} />
        <span className="fab-label">Join WhatsApp Group</span>
      </a>
    );
  }

  // 2. Guest not logged in
  if (!userId) {
    return inline ? (
      <Button 
        asChild
        style={{ 
          width: '100%', 
          fontSize: '0.9375rem', 
          padding: '16px 42px',
          border: '2px solid var(--color-terra)',
          animation: 'pulse-border 2s infinite'
        }}
      >
        <Link href={`/auth/login?next=/properties/${property.id}`}>
          <LogIn size={20} strokeWidth={2} />
          Login to Unlock
        </Link>
      </Button>
    ) : (
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

  // 3. Locked logged in, not paid
  return inline ? (
    <Button 
      variant="unlock"
      style={{ 
        width: '100%', 
        fontSize: '0.9375rem', 
        padding: '16px 42px',
        border: '2px solid var(--color-terra)',
        animation: 'pulse-border 2s infinite'
      }}
      onClick={() => alert('Razorpay payment coming soon')}
    >
      <Lock size={20} strokeWidth={2.5} />
      Unlock Access
    </Button>
  ) : (
    <button
      className="access-fab access-fab--terra"
      aria-label="Unlock Access"
      onClick={() => alert('Razorpay payment coming soon')}
      style={{ textDecoration: 'none' }}
    >
      <Lock size={20} strokeWidth={2.5} />
      <span className="fab-label">Unlock Access</span>
    </button>
  );
}
