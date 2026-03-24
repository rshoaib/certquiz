const BASE_URL = 'https://www.getcertquiz.com';

// Hardcoded fallback slugs — keeps sitemap alive even if Supabase is down
const FALLBACK_BLOG_SLUGS = [
  'free-vce-player-online',
  'vce-exam-simulator-free-alternative-2026',
  'comptia-security-plus-study-guide-2026',
];

export default async function sitemap() {
  // Static pages — always included
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/quiz/security-plus`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/upload`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  // Dynamic blog posts from Supabase (with timeout + fallback)
  let blogSlugs = FALLBACK_BLOG_SLUGS;
  try {
    const { getAllBlogSlugs } = await import('@/lib/supabase');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const slugs = await getAllBlogSlugs();
    clearTimeout(timeout);

    if (Array.isArray(slugs) && slugs.length > 0) {
      blogSlugs = slugs.map((s) => s.slug);
    }
  } catch {
    // Supabase unavailable — fall back to hardcoded slugs
  }

  const blogPages = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
