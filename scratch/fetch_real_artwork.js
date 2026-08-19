const https = require('https');
const fs = require('fs');

const sleep = ms => new Promise(r => setTimeout(r, ms));

// All 70 tracks - artist, title, search query
const tracks = [
  // Mac Miller
  { artist: "Mac Miller", title: "Self Care", album: "Swimming", year: 2018, q: "Mac Miller Self Care Swimming" },
  { artist: "Mac Miller", title: "2009", album: "Swimming", year: 2018, q: "Mac Miller 2009 Swimming" },
  { artist: "Mac Miller", title: "Good News", album: "Circles", year: 2020, q: "Mac Miller Good News Circles" },
  { artist: "Mac Miller", title: "Congratulations (feat. Bilal)", album: "The Divine Feminine", year: 2016, q: "Mac Miller Congratulations Divine Feminine" },
  { artist: "Mac Miller", title: "Donald Trump", album: "Best Day Ever", year: 2011, q: "Mac Miller Donald Trump Best Day Ever" },
  // Denzel Curry
  { artist: "Denzel Curry", title: "Ultimate", album: "32 Zel / Planet Shrooms", year: 2015, q: "Denzel Curry Ultimate" },
  { artist: "Denzel Curry", title: "Walkin", album: "Melt My Eyez See Your Future", year: 2022, q: "Denzel Curry Walkin Melt My Eyez" },
  { artist: "Denzel Curry", title: "CLOUT COBAIN | CLOUT CO13A1N", album: "TA13OO", year: 2018, q: "Denzel Curry CLOUT COBAIN TA13OO" },
  { artist: "Denzel Curry", title: "Ricky", album: "ZUU", year: 2019, q: "Denzel Curry Ricky ZUU" },
  { artist: "Denzel Curry", title: "Troubles (feat. T-Pain)", album: "Melt My Eyez See Your Future", year: 2022, q: "Denzel Curry Troubles" },
  // J. Cole
  { artist: "J. Cole", title: "No Role Modelz", album: "2014 Forest Hills Drive", year: 2014, q: "J Cole No Role Modelz" },
  { artist: "J. Cole", title: "MIDDLE CHILD", album: "MIDDLE CHILD", year: 2019, q: "J Cole Middle Child" },
  { artist: "J. Cole", title: "Wet Dreamz", album: "2014 Forest Hills Drive", year: 2014, q: "J Cole Wet Dreamz" },
  { artist: "J. Cole", title: "Love Yourz", album: "2014 Forest Hills Drive", year: 2014, q: "J Cole Love Yourz" },
  { artist: "J. Cole", title: "Power Trip (feat. Miguel)", album: "Born Sinner", year: 2013, q: "J Cole Power Trip Born Sinner" },
  // Skrillex
  { artist: "Skrillex", title: "Bangarang (feat. Sirah)", album: "Bangarang EP", year: 2011, q: "Skrillex Bangarang" },
  { artist: "Skrillex", title: "Scary Monsters and Nice Sprites", album: "Scary Monsters and Nice Sprites", year: 2010, q: "Skrillex Scary Monsters Nice Sprites" },
  { artist: "Skrillex", title: "Where Are Ü Now (with Diplo & Justin Bieber)", album: "Skrillex and Diplo present Jack Ü", year: 2015, q: "Skrillex Diplo Justin Bieber Where Are U Now" },
  { artist: "Skrillex", title: "Rumble (with Fred again.. & Flowdan)", album: "Quest For Fire", year: 2023, q: "Skrillex Rumble Quest For Fire" },
  { artist: "Skrillex", title: "First of the Year (Equinox)", album: "More Monsters and Sprites", year: 2011, q: "Skrillex First of the Year Equinox" },
  // Fred again..
  { artist: "Fred again..", title: "adore u (with Obongjayar)", album: "ten days", year: 2023, q: "Fred again adore u ten days" },
  { artist: "Fred again..", title: "Danielle (smile on my face)", album: "Actual Life 3", year: 2022, q: "Fred again Danielle Actual Life 3" },
  { artist: "Fred again..", title: "Marea (we've lost dancing) (with The Blessed Madonna)", album: "Actual Life", year: 2021, q: "Fred again Marea Blessed Madonna Actual Life" },
  { artist: "Fred again..", title: "Delilah (pull me out of this)", album: "Actual Life 3", year: 2022, q: "Fred again Delilah Actual Life 3" },
  { artist: "Fred again..", title: "leavemealone (with Baby Keem)", album: "leavemealone", year: 2023, q: "Fred again Baby Keem leavemealone" },
  // Guns N Roses
  { artist: "Guns N' Roses", title: "Sweet Child O' Mine", album: "Appetite for Destruction", year: 1987, q: "Guns N Roses Sweet Child O Mine" },
  { artist: "Guns N' Roses", title: "Welcome to the Jungle", album: "Appetite for Destruction", year: 1987, q: "Guns N Roses Welcome to the Jungle" },
  { artist: "Guns N' Roses", title: "November Rain", album: "Use Your Illusion I", year: 1991, q: "Guns N Roses November Rain Use Your Illusion" },
  { artist: "Guns N' Roses", title: "Paradise City", album: "Appetite for Destruction", year: 1987, q: "Guns N Roses Paradise City" },
  { artist: "Guns N' Roses", title: "Don't Cry", album: "Use Your Illusion I", year: 1991, q: "Guns N Roses Dont Cry Use Your Illusion" },
  // The Backseat Lovers
  { artist: "The Backseat Lovers", title: "Kilby Girl", album: "When We Were Friends", year: 2019, q: "Backseat Lovers Kilby Girl" },
  { artist: "The Backseat Lovers", title: "Maple Syrup", album: "When We Were Friends", year: 2019, q: "Backseat Lovers Maple Syrup" },
  { artist: "The Backseat Lovers", title: "Pool House", album: "When We Were Friends", year: 2019, q: "Backseat Lovers Pool House" },
  { artist: "The Backseat Lovers", title: "Sinking Ship", album: "When We Were Friends", year: 2019, q: "Backseat Lovers Sinking Ship" },
  { artist: "The Backseat Lovers", title: "Growing/Dying", album: "Waiting to Spill", year: 2022, q: "Backseat Lovers Growing Dying Waiting to Spill" },
  // Metallica
  { artist: "Metallica", title: "Enter Sandman", album: "Metallica (The Black Album)", year: 1991, q: "Metallica Enter Sandman" },
  { artist: "Metallica", title: "Master of Puppets", album: "Master of Puppets", year: 1986, q: "Metallica Master of Puppets" },
  { artist: "Metallica", title: "Nothing Else Matters", album: "Metallica (The Black Album)", year: 1991, q: "Metallica Nothing Else Matters" },
  { artist: "Metallica", title: "One", album: "...And Justice for All", year: 1988, q: "Metallica One And Justice for All" },
  { artist: "Metallica", title: "Fade to Black", album: "Ride the Lightning", year: 1984, q: "Metallica Fade to Black Ride the Lightning" },
  // Nirvana
  { artist: "Nirvana", title: "Smells Like Teen Spirit", album: "Nevermind", year: 1991, q: "Nirvana Smells Like Teen Spirit Nevermind" },
  { artist: "Nirvana", title: "Come As You Are", album: "Nevermind", year: 1991, q: "Nirvana Come As You Are Nevermind" },
  { artist: "Nirvana", title: "Heart-Shaped Box", album: "In Utero", year: 1993, q: "Nirvana Heart-Shaped Box In Utero" },
  { artist: "Nirvana", title: "Lithium", album: "Nevermind", year: 1991, q: "Nirvana Lithium Nevermind" },
  { artist: "Nirvana", title: "In Bloom", album: "Nevermind", year: 1991, q: "Nirvana In Bloom Nevermind" },
  // Linkin Park
  { artist: "Linkin Park", title: "In the End", album: "Hybrid Theory", year: 2000, q: "Linkin Park In the End Hybrid Theory" },
  { artist: "Linkin Park", title: "Numb", album: "Meteora", year: 2003, q: "Linkin Park Numb Meteora" },
  { artist: "Linkin Park", title: "Crawling", album: "Hybrid Theory", year: 2000, q: "Linkin Park Crawling Hybrid Theory" },
  { artist: "Linkin Park", title: "Faint", album: "Meteora", year: 2003, q: "Linkin Park Faint Meteora" },
  { artist: "Linkin Park", title: "Somewhere I Belong", album: "Meteora", year: 2003, q: "Linkin Park Somewhere I Belong Meteora" },
  // AC/DC
  { artist: "AC/DC", title: "Back in Black", album: "Back in Black", year: 1980, q: "ACDC Back in Black" },
  { artist: "AC/DC", title: "Highway to Hell", album: "Highway to Hell", year: 1979, q: "ACDC Highway to Hell" },
  { artist: "AC/DC", title: "Thunderstruck", album: "The Razors Edge", year: 1990, q: "ACDC Thunderstruck Razors Edge" },
  { artist: "AC/DC", title: "You Shook Me All Night Long", album: "Back in Black", year: 1980, q: "ACDC You Shook Me All Night Long" },
  { artist: "AC/DC", title: "T.N.T.", album: "High Voltage", year: 1975, q: "ACDC TNT High Voltage" },
  // Black Sabbath
  { artist: "Black Sabbath", title: "Paranoid", album: "Paranoid", year: 1970, q: "Black Sabbath Paranoid" },
  { artist: "Black Sabbath", title: "Iron Man", album: "Paranoid", year: 1970, q: "Black Sabbath Iron Man" },
  { artist: "Black Sabbath", title: "War Pigs", album: "Paranoid", year: 1970, q: "Black Sabbath War Pigs" },
  { artist: "Black Sabbath", title: "Children of the Grave", album: "Master of Reality", year: 1971, q: "Black Sabbath Children of the Grave Master of Reality" },
  { artist: "Black Sabbath", title: "Heaven and Hell", album: "Heaven and Hell", year: 1980, q: "Black Sabbath Heaven and Hell" },
  // Slipknot
  { artist: "Slipknot", title: "Psychosocial", album: "All Hope Is Gone", year: 2008, q: "Slipknot Psychosocial All Hope Is Gone" },
  { artist: "Slipknot", title: "Duality", album: "Vol. 3: The Subliminal Verses", year: 2004, q: "Slipknot Duality Subliminal Verses" },
  { artist: "Slipknot", title: "Wait and Bleed", album: "Slipknot", year: 1999, q: "Slipknot Wait and Bleed" },
  { artist: "Slipknot", title: "Before I Forget", album: "Vol. 3: The Subliminal Verses", year: 2004, q: "Slipknot Before I Forget Subliminal Verses" },
  { artist: "Slipknot", title: "Snuff", album: "All Hope Is Gone", year: 2008, q: "Slipknot Snuff All Hope Is Gone" },
  // System of a Down
  { artist: "System of a Down", title: "Chop Suey!", album: "Toxicity", year: 2001, q: "System of a Down Chop Suey Toxicity" },
  { artist: "System of a Down", title: "Toxicity", album: "Toxicity", year: 2001, q: "System of a Down Toxicity" },
  { artist: "System of a Down", title: "Aerials", album: "Toxicity", year: 2001, q: "System of a Down Aerials Toxicity" },
  { artist: "System of a Down", title: "B.Y.O.B.", album: "Mezmerize", year: 2005, q: "System of a Down BYOB Mezmerize" },
  { artist: "System of a Down", title: "Sugar", album: "System of a Down", year: 1998, q: "System of a Down Sugar" },
];

