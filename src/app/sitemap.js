import { getAllBlogSlugs } from '@/lib/supabase';

const BASE_URL = 'https://www.getcertquiz.com';

export default async function sitemap() {
  // Static pages
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/quiz/security-plus`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];

  // Dynamic blog posts from Supabase
  let blogPages = [];
  try {
    const slugs = await getAllBlogSlugs();
    blogPages = slugs.map((s) => ({
      url: `${BASE_URL}/blog/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch {
    // If Supabase is unavailable, skip blog pages
  }

  return [...staticPages, ...blogPages];
}
