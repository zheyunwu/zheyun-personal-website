import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  output: 'export',
  experimental: { globalNotFound: true },
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};
export default nextConfig;