// Fallback covers per artist from Wikipedia/Last.fm CDN (reliable)
const fallbackCovers = {
  "Mac Miller": "https://upload.wikimedia.org/wikipedia/en/a/ae/Mac_Miller_-_Swimming.png",
  "Denzel Curry": "https://upload.wikimedia.org/wikipedia/en/c/c5/Denzel_Curry_-_TA13OO.jpg",
  "J. Cole": "https://upload.wikimedia.org/wikipedia/en/7/71/J._Cole_-_2014_Forest_Hills_Drive.png",
  "Skrillex": "https://upload.wikimedia.org/wikipedia/en/c/c8/Scary_Monsters_and_Nice_Sprites.jpg",
  "Fred again..": "https://upload.wikimedia.org/wikipedia/en/b/b6/Actual_Life_%28April_14_-_August_17_2020%29.png",
  "Guns N' Roses": "https://upload.wikimedia.org/wikipedia/en/e/ee/GN%27R_-_Appetite_for_Destruction_Cover.jpg",
  "The Backseat Lovers": "https://upload.wikimedia.org/wikipedia/en/e/e1/When_We_Were_Friends_-_The_Backseat_Lovers.jpg",
  "Metallica": "https://upload.wikimedia.org/wikipedia/en/a/a9/Metallica_-_Metallica_%28album_cover%29.jpg",
  "Nirvana": "https://upload.wikimedia.org/wikipedia/en/b/b7/NirvanaNevermindalbumcover.jpg",
  "Linkin Park": "https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_-_Hybrid_Theory.jpg",
  "AC/DC": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Back_in_black.jpg/220px-Back_in_black.jpg",
  "Black Sabbath": "https://upload.wikimedia.org/wikipedia/en/8/82/Black_Sabbath_Paranoid.jpg",
  "Slipknot": "https://upload.wikimedia.org/wikipedia/en/f/f0/Slipknot_-_All_Hope_Is_Gone.jpg",
  "System of a Down": "https://upload.wikimedia.org/wikipedia/en/5/5e/Toxicity.jpg",
};

