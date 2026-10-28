import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { Skull, Coins, Sparkles, ArrowDown } from 'lucide-react';

export const HeroBanner = ({ onScrollToCases }) => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0c13] border-b border-[#1b2030]">
      
      {/* Background Banner Image directly extracted from GGDROP Screenshot 1 */}
      <div className="relative w-full max-w-[1400px] mx-auto h-[260px] sm:h-[320px] md:h-[380px] overflow-hidden flex items-end justify-between p-6 sm:p-10">
        
        {/* Real Banner Image */}
        <img
          src="/images/ggdrop/event-banner.png"
          alt="Carnival of Madness"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-95"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Ambient Vignette & Gradient Shadows */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e111a] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e111a]/80 via-transparent to-[#0e111a]/80" />

        {/* Left Side: Prize Pool & Title Content (Screenshot 1) */}
        <div className="relative z-10 space-y-3 max-w-md">
          
          {/* Prize pool badge (Screenshot 1) */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/75 border border-[#f59e0b]/40 backdrop-blur-md shadow-2xl">
            <Coins className="w-5 h-5 text-[#f59e0b]" />
            <span className="text-base sm:text-xl font-black text-white font-gaming tracking-wider">
              1 500 000 G
            </span>
            <span className="text-xs text-gray-300 font-bold uppercase">
              {t('prizePool')}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-200 font-medium drop-shadow-md hidden sm:block">
            {t('eventSubtitle')}
          </p>

          {/* Green button: К ИВЕНТУ with skull (Screenshot 2) */}
          <button
            onClick={() => {
              sound.playClick();
              if (onScrollToCases) onScrollToCases();
            }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-[#16a34a] to-[#22c55e] hover:from-[#15803d] hover:to-[#16a34a] text-white font-black text-sm tracking-wider shadow-xl shadow-green-600/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>{t('toEvent')}</span>
            <Skull className="w-4 h-4 fill-white" />
          </button>

        </div>

        {/* Right side floating badge */}
        <div className="relative z-10 hidden lg:flex flex-col items-end text-right">
          <div className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-black mb-1">
            АКТИВНЫЙ ИВЕНТ
          </div>
          <div className="text-2xl font-black text-white font-gaming">
            CARNIVAL OF MADNESS
          </div>
        </div>

      </div>

    </div>
  );
};
