'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { ContactSheet } from '@/components/property/ContactSheet';
import type { Property } from '@/types';

export function ContactBuilderButton({ property }: { property: Property }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        id="contact-builder-btn"
        onClick={() => setOpen(true)}
        className="btn-ghost"
        style={{ width: '100%', padding: '12px', display: 'flex',
          alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}
      >
        <MessageCircle size={16} strokeWidth={2} />
        Contact Builder
      </button>
      <ContactSheet property={property} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
