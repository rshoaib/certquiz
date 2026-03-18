/**
 * Document Parser — Client-Side PDF & DOCX → Quiz Questions
 *
 * Extracts questions and answers from uploaded documents using
 * pattern matching. Supports multiple common Q&A formats.
 */

/**
 * Parse text content into structured quiz questions.
 * Handles these common patterns:
 *
 * Pattern 1:  1. Question text?  A) Option  B) Option  C) Option  D) Option  Answer: B
 * Pattern 2:  Q1: Question text?  (A) Option  (B) Option  Answer: A
 * Pattern 3:  1. Question text?  a. Option  b. Option  c. Option  d. Option  Correct: c
 */
export function parseQuestionsFromText(text) {
  // Normalize line endings and clean
  const cleaned = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/\u00A0/g, ' ')  // non-breaking spaces
    .replace(/ {3,}/g, '  '); // reduce excessive spaces

  // Try to split into question blocks
  const questions = [];

  // Strategy 1: Split by question number patterns
  // Match: "1.", "1)", "Q1.", "Q1:", "Q1)", "Question 1", etc.
  const questionPattern = /(?:^|\n)(?:\s*)(?:(?:Q(?:uestion)?\s*\.?\s*)?(\d{1,3})\s*[\.\)\:\-]|\b(?:Question)\s+(\d{1,3})\b)/gi;
  const matches = [...cleaned.matchAll(questionPattern)];

  if (matches.length >= 2) {
    // We found numbered questions — extract blocks
    for (let i = 0; i < matches.length; i++) {
      const start = matches[i].index;
      const end = i + 1 < matches.length ? matches[i + 1].index : cleaned.length;
      const block = cleaned.substring(start, end).trim();
      const parsed = parseQuestionBlock(block);
      if (parsed) {
        questions.push({ ...parsed, id: `upload-q${questions.length + 1}` });
      }
    }
  }

  // Strategy 2: If no numbered questions found, try double-newline splitting
  if (questions.length === 0) {
    const blocks = cleaned.split(/\n{2,}/);
    let currentBlock = '';

    for (const block of blocks) {
      currentBlock += (currentBlock ? '\n\n' : '') + block;

      // Check if this accumulated block has both a question and options
      if (hasOptions(currentBlock)) {
        const parsed = parseQuestionBlock(currentBlock);
        if (parsed) {
          questions.push({ ...parsed, id: `upload-q${questions.length + 1}` });
          currentBlock = '';
        }
      }
    }
  }

  return questions;
}

/**
 * Parse a single question block into structured data.
 */
function parseQuestionBlock(block) {
  const lines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length < 3) return null; // Need at least question + 2 options

  let questionText = '';
  const options = [];
  let correctAnswer = -1;
  let explanation = '';
  let parsingPhase = 'question'; // question → options → answer → explanation

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if this line is an option
    const optionMatch = line.match(
      /^\s*(?:\(?([A-Fa-f])\)?[\.\)\:\-\s]|([A-Fa-f])[\.\)\:\-]\s)/
    );

    // Check if this line is an answer indicator
    const answerMatch = line.match(
      /^\s*(?:Answer|Correct|Correct Answer|Key|Ans)[\s\:\.\-]+\(?([A-Fa-f])\)?\s*/i
    );

    // Check if marked with asterisk or bold (correct answer indicator)
    const starredOption = line.match(
      /^\s*(?:\*+\s*)?(?:\(?([A-Fa-f])\)?[\.\)\:\-\s])/
    );
    const isStarred = line.includes('*') || line.includes('✓') || line.includes('✔') || line.includes('→');

    // Check if this is an explanation line
    const explanationMatch = line.match(
      /^\s*(?:Explanation|Rationale|Why|Reason|Note)[\s\:\.\-]+(.*)/i
    );

    if (answerMatch) {
      parsingPhase = 'answer';
      correctAnswer = answerMatch[1].toUpperCase().charCodeAt(0) - 65;
    } else if (explanationMatch) {
      parsingPhase = 'explanation';
      explanation = explanationMatch[1] || '';
    } else if (parsingPhase === 'explanation') {
      // Continue collecting explanation text
      explanation += ' ' + line;
    } else if (optionMatch) {
      parsingPhase = 'options';
      const letter = (optionMatch[1] || optionMatch[2]).toUpperCase();
      const optionText = line
        .replace(/^\s*(?:\(?[A-Fa-f]\)?[\.\)\:\-\s]+)/, '')
        .replace(/\s*[\*✓✔→]+\s*$/, '')
        .trim();

      const index = letter.charCodeAt(0) - 65;

      // Ensure options array is large enough
      while (options.length <= index) options.push('');
      options[index] = optionText;

      // If this option is marked as correct
      if (isStarred) {
        correctAnswer = index;
      }
    } else if (parsingPhase === 'question') {
      // Strip question number prefix
      const cleaned = line
        .replace(/^\s*(?:Q(?:uestion)?\s*\.?\s*)?\d{1,3}\s*[\.\)\:\-]\s*/, '')
        .replace(/^\s*Question\s+\d{1,3}\s*[\.\)\:\-]?\s*/i, '')
        .trim();
      questionText += (questionText ? ' ' : '') + cleaned;
    }
  }

  // Validate we have enough data
  if (!questionText || options.length < 2) return null;

  // Filter out empty options
  const validOptions = options.filter(o => o.length > 0);
  if (validOptions.length < 2) return null;

  // If we still don't have the correct answer, try looking in the question block
  // for inline answer patterns
  if (correctAnswer === -1) {
    const inlineAnswer = block.match(
      /(?:Answer|Correct|Key|Ans)[\s\:\.\=]+\(?([A-Fa-f])\)?/i
    );
    if (inlineAnswer) {
      correctAnswer = inlineAnswer[1].toUpperCase().charCodeAt(0) - 65;
    }
  }

  return {
    question: questionText,
    options: validOptions,
    correctAnswer: correctAnswer >= 0 && correctAnswer < validOptions.length ? correctAnswer : 0,
    explanation: explanation.trim() || 'No explanation provided.',
    domain: 'Custom Upload',
    domainNumber: 0,
    hasCorrectAnswer: correctAnswer >= 0,
  };
}

