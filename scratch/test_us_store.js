const https = require('https');
const fs = require('fs');

const missingOrChecked = [
  { artist: "Mac Miller", title: "Self Care", q: "Mac Miller Self Care" },
  { artist: "Mac Miller", title: "2009", q: "Mac Miller 2009" },
  { artist: "Denzel Curry", title: "Troubles (feat. T-Pain)", q: "Denzel Curry Troubles" },
  { artist: "Black Sabbath", title: "Paranoid", q: "Black Sabbath Paranoid" },
  { artist: "Black Sabbath", title: "Heaven and Hell", q: "Black Sabbath Heaven and Hell" },
  { artist: "Slipknot", title: "Psychosocial", q: "Slipknot Psychosocial" },
  { artist: "Slipknot", title: "Wait and Bleed", q: "Slipknot Wait and Bleed" },
  { artist: "Slipknot", title: "Before I Forget", q: "Slipknot Before I Forget" },
  { artist: "Slipknot", title: "Snuff", q: "Slipknot Snuff" },
  { artist: "System of a Down", title: "Chop Suey!", q: "System of a Down Chop Suey" },
  { artist: "System of a Down", title: "Toxicity", q: "System of a Down Toxicity" },
  { artist: "System of a Down", title: "Aerials", q: "System of a Down Aerials" },
  { artist: "System of a Down", title: "B.Y.O.B.", q: "System of a Down BYOB" },
  { artist: "System of a Down", title: "Sugar", q: "System of a Down Sugar" }
];

function fetchItunesUS(q) {
  return new Promise((resolve) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&country=US&media=music&entity=song&limit=25`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.results || []);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function test() {
  for (const s of missingOrChecked) {
    const results = await fetchItunesUS(s.q);
    const withAudio = results.filter(r => r.previewUrl);
    if (withAudio.length > 0) {
      console.log(`US Store Found: [${s.artist}] "${s.title}" -> "${withAudio[0].trackName}" | ${withAudio[0].collectionName}`);
    } else {
      console.log(`US Store MISSING: [${s.artist}] "${s.title}"`);
    }
  }
}

test();
