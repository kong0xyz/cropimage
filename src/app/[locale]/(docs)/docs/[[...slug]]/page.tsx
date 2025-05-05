import { source } from '@/lib/source';
import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';

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
            <DocsBody className="dark:prose-invert">
                <MDX components={getMDXComponents()} />
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

    return {
        title: page.data.title,
        description: page.data.description,
    };
}