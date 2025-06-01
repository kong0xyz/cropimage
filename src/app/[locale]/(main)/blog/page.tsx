import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Folder, Tag, BookOpen } from 'lucide-react';
import { getPaginatedPosts, getAllCategories, getAllTags, getRecentPosts } from '@/lib/blog';
import { BlogCard } from '@/components/blog/blog-card';
import { Pagination } from '@/components/blog/pagination';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
    title: '博客',
    description: '探索最新的技术文章、教程和见解',
};

interface BlogPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ page?: string }>;
}

function BlogSkeleton() {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="h-fit">
                    <CardContent className="p-6">
                        <Skeleton className="h-48 w-full mb-4 rounded-lg" />
                        <Skeleton className="h-6 w-3/4 mb-3" />
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-4 w-2/3 mb-4" />
                        <div className="flex gap-2">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-14" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function SidebarSkeleton() {
    return (
        <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                    <CardContent className="p-6">
                        <Skeleton className="h-6 w-24 mb-4" />
                        <div className="space-y-3">
                            {Array.from({ length: 4 }).map((_, j) => (
                                <Skeleton key={j} className="h-4 w-full" />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
    const { locale } = await params;
    const { page } = await searchParams;
    const pageNumber = Number(page) || 1;
    const pageSize = 12;

    // 获取数据
    const paginatedPosts = getPaginatedPosts(pageNumber, pageSize);
    const categories = getAllCategories();
    const tags = getAllTags();
    const recentPosts = getRecentPosts(5);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 页面头部 */}
            <div className="mb-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <BookOpen className="w-7 h-7 text-primary" />
                            <h1 className="text-4xl font-bold text-foreground">博客</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            探索最新的技术文章、教程和见解
                        </p>
                        <div className="flex items-center gap-6 mt-3 text-sm text-muted-foreground">
                            <span>{paginatedPosts.total} 篇文章</span>
                            <span>{categories.length} 个分类</span>
                            <span>{tags.length} 个标签</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button variant="outline" asChild>
                            <Link href={`/${locale}/blog/categories`}>
                                <Folder className="w-4 h-4 mr-2" />
                                分类
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={`/${locale}/blog/tags`}>
                                <Tag className="w-4 h-4 mr-2" />
                                标签
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                {/* 主内容区 */}
                <div className="xl:col-span-3">
                    <Suspense fallback={<BlogSkeleton />}>
                        {paginatedPosts.posts.length > 0 ? (
                            <>
                                <div className="grid gap-6 lg:grid-cols-2 mb-10">
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
                                    baseUrl="/blog"
                                    locale={locale}
                                />
                            </>
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">暂无文章</h3>
                                    <p className="text-muted-foreground">
                                        还没有发布任何文章，请稍后再来查看。
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </Suspense>
                </div>

                {/* 侧边栏 */}
                <div className="xl:col-span-1">
                    <div className="sticky top-8">
                        <Suspense fallback={<SidebarSkeleton />}>
                            <BlogSidebar
                                recentPosts={recentPosts}
                                categories={categories}
                                tags={tags}
                                locale={locale}
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}