/**
 * Check if text contains option markers (A, B, C, D patterns)
 */
function hasOptions(text) {
  const optionCount = (text.match(/(?:^|\n)\s*(?:\(?[A-Da-d]\)?[\.\)\:\-\s])/g) || []).length;
  return optionCount >= 2;
}

/**
 * Extract text from a PDF file using pdf.js
 */
export async function extractTextFromPDF(file) {
  const pdfjsLib = await import('pdfjs-dist');

  // Set worker source
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const textContent = await page.getTextContent();
    const pageText = textContent.items
      .map(item => item.str)
      .join(' ');
    fullText += pageText + '\n\n';
  }

  return fullText;
}

/**
 * Extract text from a DOCX file using mammoth
 */
export async function extractTextFromDOCX(file) {
  const mammoth = await import('mammoth');
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

/**
 * Extract questions from a VCE file.
 * VCE files can be ZIP archives containing XML/text data,
 * or encrypted SQLite databases (newer versions).
 *
 * Strategy:
 * 1. Try to open as ZIP and extract XML question data
 * 2. Try to find text/plain content inside the ZIP
 * 3. If encrypted/unreadable, provide guidance
 */
export async function extractTextFromVCE(file) {
  const JSZip = (await import('jszip')).default;
  const arrayBuffer = await file.arrayBuffer();

  try {
    const zip = await JSZip.loadAsync(arrayBuffer);
    let allText = '';
    let foundXML = false;

    // Look through all files in the ZIP
    const fileNames = Object.keys(zip.files);

    for (const fileName of fileNames) {
      const zipEntry = zip.files[fileName];
      if (zipEntry.dir) continue;

      const lowerName = fileName.toLowerCase();

      // Try XML files first (VCE exam data)
      if (lowerName.endsWith('.xml') || lowerName.endsWith('.exam') || lowerName.endsWith('.dat')) {
        try {
          const content = await zipEntry.async('string');
          const xmlQuestions = parseVCEXml(content);
          if (xmlQuestions) {
            foundXML = true;
            allText += xmlQuestions + '\n\n';
          }
        } catch { /* skip unreadable files */ }
      }

      // Try text files
      if (lowerName.endsWith('.txt') || lowerName.endsWith('.csv') || lowerName.endsWith('.json')) {
        try {
          const content = await zipEntry.async('string');
          allText += content + '\n\n';
        } catch { /* skip */ }
      }
    }

    // If no XML found, try reading ALL files as text
    if (!foundXML && !allText.trim()) {
      for (const fileName of fileNames) {
        const zipEntry = zip.files[fileName];
        if (zipEntry.dir) continue;
        try {
          const content = await zipEntry.async('string');
          // Only add if it looks like it has readable text
          if (content && /[A-Za-z]{3,}/.test(content)) {
            allText += content + '\n\n';
          }
        } catch { /* skip binary files */ }
      }
    }

    if (allText.trim().length > 20) {
      return allText;
    }

    // ZIP opened but no readable content found — likely encrypted
    throw new Error(
      'This VCE file appears to be encrypted (newer VCE format with AES-256).\n\n' +
      'Try one of these alternatives:\n' +
      '• Open the VCE file in your VCE player, then copy/paste the questions into the text box below\n' +
      '• Convert the VCE to PDF using an online converter, then upload the PDF\n' +
      '• Export the questions as a text file from your VCE software'
    );

  } catch (zipError) {
    // Not a valid ZIP — try reading as raw text
    if (zipError.message.includes('encrypted') || zipError.message.includes('alternatives')) {
      throw zipError;
    }

    try {
      const text = await file.text();
      if (text && text.trim().length > 20 && /[A-Za-z]{3,}/.test(text)) {
        return text;
      }
    } catch { /* not text either */ }

    throw new Error(
      'Could not read this VCE file. It may use an encrypted format.\n\n' +
      'Try one of these alternatives:\n' +
      '• Open the VCE file in your VCE player, then copy/paste the questions into the text box below\n' +
      '• Convert the VCE to PDF using an online converter, then upload the PDF\n' +
      '• Export the questions as a text file from your VCE software'
    );
  }
}

/**
 * Parse VCE-style XML content into text format.
 * VCE XML typically uses tags like:
 * <QUESTION>, <QUESTION_TEXT>, <ANSWER>, <ANSWER_EXPLANATION>,
 * <CHOICE>, <CHOICE_TEXT>, <CORRECT>
 */
function parseVCEXml(xmlContent) {
  // Simple XML tag extraction (no DOMParser needed for basic patterns)
  const questions = [];

  // Pattern 1: <QUESTION>...</QUESTION> blocks
  const questionBlocks = xmlContent.match(/<QUESTION[^>]*>[\s\S]*?<\/QUESTION>/gi) || [];

  for (const block of questionBlocks) {
    let qText = extractTag(block, 'QUESTION_TEXT') || extractTag(block, 'TEXT') || '';
    const choices = [];
    let correctIndex = -1;
    let explanation = extractTag(block, 'ANSWER_EXPLANATION') || extractTag(block, 'EXPLANATION') || '';

    // Extract choices
    const choiceBlocks = block.match(/<CHOICE[^>]*>[\s\S]*?<\/CHOICE>/gi) ||
                          block.match(/<ANSWER[^>]*>[\s\S]*?<\/ANSWER>/gi) || [];

    for (let i = 0; i < choiceBlocks.length; i++) {
      const choiceText = extractTag(choiceBlocks[i], 'CHOICE_TEXT') ||
                          extractTag(choiceBlocks[i], 'TEXT') ||
                          stripTags(choiceBlocks[i]);
      if (choiceText) choices.push(choiceText.trim());

      // Check if this is the correct answer
      const isCorrect = extractTag(choiceBlocks[i], 'CORRECT') || '';
      if (isCorrect.toLowerCase() === 'true' || isCorrect === '1') {
        correctIndex = i;
      }
    }

    if (qText && choices.length >= 2) {
      let formatted = `${questions.length + 1}. ${stripTags(qText).trim()}\n`;
      choices.forEach((c, i) => {
        formatted += `${String.fromCharCode(65 + i)}) ${stripTags(c).trim()}\n`;
      });
      if (correctIndex >= 0) {
        formatted += `Answer: ${String.fromCharCode(65 + correctIndex)}\n`;
      }
      if (explanation) {
        formatted += `Explanation: ${stripTags(explanation).trim()}\n`;
      }
      questions.push(formatted);
    }
  }

  // Pattern 2: Simple tag-based format
  if (questions.length === 0) {
    // Try less structured XML
    const items = xmlContent.match(/<item[^>]*>[\s\S]*?<\/item>/gi) || [];
    for (const item of items) {
      const text = stripTags(item);
      if (text.length > 20) questions.push(text);
    }
  }

  return questions.length > 0 ? questions.join('\n\n') : null;
}

/**
 * Extract content between XML tags
 */
function extractTag(xml, tagName) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = xml.match(regex);
  return match ? match[1] : null;
}

