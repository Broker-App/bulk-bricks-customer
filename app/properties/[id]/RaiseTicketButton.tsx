'use client';

import { useState } from 'react';
import { MessageCircle, TicketCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/buttons/Button';
import { RaiseTicketSheet } from '@/components/property/RaiseTicketSheet';
import type { Property } from '@/types';

export function RaiseTicketButton({ property }: { property: Property }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        id="raise-ticket-btn"
        onClick={() => setOpen(true)}
        variant="unlock"
        fullWidth
        style={{ marginBottom: '12px' }}
      >
        <TicketCheck size={15} strokeWidth={2} />
        Report an Issue
      </Button>
      <RaiseTicketSheet property={property} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
