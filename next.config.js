/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return ['/admin/:path*', '/api/:path*', '/secure-email-link', '/webinarlink/:path*'].map(source => ({
      source, headers: [{key: 'X-Robots-Tag', value: 'noindex, nofollow'}]
    }))
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
