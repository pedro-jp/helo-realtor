import 'dotenv/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.1.20',
        port: '3332',
        pathname: '/files/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.1.21',
        port: '3332',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: 'helo-realtor-backend.vercel.app',
        pathname: '/files/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/helo-realtor.appspot.com/o/**', // Ajuste no caminho
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    dangerouslyAllowSVG: true, // Enable SVG rendering
  },
  env: {
    NEXT_PUBLIC_URL: process.env.URL,
    NEXT_PUBLIC_OWNER_ID: process.env.OWNER_ID,
    NEXT_PUBLIC_FRONT_URL: process.env.FRONT_URL,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
};

export default nextConfig;
