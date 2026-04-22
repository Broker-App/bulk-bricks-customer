'use client';

import { useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/buttons/Button';
import { ContactSheet } from '@/components/property/ContactSheet';
import type { Property } from '@/types';

export function ContactBuilderButton({ property }: { property: Property }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        id="contact-builder-btn"
        onClick={() => setOpen(true)}
        variant="ghost"
        style={{ marginBottom: '12px' }}
      >
        <MessageCircle size={16} strokeWidth={2} />
        Contact Builder
      </Button>
      <ContactSheet property={property} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
