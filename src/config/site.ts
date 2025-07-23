export type SiteConfig = typeof siteConfig;

const site_url = process.env.NEXT_PUBLIC_SITE_URL;

const baseConfig = {
  // (~100)
  // meta title (40~60)
  title: "Next Maker: The next-generation framework for building online tools.",
  // meta description (140~160)
  description:
    "Build the future of online tools with a next-generation framework.",

  keywords: [
    "Next.js",
    "Shadcn UI",
    "Better Auth",
    "Resend",
    "Stripe",
    "Supabase",
    "Drizzle ORM",
    "Tailwind CSS",
    "TypeScript",
    "React",
    "Node.js",
  ],
};

export const siteConfig = {
  name: "Next Maker",
  title: baseConfig.title,
  description: baseConfig.description,
  keywords: baseConfig.keywords,
  url: `${site_url}`,
  logo: "/logo.png",
  ogImage: `${site_url}/og.png`,
  legal: {
    name: "Next Maker",
    email: "support@kong0.xyz",
  },
  author: {
    name: "Next Maker",
    email: "support@kong0.xyz",
  },
  utm: {
    source: "kong0.xyz",
    medium: "referral",
    campaign: "guest_post",
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
