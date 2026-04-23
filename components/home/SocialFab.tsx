'use client';

import { Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants/social';

export function SocialFab() {
  return (
    <div className="social-fab-container">
      {/* WhatsApp Button - Main */}
      <a
        href="https://wa.me/919876543210?text=Hi%20Bulk%20Bricks!%20I'm%20interested%20in%20your%20properties."
        target="_blank"
        rel="noopener noreferrer"
        className="access-fab access-fab--whatsapp"
        aria-label="Contact on WhatsApp"
        style={{ textDecoration: 'none', marginBottom: '12px' }}
      >
        <MessageCircle size={22} strokeWidth={2} />
        <span className="fab-label">Chat on WhatsApp</span>
      </a>

      {/* Social Media Buttons */}
      <div className="social-fab-group">
        {SOCIAL_LINKS.map(({ id, label, href, color, bg, border }) => {
          const getIcon = (iconName: string) => {
            switch (iconName) {
              case 'Instagram': return Instagram;
              case 'Facebook': return Facebook;
              case 'Twitter': return Twitter;
              default: return MessageCircle;
            }
          };
          const Icon = getIcon(id);
          
          return (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-fab social-fab--small"
              aria-label={label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: bg,
                border: `1px solid ${border}`,
                color: color,
                textDecoration: 'none',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                marginBottom: '8px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 4px 12px ${color}40`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              <Icon size={20} />
            </a>
          );
        })}
      </div>

      <style jsx>{`
        .social-fab-container {
          position: fixed;
          bottom: 90px;
          right: 20px;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .social-fab-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.3s ease, transform 0.3s ease;
          pointer-events: none;
        }

        .social-fab-container:hover .social-fab-group {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
        }

        .social-fab--small {
          border-radius: 50% !important;
          width: 48px !important;
          height: 48px !important;
          min-width: 48px !important;
        }

        @media (max-width: 767px) {
          .social-fab-container {
            bottom: 80px;
            right: 16px;
          }
        }
      `}</style>
    </div>
  );
}
