import { source } from '@/lib/source';
import {
    DocsBody,
    DocsDescription,
    DocsPage,
    DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import * as Twoslash from 'fumadocs-twoslash/ui';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Link from 'next/link';
import { constructMetadata } from '@/lib/seoutils';
import { getMessages } from 'next-intl/server';

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
            <DocsBody className="dark:prose-invert max-w-none w-full">
                <MDX components={getMDXComponents({
                    ...Twoslash,
                    a: ({ href, ...props }) => {
                        const found = source.getPageByHref(href ?? '', {
                            dir: page.file.dirname,
                        });

                        if (!found) return <Link href={href} {...props} />;

                        return (
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Link
                                        href={
                                            found.hash
                                                ? `${found.page.url}#${found.hash}`
                                                : found.page.url
                                        }
                                        {...props}
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent className="text-sm">
                                    <p className="font-medium">{found.page.data.title}</p>
                                    <p className="text-fd-muted-foreground">
                                        {found.page.data.description}
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                        );
                    },
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