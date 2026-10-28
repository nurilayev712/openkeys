import React, { useState } from 'react';
import { FREE_7_KEYS } from '../data/cases';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { Lock, Unlock, HelpCircle, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FreeKeysSection = () => {
  const { user, deposit, setIsAuthModalOpen } = useAuth();
  const { t } = useLanguage();
  const [unlockedKey, setUnlockedKey] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [claimStatus, setClaimStatus] = useState(null);

  const handleOpenFreeKey = (keyItem) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    sound.playCoins();
    deposit(keyItem.bonusUZS);
    setClaimStatus(`Tabriklaymiz! "${keyItem.name}" keysidan +${keyItem.bonusG} G (+${keyItem.bonusUZS.toLocaleString('uz-UZ')} UZS) hisobingizga qo'shildi!`);
    setUnlockedKey(keyItem.id);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setClaimStatus(null);
    }, 4500);
  };

  return (
    <section className="my-10 p-6 rounded-2xl bg-[#0e111a]/90 border border-[#1b2030]">
      
      {/* Header bar (Screenshot 4) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1b2030]">
        
        {/* Title with Lock & Chains logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1b2030] flex items-center justify-center text-[#f59e0b]">
            <Lock className="w-5 h-5 stroke-[2.5]" />
          </div>

          <div>
            <h2 className="text-base sm:text-xl font-black text-white uppercase tracking-wide">
              {t('free7Title')}
            </h2>
            <p className="text-xs text-gray-400">
              {t('free7Sub')}
            </p>
          </div>
        </div>

        {/* Как это работает button (Screenshot 4) */}
        <button
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#161a27] hover:bg-[#1f2537] text-gray-300 hover:text-white text-xs font-bold border border-[#242b3e] transition"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#f59e0b]" />
          <span>{t('howItWorks')}</span>
        </button>

      </div>

      {/* Explainer modal / dropdown */}
      {showHowItWorks && (
        <div className="my-4 p-4 rounded-xl bg-[#141826] border border-[#222a3f] text-xs text-gray-300 space-y-2 animate-fadeIn">
          <h4 className="font-bold text-white text-sm">{t('freeRulesTitle')}</h4>
          <p>{t('freeRule1')}</p>
          <p>{t('freeRule2')}</p>
          <p>{t('freeRule3')}</p>
        </div>
      )}

      {claimStatus && (
        <div className="my-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 shrink-0" />
          <span>{claimStatus}</span>
        </div>
      )}

      {/* 5 Free Locked Cases Rail (Screenshot 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 pt-6">
        {FREE_7_KEYS.map((keyItem) => {
          const isOpened = unlockedKey === keyItem.id;

          return (
            <div
              key={keyItem.id}
              onClick={() => handleOpenFreeKey(keyItem)}
              className="group relative flex flex-col items-center justify-between p-3 rounded-2xl bg-[#10131e] hover:bg-[#151926] border border-[#1b2030] hover:border-[#f59e0b]/50 transition cursor-pointer"
            >
              {/* Chest 3D Artwork (Screenshot 4) */}
              <div className="relative w-full h-32 sm:h-36 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img
                  src={keyItem.image}
                  alt={keyItem.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow"
                />
              </div>

              {/* Chest Title */}
              <h4 className="text-xs sm:text-sm font-bold text-gray-300 text-center mt-1 mb-2">
                {keyItem.name}
              </h4>

              {/* Lock / Unlock Icon Button (Screenshot 4) */}
              <div className="w-8 h-8 rounded-xl bg-[#171b28] group-hover:bg-[#f59e0b] border border-[#23293c] flex items-center justify-center text-gray-400 group-hover:text-black transition">
                {isOpened ? (
                  <Unlock className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
