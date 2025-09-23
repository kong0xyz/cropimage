import { getStaticMenu, MenuItem } from "@/config/menu";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { PageBadges } from "../page-badges";
import SocialLinks from '../social-links';
import { SiteLogo } from './site-logo';

interface LinkItem extends MenuItem {
    className?: string;
    target?: string;
    items?: LinkItem[];
}

const fixedLinks: LinkItem[] = [
    {
        label: "Resources",
        key: 'footer.resources',
        href: '#',
        items: [
            {
                label: 'Blog',
                href: '/blog',
                key: 'menu.blog'
            },
            {
                label: 'Docs',
                href: '/docs',
                key: 'menu.docs'
            },
            {
                label: 'Sitemap',
                href: '/sitemap.xml',
                target: '_blank',
                className: 'after:content-["↗"] after:ml-1',
                key: 'footer.sitemap'
            },
        ]
    },
    {
        label: 'About',
        key: 'footer.about',
        href: '#',
        items: [
            {
                label: 'Home',
                href: '/',
                key: 'menu.home'
            },
            {
                label: 'About',
                href: '/about',
                key: 'footer.about'
            }
        ],
    },
    {
        label: 'Legal',
        key: 'footer.legal',
        href: '#',
        items: [
            {
                label: 'Terms of Service',
                href: '/terms',
                key: 'footer.terms'
            },
            {
                label: 'Privacy Policy',
                href: '/privacy',
                key: 'footer.privacy'
            }
        ],
    },
]

export const FooterResource = () => {
    const t = useTranslations("footer");
    const g = useTranslations();

    const featuredLinks: LinkItem[] = []
    const menuLinks: LinkItem[] = []

    getStaticMenu()?.menu
        // .filter((item) => !["menu.home", "menu.pricing", "menu.docs", "menu.blog"].includes(item.key))
        .forEach((item) => {

            if (item.items?.length) {
                menuLinks.push(item)
            } else {
                featuredLinks.push({
                    label: item.label,
                    key: item.key,
                    href: item.href,
                })
            }
        });

    const links: LinkItem[] = [
        ...featuredLinks.length ? [{
            label: "Featured",
            key: 'footer.featured',
            href: '#',
            items: featuredLinks
        }] : [],
        ...menuLinks,
        ...fixedLinks
    ]

    return (
        <footer className="w-full pt-12 flex items-center justify-center">
            <div className="flex-1 px-4 border-t">
                <div className="grid gap-12 md:grid-cols-5 pt-12">
                    <div className="md:col-span-2 flex flex-col gap-4">
                        <SiteLogo enableDescription={true} />
                        <SocialLinks />
                    </div>

                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 md:col-span-3">
                        {links.map((link, index) => (
                            <div
                                key={index}
                                className="space-y-4 text-sm flex-1">
                                <span className="block font-medium">
                                    {link.key ? g(link.key) : link.label}
                                </span>
                                {link.items?.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        target={item.target}
                                        className="text-muted-foreground hover:text-primary block duration-150">
                                        <span className={cn(item.className)}>
                                            {item.key ? g(item.key) : item.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col pt-4">
                    <PageBadges />
                </div>
                <div className="flex flex-wrap items-end justify-center gap-6 py-4">
                    <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
                        {`© ${format(new Date(), "yyyy")} ${siteConfig.name}. ${t("allRightsReserved")}`}
                    </span>
                </div>
            </div>
        </footer>
    )
}