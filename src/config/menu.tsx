import { siteConfig } from "./site";
import { FeatureConfig } from "@/hooks/use-feature-config";

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

export const getGlobalMenu = (config: FeatureConfig | null): MenuConfig => {

  // 动态生成菜单数组
  const dynamicMenu: MenuItem[] = [];

  // 根据功能状态添加菜单项
  if (config?.stripe) {
    dynamicMenu.push({
      label: "Pricing",
      key: "menu.pricing",
      href: "/pricing",
    });
  }

  if (config?.docs) {
    dynamicMenu.push({
      label: "Docs",
      key: "menu.docs",
      href: "/docs",
    });
  }

  if (config?.blog) {
    dynamicMenu.push({
      label: "Blog",
      key: "menu.blog",
      href: "/blog",
    });
  }

  return {
    logo: {
      url: "/",
      src: "/logo.png",
      alt: "",
      title: siteConfig.name,
    },
    menu: dynamicMenu,
    mobileExtraLinks: [
      {
        label: "Sitemap",
        key: "menu.sitemap",
        href: "/sitemap",
      },
    ],
  };
};
