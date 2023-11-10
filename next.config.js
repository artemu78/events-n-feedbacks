/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    assetPrefix: isProd ? process.env.BASE_URL : undefined,
}

module.exports = nextConfig
