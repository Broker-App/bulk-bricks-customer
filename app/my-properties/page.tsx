import Link from 'next/link';
import { Lock } from 'lucide-react';

export const metadata = {
  title: 'My Properties — Bulk Bricks',
  description: 'View your unlocked properties on Bulk Bricks.',
};

export default function MyPropertiesPage() {
  return (
    <div style={{ padding: '40px 24px', background: 'var(--color-canvas)', minHeight: '100dvh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center' }}>
      <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--color-terra-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
        <Lock size={32} color="var(--color-terra)" />
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700,
        color: 'var(--color-text-primary)', marginBottom: '10px' }}>
        Login to View Your Properties
      </h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '28px', maxWidth: '340px', lineHeight: 1.6 }}>
        Sign in to see properties you&apos;ve unlocked and your WhatsApp group links.
      </p>
      <Link href="/auth/login" className="btn-terra" style={{ padding: '14px 32px', textDecoration: 'none' }}>
        Sign In
      </Link>
      <Link href="/properties" style={{ marginTop: '16px', color: 'var(--color-text-muted)',
        fontSize: '0.875rem', textDecoration: 'none' }}>
        Browse Properties Instead →
      </Link>
    </div>
  );
}
