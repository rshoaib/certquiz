import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          <span className="logo-icon">⚡</span>
          <span>CertQuiz</span>
        </Link>
        <nav>
          <ul className="nav-links">
            <li><Link href="/">Exams</Link></li>
            <li><Link href="/upload">Upload</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><a href="https://github.com/rshoaib/certquiz" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
