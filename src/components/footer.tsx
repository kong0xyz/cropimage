'use client'
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { Link } from "@/i18n/routing";
import { format } from "date-fns";
import NextLink from "next/link";
import SocialLinks from "./social-links";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <div className="container flex items-center justify-between gap-4 border-t pt-4 text-center flex-col-reverse md:flex-row">
        <p className="flex-1  text-start text-sm text-muted-foreground">
          {`© ${format(new Date(), "yyyy")} ${siteConfig.name}. All rights reserved.`}
        </p>
        <nav className="flex gap-4 text-sm text-muted-foreground items-center">
          <Link
            className="text-sm text-muted-foreground"
            aria-label="About"
            title="About"
            href="/about"
            rel=""
          >
            About
          </Link>
          <Link
            className="text-sm text-muted-foreground"
            aria-label="Privacy Policy"
            title="Privacy Policy"
            href="/privacy"
          >
            Privacy Policy
          </Link>
          <Link
            className="text-sm text-muted-foreground"
            aria-label="Terms of Service"
            title="Terms of Service"
            href="/terms"
          >
            Terms of Service
          </Link>
          <NextLink
            className="text-sm text-muted-foreground after:content-['↗'] after:ml-1"
            aria-label="Sitemap"
            title="Sitemap"
            href="/sitemap.xml"
            target="_blank"
            rel="sitemap"
          >
            Sitemap
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
    </footer>
  );
};
