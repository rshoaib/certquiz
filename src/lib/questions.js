import { supabase } from './supabase';
import securityPlusData from '../data/security-plus.json';

/**
 * Fetch questions for an exam — falls back to local JSON if Supabase is not configured
 */
export async function getQuestions(examId) {
  // Try Supabase first
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('exam_id', examId)
        .order('domain_number', { ascending: true });

      if (!error && data && data.length > 0) {
        return data;
      }
    }
  } catch (e) {
    console.warn('Supabase fetch failed, using local data:', e.message);
  }

  // Fallback to local JSON
  if (examId === 'security-plus-sy0-701') {
    return securityPlusData.questions;
  }

  return [];
}

/**
 * Fetch exam metadata
 */
export async function getExam(examId) {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('id', examId)
        .single();

      if (!error && data) return data;
    }
  } catch (e) {
    console.warn('Supabase fetch failed, using local data:', e.message);
  }

  // Fallback to local JSON metadata
  if (examId === 'security-plus-sy0-701') {
    return securityPlusData.exam;
  }

  return null;
}

/**
 * Save quiz result — stores in both localStorage and Supabase (if configured)
 */
export async function saveQuizResult(result) {
  // Always save to localStorage
  const history = JSON.parse(localStorage.getItem('certquiz_history') || '[]');
  history.unshift({
    ...result,
    date: new Date().toISOString(),
  });
  // Keep only last 50 results
  localStorage.setItem('certquiz_history', JSON.stringify(history.slice(0, 50)));

  // Try saving to Supabase for analytics
  try {
    if (supabase) {
      await supabase.from('quiz_results').insert({
        exam_id: result.examId,
        score: result.score,
        domain_scores: result.domainScores,
        mode: result.mode,
      });
    }
  } catch (e) {
    // Silent fail — analytics are non-critical
  }
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
