'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { parseDocumentToQuestions, parseQuestionsFromText } from '@/lib/document-parser';

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'paste'
  const [pasteText, setPasteText] = useState('');

  const handleFile = useCallback(async (selectedFile) => {
    setFile(selectedFile);
    setError(null);
    setResult(null);
    setParsing(true);

    try {
      const parsed = await parseDocumentToQuestions(selectedFile);
      setResult(parsed);
      setQuizTitle(
        selectedFile.name
          .replace(/\.(pdf|docx?|txt|vce)$/i, '')
          .replace(/[_-]/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase())
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setParsing(false);
    }
  }, []);

  const handlePasteSubmit = useCallback(() => {
    if (!pasteText.trim()) return;
    setError(null);
    setResult(null);
    setParsing(true);

    try {
      const questions = parseQuestionsFromText(pasteText);
      if (questions.length === 0) {
        setError(
          'No questions found in the pasted text. Make sure your text uses a standard format:\n' +
          '1. Question text?\n   A) Option 1\n   B) Option 2\n   Answer: B'
        );
      } else {
        setResult({
          questions,
          totalExtracted: questions.length,
          withAnswers: questions.filter(q => q.hasCorrectAnswer).length,
          sourceFile: 'Pasted Text',
        });
        setQuizTitle('Custom Quiz');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setParsing(false);
    }
  }, [pasteText]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) handleFile(selectedFile);
  }, [handleFile]);

  const startQuiz = useCallback((mode) => {
    if (!result) return;

    const quizData = {
      exam: {
        id: 'custom-upload',
        title: quizTitle || 'Custom Quiz',
        description: `Uploaded from ${result.sourceFile}`,
        time_limit_minutes: Math.max(30, result.totalExtracted * 2),
        passing_score: 70,
        total_questions: result.totalExtracted,
        icon: '📄',
        status: 'active',
      },
      questions: result.questions.map((q, i) => ({
        ...q,
        id: q.id || `upload-q${i + 1}`,
      })),
    };

    sessionStorage.setItem('certquiz_custom_quiz', JSON.stringify(quizData));
    router.push(`/quiz/custom-upload?mode=${mode}`);
  }, [result, quizTitle, router]);

  return (
    <div className="upload-layout">
      <div className="text-center">
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          📄 Upload Your Questions
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          Upload a VCE, PDF, Word, or text file — or paste questions directly.
          We&apos;ll convert them into an interactive quiz instantly. 100% client-side, your data never leaves your browser.
        </p>
      </div>

      {/* Tabs */}
      <div className="upload-tabs">
        <button
          className={`upload-tab ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
        >
          📁 Upload File
        </button>
        <button
          className={`upload-tab ${activeTab === 'paste' ? 'active' : ''}`}
          onClick={() => setActiveTab('paste')}
        >
          📋 Paste Text
        </button>
      </div>

      {/* Upload Tab */}
      {activeTab === 'upload' && (
        <div
          className={`upload-dropzone ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.vce"
            onChange={handleInputChange}
            style={{ display: 'none' }}
            id="file-upload-input"
          />

          {parsing ? (
            <div className="upload-status">
              <div className="loading-spinner" />
              <p style={{ marginTop: '1rem', fontWeight: 600 }}>Parsing your document...</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Extracting questions and answers
              </p>
            </div>
          ) : file && !error ? (
            <div className="upload-status">
              <span style={{ fontSize: '3rem' }}>✅</span>
              <p style={{ fontWeight: 600, marginTop: '0.5rem' }}>{file.name}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                {(file.size / 1024).toFixed(1)} KB • Click to upload a different file
              </p>
            </div>
          ) : (
            <div className="upload-status">
              <span style={{ fontSize: '3rem' }}>📁</span>
              <p style={{ fontWeight: 600, marginTop: '0.5rem' }}>
                {isDragging ? 'Drop your file here' : 'Drag & drop your file here'}
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                or click to browse • <strong>VCE</strong>, PDF, DOCX, TXT
              </p>
            </div>
          )}
        </div>
      )}

      {/* Paste Tab */}
      {activeTab === 'paste' && (
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <textarea
            className="upload-textarea"
            value={pasteText}
            onChange={(e) => setPasteText(e.target.value)}
            placeholder={`Paste your questions here. Example format:\n\n1. What is the primary function of a firewall?\nA) Encrypt data at rest\nB) Filter network traffic based on rules\nC) Authenticate users\nD) Compress data for storage\nAnswer: B\nExplanation: A firewall monitors and filters...\n\n2. Which encryption algorithm is asymmetric?\nA) AES\nB) DES\nC) RSA\nD) Blowfish\nAnswer: C`}
            rows={14}
            id="paste-questions-input"
          />
          <div className="text-center" style={{ marginTop: '1rem' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={handlePasteSubmit}
              disabled={!pasteText.trim()}
            >
              🔍 Parse Questions
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="upload-error">
          <h4>⚠️ Parsing Issue</h4>
          <p style={{ whiteSpace: 'pre-line' }}>{error}</p>
          {error.includes('VCE') && activeTab === 'upload' && (
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '1rem' }}
              onClick={() => setActiveTab('paste')}
            >
              📋 Switch to Paste Mode
            </button>
          )}
        </div>
      )}

      {/* Results Preview */}
      {result && (
        <div className="upload-results glass-card">
          <h3 style={{ marginBottom: '1rem' }}>🎉 Questions Found!</h3>

          <div className="upload-stats">
            <div className="upload-stat">
              <div className="upload-stat-value">{result.totalExtracted}</div>
              <div className="upload-stat-label">Questions</div>
            </div>
            <div className="upload-stat">
              <div className="upload-stat-value">{result.withAnswers}</div>
              <div className="upload-stat-label">With Answers</div>
            </div>
            <div className="upload-stat">
              <div className="upload-stat-value">
                {result.totalExtracted - result.withAnswers}
              </div>
              <div className="upload-stat-label">No Answer Key</div>
            </div>
          </div>

          {/* Quiz Title */}
          <div style={{ marginTop: '1.5rem' }}>
            <label
              htmlFor="quiz-title"
              style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}
            >
              Quiz Title
            </label>
            <input
              id="quiz-title"
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="upload-title-input"
              placeholder="e.g. CompTIA A+ Chapter 3 Review"
            />
          </div>

          {/* Preview first 3 questions */}
          <div className="upload-preview">
            <h4 style={{ marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Preview (first 3 questions)
            </h4>
            {result.questions.slice(0, 3).map((q, i) => (
              <div key={i} className="upload-preview-item">
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.35rem' }}>
                  Q{i + 1}: {q.question}
                </p>
                <div style={{ paddingLeft: '1rem' }}>
                  {q.options.map((opt, j) => (
                    <p
                      key={j}
                      style={{
                        fontSize: '0.85rem',
                        color: j === q.correctAnswer ? '#16a34a' : 'var(--text-secondary)',
                        fontWeight: j === q.correctAnswer ? 600 : 400,
                      }}
                    >
                      {String.fromCharCode(65 + j)}. {opt}
                      {j === q.correctAnswer && ' ✓'}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Start Buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              marginTop: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <button className="btn btn-primary btn-lg" onClick={() => startQuiz('study')}>
              📖 Start Study Mode
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => startQuiz('timed')}>
              ⏱️ Start Timed Mode
            </button>
          </div>
        </div>
      )}

      {/* Supported Formats */}
      <div className="upload-formats glass-card">
        <h3 style={{ marginBottom: '1rem' }}>📋 Supported Formats</h3>
        <div className="format-badges">
          <span className="format-badge vce">🏆 VCE Files</span>
          <span className="format-badge">PDF</span>
          <span className="format-badge">DOCX</span>
          <span className="format-badge">TXT</span>
          <span className="format-badge">Paste</span>
        </div>
        <div className="format-example" style={{ marginTop: '1rem' }}>
          <pre>{`1. What is the primary function of a firewall?
   A) Encrypt data at rest
   B) Filter network traffic based on rules
   C) Authenticate users
   D) Compress data for storage
   Answer: B
   Explanation: A firewall monitors and filters...`}</pre>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem' }}>
          <strong>VCE files:</strong> Drop your .vce file directly — no VCE Simulator needed.
          If your VCE is encrypted, open it in your VCE player and paste the questions in the Paste tab.
        </p>
      </div>

      {/* Privacy Note */}
      <div className="text-center" style={{ marginTop: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          🔒 <strong>100% Private</strong> — Your document is processed entirely in your browser.
          Nothing is uploaded to any server.
        </p>
      </div>
    </div>
  );
}
