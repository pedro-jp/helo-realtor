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
        pathname: '/v0/b/upload-imoveis.appspot.com/o/**', // Ajuste no caminho
      },
    ],
  },
  env: {
    NEXT_PUBLIC_URL: process.env.URL,
    NEXT_PUBLIC_OWNER_ID: process.env.OWNER_ID,
    NEXT_PUBLIC_FRONT_URL: process.env.PUBLIC_URL,
  },
};

export default nextConfig;
