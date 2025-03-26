/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [
      {
        pathname: '/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.aladin.co.kr',
        port: '',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'xpvoaapizboteqfpiioa.supabase.co',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
