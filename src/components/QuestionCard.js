'use client';

export default function QuestionCard({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelectAnswer,
  showExplanation,
  isFlagged,
  onToggleFlag,
}) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  const getOptionClass = (index) => {
    if (!showExplanation) {
      return selectedAnswer === index ? 'option-btn selected' : 'option-btn';
    }
    // Show correct/incorrect after answer reveal
    if (index === question.correctAnswer) return 'option-btn correct disabled';
    if (selectedAnswer === index && index !== question.correctAnswer)
      return 'option-btn incorrect disabled';
    return 'option-btn disabled';
  };

  const getIndicatorClass = (index) => {
    if (!showExplanation) {
      return selectedAnswer === index ? 'option-indicator' : 'option-indicator';
    }
    return 'option-indicator';
  };

  return (
    <div className="question-card glass-card" key={question.id}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span className="question-domain-badge">
          Domain {question.domainNumber}: {question.domain}
        </span>
        <button
          className={`flag-btn ${isFlagged ? 'flagged' : ''}`}
          onClick={onToggleFlag}
          title={isFlagged ? 'Remove flag' : 'Flag for review'}
        >
          {isFlagged ? '🚩' : '🏳️'}
        </button>
      </div>

      <p className="question-text">
        <span className="question-number">Q{questionIndex + 1}/{totalQuestions}</span>
        {question.question}
      </p>

      <div className="options-list">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={getOptionClass(index)}
            onClick={() => !showExplanation && onSelectAnswer(index)}
            disabled={showExplanation}
          >
            <span className={getIndicatorClass(index)}>{letters[index]}</span>
            <span>{option}</span>
          </button>
        ))}
      </div>

      {showExplanation && (
        <div className="explanation-panel">
          <h4>💡 Explanation</h4>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
