/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    output: "export",
    assetPrefix: isProd ? 'https://artemu78.github.io/rsc' : undefined,
}

module.exports = nextConfig
