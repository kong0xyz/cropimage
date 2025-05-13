export type SiteConfig = typeof siteConfig;

const site_url = process.env.SITE_URL;

export const metaConfig = {
  // (~100)
  // meta title (40~60)
  title: "Next Maker: The next-generation framework for building online tools.",
  // meta description (140~160)
  description:
    "Build the future of online tools with a next-generation framework.",

  keywords: [
    "Next.js",
    "Shadcn UI",
    "Clerk",
    "Resend",
    "Stripe",
    "Supabase",
    "Drizzle ORM",
    "Prisma",
    "Tailwind CSS",
    "TypeScript",
    "React",
    "Node.js",
  ],
  robots: "index, follow",
  ogImage: `${site_url}/og.png`,
};

export const siteConfig = {
  name: "Next Maker",
  url: `${site_url}`,
  logo: "/logo.png",
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
    discord: "https://discord.gg/#",
    github: "#",
    twitter: "#",
  },
};
