import React, { useState, useEffect } from 'react';
import { RARITY_CONFIG } from '../data/cases';

// Beautiful fallback SVG with actual weapon silhouette shapes
const WEAPON_SHAPES = {
  // AK-47 path
  'AK-47': 'M30,110 L40,105 L80,105 L85,100 L100,100 L105,95 L230,95 L235,100 L250,100 L260,110 L260,120 L240,120 L235,115 L200,115 L195,125 L90,125 L85,115 L50,115 L40,120 L30,120 Z M85,100 L85,85 L100,75 L140,75 L145,80 L145,100 Z M195,115 L195,130 L190,135 L185,135 L185,130 L190,130 L190,115 Z',
  // AWP / Sniper
  'AWP': 'M20,110 L30,105 L60,105 L65,95 L270,95 L275,100 L280,110 L275,120 L65,120 L60,115 L55,125 L50,130 L45,125 L50,115 L30,115 Z M65,95 L65,80 L75,75 L130,75 L135,80 L135,95 Z M200,95 L200,80 L205,75 L215,75 L215,80 L215,95 Z',
  // M4A1-S / M4A4 
  'M4A1-S': 'M35,110 L45,105 L80,105 L85,100 L100,100 L105,95 L215,95 L220,100 L230,100 L235,110 L230,120 L215,120 L210,115 L190,115 L185,125 L90,125 L85,115 L55,115 L45,120 L35,120 Z M90,100 L90,82 L100,75 L135,75 L140,80 L140,100 Z',
  'M4A4': 'M35,110 L45,105 L80,105 L85,100 L100,100 L105,95 L215,95 L220,100 L230,100 L235,110 L230,120 L215,120 L210,115 L190,115 L185,125 L90,125 L85,115 L55,115 L45,120 L35,120 Z M90,100 L90,82 L100,75 L135,75 L140,80 L140,100 Z',
  // Glock / USP (pistol)
  'Glock-18': 'M60,105 L70,100 L160,100 L165,105 L170,110 L165,120 L100,120 L95,130 L75,130 L70,120 L60,120 Z M100,100 L100,82 L110,75 L145,75 L150,82 L150,100 Z',
  'USP-S': 'M60,105 L70,100 L160,100 L165,105 L170,110 L165,120 L100,120 L95,130 L75,130 L70,120 L60,120 Z M100,100 L100,82 L110,75 L145,75 L150,82 L150,100 Z M165,108 L195,105 L197,115 L165,112 Z',
  // Knife
  'Karambit': 'M100,130 Q80,100 100,75 Q120,55 150,70 L160,90 Q140,95 130,115 Q120,130 100,130 Z M150,70 L270,50 L280,60 L160,90 Z',
  'Butterfly': 'M100,140 L80,80 L120,60 L150,80 L150,100 L120,90 Z M150,80 L180,60 L220,80 L200,140 L150,100 Z M130,100 L150,110 L170,100 L150,140 Z',
  'M9 Bayonet': 'M80,125 L90,115 L100,115 L105,105 L260,95 L265,105 L265,115 L105,115 L100,125 Z M105,105 L105,88 L115,82 L145,82 L148,88 L148,105 Z',
  'Butterfly Knife': 'M100,140 L80,80 L120,60 L150,80 L150,100 L120,90 Z M150,80 L180,60 L220,80 L200,140 L150,100 Z M130,100 L150,110 L170,100 L150,140 Z',
  'Skeleton Knife': 'M90,130 L80,100 L85,75 L100,70 L260,78 L265,88 L85,90 L88,130 Z M100,70 L110,55 L125,52 L128,65 L100,70 Z',
  'Gut Knife': 'M85,130 L75,100 L80,75 L95,68 L240,72 L245,85 L82,88 L85,130 Z',
  'Navaja Knife': 'M130,140 Q100,120 80,90 Q70,70 90,60 L110,65 Q120,80 140,100 L170,60 L175,70 L145,110 Q140,130 130,140 Z',
  'Sport Gloves': 'M90,145 L75,120 L70,90 L80,70 L100,65 L115,75 L115,90 L105,90 L110,75 L100,72 L85,78 L82,100 L92,118 L100,145 Z M100,65 L120,60 L135,65 L135,90 L115,90 L115,75 Z M135,65 L150,62 L160,70 L155,90 L135,90 Z M155,70 L168,70 L172,85 L158,90 L155,90 Z',
  // Shotgun
  'MAG-7': 'M30,108 L40,103 L60,103 L65,95 L100,95 L105,100 L200,100 L205,108 L200,116 L105,116 L100,121 L65,121 L60,113 L40,113 Z M65,95 L70,80 L90,75 L95,80 L95,95 Z',
  // M416 PUBG
  'M416': 'M30,108 L42,103 L80,103 L85,97 L102,97 L108,92 L225,92 L230,97 L245,97 L252,108 L245,119 L225,119 L220,113 L198,113 L192,122 L95,122 L88,113 L52,113 L42,119 L30,119 Z M95,97 L95,78 L108,72 L145,72 L150,78 L150,97 Z M198,113 L198,132 L193,138 L186,138 L186,130 L192,130 L192,113 Z',
  'Beryl M762': 'M30,108 L42,103 L80,103 L85,97 L102,97 L108,92 L222,92 L228,97 L242,97 L248,108 L242,119 L222,119 L217,113 L195,113 L189,122 L95,122 L88,113 L52,113 L42,119 L30,119 Z M95,97 L95,78 L108,72 L145,72 L150,78 L150,97 Z',
  'AWM': 'M20,107 L30,102 L55,102 L60,92 L278,92 L282,102 L285,107 L282,118 L60,118 L55,128 L50,133 L44,128 L50,118 L30,118 Z M60,92 L60,76 L72,70 L130,70 L136,76 L136,92 Z M210,92 L210,76 L216,70 L226,70 L226,76 L226,92 Z',
  'Kar98k': 'M25,107 L35,102 L65,102 L68,92 L262,92 L268,100 L270,107 L265,118 L68,118 L65,128 L58,135 L50,128 L58,118 L35,118 Z M68,92 L68,76 L80,70 L130,70 L135,76 L135,92 Z',
  'SLR': 'M28,107 L40,102 L70,102 L75,95 L90,95 L95,90 L240,90 L245,95 L255,95 L260,107 L255,119 L240,119 L235,113 L210,113 L205,123 L92,123 L87,113 L55,113 L40,119 L28,119 Z M92,95 L92,77 L102,70 L138,70 L143,76 L143,95 Z',
  // Pan
  'Pan': 'M80,50 L220,50 L240,70 L240,180 L220,200 L80,200 L60,180 L60,70 Z M80,80 L220,80 L220,170 L80,170 Z M220,125 L270,125 L270,135 L220,135 Z M60,125 L25,120 L22,132 L25,140 L60,135 Z',
  'Pan (Tava)': 'M80,50 L220,50 L240,70 L240,180 L220,200 L80,200 L60,180 L60,70 Z M80,80 L220,80 L220,170 L80,170 Z M220,125 L270,125 L270,135 L220,135 Z M60,125 L25,120 L22,132 L25,140 L60,135 Z',
  // Costume/clothing
  'Costume': 'M100,50 L150,40 L200,50 L220,80 L210,160 L180,170 L180,200 L120,200 L120,170 L90,160 L80,80 Z M130,50 L150,55 L170,50 L170,35 L150,30 L130,35 Z',
  'Face Mask': 'M80,60 L150,45 L220,60 L240,100 L235,140 L220,160 L150,170 L80,160 L65,140 L60,100 Z M100,100 L120,90 L150,95 L180,90 L200,100 L195,130 L150,140 L105,130 Z',
  'Shoes': 'M60,130 L100,110 L200,110 L240,120 L250,140 L240,155 L60,155 L50,145 Z M100,110 L110,80 L140,75 L145,110 Z M200,110 L210,80 L200,75 L180,80 L180,110 Z',
  'Legs': 'M80,50 L140,45 L145,130 L100,180 L80,130 Z M160,45 L220,50 L220,130 L200,180 L155,130 Z',
  'Eyes': 'M30,100 L130,85 L170,85 L270,100 L265,125 L170,112 L130,112 L35,125 Z M80,95 L130,88 L130,112 L80,118 Z M170,88 L220,95 L220,118 L170,112 Z',
  'Helmet': 'M80,60 L150,40 L220,60 L240,100 L235,120 L150,125 L65,120 L60,100 Z M90,120 L90,145 L150,150 L210,145 L210,120 Z',
  'Trenchcoat': 'M80,30 L150,20 L220,30 L240,80 L250,200 L220,210 L180,190 L180,210 L120,210 L120,190 L80,210 L50,200 L60,80 Z M120,30 L150,35 L180,30 L180,20 L150,15 L120,20 Z',
};

