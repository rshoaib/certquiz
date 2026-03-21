import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const GA_ID = 'G-44E1HZH6GD';

export const metadata = {
  metadataBase: new URL('https://www.getcertquiz.com'),
  alternates: { canonical: '/' },
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
  verification: {
    google: 'Ee-d9A3yAjf5auMga7NrrumgIOzByyEb3vtTnhQsgAE',
  },
  openGraph: {
    title: 'CertQuiz — Free IT Certification Practice Tests',
    description:
      'Pass your next IT certification exam with free practice tests. Security+, Azure, AWS, CCNA and more.',
    type: 'website',
    siteName: 'CertQuiz',
    locale: 'en_US',
    url: 'https://www.getcertquiz.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CertQuiz — Free IT Certification Practice Tests',
    description: 'Free practice tests for CompTIA Security+, Azure, AWS, CCNA and more.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
