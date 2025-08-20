export type SiteConfig = typeof siteConfig;

const site_url = process.env.NEXT_PUBLIC_SITE_URL;

const baseConfig = {
  // (~100)
  // meta title (40~60)
  title: "CropImage.work - Free Online Image Cropper Tool",
  // meta description (140~160)
  description:
    "Professional free image cropping tool with real-time preview. Crop photos to any size, rotate, flip, and download in multiple formats. No registration required.",

  keywords: [
    "image cropper",
    "photo crop",
    "crop image online",
    "free image editor",
    "photo resizer",
    "image crop tool",
    "online photo editor",
    "crop photos",
    "image editing",
    "photo cropping",
    "free cropper",
    "image resize",
    "photo tool",
    "crop picture",
    "image cutter",
  ],
};

export const siteConfig = {
  name: "CropImage.work",
  title: baseConfig.title,
  description: baseConfig.description,
  keywords: baseConfig.keywords,
  url: `${site_url}`,
  logo: "/logo.png",
  ogImage: `${site_url}/og.png`,
  legal: {
    name: "CropImage.work",
    email: "support@cropimage.work",
  },
  author: {
    name: "CropImage.work",
    email: "support@cropimage.work",
  },
  utm: {
    source: "cropimage.work",
    medium: "referral",
    campaign: "image_cropping",
  },
  links: {
    discord: "",
    github: "#",
    twitter: "#",
  },
};

export const featureConfig = {
  headerSticky: true,
};
