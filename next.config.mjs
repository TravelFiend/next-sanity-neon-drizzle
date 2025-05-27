const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    remotePatterns: [{ hostname: `res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/**` }]
  }
};

export default nextConfig;
