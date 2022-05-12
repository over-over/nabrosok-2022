/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? '/nabrosok-2022/' : './',
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
