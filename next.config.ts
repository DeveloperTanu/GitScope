import type { NextConfig } from "next";

// For a GitHub Pages project site, build with NEXT_PUBLIC_BASE_PATH=/<repo-name>.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  devIndicators: false,
};

export default nextConfig;
