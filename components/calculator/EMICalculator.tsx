'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Calculator, Home, TrendingUp, IndianRupee, ChevronRight, Zap, Building2, Crown, Trophy, Clock } from 'lucide-react';

/* ─── helpers ─── */
const fmt = (n: number) => {
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000)    return `₹${(n / 100_000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
};
const fmtEMI = (n: number) => `₹${n.toLocaleString('en-IN')}`;

/* ─── animated number hook ─── */
function useAnimatedNumber(target: number, duration = 400) {
  const [display, setDisplay] = useState(target);
  const raf   = useRef<number>(0);
  const start = useRef<number>(0);
  const from  = useRef(target);

  useEffect(() => {
    from.current = display;
    start.current = performance.now();
    cancelAnimationFrame(raf.current);

    const tick = (now: number) => {
      const t = Math.min((now - start.current) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from.current + (target - from.current) * ease));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return display;
}

/* ─── donut chart ─── */
function DonutChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest;
  const pPct  = total > 0 ? principal / total : 0;
  const r = 54, cx = 64, cy = 64, stroke = 14;
  const circ = 2 * Math.PI * r;
  const pDash = circ * pPct;
  const iDash = circ * (1 - pPct);

  return (
    <svg viewBox="0 0 128 128" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke="var(--color-border-subtle)" strokeWidth={stroke} />
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke="var(--color-success)" strokeWidth={stroke}
        strokeDasharray={`${pDash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
      <circle cx={cx} cy={cy} r={r} fill="none"
        stroke="var(--color-terra)" strokeWidth={stroke}
        strokeDasharray={`${iDash} ${circ}`}
        strokeDashoffset={-pDash}
        strokeLinecap="round"
        style={{ transition: 'stroke-dasharray 0.5s cubic-bezier(0.16,1,0.3,1), stroke-dashoffset 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
    </svg>
  );
}

/* ─── slider with fill ─── */
interface SliderProps {
  min: number; max: number; step: number; value: number;
  onChange: (v: number) => void;
  id: string;
}
function Slider({ min, max, step, value, onChange, id }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <input
      id={id}
      type="range"
      min={min} max={max} step={step} value={value}
      onChange={e => onChange(Number(e.target.value))}
      className="emi-slider"
      style={{
        background: `linear-gradient(to right,
          var(--color-terra) 0%,
          var(--color-terra) ${pct}%,
          var(--color-border-default) ${pct}%,
          var(--color-border-default) 100%)`,
      }}
    />
  );
}

