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
      ...(post.image ? { images: [{ url: post.image, alt: post.title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      ...(post.image ? { images: [post.image] } : {}),
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
    ...(post.image ? { image: post.image } : {}),
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

        {post.image && (
          <img
            src={post.image}
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
      </div>
    </article>
  );
}

