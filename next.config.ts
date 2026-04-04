import type { NextConfig } from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', // ✅ FIX

  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,

  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/iseujdndycmiqmidekkn\.supabase\.co\//,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'supabase-api-cache',
          networkTimeoutSeconds: 10,
        },
      },
    ],
  },
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iseujdndycmiqmidekkn.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default withPWA(nextConfig);