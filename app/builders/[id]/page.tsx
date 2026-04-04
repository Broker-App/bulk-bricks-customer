import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchBuilderDetail } from '@/lib/queries/builders';
import { Avatar } from '@/components/ui/Avatar';
import { Chip } from '@/components/ui/Chip';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { Globe, ShieldCheck } from 'lucide-react';
import type { Builder, Property } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const { builder } = await fetchBuilderDetail(id);
  if (!builder) return { title: 'Builder Not Found — Bulk Bricks' };
  return { title: `${(builder as unknown as Builder).company_name} — Bulk Bricks` };
}

export default async function BuilderProfilePage({ params }: PageProps) {
  const { id } = await params;
  const { builder, properties } = await fetchBuilderDetail(id);

  if (!builder) notFound();

  const b = builder as unknown as Builder;
  const props = properties as unknown as Property[];

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh', padding: '0 0 40px' }}>
      {/* Builder hero */}
      <div style={{ background: 'linear-gradient(160deg, var(--color-surface), var(--color-canvas))',
        padding: '32px 20px', borderBottom: '1px solid var(--color-border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <Avatar name={b.company_name} src={b.logo_url} size="lg" />
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700,
              color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
              {b.company_name}
            </h1>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {b.status === 'verified' && (
                <Chip variant="verified" icon={<ShieldCheck size={10} />}>Verified Builder</Chip>
              )}
            </div>
          </div>
        </div>

        {b.company_description && (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '16px' }}>
            {b.company_description}
          </p>
        )}

        {b.website_url && (
          <a href={b.website_url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: 'var(--color-terra)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
            <Globe size={14} /> {b.website_url.replace(/^https?:\/\//, '')}
          </a>
        )}
      </div>

      {/* Properties */}
      <div style={{ padding: '24px 16px 0' }}>
        <p className="section-label" style={{ marginBottom: '4px' }}>Active Listings</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700,
          color: 'var(--color-text-primary)', margin: '0 0 20px' }}>
          {props.length} {props.length === 1 ? 'Property' : 'Properties'}
        </h2>
        <PropertyGrid properties={props} />
      </div>
    </div>
  );
}
