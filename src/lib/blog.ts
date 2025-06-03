import { blogSource } from "@/lib/source";
import { fumadocsExcludeLocales } from "@/config/i18n";
import type { FC } from "react";
import type { MDXProps } from "mdx/types";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string[];
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  body: FC<MDXProps>;
  readingTime: number;
  url: string;
  featured?: boolean;
  draft?: boolean;
}

export interface PaginatedPosts {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 计算阅读时间（基于250字/分钟）
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 250;
  // 从MDX组件中估算字数比较困难，暂时使用固定值
  // 实际项目中可以在frontmatter中直接设置readingTime
  return 5; // 默认5分钟
}

// 直接读取和解析 MDX 文件的 frontmatter
function parseFrontmatter(filePath: string) {
  try {
    const fullPath = path.join(process.cwd(), 'content/blog', filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContent);
    return data;
  } catch (error) {
    console.error(`Error parsing frontmatter for ${filePath}:`, error);
    return {};
  }
}

// 获取所有blog文章
export function getAllPosts(locale?: string): BlogPost[] {
  try {
    // 如果locale在fumadocsExcludeLocales中，使用en作为回退
    const fallbackLocale = locale && fumadocsExcludeLocales.includes(locale) ? 'en' : locale;
    
    // 使用blogSource.getPages()获取所有页面
    const pages = blogSource.getPages(fallbackLocale);
    
    const blogPosts: BlogPost[] = pages
      .map((page) => {
        // 直接使用 page.data，因为 fumadocs 已经将 frontmatter 数据合并到 data 中
        const data = page.data as any;
        
        // 尝试直接解析 frontmatter
        const frontmatter = parseFrontmatter(`${page.slugs.join('/')}.mdx`);
        
        const post = {
          slug: page.slugs,
          title: data.title || frontmatter.title || "",
          description: data.description || frontmatter.description || "",
          date: frontmatter.date || data.date || new Date().toISOString(),
          author: frontmatter.author || data.author || "Anonymous",
          category: frontmatter.category || data.category || "Uncategorized",
          tags: frontmatter.tags || data.tags || [],
          image: frontmatter.image || data.image,
          body: data.body,
          readingTime: frontmatter.readingTime || data.readingTime || calculateReadingTime(""),
          url: page.url,
          featured: frontmatter.featured || data.featured || false,
          draft: frontmatter.draft || data.draft || false,
        };
        
        return post;
      })
      .filter(post => !post.draft); // 过滤掉草稿

    return blogPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return [];
  }
}

// 根据slug获取文章
export function getPostBySlug(
  slug: string[],
  locale?: string
): BlogPost | null {
  try {
    // 如果locale在fumadocsExcludeLocales中，使用en作为回退
    const fallbackLocale = locale && fumadocsExcludeLocales.includes(locale) ? 'en' : locale;
    
    const page = blogSource.getPage(slug, fallbackLocale);

    if (!page) {
      return null;
    }

    // 直接使用 page.data，因为 fumadocs 已经将 frontmatter 数据合并到 data 中
    const data = page.data as any;
    
    // 尝试直接解析 frontmatter
    const frontmatter = parseFrontmatter(`${slug.join('/')}.mdx`);

    const post = {
      slug,
      title: data.title || frontmatter.title || "",
      description: data.description || frontmatter.description || "",
      date: frontmatter.date || data.date || new Date().toISOString(),
      author: frontmatter.author || data.author || "Anonymous",
      category: frontmatter.category || data.category || "Uncategorized",
      tags: frontmatter.tags || data.tags || [],
      image: frontmatter.image || data.image,
      body: data.body,
      readingTime: frontmatter.readingTime || data.readingTime || calculateReadingTime(""),
      url: page.url,
      featured: frontmatter.featured || data.featured || false,
      draft: frontmatter.draft || data.draft || false,
    };

    // 如果是草稿且不是开发环境，返回null
    if (post.draft && process.env.NODE_ENV === 'production') {
      return null;
    }

    return post;
  } catch (error) {
    console.error("Error getting blog post:", error);
    return null;
  }
}

