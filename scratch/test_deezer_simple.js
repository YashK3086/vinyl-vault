const https = require('https');

function fetchDeezerSimple(query) {
  return new Promise((resolve) => {
    const url = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=5`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
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

async function test() {
  const list = ["Mac Miller Self Care", "Mac Miller 2009", "System of a Down Chop Suey", "Slipknot Psychosocial", "Black Sabbath Paranoid"];
  for (const q of list) {
    const res = await fetchDeezerSimple(q);
    if (res.length > 0) {
      console.log(`FOUND: ${q} -> ${res[0].artist.name} - ${res[0].title} | ${res[0].album.title} | preview: ${res[0].preview}`);
    } else {
      console.log(`NOT FOUND: ${q}`);
    }
  }
}

test();
