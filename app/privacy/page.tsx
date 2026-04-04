export const metadata = {
  title: 'Privacy Policy — Bulk Bricks',
  description: 'How Bulk Bricks collects, uses, and protects your personal data.',
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: `We collect information you provide directly, such as your name, email address, and phone number when you register or submit an inquiry. We also collect usage data (pages visited, search queries) to improve the platform.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `Your information is used to: provide and maintain the Bulk Bricks platform; process payments and grant property access; send transactional notifications about your inquiries; improve our services through aggregated analytics.`,
  },
  {
    title: '3. Sharing of Information',
    content: `We do not sell your personal data. We may share limited information with builders when you submit an inquiry or unlock access to their property. Payment data is handled securely by Razorpay and subject to their privacy policy.`,
  },
  {
    title: '4. Data Storage & Security',
    content: `Your data is stored on secure servers with encryption at rest and in transit. We use industry-standard security measures including HTTPS and access controls.`,
  },
  {
    title: '5. Cookies',
    content: `We use essential cookies for authentication and session management. No tracking or advertising cookies are used without your consent.`,
  },
  {
    title: '6. Your Rights',
    content: `You have the right to access, correct, or delete your personal data. To exercise these rights, contact us at privacy@bulkbricks.in.`,
  },
  {
    title: '7. Changes to This Policy',
    content: `We may update this Privacy Policy periodically. Changes will be posted on this page with the updated date. Continued use of the platform constitutes acceptance of the revised policy.`,
  },
  {
    title: '8. Contact Us',
    content: `For privacy-related questions, email: privacy@bulkbricks.in`,
  },
];

export default function PrivacyPage() {
  return <StaticPolicyPage title="Privacy Policy" lastUpdated="April 2025" sections={SECTIONS} />;
}

function StaticPolicyPage({ title, lastUpdated, sections }: {
  title: string;
  lastUpdated: string;
  sections: { title: string; content: string }[];
}) {
  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh',
      padding: 'clamp(32px, 6vw, 64px) 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <p className="section-label" style={{ marginBottom: '8px' }}>Legal</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
          fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
          {title}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '40px' }}>
          Last updated: {lastUpdated}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {sections.map(({ title: st, content }) => (
            <div key={st}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 700,
                color: 'var(--color-text-primary)', margin: '0 0 10px' }}>
                {st}
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
