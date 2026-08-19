const https = require('https');
const fs = require('fs');

const tracksConfig = [
  // Mac Miller
  { artist: "Mac Miller", title: "Self Care", q: "Mac Miller Self Care" },
  { artist: "Mac Miller", title: "2009", q: "Mac Miller 2009 Swimming" },
  { artist: "Mac Miller", title: "Good News", q: "Mac Miller Good News" },
  { artist: "Mac Miller", title: "Congratulations (feat. Bilal)", q: "Mac Miller Congratulations" },
  { artist: "Mac Miller", title: "Donald Trump", q: "Mac Miller Donald Trump" },

  // Denzel Curry
  { artist: "Denzel Curry", title: "Ultimate", q: "Denzel Curry Ultimate" },
  { artist: "Denzel Curry", title: "Walkin", q: "Denzel Curry Walkin" },
  { artist: "Denzel Curry", title: "CLOUT COBAIN | CLOUT CO13A1N", q: "Denzel Curry Clout Cobain" },
  { artist: "Denzel Curry", title: "Ricky", q: "Denzel Curry Ricky" },
  { artist: "Denzel Curry", title: "Troubles (feat. T-Pain)", q: "Denzel Curry Troubles" },

  // J. Cole
  { artist: "J. Cole", title: "No Role Modelz", q: "J Cole No Role Modelz" },
  { artist: "J. Cole", title: "MIDDLE CHILD", q: "J Cole Middle Child" },
  { artist: "J. Cole", title: "Wet Dreamz", q: "J Cole Wet Dreamz" },
  { artist: "J. Cole", title: "Love Yourz", q: "J Cole Love Yourz" },
  { artist: "J. Cole", title: "Power Trip (feat. Miguel)", q: "J Cole Power Trip" },

  // Skrillex
  { artist: "Skrillex", title: "Bangarang (feat. Sirah)", q: "Skrillex Bangarang" },
  { artist: "Skrillex", title: "Scary Monsters and Nice Sprites", q: "Skrillex Scary Monsters" },
  { artist: "Skrillex", title: "Where Are Ü Now (with Diplo & Justin Bieber)", q: "Where Are U Now Skrillex" },
  { artist: "Skrillex", title: "Rumble (with Fred again.. & Flowdan)", q: "Skrillex Rumble" },
  { artist: "Skrillex", title: "First of the Year (Equinox)", q: "Skrillex First of the Year" },

  // Fred again..
  { artist: "Fred again..", title: "adore u (with Obongjayar)", q: "Fred again adore u" },
  { artist: "Fred again..", title: "Danielle (smile on my face)", q: "Fred again Danielle" },
  { artist: "Fred again..", title: "Marea (we’ve lost dancing) (with The Blessed Madonna)", q: "Fred again Marea" },
  { artist: "Fred again..", title: "Delilah (pull me out of this)", q: "Fred again Delilah" },
  { artist: "Fred again..", title: "leavemealone (with Baby Keem)", q: "Fred again leavemealone" },

  // Guns N' Roses
  { artist: "Guns N' Roses", title: "Sweet Child O' Mine", q: "Guns N Roses Sweet Child" },
  { artist: "Guns N' Roses", title: "Welcome to the Jungle", q: "Guns N Roses Welcome to the Jungle" },
  { artist: "Guns N' Roses", title: "November Rain", q: "Guns N Roses November Rain" },
  { artist: "Guns N' Roses", title: "Paradise City", q: "Guns N Roses Paradise City" },
  { artist: "Guns N' Roses", title: "Don't Cry", q: "Guns N Roses Dont Cry" },

  // The Backseat Lovers
  { artist: "The Backseat Lovers", title: "Kilby Girl", q: "The Backseat Lovers Kilby Girl" },
  { artist: "The Backseat Lovers", title: "Maple Syrup", q: "The Backseat Lovers Maple Syrup" },
  { artist: "The Backseat Lovers", title: "Pool House", q: "The Backseat Lovers Pool House" },
  { artist: "The Backseat Lovers", title: "Sinking Ship", q: "The Backseat Lovers Sinking Ship" },
  { artist: "The Backseat Lovers", title: "Growing/Dying", q: "The Backseat Lovers Growing Dying" },

  // Metallica
  { artist: "Metallica", title: "Enter Sandman", q: "Metallica Enter Sandman" },
  { artist: "Metallica", title: "Master of Puppets", q: "Metallica Master of Puppets" },
  { artist: "Metallica", title: "Nothing Else Matters", q: "Metallica Nothing Else Matters" },
  { artist: "Metallica", title: "One", q: "Metallica One" },
  { artist: "Metallica", title: "Fade to Black", q: "Metallica Fade to Black" },

  // Nirvana
  { artist: "Nirvana", title: "Smells Like Teen Spirit", q: "Nirvana Smells Like Teen Spirit" },
  { artist: "Nirvana", title: "Come As You Are", q: "Nirvana Come As You Are" },
  { artist: "Nirvana", title: "Heart-Shaped Box", q: "Nirvana Heart Shaped Box" },
  { artist: "Nirvana", title: "Lithium", q: "Nirvana Lithium" },
  { artist: "Nirvana", title: "In Bloom", q: "Nirvana In Bloom" },

  // Linkin Park
  { artist: "Linkin Park", title: "In the End", q: "Linkin Park In the End" },
  { artist: "Linkin Park", title: "Numb", q: "Linkin Park Numb" },
  { artist: "Linkin Park", title: "Crawling", q: "Linkin Park Crawling" },
  { artist: "Linkin Park", title: "Faint", q: "Linkin Park Faint" },
  { artist: "Linkin Park", title: "Somewhere I Belong", q: "Linkin Park Somewhere I Belong" },

  // AC/DC
  { artist: "AC/DC", title: "Back in Black", q: "AC/DC Back in Black" },
  { artist: "AC/DC", title: "Highway to Hell", q: "AC/DC Highway to Hell" },
  { artist: "AC/DC", title: "Thunderstruck", q: "AC/DC Thunderstruck" },
  { artist: "AC/DC", title: "You Shook Me All Night Long", q: "AC/DC You Shook Me" },
  { artist: "AC/DC", title: "T.N.T.", q: "AC/DC TNT" },

  // Black Sabbath
  { artist: "Black Sabbath", title: "Paranoid", q: "Black Sabbath Paranoid" },
  { artist: "Black Sabbath", title: "Iron Man", q: "Black Sabbath Iron Man" },
  { artist: "Black Sabbath", title: "War Pigs", q: "Black Sabbath War Pigs" },
  { artist: "Black Sabbath", title: "Children of the Grave", q: "Black Sabbath Children of the Grave" },
  { artist: "Black Sabbath", title: "Heaven and Hell", q: "Black Sabbath Heaven and Hell" },

  // Slipknot
  { artist: "Slipknot", title: "Psychosocial", q: "Slipknot Psychosocial" },
  { artist: "Slipknot", title: "Duality", q: "Slipknot Duality" },
  { artist: "Slipknot", title: "Wait and Bleed", q: "Slipknot Wait and Bleed" },
  { artist: "Slipknot", title: "Before I Forget", q: "Slipknot Before I Forget" },
  { artist: "Slipknot", title: "Snuff", q: "Slipknot Snuff" },

  // System of a Down
  { artist: "System of a Down", title: "Chop Suey!", q: "System of a Down Chop Suey" },
  { artist: "System of a Down", title: "Toxicity", q: "System of a Down Toxicity" },
  { artist: "System of a Down", title: "Aerials", q: "System of a Down Aerials" },
  { artist: "System of a Down", title: "B.Y.O.B.", q: "System of a Down BYOB" },
  { artist: "System of a Down", title: "Sugar", q: "System of a Down Sugar" }
];

