import { notFound } from 'next/navigation';
import { MapPin, Calendar, TrendingDown, ExternalLink, Star } from 'lucide-react';
import { fetchPropertyDetail } from '@/lib/queries/properties';
import { ImageGallery } from '@/components/property/ImageGallery';
import { GroupBuyIndicator } from '@/components/property/GroupBuyIndicator';
import { AmenityList } from '@/components/property/AmenityList';
import { BuilderCard } from '@/components/property/BuilderCard';
import { AccessGate } from '@/components/property/AccessGate';
import { RaiseTicketButton } from './RaiseTicketButton';
import { Chip } from '@/components/ui/Chip';
import { formatINR } from '@/utils/format';
import type { Property, Amenity } from '@/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const { data } = await fetchPropertyDetail(id);
  if (!data) return { title: 'Property Not Found — Bulk Bricks' };
  return {
    title: `${data.title} — Bulk Bricks`,
    description: data.description ?? `${data.location_city} property listing on Bulk Bricks`,
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { data } = await fetchPropertyDetail(id);

  if (!data) notFound();

  const property = data as unknown as Property;
  const images = property.images ?? [];
  const amenities = (property.amenities ?? []).map((a: { amenity: Amenity }) => a.amenity).filter(Boolean);
  const builder = property.builder;

  const mapUrl = property.google_maps_url
    ?? (property.location_lat && property.location_lng
      ? `https://www.google.com/maps?q=${property.location_lat},${property.location_lng}`
      : null);

  const savings = property.dev_price != null && property.target_price != null
    ? property.dev_price - property.target_price
    : null;

  const categoryLabel = property.category === 'residential' ? 'Residential' : 'Commercial';

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* ══════════════════════════════════════════════════════════════════════
            DESKTOP: gallery spans full width above the two-column grid
            MOBILE:  gallery is full-bleed at top
        ════════════════════════════════════════════════════════════════════════ */}
        <div className="property-gallery-wrap">
          <ImageGallery images={images} title={property.title} />
        </div>

        {/* ── Two-column grid ──────────────────────────────────────────────── */}
        <div className="property-detail-layout">

          {/* ══ LEFT — Editorial content column ════════════════════════════ */}
          <div className="property-content-pad">

            {/* ── Meta header: chips + title + location row ── */}
            <div style={{ marginBottom: '24px' }}>
              {/* Chips */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                {property.property_type && <Chip variant="type">{property.property_type.name}</Chip>}
                <Chip variant={property.category === 'residential' ? 'new' : 'featured'}>
                  {categoryLabel}
                </Chip>
                {property.is_featured && <Chip variant="featured">Featured</Chip>}
              </div>

              {/* Title */}
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                margin: '0 0 10px',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
              }}>
                {property.title}
              </h1>

              {/* Location + Date — horizontal info row */}
              <div style={{
                display: 'flex', alignItems: 'center', flexWrap: 'wrap',
                gap: '16px', color: 'var(--color-text-muted)', fontSize: '0.875rem',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} strokeWidth={2} />
                  {property.location_area ? `${property.location_area}, ` : ''}{property.location_city}
                </span>
                {mapUrl && (
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    color: 'var(--color-terra)', textDecoration: 'none', fontWeight: 600,
                    fontSize: '0.8125rem',
                  }}>
                    <ExternalLink size={12} />
                    View on Map
                  </a>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}>
                  <Calendar size={13} strokeWidth={2} />
                  Listed {new Date(property.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* ── Divider ── */}
            <div style={{ height: '1px', background: 'var(--color-border-subtle)', marginBottom: '24px' }} />

            {/* ── MOBILE ONLY: Price section ── */}
            <div className="detail-price-mobile">
              {property.target_price != null && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: '2rem',
                      fontWeight: 700, color: 'var(--color-terra)', letterSpacing: '-0.03em', lineHeight: 1,
                    }}>
                      {formatINR(property.target_price)}
                    </span>
                    {savings != null && savings > 0 && (
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        padding: '4px 10px', background: 'var(--color-success-bg)',
                        border: '1px solid var(--color-success)', borderRadius: '99px',
                        fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-success)',
                      }}>
                        <TrendingDown size={12} strokeWidth={2.5} />
                        {formatINR(savings)} off
                      </span>
                    )}
                  </div>
                  {property.dev_price != null && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                        {formatINR(property.dev_price)}
                      </span>
                      <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Market price</span>
                    </div>
                  )}
                </div>
              )}
              {/* Group buy — also mobile only here, sidebar handles desktop */}
              <div style={{ marginBottom: '20px' }}>
                <GroupBuyIndicator property={property} />
              </div>
            </div>

            {/* ── Description ── */}
            {property.description && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700,
                  color: 'var(--color-text-primary)', marginBottom: '12px', letterSpacing: '-0.01em',
                }}>
                  About This Property
                </h2>
                <p style={{
                  color: 'var(--color-text-secondary)', lineHeight: 1.85,
                  fontSize: '0.9375rem', margin: 0,
                }}>
                  {property.description}
                </p>
              </div>
            )}

            {/* ── Amenities ── */}
            {amenities.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <AmenityList amenities={amenities} />
              </div>
            )}

            {/* ── Builder (MOBILE ONLY — sidebar has it on desktop) ── */}
            {builder && (
              <div className="detail-builder-mobile" style={{ marginBottom: '24px' }}>
                <p className="section-label" style={{ marginBottom: '10px' }}>Listed By</p>
                <BuilderCard builder={builder} />
              </div>
            )}

            {/* Access Gate (MOBILE ONLY) */}
            <div className="property-cta-mobile" style={{ marginBottom: '16px' }}>
              <AccessGate property={property} inline={true} />
            </div>

            {/* Raise Ticket (MOBILE ONLY) */}
            <div className="property-cta-mobile">
              <RaiseTicketButton property={property} />
            </div>
          </div>

          {/* ══ RIGHT — Sticky action sidebar (desktop only) ═════════════════ */}
          <div className="property-sidebar">
            <div style={{ position: 'sticky', top: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Price card */}
              {property.target_price != null && (
                <div style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '24px',
                  boxShadow: 'var(--shadow-card)',
                }}>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
                    <div style={{ flexGrow: 1 }}>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>

                        <p style={{
                          fontSize: '0.69rem', fontWeight: 700, letterSpacing: '0.1em',
                          textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: '0',
                        }}>
                          Target Price
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{
                          fontFamily: 'var(--font-display)', fontSize: '2.25rem',
                          fontWeight: 700, color: 'var(--color-terra)', letterSpacing: '-0.03em', lineHeight: 1,
                        }}>
                          {formatINR(property.target_price)}
                        </span>
                        {savings != null && savings > 0 && (
                          <span style={{
                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                            padding: '4px 10px', background: 'var(--color-success-bg)',
                            border: '1px solid var(--color-success)', borderRadius: '99px',
                            fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-success)',
                          }}>
                            <TrendingDown size={12} strokeWidth={2.5} />
                            {formatINR(savings)} off
                          </span>
                        )}
                      </div>
                      {property.dev_price != null && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                          <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                            {formatINR(property.dev_price)}
                          </span>
                          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Market price</span>
                        </div>
                      )}
                    </div>

                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'flex-end',
                      flexShrink: 0
                    }}>
                      <AccessGate property={property} inline={true} />
                    </div>
                  </div>
                  {/* Raise ticket in sidebar */}
                  <RaiseTicketButton property={property} />
                </div>
              )}

              {/* Group Buy card */}
              {property.is_group_enabled && (
                <div style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-card)',
                }}>
                  <GroupBuyIndicator property={property} />
                </div>
              )}

              {/* Builder card */}
              {builder && (
                <div style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '20px',
                  boxShadow: 'var(--shadow-card)',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    marginBottom: '14px',
                  }}>
                    <Star size={12} strokeWidth={2} color="var(--color-text-muted)" />
                    <p style={{
                      fontSize: '0.69rem', fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: 'var(--color-text-muted)', margin: 0,
                    }}>
                      Listed By
                    </p>
                  </div>
                  <BuilderCard builder={builder} />
                </div>
              )}

              {/* Map link */}
              {/* {mapUrl && (
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-subtle)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '16px 20px',
                  boxShadow: 'var(--shadow-card)',
                  textDecoration: 'none',
                  color: 'var(--color-terra)',
                  fontWeight: 600, fontSize: '0.875rem',
                  transition: 'box-shadow 0.2s ease',
                }}>
                  <MapPin size={16} />
                  View on Map
                  <ExternalLink size={14} style={{ marginLeft: 'auto', opacity: 0.6 }} />
                </a>
              )} */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
