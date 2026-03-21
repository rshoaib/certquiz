export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/results', '/upload'],
      },
    ],
    sitemap: 'https://www.getcertquiz.com/sitemap.xml',
  };
}