// Generate SVG fallback for skin
const makeFallbackSVG = (weapon, name, color, accent) => {
  const pathD = WEAPON_SHAPES[weapon] || WEAPON_SHAPES['AK-47'];
  const encoded = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="220" viewBox="0 0 300 220">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0c0e14" stop-opacity="1"/>
    </linearGradient>
    <linearGradient id="weapon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="white" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0.8"/>
    </linearGradient>
    <filter id="glow-filter">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="shadow-filter">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="${accent}" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="300" height="220" fill="url(#bg)" rx="10"/>
  <rect x="0" y="0" width="300" height="1" fill="${accent}" opacity="0.4"/>
  <rect x="0" y="185" width="300" height="35" fill="black" fill-opacity="0.6"/>
  <rect x="0" y="185" width="300" height="2" fill="${accent}" opacity="0.8"/>
  <g filter="url(#shadow-filter)">
    <path d="${pathD}" fill="url(#weapon-grad)" filter="url(#glow-filter)" opacity="0.95"/>
  </g>
  <text x="150" y="202" font-family="Arial Black,Arial,sans-serif" font-size="12" font-weight="900" text-anchor="middle" fill="white">${weapon.length > 14 ? weapon.substring(0,13)+'…' : weapon} | ${name.length > 16 ? name.substring(0,15)+'…' : name}</text>
  <text x="150" y="216" font-family="Arial,sans-serif" font-size="9" text-anchor="middle" fill="${accent}" opacity="0.8">OPENKEYS.UZ</text>
</svg>`);
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
};

// SkinImage component with real image loading + SVG fallback
export const SkinImage = ({
  src,
  weapon,
  name,
  rarity = 'milspec',
  className = '',
  style = {},
  alt,
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);
  const rarityData = RARITY_CONFIG[rarity] || RARITY_CONFIG.milspec;

  // Color pairs for each rarity
  const rarityColors = {
    milspec:    { bg: '#0a0f2e', accent: '#4b69ff' },
    restricted: { bg: '#120520', accent: '#8847ff' },
    classified: { bg: '#1a0020', accent: '#d32ce6' },
    covert:     { bg: '#1a0005', accent: '#eb4b4b' },
    special:    { bg: '#1a1000', accent: '#ffd043' },
    pubglegend: { bg: '#1a0c00', accent: '#ff7700' },
    pubgmythic: { bg: '#1a0014', accent: '#ff007f' },
  };

  const colors = rarityColors[rarity] || rarityColors.milspec;
  const fallbackSrc = makeFallbackSVG(weapon, name, colors.bg, colors.accent);

  if (failed || !src) {
    return (
      <img
        src={fallbackSrc}
        alt={alt || `${weapon} | ${name}`}
        className={className}
        style={style}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt || `${weapon} | ${name}`}
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
};
