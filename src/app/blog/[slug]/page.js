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
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container blog-article" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
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
          <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
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
      </div>
    </article>
  );
}
