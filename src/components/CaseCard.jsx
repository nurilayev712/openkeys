import React from 'react';
import { sound } from '../utils/sound';

export const CaseCard = ({ caseData, onOpen }) => {
  return (
    <div
      onClick={() => {
        sound.playClick();
        onOpen(caseData);
      }}
      className="group relative flex flex-col items-center justify-between p-3.5 rounded-2xl bg-[#0e111a]/80 hover:bg-[#131726] border border-[#1b2133] hover:border-[#f59e0b]/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 cursor-pointer select-none overflow-hidden"
    >
      {/* Background ambient radial glow on hover */}
      <div className="absolute inset-0 bg-radial-gradient from-amber-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Left Opens Count Pill (Screenshot 5) */}
      {caseData.opens ? (
        <div className="self-start text-[11px] font-black text-gray-400 bg-[#161a27] border border-[#23293d] group-hover:border-[#f59e0b]/40 px-2.5 py-0.5 rounded-full mb-1 transition z-10">
          {caseData.opens.toLocaleString('ru-RU')}
        </div>
      ) : (
        <div className="h-6" />
      )}

      {/* 3D Diorama Artwork with Smooth Floating Scale */}
      <div className="relative w-full h-44 sm:h-52 flex items-center justify-center my-1 z-10">
        {/* Glow halo behind chest */}
        <div className="absolute w-28 h-28 rounded-full bg-amber-500/10 blur-xl group-hover:bg-amber-500/25 transition-all duration-500 pointer-events-none" />
        <img
          src={caseData.image}
          alt={caseData.name}
          className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] group-hover:scale-110 group-hover:rotate-1 transition-all duration-300"
          loading="lazy"
        />
      </div>

      {/* Case Name (Screenshots 2, 3, 5) */}
      <h3 className="text-sm sm:text-base font-bold text-gray-100 text-center truncate w-full mt-1 mb-2.5 group-hover:text-[#f59e0b] transition z-10">
        {caseData.name}
      </h3>

      {/* Price Button: Rounded Orange Pill with Shine Sweep Effect */}
      <div className="shine-sweep flex items-center justify-center gap-1.5 px-6 py-2 rounded-xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] hover:from-[#f59e0b] hover:to-[#ea580c] text-black font-black text-xs sm:text-sm shadow-md shadow-orange-500/20 group-hover:shadow-orange-500/50 transition-all duration-200 active:scale-95 z-10 w-full max-w-[170px]">
        <span>{caseData.priceG ? `${caseData.priceG} G` : `${(caseData.priceUZS || caseData.price || 0).toLocaleString('uz-UZ')} UZS`}</span>
      </div>

    </div>
  );
};
