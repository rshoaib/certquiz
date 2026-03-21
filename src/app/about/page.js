import Link from 'next/link';

export const metadata = {
  title: 'About CertQuiz — Free IT Certification Practice Tests',
  description:
    'CertQuiz is a free, privacy-first platform for IT certification exam preparation. Upload VCE, PDF, or DOCX files and practice instantly — no signup, no paywall.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '740px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>About CertQuiz</h1>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Our Mission</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          CertQuiz was built to solve a simple problem: <strong>certification exam prep shouldn&apos;t cost a fortune</strong>.
          Too many aspiring IT professionals are blocked by $40+ exam simulators, mandatory signups, and desktop-only software
          just to practice with their own question files.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          We believe everyone deserves access to quality exam preparation tools — <strong>for free, without barriers</strong>.
          That&apos;s why CertQuiz runs entirely in your browser, requires no account, and never touches your data.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>What We Offer</h2>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: '1.5rem' }}>
          <li><strong>Free VCE Player</strong> — Open VCE files directly in your browser, no software needed</li>
          <li><strong>Multi-Format Support</strong> — Upload VCE, PDF, DOCX, TXT, or paste questions directly</li>
          <li><strong>Pre-Built Practice Exams</strong> — Curated question banks for CompTIA Security+, Azure, AWS, CCNA</li>
          <li><strong>Study & Timed Modes</strong> — Instant feedback with explanations, or simulate real exam conditions</li>
          <li><strong>Domain Score Breakdown</strong> — Know exactly which areas need more study</li>
          <li><strong>100% Private</strong> — All file parsing happens in your browser; nothing is sent to any server</li>
        </ul>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>How It Works</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          CertQuiz is a client-side web application built with modern technologies. When you upload a file, it is
          parsed <strong>entirely within your browser</strong> using JavaScript. We extract questions, options, correct
          answers, and explanations — then present them in an interactive quiz interface.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          No data is stored on our servers. No cookies track your behavior. No login wall blocks your access.
          We sustain the site through non-intrusive advertising that respects your experience.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Disclaimer</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          CertQuiz is an independent study tool and is <strong>not affiliated with, endorsed by, or associated with</strong> CompTIA,
          Cisco, Microsoft, Amazon Web Services, or any other certification body. All trademarks, certification names, and
          logos belong to their respective owners. Practice questions are for educational purposes only and do not represent
          actual exam content.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link href="/contact" className="btn btn-primary">Contact Us →</Link>
      </div>
    </div>
  );
}
