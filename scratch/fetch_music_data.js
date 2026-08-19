const fs = require('fs');
const https = require('https');

const songsList = [
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

function fetchItunes(query) {
  return new Promise((resolve) => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&entity=song&limit=1`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.results && json.results.length > 0) {
            resolve(json.results[0]);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const results = [];
  for (const song of songsList) {
    const cleanTitle = song.title.replace(/\(.*?\)/g, '').replace(/\|.*/, '').trim();
    const query = `${song.artist} ${cleanTitle}`;
    const itunes = await fetchItunes(query);
    const coverUrl = itunes && itunes.artworkUrl100 ? itunes.artworkUrl100.replace('100x100bb', '600x600bb') : null;
    const previewAudioUrl = itunes ? itunes.previewUrl : null;
    const albumName = itunes ? itunes.collectionName : "";
    const releaseYear = itunes && itunes.releaseDate ? new Date(itunes.releaseDate).getFullYear() : "";

    results.push({
      artist: song.artist,
      title: song.title,
      album: albumName,
      year: releaseYear,
      coverUrl: coverUrl,
      previewAudioUrl: previewAudioUrl,
      spotifyEmbedQuery: encodeURIComponent(`${song.artist} ${cleanTitle}`)
    });
    console.log(`Processed: ${song.artist} - ${song.title}`);
  }

  fs.writeFileSync('./data/musicLibraryData.json', JSON.stringify(results, null, 2));
  console.log('Saved data/musicLibraryData.json');
}

run();
