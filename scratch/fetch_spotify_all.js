const https = require('https');
const fs = require('fs');

const songs = [
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
  { artist: "Fred again..", title: "Marea (we’ve lost dancing) (with The Blessed Madonna)" },
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

// Query Spotify's embed finder or token
function getSpotifyToken() {
  return new Promise((resolve) => {
    const req = https.request('https://open.spotify.com/get_access_token?reason=transport&productType=web_player', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.accessToken);
        } catch (e) {
          resolve(null);
        }
      });
    });
    req.on('error', () => resolve(null));
    req.end();
  });
}

function searchSpotify(token, query) {
  return new Promise((resolve) => {
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=5`;
    const req = https.request(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'Mozilla/5.0'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.tracks?.items || []);
        } catch (e) {
          resolve([]);
        }
      });
    });
    req.on('error', () => resolve([]));
    req.end();
  });
}

async function run() {
  const token = await getSpotifyToken();
  console.log('Got Spotify token:', !!token);
  if (!token) return;

  const results = [];
  for (const s of songs) {
    const cleanTitle = s.title.replace(/\(.*?\)/g, '').replace(/\|.*/, '').trim();
    const query = `${s.artist} ${cleanTitle}`;
    const tracks = await searchSpotify(token, query);
    
    if (tracks.length > 0) {
      const top = tracks[0];
      const trackId = top.id;
      const coverUrl = top.album?.images?.[0]?.url || "";
      const albumName = top.album?.name || "";
      const releaseYear = top.album?.release_date ? top.album.release_date.split('-')[0] : "";
      const previewUrl = top.preview_url || "";
      const spotifyUrl = top.external_urls?.spotify || `https://open.spotify.com/track/${trackId}`;

      results.push({
        id: `${s.artist.toLowerCase().replace(/[^a-z0-9]/g, '-')}_${s.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        spotifyId: trackId,
        artist: s.artist,
        title: s.title,
        album: albumName,
        year: releaseYear,
        coverUrl: coverUrl,
        previewAudioUrl: previewUrl,
        spotifyUrl: spotifyUrl,
        embedUrl: `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`
      });
      console.log(`SPOTIFY FOUND: [${s.artist}] "${s.title}" -> "${top.name}" (${trackId}) | cover: ${!!coverUrl}`);
    } else {
      console.error(`SPOTIFY NOT FOUND: ${s.artist} - ${s.title}`);
    }
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
  for (const track of results) {
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
// Official Spotify Embed IDs, High-Res Covers & Track Metadata

export const MUSIC_LIBRARY = ${JSON.stringify(Object.values(grouped), null, 2)};
`;

  fs.writeFileSync('./data/musicLibrary.js', content);
  console.log(`\nALL DONE! Wrote data/musicLibrary.js with ${results.length}/70 official tracks!`);
}

run();
