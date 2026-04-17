'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { TOP_NAV_ROUTES } from '@/lib/navigation';
import { useAuth } from '@/contexts/AuthContext';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function TopNav() {
  const pathname = usePathname();
  const { profile, loading, signOut } = useAuth();

  return (
    <header
      className="glass-panel hidden md:flex"
      style={{
        position: 'sticky', top: 0, zIndex: 50,
        padding: '0 32px', height: '64px',
        alignItems: 'center', justifyContent: 'space-between', gap: '24px',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem',
        color: 'var(--color-text-primary)', textDecoration: 'none',
        letterSpacing: '-0.02em', flexShrink: 0,
      }}>
        Bulk<span style={{ color: 'var(--color-terra)' }}>Bricks</span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: 'flex', gap: '4px', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        {TOP_NAV_ROUTES.map(({ href, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link key={href} href={href} style={{
              padding: '6px 16px', borderRadius: 'var(--radius-pill)',
              fontSize: '0.9rem',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--color-terra)' : 'var(--color-text-secondary)',
              textDecoration: 'none',
              background: isActive ? 'var(--color-terra-muted)' : 'transparent',
              transition: 'background 0.15s ease, color 0.15s ease',
              WebkitTapHighlightColor: 'transparent',
            }}>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <ThemeToggle />

        {loading ? (
          /* Skeleton while session resolves */
          <div className="skeleton" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
        ) : profile ? (
          /* ── Logged in ── */
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Avatar */}
            <Link href="/profile" style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'var(--color-terra)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              textDecoration: 'none', flexShrink: 0,
              transition: 'opacity 0.15s ease',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '0.8125rem',
                fontWeight: 700, color: '#FFFFFF' }}>
                {getInitials(profile.full_name)}
              </span>
            </Link>
            {/* Name */}
            <span style={{ fontSize: '0.875rem', fontWeight: 600,
              color: 'var(--color-text-primary)', maxWidth: '140px',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {profile.full_name.split(' ')[0]}
            </span>
            {/* Sign out */}
            <button
              id="topnav-sign-out"
              onClick={signOut}
              title="Sign out"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '34px', height: '34px', border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--radius-md)', background: 'transparent', cursor: 'pointer',
                color: 'var(--color-text-muted)', transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-danger)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-danger)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border-default)';
              }}
            >
              <LogOut size={15} strokeWidth={2} />
            </button>
          </div>
        ) : (
          /* ── Logged out ── */
          <Link href="/auth/login" className="btn-terra"
            style={{ padding: '8px 20px', fontSize: '0.875rem', textDecoration: 'none' }}>
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
