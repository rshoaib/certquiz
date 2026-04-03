import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog — Free IT Certification Tips & Guides | CertQuiz',
  description: 'Free guides, study tips, and exam prep strategies for IT certification exams including CompTIA Security+, Azure, AWS, and CCNA.',
  keywords: [
    'IT certification study guide',
    'CompTIA Security+ tips',
    'certification exam prep',
    'free IT study resources',
    'Azure certification guide',
    'AWS exam study tips',
  ],
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog — Free IT Certification Tips & Guides | CertQuiz',
    description: 'Free guides, study tips, and exam prep strategies for IT certification exams.',
    url: '/blog',
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        CertQuiz Blog
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px' }}>
        Free study guides, exam tips, and certification strategies to help you pass your next IT exam.
        <span style={{ display: 'inline-block', marginLeft: '0.5rem', padding: '0.15rem 0.5rem', fontSize: '0.8rem', fontWeight: 600, borderRadius: '999px', backgroundColor: 'var(--bg-glass)', border: '1px solid var(--border-glass)' }}>
          {posts.length} {posts.length === 1 ? 'article' : 'articles'}
        </span>
      </p>

      {posts.length === 0 ? (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Blog posts coming soon! Check back later.</p>
        </div>
      ) : (
        <div className="blog-grid">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article className="glass-card blog-card">
                {post.hero_image && (
                  <Image
                    src={post.hero_image}
                    alt={post.title}
                    width={740}
                    height={400}
                    className="blog-card-image"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                <div className="blog-card-content">
                  <span className="blog-card-category">{post.category}</span>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-desc">{post.description}</p>
                  <div className="blog-card-meta">
                    <span>{post.author}</span>
                    <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