// 根据slug字符串获取文章（兼容性函数）
export function getPostBySlugString(
  slugString: string,
  locale?: string
): BlogPost | null {
  const slug = slugString.split("/").filter(Boolean);
  return getPostBySlug(slug, locale);
}

// 获取文章标签
export function getAllTags(locale?: string): string[] {
  const posts = getAllPosts(locale);
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

// 获取标签统计信息
export function getTagsWithCount(
  locale?: string
): Array<{ name: string; count: number }> {
  const posts = getAllPosts(locale);
  const tagCount = new Map<string, number>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const currentCount = tagCount.get(tag) || 0;
      tagCount.set(tag, currentCount + 1);
    });
  });

  return Array.from(tagCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// 根据标签获取文章
export function getPostsByTag(tag: string, locale?: string): BlogPost[] {
  return getAllPosts(locale).filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// 获取所有分类
export function getAllCategories(locale?: string): string[] {
  const posts = getAllPosts(locale);
  const categorySet = new Set<string>();

  posts.forEach((post) => {
    categorySet.add(post.category);
  });

  return Array.from(categorySet).sort();
}

// 获取分类统计信息
export function getCategoriesWithCount(
  locale?: string
): Array<{ name: string; count: number }> {
  const posts = getAllPosts(locale);
  const categoryCount = new Map<string, number>();

  posts.forEach((post) => {
    const currentCount = categoryCount.get(post.category) || 0;
    categoryCount.set(post.category, currentCount + 1);
  });

  return Array.from(categoryCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// 根据分类获取文章
export function getPostsByCategory(
  category: string,
  locale?: string
): BlogPost[] {
  return getAllPosts(locale).filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

// 分页获取文章
export function getPaginatedPosts(
  page: number = 1,
  pageSize: number = 10,
  locale?: string
): PaginatedPosts {
  const allPosts = getAllPosts(locale);
  const total = allPosts.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const posts = allPosts.slice(start, end);

  return {
    posts,
    total,
    page,
    pageSize,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

// 根据分类分页获取文章
export function getPaginatedPostsByCategory(
  category: string,
  page: number = 1,
  pageSize: number = 10,
  locale?: string
): PaginatedPosts {
  const categoryPosts = getPostsByCategory(category, locale);
  const total = categoryPosts.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const posts = categoryPosts.slice(start, end);

  return {
    posts,
    total,
    page,
    pageSize,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

// 根据标签分页获取文章
export function getPaginatedPostsByTag(
  tag: string,
  page: number = 1,
  pageSize: number = 10,
  locale?: string
): PaginatedPosts {
  const tagPosts = getPostsByTag(tag, locale);
  const total = tagPosts.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const posts = tagPosts.slice(start, end);

  return {
    posts,
    total,
    page,
    pageSize,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

// 获取最近的文章
export function getRecentPosts(limit: number = 5, locale?: string): BlogPost[] {
  return getAllPosts(locale).slice(0, limit);
}

// 获取推荐文章（基于相同分类或标签）
export function getRelatedPosts(
  currentPost: BlogPost,
  limit: number = 3,
  locale?: string
): BlogPost[] {
  const allPosts = getAllPosts(locale).filter(
    (post) => post.slug.join("/") !== currentPost.slug.join("/")
  );

  // 优先显示相同分类的文章
  const sameCategoryPosts = allPosts.filter(
    (post) => post.category === currentPost.category
  );

  // 然后显示有相同标签的文章
  const sameTagPosts = allPosts.filter((post) =>
    post.tags.some((tag) => currentPost.tags.includes(tag))
  );

  // 合并并去重
  const relatedPosts = [
    ...sameCategoryPosts,
    ...sameTagPosts.filter(
      (post) =>
        !sameCategoryPosts.find((p) => p.slug.join("/") === post.slug.join("/"))
    ),
  ];

  return relatedPosts.slice(0, limit);
}

// 生成静态参数（用于静态生成）
export function generateBlogParams() {
  try {
    return blogSource.generateParams();
  } catch (error) {
    console.error("Error generating blog params:", error);
    return [];
  }
}

// 获取blog页面（用于动态路由）
export function getBlogPage(slug: string[], locale?: string) {
  return blogSource.getPage(slug, locale);
}
