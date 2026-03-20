/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i5.walmartimages.com",
      },
      // thêm các store khác luôn cho sau này
      {
        protocol: "https",
        hostname: "**.walmartimages.com",
      },
    ],
  },
};

module.exports = nextConfig;