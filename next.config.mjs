import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = withContentlayer({
  reactStrictMode: true,
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
})

export default nextConfig;