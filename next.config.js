const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: isProd ? '/nabrosok-2022' : '',
  assetPrefix: isProd ? '/nabrosok-2022/' : '',
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
