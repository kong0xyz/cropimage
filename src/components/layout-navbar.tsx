
import { Navbar } from "@/components/blocks/navbar";
import { menuConfig } from "@/config/menu";
import { useTranslations } from "next-intl";

function LayoutNavbar() {
  const t = useTranslations();

  const menuData = {
    logo: menuConfig.logo,
    menu: menuConfig.menu.map((item) => ({
      title: t(item.key) || item.label,
      url: item.href,
      description: item.description,
      icon: item.icon,
      items: item.items?.map((subItem) => ({
        title: t(subItem.key) || subItem.label,
        url: subItem.href,
        description: subItem.description,
        icon: subItem.icon,
      })),
    })),
    mobileExtraLinks: menuConfig.mobileExtraLinks.map((link) => ({
      name: t(link.key) || link.label,
      url: link.href,
    })),
  };

  return <Navbar {...menuData} />;
}

export { LayoutNavbar };
