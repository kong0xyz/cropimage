import Link from 'next/link';
import { Folder, Tag, Hash, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTranslations } from 'next-intl';

interface BlogSidebarProps {
  categories: Array<{ name: string; count: number }>;
  tags: Array<{ name: string; count: number }>;
  locale: string;
}

export function BlogSidebar({ categories, tags, locale }: BlogSidebarProps) {
  const t = useTranslations('blog');

  return (
    <div className="blog-sidebar space-y-6">
      {/* 分类列表 */}
      {categories.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Folder className="w-5 h-5 mr-2 text-primary" />
              {t('categories')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {categories.slice(0, 8).map((category) => (
                <Link
                  key={category.name}
                  href={`/${locale}/blog/category/${encodeURIComponent(category.name)}`}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 group"
                >
                  <span className="text-sm group-hover:text-primary transition-colors">
                    {category.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Link>
              ))}
              {/* 始终显示查看全部分类链接 */}
              <Link
                href={`/${locale}/blog/categories`}
                className="flex items-center justify-center p-2 text-sm text-primary hover:bg-primary/5 rounded-lg"
              >
                {t('viewAllCategories')} →
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 热门标签 */}
      {tags.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Tag className="w-5 h-5 mr-2 text-primary" />
              {t('hotTags')}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 12).map((tag) => (
                <Link
                  key={tag.name}
                  href={`/${locale}/blog/tag/${encodeURIComponent(tag.name)}`}
                  className="group"
                >
                  <Badge
                    variant="outline"
                    className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    <Hash className="w-2.5 h-2.5 mr-1" />
                    {tag.name}
                    <span className="ml-1 opacity-60">({tag.count})</span>
                  </Badge>
                </Link>
              ))}
            </div>
            {/* 始终显示查看所有标签链接 */}
            <Link
              href={`/${locale}/blog/tags`}
              className="flex items-center justify-center p-2 mt-3 text-sm text-primary hover:bg-primary/5 rounded-lg"
            >
              {t('viewAllTags')} →
            </Link>
          </CardContent>
        </Card>
      )}

      {/* 快捷链接 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            {t('quickNavigation')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <Link
              href={`/${locale}/blog/categories`}
              className="flex items-center p-2 rounded-lg hover:bg-muted/50 text-sm group"
            >
              <Folder className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary" />
              <span className="group-hover:text-primary transition-colors">
                {t('allCategories')}
              </span>
            </Link>
            <Link
              href={`/${locale}/blog/tags`}
              className="flex items-center p-2 rounded-lg hover:bg-muted/50 text-sm group"
            >
              <Tag className="w-4 h-4 mr-2 text-muted-foreground group-hover:text-primary" />
              <span className="group-hover:text-primary transition-colors">
                {t('allTags')}
              </span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 