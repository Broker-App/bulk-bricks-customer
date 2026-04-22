import type { ReactNode } from 'react';
import NeoBrutalistButton from './NeoBrutalistButton';

type Variant = 'terra' | 'ghost' | 'unlock' | 'whatsapp' | 'outline' | 'danger';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  auto?: boolean;
  children: ReactNode;
  asChild?: boolean;
}

// Map old variants to NeoBrutalistButton variants
const VARIANT_MAP: Record<Variant, 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'> = {
  terra: 'primary',
  ghost: 'ghost',
  unlock: 'secondary',
  whatsapp: 'primary',
  outline: 'outline',
  danger: 'danger',
};

// Map old sizes to NeoBrutalistButton sizes
const SIZE_MAP: Record<Size, 'small' | 'medium' | 'large'> = {
  sm: 'small',
  md: 'medium',
  lg: 'large',
};

export function Button({
  variant = 'terra',
  size = 'md',
  loading = false,
  fullWidth = false,
  auto = false,
  children,
  style,
  disabled,
  asChild = false,
  className,
  ...props
}: ButtonProps) {
  const brutalistVariant = VARIANT_MAP[variant];
  const brutalistSize = SIZE_MAP[size];

  // Special styling for WhatsApp variant
  const isWhatsApp = variant === 'whatsapp';
  const whatsappStyle = isWhatsApp ? {
    background: '#25D366',
    borderColor: 'var(--color-text-primary)',
    color: '#fff',
  } : {};

  return (
    <NeoBrutalistButton
      variant={brutalistVariant}
      size={brutalistSize}
      isLoading={loading}
      disabled={disabled}
      fullWidth={fullWidth}
      auto={auto}
      asChild={asChild}
      className={className}
      style={{
        ...whatsappStyle,
        ...style,
      }}
      {...props}
    >
      {children}
    </NeoBrutalistButton>
  );
}
