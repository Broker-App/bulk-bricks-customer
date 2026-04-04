import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export function Input({ label, error, iconLeft, iconRight, id, style, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--color-text-secondary)',
          }}
        >
          {label}
        </label>
      )}
      <div
        className={`neuro-input${error ? ' error' : ''}`}
        style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
      >
        {iconLeft && (
          <span
            style={{
              position: 'absolute',
              left: '12px',
              color: 'var(--color-text-muted)',
              display: 'flex',
              pointerEvents: 'none',
            }}
          >
            {iconLeft}
          </span>
        )}
        <input
          id={id}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: `11px ${iconRight ? '40px' : '14px'} 11px ${iconLeft ? '40px' : '14px'}`,
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.9375rem',
            ...style,
          }}
          {...props}
        />
        {iconRight && (
          <span
            style={{
              position: 'absolute',
              right: '12px',
              color: 'var(--color-text-muted)',
              display: 'flex',
            }}
          >
            {iconRight}
          </span>
        )}
      </div>
      {error && (
        <span style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}>{error}</span>
      )}
    </div>
  );
}
