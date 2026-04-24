'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2, Users, TrendingUp, ShieldCheck, CheckCircle,
  ArrowRight, Phone, ChevronDown, Briefcase, MapPin,
  ClipboardList, Target, Award, Handshake,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/buttons/Button';

/* ── Static data ──────────────────────────────────────────────────── */

const STATS = [
  { value: '500+', label: 'Corporate Groups Served' },
  { value: '₹200Cr+', label: 'Bulk Deals Closed' },
  { value: '50+', label: 'Partner Builders' },
  { value: '15%', label: 'Avg. Savings vs. Market' },
];

const BENEFITS = [
  {
    icon: TrendingUp,
    title: 'Exclusive Bulk Pricing',
    desc: 'Unlock developer-direct pricing not available to individual buyers. Typically 10–20% below market rate.',
  },
  {
    icon: ShieldCheck,
    title: 'Dedicated Relationship Manager',
    desc: 'A single point of contact who coordinates site visits, due diligence, and paperwork on your behalf.',
  },
  {
    icon: Handshake,
    title: 'Custom Payment Structures',
    desc: 'Negotiate staggered payment plans, corporate flexi-pay, or subvention schemes tailored to your organisation.',
  },
  {
    icon: ClipboardList,
    title: 'Legal & Documentation Support',
    desc: 'Our empanelled legal team reviews all agreements before you commit — no surprises at registration.',
  },
];

const PROCESS_STEPS = [
  { icon: ClipboardList, title: 'Submit Requirement', desc: 'Fill the form with your unit count, location preference & timeline.' },
  { icon: Target,       title: 'Shortlisting',        desc: 'We curate a matched project list within 48 hours.' },
  { icon: MapPin,       title: 'Site Visits',          desc: 'Group site tours arranged at your convenience.' },
  { icon: Briefcase,    title: 'Price Negotiation',    desc: 'We negotiate directly with the developer on your behalf.' },
  { icon: Award,        title: 'Final Booking',        desc: 'Seamless group booking with coordinated documentation.' },
];

const CONFIGS = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', 'Villa', 'Plot', 'Commercial', 'Mixed'];
const PURPOSES = ['Self-Use / Employee Housing', 'Investment', 'Corporate Gifting', 'Mixed'];
const TIMELINES = ['Within 3 months', '3–6 months', '6–12 months', 'Flexible'];

/* ── Form state type ─────────────────────────────────────────────── */

interface FormState {
  fullName: string;
  orgName: string;
  phone: string;
  email: string;
  unitCount: string;
  location: string;
  config: string;
  budget: string;
  purpose: string;
  timeline: string;
  projectTypes: string[];
  notes: string;
}

const INITIAL: FormState = {
  fullName: '', orgName: '', phone: '', email: '',
  unitCount: '', location: '', config: '', budget: '',
  purpose: '', timeline: '', projectTypes: [], notes: '',
};

/* ── Small helpers ───────────────────────────────────────────────── */

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label style={{
      fontSize: '0.8125rem', fontWeight: 700,
      color: 'var(--color-terra)', display: 'block', marginBottom: '6px',
    }}>
      {children}{required && <span style={{ color: 'var(--color-danger)', marginLeft: '2px' }}>*</span>}
    </label>
  );
}

function NativeSelect({
  id, value, onChange, options, placeholder,
}: {
  id: string; value: string;
  onChange: (v: string) => void;
  options: string[]; placeholder: string;
}) {
  return (
    <div className="neuro-input" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      <select
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', background: 'transparent', border: 'none', outline: 'none',
          padding: '11px 36px 11px 14px', color: value ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
          fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', cursor: 'pointer', appearance: 'none',
        }}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={16} color="var(--color-text-muted)"
        style={{ position: 'absolute', right: '12px', pointerEvents: 'none', flexShrink: 0 }} />
    </div>
  );
}

/* ── Page component ───────────────────────────────────────────────── */

