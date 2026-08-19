const https = require('https');

function fetchDeezer(q) {
  return new Promise((resolve) => {
    const url = `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=5`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', d => data += d);
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
  const songs = [
    "Mac Miller Self Care",
    "Mac Miller 2009",
    "J Cole No Role Modelz",
    "System of a Down Chop Suey",
    "Slipknot Snuff",
    "Metallica One",
    "AC DC Thunderstruck",
    "Fred again Danielle",
    "Linkin Park In the End",
    "Nirvana Smells Like Teen Spirit"
  ];

  for (const s of songs) {
    const res = await fetchDeezer(s);
    if (res.length > 0) {
      console.log(`[DEEZER OK] "${s}" => "${res[0].title}" | Artist: "${res[0].artist.name}" | Cover: ${res[0].album.cover_big} | Preview: ${res[0].preview}`);
    } else {
      console.log(`[DEEZER EMPTY] "${s}"`);
    }
  }
}

test();
