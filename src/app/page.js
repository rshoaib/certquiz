import Link from 'next/link';
import ExamCard from '@/components/ExamCard';
import securityPlusData from '@/data/security-plus.json';

export const metadata = {
  title: 'CertQuiz — Free IT Certification Practice Tests | VCE Player Online',
  description:
    'Practice for CompTIA Security+ SY0-701, AWS, Azure AZ-104, CCNA and more. Upload VCE, PDF, or DOCX files and practice instantly — free, no signup, 100% private.',
  keywords: [
    'free practice test',
    'CompTIA Security+ practice exam',
    'SY0-701 practice test',
    'free VCE player online',
    'VCE exam simulator free',
    'IT certification practice tests',
    'CCNA practice test free',
    'Azure AZ-104 practice exam',
    'AWS Cloud Practitioner practice test',
    'free exam questions',
    'certification quiz',
    'VCE to PDF converter',
    'online VCE player no download',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'CertQuiz — Free IT Certification Practice Tests',
    description: 'Upload VCE, PDF, DOCX files and practice instantly. Free, no signup, 100% private.',
    url: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CertQuiz',
  url: 'https://www.getcertquiz.com',
  description: 'Free IT certification practice tests. Upload VCE, PDF, or Word files and practice instantly in your browser.',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.getcertquiz.com/blog?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is CertQuiz really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, CertQuiz is 100% free. No trial, no subscription, no limits. Unlike VCE Simulator ($40), CertQuiz works in your browser at no cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'What file formats does CertQuiz support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CertQuiz supports VCE, PDF, DOCX, TXT files, or you can paste questions directly. Your files are parsed entirely in your browser — nothing is uploaded to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to create an account to use CertQuiz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. CertQuiz requires zero signup. Just click and start practicing. Your data stays 100% private in your browser with zero data collection.',
      },
    },
    {
      '@type': 'Question',
      name: 'What certifications does CertQuiz cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CertQuiz offers pre-built practice exams for CompTIA Security+ (SY0-701), and is adding Microsoft Azure (AZ-104), AWS Cloud Practitioner (CLF-C02), and Cisco CCNA (200-301). You can also upload your own exam questions for any certification.',
      },
    },
  ],
};

const exams = [
  securityPlusData.exam,
  {
    id: 'az-104',
    title: 'Microsoft Azure Administrator (AZ-104)',
    description: 'Prove your skills in managing Azure subscriptions, identities, governance, storage, VNets, and VMs.',
    time_limit_minutes: 120,
    passing_score: 70,
    total_questions: 60,
    icon: '☁️',
    status: 'coming_soon',
  },
  {
    id: 'aws-ccp',
    title: 'AWS Cloud Practitioner (CLF-C02)',
    description: 'Foundational understanding of AWS Cloud, services, security, architecture, and pricing.',
    time_limit_minutes: 90,
    passing_score: 70,
    total_questions: 65,
    icon: '🟠',
    status: 'coming_soon',
  },
  {
    id: 'ccna-200-301',
    title: 'Cisco CCNA (200-301)',
    description: 'Network fundamentals, IP connectivity, security fundamentals, and automation.',
    time_limit_minutes: 120,
    passing_score: 80,
    total_questions: 100,
    icon: '🌐',
    status: 'coming_soon',
  },
];

