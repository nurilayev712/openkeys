export const RARITY_CONFIG = {
  milspec: {
    name: 'Mil-Spec',
    color: '#4b69ff',
    border: 'border-blue-500/50',
    bg: 'bg-blue-950/20',
    text: 'text-blue-400',
    glow: 'glow-milspec'
  },
  restricted: {
    name: 'Restricted',
    color: '#8847ff',
    border: 'border-purple-500/50',
    bg: 'bg-purple-950/20',
    text: 'text-purple-400',
    glow: 'glow-restricted'
  },
  classified: {
    name: 'Classified',
    color: '#d32ce6',
    border: 'border-fuchsia-500/50',
    bg: 'bg-fuchsia-950/20',
    text: 'text-fuchsia-400',
    glow: 'glow-classified'
  },
  covert: {
    name: 'Covert',
    color: '#eb4b4b',
    border: 'border-rose-500/60',
    bg: 'bg-rose-950/25',
    text: 'text-rose-400',
    glow: 'glow-covert'
  },
  special: {
    name: 'Extraordinary / Knife',
    color: '#ffd043',
    border: 'border-yellow-400/80',
    bg: 'bg-yellow-950/30',
    text: 'text-yellow-400',
    glow: 'glow-special'
  },
  pubglegend: {
    name: 'Legendary',
    color: '#ff7700',
    border: 'border-amber-500/60',
    bg: 'bg-amber-950/25',
    text: 'text-amber-400',
    glow: 'glow-pubglegend'
  },
  pubgmythic: {
    name: 'Mythic Upgradable',
    color: '#ff007f',
    border: 'border-pink-500/80',
    bg: 'bg-pink-950/30',
    text: 'text-pink-400',
    glow: 'glow-special'
  }
};

