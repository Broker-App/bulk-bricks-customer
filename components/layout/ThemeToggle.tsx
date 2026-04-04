'use client';

import { Sun, Moon } from 'lucide-react';
import { useThemeContext } from '@/contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggle } = useThemeContext();

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: '38px',
        height: '38px',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s ease, transform 0.15s ease',
        WebkitTapHighlightColor: 'transparent',
        color: 'var(--color-text-secondary)',
        flexShrink: 0,
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {theme === 'dark' ? <Sun size={17} strokeWidth={1.75} /> : <Moon size={17} strokeWidth={1.75} />}
    </button>
  );
}
