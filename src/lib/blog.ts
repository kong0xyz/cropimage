import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  content: string;
  readingTime: number;
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

const blogDirectory = join(process.cwd(), 'content/blog');

// 计算阅读时间（基于250字/分钟）
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 250;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

// 获取所有blog文章
export function getAllPosts(): BlogPost[] {
  try {
    const fileNames = readdirSync(blogDirectory);
    const posts = fileNames
      .filter(name => name.endsWith('.mdx'))
      .map(name => {
        const slug = name.replace(/\.mdx$/, '');
        return getPostBySlug(slug);
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return posts;
  } catch {
    return [];
  }
}

// 根据slug获取文章
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = join(blogDirectory, `${slug}.mdx`);
    const fileContents = readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Anonymous',
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      image: data.image,
      content,
      readingTime: calculateReadingTime(content),
    };
  } catch {
    return null;
  }
}

// 获取文章标签
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

// 获取标签统计信息
export function getTagsWithCount(): Array<{ name: string; count: number }> {
  const posts = getAllPosts();
  const tagCount = new Map<string, number>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      const currentCount = tagCount.get(tag) || 0;
      tagCount.set(tag, currentCount + 1);
    });
  });
  
  return Array.from(tagCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // 按文章数量降序排序
}

// 根据标签获取文章
export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

// 获取所有分类
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categorySet = new Set<string>();
  
  posts.forEach(post => {
    categorySet.add(post.category);
  });
  
  return Array.from(categorySet).sort();
}

// 获取分类统计信息
export function getCategoriesWithCount(): Array<{ name: string; count: number }> {
  const posts = getAllPosts();
  const categoryCount = new Map<string, number>();
  
  posts.forEach(post => {
    const currentCount = categoryCount.get(post.category) || 0;
    categoryCount.set(post.category, currentCount + 1);
  });
  
  return Array.from(categoryCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // 按文章数量降序排序
}

// 根据分类获取文章
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

// 分页获取文章
export function getPaginatedPosts(page: number = 1, pageSize: number = 10): PaginatedPosts {
  const allPosts = getAllPosts();
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
  pageSize: number = 10
): PaginatedPosts {
  const categoryPosts = getPostsByCategory(category);
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
  pageSize: number = 10
): PaginatedPosts {
  const tagPosts = getPostsByTag(tag);
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
export function getRecentPosts(limit: number = 5): BlogPost[] {
  return getAllPosts().slice(0, limit);
}

// 获取推荐文章（基于相同分类或标签）
export function getRelatedPosts(currentPost: BlogPost, limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts().filter(post => post.slug !== currentPost.slug);
  
  // 优先显示相同分类的文章
  const sameCategoryPosts = allPosts.filter(post => 
    post.category === currentPost.category
  );
  
  // 然后显示有相同标签的文章
  const sameTagPosts = allPosts.filter(post =>
    post.tags.some(tag => currentPost.tags.includes(tag))
  );
  
  // 合并并去重
  const relatedPosts = [
    ...sameCategoryPosts,
    ...sameTagPosts.filter(post => 
      !sameCategoryPosts.find(p => p.slug === post.slug)
    ),
  ];
  
  return relatedPosts.slice(0, limit);
} 