// Item catalog for cases
const SKINS = {
  dragonLore:     { id: 'dlore', name: 'Dragon Lore', weapon: 'AWP', rarity: 'special', price: 28500000, game: 'cs2', image: '/images/skins/dragon-lore.png' },
  fireSerpent:    { id: 'fserp', name: 'Fire Serpent', weapon: 'AK-47', rarity: 'covert', price: 9500000, game: 'cs2', image: '/images/skins/fire-serpent.png' },
  karambitDoppler:{ id: 'kdop', name: 'Doppler Phase 2', weapon: 'Karambit', rarity: 'special', price: 19800000, game: 'cs2', image: '/images/skins/karambit-doppler.png' },
  butterflyFade:  { id: 'bfade', name: 'Fade', weapon: 'Butterfly Knife', rarity: 'special', price: 24500000, game: 'cs2', image: '/images/skins/butterfly-fade.png' },
  m9Lore:         { id: 'm9l', name: 'Lore', weapon: 'M9 Bayonet', rarity: 'special', price: 11000000, game: 'cs2', image: '/images/skins/m9-lore.png' },
  sportGloves:    { id: 'sgvice', name: 'Vice', weapon: 'Sport Gloves', rarity: 'special', price: 16500000, game: 'cs2', image: '/images/skins/sport-gloves-vice.png' },
  skeleton:       { id: 'skel', name: 'Slaughter', weapon: 'Skeleton Knife', rarity: 'special', price: 7200000, game: 'cs2', image: '/images/skins/skeleton-slaughter.png' },
  printstream:    { id: 'pstream', name: 'Printstream', weapon: 'M4A1-S', rarity: 'covert', price: 2400000, game: 'cs2', image: '/images/skins/printstream.png' },
  temukau:        { id: 'temu', name: 'Temukau', weapon: 'M4A4', rarity: 'covert', price: 1850000, game: 'cs2', image: '/images/skins/temukau.png' },
  headShot:       { id: 'hshot', name: 'Head Shot', weapon: 'AK-47', rarity: 'covert', price: 1400000, game: 'cs2', image: '/images/skins/head-shot.png' },
  empress:        { id: 'empr', name: 'The Empress', weapon: 'AK-47', rarity: 'covert', price: 680000, game: 'cs2', image: '/images/skins/the-empress.png' },
  asiimov:        { id: 'asii', name: 'Asiimov', weapon: 'AWP', rarity: 'classified', price: 1350000, game: 'cs2', image: '/images/skins/asiimov-awp.png' },
  duality:        { id: 'dual', name: 'Duality', weapon: 'AWP', rarity: 'classified', price: 240000, game: 'cs2', image: '/images/skins/duality.png' },
  redline:        { id: 'rline', name: 'Redline', weapon: 'AK-47', rarity: 'classified', price: 320000, game: 'cs2', image: '/images/skins/redline.png' },
  mecha:          { id: 'mech', name: 'Mecha Industries', weapon: 'M4A1-S', rarity: 'classified', price: 290000, game: 'cs2', image: '/images/skins/mecha-industries.png' },
  decimator:      { id: 'deci', name: 'Decimator', weapon: 'M4A1-S', rarity: 'restricted', price: 85000, game: 'cs2', image: '/images/skins/decimator.png' },
  cortex:         { id: 'cort', name: 'Cortex', weapon: 'USP-S', rarity: 'restricted', price: 90000, game: 'cs2', image: '/images/skins/cortex.png' },
  glockRabbit:    { id: 'grab', name: 'Umbral Rabbit', weapon: 'Glock-18', rarity: 'restricted', price: 55000, game: 'cs2', image: '/images/skins/glock-umbral.png' },
  mac10Sakkaku:   { id: 'msak', name: 'Sakkaku', weapon: 'MAC-10', rarity: 'milspec', price: 18000, game: 'cs2', image: '/images/skins/mac10-sakkaku.png' },
  wormGod:        { id: 'wgod', name: 'Worm God', weapon: 'AWP', rarity: 'milspec', price: 35000, game: 'cs2', image: '/images/skins/worm-god.png' },
  safariMesh:     { id: 'smesh', name: 'Safari Mesh', weapon: 'AK-47', rarity: 'milspec', price: 8000, game: 'cs2', image: '/images/skins/safari-mesh.png' },
  gutCrimson:     { id: 'gcrim', name: 'Crimson Web', weapon: 'Gut Knife', rarity: 'special', price: 1150000, game: 'cs2', image: '/images/skins/gut-crimson-web.png' },
  gutGamma:       { id: 'ggam', name: 'Gamma Doppler', weapon: 'Gut Knife', rarity: 'special', price: 2100000, game: 'cs2', image: '/images/skins/gamma-doppler.png' },
  navajaSteel:    { id: 'nsteel', name: 'Damascus Steel', weapon: 'Navaja Knife', rarity: 'special', price: 890000, game: 'cs2', image: '/images/skins/navaja-damascus.png' },
  
  // PUBG items
  pubgM416Digital:{ id: 'pm4dig', name: 'Desert Digital', weapon: 'M416', rarity: 'pubgmythic', price: 18500000, game: 'pubg', image: '/images/skins/pubg-m416-digital.png' },
  pubgM416Orange: { id: 'pm4org', name: 'Rugged Orange', weapon: 'M416', rarity: 'pubgmythic', price: 12000000, game: 'pubg', image: '/images/skins/pubg-m416-orange.png' },
  pubgAwmGold:    { id: 'pawmg', name: 'Gold Plate', weapon: 'AWM', rarity: 'pubglegend', price: 3800000, game: 'pubg', image: '/images/skins/pubg-awm-gold.png' },
  pubgKar98Orange:{ id: 'pkarorg', name: 'Rugged Orange', weapon: 'Kar98k', rarity: 'pubglegend', price: 1600000, game: 'pubg', image: '/images/skins/pubg-kar98-orange.png' },
  pubgPanTarget:  { id: 'ppan', name: 'Target Practice', weapon: 'Pan (Tava)', rarity: 'restricted', price: 450000, game: 'pubg', image: '/images/skins/pubg-pan-target.png' },
  pubgHelmetLvl3: { id: 'phelm', name: 'Level 3 Helmet', weapon: 'Helmet', rarity: 'milspec', price: 65000, game: 'pubg', image: '/images/skins/pubg-helmet-lvl3.png' },
  pubgTrenchcoat: { id: 'pcoat', name: 'PU Trenchcoat', weapon: 'Trenchcoat', rarity: 'pubgmythic', price: 15400000, game: 'pubg', image: '/images/skins/pubg-trenchcoat.png' },
  pubgBandana:    { id: 'pband', name: 'PU Bandana', weapon: 'Face Mask', rarity: 'pubglegend', price: 8900000, game: 'pubg', image: '/images/skins/pubg-bandana.png' },
};

