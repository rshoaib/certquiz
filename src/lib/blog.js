/**
 * Local blog data utility
 * Reads blog posts from static JSON — no external database needed
 */

import blogPosts from '@/data/blog-posts.json';

/**
 * Fetch all blog posts (newest first)
 */
export function getBlogPosts() {
  return blogPosts;
}

/**
 * Fetch a single blog post by slug
 */
export function getBlogPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug) || null;
}

/**
 * Get all slugs for static generation
 */
export function getAllBlogSlugs() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}
