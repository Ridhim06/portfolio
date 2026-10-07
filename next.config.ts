import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hides the floating "N" dev-tools badge (dev only, never ships to production)
  devIndicators: false,
};

export default nextConfig;
