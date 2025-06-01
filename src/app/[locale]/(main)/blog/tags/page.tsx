import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Tag, FileText } from 'lucide-react';
import { getTagsWithCount } from '@/lib/blog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: '所有标签',
  description: '浏览博客的所有标签',
};

interface TagsPageProps {
  params: Promise<{ locale: string }>;
}

export default async function TagsPage({ params }: TagsPageProps) {
  const { locale } = await params;
  const tagsWithCount = getTagsWithCount();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <div className="mb-8">
        <Button variant="outline" asChild>
          <Link href={`/${locale}/blog`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回博客
          </Link>
        </Button>
      </div>

      {/* 页面标题 */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Tag className="w-7 h-7 text-primary" />
          <h1 className="text-4xl font-bold">所有标签</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          发现感兴趣的主题，共 <span className="font-semibold text-foreground">{tagsWithCount.length}</span> 个标签
        </p>
      </div>

      {/* 标签网格 */}
      {tagsWithCount.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {tagsWithCount.map((tag) => (
            <Link
              key={tag.name}
              href={`/${locale}/blog/tag/${encodeURIComponent(tag.name)}`}
              className="block group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Tag className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {tag.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span>{tag.count} 篇文章</span>
                    </div>
                    <Badge variant="outline" className="font-medium">
                      {tag.count}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Tag className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">暂无标签</h3>
            <p className="text-muted-foreground">
              还没有任何标签，发布文章后会自动创建标签。
            </p>
          </CardContent>
        </Card>
      )}

      {/* 标签云视图 */}
      {tagsWithCount.length > 0 && (
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                <Tag className="w-6 h-6 text-primary" />
                标签云
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 justify-center">
                {tagsWithCount.map((tag) => {
                  // 根据文章数量调整标签大小
                  const maxCount = Math.max(...tagsWithCount.map(t => t.count));
                  const sizeRatio = tag.count / maxCount;
                  const fontSize = Math.max(0.75, Math.min(1.5, 0.75 + sizeRatio * 0.75)); // 0.75rem 到 1.5rem

                  return (
                    <Link
                      key={tag.name}
                      href={`/${locale}/blog/tag/${encodeURIComponent(tag.name)}`}
                    >
                      <Badge
                        variant="outline"
                        className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        style={{ fontSize: `${fontSize}rem` }}
                      >
                        {tag.name} ({tag.count})
                      </Badge>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 