import { constructMetadata } from '@/lib/seoutils';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
} from 'fumadocs-ui/page';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function Page(props: {
    params: Promise<{ locale: string, slug?: string[] }>;
}) {
    const { locale, slug } = await props.params;
    const page = source.getPage(slug, locale);
    if (!page) notFound();

    const MDX = page.data.body;

    return (
        <DocsPage tableOfContent={{
            style: 'clerk'
        }} toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody className="max-w-none w-full">
                <MDX components={getMDXComponents({
                    a: createRelativeLink(source, page)
                })} />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return source.generateParams('slug', 'locale');
}

export async function generateMetadata(props: {
    params: Promise<{ locale: string, slug?: string[] }>;
}) {
    const { locale, slug } = await props.params;
    const page = source.getPage(slug, locale);
    if (!page) notFound();

    const meta = await getMessages({ locale });
    return constructMetadata({
        title: `${page.data.title}`,
        description: page.data.description || meta.meta.docs.description,
        pathname: slug ? `/docs/${slug?.join('/')}` : '/docs'
    });
}