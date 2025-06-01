import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCategoriesWithCount } from '@/lib/blog';
import { ArrowLeft, FileText, Folder } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '所有分类',
  description: '浏览博客的所有分类',
};

interface CategoriesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const { locale } = await params;
  const categoriesWithCount = getCategoriesWithCount();

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
          <Folder className="w-7 h-7 text-primary" />
          <h1 className="text-4xl font-bold">所有分类</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          探索不同主题的精彩内容，共 <span className="font-semibold text-foreground">{categoriesWithCount.length}</span> 个分类
        </p>
      </div>

      {/* 分类网格 */}
      {categoriesWithCount.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {categoriesWithCount.map((category) => (
            <Link
              key={category.name}
              href={`/${locale}/blog/category/${encodeURIComponent(category.name)}`}
              className="block group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Folder className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span>{category.count} 篇文章</span>
                    </div>
                    <Badge variant="secondary" className="font-medium">
                      {category.count}
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
            <Folder className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">暂无分类</h3>
            <p className="text-muted-foreground">
              还没有任何分类，发布文章后会自动创建分类。
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 