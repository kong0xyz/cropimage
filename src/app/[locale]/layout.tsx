import { fontNotoSans } from "@/config/fonts";
import { clerkLocales, Locale } from "@/config/i18n";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import { getMessages } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from 'next/navigation';
import React from "react";
import { NextIntlClientProvider } from 'next-intl';
import { routing } from "@/i18n/routing";
import { constructMetadata } from "@/lib/seoutils";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

const GoogleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;

export async function generateMetadata(): Promise<Metadata | undefined> {
    return constructMetadata({
        pathname: ""
    });
}

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
                        {/* main content */}
                        {children}
                        {/* Toaster */}
                        <Toaster />
                        {/* Google Analytics */}
                        {GoogleAnalyticsId && <GoogleAnalytics gaId={GoogleAnalyticsId} />}
                        {/* Speed Insights */}
                        <SpeedInsights />
                        <VercelAnalytics />
                    </NextIntlClientProvider>
                </body>
            </html>
        </ClerkProvider>
    );
} 