/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@react-three/postprocessing'],
  images: {
    domains: ['cdn.discordapp.com'],
  },
}

module.exports = nextConfig
