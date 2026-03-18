import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'CertQuiz — Free IT Certification Practice Tests',
  description:
    'Practice for CompTIA Security+, AWS, Azure, CCNA and more with free, interactive practice exams. Timed and study modes with instant feedback and detailed explanations.',
  keywords: [
    'free practice test',
    'CompTIA Security+',
    'SY0-701 practice exam',
    'IT certification',
    'CCNA practice test',
    'Azure practice exam',
    'AWS certification practice',
    'free exam questions',
  ],
  openGraph: {
    title: 'CertQuiz — Free IT Certification Practice Tests',
    description:
      'Pass your next IT certification exam with free practice tests. Security+, Azure, AWS, CCNA and more.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
