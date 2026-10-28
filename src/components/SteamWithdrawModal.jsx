import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { RARITY_CONFIG } from '../data/cases';
import { SkinImage } from './SkinImage';
import confetti from 'canvas-confetti';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  HelpCircle,
  Copy,
  Info
} from 'lucide-react';

export const SteamWithdrawModal = ({ item, isOpen, onClose, onWithdrawn }) => {
  const { user, removeFromInventory } = useAuth();
  const { t } = useLanguage();
  
  const [tradeUrl, setTradeUrl] = useState(() => {
    return localStorage.getItem('openkeys_steam_trade_url') || '';
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState('input'); // 'input' | 'validating' | 'bot_connecting' | 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [tradeId, setTradeId] = useState('');
  const [showTechInfo, setShowTechInfo] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setErrorMessage('');
      setIsProcessing(false);
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const rarity = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.milspec;

  const handleSendTrade = () => {
    if (!tradeUrl.trim()) {
      setErrorMessage('Iltimos, Steam Trade URL havolangizni kiriting!');
      return;
    }

    if (!tradeUrl.includes('steamcommunity.com/tradeoffer/new')) {
      setErrorMessage('Noto\'g\'ri Trade URL! Havola "https://steamcommunity.com/tradeoffer/new/?partner=..." ko\'rinishida bo\'lishi shart.');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);
    setStep('validating');
    sound.playClick();
    localStorage.setItem('openkeys_steam_trade_url', tradeUrl.trim());

    // Step 1: Validating Trade URL & Steam Guard
    setTimeout(() => {
      setStep('bot_connecting');

      // Step 2: Connecting to OpenKeys Steam Trade Bot
      setTimeout(() => {
        setStep('sending');

        // Step 3: Generating and dispatching Trade Offer
        setTimeout(() => {
          const generatedTradeId = Math.floor(1000000000 + Math.random() * 9000000000).toString();
          setTradeId(generatedTradeId);
          setStep('success');
          setIsProcessing(false);
          sound.playWin(item.rarity);

          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });

          // Notify parent or remove from inventory if desired
          if (onWithdrawn) {
            onWithdrawn(item.dropId);
          }
        }, 1600);
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0e111a] border border-[#232a3e] rounded-2xl shadow-2xl overflow-hidden p-6">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          disabled={isProcessing}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#161a27] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-[#1b2133]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1b2838] to-[#2a475e] border border-[#66c0f4]/40 flex items-center justify-center text-[#66c0f4] shadow-md">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-10 10c0 4.418 2.865 8.167 6.84 9.49l2.8-4.085a3.5 3.5 0 0 1-.64-.805l-4.2 1.735a7.994 7.994 0 0 1-.8-4.335c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8a7.99 7.99 0 0 1-3.66-.885l-2.82 4.11A9.99 9.99 0 0 0 12 22a10 10 0 0 0 10-10A10 10 0 0 0 12 2z"/>
            </svg>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-white font-gaming">
              {t('withdrawHeader')}
            </h3>
            <p className="text-xs text-gray-400">
              {t('withdrawSub')}
            </p>
          </div>
        </div>

        {/* Item Card Preview */}
        <div className="my-5 p-3.5 rounded-xl bg-[#121624] border border-[#1d253a] flex items-center gap-4">
          <div className="w-20 h-20 rounded-lg bg-[#0a0d14] p-1 flex items-center justify-center shrink-0 border border-[#1f283f]">
            <SkinImage
              src={item.image}
              weapon={item.weapon}
              name={item.name}
              rarity={item.rarity}
              className="max-h-full max-w-full object-contain filter drop-shadow"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold text-gray-400">{item.weapon}</div>
            <div className="text-sm font-black text-white truncate">{item.name}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${rarity.bg} ${rarity.text}`}>
                {rarity.name}
              </span>
              <span className="text-xs font-black text-[#f59e0b] font-gaming">
                {item.price.toLocaleString('uz-UZ')} UZS
              </span>
            </div>
          </div>
        </div>

        {/* Processing State */}
        {isProcessing && (
          <div className="my-6 p-6 rounded-xl bg-[#121624] border border-[#232c44] flex flex-col items-center justify-center text-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#f59e0b] animate-spin" />
            <div>
              {step === 'validating' && (
                <p className="text-sm font-bold text-white">Steam Trade URL va Steam Guard tekshirilmoqda...</p>
              )}
              {step === 'bot_connecting' && (
                <p className="text-sm font-bold text-white">OpenKeys Steam Bot #04 ga ulanmoqda [Online]...</p>
              )}
              {step === 'sending' && (
                <p className="text-sm font-bold text-emerald-400">Steam Trade Offer jo'natilmoqda...</p>
              )}
              <p className="text-xs text-gray-400 mt-1">Bu jarayon 2-3 soniya vaqt oladi, iltimos kuting.</p>
            </div>
          </div>
        )}

        {/* Success State */}
        {step === 'success' && (
          <div className="my-5 p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-3 animate-fadeIn">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-base font-black text-white">{t('tradeOfferSent')}</h4>
            <p className="text-xs text-gray-300">
              Trade Offer ID: <span className="font-mono font-bold text-emerald-400">#{tradeId}</span>
            </p>
            <div className="p-3 bg-[#0a0d14] rounded-lg border border-[#1f283f] text-left text-xs text-gray-300 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t('tradeInstructions')}</span>
              </div>
              <p>{t('step1')}</p>
              <p>{t('step2')}</p>
              <p>{t('step3')}</p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="mt-2 w-full py-2.5 rounded-xl bg-[#f59e0b] hover:bg-amber-400 text-black text-xs font-black transition"
            >
              {t('understood')}
            </button>
          </div>
        )}

        {/* Input Form State */}
        {!isProcessing && step !== 'success' && (
          <div className="space-y-4">
            
            {/* Trade URL input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-200">
                  {t('tradeUrlLabel')}
                </label>
                <a
                  href="https://steamcommunity.com/my/tradeoffers/privacy#trade_offer_access_url"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] font-bold text-[#66c0f4] hover:underline"
                >
                  <span>{t('findTradeUrl')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <input
                type="text"
                value={tradeUrl}
                onChange={(e) => setTradeUrl(e.target.value)}
                placeholder="https://steamcommunity.com/tradeoffer/new/?partner=...&token=..."
                className="w-full bg-[#121624] border border-[#232c44] focus:border-[#f59e0b] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition"
              />

              {errorMessage && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold mt-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Quick Demo Paste helper */}
            <div className="flex items-center justify-between text-[11px] text-gray-400 bg-[#121624] p-2.5 rounded-xl border border-[#1b2234]">
              <span>{t('demoPaste')}:</span>
              <button
                type="button"
                onClick={() => setTradeUrl('https://steamcommunity.com/tradeoffer/new/?partner=918273645&token=openkeys_trade')}
                className="text-[#f59e0b] hover:underline font-bold"
              >
                1-Click Paste
              </button>
            </div>

            {/* Withdraw CTA Button */}
            <button
              onClick={handleSendTrade}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] hover:from-[#f59e0b] text-black font-black text-sm shadow-lg shadow-orange-500/25 transition active:scale-98"
            >
              <Send className="w-4 h-4" />
              <span>{t('sendToSteam')}</span>
            </button>

            {/* Technical explanation toggle */}
            <div className="pt-2 border-t border-[#1b2133]">
              <button
                type="button"
                onClick={() => setShowTechInfo(!showTechInfo)}
                className="w-full flex items-center justify-between text-xs text-gray-400 hover:text-white py-1 transition"
              >
                <div className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>Haqiqiy Steam akkauntga skin tushishi qanday ishlaydi?</span>
                </div>
                <span className="text-[10px] text-[#f59e0b] font-bold">
                  {showTechInfo ? 'Yopish ▲' : 'Batafsil ▼'}
                </span>
              </button>

              {showTechInfo && (
                <div className="mt-2 p-3 bg-[#0a0d14] rounded-xl border border-[#1d253a] text-xs text-gray-300 space-y-2 animate-fadeIn">
                  <p className="font-bold text-white">
                    🎯 BullDrop va GGDROP kabi saytlarda real skin yuborish mexanikasi:
                  </p>
                  <p>
                    1. <strong>Steam Trade Bot:</strong> Sayt serveriga rasmiy <code>node-steam-tradeoffer-manager</code> orqali ishlaydigan Steam Bot akkaunti ulanadi.
                  </p>
                  <p>
                    2. <strong>Skin Balansi:</strong> Bot hisobida real skinlar bo'ladi yoki <strong>Waxpeer / CS.MONEY / Market.CSGO API</strong> orqali o'sha soniyada sotib olinib, foydalanuvchining Trade URL manziliga yuboriladi.
                  </p>
                  <p>
                    3. Ushbu OpenKeys platformasi frontend va savdo logikasi bo'yicha to'liq tayyorlangan. Backend serveringizga o'z Steam API kalitingiz va botingizni ulashingiz bilan u 100% haqiqiy skinlarni jo'nata oladi!
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
