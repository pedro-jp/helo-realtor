/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['192.168.1.6'],
  },
  env: {
    URL: `http://192.168.1.6:3332/imoveis/8b06fc1e-ba36-4a48-9493-6cccad749a75`,
  },
};

export default nextConfig;
