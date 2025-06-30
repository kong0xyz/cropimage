import { Metadata } from 'next';
import { ArrowLeft, Tag, ChevronRight } from 'lucide-react';
import { getPostsByTag, getCategoriesWithCount, getTagsWithCount, BlogPost } from '@/lib/blog';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { locales } from '@/config/i18n';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

interface TagPageProps {
  params: Promise<{ locale: string; tag: string }>;
}

export async function generateStaticParams() {
  const tags = getTagsWithCount();
  const params = [];

  for (const locale of locales) {
    for (const tag of tags) {
      params.push({
        locale,
        tag: encodeURIComponent(tag.name),
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag, locale } = await params;
  const tagName = decodeURIComponent(tag);
  const t = await getTranslations({ locale, namespace: 'blog.tag' });

  return {
    title: `${t('title')}: ${tagName}`,
    description: t('articlesWithTag', { count: 0 }),
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { locale, tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const posts = getPostsByTag(decodedTag, locale);
  const allCategories = getCategoriesWithCount(locale);
  const allTags = getTagsWithCount(locale);

  const t = await getTranslations('blog');

  return (
    <div className="blog-container container mx-auto px-4 py-8">
      {/* 页面头部 */}
      <div className="mb-8">
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
          <Link href={`/blog`} className="hover:text-foreground">
            {t('title')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/blog/tags`} className="hover:text-foreground">
            {t('tags')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">#{decodedTag}</span>
        </nav>

        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Tag className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">#{decodedTag}</h1>
            <p className="text-muted-foreground mt-1">
              {t('tag.articlesWithTag', { count: posts.length })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* 主内容区 */}
        <div className="xl:col-span-3">
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {posts.map((post: BlogPost) => (
                <BlogCard
                  key={post.slug.join('/')}
                  post={{
                    slug: post.slug,
                    title: post.title,
                    description: post.description || '',
                    date: post.date,
                    author: post.author || 'Anonymous',
                    category: post.category || 'Uncategorized',
                    tags: post.tags || [],
                    image: post.image,
                    readingTime: post.readingTime || 5,
                    url: post.url,
                    featured: post.featured,
                    draft: post.draft
                  }}
                  locale={locale}
                  className="h-full"
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Tag className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {t('tag.noTagsTitle')}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('noResults.tag')}
                </p>
                <Button asChild>
                  <Link href={`/blog`}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t('backToBlog')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 侧边栏 */}
        <div className="xl:col-span-1">
          <div className="sticky top-8">
            <BlogSidebar
              categories={allCategories}
              tags={allTags}
              locale={locale}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 