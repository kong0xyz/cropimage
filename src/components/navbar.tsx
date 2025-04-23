"use client";

import { ThemeSwitch } from "@/components/theme-switch";
import { featureSettings, NavItem, siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@heroui/navbar";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Rocket } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { EndUser } from "./end-user";
import LanguageSwitcher from "./LanguageSwitcher";

export const Navbar = () => {
  const pathname = usePathname();
  const t = useTranslations();

  const itemLink = (item: NavItem) => {
    return (
      <Link
        className="data-[active=true]:text-primary"
        title={t(item.key)}
        href={item.href}
      >
        {t(item.key)}
      </Link>
    );
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleIcon = () => {
    return isMenuOpen ? <IconX /> : <IconMenu2 />;
  };

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "font-medium",
          "data-[active=true]:text-primary ",
          "data-[active=true]:font-bold",
        ],
        menuItem: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "font-medium",
          "data-[active=true]:text-primary ",
          "data-[active=true]:font-bold",
        ],
      }}
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {/* Brand */}
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-2"
            title={siteConfig.name}
            href="/"
          >
            {/* <Logo /> */}
            <Image
              src={"/logo.png"}
              width={32}
              height={32}
              alt="Site Logo"
              className="rounded-md"
              priority
            />
            <p className="font-bold text-inherit text-xl">{siteConfig.name}</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {/* Menu */}
      <NavbarContent
        className="hidden md:flex gap-4 justify-center ml-2"
        justify="center"
      >
        {siteConfig?.navItems?.map((item: NavItem) => (
          <NavbarItem
            key={item?.href}
            isActive={
              item.href === "/"
                ? pathname === "/" // 首页精确匹配
                : pathname.startsWith(item.href) // 其他页面前缀匹配
            }
          >
            {itemLink(item)}
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Setting */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-2">
          <EndUser />
        </NavbarItem>
        {featureSettings.submissionEnabled && (
          <NavbarItem className="flex items-center">
            <Button color="primary" asChild>
              <Link href="/submit">
                <Rocket className="w-4 h-4" />
                Submit
              </Link>
            </Button>
          </NavbarItem>
        )}
        <NavbarItem className="hidden md:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="hidden md:flex gap-2">
          <LanguageSwitcher />
        </NavbarItem>
      </NavbarContent>

      {/* Setting Mobile */}
      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <NavbarItem className="flex items-center">
          {featureSettings.submissionEnabled && (
            <Button color="primary" asChild>
              <Link href="/submit">
                <Rocket className="w-4 h-4" />
                Submit
              </Link>
            </Button>
          )}
        </NavbarItem>
        <EndUser />
        <NavbarItem className="flex items-center">
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem className="flex items-center">
          <LanguageSwitcher />
        </NavbarItem>
        {siteConfig?.navItems?.length > 0 && (
          <NavbarItem>
            <NavbarMenuToggle
              icon={toggleIcon}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </NavbarItem>
        )}
      </NavbarContent>

      {/* Menu for Mobile */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig?.navItems?.map((item: NavItem, index) => (
            <NavbarMenuItem
              onClick={() => setIsMenuOpen(false)}
              key={`${item.href}-${index}`}
              isActive={
                item.href === "/"
                  ? pathname === "/" // 首页精确匹配
                  : pathname.startsWith(item.href) // 其他页面前缀匹配
              }
            >
              {itemLink(item)}
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
