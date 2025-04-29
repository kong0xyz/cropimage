import { baseOptions } from '@/app/layout.config';
import { localeNames } from '@/config/i18n';
import { fumadocsExcludeLocales } from '@/config/i18n';
import { source } from '@/lib/source';
import "@/styles/globals.css";
import { Translations } from 'fumadocs-ui/contexts/i18n';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { RootProvider } from 'fumadocs-ui/provider';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

export default async function Layout({ params, children }: { params: Promise<{ locale: string }>; children: ReactNode }) {
    const { locale } = await params;
    const t = await getTranslations("docs.translations");

    const translations: Partial<Translations> = {
        search: t('search'),
        searchNoResult: t('searchNoResult'),
        toc: t('toc'),
        tocNoHeadings: t('tocNoHeadings'),
        lastUpdate: t('lastUpdate'),
        chooseLanguage: t('chooseLanguage'),
        nextPage: t('nextPage'),
        previousPage: t('previousPage'),
        chooseTheme: t('chooseTheme'),
        editOnGithub: t('editOnGithub'),
    };

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}
            >
                <RootProvider
                    i18n={{
                        locale: locale,
                        locales: Object.entries(localeNames).filter(([locale]) => !fumadocsExcludeLocales.includes(locale)).map(([locale, name]) => ({ locale, name })),
                        translations: translations
                    }}>
                    <DocsLayout tree={source.pageTree[locale]} {...baseOptions(locale)}>
                        {children}
                    </DocsLayout>
                </RootProvider>
            </body>
        </html>
    );
}