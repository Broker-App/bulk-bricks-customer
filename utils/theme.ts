export const THEME_KEY = 'bb-customer-theme';

export type Theme = 'light' | 'dark';

export function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

/** Inline script injected before first paint — prevents FOUC */
export const THEME_SCRIPT = `(function(){try{var k='bb-customer-theme';var s=localStorage.getItem(k);var t=(s==='light'||s==='dark')?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
