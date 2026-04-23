'use client';

import { useState } from 'react';
import {
  MessageCircle, CheckCircle, Mail, Phone, MapPin,
  Clock, Users, ShieldCheck, ArrowRight, Zap, Building2,
} from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants/social';
import Link from 'next/link';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/buttons/Button';
import { createClient } from '@/lib/supabase/client';

/* ── Brand SVG icons ──────────────────────────────────────────────── */

function BrandIcon({ id, size = 20 }: { id: string; size?: number }) {
  const s = size;
  switch (id) {
    case 'instagram':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="ig-g" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#ffd676" />
              <stop offset="25%" stopColor="#f86f3f" />
              <stop offset="52%" stopColor="#e4405f" />
              <stop offset="85%" stopColor="#a133b4" />
              <stop offset="100%" stopColor="#4c5fd7" />
            </radialGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-g)" />
          <circle cx="12" cy="12" r="4.5" stroke="#fff" strokeWidth="1.8" fill="none" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="#fff" />
        </svg>
      );
    case 'facebook':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#1877F2" />
          <path d="M15.5 8H13.5C13.2 8 13 8.2 13 8.5V10H15.5L15.2 12.5H13V19H10.5V12.5H9V10H10.5V8.3C10.5 6.4 11.6 5 13.7 5H15.5V8Z" fill="#fff" />
        </svg>
      );
    case 'x':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#000" />
          <path d="M17.5 4H20L14.5 10.3L21 20H15.8L11.6 14.5L6.8 20H4.3L10.1 13.3L4 4H9.3L13.1 9.1L17.5 4ZM16.6 18.5H18L8.5 5.5H7L16.6 18.5Z" fill="#fff" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#25D366" />
          <path d="M12 4.5C7.86 4.5 4.5 7.86 4.5 12c0 1.35.36 2.62.99 3.72L4.5 19.5l3.9-.99A7.44 7.44 0 0012 19.5c4.14 0 7.5-3.36 7.5-7.5S16.14 4.5 12 4.5zm4.2 10.35c-.18.48-1.02.9-1.41.96-.36.06-.81.09-1.29-.09-.3-.12-.69-.27-1.17-.51-2.07-1.02-3.42-3.12-3.51-3.27-.09-.15-.75-1.02-.75-1.95s.48-1.38.66-1.56c.18-.18.39-.24.51-.24h.36c.12 0 .27-.03.42.33.15.36.51 1.26.57 1.35.06.09.09.21.03.33-.06.12-.09.21-.18.33-.09.12-.18.27-.27.36-.09.09-.18.21-.09.42.33.63.84 1.32 1.5 1.8.63.45 1.17.6 1.41.66.21.09.39.06.54-.06.18-.12.75-.87.96-1.17.21-.3.39-.24.66-.15.27.09 1.71.81 2.01.96.27.15.48.21.54.33.06.15.06.72-.12 1.2z" fill="#fff" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#0A66C2" />
          <path d="M7.5 9.5H5V19H7.5V9.5ZM6.25 8.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM19 19h-2.5v-4.75c0-1.15-.42-1.75-1.3-1.75-.96 0-1.45.65-1.45 1.75V19H11.5V9.5H14v1.1c.5-.8 1.3-1.4 2.4-1.4 1.9 0 2.6 1.3 2.6 3.2V19z" fill="#fff" />
        </svg>
      );
    case 'youtube':
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="6" fill="#FF0000" />
          <path d="M19.8 8.2s-.2-1.3-.8-1.9c-.7-.8-1.6-.8-2-.8C15 5.3 12 5.3 12 5.3s-3 0-5 .2c-.4 0-1.3 0-2 .8-.6.6-.8 1.9-.8 1.9S4 9.6 4 11v1.3c0 1.4.2 2.8.2 2.8s.2 1.3.8 1.9c.7.8 1.7.7 2.2.8C8.8 18 12 18 12 18s3 0 5-.3c.4 0 1.3 0 2-.8.6-.6.8-1.9.8-1.9s.2-1.4.2-2.8V11c0-1.4-.2-2.8-.2-2.8zM10.2 14.4V9.6l5.2 2.4-5.2 2.4z" fill="#fff" />
        </svg>
      );
    default:
      return <MessageCircle size={s} />;
  }
}

