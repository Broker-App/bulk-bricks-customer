'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { PropertyImage } from '@/types';

interface ImageGalleryProps {
  images: PropertyImage[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const sorted = [...images].sort((a, b) => a.sort_order - b.sort_order);
  const cover = sorted[0];
  const total = sorted.length;

  if (total === 0) {
    return (
      <div
        style={{
          width: '100%',
          aspectRatio: '16/9',
          background: 'var(--color-img-placeholder)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-muted)',
          fontSize: '0.875rem',
        }}
      >
        No images available
      </div>
    );
  }

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  return (
    <>
      {/* Main image strip */}
      <div
        style={{ position: 'relative', width: '100%', aspectRatio: '16/9', cursor: 'pointer' }}
        onClick={() => setLightbox(true)}
      >
        <Image
          src={sorted[current].url}
          alt={sorted[current].alt_text ?? title}
          fill
          priority={current === 0}
          sizes="(max-width: 768px) 100vw, 800px"
          style={{ objectFit: 'cover' }}
        />
        {/* Count badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            background: 'rgba(0,0,0,0.55)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: '99px',
            backdropFilter: 'blur(6px)',
          }}
        >
          {current + 1}/{total}
        </div>
        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
              style={{
                position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.85)', borderRadius: '50%', border: 'none',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              aria-label="Next image"
              style={{
                position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.85)', borderRadius: '50%', border: 'none',
                width: '32px', height: '32px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', cursor: 'pointer',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {total > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', padding: '10px 0' }}>
          {sorted.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Image ${i + 1}`}
              style={{
                width: i === current ? '20px' : '6px',
                height: '6px',
                borderRadius: '99px',
                background: i === current ? 'var(--color-terra)' : 'var(--color-border-default)',
                border: 'none',
                cursor: 'pointer',
                transition: 'width 0.2s ease, background 0.2s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.93)',
            zIndex: 300, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'absolute', top: '16px', right: '16px',
              background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
              width: '40px', height: '40px', color: '#fff', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Close lightbox"
          >
            <X size={20} />
          </button>
          <div style={{ position: 'relative', width: '90vw', maxWidth: '900px', aspectRatio: '16/9' }}
            onClick={e => e.stopPropagation()}>
            <Image
              src={sorted[current].url}
              alt={sorted[current].alt_text ?? title}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          {total > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); prev(); }}
                style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
                  width: '44px', height: '44px', color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Previous">
                <ChevronLeft size={22} />
              </button>
              <button onClick={e => { e.stopPropagation(); next(); }}
                style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%',
                  width: '44px', height: '44px', color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Next">
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
