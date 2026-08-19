const https = require('https');

function fetchDeezer(artist, title) {
  return new Promise((resolve) => {
    const q = `artist:"${artist}" track:"${title}"`;
    const url = `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=5`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.data || []);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
}

async function testDeezer() {
  const tests = [
    { artist: "Mac Miller", title: "Self Care" },
    { artist: "Mac Miller", title: "2009" },
    { artist: "Denzel Curry", title: "Troubles" },
    { artist: "Black Sabbath", title: "Paranoid" },
    { artist: "Slipknot", title: "Psychosocial" },
    { artist: "System of a Down", title: "Chop Suey!" },
    { artist: "System of a Down", title: "Toxicity" }
  ];

  for (const t of tests) {
    const res = await fetchDeezer(t.artist, t.title);
    if (res.length > 0) {
      console.log(`DEEZER OK: [${t.artist}] "${t.title}" -> "${res[0].title}" | Album: ${res[0].album?.title} | Preview: ${res[0].preview}`);
    } else {
      console.log(`DEEZER MISSING: [${t.artist}] "${t.title}"`);
    }
  }
}

testDeezer();
