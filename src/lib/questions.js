import securityPlusData from '../data/security-plus.json';

/**
 * Fetch questions for an exam — uses local JSON data
 */
export async function getQuestions(examId) {
  if (examId === 'security-plus-sy0-701') {
    return securityPlusData.questions;
  }
  return [];
}

/**
 * Fetch exam metadata
 */
export async function getExam(examId) {
  if (examId === 'security-plus-sy0-701') {
    return securityPlusData.exam;
  }
  return null;
}

/**
 * Save quiz result to localStorage
 */
export async function saveQuizResult(result) {
  if (typeof window === 'undefined') return;
  const history = JSON.parse(localStorage.getItem('certquiz_history') || '[]');
  history.unshift({
    ...result,
    date: new Date().toISOString(),
  });
  localStorage.setItem('certquiz_history', JSON.stringify(history.slice(0, 50)));
}

/**
 * Get quiz history from localStorage
 */
export function getQuizHistory(examId) {
  if (typeof window === 'undefined') return [];
  const history = JSON.parse(localStorage.getItem('certquiz_history') || '[]');
  if (examId) return history.filter((h) => h.examId === examId);
  return history;
}

/**
 * Shuffle array using Fisher-Yates
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
