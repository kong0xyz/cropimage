import { BlogCard } from '@/components/blog/blog-card';
import { BlogHeader } from '@/components/blog/blog-header';
import { TocLink } from '@/components/blog/toc-link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
        <div className="blog-container container mx-auto px-4 py-8">
            {/* 返回按钮 */}
            <div className="mb-8">
                <Button variant="ghost" asChild>
                    <Link href={`/${locale}/blog`}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        {t('backToBlog')}
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                {/* 主内容区 */}
                <div className="xl:col-span-3">
                    <article className="blog-content">
                        {/* 博客头部 */}
                        <header className="mb-10">
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

                            {/* 标题 */}
                            <h1 className="text-4xl font-bold mb-6 leading-tight">{post.title}</h1>

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
                                <div className="relative aspect-video overflow-hidden rounded-lg mb-8 shadow-lg">
                                    <ImageWithFallback
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        fallbackSrc="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&w=1200&fit=max&q=80"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                            )}

                            <Separator />
                        </header>

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

                {/* 侧边栏 - 目录 */}
                <div className="xl:col-span-1">
                    <div className="sticky top-8">
                        {/* 如果有目录数据，显示目录 */}
                        {page.data.toc && page.data.toc.length > 0 && (
                            <Card>
                                <CardContent className="p-6">
                                    <h3 className="font-semibold mb-4">{t('tableOfContents')}</h3>
                                    <nav className="space-y-2">
                                        {page.data.toc.map((item: any, index: number) => (
                                            <TocLink
                                                key={index}
                                                href={`${item.url}`}
                                                depth={item.depth}
                                            >
                                                {item.title}
                                            </TocLink>
                                        ))}
                                    </nav>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 