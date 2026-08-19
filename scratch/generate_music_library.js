const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('./data/musicLibraryData.json', 'utf8'));

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
for (const track of raw) {
  if (!grouped[track.artist]) {
    grouped[track.artist] = {
      artist: track.artist,
      genre: artistGenres[track.artist] || "Rock & Hip-Hop",
      tracks: []
    };
  }
  // Ensure Self Care and 2009 have the Swimming album cover if Circles was matched
  if (track.artist === "Mac Miller" && (track.title === "Self Care" || track.title === "2009")) {
    track.album = "Swimming";
    track.coverUrl = "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/bf/16/be/bf16be70-4e38-968b-f283-74d788e0b6d2/093624905981.jpg/600x600bb.jpg";
  }
  grouped[track.artist].tracks.push(track);
}

const fileContent = `// Curated 30-Second Music Preview Library with Cover Art
// 14 Featured Artists x 5 Signature Tracks each = 70 Tracks

export const MUSIC_LIBRARY = ${JSON.stringify(Object.values(grouped), null, 2)};
`;

fs.writeFileSync('./data/musicLibrary.js', fileContent);
console.log('Successfully wrote data/musicLibrary.js with', Object.keys(grouped).length, 'artists');
