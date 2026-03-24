import { getAllBlogSlugs } from '@/lib/supabase';

const BASE_URL = 'https://www.getcertquiz.com';

// Hardcoded fallback slugs — keeps sitemap alive even if Supabase is down
const FALLBACK_BLOG_SLUGS = [
  'free-vce-player-online',
  'vce-exam-simulator-free-alternative-2026',
  'comptia-security-plus-study-guide-2026',
];

export async function GET() {
  // Static pages — always included
  const staticPages = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: '1.0' },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: '0.8' },
    { url: `${BASE_URL}/quiz/security-plus`, changeFrequency: 'monthly', priority: '0.9' },
    { url: `${BASE_URL}/upload`, changeFrequency: 'monthly', priority: '0.8' },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: '0.5' },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: '0.5' },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: '0.3' },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: '0.3' },
  ];

  // Dynamic blog posts from Supabase (with fallback)
  let blogSlugs = FALLBACK_BLOG_SLUGS;
  try {
    const slugs = await getAllBlogSlugs();
    if (Array.isArray(slugs) && slugs.length > 0) {
      blogSlugs = slugs.map((s) => s.slug);
    }
  } catch {
    // Supabase unavailable — fall back to hardcoded slugs
  }

  const blogPages = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    changeFrequency: 'monthly',
    priority: '0.7',
  }));

  const allPages = [...staticPages, ...blogPages];
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
