/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['lh3.usergooglecontent.com', 'files.stripe.com'],
  },
};

module.exports = nextConfig;
