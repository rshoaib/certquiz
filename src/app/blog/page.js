import Link from 'next/link';
import { getBlogPosts } from '@/lib/supabase';

export const metadata = {
  title: 'Blog — Free IT Certification Tips & Guides | CertQuiz',
  description: 'Free guides, study tips, and exam prep strategies for IT certification exams including CompTIA Security+, Azure, AWS, and CCNA.',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        📝 CertQuiz Blog
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px' }}>
        Free study guides, exam tips, and certification strategies to help you pass your next IT exam.
      </p>

      {posts.length === 0 ? (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Blog posts coming soon! Check back later.</p>
        </div>
      ) : (
        <div className="blog-grid">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <article className="glass-card blog-card">
                {post.hero_image && (
                  <img
                    src={post.hero_image}
                    alt={post.title}
                    className="blog-card-image"
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
