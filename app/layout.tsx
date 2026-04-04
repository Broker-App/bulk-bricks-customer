import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { CustomerLayout } from '@/components/layout/CustomerLayout';
import { THEME_SCRIPT } from '@/utils/theme';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Bulk Bricks — Find Properties',
  description: 'Discover verified properties from trusted builders. Group buy deals, premium listings.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bulk Bricks',
  },
  openGraph: {
    title: 'Bulk Bricks — Find Properties',
    description: 'Discover verified properties from trusted builders.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#C1440E',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Inline script: sets data-theme before first paint — prevents FOUC */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/* Clash Display — loaded via link to avoid CSS @import order issues */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <WishlistProvider>
              <CustomerLayout>{children}</CustomerLayout>
            </WishlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
