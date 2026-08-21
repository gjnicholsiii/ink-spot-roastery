import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/approved-loader.html', destination: '/approved-loader' }
    ];
  }
};

export default nextConfig;
