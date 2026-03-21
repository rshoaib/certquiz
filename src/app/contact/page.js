export const metadata = {
  title: 'Contact Us — CertQuiz',
  description:
    'Get in touch with the CertQuiz team. Report issues, suggest features, or ask questions about our free IT certification practice test platform.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem', maxWidth: '740px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Contact Us</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Have a question, found a bug, or want to suggest a feature? We&apos;d love to hear from you.
      </p>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>📧 Email</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          For general inquiries, support, or feedback:
        </p>
        <p style={{ marginTop: '0.5rem' }}>
          <a href="mailto:support@getcertquiz.com" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            support@getcertquiz.com
          </a>
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>🐛 Report a Bug</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          If you&apos;ve found a bug or issue with the quiz engine, file parser, or website, please email us with:
        </p>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.9, paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>The browser and device you were using</li>
          <li>A description of the issue</li>
          <li>The file format you were trying to upload (if applicable)</li>
          <li>Screenshots, if possible</li>
        </ul>
      </div>

      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>💡 Feature Requests</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          Want to see a new certification exam added, or have an idea for improving CertQuiz?
          Send your suggestions to our email. We prioritize features based on community demand.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>⏱️ Response Time</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          We aim to respond to all inquiries within <strong>24–48 hours</strong> during business days.
          For urgent issues, please include &quot;URGENT&quot; in your email subject line.
        </p>
      </div>
    </div>
  );
}
