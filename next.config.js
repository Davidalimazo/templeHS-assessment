/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    reactDevOverlay: false,
    domains: ["res.cloudinary.com"],
    eslint: {
      ignoreDuringBuilds: true,
    },
  },
};

module.exports = nextConfig;
