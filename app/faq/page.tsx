'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/buttons/Button';
import Link from 'next/link';
import { ChevronDown, ChevronUp, BookOpen, Users, CreditCard, Building2, Headphones } from 'lucide-react';

/* ── FAQ data organised by category ── */
const CATEGORIES = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    Icon: BookOpen,
    faqs: [
      {
        q: 'Is it free to browse properties on Bulk Bricks?',
        a: 'Yes — browsing is completely free, and no account is required. You can view listings, images, floor plans, price breakdowns, and amenity details without signing in.',
      },
      {
        q: 'Are the prices shown on listings inclusive of all charges?',
        a: 'Prices shown are the builder\'s base rate. Additional charges like GST (5% for under-construction residential, 12% for commercial), parking fees, society maintenance charges, and registration costs may apply. Always confirm the final all-inclusive price directly with the builder.',
      },
      {
        q: 'How can I verify if a builder is legitimate?',
        a: 'Look for builders with established track records, completed projects, and proper business registration. Check their website, visit their office, ask for past project references, and verify their corporate details. We also do basic verification before allowing builders on our platform.',
      },
      {
        q: 'Can I see floor plans and site photos before paying anything?',
        a: 'Basic listing details, carpet area, and configuration (BHK) are visible for free. Detailed floor plans, construction photos, and documents shared by the builder are typically available inside the WhatsApp group, which requires unlocking.',
      },
      {
        q: 'How do I know if a property is still available for booking?',
        a: 'Each listing shows a live status badge — Active, Limited Units, or Sold Out — updated by the builder. For the most accurate availability, joining the builder\'s WhatsApp group gives you real-time updates directly from the source.',
      },
      {
        q: 'Can I save or shortlist properties I like?',
        a: 'Yes. Sign in or create a free account, then tap the bookmark icon on any property card or detail page to save it. Your shortlist is accessible from your profile under "Saved Properties".',
      },
      {
        q: 'Does Bulk Bricks work on mobile?',
        a: 'Yes — the platform is fully optimised for mobile browsers on Android and iOS. There is no separate app required; just open the website from your phone\'s browser. You can also add it to your home screen for quick access.',
      },
      {
        q: 'I am an NRI. Can I buy property through Bulk Bricks?',
        a: 'NRIs are eligible to purchase residential property in India under FEMA regulations. The platform works the same way for NRI buyers. We recommend consulting a qualified NRI property lawyer before signing any agreement.',
      },
    ],
  },
  {
    id: 'bulk-buying',
    label: 'Bulk Buying & Groups',
    Icon: Users,
    faqs: [
      {
        q: 'What exactly is "bulk buying" in the context of real estate?',
        a: 'When multiple buyers approach a builder together with coordinated interest in the same project, the builder is more likely to offer preferential terms — flexible payment plans, priority booking, or better pricing — that they would never offer a single walk-in buyer.',
      },
      {
        q: 'How many people are typically in a builder\'s WhatsApp group?',
        a: 'Group sizes vary by project. Some groups have 10–15 buyers; popular projects may have 50 or more. A larger, more coordinated group carries more weight when negotiating with the builder.',
      },
      {
        q: 'What kind of negotiations actually happen in the WhatsApp group?',
        a: 'Buyers commonly ask for floor-wise price differences, waiver of parking charges, construction-linked payment plans instead of upfront payments, and firm possession date commitments. The builder responds to the group directly, so everyone sees the same answers.',
      },
      {
        q: 'What if I want to buy but other buyers in the group are not ready?',
        a: 'You are free to proceed independently. The WhatsApp group gives you direct builder contact — you can continue one-on-one with the builder\'s team regardless of what other group members decide.',
      },
      {
        q: 'Can the builder remove me from the WhatsApp group?',
        a: 'The builder administers their own group, so technically yes. If this happens without cause, report it to us via the Contact page. We will follow up with the builder and, if unresolved, process a refund of your unlock fee.',
      },
      {
        q: 'Is there a deadline to join the WhatsApp group after unlocking?',
        a: 'No hard deadline. Your unlock is permanent — the link stays accessible on your property detail page. If the builder rotates the group link for security, contact us and we will get you the updated link.',
      },
      {
        q: 'Can I coordinate with other group members to negotiate as a bloc?',
        a: 'Absolutely. Many buyers form informal coalitions within the group. You can propose a collective offer — for example, "10 of us are ready to book if you can offer X" — which builders tend to take very seriously.',
      },
      {
        q: 'What happens if the project gets delayed after I join the group?',
        a: 'Construction delays can happen due to various factors like weather, material shortages, or regulatory approvals. The WhatsApp group gives you direct access to the builder for regular updates. Document all communication and consider discussing penalty clauses in your purchase agreement.',
      },
    ],
  },
  {
    id: 'payments',
    label: 'Access & Payments',
    Icon: CreditCard,
    faqs: [
      {
        q: 'What exactly do I get when I pay to unlock a property?',
        a: 'You get permanent access to the builder\'s private WhatsApp group link for that property. Inside the group, you can ask questions, request site visits, and participate in group negotiations directly with the builder\'s team.',
      },
      {
        q: 'Is the unlock fee the same for all properties?',
        a: 'No — the access fee varies by property and is shown clearly on each listing before you pay. It reflects the project\'s value tier, not a percentage of the purchase price.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We accept UPI (GPay, PhonePe, Paytm), net banking, and all major debit and credit cards via our secure payment gateway. International cards are supported for NRI buyers.',
      },
      {
        q: 'My payment failed but the amount was deducted from my account. What do I do?',
        a: 'This occasionally happens due to bank processing delays. If the property shows as unlocked, the payment succeeded. If not, the deducted amount will be automatically refunded to your account within 5–7 business days by your bank. Contact us if it takes longer.',
      },
      {
        q: 'Can I unlock multiple properties at the same time?',
        a: 'Yes. Each property has its own one-time unlock fee, and you can unlock as many as you want. All unlocked properties are accessible from your profile independently.',
      },
      {
        q: 'Will I get a receipt or invoice for my payment?',
        a: 'Yes. A payment confirmation is emailed to your registered address immediately after a successful transaction. You can also download invoices from your profile under "My Payments".',
      },
      {
        q: 'Is the access fee refundable if I change my mind?',
        a: 'The unlock fee is non-refundable once you have accessed the WhatsApp group link, as the service has been delivered. Refunds are issued only if the link is non-functional and we cannot resolve it within 24 hours.',
      },
      {
        q: 'I accidentally paid twice for the same property. Will I be refunded?',
        a: 'Yes — duplicate payments for the same property are flagged in our system. Contact our support team and we will process a refund for the duplicate charge within 3–5 business days.',
      },
    ],
  },
  {
    id: 'builders',
    label: 'Builders & Properties',
    Icon: Building2,
    faqs: [
      {
        q: 'How does Bulk Bricks verify builders before listing their properties?',
        a: 'Our team reviews each builder\'s business registration, corporate documents, past project history, and market reputation. We conduct basic due diligence including office verification and reference checks. Only builders who meet our quality standards can list on the platform.',
      },
      {
        q: 'Can I see a builder\'s past completed projects?',
        a: 'Yes. Each builder profile lists their previously completed projects, years in business, and current portfolio. You can also search online for the builder\'s name to find reviews, news coverage, and customer feedback about their past developments.',
      },
      {
        q: 'Are the properties listed ready-to-move-in or under construction?',
        a: 'Both. Each listing clearly labels its possession status — Under Construction, Ready to Move, or Near Possession. You can filter by possession status on the Properties page.',
      },
      {
        q: 'What if the builder gives incorrect information inside the WhatsApp group?',
        a: 'Always get important claims in writing. Cross-reference builder statements with independent sources, request official documents, and don\'t rely solely on verbal promises. If you suspect misrepresentation, document it and report it to us for investigation.',
      },
      {
        q: 'How do I report a misleading or inaccurate listing?',
        a: 'Use the "Report Listing" link on the property detail page, or contact our support team. Verified reports lead to the listing being reviewed, updated, or removed.',
      },
      {
        q: 'What does "Under Review" mean on a builder profile?',
        a: '"Under Review" means the builder has registered on the platform but has not yet completed our verification process. Their properties will not go live until the review is approved by our team.',
      },
      {
        q: 'Can I contact the builder without paying the unlock fee?',
        a: 'Yes. The "Submit Inquiry" button on any listing lets you send a general question without unlocking. A member of our team or the builder will follow up, though response time may be slower than direct group access.',
      },
      {
        q: 'What if a builder stops responding in the WhatsApp group?',
        a: 'If the group goes inactive for more than 7 days, contact us — we will follow up with the builder on your behalf and escalate if needed.',
      },
    ],
  },
  {
    id: 'support',
    label: 'Account & Support',
    Icon: Headphones,
    faqs: [
      {
        q: 'How do I track the inquiries I have submitted?',
        a: 'Sign in and go to "My Queries" in your profile. You can see all submitted inquiries, their current status, and any replies from builders or our team.',
      },
      {
        q: 'I forgot my password. How do I reset it?',
        a: 'On the login screen, tap "Forgot Password" and enter your registered email or phone number. You will receive an OTP or reset link within a minute. If you signed up via Google, use "Continue with Google" instead.',
      },
      {
        q: 'Can I change my registered phone number or email address?',
        a: 'Yes. Go to Settings in your profile and update your contact details. A verification OTP will be sent to the new number or email before the change takes effect.',
      },
      {
        q: 'Can I share my unlocked property access with a family member?',
        a: 'Unlocked access is tied to your account. You can share the WhatsApp group link with a family member once you have joined the group — but the builder controls group membership and may limit re-sharing of the invite link.',
      },
      {
        q: 'How long does it take to get a response from support?',
        a: 'We aim to respond within one business day. Payment and broken-link issues are prioritised and typically resolved within a few hours during business hours (Mon–Sat, 10am–6pm IST).',
      },
      {
        q: 'Is there a mobile app I can download?',
        a: 'Not yet — but the website works smoothly on all mobile browsers. You can add it to your home screen for app-like access. A dedicated mobile app is on our roadmap.',
      },
      {
        q: 'Is my personal data safe? Who can see my information?',
        a: 'Your data is encrypted in transit and at rest. We do not sell personal data to third parties. Your phone number and email are only shared with a builder if you explicitly submit an inquiry or join a WhatsApp group.',
      },
      {
        q: 'How do I delete my Bulk Bricks account?',
        a: 'You can request account deletion from the Settings page in your profile. Your data will be permanently removed within 30 days, except for transaction records we are legally required to retain.',
      },
    ],
  },
];



