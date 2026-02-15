// word-counter.js – Accurate real‑time word, character, sentence, paragraph & reading time counter

const textInput = document.getElementById('textInput');

const wordCountEl = document.getElementById('wordCount');
const charCountEl = document.getElementById('charCount');
const charNoSpaceEl = document.getElementById('charNoSpace');
const sentenceCountEl = document.getElementById('sentenceCount');
const paragraphCountEl = document.getElementById('paragraphCount');
const readingTimeEl = document.getElementById('readingTime');

textInput.addEventListener('input', debounce(updateCounts, 150));

function updateCounts() {
  const rawText = textInput.value;

  if (!rawText.trim()) {
    resetCounts();
    return;
  }

  // Normalize Windows line endings to \n
  const normalizedText = rawText.replace(/\r\n/g, '\n');

  // --- Character counts (newlines are NOT counted as characters) ---
  const totalChars = rawText.replace(/\n/g, '').length;          // exclude newlines
  const charsNoSpaces = rawText.replace(/\s/g, '').length;       // exclude all whitespace

  // --- Word count ---
  const words = tokenizeWords(normalizedText);
  const wordCount = words.length;

  // --- Sentence count ---
  const sentenceCount = countSentences(normalizedText);

  // --- Paragraph count (each line = one paragraph) ---
  const paragraphCount = countParagraphs(normalizedText);

  // --- Reading time ---
  const readingTime = formatReadingTime(wordCount);

  // Update UI
  wordCountEl.textContent = wordCount;
  charCountEl.textContent = totalChars;
  charNoSpaceEl.textContent = charsNoSpaces;
  sentenceCountEl.textContent = sentenceCount;
  paragraphCountEl.textContent = paragraphCount;
  readingTimeEl.textContent = readingTime;
}

// ==================== WORD TOKENIZER ====================
// Matches:
// - URLs, emails, #hashtags, @mentions
// - fractions (e.g., 1/2)
// - numbers with optional commas/decimals and optional % (e.g., 1,234.56, 80%)
// - alphanumeric words with hyphens/apostrophes (e.g., t20, don't, state-of-the-art)
function tokenizeWords(text) {
  const regex =
    /https?:\/\/[^\s]+|[\w.-]+@[\w.-]+\.\w+|\#[\w]+|@[\w]+|\d+\/\d+|\d+(?:,\d{3})*(?:\.\d+)?%?|[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*/g;
  const matches = text.match(regex);
  return matches || [];
}

// ==================== SENTENCE COUNTER ====================
function countSentences(text) {
  if (!text.trim()) return 0;

  // Common abbreviations (case‑insensitive)
  const abbreviations = [
    'mr', 'mrs', 'ms', 'dr', 'prof', 'sr', 'jr', 'st', 'ltd', 'inc', 'corp',
    'vs', 'etc', 'eg', 'ie', 'ps', 'am', 'pm', 'us', 'uk', 'un', 'al', 'chap',
    'fig', 'vol', 'no', 'pp', 'approx', 'appt', 'apt', 'dept', 'est', 'min',
    'max', 'temp', 'ft', 'in', 'cm', 'mm', 'g', 'kg', 'lb', 'oz', 'mph', 'kph'
  ];

  let safeText = text;

  // Protect abbreviation dots (e.g., "Dr." → "Dr<DOT>")
  abbreviations.forEach(abbr => {
    const regex = new RegExp('\\b' + abbr + '\\.(?=\\s|$)', 'gi');
    safeText = safeText.replace(regex, match => match.replace('.', '<DOT>'));
  });

  // Protect ellipsis
  safeText = safeText.replace(/\.\.\./g, '<ELLIPSIS>');

  // Split on sentence terminators . ! ? followed by space or end of string
  const sentences = safeText.split(/[.!?]+(?:\s|$)/).filter(part => part.trim().length > 0);
  return sentences.length;
}

// ==================== PARAGRAPH COUNTER ====================
// Any line separated by one or more newlines is a paragraph.
function countParagraphs(text) {
  if (!text.trim()) return 0;
  // Split on any sequence of newlines, then remove empty blocks
  const blocks = text.split(/\n+/).filter(block => block.trim().length > 0);
  return blocks.length;
}

// ==================== READING TIME ====================
function formatReadingTime(wordCount) {
  if (wordCount === 0) return '0 min';
  const wordsPerMinute = 200;
  const minutes = wordCount / wordsPerMinute;
  if (minutes < 1) return 'Less than 1 min';
  return Math.ceil(minutes) + ' min';
}

// ==================== RESET ====================
function resetCounts() {
  wordCountEl.textContent = 0;
  charCountEl.textContent = 0;
  charNoSpaceEl.textContent = 0;
  sentenceCountEl.textContent = 0;
  paragraphCountEl.textContent = 0;
  readingTimeEl.textContent = '0 min';
}

// ==================== DEBOUNCE ====================
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Run on page load to handle pre‑filled text
window.addEventListener('load', updateCounts);