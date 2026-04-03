import { getAllBlogSlugs } from '@/lib/blog';

const BASE_URL = 'https://www.getcertquiz.com';

export async function GET() {
  const staticPages = [
    { url: BASE_URL, changeFrequency: 'weekly', priority: '1.0' },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: '0.8' },
    { url: `${BASE_URL}/quiz/security-plus-sy0-701`, changeFrequency: 'monthly', priority: '0.9' },
    { url: `${BASE_URL}/upload`, changeFrequency: 'monthly', priority: '0.8' },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: '0.5' },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: '0.5' },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: '0.3' },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: '0.3' },
  ];

  const blogSlugs = getAllBlogSlugs();
  const blogPages = blogSlugs.map((s) => ({
    url: `${BASE_URL}/blog/${s.slug}`,
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
