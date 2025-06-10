import { Toaster } from "@/components/ui/sonner";
import { featureConfig } from "@/config/feature";
import { fontNotoSans } from "@/config/fonts";
import { clerkLocales, locales } from "@/config/i18n";
import { constructMetadata } from "@/lib/seoutils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from "next-intl/server";
import { cookies } from "next/headers";
import { notFound } from 'next/navigation';
import React from "react";

const GoogleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;

export async function generateMetadata(
    { params }: { params: Promise<{ locale: string }> }
): Promise<Metadata | undefined> {
    // const { locale } = await params;
    const t = await getTranslations('meta.global')

    return constructMetadata({
        title: t('title'),
        description: t('description'),
        keywords: t('keywords')?.split(','),
        pathname: ""
    });
}

const MainLayout = ({ children, locale, messages }: { children: React.ReactNode, locale: string, messages: any }) => {

    return (
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
    )

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
    if (!locales.includes(locale as never)) {
        notFound();
    }
    const messages = await getMessages();
    const cookieStore = await cookies();
    const theme = cookieStore.get("theme")?.value || "light";
    return (
        featureConfig.clerkEnabled ? (
            <ClerkProvider
                appearance={{
                    baseTheme: theme === "dark" ? [dark] : [],
                    signIn: theme === "dark" ? { baseTheme: dark } : {},
                    signUp: theme === 'dark' ? { baseTheme: dark } : {},
                    userButton: theme === 'dark' ? { baseTheme: dark } : {},
                    userProfile: theme === 'dark' ? { baseTheme: dark } : {}
                }}
                localization={clerkLocales[locale]}>
                <MainLayout locale={locale} messages={messages}>
                    {children}
                </MainLayout>
            </ClerkProvider>
        ) : (
            <MainLayout locale={locale} messages={messages}>
                {children}
            </MainLayout>
        )
    )
} 