// =========================================================================
// 1. CARNIVAL OF MADNESS CASES (Exact 12 cases from Screenshots 2 & 3)
// =========================================================================
export const CARNIVAL_CASES = [
  {
    id: 'carnival-mary',
    name: 'Кровавая Мэри',
    category: 'carnival',
    game: 'cs2',
    priceG: 39,
    priceUZS: 39000,
    image: '/images/ggdrop/case-mary.png',
    items: [
      { ...SKINS.printstream, odds: 2.0 },
      { ...SKINS.asiimov, odds: 8.0 },
      { ...SKINS.redline, odds: 18.0 },
      { ...SKINS.cortex, odds: 32.0 },
      { ...SKINS.mac10Sakkaku, odds: 40.0 }
    ]
  },
  {
    id: 'carnival-boogeyman',
    name: 'Бугимен',
    category: 'carnival',
    game: 'cs2',
    priceG: 99,
    priceUZS: 99000,
    image: '/images/ggdrop/case-boogeyman.png',
    items: [
      { ...SKINS.headShot, odds: 3.5 },
      { ...SKINS.temukau, odds: 4.5 },
      { ...SKINS.duality, odds: 15.0 },
      { ...SKINS.glockRabbit, odds: 35.0 },
      { ...SKINS.wormGod, odds: 42.0 }
    ]
  },
  {
    id: 'carnival-deadman',
    name: 'Сундук Мертвеца',
    category: 'carnival',
    game: 'cs2',
    priceG: 199,
    priceUZS: 199000,
    image: '/images/ggdrop/case-deadman.png',
    items: [
      { ...SKINS.fireSerpent, odds: 1.5 },
      { ...SKINS.gutCrimson, odds: 6.0 },
      { ...SKINS.empress, odds: 14.0 },
      { ...SKINS.mecha, odds: 28.5 },
      { ...SKINS.decimator, odds: 50.0 }
    ]
  },
  {
    id: 'carnival-scream',
    name: 'Последний крик',
    category: 'carnival',
    game: 'cs2',
    priceG: 499,
    priceUZS: 499000,
    image: '/images/ggdrop/case-scream.png',
    items: [
      { ...SKINS.butterflyFade, odds: 1.2 },
      { ...SKINS.skeleton, odds: 4.8 },
      { ...SKINS.navajaSteel, odds: 18.0 },
      { ...SKINS.printstream, odds: 26.0 },
      { ...SKINS.asiimov, odds: 50.0 }
    ]
  },
  {
    id: 'carnival-frankenstein',
    name: 'Франкенштейн',
    category: 'carnival',
    game: 'cs2',
    priceG: 999,
    priceUZS: 999000,
    image: '/images/ggdrop/case-frankenstein.png',
    items: [
      { ...SKINS.karambitDoppler, odds: 1.8 },
      { ...SKINS.m9Lore, odds: 3.2 },
      { ...SKINS.sportGloves, odds: 5.0 },
      { ...SKINS.gutGamma, odds: 25.0 },
      { ...SKINS.headShot, odds: 65.0 }
    ]
  },
  {
    id: 'carnival-ghost',
    name: 'Призрак',
    category: 'carnival',
    game: 'cs2',
    priceG: 1999,
    priceUZS: 1999000,
    image: '/images/ggdrop/case-ghost.png',
    items: [
      { ...SKINS.dragonLore, odds: 1.5 },
      { ...SKINS.karambitDoppler, odds: 4.5 },
      { ...SKINS.butterflyFade, odds: 6.0 },
      { ...SKINS.m9Lore, odds: 18.0 },
      { ...SKINS.fireSerpent, odds: 70.0 }
    ]
  },
  {
    id: 'carnival-trainer',
    name: 'Дрессировщик',
    category: 'carnival',
    game: 'cs2',
    priceG: 50,
    priceUZS: 50000,
    image: '/images/ggdrop/case-trainer.png',
    items: [
      { ...SKINS.temukau, odds: 2.0 },
      { ...SKINS.empress, odds: 6.0 },
      { ...SKINS.redline, odds: 22.0 },
      { ...SKINS.cortex, odds: 30.0 },
      { ...SKINS.safariMesh, odds: 40.0 }
    ]
  },
  {
    id: 'carnival-juggler',
    name: 'Жонглер',
    category: 'carnival',
    game: 'cs2',
    priceG: 200,
    priceUZS: 200000,
    image: '/images/ggdrop/case-juggler.png',
    items: [
      { ...SKINS.gutCrimson, odds: 3.0 },
      { ...SKINS.printstream, odds: 8.0 },
      { ...SKINS.asiimov, odds: 19.0 },
      { ...SKINS.decimator, odds: 35.0 },
      { ...SKINS.glockRabbit, odds: 35.0 }
    ]
  },
  {
    id: 'carnival-strongman',
    name: 'Силач',
    category: 'carnival',
    game: 'cs2',
    priceG: 500,
    priceUZS: 500000,
    image: '/images/ggdrop/case-strongman.png',
    items: [
      { ...SKINS.skeleton, odds: 2.5 },
      { ...SKINS.fireSerpent, odds: 4.5 },
      { ...SKINS.navajaSteel, odds: 23.0 },
      { ...SKINS.headShot, odds: 30.0 },
      { ...SKINS.mecha, odds: 40.0 }
    ]
  },
  {
    id: 'carnival-magician',
    name: 'Фокусник',
    category: 'carnival',
    game: 'cs2',
    priceG: 1000,
    priceUZS: 1000000,
    image: '/images/ggdrop/case-magician.png',
    items: [
      { ...SKINS.butterflyFade, odds: 2.2 },
      { ...SKINS.m9Lore, odds: 4.8 },
      { ...SKINS.gutGamma, odds: 28.0 },
      { ...SKINS.temukau, odds: 30.0 },
      { ...SKINS.printstream, odds: 35.0 }
    ]
  },
  {
    id: 'carnival-cannonball',
    name: 'Человек-ядро',
    category: 'carnival',
    game: 'cs2',
    priceG: 1800,
    priceUZS: 1800000,
    image: '/images/ggdrop/case-cannonball.png',
    items: [
      { ...SKINS.dragonLore, odds: 1.0 },
      { ...SKINS.sportGloves, odds: 4.0 },
      { ...SKINS.karambitDoppler, odds: 7.0 },
      { ...SKINS.skeleton, odds: 28.0 },
      { ...SKINS.fireSerpent, odds: 60.0 }
    ]
  },
  {
    id: 'carnival-jester',
    name: 'Шут',
    category: 'carnival',
    game: 'cs2',
    priceG: 3000,
    priceUZS: 3000000,
    image: '/images/ggdrop/case-jester.png',
    items: [
      { ...SKINS.dragonLore, odds: 2.5 },
      { ...SKINS.butterflyFade, odds: 7.5 },
      { ...SKINS.karambitDoppler, odds: 15.0 },
      { ...SKINS.sportGloves, odds: 25.0 },
      { ...SKINS.m9Lore, odds: 50.0 }
    ]
  }
];

