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

export const denyRoutes: string[] = ["/docs", "/blog"];

export const getStaticMenu = (): MenuConfig => {
  return {
    logo: {
      url: "/",
      src: "/logo.png",
      alt: "",
      title: siteConfig.name,
    },
    menu: [
      {
        label: "Image Cropper",
        key: "menu.crop",
        href: "/",
      },
    ],
    mobileExtraLinks: [],
  };
};
