/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Optional: Enable SWC minifier for faster builds
    // swcMinify: true, // Default in Next 13+
  },
  // Optional: Image optimization domain
  images: {
    domains: [
      'images-na.ssl-images-amazon.com',
      'images.unsplash.com',
      'via.placeholder.com',
      'res.cloudinary.com',
    ],
  },
};

module.exports = nextConfig;
