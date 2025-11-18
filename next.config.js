/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16 configuration for advanced caching demos
  experimental: {
    // Enable external ES modules support
    esmExternals: true,
    // Enable cache components - includes 'use cache' directive and PPR
    cacheComponents: true,
    // Note: PPR is now included in cacheComponents, no need for separate ppr: true
    // Enable cache life management (if available in your Next.js 16 version)
    // cacheLife: true,
  },
  // Disable development indicators for cleaner demo experience
  devIndicators: false,

  // Optimize for caching demos
  poweredByHeader: false,
  // Different caching strategies
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
  // Enable ISR (Incremental Static Regeneration)
  async rewrites() {
    return [
      {
        source: "/api/products/:id",
        destination: "/api/products/:id",
      },
    ];
  },
};

module.exports = nextConfig;
