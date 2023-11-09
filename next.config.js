/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: "export",
    assetPrefix: isProd ? process.env.BASE_URL : undefined,
}

module.exports = nextConfig
