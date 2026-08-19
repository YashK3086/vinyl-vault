const https = require('https');
const http = require('http');
const fs = require('fs');

const tracks = [
  // Mac Miller
  { artist: "Mac Miller", title: "Self Care" },
  { artist: "Mac Miller", title: "2009" },
  { artist: "Mac Miller", title: "Good News" },
  { artist: "Mac Miller", title: "Congratulations (feat. Bilal)" },
  { artist: "Mac Miller", title: "Donald Trump" },
  // Denzel Curry
  { artist: "Denzel Curry", title: "Ultimate" },
  { artist: "Denzel Curry", title: "Walkin" },
  { artist: "Denzel Curry", title: "CLOUT COBAIN | CLOUT CO13A1N" },
  { artist: "Denzel Curry", title: "Ricky" },
  { artist: "Denzel Curry", title: "Troubles (feat. T-Pain)" },
  // J. Cole
  { artist: "J. Cole", title: "No Role Modelz" },
  { artist: "J. Cole", title: "MIDDLE CHILD" },
  { artist: "J. Cole", title: "Wet Dreamz" },
  { artist: "J. Cole", title: "Love Yourz" },
  { artist: "J. Cole", title: "Power Trip (feat. Miguel)" },
  // Skrillex
  { artist: "Skrillex", title: "Bangarang (feat. Sirah)" },
  { artist: "Skrillex", title: "Scary Monsters and Nice Sprites" },
  { artist: "Skrillex", title: "Where Are Ü Now (with Diplo & Justin Bieber)" },
  { artist: "Skrillex", title: "Rumble (with Fred again.. & Flowdan)" },
  { artist: "Skrillex", title: "First of the Year (Equinox)" },
  // Fred again..
  { artist: "Fred again..", title: "adore u (with Obongjayar)" },
  { artist: "Fred again..", title: "Danielle (smile on my face)" },
  { artist: "Fred again..", title: "Marea (we've lost dancing) (with The Blessed Madonna)" },
  { artist: "Fred again..", title: "Delilah (pull me out of this)" },
  { artist: "Fred again..", title: "leavemealone (with Baby Keem)" },
  // Guns N' Roses
  { artist: "Guns N' Roses", title: "Sweet Child O' Mine" },
  { artist: "Guns N' Roses", title: "Welcome to the Jungle" },
  { artist: "Guns N' Roses", title: "November Rain" },
  { artist: "Guns N' Roses", title: "Paradise City" },
  { artist: "Guns N' Roses", title: "Don't Cry" },
  // The Backseat Lovers
  { artist: "The Backseat Lovers", title: "Kilby Girl" },
  { artist: "The Backseat Lovers", title: "Maple Syrup" },
  { artist: "The Backseat Lovers", title: "Pool House" },
  { artist: "The Backseat Lovers", title: "Sinking Ship" },
  { artist: "The Backseat Lovers", title: "Growing/Dying" },
  // Metallica
  { artist: "Metallica", title: "Enter Sandman" },
  { artist: "Metallica", title: "Master of Puppets" },
  { artist: "Metallica", title: "Nothing Else Matters" },
  { artist: "Metallica", title: "One" },
  { artist: "Metallica", title: "Fade to Black" },
  // Nirvana
  { artist: "Nirvana", title: "Smells Like Teen Spirit" },
  { artist: "Nirvana", title: "Come As You Are" },
  { artist: "Nirvana", title: "Heart-Shaped Box" },
  { artist: "Nirvana", title: "Lithium" },
  { artist: "Nirvana", title: "In Bloom" },
  // Linkin Park
  { artist: "Linkin Park", title: "In the End" },
  { artist: "Linkin Park", title: "Numb" },
  { artist: "Linkin Park", title: "Crawling" },
  { artist: "Linkin Park", title: "Faint" },
  { artist: "Linkin Park", title: "Somewhere I Belong" },
  // AC/DC
  { artist: "AC/DC", title: "Back in Black" },
  { artist: "AC/DC", title: "Highway to Hell" },
  { artist: "AC/DC", title: "Thunderstruck" },
  { artist: "AC/DC", title: "You Shook Me All Night Long" },
  { artist: "AC/DC", title: "T.N.T." },
  // Black Sabbath
  { artist: "Black Sabbath", title: "Paranoid" },
  { artist: "Black Sabbath", title: "Iron Man" },
  { artist: "Black Sabbath", title: "War Pigs" },
  { artist: "Black Sabbath", title: "Children of the Grave" },
  { artist: "Black Sabbath", title: "Heaven and Hell" },
  // Slipknot
  { artist: "Slipknot", title: "Psychosocial" },
  { artist: "Slipknot", title: "Duality" },
  { artist: "Slipknot", title: "Wait and Bleed" },
  { artist: "Slipknot", title: "Before I Forget" },
  { artist: "Slipknot", title: "Snuff" },
  // System of a Down
  { artist: "System of a Down", title: "Chop Suey!" },
  { artist: "System of a Down", title: "Toxicity" },
  { artist: "System of a Down", title: "Aerials" },
  { artist: "System of a Down", title: "B.Y.O.B." },
  { artist: "System of a Down", title: "Sugar" }
];

