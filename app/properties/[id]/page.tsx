import { notFound } from 'next/navigation';
import { MapPin, Calendar } from 'lucide-react';
import { fetchPropertyDetail } from '@/lib/queries/properties';
import { ImageGallery } from '@/components/property/ImageGallery';
import { GroupBuyIndicator } from '@/components/property/GroupBuyIndicator';
import { AmenityList } from '@/components/property/AmenityList';
import { BuilderCard } from '@/components/property/BuilderCard';
import { AccessGate } from '@/components/property/AccessGate';
import { ContactBuilderButton } from './ContactBuilderButton';
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

  // Resolve map URL: prefer google_maps_url, fallback to lat/lng
  const mapUrl = property.google_maps_url
    ?? (property.location_lat && property.location_lng
      ? `https://www.google.com/maps?q=${property.location_lat},${property.location_lng}`
      : null);

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh', paddingBottom: '160px' }}>
      {/* Image gallery */}
      <ImageGallery images={images} title={property.title} />

      <div style={{ padding: '20px 16px' }}>
        {/* Chips */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {property.property_type && <Chip variant="type">{property.property_type.name}</Chip>}
          <Chip variant={property.category === 'residential' ? 'new' : 'featured'}>
            {property.category === 'residential' ? 'Residential' : 'Commercial'}
          </Chip>
          {property.is_featured && <Chip variant="featured">⭐ Featured</Chip>}
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem,4vw,1.75rem)',
          fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 8px', lineHeight: 1.25 }}>
          {property.title}
        </h1>

        {/* Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-text-muted)',
          fontSize: '0.875rem', marginBottom: '16px' }}>
          <MapPin size={14} />
          {property.location_area ? `${property.location_area}, ` : ''}{property.location_city}
        </div>

        {/* Price */}
        {property.target_price != null && (
          <p className="price-text" style={{ marginBottom: '20px', fontSize: '1.5rem' }}>
            {formatINR(property.target_price)}
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.8125rem',
              fontWeight: 400, color: 'var(--color-text-muted)', marginLeft: '6px' }}>onwards</span>
          </p>
        )}

        {/* Group buy */}
        <GroupBuyIndicator property={property} />

        {/* Builder */}
        {builder && (
          <div style={{ marginBottom: '24px' }}>
            <p className="section-label" style={{ marginBottom: '10px' }}>Listed By</p>
            <BuilderCard builder={builder} />
          </div>
        )}

        {/* Description */}
        {property.description && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 600,
              color: 'var(--color-text-primary)', marginBottom: '10px' }}>About This Property</h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '0.9375rem' }}>
              {property.description}
            </p>
          </div>
        )}

        {/* Amenities */}
        {amenities.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <AmenityList amenities={amenities} />
          </div>
        )}

        {/* Map link */}
        {mapUrl && (
          <a href={mapUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: 'var(--color-terra)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
            <MapPin size={14} /> View on Map
          </a>
        )}

        {/* Date */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px',
          color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '24px' }}>
          <Calendar size={12} />
          Listed {new Date(property.created_at).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Sticky bottom bar — Contact Builder + Access Gate */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 80,
        background: 'var(--color-canvas)', borderTop: '1px solid var(--color-border-subtle)',
        padding: '10px 16px 20px' }}>
        <ContactBuilderButton property={property} />
        <AccessGate property={property} />
      </div>
    </div>
  );
}
