import { Book } from "lucide-react";
import { siteConfig } from "./site";

export interface MenuItem {
  label: string;
  description?: string;
  key: string;
  href: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export interface MenuConfig {
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu: MenuItem[];
  mobileExtraLinks: {
    label: string;
    key: string;
    href: string;
  }[];
}

export const denyRoutes: string[] = [];

export const menuConfig: MenuConfig = {
  logo: {
    url: "/",
    src: "/logo.png",
    alt: "",
    title: siteConfig.name,
  },
  menu: [
    {
      label: "Pricing",
      key: "menu.pricing",
      href: "/pricing",
    },
    {
      label: "Docs",
      key: "menu.docs",
      href: "/docs",
    },
    {
      label: "Blog",
      key: "menu.blog",
      href: "/blog"
    },
  ],
  mobileExtraLinks: [
    {
      label: "Sitemap",
      key: "menu.sitemap",
      href: "/sitemap",
    },
  ],
};
