'use client';

import { Badge } from '@/components/ui/badge';
import { ImageWithFallback } from '@/components/ui/image-with-fallback';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { ArrowRight, Calendar, Clock, Eye, Tag, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

// 为 BlogCard 组件创建专门的接口，不包含 MDX body 函数
interface BlogCardPost {
  slug: string[];
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  readingTime: number;
  url: string;
  featured?: boolean;
  draft?: boolean;
}

interface BlogCardProps {
  post: BlogCardPost;
  locale: string;
  className?: string;
}

const formatDate = (dateString: string, locale: string) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  } catch {
    return dateString;
  }
};

const getReadingTimeText = (readingTime: number, locale: string) => {
  if (locale === 'zh') {
    return `${readingTime} 分钟阅读`;
  }
  return `${readingTime} min read`;
};

export function BlogCard({ post, locale, className }: BlogCardProps) {
  const t = useTranslations('blog');
  
  // 构建文章URL
  const postUrl = `/blog/${post.slug.join('/')}`;

  return (
    <Link href={postUrl} className="block group">
      <article className={cn(
        "blog-card bg-card rounded-xl overflow-hidden border hover:shadow-xl h-full cursor-pointer flex flex-col transition-all duration-300 hover:border-primary/20",
        className
      )}>
        {/* 封面图片区域 - 固定高度 */}
        <div className="relative h-48 flex-shrink-0">
          {post.image ? (
            <div className="relative h-full w-full overflow-hidden">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fallbackSrc={`https://images.unsplash.com/photo-1576669802167-79dc8de72369?ixlib=rb-4.0.3&w=400&fit=max&q=80&auto=format`}
              />
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
              
              {/* 精选标记 - 浮在图片上 */}
              {post.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-yellow-400/90 to-orange-500/90 text-white text-xs font-medium shadow-lg backdrop-blur-sm">
                    <Eye className="w-3 h-3 mr-1" />
                    {t('featured')}
                  </Badge>
                </div>
              )}

              {/* 分类标记 - 浮在图片上 */}
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/30 text-white border-white/20 backdrop-blur-sm text-xs">
                  {post.category}
                </Badge>
              </div>

              {/* 阅读时间 - 底部浮动 */}
              <div className="absolute bottom-4 right-4">
                <div className="flex items-center text-white text-xs bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                  <Clock className="w-3 h-3 mr-1" />
                  {getReadingTimeText(post.readingTime, locale)}
                </div>
              </div>
            </div>
          ) : (
            // 当没有图片时，也使用 ImageWithFallback 组件显示默认图片
            <div className="relative h-full w-full overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1576669802167-79dc8de72369?ixlib=rb-4.0.3&w=400&fit=max&q=80&auto=format"
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* 渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
              
              {/* 精选标记（无图片时） */}
              {post.featured && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-yellow-400/90 to-orange-500/90 text-white text-xs font-medium shadow-lg backdrop-blur-sm">
                    <Eye className="w-3 h-3 mr-1" />
                    {t('featured')}
                  </Badge>
                </div>
              )}

              {/* 分类标记 */}
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-black/30 text-white border-white/20 backdrop-blur-sm text-xs">
                  {post.category}
                </Badge>
              </div>

              {/* 阅读时间（无图片时） */}
              <div className="absolute bottom-4 right-4">
                <div className="flex items-center text-white text-xs bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                  <Clock className="w-3 h-3 mr-1" />
                  {getReadingTimeText(post.readingTime, locale)}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* 内容区域 - 使用 flex-1 填充剩余空间 */}
        <div className="p-6 flex flex-col flex-1">
          {/* 标签区域 - 固定高度区域 */}
          <div className="min-h-[2rem] mb-4">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center text-xs text-primary/80 bg-primary/5 hover:bg-primary/10 px-2 py-1 rounded-md font-medium transition-colors"
                  >
                    <Tag className="w-2.5 h-2.5 mr-1" />
                    {tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-xs text-muted-foreground/80 bg-muted/80 px-2 py-1 rounded-md">
                    +{post.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* 标题 - 固定行数 */}
          <h3 className="text-lg font-bold line-clamp-2 leading-tight mb-3 group-hover:text-primary/90 min-h-[3.5rem] flex items-start transition-colors">
            {post.title}
          </h3>

          {/* 描述 - 固定行数，使用 flex-1 推送底部内容 */}
          <p className="text-muted-foreground/90 line-clamp-3 text-sm leading-relaxed mb-6 flex-1">
            {post.description}
          </p>

          {/* 元信息区域 - 两行布局 */}
          <div className="mt-auto space-y-3">
            {/* 第一行：作者和发布时间 */}
            <div className="flex items-center justify-between text-xs text-muted-foreground/80">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <User className="w-3 h-3 mr-1.5 flex-shrink-0 text-primary/60" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1.5 flex-shrink-0 text-primary/60" />
                  <time dateTime={post.date}>
                    {formatDate(post.date, locale)}
                  </time>
                </div>
              </div>
            </div>
            
            {/* 第二行：分隔线和阅读更多 */}
            <div className="pt-3 border-t border-border/30">
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground/80">
                  {post.category}
                </div>
                <div className="flex items-center text-xs text-primary/90 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  <span className="mr-1">{t('readMore')}</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
} 