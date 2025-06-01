import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Tag } from 'lucide-react';
import { getPaginatedPostsByTag, getAllTags } from '@/lib/blog';
import { BlogCard } from '@/components/blog/blog-card';
import { Pagination } from '@/components/blog/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TagPageProps {
  params: Promise<{ locale: string; tag: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const tagName = decodeURIComponent(tag);

  return {
    title: `标签: ${tagName}`,
    description: `浏览标有 ${tagName} 的所有文章`,
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { locale, tag } = await params;
  const tagName = decodeURIComponent(tag);
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;
  const pageSize = 12;

  const paginatedPosts = getPaginatedPostsByTag(tagName, pageNumber, pageSize);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/${locale}/blog`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回博客
          </Link>
        </Button>
      </div>

      {/* 页面标题 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-6 h-6 text-primary" />
          <h1 className="text-4xl font-bold">标签: {tag}</h1>
        </div>
        <p className="text-xl text-muted-foreground">
          共找到 {paginatedPosts.total} 篇文章
        </p>
      </div>

      {/* 文章列表 */}
      <Suspense fallback={<div>加载中...</div>}>
        {paginatedPosts.posts.length > 0 ? (
          <>
            <div className="grid gap-6 lg:grid-cols-2 mb-8">
              {paginatedPosts.posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  locale={locale}
                />
              ))}
            </div>

            <Pagination
              data={paginatedPosts}
              baseUrl={`/blog/tag/${tag}`}
              locale={locale}
            />
          </>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">暂无文章</h3>
              <p className="text-muted-foreground">
                这个标签下还没有任何文章。
              </p>
            </CardContent>
          </Card>
        )}
      </Suspense>
    </div>
  );
} 