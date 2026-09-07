import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves prebuilt files and does not run a Node.js server.
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
