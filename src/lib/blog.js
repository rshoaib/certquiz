/**
 * Local blog data utility
 * Reads blog posts from static JSON — no external database needed
 */

import blogPosts from '@/data/blog-posts.json';
import additionPosts from '@/data/blog-posts-additions.json';

const allPosts = [...additionPosts, ...blogPosts];

/**
 * Fetch all blog posts (newest first)
 */
export function getBlogPosts() {
  return allPosts;
}

/**
 * Fetch a single blog post by slug
 */
export function getBlogPostBySlug(slug) {
  return allPosts.find((p) => p.slug === slug) || null;
}

/**
 * Get all slugs for static generation
 */
export function getAllBlogSlugs() {
  return allPosts.map((p) => ({ slug: p.slug }));
}
