import React, { useState, useEffect } from 'react';
import { CASES, RARITY_CONFIG } from '../data/cases';
import { LayoutGrid, Star } from 'lucide-react';
import { SkinImage } from './SkinImage';

const allItems = CASES.flatMap(c => c.items.map(it => ({ ...it, game: c.game })));

const INITIAL_DROPS = [
  { id: 'd1', name: 'Захоронение', weapon: 'Glock-18', rarity: 'milspec', image: '/images/skins/glock-umbral.png', user: 'Player_1' },
  { id: 'd2', name: 'Литьё', weapon: 'Glock-18', rarity: 'milspec', image: '/images/skins/worm-god.png', user: 'SniperUZ' },
  { id: 'd3', name: 'Призраки', weapon: 'Glock-18', rarity: 'milspec', image: '/images/skins/safari-mesh.png', user: 'Tashkent' },
  { id: 'd4', name: 'Пришелец', weapon: 'Glock-18', rarity: 'restricted', image: '/images/skins/cortex.png', user: 'Ghost_99' },
  { id: 'd5', name: 'Франклин', weapon: 'P250', rarity: 'classified', image: '/images/skins/redline.png', user: 'Winner_UZ' },
  { id: 'd6', name: 'Неонуар', weapon: 'USP-S', rarity: 'covert', image: '/images/skins/temukau.png', user: 'LuckyPro' },
  { id: 'd7', name: 'Зелье сна', weapon: 'USP-S', rarity: 'classified', image: '/images/skins/decimator.png', user: 'CS2_Star' },
  { id: 'd8', name: 'Зубная фея', weapon: 'M4A4', rarity: 'covert', image: '/images/skins/printstream.png', user: 'DropKing' },
  { id: 'd9', name: 'Fade', weapon: 'Butterfly Knife', rarity: 'special', image: '/images/skins/butterfly-fade.png', user: 'Behzod' },
  { id: 'd10', name: 'Dragon Lore', weapon: 'AWP', rarity: 'special', image: '/images/skins/dragon-lore.png', user: 'Sardor_AWP' }
];

export const LiveDropsTicker = ({ onSelectItem }) => {
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'top'
  const [drops, setDrops] = useState(INITIAL_DROPS);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomItem = allItems[Math.floor(Math.random() * allItems.length)];
      const newDrop = {
        id: 'd_' + Date.now(),
        name: randomItem.name,
        weapon: randomItem.weapon,
        rarity: randomItem.rarity,
        image: randomItem.image,
        user: 'User_' + Math.floor(Math.random() * 999)
      };
      setDrops(prev => [newDrop, ...prev.slice(0, 19)]);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  const visibleDrops = filterMode === 'top'
    ? drops.filter(d => ['special', 'covert', 'pubgmythic'].includes(d.rarity))
    : drops;

  return (
    <div className="w-full bg-[#0d0f17] border-b border-[#1a1f2e] overflow-hidden flex items-stretch h-16 select-none">
      
      {/* Left Filter Controls: ВСЕ and ТОП (Screenshot 1) */}
      <div className="flex flex-col border-r border-[#1a1f2e] bg-[#10131d] shrink-0 z-10">
        <button
          onClick={() => setFilterMode('all')}
          className={`flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] font-black transition border-b border-[#1a1f2e] ${
            filterMode === 'all'
              ? 'bg-[#1b2030] text-[#f59e0b]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <LayoutGrid className="w-3 h-3" />
          <span>ВСЕ</span>
        </button>

        <button
          onClick={() => setFilterMode('top')}
          className={`flex items-center justify-center gap-1.5 px-3 py-1.5 text-[11px] font-black transition ${
            filterMode === 'top'
              ? 'bg-[#1b2030] text-[#f59e0b]'
              : 'text-gray-500 hover:text-white'
          }`}
        >
          <Star className="w-3 h-3 fill-current" />
          <span>ТОП</span>
        </button>
      </div>

      {/* Drops Rail */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth px-2 flex-1">
        {visibleDrops.map((drop) => {
          const rarity = RARITY_CONFIG[drop.rarity] || RARITY_CONFIG.milspec;

          return (
            <div
              key={drop.id}
              onClick={() => onSelectItem && onSelectItem(drop)}
              className="relative flex flex-col items-center justify-between py-1 px-2.5 rounded-lg bg-[#121522] hover:bg-[#181d2e] border border-[#1e2335] shrink-0 cursor-pointer transition w-[110px] h-[54px] overflow-hidden group"
            >
              {/* Top rarity glow stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition"
                style={{ backgroundColor: rarity.color }}
              />

              {/* Weapon Render */}
              <div className="w-full h-8 flex items-center justify-center mt-0.5">
                <SkinImage
                  src={drop.image}
                  weapon={drop.weapon}
                  name={drop.name}
                  rarity={drop.rarity}
                  className="max-h-full max-w-full object-contain filter drop-shadow group-hover:scale-105 transition"
                />
              </div>

              {/* Skin Name */}
              <div className="text-[10px] font-bold text-gray-200 truncate w-full text-center leading-tight">
                {drop.name}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
