'use client';

import Link from 'next/link';

export default function ExamCard({ exam }) {
  const isActive = exam.status === 'active';

  if (!isActive) {
    return (
      <div className={`glass-card exam-card coming-soon`}>
        <div className="exam-card-header">
          <span className="exam-card-icon">{exam.icon}</span>
          <span className="exam-card-badge badge-coming">Coming Soon</span>
        </div>
        <h3>{exam.title}</h3>
        <p>{exam.description}</p>
        <div className="exam-card-meta">
          <span>⏱️ {exam.time_limit_minutes} min</span>
          <span>📝 {exam.total_questions} questions</span>
          <span>🎯 {exam.passing_score}% to pass</span>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/quiz/${exam.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="glass-card exam-card">
        <div className="exam-card-header">
          <span className="exam-card-icon">{exam.icon}</span>
          <span className="exam-card-badge badge-active">Available</span>
        </div>
        <h3>{exam.title}</h3>
        <p>{exam.description}</p>
        <div className="exam-card-meta">
          <span>⏱️ {exam.time_limit_minutes} min</span>
          <span>📝 {exam.total_questions} questions</span>
          <span>🎯 {exam.passing_score}% to pass</span>
        </div>
      </div>
    </Link>
  );
}
