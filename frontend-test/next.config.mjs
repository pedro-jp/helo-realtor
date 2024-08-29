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
        protocol: 'https', // Protocolo usado pelo seu domínio Vercel
        hostname: 'helo-realtor-backend.vercel.app',
        pathname: '/files/**', // Isso permitirá qualquer imagem do domínio
      },
    ],
  },
  env: {
    NEXT_PUBLIC_URL: process.env.URL,
    NEXT_PUBLIC_OWNER_ID: process.env.OWNER_ID,
  },
};

export default nextConfig;
