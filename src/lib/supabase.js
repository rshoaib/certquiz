/**import { createClient } from '@supabase/supabase-js';


 * Supabase REST API utility
 * Uses the PostgREST API directly — no SDK needed
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headers = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
};

/**
 * Fetch all published blog posts (sorted by newest first)
 */
export async function getBlogPosts() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?published=eq.true&order=created_at.desc&select=id,slug,title,description,category,tags,author,hero_image,created_at`,
    {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!res.ok) {export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

                
    console.error('Failed to fetch blog posts:', res.status, await res.text());
    return [];
  }

  return res.json();
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=*`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    console.error('Failed to fetch blog post:', res.status, await res.text());
    return null;
  }

  const data = await res.json();
  return data.length > 0 ? data[0] : null;
}

/**
 * Get all slugs for static generation
 */
export async function getAllBlogSlugs() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/blog_posts?published=eq.true&select=slug`,
    {
      headers,
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) return [];
  return res.json();
}
