import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async rewrites() {
    return { beforeFiles: [{
      source: "/:path((?!_next|api|mobiltronic).*)",
      has: [{ type: "host", value: "mobiltronic.bijan.se" }],
      destination: "/mobiltronic/:path",
    }], afterFiles: [], fallback: [] };
  },
  async headers() {
    return [{ source: "/:path*", has: [{ type: "host", value: "mobiltronic.bijan.se" }], headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] },
      { source: "/mobiltronic/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] }];
  },
  allowedDevOrigins: ["127.0.0.1"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
