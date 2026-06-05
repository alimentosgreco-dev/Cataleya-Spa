import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const frontendDir = path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(frontendDir, "..");

const backendUrl =
  process.env.BACKEND_INTERNAL_URL ?? "http://127.0.0.1:4000";

const nextConfig: NextConfig = {
  // Proxy same-origin: evita CORS cuando el frontend usa otro puerto (3001, etc.)
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  // Solo necesario si usas `npm run dev:turbo`
  turbopack: {
    root: monorepoRoot,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // En dev con webpack: no vigilar backend/BD (menos CPU y menos procesos)
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          path.join(monorepoRoot, "backend"),
          path.join(monorepoRoot, "database"),
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
