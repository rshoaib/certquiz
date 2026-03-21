export const metadata = {
  title: 'Privacy Policy — CertQuiz',
  description:
    'CertQuiz privacy policy. Learn how we handle your data — spoiler: we don\'t collect it. All file processing happens in your browser.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '740px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Privacy Policy</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>1. Introduction</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          CertQuiz (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website{' '}
          <strong>getcertquiz.com</strong>. This Privacy Policy describes how we collect, use, and protect your
          information when you use our free IT certification practice test platform.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>2. Information We Collect</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
          <strong>We do not collect personal information.</strong> CertQuiz is designed with privacy at its core:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: '1.5rem' }}>
          <li><strong>No account required</strong> — We do not ask for your name, email, or any personal details to use the platform</li>
          <li><strong>No file uploads to servers</strong> — All files (VCE, PDF, DOCX, TXT) are parsed entirely in your browser using JavaScript. No file data is ever sent to our servers</li>
          <li><strong>No cookies for tracking</strong> — We do not use cookies to track your browsing behavior across sites</li>
          <li><strong>Quiz data stays local</strong> — Your quiz results and progress are stored in your browser&apos;s local/session storage only</li>
        </ul>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>3. Analytics</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          We use <strong>Google Analytics 4</strong> to understand how visitors use our site (page views, device types,
          traffic sources). Google Analytics may use cookies to collect anonymized, aggregated data. This data does not
          identify you personally. You can opt out of Google Analytics by installing the{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
            Google Analytics Opt-out Browser Add-on
          </a>.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>4. Advertising</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          We may display advertisements through <strong>Google AdSense</strong> to support the free operation of
          CertQuiz. These ads may use cookies to serve relevant content based on your browsing activity. You can
          manage your ad preferences through{' '}
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
            Google Ads Settings
          </a>.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>5. Third-Party Links</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Our site may contain links to third-party websites (certification vendors, study resources, etc.).
          We are not responsible for the privacy practices of these external sites.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>6. Children&apos;s Privacy</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          CertQuiz is not directed to children under 13. We do not knowingly collect information from children.
          If you believe a child has provided information through our site, please{' '}
          <a href="/contact" style={{ color: 'var(--primary)' }}>contact us</a> and we will address the concern.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>7. Data Security</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Since CertQuiz processes all data client-side and does not store personal information on servers,
          the risk of data breach is minimal. Our website is served over HTTPS with SSL encryption.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>8. Changes to This Policy</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
          &quot;Last updated&quot; date. Your continued use of CertQuiz after any changes constitutes acceptance of the
          updated policy.
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginTop: '1rem' }}>
          If you have questions about this Privacy Policy, please <a href="/contact" style={{ color: 'var(--primary)' }}>contact us</a>.
        </p>
      </div>
    </div>
  );
}
