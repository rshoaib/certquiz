export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <p>© {year} CertQuiz — Free IT Certification Practice Tests</p>
        <p className="mt-sm">
          Not affiliated with CompTIA, Cisco, Microsoft, or AWS.
          All trademarks belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}
