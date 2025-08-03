import PageAdsenseScript from "@/components/page-adsense-script";
import { fontNotoSans, fontNotoSansSC, fontNotoSansJP, fontNotoSansKR } from "@/config/fonts";
import { locales } from "@/config/i18n";
import { constructMetadata } from "@/lib/seoutils";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import clsx from "clsx";
import { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from 'next/navigation';
import React from "react";
import { Toaster } from "sonner";

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
            <head>
                <PageAdsenseScript />
            </head>
            <body
                className={clsx(
                    "min-h-screen bg-background antialiased text-foreground",
                    fontNotoSans.className,
                    // 根据不同语言应用不同的字体
                    {
                        [fontNotoSansSC.className]: locale === 'zh',
                        [fontNotoSansJP.className]: locale === 'ja',
                        [fontNotoSansKR.className]: locale === 'ko'
                    }
                )}
            >
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {/* main content */}
                    {children}
                    {/* Toaster */}
                    <Toaster position="top-right" closeButton />
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
    return (
        <MainLayout locale={locale} messages={messages}>
            {children}
        </MainLayout>
    )
} 