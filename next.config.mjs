/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
},
  images: {
    remotePatterns: [
      {
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
};

export default nextConfig;
