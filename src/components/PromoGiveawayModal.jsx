import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { 
  Gift, 
  X, 
  Tag, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Users
} from 'lucide-react';

const VALID_PROMOS = {
  'OPENKEYS': 100000,
  'BULLDROP': 75000,
  'CS2PRO': 50000,
  'PUBG2026': 50000,
  'BONUSG': 30000
};

export const PromoGiveawayModal = ({ isOpen, onClose }) => {
  const { user, deposit, setIsAuthModalOpen } = useAuth();
  const { t } = useLanguage();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState(null);
  const [hasEnteredGiveaway, setHasEnteredGiveaway] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(1482);

  if (!isOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    if (VALID_PROMOS[code]) {
      const bonusUZS = VALID_PROMOS[code];
      const bonusG = Math.floor(bonusUZS / 1000);
      deposit(bonusUZS);
      sound.playCoins();

      setPromoMessage({
        type: 'success',
        text: `Tabriklaymiz! "${code}" promokodi orqali balansingizga +${bonusG} G (+${bonusUZS.toLocaleString('uz-UZ')} UZS) qo'shildi!`
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setPromoInput('');
    } else {
      sound.playClick();
      setPromoMessage({
        type: 'error',
        text: 'Bunday promokod mavjud emas yoki muddati o\'tgan! (Sinab ko\'ring: OPENKEYS, BULLDROP, CS2PRO)'
      });
    }
  };

  const handleJoinGiveaway = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    sound.playCoins();
    setHasEnteredGiveaway(true);
    setParticipantsCount(prev => prev + 1);

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0e111a] border border-[#222a3f] rounded-2xl shadow-2xl p-6 overflow-hidden">
        
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

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#1b2234]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white font-gaming">
              {t('promoModalTitle')}
            </h2>
            <p className="text-xs text-gray-400">
              {t('promo')}
            </p>
          </div>
        </div>

        {/* Promocode Activation Section */}
        <div className="my-5 p-4 rounded-xl bg-[#121624] border border-[#1e2538] space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#f59e0b]" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider">
              {t('enterPromo')}
            </h3>
          </div>

          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <input
              type="text"
              placeholder="Masalan: OPENKEYS yoki BULLDROP"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="flex-1 bg-[#090c14] border border-[#232c42] focus:border-[#f59e0b] rounded-xl px-3.5 py-2.5 text-xs text-white uppercase font-bold placeholder-gray-500 focus:outline-none transition"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-amber-400 text-black text-xs font-black shadow transition"
            >
              {t('activate')}
            </button>
          </form>

          {promoMessage && (
            <div className={`p-2.5 rounded-lg text-xs font-bold flex items-center gap-2 ${
              promoMessage.type === 'success'
                ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400'
                : 'bg-rose-500/15 border border-rose-500/40 text-rose-400'
            }`}>
              {promoMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{promoMessage.text}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <span>Mavjud promokodlar:</span>
            {['OPENKEYS', 'BULLDROP', 'CS2PRO'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setPromoInput(c)}
                className="text-[#f59e0b] font-bold hover:underline"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Giveaway / Airdrop Section */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#121624] via-[#151329] to-[#121624] border border-[#2b2447] space-y-3">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                KUNLIK CS2 SUPER AIRDROP
              </h3>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
              <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Qoldi: 04:28:15</span>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#090c14] p-3 rounded-xl border border-[#1e2538]">
            <img
              src="/images/skins/butterfly-fade.png"
              alt="Butterfly Knife Fade"
              className="w-16 h-16 object-contain filter drop-shadow animate-pulse"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-black uppercase text-yellow-400">Extraordinary / Knife</span>
              <h4 className="text-sm font-black text-white truncate">Butterfly Knife | Fade</h4>
              <p className="text-xs font-bold text-[#f59e0b] font-gaming">24 500 000 UZS (24 500 G)</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>{t('participants')} <strong className="text-white">{participantsCount.toLocaleString('uz-UZ')}</strong></span>
            </div>

            {hasEnteredGiveaway ? (
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-black">
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('youParticipate')}</span>
              </div>
            ) : (
              <button
                onClick={handleJoinGiveaway}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-black shadow-lg shadow-purple-600/30 transition transform active:scale-95"
              >
                {t('participateFree')}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
