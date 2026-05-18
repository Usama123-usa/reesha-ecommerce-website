import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use Vercel's built-in image optimization (remove unoptimized:true for production)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
