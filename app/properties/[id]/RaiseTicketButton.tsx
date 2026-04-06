'use client';

import { useState } from 'react';
import { TicketCheck } from 'lucide-react';
import { RaiseTicketSheet } from '@/components/property/RaiseTicketSheet';
import type { Property } from '@/types';

export function RaiseTicketButton({ property }: { property: Property }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        id="raise-ticket-btn"
        onClick={() => setOpen(true)}
        className="btn-ghost"
        style={{
          width: '100%', padding: '12px', marginBottom: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          fontSize: '0.875rem',
        }}
      >
        <TicketCheck size={15} strokeWidth={2} />
        Report an Issue
      </button>
      <RaiseTicketSheet property={property} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
