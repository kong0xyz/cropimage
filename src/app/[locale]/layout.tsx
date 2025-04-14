import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { fontNotoSans } from "@/config/fonts";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { constructMetadata } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import SystemMonitor from "@/components/system/Monitor";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from "next-intl/server";

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

  return (
    // <ClerkProvider>
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
                <Navbar />
                {/* main */}
                <main className="flex-1 container mx-auto max-w-7xl pt-6 px-6 flex-grow">
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
    // </ClerkProvider>
  );
}
