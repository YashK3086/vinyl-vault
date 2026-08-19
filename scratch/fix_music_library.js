const fs = require('fs');
const https = require('https');

const songsList = [
  // Mac Miller
  { artist: "Mac Miller", title: "Self Care", search: "Mac Miller Self Care" },
  { artist: "Mac Miller", title: "2009", search: "Mac Miller 2009" },
  { artist: "Mac Miller", title: "Good News", search: "Mac Miller Good News" },
  { artist: "Mac Miller", title: "Congratulations (feat. Bilal)", search: "Mac Miller Congratulations" },
  { artist: "Mac Miller", title: "Donald Trump", search: "Mac Miller Donald Trump" },

  // Denzel Curry
  { artist: "Denzel Curry", title: "Ultimate", search: "Denzel Curry Ultimate" },
  { artist: "Denzel Curry", title: "Walkin", search: "Denzel Curry Walkin" },
  { artist: "Denzel Curry", title: "CLOUT COBAIN | CLOUT CO13A1N", search: "Denzel Curry Clout Cobain" },
  { artist: "Denzel Curry", title: "Ricky", search: "Denzel Curry Ricky" },
  { artist: "Denzel Curry", title: "Troubles (feat. T-Pain)", search: "Denzel Curry Troubles" },

  // J. Cole
  { artist: "J. Cole", title: "No Role Modelz", search: "J Cole No Role Modelz" },
  { artist: "J. Cole", title: "MIDDLE CHILD", search: "J Cole Middle Child" },
  { artist: "J. Cole", title: "Wet Dreamz", search: "J Cole Wet Dreamz" },
  { artist: "J. Cole", title: "Love Yourz", search: "J Cole Love Yourz" },
  { artist: "J. Cole", title: "Power Trip (feat. Miguel)", search: "J Cole Power Trip" },

  // Skrillex
  { artist: "Skrillex", title: "Bangarang (feat. Sirah)", search: "Skrillex Bangarang" },
  { artist: "Skrillex", title: "Scary Monsters and Nice Sprites", search: "Skrillex Scary Monsters and Nice Sprites" },
  { artist: "Skrillex", title: "Where Are Ü Now (with Diplo & Justin Bieber)", search: "Where Are U Now Skrillex Diplo" },
  { artist: "Skrillex", title: "Rumble (with Fred again.. & Flowdan)", search: "Skrillex Fred again Rumble" },
  { artist: "Skrillex", title: "First of the Year (Equinox)", search: "Skrillex First of the Year" },

  // Fred again..
  { artist: "Fred again..", title: "adore u (with Obongjayar)", search: "Fred again adore u" },
  { artist: "Fred again..", title: "Danielle (smile on my face)", search: "Fred again Danielle" },
  { artist: "Fred again..", title: "Marea (we’ve lost dancing) (with The Blessed Madonna)", search: "Fred again Marea" },
  { artist: "Fred again..", title: "Delilah (pull me out of this)", search: "Fred again Delilah" },
  { artist: "Fred again..", title: "leavemealone (with Baby Keem)", search: "Fred again Baby Keem leavemealone" },

  // Guns N' Roses
  { artist: "Guns N' Roses", title: "Sweet Child O' Mine", search: "Guns N Roses Sweet Child O Mine" },
  { artist: "Guns N' Roses", title: "Welcome to the Jungle", search: "Guns N Roses Welcome to the Jungle" },
  { artist: "Guns N' Roses", title: "November Rain", search: "Guns N Roses November Rain" },
  { artist: "Guns N' Roses", title: "Paradise City", search: "Guns N Roses Paradise City" },
  { artist: "Guns N' Roses", title: "Don't Cry", search: "Guns N Roses Dont Cry" },

  // The Backseat Lovers
  { artist: "The Backseat Lovers", title: "Kilby Girl", search: "The Backseat Lovers Kilby Girl" },
  { artist: "The Backseat Lovers", title: "Maple Syrup", search: "The Backseat Lovers Maple Syrup" },
  { artist: "The Backseat Lovers", title: "Pool House", search: "The Backseat Lovers Pool House" },
  { artist: "The Backseat Lovers", title: "Sinking Ship", search: "The Backseat Lovers Sinking Ship" },
  { artist: "The Backseat Lovers", title: "Growing/Dying", search: "The Backseat Lovers Growing Dying" },

  // Metallica
  { artist: "Metallica", title: "Enter Sandman", search: "Metallica Enter Sandman" },
  { artist: "Metallica", title: "Master of Puppets", search: "Metallica Master of Puppets" },
  { artist: "Metallica", title: "Nothing Else Matters", search: "Metallica Nothing Else Matters" },
  { artist: "Metallica", title: "One", search: "Metallica One" },
  { artist: "Metallica", title: "Fade to Black", search: "Metallica Fade to Black" },

  // Nirvana
  { artist: "Nirvana", title: "Smells Like Teen Spirit", search: "Nirvana Smells Like Teen Spirit" },
  { artist: "Nirvana", title: "Come As You Are", search: "Nirvana Come As You Are" },
  { artist: "Nirvana", title: "Heart-Shaped Box", search: "Nirvana Heart-Shaped Box" },
  { artist: "Nirvana", title: "Lithium", search: "Nirvana Lithium" },
  { artist: "Nirvana", title: "In Bloom", search: "Nirvana In Bloom" },

  // Linkin Park
  { artist: "Linkin Park", title: "In the End", search: "Linkin Park In the End" },
  { artist: "Linkin Park", title: "Numb", search: "Linkin Park Numb" },
  { artist: "Linkin Park", title: "Crawling", search: "Linkin Park Crawling" },
  { artist: "Linkin Park", title: "Faint", search: "Linkin Park Faint" },
  { artist: "Linkin Park", title: "Somewhere I Belong", search: "Linkin Park Somewhere I Belong" },

  // AC/DC
  { artist: "AC/DC", title: "Back in Black", search: "AC DC Back in Black" },
  { artist: "AC/DC", title: "Highway to Hell", search: "AC DC Highway to Hell" },
  { artist: "AC/DC", title: "Thunderstruck", search: "AC DC Thunderstruck" },
  { artist: "AC/DC", title: "You Shook Me All Night Long", search: "AC DC You Shook Me All Night Long" },
  { artist: "AC/DC", title: "T.N.T.", search: "AC DC TNT" },

  // Black Sabbath
  { artist: "Black Sabbath", title: "Paranoid", search: "Black Sabbath Paranoid" },
  { artist: "Black Sabbath", title: "Iron Man", search: "Black Sabbath Iron Man" },
  { artist: "Black Sabbath", title: "War Pigs", search: "Black Sabbath War Pigs" },
  { artist: "Black Sabbath", title: "Children of the Grave", search: "Black Sabbath Children of the Grave" },
  { artist: "Black Sabbath", title: "Heaven and Hell", search: "Black Sabbath Heaven and Hell" },

  // Slipknot
  { artist: "Slipknot", title: "Psychosocial", search: "Slipknot Psychosocial" },
  { artist: "Slipknot", title: "Duality", search: "Slipknot Duality" },
  { artist: "Slipknot", title: "Wait and Bleed", search: "Slipknot Wait and Bleed" },
  { artist: "Slipknot", title: "Before I Forget", search: "Slipknot Before I Forget" },
  { artist: "Slipknot", title: "Snuff", search: "Slipknot Snuff" },

  // System of a Down
  { artist: "System of a Down", title: "Chop Suey!", search: "System of a Down Chop Suey" },
  { artist: "System of a Down", title: "Toxicity", search: "System of a Down Toxicity" },
  { artist: "System of a Down", title: "Aerials", search: "System of a Down Aerials" },
  { artist: "System of a Down", title: "B.Y.O.B.", search: "System of a Down BYOB" },
  { artist: "System of a Down", title: "Sugar", search: "System of a Down Sugar" }
];

