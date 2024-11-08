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
};

export default nextConfig;
