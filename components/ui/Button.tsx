import type { ReactNode } from 'react';

type Variant = 'terra' | 'ghost' | 'unlock' | 'whatsapp' | 'outline';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: ReactNode;
  asChild?: boolean;
}

const SIZES: Record<Size, string> = {
  sm: '8px 16px',
  md: '12px 24px',
  lg: '14px 32px',
};
const FONT_SIZES: Record<Size, string> = {
  sm: '0.8125rem',
  md: '0.9375rem',
  lg: '1rem',
};

export function Button({
  variant = 'terra',
  size = 'md',
  loading = false,
  children,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const cls =
    variant === 'terra'    ? 'btn-terra'    :
    variant === 'ghost'    ? 'btn-ghost'    :
    variant === 'unlock'   ? 'btn-unlock'   :
    variant === 'whatsapp' ? 'btn-whatsapp' :
    'btn-ghost';

  return (
    <button
      className={cls}
      disabled={disabled || loading}
      style={{
        padding: SIZES[size],
        fontSize: FONT_SIZES[size],
        opacity: disabled ? 0.55 : 1,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...props}
    >
      {loading ? <span className="spinner" /> : children}
    </button>
  );
}
