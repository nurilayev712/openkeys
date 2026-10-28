import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { X, Gift, Sparkles, Check, Coins } from 'lucide-react';

export const DailyBonusModal = ({ isOpen, onClose }) => {
  const { user, deposit, setIsAuthModalOpen } = useAuth();
  const { language, t } = useLanguage();
  const [claimed, setClaimed] = useState(false);
  const [wonAmount, setWonAmount] = useState(0);

  if (!isOpen) return null;

  const handleClaim = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const bonuses = [25000, 50000, 75000, 100000];
    const picked = bonuses[Math.floor(Math.random() * bonuses.length)];

    deposit(picked);
    setWonAmount(picked);
    setClaimed(true);
    sound.playCoins();

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0e111a] border border-[#222a40] rounded-2xl shadow-2xl p-6 text-center overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#161a28] transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-4">
          <Gift className="w-8 h-8 animate-bounce" />
        </div>

        <h3 className="text-2xl font-black text-white font-gaming">
          {language === 'UZ' ? "KUNLIK BEPUL SOVG'A" : language === 'EN' ? "DAILY FREE BONUS" : "ЕЖЕДНЕВНЫЙ БОНУС"}
        </h3>
        <p className="text-xs text-gray-400 mt-1 mb-6">
          {language === 'UZ' 
            ? "Har kuni kirganingiz uchun OpenKeys sizga bepul balans va bonuslar taqdim etadi!"
            : language === 'EN'
            ? "Visit OpenKeys every day to claim free balance and special perks!"
            : "Заходите на OpenKeys каждый день и получайте бесплатный баланс и бонусы!"}
        </p>

        {claimed ? (
          <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 animate-scaleIn">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-2">
              <Check className="w-5 h-5 stroke-[3]" />
            </div>
            <h4 className="text-base font-bold text-white">
              {language === 'UZ' ? "Tabriklaymiz!" : language === 'EN' ? "Congratulations!" : "Поздравляем!"}
            </h4>
            <p className="text-lg font-black text-emerald-400 font-gaming mt-1">
              +{wonAmount.toLocaleString('uz-UZ')} UZS ({Math.floor(wonAmount / 1000)} G)
            </p>
            <p className="text-[11px] text-gray-400 mt-1">
              {language === 'UZ' 
                ? "Balansingizga qo'shildi. Keyingi bonus 24 soatdan so'ng!"
                : language === 'EN'
                ? "Added to your balance. Next claim available in 24 hours!"
                : "Зачислено на ваш баланс. Следующий бонус доступен через 24 часа!"}
            </p>
          </div>
        ) : (
          <button
            onClick={handleClaim}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 text-black font-black text-sm tracking-wide shadow-lg shadow-amber-500/20 transition active:scale-98"
          >
            {language === 'UZ' ? "KUNLIK SOVG'ANI OCHISH (TEKIN)" : language === 'EN' ? "OPEN DAILY BONUS (FREE)" : "ОТКРЫТЬ БОНУС (БЕСПЛАТНО)"}
          </button>
        )}

      </div>
    </div>
  );
};
