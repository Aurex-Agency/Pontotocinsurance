/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Webinar videos and posters are immutable — new versions get new
        // filenames. Long cache keeps rural mobile connections off origin.
        source: '/webinar/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
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
