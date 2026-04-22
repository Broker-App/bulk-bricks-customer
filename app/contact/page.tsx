'use client';

import { useState } from 'react';
import { MessageCircle, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/buttons/Button';
import { createClient } from '@/lib/supabase/client';

export default function ContactPage() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [phone,   setPhone]   = useState('');
  const [message, setMessage] = useState('');
  const [mode,    setMode]    = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error,   setError]   = useState('');

  const handleSubmit = async () => {
    setError('');
    if (!name.trim())    { setError('Please enter your name.'); return; }
    if (!message.trim()) { setError('Please enter your message.'); return; }
    if (!email.trim() && !phone.trim()) {
      setError('Please provide an email or phone number so we can reach you.'); return;
    }
    setMode('submitting');
    const supabase = createClient();
    const { error: sbError } = await supabase.from('queries').insert({
      guest_name:  name.trim(),
      guest_email: email.trim() || null,
      guest_phone: phone.trim() || null,
      message:     message.trim(),
    });
    if (sbError) { setError('Something went wrong. Please try again.'); setMode('idle'); }
    else setMode('success');
  };

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh', padding: 'clamp(32px, 6vw, 64px) 24px' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <p className="section-label" style={{ marginBottom: '8px' }}>Get In Touch</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
          Contact Us
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', lineHeight: 1.7 }}>
          Have a question or need help? Reach out and our team will get back to you within 24 hours.
        </p>

        {mode === 'success' ? (
          <div style={{ textAlign: 'center', padding: '48px 24px', background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <CheckCircle size={56} color="var(--color-success)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700,
              color: 'var(--color-text-primary)', marginBottom: '10px' }}>
              Message Received!
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Thanks for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)', padding: '32px',
            boxShadow: 'var(--shadow-card)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Input id="contact-page-name" label="Your Name *" placeholder="Enter your name"
              value={name} onChange={e => setName(e.target.value)} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <Input id="contact-page-email" label="Email" type="email" placeholder="Enter your email"
                value={email} onChange={e => setEmail(e.target.value)} />
              <Input id="contact-page-phone" label="Phone" type="tel" placeholder="Enter your phone number"
                value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div>
              <label htmlFor="contact-page-message" style={{ fontSize: '0.8125rem', fontWeight: 600,
                color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}>
                Message *
              </label>
              <div className="neuro-input" style={{ padding: 0 }}>
                <textarea id="contact-page-message" rows={5} value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Enter your message"
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none',
                    padding: '12px 14px', color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', resize: 'none', lineHeight: 1.6 }}
                />
              </div>
            </div>
            {error && <p style={{ fontSize: '0.8125rem', color: 'var(--color-danger)' }}>{error}</p>}
            <Button variant="terra" loading={mode === 'submitting'} onClick={handleSubmit}
              style={{ padding: '14px', width: '100%' }}>
              <MessageCircle size={16} />
              Send Message
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
