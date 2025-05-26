'use client'
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/routing";
import { format } from "date-fns";
import NextLink from "next/link";
import SocialLinks from "./social-links";
import { useTranslations } from "next-intl";
import { PageBadges } from "./page-badges";
import SocialShares from "./social-shares";

export const Footer = () => {
  const t = useTranslations("footer");
  return (
    <footer className="w-full flex items-center justify-center py-3 flex-col gap-4">
      <SocialShares />
      <div className="container flex items-center justify-between gap-4 border-t pt-4 text-center flex-col-reverse md:flex-row">
        <p className="flex-1  text-start text-sm text-muted-foreground">
          {`© ${format(new Date(), "yyyy")} ${siteConfig.name}. ${t("allRightsReserved")}`}
        </p>
        <nav className="flex gap-4 text-sm text-muted-foreground items-center">
          <Link
            className="text-sm text-muted-foreground"
            aria-label="About"
            title="About"
            href="/about"
            rel=""
          >
            {t("about")}
          </Link>
          <Link
            className="text-sm text-muted-foreground"
            aria-label="Privacy Policy"
            title="Privacy Policy"
            href="/privacy"
          >
            {t("privacy")}
          </Link>
          <Link
            className="text-sm text-muted-foreground"
            aria-label="Terms of Service"
            title="Terms of Service"
            href="/terms"
          >
            {t("terms")}
          </Link>
          <NextLink
            className="text-sm text-muted-foreground after:content-['↗'] after:ml-1"
            aria-label="Sitemap"
            title="Sitemap"
            href="/sitemap.xml"
            target="_blank"
            rel="sitemap"
          >
            {t("sitemap")}
          </NextLink>
        </nav>
        <div className="flex flex-row items-center gap-2">
          {/* <LanguageSwitcher /> */}
          {/* <ThemeSwitch /> */}
          <Separator orientation="vertical" className="md:block hidden data-[orientation=vertical]:h-4" />
          {/* social links */}
          <SocialLinks />
        </div>
      </div>
      <PageBadges />
    </footer>
  );
};
