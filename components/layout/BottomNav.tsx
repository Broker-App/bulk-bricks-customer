'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BOTTOM_NAV_TABS } from '@/lib/navigation';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {BOTTOM_NAV_TABS.map(({ href, label, shortLabel, Icon }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              textDecoration: 'none',
              color: isActive ? 'var(--color-terra)' : 'var(--color-text-muted)',
              transition: 'color 0.15s ease',
              WebkitTapHighlightColor: 'transparent',
              paddingBottom: '2px',
            }}
          >
            {Icon && (
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 1.75}
                fill={isActive ? 'currentColor' : 'none'}
              />
            )}
            <span
              style={{
                fontSize: '0.6375rem',
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '0.02em',
              }}
            >
              {shortLabel ?? label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
