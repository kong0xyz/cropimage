import { BlogCard } from '@/components/blog/blog-card';
import { BlogPagination } from '@/components/blog/blog-pagination';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { PageHeader } from '@/components/page-header';
import { PageSectionH2 } from '@/components/page-section-h2';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BlogPost, getAllPosts, getCategoriesWithCount, getTagsWithCount } from '@/lib/blog';
import { FileText } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

interface BlogPageProps {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'meta.blog' });

    return {
        title: t('title'),
        description: t('description'),
    };
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

    const currentPage = parseInt(page || '1');
    const postsPerPage = 12;
    const offset = (currentPage - 1) * postsPerPage;

    const allPosts = getAllPosts(locale);
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const posts = allPosts.slice(offset, offset + postsPerPage);
    const categories = getCategoriesWithCount(locale);
    const tags = getTagsWithCount(locale);

    const t = await getTranslations('blog');

    return (
        <div className="blog-container min-h-screen bg-background">
            <PageHeader
                header="Blog"
                title={t('title')}
                description={t('description')}
            />

            <PageSectionH2 className="py-8" title={t('recentPosts')}>
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* 主内容区域 */}
                    <main className="flex-1">
                        {posts.length > 0 ? (
                            <div className="space-y-8">
                                {/* 博客卡片网格 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
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

                                {/* 分页导航 */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center mt-12">
                                        <BlogPagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            baseUrl={`/blog`}
                                            locale={locale}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="max-w-md mx-auto">
                                    <div className="mb-6">
                                        <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
                                            <FileText className="w-10 h-10 text-muted-foreground" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{t('noArticles')}</h3>
                                    <p className="text-muted-foreground">{t('noArticlesDescription')}</p>
                                </div>
                            </div>
                        )}
                    </main>

                    {/* 侧边栏 */}
                    <aside className="lg:w-80">
                        <div className="blog-sidebar sticky top-8 space-y-6">
                            {/* 分类列表 */}
                            <BlogSidebar categories={categories} tags={tags} locale={locale} />
                        </div>
                    </aside>
                </div>
            </PageSectionH2>
        </div>
    );
}