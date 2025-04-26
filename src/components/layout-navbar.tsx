import { Book, Sunset, Trees, Zap } from "lucide-react";

import { Navbar } from "@/components/blocks/navbar";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";



function LayoutNavbar() {
  const t = useTranslations();

  const menuData = {
    logo: {
      url: "/",
      src: "/logo.png",
      alt: siteConfig.name,
      title: siteConfig.name,
    },
    menu: [
      {
        title: t('menu.home'),
        url: "/",
      },

      {
        title: "Products",
        url: "#",
        items: [
          {
            title: "Blog",
            description: "The latest industry news, updates, and info",
            icon: <Book className="size-5 shrink-0" />,
            url: "/blog",
          },
          {
            title: "Company",
            description: "Our mission is to innovate and empower the world",
            icon: <Trees className="size-5 shrink-0" />,
            url: "/company",
          },
          {
            title: "Careers",
            description: "Browse job listing and discover our workspace",
            icon: <Sunset className="size-5 shrink-0" />,
            url: "/careers",
          },
          {
            title: "Support",
            description:
              "Get in touch with our support team or visit our community forums",
            icon: <Zap className="size-5 shrink-0" />,
            url: "/support",
          },
        ],
      },
      {
        title: "Resources",
        url: "#",
        items: [
          {
            title: "Help Center",
            description: "Get all the answers you need right here",
            icon: <Zap className="size-5 shrink-0" />,
            url: "/help",
          },
          {
            title: "Contact Us",
            description: "We are here to help you with any questions you have",
            icon: <Sunset className="size-5 shrink-0" />,
            url: "/contact",
          },
          {
            title: "Status",
            description: "Check the current status of our services and APIs",
            icon: <Trees className="size-5 shrink-0" />,
            url: "/status",
          },
          {
            title: "Terms of Service",
            description: "Our terms and conditions for using our services",
            icon: <Book className="size-5 shrink-0" />,
            url: "/terms",
          },
        ],
      },
      {
        title: t('menu.pricing'),
        url: "/pricing",
      },
      {
        title: t('menu.docs'),
        url: "/docs",
      },
      {
        title: t('menu.blog'),
        url: "/blog",
      },
    ],
    mobileExtraLinks: [
      // { name: "Press", url: "/press" },
      // { name: "Contact", url: "/contact" },
      // { name: "Imprint", url: "/imprint" },
      // { name: "Sitemap", url: "/sitemap" },
    ],
  };

  return <Navbar {...menuData} />;
}

export { LayoutNavbar };
