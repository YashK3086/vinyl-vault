const https = require('https');

const candidateCovers = {
  mac_miller: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop",
  denzel_curry: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
  j_cole: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
  skrillex: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop",
  fred_again: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop",
  guns_n_roses: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=600&auto=format&fit=crop",
  the_backseat_lovers: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=600&auto=format&fit=crop",
  metallica: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=600&auto=format&fit=crop",
  nirvana: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=600&auto=format&fit=crop",
  linkin_park: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=600&auto=format&fit=crop",
  ac_dc: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=600&auto=format&fit=crop",
  black_sabbath: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop",
  slipknot: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop",
  system_of_a_down: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop"
};

function check(name, url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`${name}: HTTP ${res.statusCode}`);
      resolve(res.statusCode === 200);
    }).on('error', () => {
      console.log(`${name}: Error`);
      resolve(false);
    });
  });
}

async function main() {
  for (const [k, v] of Object.entries(candidateCovers)) {
    await check(k, v);
  }
}
main();
