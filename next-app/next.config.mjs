/** @type {import('next').NextConfig} */
const nextConfig = {
experimental: {
    serverActions: {
      allowedOrigins: ["localhost:8080", "localhost:3000"]
    }
  },
images: {
    domains: ['image.space.rakuten.co.jp'], // 許可する外部画像ホスト名を追加
  },
};

export default nextConfig;
