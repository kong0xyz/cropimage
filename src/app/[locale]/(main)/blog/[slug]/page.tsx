import { Button } from "@/components/ui/button";
import { blogSource } from "@/lib/source";
import { DocsBody } from "fumadocs-ui/page";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";

import { AuthorCard } from "@/components/blog/author-card";
import { HashScrollHandler } from "@/components/blog/hash-scroll-handler";
import { MobileTableOfContents } from "@/components/blog/mobile-toc";
import { PromoContent } from "@/components/blog/promo-content";
import { ReadMoreSection } from "@/components/blog/read-more-section";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { getAuthor, isValidAuthor } from "@/lib/authors";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    if (!slug || slug.length === 0) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const page = blogSource.getPage([slug]);

    if (!page) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const ogUrl = `${siteConfig.url}/blog/${slug}`;
    const ogImage = `${ogUrl}/opengraph-image`;

    return {
      title: page.data.title,
      description: page.data.description,
      keywords: [page.data.title, ...(page.data.tags || siteConfig.keywords)],
      authors: [
        {
          name: page.data.author || `${siteConfig.name}`,
          url: siteConfig.url,
        },
      ],
      creator: page.data.author || `${siteConfig.name}`,
      publisher: `${siteConfig.name}`,
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: page.data.title,
        description: page.data.description,
        type: "article",
        url: ogUrl,
        publishedTime: page.data.date,
        authors: [page.data.author || `${siteConfig.name}`],
        tags: page.data.tags,
        images: [
          {
            url: page.data.thumbnail || ogImage,
            width: 1200,
            height: 630,
            alt: page.data.title,
          },
        ],
        siteName: siteConfig.name,
      },
      twitter: {
        card: "summary_large_image",
        title: page.data.title,
        description: page.data.description,
        images: [page.data.thumbnail || ogImage],
        creator: `@${siteConfig.author.name}`,
        site: `@${siteConfig.author.name}`,
      },
      alternates: {
        canonical: ogUrl,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const page = blogSource.getPage([slug]);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;
  const date = new Date(page.data.date);
  const formattedDate = formatDate(date);

  return (
    <div className="flex flex-col flex-1 px-4 min-h-screen bg-background relative">
      <HashScrollHandler />
      <div className="absolute top-0 left-0 z-0 w-full h-50 mask-[linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      <div className="space-y-4 border-b border-border relative z-10">
        <div className="container mx-auto flex flex-col gap-6 py-6">
          <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
            <Button variant="outline" asChild className="h-6 w-6">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Back to all articles</span>
              </Link>
            </Button>
            {page.data.tags && page.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 text-muted-foreground">
                {page.data.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="h-6 w-fit px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <time className="font-medium text-muted-foreground">
              {formattedDate}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-balance">
            {page.data.title}
          </h1>

          {page.data.description && (
            // <p className="text-muted-foreground max-w-4xl md:text-lg md:text-balance">
            <p className="text-muted-foreground md:text-lg">
              {page.data.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex lg:divide-x lg:divide-border relative container mx-auto px-4 md:px-0 z-10">
        <div className="absolute container mx-auto left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] lg:w-full h-full border-x border-border p-0 pointer-events-none" />
        <main className="w-full p-0 overflow-hidden">
          {page.data.thumbnail && (
            <div className="relative w-full h-125 overflow-hidden object-cover border border-transparent">
              <Image
                src={page.data.thumbnail}
                alt={page.data.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="p-6 lg:p-10">
            <div className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-8 prose-headings:font-semibold prose-a:no-underline prose-headings:tracking-tight prose-headings:text-balance prose-p:tracking-tight prose-p:text-balance prose-lg">
              <DocsBody>
                <MDX />
              </DocsBody>
            </div>
          </div>
          <div className="mt-10">
            <ReadMoreSection
              currentSlug={[slug]}
              currentTags={page.data.tags}
            />
          </div>
        </main>

        <aside className="hidden lg:block w-87.5 shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
          <div className="sticky top-20 space-y-8">
            {page.data.author && isValidAuthor(page.data.author) && (
              <AuthorCard author={getAuthor(page.data.author)} />
            )}
            <div className="border border-border rounded-lg p-6 bg-card">
              <TableOfContents />
            </div>
            <PromoContent variant="desktop" />
          </div>
        </aside>
      </div>

      <MobileTableOfContents />
    </div>
  );
}
