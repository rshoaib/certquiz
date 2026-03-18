import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
    : null;

const headers = {
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
};

export async function getBlogPosts() {
    if (!SUPABASE_URL) return [];
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?published=eq.true&order=created_at.desc&select=id,slug,title,description,category,tags,author,hero_image,created_at`, {
          headers,
          next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return res.json();
}

export async function getBlogPostBySlug(slug) {
    if (!SUPABASE_URL) return null;
    const res = await fetch(`${SUPABASE_URL}/rest/v1/blog_posts?slug=eq.${slug}&select=*`, {
          headers,
          next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data[0] || null;
}
