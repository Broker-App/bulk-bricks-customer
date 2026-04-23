'use client';

import Link from 'next/link';
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants/social';

/* ── Brand SVG icons ─────────────────────────────────────────────── */

function BrandIcon({ id, size = 20 }: { id: string; size?: number }) {
  const s = size;
  switch (id) {
    case 'instagram':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ig-g-f" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#ffd676"/>
              <stop offset="25%" stopColor="#f86f3f"/>
              <stop offset="52%" stopColor="#e4405f"/>
              <stop offset="85%" stopColor="#a133b4"/>
              <stop offset="100%" stopColor="#4c5fd7"/>
            </radialGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-g-f)"/>
          <circle cx="12" cy="12" r="4.5" stroke="#fff" strokeWidth="1.8" fill="none"/>
          <circle cx="17.2" cy="6.8" r="1.1" fill="#fff"/>
        </svg>
      );
    case 'facebook':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#1877F2"/>
          <path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.3C10.5 6.4 11.6 5 13.7 5H15.5V8Z" fill="#fff"/>
        </svg>
      );
    case 'x':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#000"/>
          <path d="M17.5 4H20L14.5 10.3L21 20H15.8L11.6 14.5L6.8 20H4.3L10.1 13.3L4 4H9.3L13.1 9.1L17.5 4ZM16.6 18.5H18L8.5 5.5H7L16.6 18.5Z" fill="#fff"/>
        </svg>
      );
    case 'whatsapp':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#25D366"/>
          <path d="M12 4.5C7.86 4.5 4.5 7.86 4.5 12c0 1.35.36 2.62.99 3.72L4.5 19.5l3.9-.99A7.44 7.44 0 0012 19.5c4.14 0 7.5-3.36 7.5-7.5S16.14 4.5 12 4.5zm4.2 10.35c-.18.48-1.02.9-1.41.96-.36.06-.81.09-1.29-.09-.3-.12-.69-.27-1.17-.51-2.07-1.02-3.42-3.12-3.51-3.27-.09-.15-.75-1.02-.75-1.95s.48-1.38.66-1.56c.18-.18.39-.24.51-.24h.36c.12 0 .27-.03.42.33.15.36.51 1.26.57 1.35.06.09.09.21.03.33-.06.12-.09.21-.18.33-.09.12-.18.27-.27.36-.09.09-.18.21-.09.42.33.63.84 1.32 1.5 1.8.63.45 1.17.6 1.41.66.21.09.39.06.54-.06.18-.12.75-.87.96-1.17.21-.3.39-.24.66-.15.27.09 1.71.81 2.01.96.27.15.48.21.54.33.06.15.06.72-.12 1.2z" fill="#fff"/>
        </svg>
      );
    case 'linkedin':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0A66C2"/>
          <path d="M7.5 9.5H5V19H7.5V9.5ZM6.25 8.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM19 19h-2.5v-4.75c0-1.15-.42-1.75-1.3-1.75-.96 0-1.45.65-1.45 1.75V19H11.5V9.5H14v1.1c.5-.8 1.3-1.4 2.4-1.4 1.9 0 2.6 1.3 2.6 3.2V19z" fill="#fff"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FF0000"/>
          <path d="M19.8 8.2s-.2-1.3-.8-1.9c-.7-.8-1.6-.8-2-.8C15 5.3 12 5.3 12 5.3s-3 0-5 .2c-.4 0-1.3 0-2 .8-.6.6-.8 1.9-.8 1.9S4 9.6 4 11v1.3c0 1.4.2 2.8.2 2.8s.2 1.3.8 1.9c.7.8 1.7.7 2.2.8C8.8 18 12 18 12 18s3 0 5-.3c.4 0 1.3 0 2-.8.6-.6.8-1.9.8-1.9s.2-1.4.2-2.8V11c0-1.4-.2-2.8-.2-2.8zM10.2 14.4V9.6l5.2 2.4-5.2 2.4z" fill="#fff"/>
        </svg>
      );
    default:
      return <MessageCircle size={s} />;
  }
}

