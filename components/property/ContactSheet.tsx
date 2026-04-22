'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/buttons/Button';
import { Input } from '@/components/ui/Input';
import { createClient } from '@/lib/supabase/client';
import type { Property } from '@/types';

interface ContactSheetProps {
  property: Property;
  open: boolean;
  onClose: () => void;
}

type Mode = 'idle' | 'submitting' | 'success' | 'error';

export function ContactSheet({ property, open, onClose }: ContactSheetProps) {
  const [mode, setMode] = useState<Mode>('idle');
  const [userId, setUserId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) return;
    createClient()
      .auth.getUser()
      .then(({ data: { user } }) => setUserId(user?.id ?? null));
  }, [open]);

  const handleClose = () => {
    setMode('idle');
    setMessage('');
    setGuestName('');
    setGuestEmail('');
    setGuestPhone('');
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    setError('');
    if (!message.trim()) { setError('Please enter a message.'); return; }
    if (!userId) {
      if (!guestName.trim()) { setError('Please enter your name.'); return; }
      if (!guestEmail.trim() && !guestPhone.trim()) {
        setError('Please enter your email or phone so the builder can reach you.'); return;
      }
    }

    setMode('submitting');
    const supabase = createClient();
    const payload: Record<string, string> = {
      message: message.trim(),
      property_id: property.id,
      builder_id: property.builder_id,
    };
    if (userId) {
      payload.customer_id = userId;
    } else {
      if (guestName)  payload.guest_name  = guestName.trim();
      if (guestEmail) payload.guest_email = guestEmail.trim();
      if (guestPhone) payload.guest_phone = guestPhone.trim();
    }

    const { error: sbError } = await supabase.from('queries').insert(payload);
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

  return (
    <Modal open={open} onClose={handleClose} title="Contact Builder">
      {mode === 'success' ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <CheckCircle size={48} color="var(--color-success)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
            color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Message Sent!
          </h3>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            Your inquiry about <strong>{property.title}</strong> has been sent to the builder.
            They&apos;ll reach out to you shortly.
          </p>
          <Button variant="terra" onClick={handleClose} style={{ padding: '12px 32px' }}>
            Done
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Property context */}
          <div style={{ padding: '12px 14px', background: 'var(--color-surface-2)',
            borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border-subtle)' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '2px' }}>
              Enquiring about
            </p>
            <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.9375rem' }}>
              {property.title}
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              {property.location_area ? `${property.location_area}, ` : ''}{property.location_city}
            </p>
          </div>

          {/* Guest fields */}
          {!userId && (
            <>
              <div>
                <label style={labelStyle}>Your Name *</label>
                <Input
                  id="contact-name"
                  placeholder="e.g. Rahul Sharma"
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Email</label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@email.com"
                    value={guestEmail}
                    onChange={e => setGuestEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Phone</label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="+91 98765..."
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Message */}
          <div>
            <label htmlFor="contact-message" style={labelStyle}>Message *</label>
            <div className="neuro-input" style={{ padding: 0 }}>
              <textarea
                id="contact-message"
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="I'm interested in this property. Please share more details…"
                style={{
                  width: '100%', background: 'transparent', border: 'none', outline: 'none',
                  padding: '12px 14px', color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', resize: 'none',
                  lineHeight: 1.6,
                }}
              />
            </div>
          </div>

          {error && (
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-danger)' }}>{error}</p>
          )}

          <Button
            variant="terra"
            loading={mode === 'submitting'}
            onClick={handleSubmit}
            style={{ padding: '14px', width: '100%' }}
          >
            <MessageCircle size={16} strokeWidth={2} />
            Send Message
          </Button>

          {!userId && (
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
              Or{' '}
              <a href="/auth/login" style={{ color: 'var(--color-terra)', fontWeight: 600 }}>
                sign in
              </a>{' '}
              to send with your account
            </p>
          )}
        </div>
      )}
    </Modal>
  );
}
