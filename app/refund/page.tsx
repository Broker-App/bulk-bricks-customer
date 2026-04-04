export const metadata = {
  title: 'Refund Policy — Bulk Bricks',
  description: 'Bulk Bricks refund policy for property access payments.',
};

const SECTIONS = [
  {
    title: '1. Overview',
    content: `Payments made on Bulk Bricks for unlocking property WhatsApp group access are generally non-refundable, as access is granted immediately upon payment confirmation. Please review the details below for our refund considerations.`,
  },
  {
    title: '2. Eligible Refund Cases',
    content: `A refund may be considered in the following situations: (a) The WhatsApp group link is non-functional at the time of payment and cannot be resolved within 72 hours of reporting. (b) A duplicate payment was made for the same property. (c) Technical errors resulted in a charge without access being granted.`,
  },
  {
    title: '3. Non-Refundable Cases',
    content: `Refunds will not be issued in the following cases: (a) You joined the WhatsApp group and later decide you are not interested in the property. (b) The builder changes their WhatsApp group after you have already joined. (c) Change of mind after successful access is granted.`,
  },
  {
    title: '4. How to Request a Refund',
    content: `To request a refund, contact us within 7 days of payment at support@bulkbricks.in with your registered email, payment receipt, and a description of the issue. All refunds are processed within 5–7 business days to the original payment method.`,
  },
  {
    title: '5. Builder Payment Refunds',
    content: `Refund eligibility for builder listing fees (property posting fees) is governed by the Builder Agreement. Please contact support for builder-specific refund queries.`,
  },
  {
    title: '6. Contact',
    content: `For refund queries: support@bulkbricks.in`,
  },
];

export default function RefundPage() {
  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh',
      padding: 'clamp(32px, 6vw, 64px) 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <p className="section-label" style={{ marginBottom: '8px' }}>Legal</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          Refund Policy
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

        <div style={{ marginTop: '48px', padding: '20px 24px', background: 'var(--color-terra-muted)',
          borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-terra-border)' }}>
          <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
            Need help with a refund?
          </p>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            Email us at{' '}
            <a href="mailto:support@bulkbricks.in"
              style={{ color: 'var(--color-terra)', fontWeight: 600, textDecoration: 'none' }}>
              support@bulkbricks.in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