/* ── Static data ──────────────────────────────────────────────────── */

const CHANNELS = [
  // {
  //   icon: MessageCircle,
  //   label: 'WhatsApp',
  //   value: '+91 98765 43210',
  //   sub: 'Fastest response',
  //   href: 'https://wa.me/919876543210',
  //   iconColor: '#25D366',
  //   iconBg: 'rgba(37,211,102,0.12)',
  // },
  {
    icon: Phone,
    label: 'Call Us',
    value: '+91 98765 43210',
    sub: 'Mon–Sat, 10 am – 7 pm',
    href: 'tel:+919876543210',
    iconColor: 'var(--color-terra)',
    iconBg: 'var(--color-terra-muted)',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@bulkbricks.in',
    sub: 'Reply within 24 hours',
    href: 'mailto:hello@bulkbricks.in',
    iconColor: 'var(--color-info)',
    iconBg: 'var(--color-info-bg)',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Pune, NIBM',
    sub: 'By appointment only',
    href: '#',
    iconColor: 'var(--color-warning)',
    iconBg: 'var(--color-warning-bg)',
  },
];

const PERKS = [
  {
    icon: Users,
    title: 'Group Buying Power',
    desc: 'Pool demand with other buyers to negotiate better pricing directly with verified builders.',
  },
  {
    icon: Building2,
    title: 'Verified Builders Only',
    desc: 'Every builder on our platform is manually verified — no shady middlemen, ever.',
  },
  {
    icon: Zap,
    title: 'Instant WhatsApp Access',
    desc: 'Unlock a property and get added to the builder\'s exclusive WhatsApp group instantly.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Transactions',
    desc: 'Payments are processed via Razorpay — PCI-compliant and fully encrypted.',
  },
];

const FAQS = [
  {
    q: 'How does the group buying work?',
    a: 'Multiple buyers express interest in the same property. Once the group fills its slots, you get collective negotiating power with the builder.',
  },
  {
    q: 'What happens after I unlock a property?',
    a: 'You\'re added to a private WhatsApp group with the builder and other buyers for that project.',
  },
  {
    q: 'Is there a fee to browse properties?',
    a: 'Browsing is completely free. You only pay a one-time access fee when you want to join a property\'s buyer group.',
  },
];

const STATS = [
  { value: '500+', label: 'Properties Listed' },
  { value: '120+', label: 'Verified Builders' },
  { value: '8,000+', label: 'Happy Buyers' },
  { value: '24 hrs', label: 'Avg. Response Time' },
];

