// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images:{
        // 配置信任的图片加载源 
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '9000',
            pathname: '/**',
          },
        ],
      },
    reactStrictMode: false,  // 禁用严格模式
};

export default nextConfig;
