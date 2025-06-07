import { BlogCard } from '@/components/blog/blog-card';
import { BlogHeader } from '@/components/blog/blog-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { getBlogPage, getPostBySlug, getRelatedPosts, getCategoriesWithCount, getTagsWithCount } from '@/lib/blog';
import { getMDXComponents } from '@/mdx-components';
import { DocsBody } from 'fumadocs-ui/page';
import { ArrowLeft, Eye, Tag, User, Calendar, Clock, Share2 } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import SocialShares from '@/components/social-shares';
import Toc from '@/components/blog/toc';
import ScrollToTop from '@/components/common/scroll-to-top';

interface BlogPostPageProps {
    params: Promise<{ locale: string; slug: string[] }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = getPostBySlug(slug, locale);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            images: post.image ? [{ url: post.image }] : [],
        },
    };
}

function PostSkeleton() {
    return (
        <div className="space-y-6">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-64 bg-gray-200 rounded animate-pulse" />
            <div className="space-y-3">
                {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                ))}
            </div>
        </div>
    );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { locale, slug } = await params;

    // 获取页面数据和文章数据
    const page = getBlogPage(slug, locale);
    const post = getPostBySlug(slug, locale);

    if (!page || !post) {
        notFound();
    }

    const MDX = page.data.body;
    const relatedPosts = getRelatedPosts(post, 3, locale);

    const t = await getTranslations('blog');

    return (
        <div className="container py-6">
            {/* 返回按钮 */}
            <div className="mb-6">
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog`} className="flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t('backToBlog')}
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-20">
                {/* 文章内容 */}
                <div className="xl:col-span-9">
                    <article className="prose prose-neutral dark:prose-invert max-w-none">
                        {/* 文章标题和元信息 */}
                        <h1 className="mb-4">{page.data.title}</h1>

                        {/* 特色标记和分类 */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                            {post.featured && (
                                <Badge variant="default" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                                    <Eye className="w-3 h-3 mr-1" />
                                    {t('featured')}
                                </Badge>
                            )}
                            <Badge variant="secondary" className="text-sm">
                                {post.category}
                            </Badge>
                            {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        {/* 描述 */}
                        {post.description && (
                            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
                                {post.description}
                            </p>
                        )}

                        {/* 元信息 */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                    <User className="w-4 h-4 mr-2" />
                                    <span className="font-medium">{post.author}</span>
                                </div>
                                <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString(locale, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-2" />
                                    <span>{post.readingTime} {t('min')}</span>
                                </div>
                            </div>

                            <SocialShares />
                        </div>

                        {/* 特色图片 */}
                        {post.image && (
                            <div className="relative aspect-video mb-12 overflow-hidden rounded-xl w-full">
                                <ImageWithFallback
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover !absolute inset-0"
                                    sizes="100vw"
                                    priority
                                    fallbackSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=1200&fit=max&q=80"
                                />
                            </div>
                        )}

                        <Separator className="mb-12" />

                        {/* 文章内容 */}
                        <Suspense fallback={<PostSkeleton />}>
                            <DocsBody className="dark:prose-invert max-w-none">
                                <MDX components={getMDXComponents()} />
                            </DocsBody>
                        </Suspense>
                    </article>

                    {/* 相关文章 */}
                    {relatedPosts.length > 0 && (
                        <section className="mt-16">
                            <h2 className="text-2xl font-bold mb-8">{t('relatedArticles')}</h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                                {relatedPosts.map((relatedPost) => {
                                    // 从 post 中移除 body 函数，避免传递给客户端组件
                                    const { body, ...postData } = relatedPost;
                                    return (
                                        <BlogCard
                                            key={relatedPost.slug.join('/')}
                                            post={postData}
                                            locale={locale}
                                            className="h-full"
                                        />
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </div>

                {/* 侧边栏 */}
                <div className="xl:col-span-3">
                    {/* 目录 */}
                    {page.data.toc && page.data.toc.length > 0 && (
                        <div className="border py-4 rounded-2xl hidden xl:block sticky top-20 shadow-none">
                            <div className="pb-4 px-4">
                                <div className="text-lg font-semibold">{t('tableOfContents')}</div>
                            </div>
                            <div className="pr-0">
                                <div className="max-h-[calc(100vh-300px)] overflow-y-auto toc-scrollbar">
                                    <Toc
                                        items={page.data.toc.map((item: any) => ({
                                            id: item.url.slice(1),
                                            text: item.title,
                                            level: item.depth
                                        }))}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 回到顶部按钮和移动端目录 */}
            <ScrollToTop
                toc={page.data.toc?.map((item: any) => ({
                    id: item.url.slice(1),
                    text: item.title,
                    level: item.depth
                }))}
                showBackToBlog={true}
            />
        </div>
    );
} 