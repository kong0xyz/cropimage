import Link from "next/link";
import { Suspense } from "react";

import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateComponent from "./date";
import MoreStories from "./more-stories";

import { PageHeader } from "@/components/page-header";
import { sanityFetch } from "@/sanity/lib/fetch";
import { heroQuery } from "@/sanity/lib/queries";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";

function HeroPost({
  title,
  slug,
  excerpt,
  coverImage,
  date,
  author,
}: Readonly<
  Pick<
    {
      title: string;
      coverImage: any;
      date: string;
      excerpt: string;
      author: any;
      slug: string;
    },
    "title" | "coverImage" | "date" | "excerpt" | "author" | "slug"
  >
>) {
  return (
    <article>
      <Link className="group mb-8 block md:mb-16" href={`/blog/posts/${slug}`}>
        <CoverImage image={coverImage} priority />
      </Link>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="text-pretty mb-4 text-4xl leading-tight lg:text-6xl">
            <Link href={`/blog/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <DateComponent dateString={date} />
          </div>
        </div>
        <div>
          {excerpt && (
            <p className="text-pretty mb-4 text-lg leading-relaxed">
              {excerpt}
            </p>
          )}
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </article>
  );
}

export async function generateMetadata(): Promise<Metadata | undefined> {
  return constructMetadata({
    title: `Blog - ${siteConfig.title}`,
    description: `Latest news articles`,
  });
}

export default async function Page() {
  const [heroPost] = await Promise.all([sanityFetch({ query: heroQuery })]);

  return (
    <div className="container mx-auto px-5">
      <PageHeader header="Blog" title="Latest news articles" />

      {heroPost && (
        <HeroPost
          title={heroPost.title}
          slug={heroPost.slug}
          coverImage={heroPost.coverImage}
          excerpt={heroPost.excerpt}
          date={heroPost.date}
          author={heroPost.author}
        />
      )}

      {heroPost?._id && (
        <aside>
          <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
            More Stories
          </h2>
          <Suspense>
            <MoreStories skip={heroPost._id} limit={10} />
          </Suspense>
        </aside>
      )}
    </div>
  );
}
