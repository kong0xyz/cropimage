import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getTagsWithCount } from '@/lib/blog';
import { ArrowLeft, ArrowRight, FileText, Folder, Hash, Tag } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { TagHeader } from '@/components/blog/blog-header';

interface TagsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog.tag' });

  return {
    title: t('allTags'),
    description: t('allTagsDescription', { count: 0 }),
  };
}

export default async function TagsPage({ params }: TagsPageProps) {
  const { locale } = await params;
  const tagsWithCount = getTagsWithCount(locale);

  // 获取翻译
  const t = await getTranslations({ locale, namespace: 'blog' });
  const tTag = await getTranslations({ locale, namespace: 'blog.tag' });

  // 按文章数量排序
  const sortedTags = [...tagsWithCount].sort((a, b) => b.count - a.count);

  return (
    <div className="tags-page w-full bg-background">
      <TagHeader
        tagsCount={tagsWithCount.length}
        locale={locale}
      />

      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 py-12">
        {tagsWithCount.length > 0 ? (
          <div>
            {/* 所有标签网格 */}
            <section>
              <div className="flex justify-center">
                <div className={`grid gap-4 ${sortedTags.length === 1 ? 'grid-cols-1 max-w-xs' :
                  sortedTags.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-xl' :
                    sortedTags.length === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-3xl' :
                      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl'
                  } w-full`}>
                  {sortedTags.map((tag) => (
                    <Link
                      key={tag.name}
                      href={`/${locale}/blog/tag/${encodeURIComponent(tag.name)}`}
                      className="block group"
                    >
                      <Card className="h-full border hover:border-primary/50 hover:shadow-sm transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Hash className="w-4 h-4 text-primary" />
                              <span className="font-medium group-hover:text-primary transition-colors">
                                {tag.name}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {tag.count}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : (
          <Card className="bg-gradient-to-br from-muted/30 to-muted/10 border-dashed border-2">
            <CardContent className="p-16 text-center">
              <div className="inline-flex items-center justify-center p-6 bg-muted/50 rounded-full mb-6">
                <Tag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{tTag('noTagsTitle')}</h3>
              <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                {tTag('noTagsDescription')}
              </p>
              <Button asChild size="lg">
                <Link href={`/${locale}/blog`}>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t('backToBlog')}
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 