import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Avoid monorepo/workspace root inference when multiple lockfiles exist.
  outputFileTracingRoot: process.cwd(),
  // ISR: regenera páginas cada hora
  experimental: {
    // Permite rutas dinámicas con fallback
  },
  images: {
    // Dominios permitidos para imágenes externas
    remotePatterns: [
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
    ],
  },
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};

export default nextConfig;
