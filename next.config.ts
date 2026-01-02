import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // helps catch bugs in dev
  swcMinify: true,       // use SWC for faster production builds
  experimental: {
    appDir: true,         // enable App Router
    serverActions: false, // optional: disable server actions overlay (dev N logo click menu)
  },
  images: {
    // if you later want to add remote images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  typescript: {
    // fail the build on type errors (good for production)
    ignoreBuildErrors: false,
  },
  eslint: {
    // run linting on build
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
