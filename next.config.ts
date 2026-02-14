import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  turbopack: {},

  compiler: {
    styledComponents: true,
  },

  images: {
    qualities: [75, 90, 95],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },

  env: {
    NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_SECRET:
      process.env.NEXT_PUBLIC_SANITY_STUDIO_PREVIEW_SECRET,
    NEXT_PUBLIC_SANITY_STUDIO_SITE_URL:
      process.env.NEXT_PUBLIC_SANITY_STUDIO_SITE_URL,
  },
};

export default withNextIntl(nextConfig);
