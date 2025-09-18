/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add or migrate any options from next.config.ts here.
  reactStrictMode: true,
  swcMinify: true,
  // You can add rewrites, redirects, or experimental flags below.
  // Example (uncomment and adjust if needed):
  // async rewrites() {
  //   return [{ source: '/api/:path*', destination: '/api/:path*' }];
  // }
};

module.exports = nextConfig;
