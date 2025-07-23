'use client'
import { getStaticMenu } from "@/config/menu";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Navbar } from "./blocks/navbar";
import { cn } from "@/lib/utils";
import { featureConfig } from "@/config/site";

export const Header = () => {

    const t = useTranslations();

    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const staticMenu = getStaticMenu();

    const menuData = {
        logo: staticMenu.logo,
        menu: staticMenu.menu.map((item) => ({
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
        mobileExtraLinks: staticMenu.mobileExtraLinks.map((link) => ({
            name: t(link.key) || link.label,
            url: link.href,
        })),
    };

    return (
        <header className={
            cn(
                featureConfig.headerSticky && "sticky top-0 z-50",
                "w-full mx-auto backdrop-blur supports-[backdrop-filter]:bg-background/90",
                isScrolled && "bg-background/80 border-b border-border")}>
            <Navbar {...menuData} />
        </header>
    )
}