function fetchJson(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 6000 }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(null); }
      });
    }).on('error', () => resolve(null))
      .on('timeout', function() { this.destroy(); resolve(null); });
  });
}

function verifyAudioDownload(url) {
  return new Promise((resolve) => {
    if (!url) return resolve({ ok: false, bytes: 0, status: 0 });
    const req = (url.startsWith('https') ? https : http).get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 6000 }, (res) => {
      let bytes = 0;
      res.on('data', chunk => {
        bytes += chunk.length;
        if (bytes > 50000) { // received first 50KB successfully!
          req.destroy();
          resolve({ ok: true, bytes, status: res.statusCode, contentType: res.headers['content-type'] });
        }
      });
      res.on('end', () => {
        resolve({ ok: bytes > 1000, bytes, status: res.statusCode, contentType: res.headers['content-type'] });
      });
    });
    req.on('error', (e) => resolve({ ok: false, error: e.message }));
    req.on('timeout', () => { req.destroy(); resolve({ ok: false, error: 'timeout' }); });
  });
}

async function testAll() {
  console.log("Checking Deezer vs iTunes for 70 tracks...\n");
  for (let i = 0; i < 10; i++) {
    const t = tracks[i];
    const cleanTitle = t.title.replace(/\(feat\.[^)]+\)/gi, '').replace(/\(with[^)]+\)/gi, '').replace(/\|.*/, '').trim();
    
    // Deezer search
    const deezerQuery = encodeURIComponent(`artist:"${t.artist}" track:"${cleanTitle}"`);
    const deezerRes = await fetchJson(`https://api.deezer.com/search?q=${deezerQuery}&limit=3`);
    const deezerTrack = deezerRes?.data?.[0];
    const deezerPreview = deezerTrack?.preview;
    const deezerCover = deezerTrack?.album?.cover_xl || deezerTrack?.album?.cover_big;
    
    // iTunes search
    const itunesQuery = encodeURIComponent(`${t.artist} ${cleanTitle}`);
    const itunesRes = await fetchJson(`https://itunes.apple.com/search?term=${itunesQuery}&media=music&entity=song&limit=3`);
    const itunesTrack = itunesRes?.results?.[0];
    const itunesPreview = itunesTrack?.previewUrl;
    const itunesCover = itunesTrack?.artworkUrl100 ? itunesTrack.artworkUrl100.replace('100x100bb', '600x600bb') : null;

    const deezerCheck = await verifyAudioDownload(deezerPreview);
    const itunesCheck = await verifyAudioDownload(itunesPreview);

    console.log(`[${i+1}] ${t.artist} - "${t.title}"`);
    console.log(`   Deezer: ${deezerCheck.ok ? '✅ ' + deezerCheck.contentType : '❌'} | ${deezerPreview || 'none'}`);
    console.log(`   iTunes: ${itunesCheck.ok ? '✅ ' + itunesCheck.contentType : '❌'} | ${itunesPreview || 'none'}`);
  }
}

testAll().catch(console.error);
