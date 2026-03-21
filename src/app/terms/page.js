export const metadata = {
  title: 'Terms of Service — CertQuiz',
  description:
    'CertQuiz terms of service. Read the rules governing the use of our free IT certification practice test platform.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '740px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Terms of Service</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>1. Acceptance of Terms</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          By accessing and using CertQuiz (<strong>getcertquiz.com</strong>), you agree to be bound by these Terms of
          Service. If you do not agree with any part of these terms, you should not use the platform.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>2. Description of Service</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          CertQuiz provides a <strong>free, browser-based</strong> platform for practicing IT certification exam questions.
          The service includes:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Pre-built practice exams for popular certifications</li>
          <li>File upload and parsing (VCE, PDF, DOCX, TXT) for custom quizzes</li>
          <li>Study and timed quiz modes with instant feedback</li>
          <li>Blog content with study tips and exam preparation guides</li>
        </ul>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>3. Free Use & No Account Required</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          CertQuiz is provided <strong>free of charge</strong>. No registration, login, or payment is required to
          use any feature of the platform. We reserve the right to introduce optional paid features in the future,
          but core functionality will remain free.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>4. User Responsibilities</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          When using CertQuiz, you agree to:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: '1.5rem' }}>
          <li>Use the platform only for <strong>personal study and exam preparation</strong></li>
          <li>Not upload copyrighted content that you do not have the right to use</li>
          <li>Not attempt to disrupt, overload, or compromise the platform&apos;s availability</li>
          <li>Not use automated tools or bots to scrape content from the site</li>
          <li>Comply with all applicable laws and regulations in your jurisdiction</li>
        </ul>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>5. Intellectual Property</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          The CertQuiz name, logo, website design, and original content are the intellectual property of CertQuiz.
          Certification names (CompTIA Security+, Azure, AWS, CCNA, etc.) are trademarks of their respective owners.
          CertQuiz is <strong>not affiliated with or endorsed by</strong> any certification body.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>6. Content Disclaimer</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Practice questions on CertQuiz are for <strong>educational purposes only</strong> and do not represent actual
          certification exam content. We do not guarantee that using CertQuiz will result in passing any certification
          exam. Always refer to official certification resources for the most accurate and current exam information.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>7. Limitation of Liability</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          CertQuiz is provided &quot;as is&quot; without warranties of any kind, express or implied. We are not liable
          for any direct, indirect, incidental, or consequential damages arising from the use of our platform, including
          but not limited to exam results, file parsing errors, or service interruptions.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>8. Modifications</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with
          an updated date. Continued use of CertQuiz after any modifications constitutes acceptance of the revised terms.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>9. Contact</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          If you have questions about these Terms of Service, please <a href="/contact" style={{ color: 'var(--primary)' }}>contact us</a>.
        </p>
      </div>
    </div>
  );
}
