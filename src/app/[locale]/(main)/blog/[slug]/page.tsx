import { BlogCard } from '@/components/blog/blog-card';
import SocialShares from '@/components/social-shares';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, Clock, Folder, Tag, User } from 'lucide-react';
import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.image ? [{ url: post.image }] : [],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);
  const formattedDate = format(new Date(post.date), 'MMMM dd, yyyy');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href={`/${locale}/blog`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回博客
          </Link>
        </Button>
      </div>

      <article className="max-w-4xl mx-auto">
        {/* 文章头部 */}
        <header className="mb-8">
          <div className="mb-4">
            <Link href={`/${locale}/blog/category/${encodeURIComponent(post.category)}`}>
              <Badge variant="secondary" className="mb-4">
                <Folder className="w-3 h-3 mr-1" />
                {post.category}
              </Badge>
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-6">
            {post.description}
          </p>

          {/* 文章元信息 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}分钟阅读</span>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`}>
                <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          {/* 封面图 */}
          {post.image && (
            <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <div className="prose prose-lg max-w-none mb-8">
          <MDXRemote source={post.content} />
        </div>

        {/* 分享按钮 */}
        <div className="mb-8">
          <Separator className="mb-6" />
          <SocialShares />
        </div>

        {/* 相关文章 */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">相关文章</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <BlogCard
                  key={relatedPost.slug}
                  post={relatedPost}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
} 