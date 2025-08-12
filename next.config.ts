import type { NextConfig } from "next";

// Gunakan require untuk kompatibilitas next-pwa
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /\/api\/.*/, // cache all API
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        networkTimeoutSeconds: 15,
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 24 * 60 * 60 // 24 jam
        }
      }
    },
    {
      urlPattern: /\.(png|jpg|jpeg|svg|webp)$/, // Cache permanent assets img
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
        }
      }
    }
  ],
  buildExcludes: [
    /middleware-manifest\.json$/,
    /_buildManifest\.js$/,
    /_ssgManifest\.js$/,
    /app-build-manifest\.json$/ 
  ]
});

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com/**"
      }
    ]
  },
  reactStrictMode: true,
  // Fitur baru Next.js 15
  experimental: {
    optimizePackageImports: ['next-pwa']
  },
};

module.exports = withPWA(nextConfig);
