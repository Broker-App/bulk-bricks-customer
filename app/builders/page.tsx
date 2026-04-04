import { fetchBuilders } from '@/lib/queries/builders';
import { BuilderCard } from '@/components/property/BuilderCard';
import type { Builder } from '@/types';

export const metadata = {
  title: 'Builders — Bulk Bricks',
  description: 'Browse verified property builders on Bulk Bricks.',
};

export default async function BuildersPage() {
  const { data } = await fetchBuilders();
  const builders = (data ?? []) as unknown as Builder[];

  return (
    <div style={{ padding: '24px 16px 40px', background: 'var(--color-canvas)', minHeight: '100dvh' }}>
      <p className="section-label" style={{ marginBottom: '4px' }}>Trusted Partners</p>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700,
        color: 'var(--color-text-primary)', margin: '0 0 24px', letterSpacing: '-0.02em' }}>
        Verified Builders
      </h1>

      {builders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🏗️</p>
          <p style={{ fontWeight: 600 }}>No builders listed yet</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {builders.map(builder => (
            <BuilderCard key={builder.id} builder={builder} />
          ))}
        </div>
      )}
    </div>
  );
}
