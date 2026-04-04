export const metadata = {
  title: 'Terms & Conditions — Bulk Bricks',
  description: 'Terms and conditions for using the Bulk Bricks platform.',
};

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: `By accessing or using the Bulk Bricks platform, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.`,
  },
  {
    title: '2. Platform Role',
    content: `Bulk Bricks is a property discovery platform that facilitates direct connections between property buyers and builders. We are not a real estate broker or agent. We do not own, sell, or represent any property listed on the platform.`,
  },
  {
    title: '3. Builder Listings',
    content: `All builders on Bulk Bricks undergo a verification process. However, Bulk Bricks does not independently verify the accuracy of property information provided by builders. Customers should conduct their own due diligence before making any property decisions.`,
  },
  {
    title: '4. Customer Access Payments',
    content: `Customers pay a one-time fee to unlock access to a builder's WhatsApp group for a specific property. This fee is non-transferable and non-refundable except as described in our Refund Policy.`,
  },
  {
    title: '5. Prohibited Conduct',
    content: `You agree not to: misuse or redistribute WhatsApp group links; submit false information; attempt to reverse-engineer the platform; engage in any activity that disrupts the service.`,
  },
  {
    title: '6. Intellectual Property',
    content: `All content on Bulk Bricks, including the brand, design, and software, is the property of Bulk Bricks or its licensors. Property images remain the property of the respective builders.`,
  },
  {
    title: '7. Limitation of Liability',
    content: `Bulk Bricks shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform, including any decisions made based on property listings.`,
  },
  {
    title: '8. Modifications',
    content: `We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.`,
  },
  {
    title: '9. Governing Law',
    content: `These terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in Pune, Maharashtra.`,
  },
  {
    title: '10. Contact',
    content: `For terms-related queries: legal@bulkbricks.in`,
  },
];

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh',
      padding: 'clamp(32px, 6vw, 64px) 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <p className="section-label" style={{ marginBottom: '8px' }}>Legal</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Terms &amp; Conditions
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '40px' }}>
          Last updated: April 2025
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {SECTIONS.map(({ title, content }) => (
            <div key={title}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 700,
                color: 'var(--color-text-primary)', margin: '0 0 10px' }}>
                {title}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, fontSize: '0.9375rem' }}>
                {content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
