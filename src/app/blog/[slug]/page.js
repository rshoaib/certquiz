import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found | CertQuiz' };

  return {
    title: `${post.title} | CertQuiz`,
    description: post.description,
    keywords: post.tags || [],
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | CertQuiz`,
      description: post.description,
      url: `/blog/${slug}`,
      type: 'article',
      publishedTime: post.created_at,
      authors: [post.author],
      ...(post.hero_image ? { images: [{ url: post.hero_image, alt: post.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(post.hero_image ? { images: [post.hero_image] } : {}),
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.created_at,
    publisher: { '@type': 'Organization', name: 'CertQuiz', url: 'https://www.getcertquiz.com' },
    mainEntityOfPage: `https://www.getcertquiz.com/blog/${slug}`,
    ...(post.hero_image ? { image: post.hero_image } : {}),
  };

  return (
    <article className="container blog-article" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div style={{ maxWidth: '740px', margin: '0 auto' }}>
        <span className="blog-card-category" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
          {post.category}
        </span>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '1rem' }}>
          {post.title}
        </h1>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
          <span>By {post.author}</span>
          <span>|</span>
          <span>{post.display_date || new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        {post.hero_image && (
          <img
            src={post.hero_image}
            alt={post.title}
            style={{ width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}
          />
        )}

        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.tags && post.tags.length > 0 && (
          <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {post.tags.map((tag) => (
                <span key={tag} className="format-badge">{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Block for Internal Linking */}
        <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-glass)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Ready to Practice?</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Try our free exam simulator. No signup, no paywall, 100% private.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/quiz/security-plus-sy0-701" className="btn btn-primary">
              Take Security+ Quiz
            </a>
            <a href="/upload" className="btn btn-secondary">
              Upload Your VCE/PDF
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

