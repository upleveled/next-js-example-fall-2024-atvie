import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
