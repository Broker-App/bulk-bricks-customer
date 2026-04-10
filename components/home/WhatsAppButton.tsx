'use client';

import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  // Static WhatsApp link for home screen
  const whatsappLink = "https://wa.me/919876543210?text=Hi%20Bulk%20Bricks!%20I'm%20interested%20in%20your%20properties.";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="access-fab access-fab--whatsapp"
      aria-label="Contact on WhatsApp"
      style={{ textDecoration: 'none' }}
    >
      <MessageCircle size={22} strokeWidth={2} />
      <span className="fab-label">Chat on WhatsApp</span>
    </a>
  );
}
