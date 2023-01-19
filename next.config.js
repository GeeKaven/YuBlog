/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lain.bgm.tv',
        port: '',
      }
    ]
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