function fetchItunes(q) {
  return new Promise((resolve) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&entity=song&limit=40`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
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

function words(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim().split(/\s+/).filter(Boolean);
}

function scoreMatch(targetArtist, targetTitle, r) {
  if (!r.trackName) return 0;
  const tWords = words(targetTitle.replace(/\(.*?\)/g, '').replace(/\|.*/, ''));
  const rWords = words(r.trackName);
  const aWords = words(targetArtist);
  const raWords = words(r.artistName);

  let titleScore = 0;
  for (const w of tWords) {
    if (rWords.includes(w)) titleScore += 1;
  }
  titleScore = titleScore / Math.max(tWords.length, 1);

  let artistScore = 0;
  for (const w of aWords) {
    if (raWords.includes(w)) artistScore += 1;
  }
  artistScore = artistScore / Math.max(aWords.length, 1);

  let bonus = r.previewUrl ? 1 : 0;
  return (titleScore * 2.0) + (artistScore * 1.5) + bonus;
}

async function run() {
  const finalTracks = [];
  const usedPreviews = new Map();

  for (const t of tracksConfig) {
    const results = await fetchItunes(t.q);
    
    // Sort results by score
    const scored = results.map(r => ({ r, score: scoreMatch(t.artist, t.title, r) }));
    scored.sort((a, b) => b.score - a.score);

    const best = scored[0]?.r;
    const uniqueId = `${t.artist.toLowerCase().replace(/[^a-z0-9]/g, '_')}__${t.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const coverUrl = best?.artworkUrl100 ? best.artworkUrl100.replace('100x100bb', '600x600bb') : "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop";
    const previewUrl = best?.previewUrl || "";
    const albumName = best?.collectionName || t.artist;
    const year = best?.releaseDate ? new Date(best.releaseDate).getFullYear() : "";

    if (previewUrl && usedPreviews.has(previewUrl)) {
      console.warn(`DUPLICATE: [${t.artist}] "${t.title}" shares with "${usedPreviews.get(previewUrl)}"`);
    } else if (previewUrl) {
      usedPreviews.set(previewUrl, `${t.artist} - ${t.title}`);
    }

    finalTracks.push({
      id: uniqueId,
      artist: t.artist,
      title: t.title,
      album: albumName,
      year: year,
      coverUrl: coverUrl,
      previewAudioUrl: previewUrl,
      spotifyEmbedQuery: encodeURIComponent(`${t.artist} ${t.title}`)
    });

    console.log(`[${t.artist}] "${t.title}" => "${best?.trackName}" (${best?.collectionName})`);
  }

  // Group by artist
  const artistGenres = {
    "Mac Miller": "Hip-Hop / Neo-Soul / Jazz Rap",
    "Denzel Curry": "Southern Hip-Hop / Florida Rap",
    "J. Cole": "Hip-Hop / Conscious Rap",
    "Skrillex": "Electronic / Dubstep / UK Bass",
    "Fred again..": "Electronic / House / UK Garage",
    "Guns N' Roses": "Hard Rock / Heavy Metal",
    "The Backseat Lovers": "Indie Rock / Alternative",
    "Metallica": "Thrash Metal / Heavy Metal",
    "Nirvana": "Grunge / Alternative Rock",
    "Linkin Park": "Nu Metal / Alternative Rock",
    "AC/DC": "Hard Rock / Classic Rock",
    "Black Sabbath": "Heavy Metal / Doom Metal",
    "Slipknot": "Nu Metal / Heavy Metal",
    "System of a Down": "Alternative Metal / Nu Metal"
  };

  const grouped = {};
  for (const track of finalTracks) {
    if (!grouped[track.artist]) {
      grouped[track.artist] = {
        artist: track.artist,
        genre: artistGenres[track.artist] || "Rock & Hip-Hop",
        tracks: []
      };
    }
    grouped[track.artist].tracks.push(track);
  }

  const content = `// Curated 30-Second Music Preview Library with Cover Art
// 14 Featured Artists x 5 Signature Tracks each = 70 Tracks
// Explicit unique ID per track preventing selection collision

export const MUSIC_LIBRARY = ${JSON.stringify(Object.values(grouped), null, 2)};
`;

  fs.writeFileSync('./data/musicLibrary.js', content);
  console.log(`\nSUCCESS: Generated data/musicLibrary.js with all ${finalTracks.length} tracks.`);
}

run();