/**
 * Strip HTML/XML tags from content
 */
function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

/**
 * Main entry: parse a file into quiz questions
 */
export async function parseDocumentToQuestions(file) {
  const fileName = file.name.toLowerCase();
  let text = '';

  if (fileName.endsWith('.pdf')) {
    text = await extractTextFromPDF(file);
  } else if (fileName.endsWith('.docx') || fileName.endsWith('.doc')) {
    text = await extractTextFromDOCX(file);
  } else if (fileName.endsWith('.vce')) {
    text = await extractTextFromVCE(file);
  } else if (fileName.endsWith('.txt')) {
    text = await file.text();
  } else {
    throw new Error('Unsupported file format. Please upload a PDF, DOCX, VCE, or TXT file.');
  }

  if (!text || text.trim().length < 20) {
    throw new Error('Could not extract text from the document. The file might be empty or image-based.');
  }

  const questions = parseQuestionsFromText(text);

  if (questions.length === 0) {
    throw new Error(
      'No questions found. Make sure your document uses a standard format:\n' +
      '1. Question text?\n' +
      '   A) Option 1\n' +
      '   B) Option 2\n' +
      '   C) Option 3\n' +
      '   D) Option 4\n' +
      '   Answer: B'
    );
  }

  return {
    questions,
    totalExtracted: questions.length,
    withAnswers: questions.filter(q => q.hasCorrectAnswer).length,
    sourceFile: file.name,
  };
}
