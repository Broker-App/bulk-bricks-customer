import Link from 'next/link';

const LINKS = {
  company: [
    { href: '/about',   label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/builders',label: 'Our Builders' },
  ],
  browse: [
    { href: '/properties',           label: 'All Properties' },
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

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border-subtle)',
        paddingBottom: 'calc(var(--bottom-nav-height) + 16px)',
      }}
    >
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
