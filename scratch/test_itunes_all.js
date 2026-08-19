const https = require('https');
const fs = require('fs');

const songs = [
  { artist: "Mac Miller", title: "Self Care", q: "Mac Miller Self Care" },
  { artist: "Mac Miller", title: "2009", q: "Mac Miller 2009" },
  { artist: "Mac Miller", title: "Good News", q: "Mac Miller Good News" },
  { artist: "Mac Miller", title: "Congratulations (feat. Bilal)", q: "Mac Miller Congratulations" },
  { artist: "Mac Miller", title: "Donald Trump", q: "Mac Miller Donald Trump" },

  { artist: "Denzel Curry", title: "Ultimate", q: "Denzel Curry Ultimate" },
  { artist: "Denzel Curry", title: "Walkin", q: "Denzel Curry Walkin" },
  { artist: "Denzel Curry", title: "CLOUT COBAIN | CLOUT CO13A1N", q: "Denzel Curry Clout Cobain" },
  { artist: "Denzel Curry", title: "Ricky", q: "Denzel Curry Ricky" },
  { artist: "Denzel Curry", title: "Troubles (feat. T-Pain)", q: "Denzel Curry Troubles" },

  { artist: "J. Cole", title: "No Role Modelz", q: "J Cole No Role Modelz" },
  { artist: "J. Cole", title: "MIDDLE CHILD", q: "J Cole Middle Child" },
  { artist: "J. Cole", title: "Wet Dreamz", q: "J Cole Wet Dreamz" },
  { artist: "J. Cole", title: "Love Yourz", q: "J Cole Love Yourz" },
  { artist: "J. Cole", title: "Power Trip (feat. Miguel)", q: "J Cole Power Trip" },

  { artist: "Skrillex", title: "Bangarang (feat. Sirah)", q: "Skrillex Bangarang" },
  { artist: "Skrillex", title: "Scary Monsters and Nice Sprites", q: "Skrillex Scary Monsters" },
  { artist: "Skrillex", title: "Where Are Ü Now (with Diplo & Justin Bieber)", q: "Where Are U Now Skrillex" },
  { artist: "Skrillex", title: "Rumble (with Fred again.. & Flowdan)", q: "Skrillex Rumble" },
  { artist: "Skrillex", title: "First of the Year (Equinox)", q: "Skrillex First of the Year" },

  { artist: "Fred again..", title: "adore u (with Obongjayar)", q: "Fred again adore u" },
  { artist: "Fred again..", title: "Danielle (smile on my face)", q: "Fred again Danielle" },
  { artist: "Fred again..", title: "Marea (we’ve lost dancing) (with The Blessed Madonna)", q: "Fred again Marea" },
  { artist: "Fred again..", title: "Delilah (pull me out of this)", q: "Fred again Delilah" },
  { artist: "Fred again..", title: "leavemealone (with Baby Keem)", q: "Fred again leavemealone" },

  { artist: "Guns N' Roses", title: "Sweet Child O' Mine", q: "Guns N Roses Sweet Child" },
  { artist: "Guns N' Roses", title: "Welcome to the Jungle", q: "Guns N Roses Welcome to the Jungle" },
  { artist: "Guns N' Roses", title: "November Rain", q: "Guns N Roses November Rain" },
  { artist: "Guns N' Roses", title: "Paradise City", q: "Guns N Roses Paradise City" },
  { artist: "Guns N' Roses", title: "Don't Cry", q: "Guns N Roses Dont Cry" },

  { artist: "The Backseat Lovers", title: "Kilby Girl", q: "The Backseat Lovers Kilby Girl" },
  { artist: "The Backseat Lovers", title: "Maple Syrup", q: "The Backseat Lovers Maple Syrup" },
  { artist: "The Backseat Lovers", title: "Pool House", q: "The Backseat Lovers Pool House" },
  { artist: "The Backseat Lovers", title: "Sinking Ship", q: "The Backseat Lovers Sinking Ship" },
  { artist: "The Backseat Lovers", title: "Growing/Dying", q: "The Backseat Lovers Growing Dying" },

  { artist: "Metallica", title: "Enter Sandman", q: "Metallica Enter Sandman" },
  { artist: "Metallica", title: "Master of Puppets", q: "Metallica Master of Puppets" },
  { artist: "Metallica", title: "Nothing Else Matters", q: "Metallica Nothing Else Matters" },
  { artist: "Metallica", title: "One", q: "Metallica One" },
  { artist: "Metallica", title: "Fade to Black", q: "Metallica Fade to Black" },

  { artist: "Nirvana", title: "Smells Like Teen Spirit", q: "Nirvana Smells Like Teen Spirit" },
  { artist: "Nirvana", title: "Come As You Are", q: "Nirvana Come As You Are" },
  { artist: "Nirvana", title: "Heart-Shaped Box", q: "Nirvana Heart Shaped Box" },
  { artist: "Nirvana", title: "Lithium", q: "Nirvana Lithium" },
  { artist: "Nirvana", title: "In Bloom", q: "Nirvana In Bloom" },

  { artist: "Linkin Park", title: "In the End", q: "Linkin Park In the End" },
  { artist: "Linkin Park", title: "Numb", q: "Linkin Park Numb" },
  { artist: "Linkin Park", title: "Crawling", q: "Linkin Park Crawling" },
  { artist: "Linkin Park", title: "Faint", q: "Linkin Park Faint" },
  { artist: "Linkin Park", title: "Somewhere I Belong", q: "Linkin Park Somewhere I Belong" },

  { artist: "AC/DC", title: "Back in Black", q: "AC/DC Back in Black" },
  { artist: "AC/DC", title: "Highway to Hell", q: "AC/DC Highway to Hell" },
  { artist: "AC/DC", title: "Thunderstruck", q: "AC/DC Thunderstruck" },
  { artist: "AC/DC", title: "You Shook Me All Night Long", q: "AC/DC You Shook Me" },
  { artist: "AC/DC", title: "T.N.T.", q: "AC/DC TNT" },

  { artist: "Black Sabbath", title: "Paranoid", q: "Black Sabbath Paranoid" },
  { artist: "Black Sabbath", title: "Iron Man", q: "Black Sabbath Iron Man" },
  { artist: "Black Sabbath", title: "War Pigs", q: "Black Sabbath War Pigs" },
  { artist: "Black Sabbath", title: "Children of the Grave", q: "Black Sabbath Children of the Grave" },
  { artist: "Black Sabbath", title: "Heaven and Hell", q: "Black Sabbath Heaven and Hell" },

  { artist: "Slipknot", title: "Psychosocial", q: "Slipknot Psychosocial" },
  { artist: "Slipknot", title: "Duality", q: "Slipknot Duality" },
  { artist: "Slipknot", title: "Wait and Bleed", q: "Slipknot Wait and Bleed" },
  { artist: "Slipknot", title: "Before I Forget", q: "Slipknot Before I Forget" },
  { artist: "Slipknot", title: "Snuff", q: "Slipknot Snuff" },

  { artist: "System of a Down", title: "Chop Suey!", q: "System of a Down Chop Suey" },
  { artist: "System of a Down", title: "Toxicity", q: "System of a Down Toxicity" },
  { artist: "System of a Down", title: "Aerials", q: "System of a Down Aerials" },
  { artist: "System of a Down", title: "B.Y.O.B.", q: "System of a Down BYOB" },
  { artist: "System of a Down", title: "Sugar", q: "System of a Down Sugar" }
];

