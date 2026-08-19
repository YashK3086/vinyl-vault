const https = require('https');

const queries = [
  "No Role Modelz J Cole",
  "Welcome to the Jungle Guns N Roses",
  "Maple Syrup The Backseat Lovers",
  "Nothing Else Matters Metallica",
  "One Metallica",
  "Thunderstruck AC DC",
  "TNT AC DC",
  "Snuff Slipknot",
  "Chop Suey System of a Down",
  "Toxicity System of a Down",
  "Aerials System of a Down",
  "BYOB System of a Down",
  "Sugar System of a Down"
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

function fetchItunes(q) {
  return new Promise((resolve) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&country=US&entity=song&limit=5`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.results || []);
        } catch (e) {
          console.error("Parse err for", q, data.substring(0, 100));
          resolve([]);
        }
      });
    }).on('error', err => resolve([]));
  });
}

async function run() {
  for (const q of queries) {
    await sleep(800);
    const results = await fetchItunes(q);
    if (results.length > 0) {
      const r = results[0];
      console.log(`[FOUND] "${q}" => "${r.trackName}" by "${r.artistName}" | Cover: ${r.artworkUrl100} | Audio: ${!!r.previewUrl}`);
    } else {
      console.log(`[NOT FOUND] "${q}"`);
    }
  }
}

run();
