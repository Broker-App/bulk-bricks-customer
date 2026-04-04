import Link from 'next/link';
import { Globe, ShieldCheck } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Chip } from '@/components/ui/Chip';
import type { Builder } from '@/types';

interface BuilderCardProps {
  builder: Builder;
  showLink?: boolean;
}

export function BuilderCard({ builder, showLink = true }: BuilderCardProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '16px',
        background: 'var(--color-surface-2)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border-subtle)',
      }}
    >
      <Avatar name={builder.company_name} src={builder.logo_url} size="lg" />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
          <span style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.9375rem',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {builder.company_name}
          </span>
          {builder.status === 'verified' && (
            <Chip variant="verified" icon={<ShieldCheck size={10} strokeWidth={2.5} />}>Verified</Chip>
          )}
        </div>
        {showLink && builder.website_url && (
          <a
            href={builder.website_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              fontSize: '0.8125rem', color: 'var(--color-terra)',
              textDecoration: 'none', fontWeight: 500,
            }}
          >
            <Globe size={12} strokeWidth={2} />
            Website
          </a>
        )}
      </div>
      {showLink && (
        <Link
          href={`/builders/${builder.id}`}
          style={{
            fontSize: '0.8125rem', color: 'var(--color-text-muted)',
            textDecoration: 'none', fontWeight: 500, flexShrink: 0,
          }}
        >
          View Profile →
        </Link>
      )}
    </div>
  );
}
