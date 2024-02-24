/** @type {import('next').NextConfig} */
const nextConfig = {
experimental: {
    serverActions: {
      allowedOrigins: ["localhost:8080", "localhost:3000"]
    }
  }
};

export default nextConfig;