// =========================================================================
// 2. COMMUNITY CLASSIC CASES (Screenshot 5 + PUBG)
// =========================================================================
export const COMMUNITY_CASES = [
  {
    id: 'comm-tamagotchi',
    name: 'Тамагочи',
    category: 'community',
    game: 'cs2',
    opens: 6284,
    priceG: 75,
    priceUZS: 75000,
    image: '/images/ggdrop/case-tamagotchi.png',
    items: [
      { ...SKINS.temukau, odds: 3.0 },
      { ...SKINS.redline, odds: 17.0 },
      { ...SKINS.cortex, odds: 35.0 },
      { ...SKINS.glockRabbit, odds: 45.0 }
    ]
  },
  {
    id: 'comm-pets',
    name: 'Питомцы',
    category: 'community',
    game: 'cs2',
    opens: 6398,
    priceG: 50,
    priceUZS: 50000,
    image: '/images/ggdrop/case-pets.png',
    items: [
      { ...SKINS.empress, odds: 2.5 },
      { ...SKINS.duality, odds: 15.5 },
      { ...SKINS.decimator, odds: 32.0 },
      { ...SKINS.wormGod, odds: 50.0 }
    ]
  },
  {
    id: 'comm-gambler',
    name: 'Игрок',
    category: 'community',
    game: 'cs2',
    opens: 19488,
    priceG: 2500,
    priceUZS: 2500000,
    image: '/images/ggdrop/case-gambler.png',
    items: [
      { ...SKINS.dragonLore, odds: 1.5 },
      { ...SKINS.karambitDoppler, odds: 5.5 },
      { ...SKINS.butterflyFade, odds: 8.0 },
      { ...SKINS.sportGloves, odds: 25.0 },
      { ...SKINS.skeleton, odds: 60.0 }
    ]
  },
  {
    id: 'comm-rambo',
    name: 'Рембо',
    category: 'community',
    game: 'cs2',
    opens: 37805,
    priceG: 999,
    priceUZS: 999000,
    image: '/images/ggdrop/case-rambo.png',
    items: [
      { ...SKINS.fireSerpent, odds: 3.0 },
      { ...SKINS.m9Lore, odds: 5.0 },
      { ...SKINS.headShot, odds: 27.0 },
      { ...SKINS.gutGamma, odds: 35.0 },
      { ...SKINS.printstream, odds: 30.0 }
    ]
  },
  {
    id: 'comm-arabesque',
    name: 'Шпионаж Арабески',
    category: 'community',
    game: 'cs2',
    opens: 31220,
    priceG: 600,
    priceUZS: 600000,
    image: '/images/ggdrop/case-arabesque.png',
    items: [
      { ...SKINS.skeleton, odds: 2.0 },
      { ...SKINS.temukau, odds: 12.0 },
      { ...SKINS.asiimov, odds: 26.0 },
      { ...SKINS.navajaSteel, odds: 30.0 },
      { ...SKINS.mecha, odds: 30.0 }
    ]
  },
  {
    id: 'comm-dj',
    name: 'Диджей',
    category: 'community',
    game: 'cs2',
    opens: 319171,
    priceG: 149,
    priceUZS: 149000,
    image: '/images/ggdrop/case-dj.png',
    items: [
      { ...SKINS.printstream, odds: 2.5 },
      { ...SKINS.headShot, odds: 7.5 },
      { ...SKINS.redline, odds: 25.0 },
      { ...SKINS.glockRabbit, odds: 35.0 },
      { ...SKINS.cortex, odds: 30.0 }
    ]
  },
  {
    id: 'comm-dragon',
    name: 'Неоновый дракон',
    category: 'community',
    game: 'cs2',
    opens: 203980,
    priceG: 155,
    priceUZS: 155000,
    image: '/images/ggdrop/case-dragon.png',
    items: [
      { ...SKINS.dragonLore, odds: 0.8 },
      { ...SKINS.gutCrimson, odds: 4.2 },
      { ...SKINS.empress, odds: 15.0 },
      { ...SKINS.asiimov, odds: 30.0 },
      { ...SKINS.decimator, odds: 50.0 }
    ]
  },
  {
    id: 'comm-vandal',
    name: 'Вандал',
    category: 'community',
    game: 'cs2',
    opens: 153867,
    priceG: 129,
    priceUZS: 129000,
    image: '/images/ggdrop/case-vandal.png',
    items: [
      { ...SKINS.headShot, odds: 3.5 },
      { ...SKINS.temukau, odds: 6.5 },
      { ...SKINS.duality, odds: 25.0 },
      { ...SKINS.mac10Sakkaku, odds: 35.0 },
      { ...SKINS.glockRabbit, odds: 30.0 }
    ]
  },
  {
    id: 'comm-ratatouille',
    name: 'Рататуй',
    category: 'community',
    game: 'cs2',
    opens: 279683,
    priceG: 89,
    priceUZS: 89000,
    image: '/images/ggdrop/case-ratatouille.png',
    items: [
      { ...SKINS.empress, odds: 2.0 },
      { ...SKINS.redline, odds: 18.0 },
      { ...SKINS.cortex, odds: 35.0 },
      { ...SKINS.wormGod, odds: 45.0 }
    ]
  },
  {
    id: 'comm-ezgame',
    name: 'EZ GAME',
    category: 'community',
    game: 'cs2',
    opens: 4747153,
    priceG: 119,
    priceUZS: 119000,
    image: '/images/ggdrop/case-ezgame.png',
    items: [
      { ...SKINS.butterflyFade, odds: 0.5 },
      { ...SKINS.printstream, odds: 4.5 },
      { ...SKINS.asiimov, odds: 20.0 },
      { ...SKINS.redline, odds: 35.0 },
      { ...SKINS.mac10Sakkaku, odds: 40.0 }
    ]
  },

  // PUBG CATEGORY CASES
  {
    id: 'pubg-m416-glacier',
    name: 'M416 Glacier & Desert',
    category: 'pubg',
    game: 'pubg',
    opens: 84120,
    priceG: 85,
    priceUZS: 85000,
    image: '/images/skins/pubg-m416-digital.png',
    items: [
      { ...SKINS.pubgM416Digital, odds: 1.0 },
      { ...SKINS.pubgM416Orange, odds: 4.0 },
      { ...SKINS.pubgAwmGold, odds: 15.0 },
      { ...SKINS.pubgPanTarget, odds: 35.0 },
      { ...SKINS.pubgHelmetLvl3, odds: 45.0 }
    ]
  },
  {
    id: 'pubg-survivor-elite',
    name: 'Survivor Trenchcoat',
    category: 'pubg',
    game: 'pubg',
    opens: 52190,
    priceG: 45,
    priceUZS: 45000,
    image: '/images/skins/pubg-trenchcoat.png',
    items: [
      { ...SKINS.pubgTrenchcoat, odds: 0.8 },
      { ...SKINS.pubgBandana, odds: 3.2 },
      { ...SKINS.pubgAwmGold, odds: 16.0 },
      { ...SKINS.pubgKar98Orange, odds: 35.0 },
      { ...SKINS.pubgPanTarget, odds: 45.0 }
    ]
  },
  {
    id: 'pubg-pan-paradise',
    name: 'Golden Pan Airdrop',
    category: 'pubg',
    game: 'pubg',
    opens: 39400,
    priceG: 39,
    priceUZS: 39000,
    image: '/images/skins/pubg-pan-target.png',
    items: [
      { ...SKINS.pubgPanTarget, odds: 2.5 },
      { ...SKINS.pubgHelmetLvl3, odds: 15.0 },
      { ...SKINS.pubgKar98Orange, odds: 32.5 },
      { ...SKINS.pubgM416Orange, odds: 50.0 }
    ]
  }
];

