export type SiteConfig = typeof siteConfig;

const site_url = process.env.SITE_URL;

export interface NavItem {
  label: string;
  key: string;
  href: string;
}

export const siteConfig = {
  name: "Image Processor",
  url: `${site_url}`,
  // meta title (40~60)
  title: "Image Processor: Easy & Fast Image Online Processor",
  // meta description (140~160)
  description:
    "Easy & Fast Image Online Processor. Resize, Crop, Rotate, Invert, Grayscale, Blur, Brightness, Contrast, Saturation, Hue, Gamma, Sepia, Pixelate, Convert, Compress.",
  // (~100)
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
  navItems: [
    {
      label: "Home",
      key: "menu.home",
      href: "/",
    },
    {
      label: "About",
      key: "menu.about",
      href: "/about",
    },
  ],
  legal: {
    name: "Image Pro",
    email: "support@imagepro.xyz",
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

export const featureSettings = {
  submissionEnabled: process.env.FEATURE_SUBMISSION_ENABLED === "true",
};
