import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { Swords, X, Users, Trophy, Play, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CARNIVAL_CASES } from '../data/cases';

export const CaseBattleModal = ({ isOpen, onClose }) => {
  const { user, deduct, deposit, setIsAuthModalOpen, setIsDepositOpen } = useAuth();
  const { language, t } = useLanguage();
  const [selectedCase, setSelectedCase] = useState(CARNIVAL_CASES[0]);
  const [isBattling, setIsBattling] = useState(false);
  const [battleResult, setBattleResult] = useState(null);

  if (!isOpen) return null;

  const handleStartBattle = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const cost = selectedCase.priceUZS;
    if (user.balance < cost) {
      sound.playClick();
      setIsDepositOpen(true);
      return;
    }

    if (!deduct(cost)) {
      setIsDepositOpen(true);
      return;
    }

    setIsBattling(true);
    setBattleResult(null);
    sound.playOpen();

    setTimeout(() => {
      // Pick random items for User and Bot
      const userItem = selectedCase.items[Math.floor(Math.random() * selectedCase.items.length)];
      const botItem = selectedCase.items[Math.floor(Math.random() * selectedCase.items.length)];

      const userWon = userItem.price >= botItem.price;
      const totalLoot = userWon ? userItem.price + botItem.price : 0;

      if (userWon) {
        sound.playWin('special');
        deposit(totalLoot);
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
      } else {
        sound.playClick();
      }

      setBattleResult({
        userWon,
        userItem,
        botItem,
        totalLoot
      });
      setIsBattling(false);
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e111a] border border-[#222a40] rounded-2xl shadow-2xl p-6 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#151926]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
            <Swords className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-gaming">КЕЙС БАТЛ (1 VS 1)</h3>
            <p className="text-xs text-gray-400">Сразитесь с соперником за весь банк открытых кейсов!</p>
          </div>
        </div>

        {/* Case Selector */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-400 mb-2">ВЫБЕРИТЕ КЕЙС ДЛЯ БАТЛА:</label>
          <div className="grid grid-cols-3 gap-2">
            {CARNIVAL_CASES.slice(0, 3).map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`flex items-center gap-2 p-2 rounded-xl border text-left transition ${
                  selectedCase.id === c.id
                    ? 'bg-[#1b2030] border-[#f59e0b]'
                    : 'bg-[#121522] border-[#1e2335] hover:border-gray-600'
                }`}
              >
                <img src={c.image} alt={c.name} className="w-9 h-9 object-contain" />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">{c.name}</div>
                  <div className="text-[10px] text-[#f59e0b] font-black">{c.priceG} G</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Battle Arena */}
        <div className="grid grid-cols-2 gap-4 my-4 p-4 rounded-xl bg-[#121522] border border-[#1e2335]">
          {/* Player 1 (User) */}
          <div className="flex flex-col items-center p-3 rounded-lg bg-[#161a29] text-center border border-[#222a3f]">
            <span className="text-xs font-bold text-[#f59e0b]">ВЫ (ИГРОК 1)</span>
            <div className="w-24 h-24 flex items-center justify-center my-2">
              {battleResult?.userItem ? (
                <img src={battleResult.userItem.image} alt="" className="max-h-full max-w-full object-contain" />
              ) : (
                <img src={selectedCase.image} alt="" className={`max-h-full max-w-full object-contain ${isBattling ? 'animate-spin' : ''}`} />
              )}
            </div>
            <span className="text-xs font-bold text-white truncate max-w-full">
              {battleResult?.userItem ? battleResult.userItem.name : selectedCase.name}
            </span>
          </div>

          {/* Player 2 (Bot) */}
          <div className="flex flex-col items-center p-3 rounded-lg bg-[#161a29] text-center border border-[#222a3f]">
            <span className="text-xs font-bold text-gray-400">БОТ СОПЕРНИК</span>
            <div className="w-24 h-24 flex items-center justify-center my-2">
              {battleResult?.botItem ? (
                <img src={battleResult.botItem.image} alt="" className="max-h-full max-w-full object-contain" />
              ) : (
                <img src={selectedCase.image} alt="" className={`max-h-full max-w-full object-contain ${isBattling ? 'animate-spin' : ''}`} />
              )}
            </div>
            <span className="text-xs font-bold text-white truncate max-w-full">
              {battleResult?.botItem ? battleResult.botItem.name : selectedCase.name}
            </span>
          </div>
        </div>

        {/* Battle Result Announcement */}
        {battleResult && (
          <div className={`p-3 rounded-xl mb-3 text-center text-xs font-black animate-fadeIn ${
            battleResult.userWon ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-red-500/20 text-red-400 border border-red-500/40'
          }`}>
            {battleResult.userWon
              ? `ПОБЕДА! Вы забрали весь банк: +${battleResult.totalLoot.toLocaleString('uz-UZ')} UZS!`
              : 'Поражение. Сопернику выпал более дорогой скин.'}
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={handleStartBattle}
          disabled={isBattling}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] hover:from-[#f59e0b] text-black font-black text-sm tracking-wider shadow-lg shadow-orange-500/25 disabled:opacity-50 transition"
        >
          {isBattling ? 'БИТВА ИДЕТ...' : `НАЧАТЬ БАТЛ (${selectedCase.priceG} G)`}
        </button>

      </div>
    </div>
  );
};
