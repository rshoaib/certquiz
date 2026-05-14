'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ResultsPage() {
  const params = useParams();
  const examId = params.examId;
  const [result, setResult] = useState(null);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('certquiz_last_result');
    if (!stored) return;
    const parsed = JSON.parse(stored);
    setTimeout(() => setResult(parsed), 0);
  }, []);

  if (!result) {
    return (
      <div className="results-layout text-center">
        <div className="loading-spinner" />
        <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Loading results...</p>
        <Link href="/" className="btn btn-primary mt-xl">
          ← Back to Home
        </Link>
      </div>
    );
  }

  const passed = result.score >= 83;
  const domainEntries = Object.entries(result.domainScores).sort(
    ([a], [b]) => a.localeCompare(b)
  );

  // Find incorrect questions
  const incorrectQuestions = result.questions
    .map((q, i) => ({ ...q, index: i, userAnswer: result.answers[i] }))
    .filter((q) => q.userAnswer !== q.correctAnswer);

  return (
    <div className="results-layout">
      {/* Banner */}
      <div className={`result-banner ${passed ? 'pass' : 'fail'}`}>
        <div className="result-emoji">{passed ? '🎉' : '📚'}</div>
        <h2>{passed ? 'Congratulations! You Passed!' : 'Keep Studying!'}</h2>
        <div className={`result-score ${passed ? 'pass-color' : 'fail-color'}`}>
          {result.score}%
        </div>
        <p className="result-subtitle">
          {result.correct} out of {result.total} correct •{' '}
          {result.mode === 'timed' ? 'Timed' : 'Study'} Mode •{' '}
          Passing: {83}%
        </p>
      </div>

      {/* Ad Slot */}
      <div className="ad-slot">Ad Space — 728×90</div>

      {/* Domain Breakdown */}
      <div className="domain-breakdown">
        <h3>📊 Score by Domain</h3>
        {domainEntries.map(([key, domain]) => {
          const pct = domain.total > 0
            ? Math.round((domain.correct / domain.total) * 100)
            : 0;
          const barClass = pct >= 83 ? 'good' : pct >= 60 ? 'okay' : 'weak';

          return (
            <div key={key} className="domain-item">
              <div className="domain-item-header">
                <span className="domain-item-name">{domain.name}</span>
                <span className="domain-item-score">
                  {domain.correct}/{domain.total} ({pct}%)
                </span>
              </div>
              <div className="domain-bar">
                <div
                  className={`domain-bar-fill ${barClass}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Weak Areas */}
      {domainEntries.some(([, d]) => d.total > 0 && (d.correct / d.total) < 0.7) && (
        <div className="glass-card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
          <h3 style={{ marginBottom: '0.75rem' }}>🎯 Focus Areas</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            Consider reviewing these domains where you scored below 70%:
          </p>
          <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: '1.25rem' }}>
            {domainEntries
              .filter(([, d]) => d.total > 0 && (d.correct / d.total) < 0.7)
              .map(([key, d]) => (
                <li key={key} style={{ marginBottom: '0.35rem' }}>
                  <strong style={{ color: 'var(--accent-coral)' }}>{d.name}</strong>{' '}
                  — {Math.round((d.correct / d.total) * 100)}%
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* Review Incorrect */}
      {incorrectQuestions.length > 0 && (
        <div className="review-section">
          <h3 onClick={() => setShowReview(!showReview)}>
            {showReview ? '▼' : '▶'} Review Incorrect Answers ({incorrectQuestions.length})
          </h3>
          {showReview &&
            incorrectQuestions.map((q) => {
              const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
              return (
                <div key={q.id} className="review-item">
                  <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                    Q{q.index + 1}: {q.question}
                  </p>
                  <p className="your-answer">
                    ✗ Your answer: {letters[q.userAnswer]}. {q.options[q.userAnswer]}
                  </p>
                  <p className="correct-answer">
                    ✓ Correct: {letters[q.correctAnswer]}. {q.options[q.correctAnswer]}
                  </p>
                  <div className="explanation-panel" style={{ marginTop: '0.75rem' }}>
                    <h4>💡 Explanation</h4>
                    <p>{q.explanation}</p>
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* Actions */}
      <div className="text-center mt-xl" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href={`/quiz/${examId}`} className="btn btn-primary btn-lg">
          🔄 Retake Quiz
        </Link>
        <Link href="/" className="btn btn-secondary btn-lg">
          ← Back to Exams
        </Link>
      </div>
    </div>
  );
}
