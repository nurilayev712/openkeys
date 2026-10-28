import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { RARITY_CONFIG } from '../data/cases';
import { SkinImage } from './SkinImage';
import { 
  X, 
  Flame, 
  Sparkles, 
  Zap, 
  Coins, 
  RotateCcw, 
  Check, 
  ShieldCheck, 
  Eye, 
  Info,
  DollarSign,
  Package
} from 'lucide-react';

export const CaseOpeningModal = ({ caseData, onClose }) => {
  const { user, deduct, addToInventory, sellItem, setIsAuthModalOpen, setIsDepositOpen, setIsInventoryOpen } = useAuth();
  const { t } = useLanguage();

  const [isSpinning, setIsSpinning] = useState(false);
  const [fastOpen, setFastOpen] = useState(false);
  const [openCount, setOpenCount] = useState(1);
  const [rouletteItems, setRouletteItems] = useState([]);
  const [winningItem, setWinningItem] = useState(null);
  const [hasWon, setHasWon] = useState(false);
  const [showOdds, setShowOdds] = useState(false);
  const [droppedResult, setDroppedResult] = useState(null);

  const reelRef = useRef(null);
  const cardWidth = 160; // Card width in pixels
  const gap = 12; // Gap between cards

  // Pick an item based on weighted odds
  const pickWinningItem = () => {
    const totalWeight = caseData.items.reduce((sum, item) => sum + item.odds, 0);
    let rand = Math.random() * totalWeight;

    for (const item of caseData.items) {
      if (rand < item.odds) {
        return item;
      }
      rand -= item.odds;
    }
    return caseData.items[caseData.items.length - 1];
  };

  // Prepare roulette strip
  const generateReel = (winner) => {
    const list = [];
    const pool = caseData.items;

    // We build 65 items, placing winner at index 50
    const WINNING_INDEX = 50;

    for (let i = 0; i < 65; i++) {
      if (i === WINNING_INDEX) {
        list.push({ ...winner, reelIndex: i });
      } else {
        const randomItem = pool[Math.floor(Math.random() * pool.length)];
        list.push({ ...randomItem, reelIndex: i });
      }
    }
    return { list, winningIndex: WINNING_INDEX };
  };

  const unitPrice = Number(caseData.priceUZS || caseData.price || (caseData.priceG ? caseData.priceG * 1000 : 50000));

  const handleStartOpen = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const totalCost = unitPrice * openCount;
    if ((Number(user.balance) || 0) < totalCost) {
      sound.playClick();
      setIsDepositOpen(true);
      return;
    }

    const success = deduct(totalCost);
    if (!success) {
      setIsDepositOpen(true);
      return;
    }

    const winner = pickWinningItem();
    setWinningItem(winner);
    setHasWon(false);
    setDroppedResult(null);

    const winnerWithGame = { ...winner, game: winner.game || caseData.game || 'cs2' };

    if (fastOpen) {
      // Instant skip animation
      sound.playWin(winner.rarity);
      const drop = addToInventory(winnerWithGame, caseData.name);
      setDroppedResult(drop);
      setHasWon(true);
      triggerCelebration(winner.rarity);
      return;
    }

    // Prepare animated reel
    const { list, winningIndex } = generateReel(winner);
    setRouletteItems(list);
    setIsSpinning(true);

    sound.playOpen();

    // Reset reel position
    if (reelRef.current) {
      reelRef.current.style.transition = 'none';
      reelRef.current.style.transform = 'translateX(0px)';
    }

    // Start spin after brief layout tick
    setTimeout(() => {
      if (!reelRef.current) return;

      // Calculate target scroll distance to center winning item
      // Reel container width is approx 800px on desktop
      const containerWidth = reelRef.current.parentElement.clientWidth;
      const targetCardCenter = winningIndex * (cardWidth + gap) + (cardWidth / 2);
      // Add slight random offset (-35px to +35px) for natural realism
      const randomOffset = (Math.random() - 0.5) * 60;
      const finalTranslate = -(targetCardCenter - (containerWidth / 2) + randomOffset);

      // Play tick sounds as cards pass
      let currentTick = 0;
      const totalTicks = 42;
      const tickInterval = setInterval(() => {
        currentTick++;
        sound.playTick();
        if (currentTick >= totalTicks) {
          clearInterval(tickInterval);
        }
      }, 95);

      reelRef.current.style.transition = 'transform 5.2s cubic-bezier(0.12, 0.8, 0.32, 1)';
      reelRef.current.style.transform = `translateX(${finalTranslate}px)`;

      // Spin finished handler
      setTimeout(() => {
        setIsSpinning(false);
        setHasWon(true);
        sound.playWin(winner.rarity);
        const drop = addToInventory(winnerWithGame, caseData.name);
        setDroppedResult(drop);
        triggerCelebration(winner.rarity);
      }, 5300);
    }, 50);
  };

  const triggerCelebration = (rarity) => {
    const isSpecial = ['special', 'covert', 'pubglegend', 'pubgmythic'].includes(rarity);

    confetti({
      particleCount: isSpecial ? 120 : 50,
      spread: isSpecial ? 90 : 60,
      origin: { y: 0.6 },
      colors: isSpecial ? ['#ffd043', '#eb4b4b', '#ff007f', '#ffffff'] : ['#4b69ff', '#8847ff']
    });
  };

  const handleSellWonItem = () => {
    if (!droppedResult) return;
    sellItem(droppedResult.dropId);
    setHasWon(false);
    setWinningItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-lg animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-dark-900 border border-dark-700/80 rounded-2xl shadow-2xl p-4 sm:p-6 my-auto overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-dark-800">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-black uppercase px-2.5 py-1 rounded-lg border ${
                caseData.game === 'cs2'
                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  : 'bg-orange-500/15 text-orange-400 border-orange-500/30'
              }`}
            >
              {caseData.game === 'cs2' ? 'CS 2' : 'PUBG'}
            </span>

            <div>
              <h2 className="text-lg sm:text-2xl font-black text-white font-gaming">
                {caseData.name}
              </h2>
              <p className="text-xs text-gray-400">
                Ochish narxi: <span className="font-bold text-amber-400">{unitPrice.toLocaleString('uz-UZ')} UZS ({Math.floor(unitPrice / 1000)} G)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOdds(!showOdds)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-800 text-gray-300 hover:text-white text-xs font-bold transition"
            >
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>{showOdds ? "Rouletkani ko'rish" : "Ehtimolliklar (Odds)"}</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              disabled={isSpinning}
              className="p-1.5 rounded-xl bg-dark-800 text-gray-400 hover:text-white transition disabled:opacity-40"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        {showOdds ? (
          /* Odds Breakdown View */
          <div className="my-6 max-h-96 overflow-y-auto pr-2 space-y-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Keys ichidagi barcha skinlar va tushish ehtimolligi:
            </h4>
            {caseData.items.map((item) => {
              const rarity = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.milspec;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-dark-950 border border-dark-800 hover:border-dark-700 transition"
                  style={{ borderLeftColor: rarity.color, borderLeftWidth: '4px' }}
                >
                  <div className="flex items-center gap-3">
                    <SkinImage src={item.image} weapon={item.weapon} name={item.name} rarity={item.rarity} className="w-12 h-10 object-contain" />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white">
                        {item.weapon} <span className="text-gray-300 font-normal">| {item.name}</span>
                      </div>
                      <span className={`text-[10px] font-bold ${rarity.text}`}>
                        {rarity.name}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs sm:text-sm font-black text-amber-400">
                      {item.price.toLocaleString('uz-UZ')} so'm
                    </div>
                    <div className="text-[11px] font-bold text-emerald-400">
                      ~{item.odds}% ehtimol
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ================= ROULETTE SPINNER VIEW ================= */
          <div className="my-6">
            {!hasWon ? (
              <div className="relative w-full h-52 bg-dark-950 rounded-2xl border border-dark-800 overflow-hidden flex items-center justify-center shadow-inner">
                
                {/* Needle Indicator */}
                <div className="roulette-needle" />

                {/* Left and Right Shadow Fades for 3D depth */}
                <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-dark-950 to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-dark-950 to-transparent z-20 pointer-events-none" />

                {/* Spinning Reel Strip */}
                {isSpinning || rouletteItems.length > 0 ? (
                  <div
                    ref={reelRef}
                    className="flex items-center gap-3 absolute left-0"
                    style={{ willChange: 'transform' }}
                  >
                    {rouletteItems.map((item, idx) => {
                      const rarity = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.milspec;

                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center justify-between p-3 rounded-xl bg-dark-900 border shrink-0 transition"
                          style={{
                            width: `${cardWidth}px`,
                            height: '180px',
                            borderColor: rarity.color,
                            backgroundColor: '#0e1118'
                          }}
                        >
                          <span className={`text-[10px] font-bold uppercase truncate max-w-full ${rarity.text}`}>
                            {item.weapon}
                          </span>

                          <div className="w-24 h-24 flex items-center justify-center my-1">
                            <SkinImage
                              src={item.image}
                              weapon={item.weapon}
                              name={item.name}
                              rarity={item.rarity}
                              className="max-h-full max-w-full object-contain filter drop-shadow-md"
                            />
                          </div>

                          <div className="w-full text-center">
                            <p className="text-[11px] font-extrabold text-white truncate">
                              {item.name}
                            </p>
                            <p className="text-[10px] font-black text-amber-400">
                              {item.price.toLocaleString('uz-UZ')} so'm
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Idle Preview State before clicking Open */
                  <div className="flex flex-col items-center justify-center text-center p-6 animate-pulse">
                    <SkinImage
                      src={caseData.image}
                      weapon={caseData.game === 'cs2' ? 'AK-47' : 'M416'}
                      name={caseData.name}
                      rarity="special"
                      className="w-32 h-32 object-contain filter drop-shadow-[0_0_20px_rgba(245,158,11,0.3)] mb-2"
                    />
                    <p className="text-xs font-bold text-gray-400">
                      Ochish uchun pastdagi tugmani bosing
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* ================= WIN CELEBRATION CARD ================= */
              winningItem && (
                <div className="relative w-full py-8 px-4 bg-[#0a0d14] rounded-2xl border-2 border-amber-500/60 flex flex-col items-center justify-center text-center overflow-hidden animate-scaleIn">
                  <div
                    className="absolute inset-0 opacity-25 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${
                        (RARITY_CONFIG[winningItem.rarity] || RARITY_CONFIG.milspec).color
                      } 0%, transparent 70%)`
                    }}
                  />

                  {/* Rotating Sunburst Halo */}
                  <div 
                    className="absolute w-[500px] h-[500px] rounded-full opacity-25 pointer-events-none animate-sunburst"
                    style={{
                      background: `conic-gradient(from 0deg, ${(RARITY_CONFIG[winningItem.rarity] || RARITY_CONFIG.milspec).color} 0deg 20deg, transparent 20deg 40deg, ${(RARITY_CONFIG[winningItem.rarity] || RARITY_CONFIG.milspec).color} 40deg 60deg, transparent 60deg 80deg, ${(RARITY_CONFIG[winningItem.rarity] || RARITY_CONFIG.milspec).color} 80deg 100deg, transparent 100deg 120deg, ${(RARITY_CONFIG[winningItem.rarity] || RARITY_CONFIG.milspec).color} 120deg 140deg, transparent 140deg 160deg, ${(RARITY_CONFIG[winningItem.rarity] || RARITY_CONFIG.milspec).color} 160deg 180deg, transparent 180deg 200deg, ${(RARITY_CONFIG[winningItem.rarity] || RARITY_CONFIG.milspec).color} 200deg 220deg, transparent 220deg 240deg, ${(RARITY_CONFIG[winningItem.rarity] || RARITY_CONFIG.milspec).color} 240deg 260deg, transparent 260deg 280deg, ${(RARITY_CONFIG[winningItem.rarity] || RARITY_CONFIG.milspec).color} 280deg 300deg, transparent 300deg 320deg, ${(RARITY_CONFIG[winningItem.rarity] || RARITY_CONFIG.milspec).color} 320deg 340deg, transparent 340deg 360deg)`
                    }}
                  />

                  <div className="relative z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs font-extrabold mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    TABRIKLAYMIZ! YUTUQ CHIQDI!
                  </div>

                  <div className="relative z-10 w-44 h-36 flex items-center justify-center my-2 animate-float">
                    <SkinImage
                      src={winningItem.image}
                      weapon={winningItem.weapon}
                      name={winningItem.name}
                      rarity={winningItem.rarity}
                      className="max-h-full max-w-full object-contain filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
                    />
                  </div>

                  <div className="relative z-10 mb-4">
                    <span className="text-xs uppercase font-extrabold text-gray-400">
                      {winningItem.weapon}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-gaming">
                      {winningItem.name}
                    </h3>
                    <div className="inline-block mt-2 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-lg font-black font-gaming">
                      {winningItem.price.toLocaleString('uz-UZ')} SO'M
                    </div>
                  </div>

                  {/* Actions for Won Item */}
                  <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={handleSellWonItem}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-black text-xs sm:text-sm font-extrabold shadow-lg transition"
                    >
                      <Coins className="w-4 h-4" />
                      <span>{t('sell')} (+{winningItem.price.toLocaleString('uz-UZ')} UZS)</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.playClick();
                        setHasWon(false);
                        setWinningItem(null);
                      }}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-700 text-white text-xs sm:text-sm font-bold border border-dark-600 transition"
                    >
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{t('saveSkin')}</span>
                    </button>

                    <button
                      onClick={() => {
                        sound.playClick();
                        onClose();
                        setIsInventoryOpen(true);
                      }}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#161b2b] hover:bg-[#20273c] text-[#f59e0b] hover:text-white text-xs sm:text-sm font-black border border-[#f59e0b]/40 transition shadow-lg"
                    >
                      <Package className="w-4 h-4" />
                      <span>{t('viewInventory')}</span>
                    </button>

                    <button
                      onClick={handleStartOpen}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs sm:text-sm font-black transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>{t('openAgain')}</span>
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* ================= CONTROLS FOOTER ================= */}
        {!hasWon && !showOdds && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-dark-800">
            {/* Options: Fast Open & Multi-Open */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-300 select-none">
                <input
                  type="checkbox"
                  checked={fastOpen}
                  onChange={(e) => setFastOpen(e.target.checked)}
                  disabled={isSpinning}
                  className="w-4 h-4 rounded text-amber-500 bg-dark-950 border-dark-700 focus:ring-0 cursor-pointer"
                />
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('fastOpen')}</span>
              </label>

              <div className="flex items-center bg-dark-950 p-1 rounded-xl border border-dark-800">
                {[1, 2, 3, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      sound.playClick();
                      setOpenCount(num);
                    }}
                    disabled={isSpinning}
                    className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition ${
                      openCount === num
                        ? 'bg-dark-800 text-amber-400 shadow'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {num}x
                  </button>
                ))}
              </div>
            </div>

            {/* Launch CTA Button */}
            <button
              onClick={handleStartOpen}
              disabled={isSpinning}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black text-sm font-black tracking-wide shadow-xl shadow-amber-500/20 disabled:opacity-50 transition transform active:scale-98"
            >
              <Flame className="w-4 h-4 fill-black" />
              <span>
                {isSpinning
                  ? t('opening')
                  : caseData.priceG
                    ? `${t('openCase')} (${caseData.priceG * openCount} G · ${(unitPrice * openCount).toLocaleString('uz-UZ')} UZS)`
                    : `${t('openCase')} (${(unitPrice * openCount).toLocaleString('uz-UZ')} UZS)`}
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
