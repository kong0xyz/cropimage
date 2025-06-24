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

export const getStaticMenu = (): MenuConfig => {
  return {
    logo: {
      url: "/",
      src: "/logo.png",
      alt: "",
      title: siteConfig.name,
    },
    menu: [{
      label: "Docs",
      key: "menu.docs",
      href: "/docs",
    }, {
      label: "Blog",
      key: "menu.blog",
      href: "/blog",
    }],
    mobileExtraLinks: [],
  };
};
