import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { CASES, RARITY_CONFIG } from '../data/cases';
import { SkinImage } from './SkinImage';
import { 
  TrendingUp, 
  Sparkles, 
  ShieldCheck, 
  RotateCcw, 
  ArrowRight, 
  Check, 
  Flame,
  AlertCircle 
} from 'lucide-react';

const TARGET_SKINS = CASES.flatMap(c => c.items.filter(it => ['special', 'covert', 'pubgmythic', 'pubglegend'].includes(it.rarity)));

export const SkinUpgrader = () => {
  const { user, inventory, deduct, addToInventory, setIsAuthModalOpen, setIsDepositOpen } = useAuth();
  const { language, t } = useLanguage();

  const [inputAmount, setInputAmount] = useState(50000);
  const [selectedTarget, setSelectedTarget] = useState(TARGET_SKINS[0]);
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState(null); // 'win' | 'lose' | null
  const [rotation, setRotation] = useState(0);

  // Calculate win probability: (inputAmount / targetPrice) * 100 capped at 90%
  const targetPrice = selectedTarget ? selectedTarget.price : 100000;
  const rawChance = ((inputAmount / targetPrice) * 100);
  const winChance = Math.min(Math.max(Number(rawChance.toFixed(2)), 1), 90);
  const multiplier = (targetPrice / Math.max(inputAmount, 1)).toFixed(2);

  const handleUpgrade = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    if (user.balance < inputAmount) {
      sound.playClick();
      setIsDepositOpen(true);
      return;
    }

    const success = deduct(inputAmount);
    if (!success) {
      setIsDepositOpen(true);
      return;
    }

    setIsRolling(true);
    setResult(null);
    sound.playOpen();

    // Determine random roll outcome (0 - 100)
    const roll = Math.random() * 100;
    const isWin = roll < winChance;

    // Spinner spins ~4-5 full rotations plus offset
    const baseDegrees = 360 * 5;
    // Calculate final angle corresponding to win or loss segment
    const winAngle = (winChance / 100) * 360;
    const targetAngle = isWin ? (Math.random() * (winAngle - 6) + 3) : (winAngle + Math.random() * (360 - winAngle - 10) + 5);
    const finalRotation = rotation + baseDegrees + targetAngle;

    setRotation(finalRotation);

    // Audio ticking simulation
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      tickCount++;
      sound.playTick();
      if (tickCount >= 30) clearInterval(tickInterval);
    }, 110);

    setTimeout(() => {
      setIsRolling(false);
      if (isWin) {
        setResult('win');
        sound.playWin(selectedTarget.rarity);
        addToInventory(selectedTarget, 'Skin Upgrader');
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        setResult('lose');
        sound.playClick();
      }
    }, 4200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeIn">
      
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{language === 'UZ' ? "BULLDROP UPGRADER REJIMI" : language === 'EN' ? "UPGRADER MODE" : "РЕЖИМ АПГРЕЙДА GGDROP"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-gaming tracking-wide">
          {language === 'UZ' ? "SKINNI OSHIRISH (UPGRADE)" : language === 'EN' ? "SKIN UPGRADER" : "АПГРЕЙД СКИНОВ"}
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto mt-1">
          {language === 'UZ' 
            ? "Kichik summa tikib, Karambit, Dragon Lore yoki Glacier M416 skinlarini qulay foizda yutib oling!"
            : language === 'EN'
            ? "Stake a small amount and upgrade your inventory to legendary knives and Dragon Lores!"
            : "Поставьте небольшую сумму и улучшите скин до ножа или заветного Dragon Lore!"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        
        {/* Left: Input Selection (Stake) */}
        <div className="bg-[#0e111a] border border-[#1e2538] rounded-2xl p-5 shadow-xl flex flex-col justify-between h-[450px]">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-3">
              1. {language === 'UZ' ? "TIKISH MIQDORI (SO'M)" : language === 'EN' ? "BET AMOUNT (UZS)" : "РАЗМЕР СТАВКИ (СУМ)"}
            </h3>

            <div className="space-y-3">
              <input
                type="number"
                min="5000"
                step="5000"
                value={inputAmount}
                disabled={isRolling}
                onChange={(e) => setInputAmount(Math.max(5000, Number(e.target.value)))}
                className="w-full bg-[#0a0d14] border border-[#1e2538] rounded-xl px-4 py-3 text-lg font-black text-amber-400 font-gaming focus:outline-none focus:border-[#f59e0b]"
              />

              <div className="grid grid-cols-3 gap-2">
                {[20000, 50000, 100000, 200000, 500000, 1000000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => {
                      sound.playClick();
                      setInputAmount(amt);
                    }}
                    disabled={isRolling}
                    className={`py-2 px-1 text-xs font-extrabold rounded-lg border transition ${
                      inputAmount === amt
                        ? 'bg-[#f59e0b] text-black border-amber-400'
                        : 'bg-[#121624] text-gray-300 border-[#1e2538] hover:border-gray-600'
                    }`}
                  >
                    {(amt / 1000).toLocaleString('uz-UZ')}k
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0a0d14] border border-[#1e2538]">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>{language === 'UZ' ? "Ko'paytirish omili:" : language === 'EN' ? "Multiplier:" : "Множитель:"}</span>
              <span className="font-extrabold text-amber-400">{multiplier}x</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{language === 'UZ' ? "G'alaba foizi:" : language === 'EN' ? "Win Chance:" : "Шанс на победу:"}</span>
              <span className="font-extrabold text-emerald-400">{winChance}%</span>
            </div>
          </div>
        </div>

        {/* Center: Circular Spinner Wheel */}
        <div className="bg-[#0e111a] border border-[#1e2538] rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center text-center h-[450px] relative overflow-hidden">
          
          {/* Wheel visual */}
          <div className="relative w-56 h-56 flex items-center justify-center my-3">
            
            {/* Pointer at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-6 z-20">
              <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[14px] border-t-amber-400 filter drop-shadow-[0_2px_8px_rgba(255,208,67,0.9)]" />
            </div>

            {/* Rotating SVG Dial */}
            <div
              className="w-full h-full rounded-full transition-transform"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isRolling ? 'transform 4.2s cubic-bezier(0.1, 0.8, 0.25, 1)' : 'none'
              }}
            >
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background track (lose zone) */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="#1b2133"
                  strokeWidth="12"
                />
                {/* Win segment */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="12"
                  strokeDasharray={`${(winChance / 100) * 263.89} 263.89`}
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Wheel Center Badge */}
            <div className="absolute w-28 h-28 rounded-full bg-[#0a0d14] border border-[#20273a] flex flex-col items-center justify-center p-2 shadow-2xl">
              <span className="text-[10px] uppercase font-bold text-gray-400">
                {language === 'UZ' ? "IMKONIYAT" : language === 'EN' ? "CHANCE" : "ШАНС"}
              </span>
              <span className="text-2xl font-black text-emerald-400 font-gaming">
                {winChance}%
              </span>
              <span className="text-[9px] text-gray-500 font-semibold">{multiplier}x</span>
            </div>
          </div>

          {/* Outcome Result Message */}
          {result && (
            <div className="mb-3 animate-fadeIn">
              {result === 'win' ? (
                <div className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-black">
                  {language === 'UZ' ? "G'ALABA! Skin inventaringizga qo'shildi!" : language === 'EN' ? "WIN! Skin sent to your inventory!" : "ПОБЕДА! Скин зачислен в инвентарь!"}
                </div>
              ) : (
                <div className="px-3 py-1 rounded-lg bg-red-500/20 text-red-400 text-xs font-black">
                  {language === 'UZ' ? "Omad kelmadi. Yana urinib ko'ring!" : language === 'EN' ? "Not this time. Try again!" : "Не повезло. Попробуйте еще раз!"}
                </div>
              )}
            </div>
          )}

          {/* Upgrade CTA */}
          <button
            onClick={handleUpgrade}
            disabled={isRolling}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 hover:from-emerald-400 hover:to-green-300 text-black font-black text-sm tracking-wider shadow-lg shadow-emerald-500/25 disabled:opacity-50 transition transform active:scale-98"
          >
            {isRolling 
              ? (language === 'UZ' ? "AYLANMOQDA..." : language === 'EN' ? "SPINNING..." : "КРУТИТСЯ...") 
              : `${language === 'UZ' ? "UPGRADE QILISH" : language === 'EN' ? "UPGRADE NOW" : "АПГРЕЙД"} (${inputAmount.toLocaleString('uz-UZ')} UZS)`}
          </button>
        </div>

        {/* Right: Target Skin Selection */}
        <div className="bg-[#0e111a] border border-[#1e2538] rounded-2xl p-5 shadow-xl flex flex-col justify-between h-[450px]">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider mb-3">
              2. {language === 'UZ' ? "MAQSADLI SKINNI TANLANG" : language === 'EN' ? "CHOOSE TARGET SKIN" : "ВЫБЕРИТЕ ЖЕЛАЕМЫЙ СКИН"}
            </h3>

            {/* Current Target preview */}
            {selectedTarget && (
              <div className="p-3 rounded-xl bg-[#0a0d14] border border-amber-500/40 mb-3 text-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase">
                  {selectedTarget.weapon}
                </span>
                <h4 className="text-sm font-black text-white truncate">
                  {selectedTarget.name}
                </h4>
                <div className="h-20 flex items-center justify-center my-1">
                  <SkinImage
                    src={selectedTarget.image}
                    weapon={selectedTarget.weapon}
                    name={selectedTarget.name}
                    rarity={selectedTarget.rarity}
                    className="max-h-full max-w-full object-contain filter drop-shadow"
                  />
                </div>
                <div className="text-xs font-black text-amber-400 font-gaming">
                  {selectedTarget.price.toLocaleString('uz-UZ')} UZS
                </div>
              </div>
            )}

            {/* Targets pool selection list */}
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {TARGET_SKINS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedTarget(item);
                  }}
                  disabled={isRolling}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition border ${
                    selectedTarget?.id === item.id
                      ? 'bg-[#1b2030] border-[#f59e0b] text-white'
                      : 'bg-[#0a0d14] border-[#1e2538] text-gray-400 hover:border-gray-600'
                  }`}
                >
                  <span className="truncate max-w-[130px] font-bold">
                    {item.weapon} | {item.name}
                  </span>
                  <span className="text-amber-400 font-black">
                    {(item.price / 1000).toLocaleString('uz-UZ')}k
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
