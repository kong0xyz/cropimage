'use client'
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { format } from "date-fns";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeSwitch } from "./theme-switch";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center py-3">
      <div className="container flex flex-col items-center justify-between gap-4 border-t pt-4 text-center md:flex-row">
        <p className="text-sm text-muted-foreground">
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
          <LanguageSwitcher />
          <ThemeSwitch />
        </nav>
      </div>

      {/* <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
        title="nextui.org homepage"
      >
        <span className="text-default-600">Powered by</span>
        <p className="text-primary">NextUI</p>
      </Link>
      <Link
        isExternal
        aria-label="Twitter"
        href={siteConfig.links.twitter}
      >
        <TwitterIcon className="text-default-500" />
      </Link>
      <Link
        isExternal
        aria-label="Discord"
        href={siteConfig.links.discord}
      >
        <DiscordIcon className="text-default-500" />
      </Link>
      <Link
        isExternal
        aria-label="Github"
        href={siteConfig.links.github}
      >
        <GithubIcon className="text-default-500" />
      </Link> */}
    </footer>
  );
};
