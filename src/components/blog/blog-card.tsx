import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, User, Tag, Folder, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPost } from '@/lib/blog';
import { format } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
}

export function BlogCard({ post, locale }: BlogCardProps) {
  const formattedDate = format(new Date(post.date), 'MMM dd, yyyy');

  return (
    <Card className="group h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <Link href={`/${locale}/blog/${post.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
              <div className="text-primary/60 text-4xl font-bold">
                {post.title.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          
          {/* 悬浮阅读提示 */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="flex items-center gap-2 text-white text-sm font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              <span>阅读文章</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>

      <CardContent className="p-6 flex-1 flex flex-col">
        {/* 元信息栏 */}
        <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readingTime}min</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{post.author}</span>
          </div>
        </div>

        {/* 标题 */}
        <Link href={`/${locale}/blog/${post.slug}`}>
          <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {post.title}
          </h3>
        </Link>

        {/* 描述 */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
          {post.description}
        </p>

        {/* 分类和标签 */}
        <div className="space-y-3 mt-auto">
          {/* 分类 */}
          <div className="flex items-center gap-2">
            <Folder className="w-3 h-3 text-muted-foreground" />
            <Link href={`/${locale}/blog/category/${encodeURIComponent(post.category)}`}>
              <Badge 
                variant="secondary" 
                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {post.category}
              </Badge>
            </Link>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Link key={tag} href={`/${locale}/blog/tag/${encodeURIComponent(tag)}`}>
                <Badge 
                  variant="outline" 
                  className="text-xs hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 