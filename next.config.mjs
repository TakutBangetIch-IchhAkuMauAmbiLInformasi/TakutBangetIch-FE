/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_SEARCH_ENGINE_URL: process.env.NEXT_PUBLIC_SEARCH_ENGINE_URL || 'http://localhost:8080',
  },
}

export default nextConfig
