"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { NavItem, siteConfig, featureSettings } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";
import { EndUser } from "./end-user";
import Image from "next/image";
import React from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Button } from "@heroui/button";
import { Icon, Rocket } from "lucide-react";

const itemLink = (item: NavItem) => {
  return (
    <Link
      className="data-[active=true]:text-primary"
      title={item.label}
      href={item.href}
    >
      {item.label}
    </Link>
  );
};

export const Navbar = () => {
  const pathname = usePathname();

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
          {/* <EndUser /> */}
        </NavbarItem>
        {featureSettings.submissionEnabled && (
          <NavbarItem className="flex items-center">
            <Button variant="solid" color="primary" size="md" as={Link} href="/submit">
              <Rocket className="w-4 h-4" />
              Submit
            </Button>
          </NavbarItem>
        )}
        <NavbarItem className="hidden md:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Setting Mobile */}
      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <NavbarItem className="flex items-center">
          {featureSettings.submissionEnabled && (
            <Button variant="solid" color="primary" size="md" as={Link} href="/submit">
              <Rocket className="w-4 h-4" />
              Submit
            </Button>
          )}
        </NavbarItem>
        {/* <EndUser /> */}
        <NavbarItem className="flex items-center">
          <ThemeSwitch />
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
