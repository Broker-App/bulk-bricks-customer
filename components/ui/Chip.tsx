import type { ReactNode } from 'react';

type ChipVariant =
  | 'type' | 'verified' | 'new' | 'featured'
  | 'sold' | 'unlocked' | 'group' | 'full';

interface ChipProps {
  variant?: ChipVariant;
  children: ReactNode;
  icon?: ReactNode;
  style?: React.CSSProperties;
}

export function Chip({ variant = 'type', children, icon, style }: ChipProps) {
  return (
    <span className={`chip chip-${variant}`} style={style}>
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </span>
  );
}
