import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // The CV used to live at /cv.pdf; keep old links working.
  redirects() {
    return [
      { source: "/cv.pdf", destination: "/CV_Rifqisyandi_Khairurrizal.pdf", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