export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory)!;

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenIdx(null); // reset open accordion when switching tabs
  };

  const toggle = (idx: number) => setOpenIdx(prev => prev === idx ? null : idx);

  return (
    <div style={{ background: 'var(--color-canvas)', minHeight: '100dvh' }}>
      <style>{`
        .faq-layout {
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 1100px;
          margin: 0 auto;
          padding: clamp(40px, 8vw, 80px) 24px clamp(48px, 8vw, 80px);
        }
        /* Mobile: horizontal pill tabs */
        .faq-tab-bar {
          display: flex;
          overflow-x: auto;
          gap: 8px;
          padding-bottom: 24px;
          scrollbar-width: none;
          -webkit-overflow-scrolling: touch;
          flex-shrink: 0;
        }
        .faq-tab-bar::-webkit-scrollbar { display: none; }
        .faq-sidebar { display: none; }
        .faq-content { flex: 1; }

        @media (min-width: 860px) {
          .faq-layout {
            flex-direction: row;
            align-items: flex-start;
            gap: 48px;
          }
          .faq-tab-bar { display: none; }
          .faq-sidebar {
            display: flex;
            flex-direction: column;
            gap: 4px;
            width: 240px;
            flex-shrink: 0;
            position: sticky;
            top: 88px;
          }
        }

        .faq-sidebar-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          border-radius: var(--radius-lg);
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          transition: background 0.15s ease, color 0.15s ease;
          font-family: var(--font-ui);
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--color-text-secondary);
        }
        .faq-sidebar-item:hover {
          background: var(--color-surface);
          color: var(--color-text-primary);
        }
        .faq-sidebar-item.active {
          background: var(--color-terra-muted);
          color: var(--color-terra);
          font-weight: 600;
        }

        .faq-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: var(--radius-pill);
          white-space: nowrap;
          cursor: pointer;
          border: 1.5px solid var(--color-border-default);
          background: var(--color-surface);
          font-family: var(--font-ui);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .faq-pill:hover {
          border-color: var(--color-terra);
          color: var(--color-terra);
        }
        .faq-pill.active {
          background: var(--color-terra);
          border-color: var(--color-terra);
          color: #FFFFFF;
        }

        .faq-item {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border-subtle);
          overflow: hidden;
          transition: border-color 0.2s ease;
        }
        .faq-item.open {
          border-color: var(--color-terra-border);
        }
        .faq-trigger {
          width: 100%;
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 18px 20px;
          background: none;
          border: none;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          text-align: left;
        }
        .faq-trigger:hover { background: var(--color-canvas); }
        .faq-answer {
          padding: 0 20px 18px 20px;
          border-top: 1px solid var(--color-border-subtle);
        }
      `}</style>

      {/* ── Page header ── */}
      <div style={{
        borderBottom: '1px solid var(--color-border-subtle)',
        background: 'var(--color-surface)',
        padding: 'clamp(40px, 7vw, 72px) 24px clamp(32px, 5vw, 56px)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--color-terra)', marginBottom: '12px',
          }}>Help Centre</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
            fontWeight: 800, color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em', margin: '0 0 12px', lineHeight: 1.1,
          }}>
            Frequently Asked Questions
          </h1>
          <p style={{
            color: 'var(--color-text-secondary)', lineHeight: 1.7,
            fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)', maxWidth: '480px', margin: 0,
          }}>
            Everything you need to know about buying property through Bulk Bricks.
          </p>
        </div>
      </div>

      <div className="faq-layout">

        {/* ── Mobile: horizontal pill tabs ── */}
        <div className="faq-tab-bar">
          {CATEGORIES.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`faq-pill${activeCategory === id ? ' active' : ''}`}
              onClick={() => handleCategoryChange(id)}
            >
              <Icon size={13} strokeWidth={2.5} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Desktop: sticky sidebar ── */}
        <aside className="faq-sidebar">
          <p style={{
            fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'var(--color-text-muted)',
            padding: '0 14px 12px', margin: 0,
          }}>Category</p>
          {CATEGORIES.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`faq-sidebar-item${activeCategory === id ? ' active' : ''}`}
              onClick={() => handleCategoryChange(id)}
            >
              <Icon size={15} strokeWidth={2} style={{ flexShrink: 0 }} />
              {label}
            </button>
          ))}
        </aside>

        {/* ── FAQ accordion ── */}
        <div className="faq-content">
          {/* Category heading */}
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.375rem, 3vw, 1.875rem)',
              fontWeight: 800, color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em', margin: '0 0 6px',
            }}>
              {currentCategory.label}
            </h2>
            <p style={{
              fontSize: '0.875rem', color: 'var(--color-text-muted)',
              margin: 0,
            }}>
              {currentCategory.faqs.length} questions in this section
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {currentCategory.faqs.map(({ q, a }, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className={`faq-item${isOpen ? ' open' : ''}`}>
                  <button
                    id={`faq-${activeCategory}-${idx}`}
                    className="faq-trigger"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                  >
                    {/* Left accent dot */}
                    <span style={{
                      width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                      background: isOpen ? 'var(--color-terra)' : 'var(--color-border-default)',
                      marginTop: '7px',
                      transition: 'background 0.2s ease',
                    }} />
                    <span style={{
                      flex: 1, fontWeight: 600, color: 'var(--color-text-primary)',
                      fontSize: '0.9375rem', lineHeight: 1.5,
                    }}>
                      {q}
                    </span>
                    {isOpen
                      ? <ChevronUp size={17} color="var(--color-terra)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      : <ChevronDown size={17} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    }
                  </button>

                  {isOpen && (
                    <div className="faq-answer">
                      <p style={{
                        color: 'var(--color-text-secondary)', lineHeight: 1.8,
                        fontSize: '0.9rem', paddingTop: '14px', margin: 0,
                      }}>
                        {a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions CTA */}
          <div style={{
            marginTop: '40px', padding: '28px',
            background: 'var(--color-terra-muted)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-terra-border)',
            display: 'flex', flexWrap: 'wrap',
            alignItems: 'center', justifyContent: 'space-between', gap: '16px',
          }}>
            <div>
              <p style={{ fontWeight: 700, color: 'var(--color-text-primary)', margin: '0 0 4px', fontSize: '0.9375rem' }}>
                Still have questions?
              </p>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                Our support team typically responds within one business day.
              </p>
            </div>
            <Button asChild variant="terra" size="sm">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
