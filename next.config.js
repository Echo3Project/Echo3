/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@react-three/postprocessing'],
    images: {
        domains: ['cdn.discordapp.com'],
        unoptimized: true,
    },
    server: {
        port: 8080,
    }
}

module.exports = nextConfig