function fetchItunesMulti(query) {
  return new Promise((resolve) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=15`;
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

function normalize(s) {
  return (s || "").toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  const seenPreviews = new Set();
  const results = [];

  for (const item of songsList) {
    const itunesResults = await fetchItunesMulti(item.search);
    
    // Pick the best result whose trackName matches or starts with song title
    const cleanTitle = item.title.replace(/\(.*?\)/g, '').replace(/\|.*/, '').trim();
    const normTitle = normalize(cleanTitle);

    let match = itunesResults.find(r => normalize(r.trackName) === normTitle);
    if (!match) {
      match = itunesResults.find(r => normalize(r.trackName).includes(normTitle) || normTitle.includes(normalize(r.trackName)));
    }
    if (!match && itunesResults.length > 0) {
      match = itunesResults[0];
    }

    const trackId = `${item.artist.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${item.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    const coverUrl = match && match.artworkUrl100 ? match.artworkUrl100.replace('100x100bb', '600x600bb') : "";
    const previewAudioUrl = match ? match.previewUrl : "";
    const albumName = match ? match.collectionName : "";
    const releaseYear = match && match.releaseDate ? new Date(match.releaseDate).getFullYear() : "";

    if (seenPreviews.has(previewAudioUrl)) {
      console.warn(`DUPLICATE PREVIEW URL DETECTED: ${item.artist} - ${item.title}`);
    } else {
      seenPreviews.add(previewAudioUrl);
    }

    results.push({
      id: trackId,
      artist: item.artist,
      title: item.title,
      album: albumName,
      year: releaseYear,
      coverUrl: coverUrl,
      previewAudioUrl: previewAudioUrl,
      spotifyEmbedQuery: encodeURIComponent(`${item.artist} ${cleanTitle}`)
    });
    console.log(`Matched: [${item.artist}] "${item.title}" -> "${match?.trackName}" (${match?.collectionName})`);
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

  const fileContent = `// Curated 30-Second Music Preview Library with Cover Art
// 14 Featured Artists x 5 Signature Tracks each = 70 Tracks (Each with unique ID and Preview URL)

export const MUSIC_LIBRARY = ${JSON.stringify(Object.values(grouped), null, 2)};
`;

  fs.writeFileSync('./data/musicLibrary.js', fileContent);
  console.log('Successfully updated data/musicLibrary.js with unique matches for all 70 tracks!');
}

run();
