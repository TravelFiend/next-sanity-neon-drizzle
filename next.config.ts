import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**'
      },{
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**`
      }
    ]
  },
  serverExternalPackages: [
    'argon2',
    'pg',
    'jsdom'
  ],
  transpilePackages: [
    '@sanity/ui',
    'sanity-plugin-cloudinary',
    'react-refractor'
  ]
};

export default nextConfig;
