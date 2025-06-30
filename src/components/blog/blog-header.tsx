import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight, BookOpen, Folder, Tag, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface BlogHeaderProps {
  postsCount: number;
  categoriesCount: number;
  tagsCount: number;
  locale: string;
}

interface CategoryHeaderProps {
  categoriesCount: number;
  locale: string;
}

interface TagHeaderProps {
  tagsCount: number;
  locale: string;
}

export function BlogHeader({ postsCount, categoriesCount, tagsCount, locale }: BlogHeaderProps) {
  const t = useTranslations('blog');

  return (
    <div className="blog-header bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* 主标题区域 */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {t('title')}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* 统计信息 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{postsCount}</div>
              <div className="text-sm text-muted-foreground">{t('articlesCount')}</div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Folder className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{categoriesCount}</div>
              <div className="text-sm text-muted-foreground">{t('categories')}</div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border">
              <div className="flex items-center justify-center mb-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Tag className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{tagsCount}</div>
              <div className="text-sm text-muted-foreground">{t('tags')}</div>
            </div>
          </div>

          {/* 快捷导航 */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" size="sm" asChild className="bg-background/80 backdrop-blur-sm">
              <Link href={`/blog/categories`}>
                <Folder className="w-4 h-4 mr-2" />
                {t('categories')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="bg-background/80 backdrop-blur-sm">
              <Link href={`/blog/tags`}>
                <Tag className="w-4 h-4 mr-2" />
                {t('tags')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="#featured">
                <TrendingUp className="w-4 h-4 mr-2" />
                {t('featured')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryHeader({ categoriesCount, locale }: CategoryHeaderProps) {
  const t = useTranslations('blog');
  const tCategory = useTranslations('blog.category');

  return (
    <div className="blog-header bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* 主标题区域 */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Folder className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {tCategory('allCategories')}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {tCategory('allCategoriesDescription', { count: categoriesCount })}
            </p>
          </div>

          {/* 快捷导航 */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" size="sm" asChild className="bg-background/80 backdrop-blur-sm">
              <Link href={`/blog`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('backToBlog')}
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="bg-background/80 backdrop-blur-sm">
              <Link href={`/blog/tags`}>
                <Tag className="w-4 h-4 mr-2" />
                {t('tags')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TagHeader({ tagsCount, locale }: TagHeaderProps) {
  const t = useTranslations('blog');
  const tTag = useTranslations('blog.tag');

  return (
    <div className="blog-header bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* 主标题区域 */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Tag className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {tTag('allTags')}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {tTag('allTagsDescription', { count: tagsCount })}
            </p>
          </div>

          {/* 快捷导航 */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" size="sm" asChild className="bg-background/80 backdrop-blur-sm">
              <Link href={`/blog`}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('backToBlog')}
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="bg-background/80 backdrop-blur-sm">
              <Link href={`/blog/categories`}>
                <Folder className="w-4 h-4 mr-2" />
                {t('categories')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 