export default function CorporatePage() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [mode, setMode] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const set = (key: keyof FormState) => (val: string) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const toggleProjectType = (type: string) => {
    setForm(prev => ({
      ...prev,
      projectTypes: prev.projectTypes.includes(type)
        ? prev.projectTypes.filter(t => t !== type)
        : [...prev.projectTypes, type],
    }));
  };

  const handleSubmit = async () => {
    setError('');
    if (!form.fullName.trim()) { setError('Please enter your full name.'); return; }
    if (!form.orgName.trim()) { setError('Please enter your organisation name.'); return; }
    if (!form.phone.trim()) { setError('Please enter your contact number.'); return; }
    if (!form.unitCount.trim()) { setError('Please specify the number of units.'); return; }
    setMode('submitting');
    await new Promise(r => setTimeout(r, 1200));
    // TODO: wire to supabase / API route
    setMode('success');
  };

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0F0A 0%, #3D1A0E 40%, var(--color-terra-hover) 100%)',
        position: 'relative', overflow: 'hidden',
        padding: 'clamp(48px, 8vw, 88px) 24px clamp(40px, 6vw, 72px)',
      }}>
        {/* Decorative orbs */}
        <span aria-hidden style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(193,68,14,0.15)', pointerEvents: 'none', filter: 'blur(60px)' }} />
        <span aria-hidden style={{ position: 'absolute', bottom: '-100px', left: '10%', width: '360px', height: '360px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 'var(--radius-pill)', padding: '5px 14px', marginBottom: '20px',
            backdropFilter: 'blur(8px)',
          }}>
            <Building2 size={13} color="rgba(255,255,255,0.8)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>
              Corporate & Bulk Buying
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '0 0 18px',
            lineHeight: 1.1, maxWidth: '700px',
          }}>
            Buy 10+ Units.<br />
            <span style={{ color: 'var(--color-terra-border)' }}>Save More. Together.</span>
          </h1>
          <p style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.125rem)', color: 'rgba(255,255,255,0.72)', maxWidth: '560px', lineHeight: 1.75, margin: '0 0 36px' }}>
            Whether it&apos;s employee housing, investment portfolios, or bulk gifting — we negotiate directly with verified developers to get your group the best deal in the market.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px 48px' }}>
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#fff', lineHeight: 1, margin: 0 }}>{value}</p>
                <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)', marginTop: '4px', margin: '4px 0 0' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why Corporate ─────────────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p className="section-label" style={{ marginBottom: '8px' }}>Why go corporate with us</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Exclusive benefits for bulk buyers
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{
              background: 'var(--color-surface)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
              padding: '24px', transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card-hover)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: 'var(--radius-lg)',
                background: 'var(--color-terra-muted)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
              }}>
                <Icon size={22} color="var(--color-terra)" />
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 8px' }}>{title}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Our Process ──────────────────────────────────── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) 24px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p className="section-label" style={{ marginBottom: '8px' }}>How it works</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Our process for group &amp; corporate booking
          </h2>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', justifyContent: 'center' }}>
          {PROCESS_STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '160px', padding: '8px 12px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'var(--color-terra-muted)', border: '2px solid var(--color-terra-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px',
                  position: 'relative',
                }}>
                  <Icon size={22} color="var(--color-terra)" />
                  <span style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'var(--color-terra)', color: '#fff',
                    fontSize: '0.625rem', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{i + 1}</span>
                </div>
                <p style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text-primary)', margin: '0 0 4px' }}>{title}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>{desc}</p>
              </div>
              {i < PROCESS_STEPS.length - 1 && (
                <ArrowRight size={18} color="var(--color-terra-border)" style={{ flexShrink: 0, marginBottom: '28px' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Form Section ─────────────────────────────── */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: 'clamp(40px, 6vw, 72px) 24px clamp(48px, 6vw, 80px)' }}>

        {mode === 'success' ? (
          /* ── Success State ─────────────────────────────── */
          <div style={{
            textAlign: 'center', padding: 'clamp(48px, 8vw, 80px) 32px',
            background: 'var(--color-surface)', borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
          }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'var(--color-success-bg)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
            }}>
              <CheckCircle size={40} color="var(--color-success)" />
            </div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              Requirement Submitted!
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '420px', margin: '0 auto 32px' }}>
              Thank you. Our corporate team will reach out to you within <strong>24 business hours</strong> with a curated project shortlist.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button variant="terra" asChild>
                <Link href="/properties">Browse Properties <ArrowRight size={16} /></Link>
              </Button>
              <Button variant="ghost" onClick={() => { setForm(INITIAL); setMode('idle'); }}>
                Submit Another
              </Button>
            </div>
          </div>
        ) : (
          /* ── Form ──────────────────────────────────────── */
          <div style={{
            background: 'var(--color-surface)', borderRadius: 'var(--radius-2xl)',
            border: '1px solid var(--color-border-subtle)', boxShadow: 'var(--shadow-card)',
            overflow: 'hidden',
          }}>
            {/* Form Header */}
            <div style={{
              background: 'linear-gradient(135deg, var(--color-terra-muted) 0%, var(--color-surface) 100%)',
              borderBottom: '1px solid var(--color-terra-border)',
              padding: 'clamp(24px, 4vw, 36px) clamp(24px, 4vw, 40px)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: 'var(--radius-lg)', flexShrink: 0,
                  background: 'var(--color-terra)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'var(--shadow-cta)',
                }}>
                  <Users size={24} color="#fff" />
                </div>
                <div>
                  <p className="section-label" style={{ marginBottom: '4px' }}>Corporate Enquiry Form</p>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 6px', letterSpacing: '-0.02em' }}>
                    Submit Your Bulk / Community Requirement
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
                    Fill in the details below and our team will contact you within 24 hours with a tailored shortlist.
                  </p>
                </div>
              </div>
            </div>

            {/* Form Body */}
            <div style={{ padding: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', gap: '24px' }}>

              {/* Full Name */}
              <div>
                <FieldLabel required>Full Name</FieldLabel>
                <Input id="corp-full-name" placeholder="Enter your full name" value={form.fullName} onChange={e => set('fullName')(e.target.value)} />
              </div>

              {/* Organisation */}
              <div>
                <FieldLabel required>Organisation / Community Name</FieldLabel>
                <Input id="corp-org-name" placeholder="Enter organisation or community name" value={form.orgName} onChange={e => set('orgName')(e.target.value)} />
              </div>

              {/* Phone + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <FieldLabel required>Contact Number</FieldLabel>
                  <div className="neuro-input" style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '0 10px 0 14px', borderRight: '1px solid var(--color-border-subtle)',
                      fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontWeight: 600,
                      height: '100%', flexShrink: 0,
                    }}>
                      🇮🇳 +91
                    </span>
                    <input
                      id="corp-phone" type="tel" placeholder="Enter contact number"
                      value={form.phone} onChange={e => set('phone')(e.target.value)}
                      style={{
                        flex: 1, background: 'transparent', border: 'none', outline: 'none',
                        padding: '11px 14px', color: 'var(--color-text-primary)',
                        fontFamily: 'var(--font-ui)', fontSize: '0.9375rem',
                      }}
                    />
                  </div>
                </div>
                <div>
                  <FieldLabel>Email Address</FieldLabel>
                  <Input id="corp-email" type="email" placeholder="Enter email address" value={form.email} onChange={e => set('email')(e.target.value)} />
                </div>
              </div>

              {/* Unit Count */}
              <div>
                <FieldLabel required>Number of Apartments / Units Planned</FieldLabel>
                <Input id="corp-units" type="number" placeholder="e.g. 25" value={form.unitCount} onChange={e => set('unitCount')(e.target.value)} />
              </div>

              {/* Location + Config */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <FieldLabel>Preferred Location / City</FieldLabel>
                  <Input id="corp-location" placeholder="e.g. Bangalore, Pune" value={form.location} onChange={e => set('location')(e.target.value)} />
                </div>
                <div>
                  <FieldLabel>Preferred Configuration</FieldLabel>
                  <NativeSelect id="corp-config" value={form.config} onChange={set('config')} options={CONFIGS} placeholder="Select..." />
                </div>
              </div>

              {/* Budget + Purpose */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <FieldLabel>Budget Range (per unit)</FieldLabel>
                  <Input id="corp-budget" placeholder="e.g. 50L – 1Cr" value={form.budget} onChange={e => set('budget')(e.target.value)} />
                </div>
                <div>
                  <FieldLabel>Investment Purpose</FieldLabel>
                  <NativeSelect id="corp-purpose" value={form.purpose} onChange={set('purpose')} options={PURPOSES} placeholder="Select..." />
                </div>
              </div>

              {/* Timeline + Project Type */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'start' }}>
                <div>
                  <FieldLabel>Expected Timeline</FieldLabel>
                  <NativeSelect id="corp-timeline" value={form.timeline} onChange={set('timeline')} options={TIMELINES} placeholder="Select..." />
                </div>
                <div>
                  <FieldLabel>Project Type Interest</FieldLabel>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '4px' }}>
                    {['Pre-launch Projects', 'Under Construction', 'Ready-to-Move'].map(type => {
                      const checked = form.projectTypes.includes(type);
                      return (
                        <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                          <span
                            onClick={() => toggleProjectType(type)}
                            style={{
                              width: '18px', height: '18px', borderRadius: '4px', flexShrink: 0,
                              border: checked ? '2px solid var(--color-terra)' : '2px solid var(--color-border-default)',
                              background: checked ? 'var(--color-terra)' : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.15s ease', cursor: 'pointer',
                            }}
                          >
                            {checked && <CheckCircle size={11} color="#fff" strokeWidth={3} />}
                          </span>
                          <span
                            onClick={() => toggleProjectType(type)}
                            style={{ fontSize: '0.875rem', fontWeight: 600, color: checked ? 'var(--color-terra)' : 'var(--color-text-secondary)' }}
                          >
                            {type}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <FieldLabel>Additional Notes</FieldLabel>
                <div className="neuro-input" style={{ padding: 0 }}>
                  <textarea
                    id="corp-notes" rows={4}
                    value={form.notes}
                    onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any specific requirements, special requests, or questions..."
                    style={{
                      width: '100%', background: 'transparent', border: 'none', outline: 'none',
                      padding: '12px 14px', color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-ui)', fontSize: '0.9375rem', resize: 'none', lineHeight: 1.6,
                    }}
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div style={{
                  padding: '10px 14px', borderRadius: 'var(--radius-md)',
                  background: 'var(--color-danger-bg)', border: '1px solid rgba(185,28,28,0.2)',
                  fontSize: '0.8125rem', color: 'var(--color-danger)', fontWeight: 500,
                }}>
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                variant="terra"
                loading={mode === 'submitting'}
                onClick={handleSubmit}
                style={{ padding: '15px', width: '100%', fontSize: '1rem', fontWeight: 700 }}
              >
                <Phone size={17} />
                Submit Requirement
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
      </div>
    </div>
  );
}
