'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import QuestionCard from '@/components/QuestionCard';
import Timer from '@/components/Timer';
import ProgressBar from '@/components/ProgressBar';
import { shuffleArray, saveQuizResult } from '@/lib/questions';
import securityPlusData from '@/data/security-plus.json';

export default function QuizClient() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const examId = params.examId;

  // Check for pre-selected mode from URL (used by upload page)
  const urlMode = searchParams.get('mode');
  const [mode, setMode] = useState(urlMode === 'study' || urlMode === 'timed' ? urlMode : null);
  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [showExplanation, setShowExplanation] = useState({});
  const [quizComplete, setQuizComplete] = useState(false);

  // Load exam data
  useEffect(() => {
    if (examId === 'security-plus-sy0-701') {
      setExam(securityPlusData.exam);
      setQuestions(shuffleArray(securityPlusData.questions));
    } else if (examId === 'custom-upload') {
      // Load custom quiz from sessionStorage
      const stored = sessionStorage.getItem('certquiz_custom_quiz');
      if (stored) {
        const customData = JSON.parse(stored);
        setExam(customData.exam);
        setQuestions(shuffleArray(customData.questions));
      }
    }
  }, [examId]);


  const handleSelectAnswer = useCallback((optionIndex) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));

    if (mode === 'study') {
      setShowExplanation((prev) => ({ ...prev, [currentIndex]: true }));
    }
  }, [currentIndex, mode]);

  const handleToggleFlag = useCallback(() => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(currentIndex)) {
        next.delete(currentIndex);
      } else {
        next.add(currentIndex);
      }
      return next;
    });
  }, [currentIndex]);

  const handleTimeUp = useCallback(() => {
    handleSubmitQuiz();
  }, []);

  const handleSubmitQuiz = useCallback(() => {
    if (!exam || questions.length === 0) return;

    // Calculate scores
    let correct = 0;
    const domainScores = {};

    questions.forEach((q, i) => {
      const domainKey = `Domain ${q.domainNumber}`;
      if (!domainScores[domainKey]) {
        domainScores[domainKey] = { name: q.domain, correct: 0, total: 0 };
      }
      domainScores[domainKey].total++;

      if (answers[i] === q.correctAnswer) {
        correct++;
        domainScores[domainKey].correct++;
      }
    });

    const score = Math.round((correct / questions.length) * 100);

    // Save result
    const result = {
      examId,
      examTitle: exam.title,
      score,
      correct,
      total: questions.length,
      mode,
      domainScores,
      answers: { ...answers },
      questions: questions.map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        domain: q.domain,
        domainNumber: q.domainNumber,
      })),
    };

    // Store result in sessionStorage for the results page
    sessionStorage.setItem('certquiz_last_result', JSON.stringify(result));
    saveQuizResult(result);

    router.push(`/results/${examId}`);
  }, [exam, questions, answers, mode, examId, router]);

  const goToQuestion = (index) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  };

  // Mode selection screen
  if (!mode) {
    return (
      <div className="quiz-layout">
        <div className="text-center" style={{ paddingTop: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            {exam?.icon} {exam?.title || 'Loading...'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {exam?.total_questions} questions • {exam?.passing_score}% to pass
          </p>

          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem' }}>
            Choose Your Mode
          </h2>

          <div className="mode-selector">
            <button className="mode-btn" onClick={() => setMode('study')}>
              <span className="mode-icon">📖</span>
              <span className="mode-name">Study Mode</span>
              <span className="mode-desc">See answer &amp; explanation after each question</span>
            </button>
            <button className="mode-btn" onClick={() => setMode('timed')}>
              <span className="mode-icon">⏱️</span>
              <span className="mode-name">Timed Mode</span>
              <span className="mode-desc">{exam?.time_limit_minutes}-minute countdown, real exam conditions</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!exam || questions.length === 0) {
    return (
      <div className="quiz-layout text-center">
        <div className="loading-spinner" />
        <p style={{ color: 'var(--text-secondary)' }}>Loading questions...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="quiz-layout">
      {/* Quiz Header */}
      <div className="quiz-header">
        <div className="quiz-info">
          <span className="question-counter">
            <strong>{currentIndex + 1}</strong> / {questions.length}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {answeredCount} answered
          </span>
        </div>
        {mode === 'timed' && (
          <Timer
            totalMinutes={exam.time_limit_minutes}
            onTimeUp={handleTimeUp}
            isRunning={!quizComplete}
          />
        )}
      </div>

      {/* Progress */}
      <ProgressBar current={currentIndex} total={questions.length} />

      {/* Question */}
      <QuestionCard
        question={currentQuestion}
        questionIndex={currentIndex}
        totalQuestions={questions.length}
        selectedAnswer={answers[currentIndex]}
        onSelectAnswer={handleSelectAnswer}
        showExplanation={!!showExplanation[currentIndex]}
        isFlagged={flagged.has(currentIndex)}
        onToggleFlag={handleToggleFlag}
      />

      {/* Navigation */}
      <div className="quiz-nav">
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => goToQuestion(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>

        <div className="quiz-nav-center">
          {questions.map((_, i) => (
            <button
              key={i}
              className={`dot-nav ${i === currentIndex ? 'active' : ''} ${
                answers[i] !== undefined ? 'answered' : ''
              } ${flagged.has(i) ? 'flagged-dot' : ''}`}
              onClick={() => goToQuestion(i)}
              title={`Question ${i + 1}${flagged.has(i) ? ' (flagged)' : ''}`}
            />
          ))}
        </div>

        {currentIndex === questions.length - 1 ? (
          <button className="btn btn-success btn-sm" onClick={handleSubmitQuiz}>
            Submit Quiz ✓
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => goToQuestion(currentIndex + 1)}
          >
            Next →
          </button>
        )}
      </div>

      {/* Submit anytime */}
      {answeredCount >= questions.length && currentIndex !== questions.length - 1 && (
        <div className="text-center mt-xl">
          <button className="btn btn-success btn-lg" onClick={handleSubmitQuiz}>
            All Questions Answered — Submit Quiz ✓
          </button>
        </div>
      )}
    </div>
  );
}
