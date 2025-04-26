import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";
const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX();
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
  reactStrictMode: true,
};

export default withNextIntl(withMDX(nextConfig));
