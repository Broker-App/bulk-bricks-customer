'use client';

import Link from 'next/link';
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react';

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
