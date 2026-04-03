import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/blog';

const BASE_URL = 'https://www.getcertquiz.com';

export async function GET() {
  const staticPages = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: '1.0', lastmod: '2026-04-03' },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: '0.8', lastmod: '2026-04-03' },
    { url: `${BASE_URL}/quiz/security-plus-sy0-701`, changeFrequency: 'monthly', priority: '0.9', lastmod: '2026-03-19' },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: '0.5', lastmod: '2026-03-01' },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: '0.5', lastmod: '2026-03-01' },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: '0.3', lastmod: '2026-03-01' },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: '0.3', lastmod: '2026-03-01' },
  ];

  const blogSlugs = getAllBlogSlugs();
  const blogPages = blogSlugs.map((s) => {
    const post = getBlogPostBySlug(s.slug);
    return {
      url: `${BASE_URL}/blog/${s.slug}`,
      changeFrequency: 'monthly',
      priority: '0.7',
      lastmod: post?.created_at ? post.created_at.split('T')[0] : '2026-03-01',
    };
  });

  const allPages = [...staticPages, ...blogPages];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
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
