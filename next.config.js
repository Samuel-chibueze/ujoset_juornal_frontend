/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,  // ✅ Skip TS errors during build
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true, // Optional: useful for export builds or skipping image optimization
  },
};

module.exports = nextConfig;
