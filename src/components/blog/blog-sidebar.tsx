import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BlogPost } from '@/lib/blog';
import { ArrowRight, Calendar, Folder, Tag, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

interface BlogSidebarProps {
  recentPosts: BlogPost[];
  categories: string[];
  tags: string[];
  locale: string;
}

export function BlogSidebar({ recentPosts, categories, tags, locale }: Readonly<BlogSidebarProps>) {
  return (
    <div className="space-y-6">
      {/* 最近文章 */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="w-5 h-5 text-primary" />
            最近文章
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentPosts.map((post, index) => (
            <div key={post.slug}>
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="group block hover:bg-muted/50 p-2 rounded-md transition-colors duration-200"
              >
                <h4 className="font-medium text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2 mb-1">
                  {post.title}
                </h4>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </Link>
              {index < recentPosts.length - 1 && (
                <Separator className="mt-3" />
              )}
            </div>
          ))}
          {recentPosts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">暂无文章</p>
          )}
        </CardContent>
      </Card>

      {/* 分类 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Folder className="w-5 h-5 text-primary" />
              分类
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/${locale}/blog/categories`}>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.slice(0, 8).map((category) => (
              <Link
                key={category}
                href={`/${locale}/blog/category/${encodeURIComponent(category)}`}
                className="block"
              >
                <Badge
                  variant="secondary"
                  className="w-full justify-start py-2 px-3 hover:bg-primary hover:text-primary-foreground transition-colors font-normal"
                >
                  <Folder className="w-3 h-3 mr-2" />
                  {category}
                </Badge>
              </Link>
            ))}
            {categories.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">暂无分类</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 标签 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary" />
              标签
            </div>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/${locale}/blog/tags`}>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 12).map((tag) => (
              <Link
                key={tag}
                href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`}
              >
                <Badge
                  variant="outline"
                  className="py-1 px-2 text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
            {tags.length === 0 && (
              <p className="text-sm text-muted-foreground text-center w-full py-4">暂无标签</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 