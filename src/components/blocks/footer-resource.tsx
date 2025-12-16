import { getStaticMenu, MenuItem } from "@/config/menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { PageBadges } from "../page-badges";
import SocialLinks from "../social-links";
import { SiteLogo } from "./site-logo";

interface LinkItem extends MenuItem {
  className?: string;
  target?: string;
  items?: LinkItem[];
}

const fixedLinks: LinkItem[] = [
  {
    label: "Resources",
    key: "footer.resources",
    href: "#",
    items: [
      {
        label: "Blog",
        href: "/blog",
        key: "menu.blog",
      },
      {
        label: "Docs",
        href: "/docs",
        key: "menu.docs",
      },
      {
        label: "Sitemap",
        href: "/sitemap.xml",
        target: "_blank",
        className: 'after:content-["↗"] after:ml-1',
        key: "footer.sitemap",
      },
    ],
  },
  {
    label: "About",
    key: "footer.about",
    href: "#",
    items: [
      {
        label: "Home",
        href: "/",
        key: "menu.home",
      },
      {
        label: "About",
        href: "/about",
        key: "footer.about",
      },
    ],
  },
  {
    label: "Legal",
    key: "footer.legal",
    href: "#",
    items: [
      {
        label: "Terms of Service",
        href: "/terms",
        key: "footer.terms",
      },
      {
        label: "Privacy Policy",
        href: "/privacy",
        key: "footer.privacy",
      },
    ],
  },
];

export const FooterResource = () => {
  const t = useTranslations("footer");
  const g = useTranslations();

  const featuredLinks: LinkItem[] = [];
  const menuLinks: LinkItem[] = [];

  getStaticMenu()
    ?.menu // .filter((item) => !["menu.home", "menu.pricing", "menu.docs", "menu.blog"].includes(item.key))
    .forEach((item) => {
      if (item.items?.length) {
        menuLinks.push(item);
      } else {
        featuredLinks.push({
          label: item.label,
          key: item.key,
          href: item.href,
        });
      }
    });

  const links: LinkItem[] = [
    ...(featuredLinks.length
      ? [
          {
            label: "Featured",
            key: "footer.featured",
            href: "#",
            items: featuredLinks,
          },
        ]
      : []),
    ...menuLinks,
    ...fixedLinks,
  ];

  return (
    <div className="container mx-auto flex flex-col p-4 pt-8 space-y-4">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2 flex flex-col gap-4">
          <SiteLogo enableDescription={true} />
          <SocialLinks />
        </div>

        <div className="columns-2 gap-6 lg:columns-3 md:col-span-3">
          {links.map((link, index) => (
            <div
              key={index}
              className="break-inside-avoid space-y-2 flex flex-col mb-4"
            >
              {/* group */}
              <div className="py-1 font-medium text-base">
                {link.key ? g(link.key) : link.label}
              </div>
              {/* items */}
              <div className="flex flex-col gap-2 text-sm">
                {link.items?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    target={item.target}
                    className="text-muted-foreground hover:text-primary duration-150"
                  >
                    <span className={cn(item.className)}>
                      {item.key ? g(item.key) : item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <PageBadges />
      </div>
      <div className="flex flex-wrap items-end justify-center gap-6">
        <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
          {`© ${format(new Date(), "yyyy")} ${siteConfig.name}. ${t("allRightsReserved")}`}
        </span>
      </div>
    </div>
  );
};
