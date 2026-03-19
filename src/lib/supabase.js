/**
 * Supabase REST API utility
 * Uses PostgREST directly — no SDK needed
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headers = {
  'apikey': SUPABASE_ANON_KEY || '',
  'Authorization': `Bearer ${SUPABASE_ANON_KEY || ''}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
};

/**
 * Fetch all published blog posts (newest first)
 */
export async function getBlogPosts() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?published=eq.true&order=created_at.desc&select=id,slug,title,description,category,tags,author,hero_image,created_at`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPostBySlug(slug) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true&select=*`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch {
    return null;
  }
}

/**
 * Get all slugs for static generation
 */
export async function getAllBlogSlugs() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?published=eq.true&select=slug`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}
