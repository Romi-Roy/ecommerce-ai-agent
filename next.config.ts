import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['https://your-allowed-origin.com'],
    },
  },
  
  webpack(config, { isServer }) {
    if (isServer) {
      // `externals` can be a variety of shapes; coerce to array first
      config.externals = [
        ...(config.externals ?? []),
        { 'better-sqlite3': 'commonjs better-sqlite3' },
      ]
    }
    return config
  },
};

export default nextConfig;