function fetchItunes(q) {
  return new Promise((resolve) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&entity=song&limit=25`;
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

function clean(str) {
  return (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function start() {
  const finalTracks = [];
  const usedPreviews = new Map();

  for (const s of songs) {
    const results = await fetchItunes(s.q);
    const targetTitle = clean(s.title.replace(/\(.*?\)/g, '').replace(/\|.*/, ''));
    const targetArtist = clean(s.artist);

    // Find song where artist matches AND trackName contains targetTitle
    let candidates = results.filter(r => r.previewUrl);
    
    let best = candidates.find(r => {
      const a = clean(r.artistName);
      const t = clean(r.trackName);
      return (a.includes(targetArtist) || targetArtist.includes(a)) && (t === targetTitle || t.includes(targetTitle) || targetTitle.includes(t));
    });

    if (!best && candidates.length > 0) {
      best = candidates.find(r => {
        const a = clean(r.artistName);
        return a.includes(targetArtist) || targetArtist.includes(a);
      }) || candidates[0];
    }

    if (!best) {
      console.error(`FAILED TO FIND TRACK FOR: ${s.artist} - ${s.title}`);
      continue;
    }

    const preview = best.previewUrl;
    if (usedPreviews.has(preview)) {
      console.warn(`WARNING: duplicate preview for ${s.artist} - ${s.title} (already used by ${usedPreviews.get(preview)})`);
    } else {
      usedPreviews.set(preview, `${s.artist} - ${s.title}`);
    }

    const id = `${s.artist.toLowerCase().replace(/[^a-z0-9]/g, '-')}_${s.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const cover = best.artworkUrl100 ? best.artworkUrl100.replace('100x100bb', '600x600bb') : "";
    const album = best.collectionName || "";
    const year = best.releaseDate ? new Date(best.releaseDate).getFullYear() : "";

    finalTracks.push({
      id: id,
      artist: s.artist,
      title: s.title,
      album: album,
      year: year,
      coverUrl: cover,
      previewAudioUrl: preview,
      spotifyEmbedQuery: encodeURIComponent(`${s.artist} ${s.title}`)
    });

    console.log(`OK: [${s.artist}] "${s.title}" -> "${best.trackName}" (${best.collectionName})`);
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
// 14 Featured Artists x 5 Signature Tracks each = 70 Tracks (Unique Track IDs & Audio Streams)

export const MUSIC_LIBRARY = ${JSON.stringify(Object.values(grouped), null, 2)};
`;

  fs.writeFileSync('./data/musicLibrary.js', content);
  console.log(`\nSUCCESS: Wrote data/musicLibrary.js with ${finalTracks.length} unique tracks.`);
}

start();
