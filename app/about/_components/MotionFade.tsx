'use client';

import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

interface MotionFadeProps {
  children: ReactNode;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Y offset in px to translate from (default 20) */
  y?: number;
  /** Duration in seconds (default 0.6) */
  duration?: number;
  /** Pass-through style for flex/layout purposes on the wrapper div */
  style?: CSSProperties;
  className?: string;
}

/**
 * Lightweight scroll-triggered fade-up animation wrapper.
 * Uses IntersectionObserver — no external libraries required.
 * Falls back gracefully: content is visible by default (opacity:1),
 * JS sets it to 0 then transitions in on scroll-enter.
 * Forwards style/className so it can be used as a flex/grid child.
 */
export function MotionFade({
  children,
  delay = 0,
  y = 20,
  duration = 0.6,
  style,
  className,
}: MotionFadeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Set initial hidden state after mount (SSR sees opacity:1)
    el.style.opacity = '0';
    el.style.transform = `translateY(${y}px)`;
    el.style.transition = `opacity ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform ${duration}s cubic-bezier(0.16,1,0.3,1) ${delay}s`;
    el.style.willChange = 'opacity, transform';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          el.style.willChange = 'auto';
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, y, duration]);

  return (
    <div ref={ref} style={{ opacity: 1, ...style }} className={className}>
      {children}
    </div>
  );
}
