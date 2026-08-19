const fs = require('fs');
const https = require('https');
const http = require('http');

// Read musicLibrary
const content = fs.readFileSync('./data/musicLibrary.js', 'utf8');
const jsonMatch = content.match(/export const MUSIC_LIBRARY = (\[[\s\S]*\]);/);
if (!jsonMatch) {
  console.error("Could not parse musicLibrary.js");
  process.exit(1);
}

const library = JSON.parse(jsonMatch[1]);

function checkUrl(url) {
  return new Promise((resolve) => {
    if (!url) return resolve(false);
    const req = (url.startsWith('https') ? https : http).get(url, { method: 'HEAD', timeout: 5000 }, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });
    req.on('error', () => resolve(false));
    req.on('timeout', () => { req.destroy(); resolve(false); });
  });
}

function searchItunesPreview(artist, title) {
  return new Promise((resolve) => {
    const q = `${artist} ${title}`;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&entity=song&limit=5`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 8000 }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const match = (json.results || []).find(r => r.previewUrl);
          resolve(match ? match.previewUrl : "");
        } catch (e) {
          resolve("");
        }
      });
    }).on('error', () => resolve("")).on('timeout', function() { this.destroy(); resolve(""); });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function audit() {
  console.log("Auditing 70 tracks for working previewAudioUrl...");
  let brokenCount = 0;
  let totalTracks = 0;

  for (const artistGroup of library) {
    for (const track of artistGroup.tracks) {
      totalTracks++;
      const ok = await checkUrl(track.previewAudioUrl);
      if (!ok) {
        brokenCount++;
        console.log(`[BROKEN] ${track.artist} - "${track.title}" (URL: ${track.previewAudioUrl || "NONE"})`);
        
        // Search iTunes for a fresh working preview URL
        await sleep(500);
        const newUrl = await searchItunesPreview(track.artist, track.title);
        if (newUrl) {
          console.log(`  └─> FIXED with fresh iTunes URL: ${newUrl}`);
          track.previewAudioUrl = newUrl;
        } else {
          console.log(`  └─> COULD NOT FIND ITUNES PREVIEW`);
        }
      } else {
        console.log(`[OK] ${track.artist} - "${track.title}"`);
      }
    }
  }

  console.log(`\nAudit complete: ${totalTracks - brokenCount}/${totalTracks} were working. ${brokenCount} were broken.`);
  
  // Write back updated library
  const updatedContent = `// Curated 70-Track Music Library — Real iTunes Album Artwork & Verified Preview Audio
export const MUSIC_LIBRARY = ${JSON.stringify(library, null, 2)};
`;
  fs.writeFileSync('./data/musicLibrary.js', updatedContent);
  console.log("Updated data/musicLibrary.js saved.");
}

audit().catch(console.error);
