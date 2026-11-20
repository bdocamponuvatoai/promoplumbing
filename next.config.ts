import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to `out/`.
  output: "export",
  // Emit `/about/index.html` (not `/about.html`) so every route is a folder.
  trailingSlash: true,
  // No image optimisation server in a static export; images ship as-is.
  images: { unoptimized: true },
};

export default nextConfig;
