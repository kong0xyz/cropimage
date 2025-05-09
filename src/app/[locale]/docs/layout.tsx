import { baseOptions } from '@/app/layout.config';
import { localeNames, fumadocsExcludeLocales } from '@/config/i18n';
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
        <div className="flex flex-col min-h-screen mx-auto">
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
        </div>
    );
}