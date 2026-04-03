import QuizClient from './QuizClient';

export async function generateMetadata({ params }) {
  const { examId } = await params;

  const examMeta = {
    'security-plus-sy0-701': {
      title: 'Free CompTIA Security+ (SY0-701) Practice Test | CertQuiz',
      description:
        'Take a free CompTIA Security+ SY0-701 practice exam with 90+ questions across all 5 domains. Study mode with explanations or timed mode simulating real exam conditions. No signup required.',
      keywords: [
        'Security+ practice test free',
        'SY0-701 practice exam',
        'CompTIA Security+ quiz',
        'free Security+ exam questions',
        'SY0-701 study guide',
      ],
    },
  };

  const meta = examMeta[examId] || {
    title: 'Free Practice Test | CertQuiz',
    description:
      'Take a free IT certification practice test. Study mode with instant feedback or timed mode simulating real exam conditions.',
    keywords: ['practice test', 'certification exam', 'free quiz'],
  };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: `/quiz/${examId}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/quiz/${examId}`,
    },
  };
}

export default async function QuizPage({ params }) {
  const { examId } = await params;

  const examInfo = {
    'security-plus-sy0-701': {
      h1: 'Free CompTIA Security+ (SY0-701) Practice Test',
      intro:
        'Test your Security+ knowledge with 90+ questions across all 5 SY0-701 domains. Choose Study Mode for instant feedback and explanations, or Timed Mode to simulate real exam conditions. 100% free, no signup required.',
    },
  };

  const info = examInfo[examId];

  return (
    <>
      {info && (
        <div className="sr-only">
          <h1>{info.h1}</h1>
          <p>{info.intro}</p>
        </div>
      )}
      <QuizClient />
    </>
  );
}
