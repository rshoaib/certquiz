import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', marginBottom: '2rem', textAlign: 'left' }}>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>Practice</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href="/quiz/security-plus-sy0-701" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Security+ SY0-701</Link></li>
              <li><Link href="/upload" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Upload Questions</Link></li>
              <li><Link href="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>About</Link></li>
              <li><Link href="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><Link href="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</Link></li>
              <li><Link href="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', fontSize: '0.95rem' }}>More Free Tools</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="https://legalpolicygen.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Legal Policy Generator</a></li>
              <li><a href="https://onlineimageshrinker.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Image Compressor</a></li>
              <li><a href="https://tinypdftools.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>PDF Tools</a></li>
              <li><a href="https://dailysmartcalc.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Smart Calculators</a></li>
            </ul>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
          <p>© {year} CertQuiz — Free IT Certification Practice Tests</p>
          <p className="mt-sm">
            Not affiliated with CompTIA, Cisco, Microsoft, or AWS.
            All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