/* ─── preset config ─── */
const PRESETS = [
  { label: 'Affordable', icon: Home, amount: 5_000_000,  rate: 7.5, tenure: 15 },
  { label: 'Standard',   icon: Building2, amount: 10_000_000, rate: 8.5, tenure: 20 },
  { label: 'Premium',    icon: Crown, amount: 20_000_000, rate: 9.0, tenure: 25 },
  { label: 'Short Term', icon: Clock, amount: 8_000_000,  rate: 6.8, tenure: 10 },
];

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function EMICalculator() {
  const [loanAmount,   setLoanAmount]   = useState(8_000_000);
  const [interestRate, setInterestRate] = useState(6.8);
  const [loanTenure,   setLoanTenure]   = useState(10);
  const [activePreset, setActivePreset] = useState(3);

  const calc = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = loanTenure * 12;
    if (!P || !r || !n) return { emi: 0, interest: 0, total: 0 };
    const emi   = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    return { emi: Math.round(emi), interest: Math.round(total - P), total: Math.round(total) };
  }, [loanAmount, interestRate, loanTenure]);

  const animEMI      = useAnimatedNumber(calc.emi);
  const animInterest = useAnimatedNumber(calc.interest);
  const animTotal    = useAnimatedNumber(calc.total);

  const incomeNeeded = Math.round(calc.emi / 0.4);
  const intPct       = calc.interest > 0 ? ((calc.interest / loanAmount) * 100).toFixed(1) : '0.0';

  const applyPreset = (i: number) => {
    const p = PRESETS[i];
    setLoanAmount(p.amount);
    setInterestRate(p.rate);
    setLoanTenure(p.tenure);
    setActivePreset(i);
  };

  return (
    <>
      {/* ── global slider styles injected once ── */}
      <style>{`
        .emi-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 9999px;
          outline: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .emi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px; height: 24px;
          border-radius: 50%;
          background: var(--color-terra);
          box-shadow: 0 0 0 4px var(--color-terra-muted), 0 2px 8px rgba(193,68,14,0.35);
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .emi-slider::-webkit-slider-thumb:hover,
        .emi-slider:active::-webkit-slider-thumb {
          transform: scale(1.2);
          box-shadow: 0 0 0 6px var(--color-terra-subtle), 0 4px 12px rgba(193,68,14,0.45);
        }
        .emi-slider::-moz-range-thumb {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: var(--color-terra);
          border: 4px solid var(--color-terra-muted);
          box-shadow: 0 2px 8px rgba(193,68,14,0.35);
          cursor: pointer;
        }
        @keyframes emi-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(193,68,14,0.4); }
          70%  { box-shadow: 0 0 0 10px rgba(193,68,14,0); }
          100% { box-shadow: 0 0 0 0 rgba(193,68,14,0); }
        }
        .emi-pulse { animation: emi-pulse 1.8s infinite; }
      `}</style>

      <div className="w-full max-w-6xl mx-auto">

        {/* ══════════════════════════════════════════
            MOBILE STICKY EMI BANNER (hidden on md+)
            ══════════════════════════════════════════ */}
        <div className="md:hidden sticky top-12 z-20 mx-0"
          style={{
            background: 'linear-gradient(135deg, var(--color-terra) 0%, var(--color-terra-hover) 100%)',
            borderRadius: '0 0 24px 24px',
            padding: '16px 20px 20px',
            boxShadow: '0 4px 24px rgba(193,68,14,0.35)',
          }}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-white/80" />
              <span className="text-white/80 text-xs font-semibold uppercase tracking-wider">Monthly EMI</span>
            </div>
            <span className="text-white/70 text-xs">{loanTenure}y · {loanTenure * 12}mo</span>
          </div>
          <div className="text-white font-bold" style={{ fontSize: '2rem', lineHeight: 1.1 }}>
            {fmtEMI(animEMI)}
          </div>
          {/* mini breakdown row */}
          <div className="flex gap-3 mt-3">
            {[
              { label: 'Principal', value: fmt(loanAmount) },
              { label: 'Interest',  value: fmt(animInterest) },
              { label: 'Total',     value: fmt(animTotal) },
            ].map(item => (
              <div key={item.label} className="flex-1 text-center"
                style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 12, padding: '6px 4px' }}>
                <p className="text-white/60 text-[10px] uppercase tracking-wide">{item.label}</p>
                <p className="text-white text-xs font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            PAGE HEADER (hidden on mobile — banner replaces it)
            ══════════════════════════════════════════ */}
        <div className="hidden md:block text-center mb-10 pt-8 px-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <Calculator className="w-5 h-5 text-[var(--color-terra)]" />
            <span className="section-label">Financial Planning</span>
          </div>
          <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mb-3"
            style={{ fontFamily: 'var(--font-display)' }}>
            EMI Calculator
          </h2>
          <p className="text-[var(--color-text-secondary)] text-base max-w-xl mx-auto">
            Plan your dream home with our interactive EMI calculator.
            Get instant calculations and visualize your payment structure.
          </p>
        </div>

        {/* ══════════════════════════════════════════
            MAIN GRID
            ══════════════════════════════════════════ */}
        <div className="md:grid md:grid-cols-2 md:gap-8 md:px-8 md:pb-12">

          {/* ── LEFT: Controls ── */}
          <div className="px-4 pt-5 md:px-0 md:pt-0 space-y-4">

            {/* Presets */}
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 20,
              border: '1px solid var(--color-border-subtle)',
              padding: '16px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <p className="section-label mb-3 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />Quick Presets
              </p>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <button key={p.label} onClick={() => applyPreset(i)}
                      style={{
                        borderRadius: 12,
                        padding: '10px 14px',
                        border: `1.5px solid ${activePreset === i ? 'var(--color-terra)' : 'var(--color-border-subtle)'}`,
                        background: activePreset === i ? 'var(--color-terra-muted)' : 'var(--color-surface-2)',
                        color: activePreset === i ? 'var(--color-terra)' : 'var(--color-text-secondary)',
                        fontWeight: 600,
                        fontSize: '0.8125rem',
                        transition: 'all 0.15s ease',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}>
                      <Icon size={16} strokeWidth={2} />
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Loan Amount */}
            <SliderCard
              icon={<Home className="w-5 h-5 text-[var(--color-terra)]" />}
              label="Loan Amount"
              value={fmt(loanAmount)}
            >
              <Slider id="loan-amount" min={100_000} max={50_000_000} step={100_000}
                value={loanAmount} onChange={v => { setLoanAmount(v); setActivePreset(-1); }} />
              <div className="flex justify-between mt-2 text-xs text-[var(--color-text-muted)]">
                <span>₹1 L</span><span>₹5 Cr</span>
              </div>
            </SliderCard>

            {/* Interest Rate */}
            <SliderCard
              icon={<TrendingUp className="w-5 h-5 text-[var(--color-terra)]" />}
              label="Interest Rate (% P.A.)"
              value={`${interestRate.toFixed(1)}%`}
            >
              <Slider id="interest-rate" min={5} max={15} step={0.1}
                value={interestRate} onChange={v => { setInterestRate(v); setActivePreset(-1); }} />
              <div className="flex justify-between mt-2 text-xs text-[var(--color-text-muted)]">
                <span>5%</span><span>15%</span>
              </div>
            </SliderCard>

            {/* Loan Tenure */}
            <SliderCard
              icon={<Calculator className="w-5 h-5 text-[var(--color-terra)]" />}
              label="Loan Tenure"
              value={`${loanTenure} Yrs`}
            >
              <Slider id="loan-tenure" min={1} max={30} step={1}
                value={loanTenure} onChange={v => { setLoanTenure(v); setActivePreset(-1); }} />
              <div className="flex justify-between mt-2 text-xs text-[var(--color-text-muted)]">
                <span>1 Year</span><span>30 Years</span>
              </div>
              {/* Year pills */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {[5, 10, 15, 20, 25, 30].map(y => (
                  <button key={y} onClick={() => { setLoanTenure(y); setActivePreset(-1); }}
                    style={{
                      padding: '4px 12px',
                      borderRadius: 9999,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: `1.5px solid ${loanTenure === y ? 'var(--color-terra)' : 'var(--color-border-subtle)'}`,
                      background: loanTenure === y ? 'var(--color-terra-muted)' : 'transparent',
                      color: loanTenure === y ? 'var(--color-terra)' : 'var(--color-text-muted)',
                      transition: 'all 0.15s',
                    }}>{y}y</button>
                ))}
              </div>
            </SliderCard>
          </div>

          {/* ── RIGHT: Results (desktop) / below controls (mobile) ── */}
          <div className="px-4 pt-4 pb-28 md:px-0 md:pt-0 md:pb-0 space-y-4">

            {/* Desktop EMI Hero card */}
            <div className="hidden md:block rounded-3xl overflow-hidden relative"
              style={{
                background: 'linear-gradient(135deg, var(--color-terra) 0%, var(--color-terra-hover) 100%)',
                padding: '28px 28px 24px',
                boxShadow: 'var(--shadow-cta)',
              }}>
              {/* decorative circles */}
              <div style={{ position:'absolute', top:-40, right:-40, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }} />
              <div style={{ position:'absolute', bottom:-30, left:-30, width:100, height:100, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }} />

              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <IndianRupee className="w-5 h-5 text-white/80" />
                  <span className="text-white/80 text-sm font-semibold">Your Monthly Home EMI</span>
                </div>
                <div className="text-white font-bold mb-1" style={{ fontSize: '3rem', lineHeight: 1.1, fontFamily: 'var(--font-display)' }}>
                  {fmtEMI(animEMI)}
                </div>
                <p className="text-white/70 text-sm">
                  Payable for {loanTenure} years ({loanTenure * 12} months)
                </p>
              </div>
            </div>

            {/* Donut chart + breakdown (desktop) */}
            <div className="hidden md:flex gap-4 items-center"
              style={{
                background: 'var(--color-surface)',
                borderRadius: 20,
                border: '1px solid var(--color-border-subtle)',
                padding: '20px',
                boxShadow: 'var(--shadow-card)',
              }}>
              <div className="relative flex-shrink-0" style={{ width: 128, height: 128 }}>
                <DonutChart principal={loanAmount} interest={animInterest} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wide">Interest</p>
                  <p className="text-sm font-bold text-[var(--color-terra)]">{intPct}%</p>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                {[
                  { label: 'Principal Amount', value: fmt(loanAmount),     dot: 'var(--color-success)' },
                  { label: 'Interest Amount',  value: fmt(animInterest),   dot: 'var(--color-terra)' },
                  { label: 'Total Payable',    value: fmt(animTotal),      dot: 'var(--color-border-default)' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: row.dot, flexShrink: 0, display: 'inline-block' }} />
                      <span className="text-sm text-[var(--color-text-secondary)]">{row.label}</span>
                    </div>
                    <span className="text-sm font-bold text-[var(--color-text-primary)]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile breakdown cards */}
            <div className="md:hidden grid grid-cols-3 gap-3">
              {[
                { label: 'Principal', value: fmt(loanAmount),   color: 'var(--color-success)',         bg: 'var(--color-success-bg)' },
                { label: 'Interest',  value: fmt(animInterest), color: 'var(--color-terra)',            bg: 'var(--color-terra-muted)' },
                { label: 'Total',     value: fmt(animTotal),    color: 'var(--color-text-primary)',     bg: 'var(--color-surface-2)' },
              ].map(c => (
                <div key={c.label} className="text-center"
                  style={{ background: c.bg, borderRadius: 16, padding: '12px 8px' }}>
                  <p className="text-[10px] uppercase tracking-wide mb-1" style={{ color: c.color, fontWeight: 600 }}>{c.label}</p>
                  <p className="text-sm font-bold" style={{ color: c.color }}>{c.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Insights */}
            <div style={{
              background: 'var(--color-surface)',
              borderRadius: 20,
              border: '1px solid var(--color-border-subtle)',
              padding: '20px',
              boxShadow: 'var(--shadow-card)',
            }}>
              <h3 className="font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2 text-sm">
                <span style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: 'var(--color-terra-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Zap className="w-3.5 h-3.5 text-[var(--color-terra)]" />
                </span>
                Quick Insights
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Interest as % of Principal', value: `${intPct}%`,                      highlight: false },
                  { label: 'Total Payments',              value: `${loanTenure * 12} months`,       highlight: false },
                  { label: 'Monthly Income Needed (40% rule)', value: fmtEMI(incomeNeeded),         highlight: true },
                ].map(row => (
                  <div key={row.label} className="flex justify-between items-center"
                    style={{ paddingBottom: 10, borderBottom: '1px solid var(--color-border-subtle)' }}
                  >
                    <span className="text-sm text-[var(--color-text-secondary)]">{row.label}</span>
                    <span className="text-sm font-bold"
                      style={{ color: row.highlight ? 'var(--color-terra)' : 'var(--color-text-primary)' }}>
                      {row.value}
                    </span>
                  </div>
                ))}
                {/* progress bar: principal vs interest */}
                <div className="pt-1">
                  <div className="flex justify-between text-xs mb-1.5 text-[var(--color-text-muted)]">
                    <span>Principal share</span>
                    <span>Interest share</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-border-subtle)' }}>
                    <div className="h-full rounded-full"
                      style={{
                        width: `${loanAmount / (loanAmount + (animInterest || 1)) * 100}%`,
                        background: 'linear-gradient(90deg, var(--color-success), var(--color-terra))',
                        transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
                      }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop CTA */}
            {/* <div className="hidden md:block text-center">
              <button className="btn-terra emi-pulse w-full py-4 text-base font-semibold flex items-center justify-center gap-2">
                Get Pre-Approved for This Loan
                <ChevronRight className="w-5 h-5" />
              </button>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">
                Check your eligibility in 2 minutes · No credit score impact
              </p>
            </div> */}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            MOBILE STICKY BOTTOM CTA
            ══════════════════════════════════════════ */}
        {/* <div className="md:hidden fixed bottom-0 left-0 right-0 z-30"
          style={{
            background: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border-subtle)',
            padding: '12px 16px',
            paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
          }}>
          <button className="btn-terra w-full py-4 text-base font-semibold flex items-center justify-center gap-2">
            Get Pre-Approved
            <ChevronRight className="w-5 h-5" />
          </button>
          <p className="text-center text-xs text-[var(--color-text-muted)] mt-1.5">
            No credit score impact · 2-minute process
          </p>
        </div> */}

      </div>
    </>
  );
}

/* ─── SliderCard sub-component ─── */
function SliderCard({ icon, label, value, children }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      background: 'var(--color-surface)',
      borderRadius: 20,
      border: '1px solid var(--color-border-subtle)',
      padding: '18px 20px',
      boxShadow: 'var(--shadow-card)',
    }}>
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-primary)]">
          {icon}{label}
        </label>
        <span className="text-lg font-bold text-[var(--color-terra)]">{value}</span>
      </div>
      {children}
    </div>
  );
}
