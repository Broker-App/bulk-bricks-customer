'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, ChevronDown, ChevronUp, MapPin, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Chip } from '@/components/ui/Chip';
import { Avatar } from '@/components/ui/Avatar';
import { truncate } from '@/utils/format';
import type { Query, QueryResponse } from '@/types';

const STATUS_VARIANT: Record<string, string> = {
  open:        'featured',
  assigned:    'group',
  in_progress: 'group',
  resolved:    'verified',
  closed:      'sold',
};

const PRIORITY_COLOR: Record<string, string> = {
  low:    'var(--color-text-muted)',
  medium: 'var(--color-warning)',
  high:   'var(--color-terra)',
  urgent: 'var(--color-danger)',
};

export default function MyQueriesPage() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setLoading(false); return; }
      setUserId(user.id);
      supabase
        .from('queries')
        .select(`
          id, message, status, priority, created_at, updated_at,
          property:properties(id, title, location_city),
          builder:builders(id, company_name, logo_url),
          responses:query_responses(id, message, is_internal, created_at)
        `)
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          setQueries((data ?? []) as unknown as Query[]);
          setLoading(false);
        });
    });
  }, []);

  if (!loading && !userId) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: '64px 24px', textAlign: 'center',
        background: 'var(--color-canvas)', minHeight: '100dvh' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💬</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700,
          color: 'var(--color-text-primary)', marginBottom: '8px' }}>
          Login to View Your Queries
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', maxWidth: '320px' }}>
          Sign in to track your inquiries and builder responses.
        </p>
        <Link href="/auth/login" className="btn-terra" style={{ padding: '12px 28px', textDecoration: 'none' }}>
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh', padding: '24px 16px 40px' }}>
      <p className="section-label" style={{ marginBottom: '4px' }}>Your Inquiries</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700,
        color: 'var(--color-text-primary)', margin: '0 0 24px', letterSpacing: '-0.02em' }}>
        My Queries
      </h1>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton" style={{ height: '120px', borderRadius: 'var(--radius-lg)' }} />
          ))}
        </div>
      ) : queries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            No queries yet
          </p>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', fontSize: '0.9rem' }}>
            Contact a builder from any property listing to send an inquiry.
          </p>
          <Link href="/properties" className="btn-terra" style={{ padding: '12px 28px', textDecoration: 'none' }}>
            Browse Properties
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {queries.map(q => {
            const publicResponses = (q.responses ?? []).filter(r => !r.is_internal);
            const isExpanded = expandedId === q.id;

            return (
              <div key={q.id} className="pwa-card" style={{ padding: '16px' }}>
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                  {q.builder && (
                    <Avatar
                      name={q.builder.company_name}
                      src={q.builder.logo_url}
                      size="sm"
                    />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                        {q.builder?.company_name ?? 'Builder'}
                      </span>
                      <Chip variant={STATUS_VARIANT[q.status] as 'featured' | 'group' | 'verified' | 'sold' ?? 'type'}>
                        {q.status.replace('_', ' ')}
                      </Chip>
                      {q.priority !== 'low' && (
                        <span style={{ fontSize: '10px', fontWeight: 700, color: PRIORITY_COLOR[q.priority],
                          textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          {q.priority}
                        </span>
                      )}
                    </div>
                    {q.property && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px',
                        color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                        <MapPin size={11} />
                        <Link href={`/properties/${q.property.id}`}
                          style={{ color: 'var(--color-terra)', textDecoration: 'none', fontWeight: 600 }}>
                          {q.property.title}
                        </Link>
                        <span>· {q.property.location_city}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px',
                    color: 'var(--color-text-muted)', fontSize: '0.75rem', flexShrink: 0 }}>
                    <Clock size={11} />
                    {new Date(q.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </div>
                </div>

                {/* Message preview */}
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)',
                  lineHeight: 1.6, marginBottom: '10px' }}>
                  {isExpanded ? q.message : truncate(q.message, 120)}
                </p>

                {/* Responses thread */}
                {isExpanded && publicResponses.length > 0 && (
                  <div style={{ marginBottom: '12px', paddingLeft: '12px',
                    borderLeft: '2px solid var(--color-terra-border)' }}>
                    {publicResponses.map(r => (
                      <div key={r.id} style={{ marginBottom: '10px' }}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                          Builder replied · {new Date(r.created_at).toLocaleDateString('en-IN',
                            { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', lineHeight: 1.6 }}>
                          {r.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Expand toggle + reply count */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    color: 'var(--color-terra)', fontSize: '0.8125rem', fontWeight: 600,
                    WebkitTapHighlightColor: 'transparent' }}
                >
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {isExpanded ? 'Show less' : publicResponses.length > 0
                    ? `${publicResponses.length} reply` : 'Show full message'}
                  {publicResponses.length > 0 && !isExpanded && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: '18px', height: '18px', borderRadius: '50%', background: 'var(--color-terra)',
                      color: '#fff', fontSize: '10px', fontWeight: 700 }}>
                      {publicResponses.length}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