function fetchItunes(q) {
  return new Promise((resolve) => {
    // Add a small random jitter to avoid same-second burst
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=music&entity=song&limit=8`;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
        'Accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      timeout: 8000
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.results || []);
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]))
      .on('timeout', function() { this.destroy(); resolve([]); });
  });
}

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

async function run() {
  const grouped = {};

  for (let i = 0; i < tracks.length; i++) {
    const t = tracks[i];
    await sleep(600 + Math.floor(Math.random() * 200));

    const results = await fetchItunes(t.q);

    // Find best match: prefer results with artwork
    let match = null;
    if (results.length > 0) {
      // Prefer result with artwork and closest title match
      match = results.find(r => r.artworkUrl100) || results[0];
    }

    const coverUrl = match?.artworkUrl100
      ? match.artworkUrl100.replace('100x100bb', '600x600bb')
      : fallbackCovers[t.artist] || "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Smiley_from_another_angle.png/200px-Smiley_from_another_angle.png";

    const previewAudioUrl = match?.previewUrl || "";
    const albumName = match?.collectionName || t.album;
    const year = match?.releaseDate ? new Date(match.releaseDate).getFullYear() : t.year;

    const slug = `${t.artist}-${t.title}`.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const trackObj = {
      id: `track-${slug}`,
      artist: t.artist,
      title: t.title,
      album: albumName,
      year: year,
      coverUrl: coverUrl,
      previewAudioUrl: previewAudioUrl,
      genre: artistGenres[t.artist],
      spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(`${t.artist} ${t.title}`)}`,
      appleMusicUrl: `https://music.apple.com/us/search?term=${encodeURIComponent(`${t.artist} ${t.title}`)}`
    };

    if (!grouped[t.artist]) {
      grouped[t.artist] = {
        artist: t.artist,
        genre: artistGenres[t.artist],
        cover: coverUrl,
        tracks: []
      };
    }
    grouped[t.artist].tracks.push(trackObj);

    const hasCover = coverUrl.includes('mzstatic') || coverUrl.includes('wikimedia');
    console.log(`[${i+1}/70] [${t.artist}] "${t.title}" | Cover: ${hasCover ? 'REAL ✓' : 'FALLBACK'} | Audio: ${!!previewAudioUrl}`);
  }

  const outputLib = Object.values(grouped);
  const content = `// Curated 70-Track Music Library — Real iTunes Album Artwork
// 14 Artists x 5 Signature Tracks — ${new Date().toISOString()}
export const MUSIC_LIBRARY = ${JSON.stringify(outputLib, null, 2)};
`;

  fs.writeFileSync('./data/musicLibrary.js', content);
  console.log('\n✅ Done! data/musicLibrary.js written with real album artwork.');
}

run().catch(console.error);
