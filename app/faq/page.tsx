'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/buttons/Button';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQS = [
  {
    q: 'Is it free to browse properties?',
    a: 'Yes! You can browse all property listings, view images, and read details completely for free — no account required.',
  },
  {
    q: 'What do I get when I pay to unlock a property?',
    a: 'You get permanent access to the builder\'s WhatsApp group link for that property. Once unlocked, you can join the group and communicate directly with the builder at no extra cost.',
  },
  {
    q: 'Is the payment a one-time fee?',
    a: 'Yes. You pay once per property to unlock access. There are no subscriptions or recurring charges.',
  },
  {
    q: 'How do I join the WhatsApp group after payment?',
    a: 'After a successful payment, the WhatsApp group link will be revealed on the property detail page. Simply tap the link to join the group directly from your phone.',
  },
  {
    q: 'Who are the builders on Bulk Bricks?',
    a: 'All builders go through a manual verification process by our admin team. Only verified builders with confirmed business credentials can list properties on our platform.',
  },
  {
    q: 'Can I contact a builder without paying?',
    a: 'Yes! You can submit a general inquiry through the "Contact Builder" button on any property detail page, with or without creating an account. The builder or our team will follow up.',
  },
  {
    q: 'What happens if the WhatsApp group link doesn\'t work?',
    a: 'If a link is expired or broken, please contact us immediately via our Contact page. We\'ll get it resolved within 24 hours.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Please review our Refund Policy for full details. In general, refunds are considered if the WhatsApp link is non-functional and we are unable to resolve it.',
  },
  {
    q: 'Is my personal data safe?',
    a: 'Yes. We follow industry-standard security practices. Your data is encrypted and never sold to third parties. See our Privacy Policy for full details.',
  },
  {
    q: 'How do I track my inquiries?',
    a: 'If you have an account, go to "My Queries" in your profile to see all inquiries you\'ve submitted and any replies from builders.',
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIdx(prev => prev === idx ? null : idx);

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh',
      padding: 'clamp(32px, 6vw, 64px) 24px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <p className="section-label" style={{ marginBottom: '8px' }}>Help Centre</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '40px', lineHeight: 1.7 }}>
          Everything you need to know about Bulk Bricks.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {FAQS.map(({ q, a }, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)',
                border: `1px solid ${isOpen ? 'var(--color-terra)' : 'var(--color-border-subtle)'}`,
                overflow: 'hidden', transition: 'border-color 0.2s ease' }}>
                <button
                  id={`faq-${idx}`}
                  onClick={() => toggle(idx)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer',
                    WebkitTapHighlightColor: 'transparent', textAlign: 'left' }}
                >
                  <span style={{ flex: 1, fontWeight: 600, color: 'var(--color-text-primary)',
                    fontSize: '0.9375rem', lineHeight: 1.45 }}>
                    {q}
                  </span>
                  {isOpen
                    ? <ChevronUp size={18} color="var(--color-terra)" style={{ flexShrink: 0 }} />
                    : <ChevronDown size={18} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />}
                </button>
                {isOpen && (
                  <div style={{ padding: '0 20px 18px', borderTop: '1px solid var(--color-border-subtle)' }}>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75,
                      fontSize: '0.9rem', paddingTop: '14px' }}>
                      {a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: '48px', padding: '24px', background: 'var(--color-terra-muted)',
          borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-terra-border)',
          textAlign: 'center' }}>
          <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
            Still have questions?
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '16px' }}>
            Our support team is here to help.
          </p>
          <Button asChild>
            <Link href="/contact" style={{ display: 'inline-block' }}>
              Contact Support
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
