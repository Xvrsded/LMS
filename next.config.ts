import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXTAUTH_URL: 'http://localhost:3000',
    NEXTAUTH_SECRET: 'your-secret-key-change-this-in-production-make-it-long-and-random',
  },
};

export default nextConfig;
