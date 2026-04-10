import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchBuilderDetail } from '@/lib/queries/builders';
import { Avatar } from '@/components/ui/Avatar';
import { Chip } from '@/components/ui/Chip';
import { PropertyGrid } from '@/components/property/PropertyGrid';
import { Globe, ShieldCheck, ArrowLeft, Award, Calendar, MapPin, Building } from 'lucide-react';
import type { Builder, Property } from '@/types';
import { ActivityStats } from '@/components/builder/ActivityStats';

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
  const { builder, user, properties, stats } = await fetchBuilderDetail(id);

  if (!builder) notFound();

  const b = builder as unknown as Builder;
  const props = properties as unknown as Property[];

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh', padding: '0 0 40px' }}>
      {/* Builder hero */}
      <div style={{ background: 'linear-gradient(160deg, var(--color-surface), var(--color-canvas))',
        padding: '32px 20px', borderBottom: '1px solid var(--color-border-subtle)' }}>
        {/* Back button */}
        <div style={{ marginBottom: '20px' }}>
          <Link 
            href="/builders"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-text-secondary)',
              fontSize: '0.875rem',
              fontWeight: 600,
              textDecoration: 'none',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-canvas)',
              border: '1px solid var(--color-border-subtle)',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={16} />
            Back to Builders
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '24px' }}>
          <Avatar name={b.company_name} src={b.logo_url} size="lg" />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700,
                color: 'var(--color-text-primary)', margin: 0 }}>
                {b.company_name}
              </h1>
              {b.status === 'verified' && (
                <Chip variant="verified" icon={<ShieldCheck size={10} />}>Verified</Chip>
              )}
            </div>
            
            {b.company_description && (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, margin: '0 0 16px' }}>
                {b.company_description}
              </p>
            )}

            {/* Additional Builder Info */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '20px', 
              padding: '16px',
              background: 'var(--color-canvas)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border-subtle)',
              marginBottom: '16px'
            }}>
              {/* Experience */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--color-terra-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award size={16} color="var(--color-terra)" strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Experience
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontWeight: 700 }}>
                    {Math.floor((new Date().getTime() - new Date(b.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365))} years
                  </div>
                </div>
              </div>

              {/* Member Since */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--color-terra-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Calendar size={16} color="var(--color-terra)" strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Member Since
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontWeight: 700 }}>
                    {new Date(b.created_at).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--color-terra-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={16} color="var(--color-terra)" strokeWidth={2} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Location
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontWeight: 700 }}>
                    Based in India
                  </div>
                </div>
              </div>
            </div>

            {/* Address - on new line */}
            {b.business_address && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '8px',
                padding: '16px',
                background: 'var(--color-canvas)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-border-subtle)',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'var(--color-terra-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Building size={16} color="var(--color-terra)" strokeWidth={2} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Address
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontWeight: 700, lineHeight: 1.3 }}>
                    {b.business_address}
                  </div>
                </div>
              </div>
            )}

            {b.website_url && (
              <a href={b.website_url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: 'var(--color-terra)', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                <Globe size={14} /> {b.website_url.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Builder Info and Stats */}
      <div style={{ 
        padding: '40px 24px',
        background: 'var(--color-canvas)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: '48px' }}>
          {stats && <ActivityStats stats={{
            total_properties: stats.total_properties,
            active_listings: stats.active_listings,
            sold: stats.sold,
            customer_accesses: stats.customer_accesses
          }} />}
        </div>

        {/* Properties Section */}
        <div style={{
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          border: '1px solid var(--color-border-subtle)'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <p className="section-label" style={{ marginBottom: '8px', fontSize: '0.875rem' }}>
              Available Properties
            </p>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.5rem', 
              fontWeight: 700,
              color: 'var(--color-text-primary)', 
              margin: '0 0 8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {props.length} {props.length === 1 ? 'Property' : 'Properties'} Available Now
              <span style={{
                fontSize: '0.875rem',
                color: 'var(--color-terra)',
                fontWeight: 600,
                background: 'var(--color-terra-muted)',
                padding: '4px 12px',
                borderRadius: '99px'
              }}>
                Browse Collection
              </span>
            </h2>
            {props.length > 0 && (
              <p style={{ 
                color: 'var(--color-text-secondary)', 
                fontSize: '0.9rem',
                margin: 0,
                lineHeight: 1.5
              }}>
                Explore our carefully curated selection of properties from this trusted builder
              </p>
            )}
          </div>
          <PropertyGrid properties={props} />
        </div>
      </div>
    </div>
  );
}
