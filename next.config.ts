import type { NextConfig } from "next";

const apiBase = process.env.API_BASE_URL ?? "http://127.0.0.1:8080";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiBase}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
