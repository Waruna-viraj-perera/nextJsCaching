/** @type {import('next').NextConfig} */
const nextConfig = {
  // Specify source directory for Next.js 16
  experimental: {
    // Ensure Next.js looks in src directory
    esmExternals: true,
    // Enable 'use cache' directive and Partial Prerendering (PPR)
    // Note: PPR is now enabled via cacheComponents
    cacheComponents: true,
  },
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
