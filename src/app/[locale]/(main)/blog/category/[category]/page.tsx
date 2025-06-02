import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, Folder } from 'lucide-react';
import { getPaginatedPostsByCategory, getAllCategories } from '@/lib/blog';
import { BlogCard } from '@/components/blog/blog-card';
import { Pagination } from '@/components/blog/pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { locales } from '@/config/i18n';

interface CategoryPageProps {
  params: Promise<{ locale: string; category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const params = [];

  for (const locale of locales) {
    for (const category of categories) {
      params.push({
        locale,
        category: encodeURIComponent(category),
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryName = decodeURIComponent(category);

  return {
    title: `分类: ${categoryName}`,
    description: `浏览 ${categoryName} 分类下的所有文章`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { locale, category } = await params;
  const categoryName = decodeURIComponent(category);
  const { page } = await searchParams;
  const pageNumber = Number(page) || 1;
  const pageSize = 12;

  const paginatedPosts = getPaginatedPostsByCategory(categoryName, pageNumber, pageSize);

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
          <Folder className="w-6 h-6 text-primary" />
          <h1 className="text-4xl font-bold">分类: {categoryName}</h1>
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
              baseUrl={`/blog/category/${categoryName}`}
              locale={locale}
            />
          </>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">暂无文章</h3>
              <p className="text-muted-foreground">
                这个分类下还没有任何文章。
              </p>
            </CardContent>
          </Card>
        )}
      </Suspense>
    </div>
  );
} 