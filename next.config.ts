// next.config.ts
import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import withPWAInit from "next-pwa"; 

const isDev = process.env.NODE_ENV !== "production";

// Initialize PWA config
const withPWA = withPWAInit({
  dest: "public", 
  disable: isDev, 
  register: true, 
  skipWaiting: true, 
});

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { hostname: "img.clerk.com" },
    ],
  },
};

export default withSentryConfig(withPWA(nextConfig), {
  org: "pcmi",
  project: "ej-ai-interview",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  automaticVercelMonitors: true,
  // tunnelRoute: "/monitoring", // Uncomment if needed
  disableLogger: true,
});