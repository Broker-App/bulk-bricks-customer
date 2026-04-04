import { Users } from 'lucide-react';
import { Chip } from '@/components/ui/Chip';
import { SlotBar } from '@/components/ui/SlotBar';
import type { Property } from '@/types';

interface GroupBuyIndicatorProps {
  property: Property;
}

export function GroupBuyIndicator({ property }: GroupBuyIndicatorProps) {
  if (!property.is_group_enabled || property.group_size == null) return null;

  const remaining = property.group_size - property.slots_filled;
  const isFull = remaining <= 0;

  return (
    <div
      style={{
        background: isFull ? 'var(--color-concrete-100)' : 'var(--color-group-buy-bg)',
        border: `1px solid ${isFull ? 'var(--color-border-default)' : 'var(--color-group-buy)'}`,
        borderRadius: 'var(--radius-lg)',
        padding: '14px 16px',
        marginBottom: '20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Chip variant={isFull ? 'full' : 'group'} icon={<Users size={12} strokeWidth={2.5} />}>
          Group Buy
        </Chip>
        <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
          {isFull ? 'Group Full' : `${remaining} slot${remaining === 1 ? '' : 's'} left`}
        </span>
      </div>
      <SlotBar filled={property.slots_filled} total={property.group_size} showLabel={false} />
      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '8px 0 0' }}>
        {property.slots_filled} of {property.group_size} customers have joined this group
      </p>
    </div>
  );
}
