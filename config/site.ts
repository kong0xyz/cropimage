export type SiteConfig = typeof siteConfig;

const site_url = process.env.SITE_URL;

export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  name: "Awesome MCP",
  url: `${site_url}`,
  // meta title (40~60)
  title: "AwesomeMcp: Best Resources Hub to connect AI by MCP",
  // meta description (140~160)
  description: "Discover and Share the Best Resources about MCP.",
  // (~100)
  keywords: [
    "MCP",
    "Model Context Protocol",
    "Hosts",
    "Servers",
    "Clients",
    "Office",
    "Claude",
    "Desktop",
    "Community",
  ],
  robots: "index, follow",
  ogImage: `${site_url}/og.png`,
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Collection",
      href: "/collection",
    },
    {
      label: "Search",
      href: "/search",
    },
    {
      label: "Category",
      href: "/category",
    },
    {
      label: "Tag",
      href: "/tag",
    },
    {
      label: "Blog",
      href: "/blog",
    },
  ],
  legal: {
    name: "Awesome MCP Resources Website",
    email: "support@awesomemcp.com",
  },
  utm: {
    source: "awesomemcp.com",
    medium: "referral",
    campaign: "guest_post",
  },
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/shankaix",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};

export const featureSettings = {
  submissionEnabled: process.env.FEATURE_SUBMISSION_ENABLED === "true",
};
