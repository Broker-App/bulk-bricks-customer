'use client';

import { useState, useEffect } from 'react';
import { TicketCheck, CheckCircle, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { createClient } from '@/lib/supabase/client';
import type { Property } from '@/types';
import { Button } from '@/components/ui/buttons/Button';
import Link from 'next/link';

interface RaiseTicketSheetProps {
  property: Property;
  open: boolean;
  onClose: () => void;
}

const ISSUE_CATEGORIES = [
  { value: 'pricing_discrepancy',   label: 'Pricing discrepancy' },
  { value: 'misleading_info',       label: 'Misleading property info' },
  { value: 'property_unavailable',  label: 'Property no longer available' },
  { value: 'builder_unresponsive',  label: 'Builder not responding' },
  { value: 'wrong_location',        label: 'Wrong location details' },
  { value: 'other',                 label: 'Other issue' },
];

type Mode = 'idle' | 'submitting' | 'success' | 'error';

export function RaiseTicketSheet({ property, open, onClose }: RaiseTicketSheetProps) {
  const [mode, setMode]         = useState<Mode>('idle');
  const [userId, setUserId]     = useState<string | null | undefined>(undefined); // undefined = loading
  const [category, setCategory] = useState('');
  const [message, setMessage]   = useState('');
  const [error, setError]       = useState('');

  useEffect(() => {
    if (!open) return;
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => setUserId(user?.id ?? null));
  }, [open]);

  const handleClose = () => {
    setMode('idle');
    setCategory('');
    setMessage('');
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    setError('');
    if (!category)           { setError('Please select an issue category.'); return; }
    if (!message.trim())     { setError('Please describe your issue.'); return; }

    setMode('submitting');
    const supabase = createClient();

    const categoryLabel = ISSUE_CATEGORIES.find(c => c.value === category)?.label ?? category;
    const fullMessage   = `[${categoryLabel}]\n\n${message.trim()}`;

    const { error: sbError } = await supabase.from('queries').insert({
      message:     fullMessage,
      property_id: property.id,
      builder_id:  property.builder_id,
      customer_id: userId,
      priority:    'medium',
    });

    if (sbError) {
      setError('Something went wrong. Please try again.');
      setMode('idle');
    } else {
      setMode('success');
    }
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.8125rem', fontWeight: 600,
    color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px',
  };

  // ── Auth loading ────────────────────────────────────────────────────────────
  if (userId === undefined) {
    return (
      <Modal open={open} onClose={handleClose} title="Report an Issue">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 0' }}>
          <Loader2 size={28} color="var(--color-terra)" style={{ animation: 'spin 0.8s linear infinite' }} />
        </div>
      </Modal>
    );
  }

  // ── Not logged in ───────────────────────────────────────────────────────────
  if (userId === null) {
    return (
      <Modal open={open} onClose={handleClose} title="Report an Issue">
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'var(--color-terra-muted)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          }}>
            <TicketCheck size={28} color="var(--color-terra)" strokeWidth={1.5} />
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700,
            color: 'var(--color-text-primary)', marginBottom: '8px',
          }}>
            Sign in to raise a ticket
          </h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '24px' }}>
            Tickets are tied to your account so the builder can respond directly to you.
          </p>
          <Button asChild>
            <Link href="/auth/login?next=/properties/${property.id}">
              Sign In
            </Link>
          </Button>
        </div>
      </Modal>
    );
  }

  // ── Success ─────────────────────────────────────────────────────────────────
  if (mode === 'success') {
    return (
      <Modal open={open} onClose={handleClose} title="Ticket Raised">
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'var(--color-success-bg)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
          }}>
            <CheckCircle size={30} color="var(--color-success)" strokeWidth={2} />
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
            color: 'var(--color-text-primary)', marginBottom: '8px',
          }}>
            Ticket Submitted!
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '6px', fontSize: '0.9375rem' }}>
            Your issue with <strong>{property.title}</strong> has been sent directly to the builder.
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: '28px' }}>
            You can track the status under <strong>My Queries</strong>.
          </p>
          <Button onClick={handleClose} size="md">
            Done
          </Button>
        </div>
      </Modal>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <Modal open={open} onClose={handleClose} title="Report an Issue">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

        {/* Property context chip */}
        <div style={{
          padding: '12px 14px',
          background: 'var(--color-surface-2)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)',
        }}>
          <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: '2px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Property
          </p>
          <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.9375rem', margin: '0 0 2px' }}>
            {property.title}
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
            {property.location_area ? `${property.location_area}, ` : ''}{property.location_city}
          </p>
        </div>

        {/* Issue category */}
        <div>
          <label htmlFor="ticket-category" style={labelStyle}>
            Issue Type <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <div className="neuro-input" style={{ position: 'relative' }}>
            <select
              id="ticket-category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              style={{
                width: '100%', background: 'transparent', border: 'none', outline: 'none',
                padding: '11px 36px 11px 14px', color: category ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                fontFamily: 'var(--font-ui)', fontSize: '0.9375rem',
                appearance: 'none', cursor: 'pointer',
              }}
            >
              <option value="" disabled>Select a category…</option>
              {ISSUE_CATEGORIES.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <ChevronDown
              size={15}
              color="var(--color-text-muted)"
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="ticket-message" style={labelStyle}>
            Describe the issue <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <div className="neuro-input" style={{ padding: 0 }}>
            <textarea
              id="ticket-message"
              rows={4}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Provide as much detail as possible so the builder can address your concern…"
              style={{
                width: '100%', background: 'transparent', border: 'none', outline: 'none',
                padding: '12px 14px', color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', resize: 'none',
                lineHeight: 1.6,
              }}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 14px',
            background: 'var(--color-danger-bg)',
            border: '1px solid var(--color-danger)',
            borderRadius: 'var(--radius-md)',
          }}>
            <AlertCircle size={15} color="var(--color-danger)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-danger)' }}>{error}</span>
          </div>
        )}

        {/* Info note */}
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
          This ticket will be sent directly to the builder and you can track it under <strong>My Queries</strong>.
        </p>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          loading={mode === 'submitting'}
          style={{ width: '100%' }}
        >
          {mode === 'submitting' ? 'Submitting…' : <><TicketCheck size={16} strokeWidth={2} /> Submit Ticket</>}
        </Button>
      </div>
    </Modal>
  );
}
