import { BlogCard } from "@/components/blog/blog-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { constructMetadata } from "@/lib/seoutils";
import { blogSource } from "@/lib/source";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

interface BlogData {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  author?: string;
  authorImage?: string;
  thumbnail?: string;
}

interface BlogPage {
  url: string;
  data: BlogData;
}

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const allPages = blogSource.getPages() as BlogPage[];
const sortedBlogs = allPages.sort((a, b) => {
  const dateA = new Date(a.data.date).getTime();
  const dateB = new Date(b.data.date).getTime();
  return dateB - dateA;
});
const allTags = [
  "All",
  ...Array.from(
    new Set(sortedBlogs.flatMap((blog) => blog.data.tags || []))
  ).sort(),
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata | undefined> {
  const t = await getTranslations("meta.blog");
  return constructMetadata({
    title: t("title"),
    description: t("description"),
    pathname: "/blog",
    keywords: allTags.filter((tag) => tag !== "All"),
  });
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations("blog");

  const selectedTag = resolvedSearchParams.tag || "All";
  const filteredBlogs =
    selectedTag === "All"
      ? sortedBlogs
      : sortedBlogs.filter((blog) => blog.data.tags?.includes(selectedTag));

  const tagCounts = allTags.reduce(
    (acc, tag) => {
      if (tag === "All") {
        acc[tag] = sortedBlogs.length;
      } else {
        acc[tag] = sortedBlogs.filter((blog) =>
          blog.data.tags?.includes(tag)
        ).length;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-background relative">
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
      <div className="p-6 border-b border-border flex flex-col gap-6 min-h-62.5 justify-center relative z-10">
        <div className="container mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              {t("title")}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              {t("description")}
            </p>
          </div>
        </div>
        {allTags.length > 0 && (
          <div className="container mx-auto w-full">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          </div>
        )}
      </div>

      <div className="container mx-auto w-full px-6 lg:px-0">
        <Suspense fallback={<div>Loading articles...</div>}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden py-4 gap-4">
            {filteredBlogs.map((blog) => {
              const date = new Date(blog.data.date);
              const formattedDate = formatDate(date);

              return (
                <BlogCard
                  key={blog.url}
                  url={blog.url}
                  title={blog.data.title}
                  description={blog.data.description}
                  date={formattedDate}
                  thumbnail={blog.data.thumbnail}
                />
              );
            })}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
