import { Footer } from "@/components/footer";
import { LayoutNavbar } from "@/components/layout-navbar";
import SystemMonitor from "@/components/system/Monitor";
import { TooltipProvider } from "@/components/ui/tooltip";
import { fontNotoSans } from "@/config/fonts";
import { clerkLocales, Locale } from "@/config/i18n.config";
import { routing } from '@/i18n/routing';
import { constructMetadata } from "@/lib/utils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from 'next/navigation';
import { Providers } from "./providers";

const GoogleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata();
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) {
    notFound();
  }
  const messages = await getMessages();
  // const { theme } = await useTheme();
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";

  return (
    <ClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? [dark] : [],
        signIn: theme === "dark" ? { baseTheme: dark } : {},
        signUp: theme === 'dark' ? { baseTheme: dark } : {},
        userButton: theme === 'dark' ? { baseTheme: dark } : {},
        userProfile: theme === 'dark' ? { baseTheme: dark } : {}
      }}
      localization={clerkLocales[locale as Locale]}>
      <html suppressHydrationWarning lang={locale}>
        <head />
        <body
          className={clsx(
            "min-h-screen bg-background antialiased text-foreground",
            fontNotoSans.className
          )}
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TooltipProvider>
              <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                {/*  */}
                <div className="min-h-screen flex flex-col">
                  {/* header */}
                  {/* <Navbar /> */}
                  <header className="px-4 sticky top-0 z-50 container mx-auto bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
                    <LayoutNavbar />
                  </header>
                  {/* main */}
                  <main className="flex-1 container mx-auto pt-6 px-6 grow">
                    {children}
                  </main>
                  {/* footer */}
                  <Footer />
                </div>
              </Providers>
            </TooltipProvider>
            {/* Google */}
            {GoogleAnalyticsId && <GoogleAnalytics gaId={GoogleAnalyticsId} />}
            {/* Umami */}
            <SystemMonitor />
            {/* Speed Insights */}
            <SpeedInsights />
            <Analytics />
          </NextIntlClientProvider>
        </body>
      </html >
    </ClerkProvider>
  );
}