/* ── Component ────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async () => {
    setError('');
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!message.trim()) { setError('Please enter your message.'); return; }
    if (!email.trim() && !phone.trim()) {
      setError('Please provide an email or phone number so we can reach you.'); return;
    }
    setMode('submitting');
    const supabase = createClient();
    const { error: sbError } = await supabase.from('queries').insert({
      guest_name: name.trim(),
      guest_email: email.trim() || null,
      guest_phone: phone.trim() || null,
      message: message.trim(),
    });
    if (sbError) { setError('Something went wrong. Please try again.'); setMode('idle'); }
    else setMode('success');
  };

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-terra) 0%, var(--color-terra-hover) 55%, #6B2008 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(40px, 7vw, 72px) 24px',
      }}>
        {/* Decorative blobs */}
        <span aria-hidden style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <span aria-hidden style={{ position: 'absolute', bottom: '-80px', left: '5%', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        {/* Background Illustration */}
        <div style={{
          position: 'absolute',
          right: '0',
          bottom: '0',
          width: 'clamp(280px, 40vw, 504px)',
          pointerEvents: 'none',
        }}>
          <img
            src="/hero-building3.png"
            alt="Contact us illustration"
            style={{
              position: 'absolute',
              transform: 'translateY(-50%)',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15)) contrast(1.05) brightness(1.02)',
              WebkitMask: 'radial-gradient(circle at center, black 60%, transparent 100%)',
              mask: 'radial-gradient(circle at center, black 60%, transparent 100%)',
              opacity: '0.95',
            }}
          />
          {/* Soft glow effect */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '-10%',
            transform: 'translateY(-50%)',
            width: '120%',
            height: '120%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(20px)',
          }} />
        </div>

        {/* Content */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '10px' }}>
            Get in Touch
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
            fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', margin: '0 0 14px', lineHeight: 1.15,
            maxWidth: 'clamp(400px, 60vw, 600px)',
          }}>
            We&apos;re here to help you <br />buy smarter, together.
          </h1>
          <p style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)', color: 'rgba(255,255,255,0.78)', maxWidth: '560px', lineHeight: 1.7, margin: '0 0 32px' }}>
            Have questions about group buying, a specific property, or how Bulk Bricks works?
            Reach out — our team is ready to guide you through every step.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 40px' }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 1.875rem)', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', marginTop: '4px' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Two-column body ─────────────────────────────────── */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: 'clamp(32px, 5vw, 56px) 24px',
        display: 'grid',
        gridTemplateColumns: 'clamp(280px, 38%, 400px) 1fr',
        gap: '40px',
        alignItems: 'start',
      }}
        className="contact-page-grid"
      >

        {/* ── LEFT SIDEBAR ─────────────────────────────── */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Contact Channels */}
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                Contact Channels
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {CHANNELS.map(({ icon: Icon, label, value, sub, href, iconColor, iconBg }, i) => {
                const isWhatsApp = label === 'WhatsApp';
                return isWhatsApp ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '14px 20px',
                      borderTop: i === 0 ? 'none' : '1px solid var(--color-border-subtle)',
                      textDecoration: 'none',
                      transition: 'background 0.15s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span style={{
                      width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
                      background: iconBg, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon size={18} color={iconColor} />
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', lineHeight: 1 }}>
                        {label}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.4, marginTop: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {value}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        {sub}
                      </span>
                    </span>
                    <ArrowRight size={14} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
                  </a>
                ) : (
                  <div
                    key={label}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '14px',
                      padding: '14px 20px',
                      borderTop: i === 0 ? 'none' : '1px solid var(--color-border-subtle)',
                    }}
                  >
                    <span style={{
                      width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
                      background: iconBg, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', flexShrink: 0,
                    }}>
                      <Icon size={18} color={iconColor} />
                    </span>
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-muted)', lineHeight: 1 }}>
                        {label}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.4, marginTop: '3px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {value}
                      </span>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                        {sub}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Social Media Links */}
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                Follow Us
              </p>
            </div>
            <div style={{ padding: '20px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {SOCIAL_LINKS.map(({ id, label, href, color, bg, border }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '46px', height: '46px', borderRadius: '12px',
                    background: bg, border: `1px solid ${border}`,
                    textDecoration: 'none', flexShrink: 0,
                    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 6px 16px ${color}30`;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
                  }}
                >
                  <BrandIcon id={id} size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Response time badge */}
          <div style={{
            background: 'var(--color-success-bg)', borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-success)', padding: '14px 18px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <Clock size={18} color="var(--color-success)" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '0.875rem', color: 'var(--color-success)', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
              Average response time: <strong>under 24 hours</strong>
            </p>
          </div>

          {/* Why Bulk Bricks */}
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                Why Bulk Bricks?
              </p>
            </div>
            <div style={{ padding: '8px 0' }}>
              {PERKS.map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: '14px', padding: '14px 20px' }}>
                  <span style={{
                    width: '36px', height: '36px', borderRadius: 'var(--radius-md)',
                    background: 'var(--color-terra-muted)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0, marginTop: '2px',
                  }}>
                    <Icon size={16} color="var(--color-terra)" />
                  </span>
                  <div>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>{title}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', lineHeight: 1.55, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick FAQ */}
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid var(--color-border-subtle)' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                Quick Answers
              </p>
            </div>
            {FAQS.map(({ q, a }, i) => (
              <div
                key={i}
                style={{ borderTop: i === 0 ? 'none' : '1px solid var(--color-border-subtle)' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 20px', background: 'transparent', border: 'none', cursor: 'pointer',
                    textAlign: 'left', gap: '12px',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.4 }}>{q}</span>
                  <span style={{
                    fontSize: '1.1rem', color: 'var(--color-terra)', flexShrink: 0, lineHeight: 1,
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    display: 'inline-block',
                  }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 20px 16px' }}>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>{a}</p>
                  </div>
                )}
              </div>
            ))}
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-border-subtle)', background: 'var(--color-surface-3)' }}>
              <Link href="/faq" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-terra)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                View all FAQs <ArrowRight size={13} />
              </Link>
            </div>
          </div>

        </aside>

        {/* ── RIGHT: Form ──────────────────────────────────── */}
        <div>
          {mode === 'success' ? (
            <div style={{
              textAlign: 'center', padding: '64px 32px',
              background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'var(--color-success-bg)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
              }}>
                <CheckCircle size={36} color="var(--color-success)" />
              </div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700,
                color: 'var(--color-text-primary)', marginBottom: '12px', letterSpacing: '-0.02em',
              }}>
                Message Received!
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '360px', margin: '0 auto 28px' }}>
                Thanks for reaching out. Our team will get back to you within 24 hours. In the meantime, feel free to browse our latest properties.
              </p>
              <Link href="/properties" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 24px', background: 'var(--color-terra)', color: '#fff',
                borderRadius: 'var(--radius-pill)', fontFamily: 'var(--font-ui)',
                fontWeight: 700, fontSize: '0.9375rem', textDecoration: 'none',
                boxShadow: 'var(--shadow-cta)', transition: 'background 0.15s ease',
              }}>
                Browse Properties <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{
              background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
              overflow: 'hidden',
            }}>
              {/* Form header */}
              <div style={{
                padding: '24px 28px 20px',
                borderBottom: '1px solid var(--color-border-subtle)',
                background: 'var(--color-surface-3)',
              }}>
                <p className="section-label" style={{ marginBottom: '6px' }}>Send a Message</p>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700,
                  color: 'var(--color-text-primary)', margin: '0 0 6px', letterSpacing: '-0.01em',
                }}>
                  Tell us what you need
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
                  Interested in joining a group buy? Have a property query? We&apos;re all ears.
                </p>
              </div>

              {/* Form body */}
              <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Input
                  id="contact-page-name"
                  label="Your Name *"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Input
                    id="contact-page-email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <Input
                    id="contact-page-phone"
                    label="Phone / WhatsApp"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                {/* Textarea */}
                <div>
                  <label
                    htmlFor="contact-page-message"
                    style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '6px' }}
                  >
                    Message *
                  </label>
                  <div className="neuro-input" style={{ padding: 0 }}>
                    <textarea
                      id="contact-page-message"
                      rows={5}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Describe your query, the property you're interested in, or anything else..."
                      style={{
                        width: '100%', background: 'transparent', border: 'none', outline: 'none',
                        padding: '12px 14px', color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', resize: 'none', lineHeight: 1.6,
                      }}
                    />
                  </div>
                </div>

                {error && (
                  <div style={{
                    padding: '10px 14px', borderRadius: 'var(--radius-md)',
                    background: 'var(--color-danger-bg)', border: '1px solid rgba(185,28,28,0.2)',
                    fontSize: '0.8125rem', color: 'var(--color-danger)', fontWeight: 500,
                  }}>
                    {error}
                  </div>
                )}

                <Button
                  variant="terra"
                  loading={mode === 'submitting'}
                  onClick={handleSubmit}
                  style={{ padding: '14px', width: '100%', fontSize: '1rem' }}
                >
                  <MessageCircle size={17} />
                  Send Message
                </Button>

                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
                  By submitting, you agree to our{' '}
                  <Link href="/privacy" style={{ color: 'var(--color-terra)', textDecoration: 'none' }}>Privacy Policy</Link>
                  {' '}and{' '}
                  <Link href="/terms" style={{ color: 'var(--color-terra)', textDecoration: 'none' }}>Terms of Service</Link>.
                </p>
              </div>
            </div>
          )}

          {/* Group Buy CTA card (only when form is idle) */}
          {mode !== 'success' && (
            <div className="group-buy-card" style={{
              marginTop: '20px',
              background: 'linear-gradient(135deg, var(--color-terra-muted) 0%, var(--color-surface) 100%)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-terra-border)',
              padding: '22px 24px',
              display: 'flex', alignItems: 'center', gap: '18px',
            }}>
              <div style={{ justifyContent: 'center', alignItems: 'flex-start', display: 'flex', flexDirection:'row', gap:'8px'}}>
                <span style={{
                  width: '48px', height: '48px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--color-terra)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <Users size={22} color="#fff" />
                </span>
                <div className="group-buy-text" style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 4px' }}>
                    Ready to buy with a group?
                  </p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>
                    Browse available group buy slots and join a community of like-minded buyers today.
                  </p>
                </div>
              </div>
              <Button 
                variant="terra" 
                size="sm"
                asChild
                style={{ flexShrink: 0 }}
              >
                <Link href="/properties?group=true">
                  View Slots <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          )}

          {/* ── Map ─────────────────────────────────────────── */}
          <div style={{
            marginTop: '20px',
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}>
            {/* Map header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--color-border-subtle)',
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'var(--color-surface-3)',
            }}>
              <span style={{
                width: '32px', height: '32px', borderRadius: 'var(--radius-md)',
                background: 'var(--color-terra-muted)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <MapPin size={15} color="var(--color-terra)" />
              </span>
              <div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.2 }}>
                  Find Us
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: 0, marginTop: '2px' }}>
                  NIBM Road, Pune, Maharashtra
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=NIBM+Road,Pune,Maharashtra,India"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginLeft: 'auto',
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  padding: '6px 12px',
                  border: '1px solid var(--color-border-default)',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.75rem', fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  background: 'var(--color-surface)',
                  transition: 'border-color 0.15s ease, color 0.15s ease',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-terra)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-terra)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border-default)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)';
                }}
              >
                Open in Maps <ArrowRight size={11} />
              </a>
            </div>

            {/* Iframe */}
            <div style={{ position: 'relative', width: '100%', height: '280px', background: 'var(--color-surface-2)' }}>
              <iframe
                title="Bulk Bricks Office Location — Pune, NIBM"
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.8454%2C18.4367%2C73.9254%2C18.4967&layer=mapnik&marker=18.4667%2C73.8854"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block',
                  filter: 'var(--map-filter, none)',
                }}
                loading="lazy"
                allowFullScreen
              />
            </div>

            {/* Address strip */}
            <div style={{
              padding: '12px 20px',
              borderTop: '1px solid var(--color-border-subtle)',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <MapPin size={13} color="var(--color-text-muted)" style={{ flexShrink: 0 }} />
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', margin: 0 }}>
                By appointment only · NIBM Road, Pune, Maharashtra 411048
              </p>
            </div>
          </div>
          {/* ── /Map ─────────────────────────────────────────── */}

        </div>

      </div>

      {/* ── Mobile FAQ Section ───────────────────────────── */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto', padding: '0 24px 24px',
        display: 'none',
      }} className="mobile-faq-section">
        <div style={{
          background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '20px 20px 14px', borderBottom: '1px solid var(--color-border-subtle)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
              Quick Answers
            </p>
          </div>
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              style={{ borderTop: i === 0 ? 'none' : '1px solid var(--color-border-subtle)' }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 20px', background: 'transparent', border: 'none', cursor: 'pointer',
                  textAlign: 'left', gap: '12px',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.4 }}>{q}</span>
                <span style={{
                  fontSize: '1.1rem', color: 'var(--color-terra)', flexShrink: 0, lineHeight: 1,
                  transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease',
                  display: 'inline-block',
                }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 20px 16px' }}>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.65, margin: 0 }}>{a}</p>
                </div>
              )}
            </div>
          ))}
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-border-subtle)', background: 'var(--color-surface-3)' }}>
            <Link href="/faq" style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-terra)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              View all FAQs <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Responsive: stack on mobile ─────────────────── */}
      <style>{`
        @media (max-width: 767px) {
          .contact-page-grid {
            grid-template-columns: 1fr !important;
          }
          
          /* Hide original FAQ on mobile */
          .contact-page-grid > aside > div:last-child {
            display: none !important;
          }
          
          /* Show mobile FAQ section */
          .mobile-faq-section {
            display: block !important;
          }

          /* Group Buy Card adjustments for mobile */
          .group-buy-card {
            flex-direction: column !important;
            text-align: center !important;
            padding: 24px !important;
            gap: 20px !important;
          }

          .group-buy-card > span:first-child {
            margin-bottom: 12px !important; /* Space between icon and text */
          }

          .group-buy-text {
            margin-bottom: 20px !important; /* Space between text and button */
          }
        }
      `}</style>
    </div>
  );
}
