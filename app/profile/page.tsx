'use client';

import Link from 'next/link';
import {
  Sun, Moon, ChevronRight, Heart, MessageSquare, HelpCircle,
  Info, LogOut, User, Calendar, Mail, Pencil, Building2, Phone, MapPin, Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/buttons/Button';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

export default function ProfilePage() {
  const { theme, toggle } = useThemeContext();
  const { profile, loading, signOut } = useAuth();

  const menuItems = [
    { icon: Heart, label: 'Saved Properties', desc: 'Properties you\'ve liked', href: '/saved' },
    { icon: Building2, label: 'My Properties', desc: 'Properties you\'ve unlocked', href: '/my-properties' },
    { icon: MessageSquare, label: 'My Queries', desc: 'Track your enquiries', href: '/my-queries' },
    { icon: HelpCircle, label: 'Help & Support', desc: 'Get answers to your questions', href: '/faq' },
    { icon: Info, label: 'About Bulk Bricks', desc: 'Learn about our mission', href: '/about' },
  ];

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>

      {/* ── Hero banner ──────────────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-terra) 0%, #7a2200 100%)',
        padding: '48px 24px 88px',
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p style={{
            color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 6px'
          }}>
            Account
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
            fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em'
          }}>
            My Profile
          </h1>
        </div>
      </div>

      {/* ── Content pulls up into hero ────────────────────────────────────── */}
      <div style={{ maxWidth: '960px', margin: '-48px auto 0', padding: '0 24px 56px' }}>
        <div className="profile-layout">

          {/* ══ LEFT COLUMN ══════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Profile card */}
            <div style={{
              background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
              overflow: 'hidden'
            }}>

              {loading ? (
                /* Skeleton */
                <div style={{ padding: '32px 28px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                    <div className="skeleton" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                    <div className="skeleton" style={{ height: '18px', width: '130px', borderRadius: '6px' }} />
                    <div className="skeleton" style={{ height: '14px', width: '170px', borderRadius: '6px' }} />
                  </div>
                </div>

              ) : profile ? (
                /* ── Logged in ── */
                <>
                  {/* Avatar + name */}
                  <div style={{
                    background: 'linear-gradient(160deg, var(--color-terra-muted) 0%, var(--color-surface-2) 100%)',
                    padding: '32px 28px 24px', textAlign: 'center',
                    borderBottom: '1px solid var(--color-border-subtle)',
                  }}>
                    <div style={{
                      width: '84px', height: '84px', borderRadius: '50%',
                      background: 'var(--color-terra)', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 16px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-display)', fontSize: '1.625rem',
                        fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em'
                      }}>
                        {getInitials(profile.full_name)}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700,
                      color: 'var(--color-text-primary)', margin: '0 0 4px', letterSpacing: '-0.01em'
                    }}>
                      {profile.full_name}
                    </p>
                    <span style={{
                      display: 'inline-block', padding: '3px 12px',
                      background: 'var(--color-terra-muted)', borderRadius: 'var(--radius-pill)',
                      fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-terra)',
                      letterSpacing: '0.04em', textTransform: 'uppercase'
                    }}>
                      Customer
                    </span>
                  </div>

                  {/* Details */}
                  <div style={{
                    padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '12px',
                    borderBottom: '1px solid var(--color-border-subtle)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Mail size={14} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
                      <span style={{
                        fontSize: '0.875rem', color: 'var(--color-text-secondary)',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                      }}>
                        {profile.email}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Calendar size={14} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        Member since {new Date(profile.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Edit / Sign out */}
                  <div style={{ padding: '16px 20px', display: 'flex', gap: '10px' }}>
                    <Button
                      id="profile-edit-btn"
                      asChild
                      style={{ flex: 1 }}
                      size="sm"
                    >
                      <Link href="/profile/edit">
                        <Pencil size={14} strokeWidth={2.5} />
                        Edit Profile
                      </Link>
                    </Button>
                    <Button
                      id="profile-sign-out"
                      onClick={signOut}
                      variant="danger"
                      size="sm"
                    >
                      <LogOut size={14} strokeWidth={2} />
                      Sign Out
                    </Button>
                  </div>
                </>

              ) : (
                /* ── Logged out ── */
                <div style={{ padding: '36px 28px', textAlign: 'center' }}>
                  <div style={{
                    width: '72px', height: '72px', borderRadius: '50%',
                    background: 'var(--color-terra-muted)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'
                  }}>
                    <User size={30} color="var(--color-terra)" strokeWidth={1.5} />
                  </div>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 700,
                    color: 'var(--color-text-primary)', margin: '0 0 8px'
                  }}>
                    Welcome
                  </p>
                  <p style={{
                    color: 'var(--color-text-muted)', marginBottom: '24px',
                    fontSize: '0.875rem', lineHeight: 1.7
                  }}>
                    Sign in to access your saved properties and unlock listings
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Button asChild>
                      <Link href="/auth/login">
                        Sign In
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/auth/register">
                        Create Account
                      </Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <div style={{
              background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-subtle)', overflow: 'hidden',
              boxShadow: 'var(--shadow-card)'
            }}>
              <button id="profile-theme-toggle" onClick={toggle}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '16px 20px', background: 'none', border: 'none', cursor: 'pointer',
                  WebkitTapHighlightColor: 'transparent'
                }}>
                <div style={{
                  width: '38px', height: '38px', borderRadius: '50%',
                  background: 'var(--color-terra-muted)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                  {theme === 'dark'
                    ? <Sun size={18} color="var(--color-terra)" />
                    : <Moon size={18} color="var(--color-terra)" />}
                </div>
                <span style={{
                  flex: 1, fontWeight: 600, color: 'var(--color-text-primary)',
                  fontSize: '0.9375rem', textAlign: 'left'
                }}>
                  {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </span>
                <ChevronRight size={16} color="var(--color-text-muted)" />
              </button>
            </div>
          </div>

          {/* ══ RIGHT COLUMN ═════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Section label */}
            <p style={{
              margin: 0, fontSize: '0.75rem', fontWeight: 700,
              color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase'
            }}>
              Quick Access
            </p>

            {/* 2×2 quick action grid */}
            <div className="profile-menu-grid">
              {menuItems.map(({ icon: Icon, label, desc, href }) => (
                <Link key={label} href={href}
                  className="profile-menu-card"
                  style={{ textDecoration: 'none' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: 'var(--color-terra-muted)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Icon size={20} color="var(--color-terra)" strokeWidth={2} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontFamily: 'var(--font-display)', fontWeight: 700,
                      color: 'var(--color-text-primary)', fontSize: '0.9375rem',
                      margin: '0 0 3px'
                    }}>
                      {label}
                    </p>
                    <p style={{
                      fontSize: '0.8125rem', color: 'var(--color-text-muted)',
                      margin: 0, lineHeight: 1.4
                    }}>
                      {desc}
                    </p>
                  </div>
                  <ChevronRight size={16} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
                </Link>
              ))}
            </div>

            {/* App info card */}
            <div style={{
              background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-subtle)', padding: '24px',
              boxShadow: 'var(--shadow-card)'
            }}>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700,
                color: 'var(--color-text-primary)', margin: '0 0 4px'
              }}>
                Bulk<span style={{ color: 'var(--color-terra)' }}>Bricks</span>
              </p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: '0 0 16px', lineHeight: 1.6 }}>
                v1.0 · Direct builder connections with exclusive group buying benefits.
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {[
                  { label: 'About', href: '/about' },
                  { label: 'Privacy', href: '/privacy' },
                  { label: 'Terms', href: '/terms' },
                  { label: 'FAQ', href: '/faq' },
                ].map(({ label, href }) => (
                  <Link key={label} href={href} style={{
                    fontSize: '0.8125rem', fontWeight: 600,
                    color: label === 'About' ? 'var(--color-terra)' : 'var(--color-text-muted)',
                    textDecoration: 'none',
                  }}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
