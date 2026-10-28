const fs = require('fs');
const path = require('path');
const https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const skinsDir = path.join(__dirname, '..', 'public', 'images', 'skins');
const casesDir = path.join(__dirname, '..', 'public', 'images', 'cases');

if (!fs.existsSync(skinsDir)) fs.mkdirSync(skinsDir, { recursive: true });
if (!fs.existsSync(casesDir)) fs.mkdirSync(casesDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log('Already exists:', path.basename(dest));
      return resolve(true);
    }

    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        console.log('Failed', res.statusCode, url);
        return resolve(false);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Downloaded:', path.basename(dest), `(${fs.statSync(dest).size} bytes)`);
        resolve(true);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error('Error downloading:', url, err.message);
      resolve(false);
    });
  });
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Fetching CS2 skins and crates lists...');
  const [skins, crates] = await Promise.all([
    fetchJson('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json'),
    fetchJson('https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/crates.json')
  ]);

  console.log(`Found ${skins.length} skins and ${crates.length} crates.`);

  // List of required CS2 skins
  const neededSkins = [
    { key: 'dragon-lore', query: 'AWP | Dragon Lore' },
    { key: 'fire-serpent', query: 'AK-47 | Fire Serpent' },
    { key: 'printstream', query: 'M4A1-S | Printstream' },
    { key: 'asiimov-awp', query: 'AWP | Asiimov' },
    { key: 'redline', query: 'AK-47 | Redline' },
    { key: 'cortex', query: 'USP-S | Cortex' },
    { key: 'worm-god', query: 'AWP | Worm God' },
    { key: 'karambit-doppler', query: 'Karambit | Doppler' },
    { key: 'butterfly-fade', query: 'Butterfly Knife | Fade' },
    { key: 'm9-lore', query: 'M9 Bayonet | Lore' },
    { key: 'sport-gloves-vice', query: 'Sport Gloves | Vice' },
    { key: 'skeleton-slaughter', query: 'Skeleton Knife | Slaughter' },
    { key: 'gut-crimson-web', query: 'Gut Knife | Crimson Web' },
    { key: 'navaja-damascus', query: 'Navaja Knife | Damascus Steel' },
    { key: 'temukau', query: 'M4A4 | Temukau' },
    { key: 'head-shot', query: 'AK-47 | Head Shot' },
    { key: 'duality', query: 'AWP | Duality' },
    { key: 'umbral-hare', query: 'Glock-18 | Umbral Hare' },
    { key: 'sakkaku', query: 'MAG-7 | BIHN Sakkaku' },
    { key: 'gamma-doppler', query: 'Gut Knife | Gamma Doppler' },
    { key: 'the-empress', query: 'AK-47 | The Empress' },
    { key: 'mecha-industries', query: 'M4A1-S | Mecha Industries' },
    { key: 'decimator', query: 'M4A1-S | Decimator' },
    { key: 'safari-mesh', query: 'AK-47 | Safari Mesh' }
  ];

  for (const item of neededSkins) {
    const skin = skins.find(s => s.name.toLowerCase().includes(item.query.toLowerCase()));
    if (skin && skin.image) {
      const dest = path.join(skinsDir, `${item.key}.png`);
      await downloadFile(skin.image, dest);
    } else {
      console.log('Skin not found for query:', item.query);
    }
  }

  // Crates
  const neededCrates = [
    { key: 'case-revolution', query: 'Revolution Case' },
    { key: 'case-dreams', query: 'Dreams & Nightmares Case' },
    { key: 'case-fracture', query: 'Fracture Case' },
    { key: 'case-bravo', query: 'Operation Bravo Case' },
    { key: 'case-gamma', query: 'Gamma Case' }
  ];

  for (const item of neededCrates) {
    const crate = crates.find(c => c.name.toLowerCase().includes(item.query.toLowerCase()));
    if (crate && crate.image) {
      const dest = path.join(casesDir, `${item.key}.png`);
      await downloadFile(crate.image, dest);
    }
  }

  // Fetch PUBG items from Steam Market
  console.log('Fetching PUBG items from Steam Market...');
  try {
    const pubgMarket = await fetchJson('https://steamcommunity.com/market/search/render/?appid=578080&norender=1&count=100');
    if (pubgMarket && pubgMarket.results) {
      const pubgList = pubgMarket.results;
      const pubgItems = [
        { key: 'pubg-coat', query: 'Playerunknown\'s Trenchcoat' },
        { key: 'pubg-bandana', query: 'Playerunknown\'s Bandana' },
        { key: 'pubg-skirt', query: 'Mini-skirt' },
        { key: 'pubg-shoes', query: 'Hi-top Trainers' },
        { key: 'pubg-aviator', query: 'Aviator' },
        { key: 'pubg-pan', query: 'Pan' },
        { key: 'pubg-crate-gamescom', query: 'GAMESCOM' },
        { key: 'pubg-crate-survivor', query: 'SURVIVOR' },
        { key: 'pubg-crate-wanderer', query: 'WANDERER' }
      ];

      for (const pi of pubgItems) {
        const found = pubgList.find(r => r.name.toLowerCase().includes(pi.query.toLowerCase()));
        if (found && found.asset_description && found.asset_description.icon_url) {
          const imgUrl = 'https://community.akamai.steamstatic.com/economy/image/' + found.asset_description.icon_url;
          const dest = path.join(skinsDir, `${pi.key}.png`);
          await downloadFile(imgUrl, dest);
        }
      }
    }
  } catch (err) {
    console.warn('PUBG market fetch error:', err.message);
  }

  console.log('Setup finished successfully!');
}

main().catch(console.error);
