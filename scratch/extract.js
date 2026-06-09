const fs = require('fs');
const content = fs.readFileSync('C:\\Users\\yashv\\.gemini\\antigravity\\brain\\cb4c5963-a29a-42e4-b022-91d1b431c6fc\\.system_generated\\steps\\14\\content.md', 'utf8');

// Find all text matches inside quotes
const stringRegex = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g;
const matches = content.match(stringRegex) || [];

console.log("Total strings found:", matches.length);

const isSvgPath = (s) => {
  return /^[MmLlHhVvCcSsQqTtAaZz0-9,\.\s\-]+$/.test(s) && (s.includes('M') || s.includes('m') || s.includes('C') || s.includes('c'));
};

const filtered = matches
  .map(s => s.slice(1, -1)) // Remove quotes
  .filter(s => s.length > 15) // longer strings
  .filter(s => !isSvgPath(s))
  .filter(s => !s.startsWith('http'))
  .filter(s => !s.includes('\\u00'))
  .filter(s => !s.includes('\\n'))
  .filter(s => !s.includes('Minified React error'))
  .filter(s => !s.includes('setState(...): takes an object'))
  .filter(s => !s.includes('forceFrameRate takes a positive int'));

const uniqueFiltered = Array.from(new Set(filtered));
console.log("Interesting long strings found (" + uniqueFiltered.length + "):");
uniqueFiltered.forEach(t => console.log("- " + t));
