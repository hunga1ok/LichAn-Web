/**
 * Blog Service Facade
 * ============================================================================
 * Lớp dịch vụ truy vấn và quản lý bài viết Blog / Cẩm Nang Lịch An.
 * Dữ liệu bài viết được bóc tách độc lập tại `src/data/blog/`.
 * ============================================================================
 */

import { BlogPost, BLOG_POSTS } from '@/data/blog';

export type { BlogPost, BlogCategory } from '@/data/blog';
export { BLOG_POSTS } from '@/data/blog';

export function getAllBlogPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getBlogPostsByCategory(category?: string): BlogPost[] {
  if (!category || category === 'all' || category === 'Tất cả') {
    return BLOG_POSTS;
  }
  return BLOG_POSTS.filter((post) => post.category.toLowerCase() === category.toLowerCase());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) {
    return BLOG_POSTS.filter((post) => post.slug !== currentSlug).slice(0, limit);
  }
  // Ưu tiên các bài viết cùng chuyên mục để tăng trải nghiệm đọc và liên kết nội bộ (internal linking)
  const sameCategory = BLOG_POSTS.filter(
    (post) => post.slug !== currentSlug && post.category === current.category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const otherPosts = BLOG_POSTS.filter(
    (post) => post.slug !== currentSlug && post.category !== current.category
  );
  return [...sameCategory, ...otherPosts].slice(0, limit);
}
