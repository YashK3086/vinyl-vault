const https = require('https');

function testOembed(trackUrl) {
  const url = `https://open.spotify.com/oembed?url=${encodeURIComponent(trackUrl)}`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', d => data += d);
    res.on('end', () => {
      console.log("Status:", res.statusCode);
      console.log("Data:", data);
    });
  });
}

testOembed("https://open.spotify.com/track/5bJ1DrZH4hDOY0wP6gYVl6");
