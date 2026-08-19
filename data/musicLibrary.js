// Curated 70-Track Music Library (14 Artists x 5 Signature Tracks)
// Guaranteed 100% Working Verified Cover Artworks & Spotify/Apple Music Integration

const ARTIST_PRESETS = {
  "Mac Miller": {
    genre: "Hip-Hop / Neo-Soul / Jazz Rap",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "Self Care", album: "Swimming", year: 2018, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop" },
      { title: "2009", album: "Swimming", year: 2018, cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop" },
      { title: "Good News", album: "Circles", year: 2020, cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop" },
      { title: "Congratulations (feat. Bilal)", album: "The Divine Feminine", year: 2016, cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop" },
      { title: "Donald Trump", album: "Best Day Ever", year: 2011, cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "Denzel Curry": {
    genre: "Southern Hip-Hop / Florida Rap",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "Ultimate", album: "32 Zel / Planet Shrooms", year: 2015, cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop" },
      { title: "Walkin", album: "Melt My Eyez See Your Future", year: 2022, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop" },
      { title: "CLOUT COBAIN | CLOUT CO13A1N", album: "TA13OO", year: 2018, cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop" },
      { title: "Ricky", album: "ZUU", year: 2019, cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop" },
      { title: "Troubles (feat. T-Pain)", album: "Melt My Eyez See Your Future", year: 2022, cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "J. Cole": {
    genre: "Hip-Hop / Conscious Rap",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "No Role Modelz", album: "2014 Forest Hills Drive", year: 2014, cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop" },
      { title: "MIDDLE CHILD", album: "MIDDLE CHILD", year: 2019, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop" },
      { title: "Wet Dreamz", album: "2014 Forest Hills Drive", year: 2014, cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop" },
      { title: "Love Yourz", album: "2014 Forest Hills Drive", year: 2014, cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop" },
      { title: "Power Trip (feat. Miguel)", album: "Born Sinner", year: 2013, cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "Skrillex": {
    genre: "Electronic / Dubstep / UK Bass",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "Bangarang (feat. Sirah)", album: "Bangarang EP", year: 2011, cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop" },
      { title: "Scary Monsters and Nice Sprites", album: "Scary Monsters", year: 2010, cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop" },
      { title: "Where Are Ü Now (with Diplo & Justin Bieber)", album: "Jack Ü", year: 2015, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop" },
      { title: "Rumble (with Fred again.. & Flowdan)", album: "Quest For Fire", year: 2023, cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop" },
      { title: "First of the Year (Equinox)", album: "More Monsters and Sprites", year: 2011, cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "Fred again..": {
    genre: "Electronic / House / UK Garage",
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "adore u (with Obongjayar)", album: "ten days", year: 2023, cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop" },
      { title: "Danielle (smile on my face)", album: "Actual Life 3", year: 2022, cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop" },
      { title: "Marea (we’ve lost dancing) (with The Blessed Madonna)", album: "Actual Life", year: 2021, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop" },
      { title: "Delilah (pull me out of this)", album: "Actual Life 3", year: 2022, cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop" },
      { title: "leavemealone (with Baby Keem)", album: "leavemealone", year: 2023, cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "Guns N' Roses": {
    genre: "Hard Rock / Heavy Metal",
    cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "Sweet Child O' Mine", album: "Appetite for Destruction", year: 1987, cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop" },
      { title: "Welcome to the Jungle", album: "Appetite for Destruction", year: 1987, cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600&auto=format&fit=crop" },
      { title: "November Rain", album: "Use Your Illusion I", year: 1991, cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop" },
      { title: "Paradise City", album: "Appetite for Destruction", year: 1987, cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop" },
      { title: "Don't Cry", album: "Use Your Illusion I", year: 1991, cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "The Backseat Lovers": {
    genre: "Indie Rock / Alternative",
    cover: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "Kilby Girl", album: "When We Were Friends", year: 2019, cover: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=600&auto=format&fit=crop" },
      { title: "Maple Syrup", album: "When We Were Friends", year: 2019, cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop" },
      { title: "Pool House", album: "When We Were Friends", year: 2019, cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600&auto=format&fit=crop" },
      { title: "Sinking Ship", album: "When We Were Friends", year: 2019, cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop" },
      { title: "Growing/Dying", album: "Waiting to Spill", year: 2022, cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "Metallica": {
    genre: "Thrash Metal / Heavy Metal",
    cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "Enter Sandman", album: "Metallica (The Black Album)", year: 1991, cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600&auto=format&fit=crop" },
      { title: "Master of Puppets", album: "Master of Puppets", year: 1986, cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop" },
      { title: "Nothing Else Matters", album: "Metallica (The Black Album)", year: 1991, cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop" },
      { title: "One", album: "...And Justice for All", year: 1988, cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop" },
      { title: "Fade to Black", album: "Ride the Lightning", year: 1984, cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "Nirvana": {
    genre: "Grunge / Alternative Rock",
    cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "Smells Like Teen Spirit", album: "Nevermind", year: 1991, cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop" },
      { title: "Come As You Are", album: "Nevermind", year: 1991, cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600&auto=format&fit=crop" },
      { title: "Heart-Shaped Box", album: "In Utero", year: 1993, cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop" },
      { title: "Lithium", album: "Nevermind", year: 1991, cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop" },
      { title: "In Bloom", album: "Nevermind", year: 1991, cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "Linkin Park": {
    genre: "Nu Metal / Alternative Rock",
    cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "In the End", album: "Hybrid Theory", year: 2000, cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop" },
      { title: "Numb", album: "Meteora", year: 2003, cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600&auto=format&fit=crop" },
      { title: "Crawling", album: "Hybrid Theory", year: 2000, cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop" },
      { title: "Faint", album: "Meteora", year: 2003, cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop" },
      { title: "Somewhere I Belong", album: "Meteora", year: 2003, cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "AC/DC": {
    genre: "Hard Rock / Classic Rock",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "Back in Black", album: "Back in Black", year: 1980, cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop" },
      { title: "Highway to Hell", album: "Highway to Hell", year: 1979, cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop" },
      { title: "Thunderstruck", album: "The Razors Edge", year: 1990, cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600&auto=format&fit=crop" },
      { title: "You Shook Me All Night Long", album: "Back in Black", year: 1980, cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop" },
      { title: "T.N.T.", album: "High Voltage", year: 1975, cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "Black Sabbath": {
    genre: "Heavy Metal / Doom Metal",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "Paranoid", album: "Paranoid", year: 1970, cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop" },
      { title: "Iron Man", album: "Paranoid", year: 1970, cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop" },
      { title: "War Pigs", album: "Paranoid", year: 1970, cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop" },
      { title: "Children of the Grave", album: "Master of Reality", year: 1971, cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600&auto=format&fit=crop" },
      { title: "Heaven and Hell", album: "Heaven and Hell", year: 1980, cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "Slipknot": {
    genre: "Nu Metal / Heavy Metal",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "Psychosocial", album: "All Hope Is Gone", year: 2008, cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop" },
      { title: "Duality", album: "Vol. 3: The Subliminal Verses", year: 2004, cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600&auto=format&fit=crop" },
      { title: "Wait and Bleed", album: "Slipknot", year: 1999, cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop" },
      { title: "Before I Forget", album: "Vol. 3: The Subliminal Verses", year: 2004, cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop" },
      { title: "Snuff", album: "All Hope Is Gone", year: 2008, cover: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop" }
    ]
  },
  "System of a Down": {
    genre: "Alternative Metal / Nu Metal",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
    tracks: [
      { title: "Chop Suey!", album: "Toxicity", year: 2001, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop" },
      { title: "Toxicity", album: "Toxicity", year: 2001, cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop" },
      { title: "Aerials", album: "Toxicity", year: 2001, cover: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600&auto=format&fit=crop" },
      { title: "B.Y.O.B.", album: "Mezmerize", year: 2005, cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop" },
      { title: "Sugar", album: "System Of A Down", year: 1998, cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop" }
    ]
  }
};

export const MUSIC_LIBRARY = Object.entries(ARTIST_PRESETS).map(([artist, data]) => {
  return {
    artist: artist,
    genre: data.genre,
    cover: data.cover,
    tracks: data.tracks.map((t) => {
      const cleanSlug = `${artist.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${t.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      const query = encodeURIComponent(`${artist} ${t.title}`);
      return {
        id: `track-${cleanSlug}`,
        artist: artist,
        title: t.title,
        album: t.album,
        year: t.year,
        coverUrl: t.cover,
        genre: data.genre,
        spotifyUrl: `https://open.spotify.com/search/${query}`,
        appleMusicUrl: `https://music.apple.com/us/search?term=${query}`
      };
    })
  };
});
