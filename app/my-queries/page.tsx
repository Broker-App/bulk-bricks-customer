'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/buttons/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MessageCircle, ChevronDown, ChevronUp, MapPin, Clock, Inbox } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Chip } from '@/components/ui/Chip';
import { Avatar } from '@/components/ui/Avatar';
import { truncate } from '@/utils/format';
import type { Query } from '@/types';

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
  const [queries, setQueries]     = useState<Query[]>([]);
  const [loading, setLoading]     = useState(true);
  const [userId, setUserId]       = useState<string | null>(null);
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

  /* ── Not logged in ─────────────────────────────────────────────────────── */
  if (!loading && !userId) {
    return (
      <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--color-terra) 0%, #7a2200 100%)',
          padding: '48px 24px 88px',
        }} />
        <div style={{ maxWidth: '480px', margin: '-48px auto 0', padding: '0 24px 56px' }}>
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
            padding: '48px 32px', textAlign: 'center',
          }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '50%',
              background: 'var(--color-terra-muted)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
            }}>
              <MessageCircle size={28} color="var(--color-terra)" strokeWidth={1.5} />
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
              color: 'var(--color-text-primary)', marginBottom: '8px',
            }}>Sign in to view your queries</h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px', fontSize: '0.875rem', lineHeight: 1.7 }}>
              Track your tickets and builder responses in one place.
            </p>
            <Button asChild>
              <Link href="/auth/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-terra) 0%, #7a2200 100%)',
        padding: '48px 24px 88px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{
            color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 6px',
          }}>
            Your Inquiries
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em',
          }}>
            My Queries
          </h1>
        </div>
      </div>

      {/* ── Content pulls up into hero ────────────────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '-48px auto 0', padding: '0 20px 64px' }}>

        {/* ── Loading skeletons ── */}
        {loading && (
          <div className="queries-grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton" style={{ height: '160px', borderRadius: 'var(--radius-xl)' }} />
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && queries.length === 0 && (
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
            padding: '56px 32px', textAlign: 'center',
          }}>
            <div style={{
              width: '68px', height: '68px', borderRadius: '50%',
              background: 'var(--color-terra-muted)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
            }}>
              <Inbox size={30} color="var(--color-terra)" strokeWidth={1.5} />
            </div>
            <p style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: '1.125rem', color: 'var(--color-text-primary)', marginBottom: '8px',
            }}>
              No queries yet
            </p>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '28px', fontSize: '0.875rem', lineHeight: 1.7 }}>
              Visit a property listing and raise a ticket if you have any issues or questions.
            </p>
            <Button asChild>
              <Link href="/properties">
                Browse Properties
              </Link>
            </Button>
          </div>
        )}

        {/* ── Query cards grid ── */}
        {!loading && queries.length > 0 && (
          <div className="queries-grid">
            {queries.map(q => {
              const publicResponses = (q.responses ?? []).filter(r => !r.is_internal);
              const isExpanded = expandedId === q.id;
              const hasUnread  = publicResponses.length > 0;

              return (
                <div
                  key={q.id}
                  style={{
                    background: 'var(--color-surface)',
                    borderRadius: 'var(--radius-xl)',
                    border: `1px solid ${hasUnread && !isExpanded ? 'var(--color-terra-border)' : 'var(--color-border-subtle)'}`,
                    boxShadow: 'var(--shadow-card)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'box-shadow 0.2s ease',
                  }}
                >
                  {/* ── Card header ── */}
                  <div style={{
                    padding: '16px 18px',
                    borderBottom: '1px solid var(--color-border-subtle)',
                    background: 'linear-gradient(160deg, var(--color-terra-muted) 0%, var(--color-surface-2) 100%)',
                    display: 'flex', alignItems: 'center', gap: '12px',
                  }}>
                    {q.builder && (
                      <Avatar name={q.builder.company_name} src={q.builder.logo_url} size="sm" />
                    )}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{
                        fontWeight: 700, fontSize: '0.9375rem',
                        color: 'var(--color-text-primary)',
                        display: 'block', overflow: 'hidden',
                        textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {q.builder?.company_name ?? 'Builder'}
                      </span>
                      {q.property && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                          <MapPin size={11} color="var(--color-text-muted)" />
                          <Link href={`/properties/${q.property.id}`} style={{
                            color: 'var(--color-terra)', textDecoration: 'none',
                            fontWeight: 600, fontSize: '0.75rem',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                          }}>
                            {q.property.title}
                          </Link>
                          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                            · {q.property.location_city}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Date */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '3px',
                      color: 'var(--color-text-muted)', fontSize: '0.72rem', flexShrink: 0,
                    }}>
                      <Clock size={11} />
                      {new Date(q.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>

                  {/* ── Card body ── */}
                  <div style={{ padding: '14px 18px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    {/* Status + priority chips */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <Chip variant={STATUS_VARIANT[q.status] as 'featured' | 'group' | 'verified' | 'sold' ?? 'type'}>
                        {q.status.replace('_', ' ')}
                      </Chip>
                      {q.priority !== 'low' && (
                        <span style={{
                          fontSize: '0.6875rem', fontWeight: 700,
                          color: PRIORITY_COLOR[q.priority],
                          textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>
                          {q.priority}
                        </span>
                      )}
                    </div>

                    {/* Message */}
                    <p style={{
                      fontSize: '0.875rem', color: 'var(--color-text-secondary)',
                      lineHeight: 1.65, margin: 0,
                      flex: isExpanded ? undefined : 1,
                    }}>
                      {isExpanded ? q.message : truncate(q.message, 100)}
                    </p>

                    {/* Expanded replies thread */}
                    {isExpanded && publicResponses.length > 0 && (
                      <div style={{
                        borderLeft: '3px solid var(--color-terra-border)',
                        paddingLeft: '14px',
                        display: 'flex', flexDirection: 'column', gap: '12px',
                      }}>
                        {publicResponses.map(r => (
                          <div key={r.id}>
                            <p style={{
                              fontSize: '0.72rem', color: 'var(--color-text-muted)',
                              marginBottom: '4px', fontWeight: 600,
                            }}>
                              Builder replied ·{' '}
                              {new Date(r.created_at).toLocaleDateString('en-IN', {
                                day: 'numeric', month: 'short', year: 'numeric',
                              })}
                            </p>
                            <p style={{
                              fontSize: '0.875rem', color: 'var(--color-text-primary)',
                              lineHeight: 1.65, margin: 0,
                            }}>
                              {r.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── Card footer / expand toggle ── */}
                  <div style={{
                    padding: '10px 18px 14px',
                    borderTop: '1px solid var(--color-border-subtle)',
                  }}>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : q.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px',
                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        color: 'var(--color-terra)', fontSize: '0.8125rem', fontWeight: 600,
                        WebkitTapHighlightColor: 'transparent',
                      }}
                    >
                      {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      {isExpanded
                        ? 'Show less'
                        : publicResponses.length > 0
                          ? `${publicResponses.length} repl${publicResponses.length === 1 ? 'y' : 'ies'}`
                          : 'Show full message'}
                      {publicResponses.length > 0 && !isExpanded && (
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          width: '18px', height: '18px', borderRadius: '50%',
                          background: 'var(--color-terra)', color: '#fff',
                          fontSize: '10px', fontWeight: 700,
                        }}>
                          {publicResponses.length}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