export default function Home() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>
            Stop Paying for{' '}
            <span className="gradient-text">Exam Simulators</span>
          </h1>
          <p>
            Upload your VCE, PDF, or Word file and practice instantly — free, in your browser.
            No software to install. No signup. No paywall.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-value">$0</div>
              <div className="stat-label">Always Free</div>
            </div>
            <div className="hero-stat">
              <div className="stat-value">5+</div>
              <div className="stat-label">File Formats</div>
            </div>
            <div className="hero-stat">
              <div className="stat-value">100%</div>
              <div className="stat-label">Private</div>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/upload" className="btn btn-primary btn-lg">
              Upload Questions →
            </Link>
            <Link href="/quiz/security-plus-sy0-701" className="btn btn-secondary btn-lg">
              Try Security+ Free
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Points → Solutions */}
      <section className="container" style={{ paddingBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
          😤 Sound Familiar?
        </h2>
        <div className="exam-grid">
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '0.75rem' }}>
              &ldquo;I downloaded a VCE file but need to pay $40 for the simulator just to open it&rdquo;
            </p>
            <p style={{ color: '#16a34a', fontWeight: 600, fontSize: '0.9rem' }}>
              ✅ Drop your .vce file here — practice free, no software needed
            </p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '0.75rem' }}>
              &ldquo;I have a PDF with 200 questions but I keep flipping to the answer key at the back&rdquo;
            </p>
            <p style={{ color: '#16a34a', fontWeight: 600, fontSize: '0.9rem' }}>
              ✅ Upload it — get instant feedback and explanations per question
            </p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default' }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '0.75rem' }}>
              &ldquo;Free practice sites want me to create an account and give my email&rdquo;
            </p>
            <p style={{ color: '#16a34a', fontWeight: 600, fontSize: '0.9rem' }}>
              ✅ Zero signup. Click and start. Your data stays in your browser.
            </p>
          </div>
        </div>
      </section>

      {/* Upload CTA */}
      <section className="container" style={{ paddingBottom: '1.5rem' }}>
        <Link href="/upload" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="upload-cta">
            <span style={{ fontSize: '2.5rem' }}>🏆</span>
            <h3 style={{ marginTop: '0.5rem', fontWeight: 700 }}>Free VCE Player — In Your Browser</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem', maxWidth: '500px', margin: '0.25rem auto 0' }}>
              Drop your VCE, PDF, DOCX, or TXT file. We parse the questions and turn them into an interactive quiz — instantly. No download, no install.
            </p>
            <span className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Upload Your File →
            </span>
          </div>
        </Link>
      </section>

      {/* Ad Slot */}
      <div className="container">
        <div className="ad-slot">Ad Space — 728×90</div>
      </div>

      {/* Exam Grid */}
      <section className="container" style={{ paddingBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          📚 Pre-Built Practice Exams
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Don&apos;t have your own questions? Start with our curated question banks. Study mode gives instant feedback, timed mode simulates the real exam.
        </p>
        <div className="exam-grid">
          {exams.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container" style={{ paddingBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
          ⚡ How It Works
        </h2>
        <div className="exam-grid">
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>📄</span>
            <h3 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>1. Upload</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Drop your VCE, PDF, DOCX, or TXT file — or paste questions directly
            </p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>🔍</span>
            <h3 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>2. Parse</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              We extract questions, options, and answers automatically — all in your browser
            </p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default', textAlign: 'center' }}>
            <span style={{ fontSize: '2rem' }}>🎯</span>
            <h3 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>3. Practice</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Choose Study or Timed mode. Get feedback, explanations, and domain scores
            </p>
          </div>
        </div>
      </section>

      {/* Features / Why CertQuiz */}
      <section className="container" style={{ paddingBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
          ✨ Why CertQuiz?
        </h2>
        <div className="exam-grid">
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>🔓 No Paywall</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Unlike VCE Simulator ($40), CertQuiz is <strong>free forever</strong>. No trial, no subscription, no limits.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>📱 Works Everywhere</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Phone, tablet, laptop — practice anywhere. VCE Simulator is desktop-only. CertQuiz works in any browser.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>🔒 100% Private</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Your files are parsed <strong>entirely in your browser</strong>. Nothing is uploaded to any server. Zero data collection.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>📊 Know Your Weak Spots</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Results break down your score by domain so you know exactly where to focus your study time.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>💡 Learn As You Go</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Study Mode shows the correct answer and detailed explanation <strong>instantly</strong> after each question.
            </p>
          </div>
          <div className="glass-card" style={{ padding: '1.5rem', cursor: 'default' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>📁 Any Format</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              VCE, PDF, DOCX, TXT, or paste text directly. One tool replaces multiple apps.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
