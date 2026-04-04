'use client';

import { useEffect, useCallback, type ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, handleKey]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 150,
          animation: 'fade-up 0.2s ease both',
        }}
      />
      {/* Bottom sheet (mobile) / centered (desktop) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="bottom-sheet"
        style={{ zIndex: 200, maxHeight: '90dvh', overflowY: 'auto' }}
      >
        {title && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px 0',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                padding: '4px',
                display: 'flex',
              }}
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div style={{ padding: '16px 20px 32px' }}>{children}</div>
      </div>
    </>
  );
}
