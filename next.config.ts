import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";
const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "storage.kong0.xyz" },
      { hostname: "assets.kong0.xyz" },
      { hostname: "images.unsplash.com" },
      { hostname: "picsum.photos" },
    ],
  },
  reactStrictMode: true,
  serverExternalPackages: ["typescript", "twoslash"],
};

export default withNextIntl(withMDX(nextConfig));
