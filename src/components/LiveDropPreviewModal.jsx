import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { RARITY_CONFIG, ALL_CASES } from '../data/cases';
import { SkinImage } from './SkinImage';
import { X, Sparkles, Flame, User, Package, ArrowRight } from 'lucide-react';

export const LiveDropPreviewModal = ({ dropItem, isOpen, onClose, onOpenCase }) => {
  const { language, t } = useLanguage();

  if (!isOpen || !dropItem) return null;

  const rarity = RARITY_CONFIG[dropItem.rarity] || RARITY_CONFIG.milspec;

  // Find which case this item belongs to
  const relatedCase = ALL_CASES.find(c => 
    c.items?.some(it => it.name.toLowerCase() === dropItem.name.toLowerCase() || it.weapon.toLowerCase() === dropItem.weapon?.toLowerCase())
  ) || ALL_CASES[0];

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0e111a] border border-[#222a40] rounded-2xl shadow-2xl p-6 text-center overflow-hidden">
        
        {/* Glow ambient background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${rarity.color} 0%, transparent 70%)`
          }}
        />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#161a28] transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Live Drop Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'UZ' ? 'JONLI EFIR DROPI' : language === 'EN' ? 'LIVE DROP' : 'ЖИВОЙ ДРОП'}</span>
        </div>

        {/* Dropped Item Image */}
        <div className="w-44 h-36 mx-auto my-2 flex items-center justify-center animate-float">
          <SkinImage
            src={dropItem.image}
            weapon={dropItem.weapon}
            name={dropItem.name}
            rarity={dropItem.rarity}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
          />
        </div>

        {/* Item Details */}
        <div className="mb-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            {dropItem.weapon}
          </span>
          <h3 className="text-lg sm:text-xl font-black text-white font-gaming">
            {dropItem.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded ${rarity.bg} ${rarity.text}`}>
              {rarity.name}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-400 bg-[#141826] px-2 py-0.5 rounded border border-[#20273a]">
              <User className="w-3 h-3 text-[#f59e0b]" />
              <span className="font-bold text-gray-300">{dropItem.user || 'LuckyPlayer'}</span>
            </div>
          </div>
        </div>

        {/* Related Case Quick Open */}
        {relatedCase && (
          <div className="my-4 p-3 rounded-xl bg-[#121624] border border-[#1e2538] flex items-center justify-between text-left">
            <div className="flex items-center gap-2.5 min-w-0">
              <img src={relatedCase.image} alt="" className="w-10 h-10 object-contain shrink-0" />
              <div className="truncate">
                <div className="text-[10px] text-gray-400 font-bold uppercase">{language === 'UZ' ? 'Ushbu keysdan tushgan' : language === 'EN' ? 'Drops from case' : 'Выпадает из кейса'}</div>
                <div className="text-xs font-black text-white truncate">{relatedCase.name}</div>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onOpenCase(relatedCase);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f59e0b] hover:bg-amber-400 text-black text-xs font-black shrink-0 transition"
            >
              <span>{relatedCase.priceG ? `${relatedCase.priceG} G` : `${relatedCase.priceUZS / 1000}k`}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Close CTA */}
        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#161a28] hover:bg-[#20273a] text-gray-300 text-xs font-bold border border-[#242c42] transition"
        >
          {t('understood')}
        </button>

      </div>
    </div>
  );
};
