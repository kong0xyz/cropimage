import { Menu } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/routing";
import { AuthGuard } from "../common/feature-guard";
import { UserNav } from "../auth/user-nav";
import LanguageSwitcher from "../LanguageSwitcher";
import { ThemeToggle } from "../theme-toggle";
import { SiteLogo } from "./site-logo";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
}

const Navbar = ({
  logo,
  menu,
  mobileExtraLinks,
}: NavbarProps) => {
  return (
    <section className="py-2">
      <div className="container">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <SiteLogo />
            <div className="flex items-center">
              <NavigationMenu viewport={false}>
                <NavigationMenuList>
                  {menu?.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <AuthGuard>
              <UserNav />
            </AuthGuard>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <SiteLogo />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Menu">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto transition-none">
                <SheetHeader>
                  <SheetTitle>
                    <SiteLogo />
                  </SheetTitle>
                </SheetHeader>
                <div className="my-2 mx-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu?.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                </div>
                <div className="flex flex-row gap-2 mx-4">
                  <AuthGuard>
                    <UserNav />
                  </AuthGuard>
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>

                <div className="border-t mx-4">
                  <div className="grid grid-cols-2 justify-start py-2">
                    {mobileExtraLinks?.map((link, idx) => (
                      <a
                        key={idx}
                        className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                        href={link.url}
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>

              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground">
        <NavigationMenuTrigger className="bg-transparent">
          <div className="flex items-center gap-2">
            {item.icon}
            <span className="font-semibold">{item.title}</span>
          </div>
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <div className="grid min-w-[200px] max-w-[400px] gap-1">
            {item.items.map((subItem) => (
              <div
                key={subItem.title}
                className="w-full"
              >
                <NavigationMenuLink asChild>
                  <Link href={subItem.url} className="gap-2 w-full">
                    <div className="flex flex-row items-center gap-2">
                      {subItem.icon}
                      <div className="font-medium">{subItem.title}</div>
                    </div>

                    {subItem.description && (
                      <div className="text-muted-foreground">{subItem.description}</div>
                    )}
                  </Link>
                </NavigationMenuLink>
              </div>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <Button
      variant="ghost"
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
      asChild
    >
      <div className="flex items-center gap-2">
        {item.icon}
        <Link href={item.url}>{item.title}</Link>
      </div>
    </Button>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 text-base font-semibold hover:no-underline">
          <div className="flex items-center gap-2">
            {item.icon}
            <span className="font-semibold">
              {item.title}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
              href={subItem.url}
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-2">
                  {subItem.icon}
                  <div className="font-semibold">{subItem.title}</div>
                </div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="font-semibold">
      <div className="flex items-center gap-2">
        {item.icon}
        <span className="font-semibold">
          {item.title}
        </span>
      </div>
    </Link>
  );
};

export { Navbar };