// =========================================================================
// 3. FREE 7 KEYS SERIES (Screenshot 4)
// =========================================================================
export const FREE_7_KEYS = [
  { id: 'key-stone', name: 'Каменный', requiredDay: 1, image: '/images/ggdrop/key-stone.png', bonusUZS: 15000, bonusG: 15 },
  { id: 'key-bronze', name: 'Бронзовый', requiredDay: 2, image: '/images/ggdrop/key-bronze.png', bonusUZS: 30000, bonusG: 30 },
  { id: 'key-silver', name: 'Серебряный', requiredDay: 3, image: '/images/ggdrop/key-silver.png', bonusUZS: 60000, bonusG: 60 },
  { id: 'key-gold', name: 'Золотой', requiredDay: 5, image: '/images/ggdrop/key-gold.png', bonusUZS: 150000, bonusG: 150 },
  { id: 'key-platinum', name: 'Платиновый', requiredDay: 7, image: '/images/ggdrop/key-platinum.png', bonusUZS: 350000, bonusG: 350 }
];

// Ensure backward compatibility: every case has `price` set to `priceUZS` and items have `game`
CARNIVAL_CASES.forEach(c => { 
  if (!c.price) c.price = c.priceUZS; 
  c.items?.forEach(it => { if (!it.game) it.game = c.game || 'cs2'; });
});
COMMUNITY_CASES.forEach(c => { 
  if (!c.price) c.price = c.priceUZS; 
  c.items?.forEach(it => { if (!it.game) it.game = c.game || 'cs2'; });
});

export const ALL_CASES = [...CARNIVAL_CASES, ...COMMUNITY_CASES];

export const CASES = ALL_CASES;

export const getSkinImage = (item) => item.image || '';