const LINKS = {
  company: [
    { href: '/about',   label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/builders',label: 'Our Builders' },
  ],
  browse: [
    { href: '/properties',               label: 'All Properties' },
    { href: '/properties?featured=true', label: 'Featured' },
    { href: '/properties?group=true',    label: 'Group Buy' },
  ],
  support: [
    { href: '/faq',    label: 'FAQ' },
    { href: '/contact',label: 'Help & Support' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms',   label: 'Terms & Conditions' },
    { href: '/refund',  label: 'Refund Policy' },
  ],
};

const CONTACT_CHANNELS = [
  {
    id: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+91 98765 43210',
    href: 'https://wa.me/919876543210',
    color: '#25D366',
    bg: 'rgba(37,211,102,0.12)',
    border: 'rgba(37,211,102,0.25)',
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Call Us',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    color: 'var(--color-terra)',
    bg: 'var(--color-terra-muted)',
    border: 'var(--color-terra-border)',
  },
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: 'hello@bulkbricks.in',
    href: 'mailto:hello@bulkbricks.in',
    color: 'var(--color-info)',
    bg: 'var(--color-info-bg)',
    border: 'rgba(29,78,216,0.2)',
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-subtle)',
        paddingBottom: 'calc(var(--bottom-nav-height) + 16px)',
      }}
    >
      {/* ── Contact Us Banner ────────────────────────────────── */}
      <div
        style={{
          background: 'linear-gradient(135deg, var(--color-terra) 0%, var(--color-terra-hover) 60%, #6B2008 100%)',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '320px',
        }}
      >
        {/* Decorative circles */}
        <span aria-hidden style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.06)', pointerEvents: 'none',
        }} />
        <span aria-hidden style={{
          position: 'absolute', bottom: '-60px', left: '10%',
          width: '260px', height: '260px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
        }} />

        {/* Illustration image */}
        <img
          src="/illustration2.png"
          alt=""
          style={{
            position: 'absolute',
            bottom: '-238px',
            left: '48%',
            transform: 'translateX(-34%)',
            width: '561px',
            height: 'auto',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(24px, 4vw, 36px) 24px', position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
          }}>
            {/* Left: Heading + sub */}
            <div style={{ flex: '1 1 260px' }}>
              <p style={{
                fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
                marginBottom: '8px',
              }}>
                We&apos;re here for you
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                margin: '0 0 10px',
                lineHeight: 1.2,
              }}>
                Have a question? <br />Let&apos;s talk.
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, margin: 0 }}>
                Our team responds within 24 hours — reach out via any channel.
              </p>
            </div>

            {/* Center: Contact channel pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              flex: '1 1 auto',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginTop: '-8px',
            }}>
              {CONTACT_CHANNELS.map(({ id, icon: Icon, label, value, color, bg, border }) => (
                <div
                  key={id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 16px',
                    background: 'rgba(255,255,255,0.10)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    borderRadius: 'var(--radius-xl)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{
                    width: '34px', height: '34px', borderRadius: '50%',
                    background: bg, border: `1px solid ${border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={16} color={color} />
                  </span>
                  <span>
                    <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1 }}>
                      {label}
                    </span>
                    <span style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#FFFFFF', lineHeight: 1.4, marginTop: '3px' }}>
                      {value}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* Right: CTA */}
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 22px',
                background: '#FFFFFF',
                color: 'var(--color-terra-text)',
                borderRadius: 'var(--radius-pill)',
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.18)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 8px 28px rgba(0,0,0,0.22)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.18)';
              }}
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
      {/* ── /Contact Us Banner ───────────────────────────────── */}

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px 24px' }}>
        {/* Brand + tagline */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-terra)',
            marginBottom: '6px',
            letterSpacing: '-0.02em',
          }}>
            Bulk<span style={{ color: 'var(--color-text-primary)' }}>Bricks</span>
          </p>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '320px' }}>
            Enjoy group benefits — connect directly with verified builders through exclusive WhatsApp groups.
          </p>
        </div>

        {/* Links grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '32px',
            marginBottom: '32px',
          }}
        >
          {[
            { title: 'Company',  links: LINKS.company },
            { title: 'Browse',   links: LINKS.browse },
            { title: 'Support',  links: LINKS.support },
            { title: 'Legal',    links: LINKS.legal },
          ].map(({ title, links }) => (
            <div key={title}>
              <p style={{
                fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '14px',
              }}>
                {title}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="footer-link"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Links */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '14px',
          }}>
            Follow Us
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {SOCIAL_LINKS.map(({ id, label, href, color, bg, border }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                aria-label={label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: bg,
                  border: `1px solid ${border}`,
                  textDecoration: 'none',
                  flexShrink: 0,
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 6px 16px ${color}30`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                }}
              >
                <BrandIcon id={id} size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider + copyright */}
        <div
          style={{
            borderTop: '1px solid var(--color-border-subtle)',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Bulk Bricks. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
