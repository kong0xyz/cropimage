import { source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { DocsBody } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

export function MDXFumadocs({
    slugs,
    locale,
}: Readonly<{
    slugs: string[];
    locale: string;
}>) {
    const page = source.getPage(slugs, locale);
    if (!page) notFound();

    const MDX = page.data.body;

    return <DocsBody className="dark:prose-invert max-w-none w-full">
        <MDX components={getMDXComponents()} />
    </DocsBody>;

}