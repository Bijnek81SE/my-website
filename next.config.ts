import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [{
      source: "/mobiltronic/:path*",
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }],
    }];
  },
  allowedDevOrigins: ["127.0.0.1"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
