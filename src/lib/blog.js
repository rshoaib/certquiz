/**
 * Local blog data utility
 * Reads blog posts from static JSON — no external database needed
 */

import blogPosts from '@/data/blog-posts.json';

/**
 * Fetch all published blog posts (newest first)
 */
export function getBlogPosts() {
  return blogPosts.filter((p) => p.published);
}

/**
 * Fetch a single blog post by slug
 */
export function getBlogPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug && p.published) || null;
}

/**
 * Get all slugs for static generation
 */
export function getAllBlogSlugs() {
  return blogPosts
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug }));
}
