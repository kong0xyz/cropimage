import SocialLinks from "@/components/social-links";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/routing";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import NextLink from "next/link";

export const FooterLine = () => {
  const t = useTranslations("footer");
  return (
    <div className="container mx-auto flex items-center justify-between gap-4 text-center flex-col-reverse lg:flex-row p-4">
      <p className="flex-1  text-start text-sm text-muted-foreground">
        {`© ${format(new Date(), "yyyy")} ${siteConfig.name}. ${t("allRightsReserved")}`}
      </p>
      <nav className="flex gap-4 text-sm text-muted-foreground items-center flex-wrap justify-center">
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
        <Link
          className="text-sm text-muted-foreground"
          aria-label="Cookie Policy"
          title="Cookie Policy"
          href="/cookie"
        >
          {t("cookie")}
        </Link>
        <Link
          className="text-sm text-muted-foreground"
          aria-label="Payments & Refunds Policy"
          title="Payments & Refunds Policy"
          href="/payment"
        >
          {t("payment")}
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
        <Separator
          orientation="vertical"
          className="lg:block hidden data-[orientation=vertical]:h-4"
        />
        {/* social links */}
        <SocialLinks />
      </div>
    </div>
  );
};
