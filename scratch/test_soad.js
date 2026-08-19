const https = require('https');

function test(term) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=US&limit=5`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
      const json = JSON.parse(data);
      console.log(`Query "${term}" => ${json.results?.length} results`);
      if (json.results && json.results.length > 0) {
        console.log("First result:", json.results[0].trackName, json.results[0].artworkUrl100, !!json.results[0].previewUrl);
      }
    });
  });
}

test("System of a Down Chop Suey");
test("Slipknot Snuff");
test("Metallica One");
test("AC DC TNT");
test("No Role Modelz J Cole");
