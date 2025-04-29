export type SiteConfig = typeof siteConfig;

const site_url = process.env.SITE_URL;

export const metaConfig = {
  // (~100)
  // meta title (40~60)
  title: "Next Tool: Easy & Fast Online Tool",
  // meta description (140~160)
  description:
    "Easy & Fast Online Tool. Resize, Crop, Rotate, Invert, Grayscale, Blur, Brightness, Contrast, Saturation, Hue, Gamma, Sepia, Pixelate, Convert, Compress.",

  keywords: [
    "Image Processor",
    "Image Resize",
    "Image Crop",
    "Image Rotate",
    "Image Flip",
    "Image Invert",
    "Image Grayscale",
    "Image Blur",
    "Image Brightness",
    "Image Contrast",
    "Image Saturation",
    "Image Hue",
    "Image Gamma",
    "Image Sepia",
    "Image Pixelate",
    "Image Convert",
    "Image Compress",
  ],
  robots: "index, follow",
  ogImage: `${site_url}/og.png`,
};

export const siteConfig = {
  name: "Image Processor",
  url: `${site_url}`,
  logo: "/logo.png",
  legal: {
    name: "Image Pro",
    email: "support@imagepro.xyz",
  },
  author: {
    name: "Kong",
    email: "support@imagepro.xyz",
    twitter: "https://twitter.com/kong0xyz",
  },
  utm: {
    source: "imagepro.xyz",
    medium: "referral",
    campaign: "guest_post",
  },
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/kong0xyz",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
