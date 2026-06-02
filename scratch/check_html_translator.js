const fs = require('fs');

const contentPath = 'C:\\Users\\yashv\\.gemini\\antigravity\\brain\\d5e460f9-1653-45c1-97f3-b73b2b6108e8\\.system_generated\\steps\\98\\content.md';
const html = fs.readFileSync(contentPath, 'utf8');

const query = 'AI-Translator-Web-Application';
const idx = html.indexOf(query);
if (idx !== -1) {
  console.log(html.substring(idx - 100, idx + 1000));
} else {
  console.log('Query not found');
}
