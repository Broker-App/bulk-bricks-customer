'use client';

import NextNProgress from 'nextjs-progressbar';

export function ProgressBarProvider() {
  return (
    <NextNProgress
      color="#C1440E"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
    />
  );
}
