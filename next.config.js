/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
})

const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  transpilePackages: ['@react-three/postprocessing'],
  images: {
    domains: ['cdn.discordapp.com'],
    unoptimized: true,
  },
})

module.exports = nextConfig
