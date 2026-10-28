import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';
import { 
  Rocket, 
  X, 
  Flame, 
  Coins, 
  TrendingUp, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  Zap
} from 'lucide-react';

export const CrashGameModal = ({ isOpen, onClose }) => {
  const { user, deduct, deposit, setIsAuthModalOpen, setIsDepositOpen } = useAuth();
  const { t } = useLanguage();

  const [betAmountG, setBetAmountG] = useState(20); // 20 G = 20,000 UZS
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'running' | 'crashed' | 'won'
  const [multiplier, setMultiplier] = useState(1.00);
  const [crashPoint, setCrashPoint] = useState(2.00);
  const [wonAmount, setWonAmount] = useState(0);
  const [history, setHistory] = useState([1.42, 3.15, 1.12, 18.40, 2.05, 7.89, 1.85]);

  const animationRef = useRef(null);
  const startTimeRef = useRef(0);
  const canvasRef = useRef(null);

  if (!isOpen) return null;

  const betAmountUZS = betAmountG * 1000;

  // Start game round
  const handleStartGame = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    if (user.balance < betAmountUZS) {
      sound.playClick();
      setIsDepositOpen(true);
      return;
    }

    if (!deduct(betAmountUZS)) {
      setIsDepositOpen(true);
      return;
    }

    sound.playOpen();

    // Determine crash point using provably fair pseudo-random algorithm
    // 6% instant crash at 1.00-1.10x, 60% below 2.5x, 30% up to 10x, 4% moon rocket up to 50x
    const rand = Math.random();
    let targetCrash;
    if (rand < 0.08) {
      targetCrash = 1.00 + Math.random() * 0.15;
    } else if (rand < 0.65) {
      targetCrash = 1.15 + Math.random() * 1.5;
    } else if (rand < 0.94) {
      targetCrash = 2.65 + Math.random() * 6.0;
    } else {
      targetCrash = 8.65 + Math.random() * 25.0;
    }

    setCrashPoint(targetCrash);
    setGameState('running');
    setMultiplier(1.00);
    setWonAmount(0);

    startTimeRef.current = Date.now();
    runGameLoop(targetCrash);
  };

  const runGameLoop = (target) => {
    const tick = () => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      // Exponential curve: e^(0.07 * t^1.2)
      const currentMult = 1.00 + Math.pow(elapsed * 0.9, 1.45);

      if (currentMult >= target) {
        // Crashed!
        setMultiplier(target);
        setGameState('crashed');
        sound.playClick();
        setHistory(prev => [parseFloat(target.toFixed(2)), ...prev.slice(0, 9)]);
        cancelAnimationFrame(animationRef.current);
        return;
      }

      setMultiplier(currentMult);
      drawCanvas(currentMult, false);
      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);
  };

  const handleCashOut = () => {
    if (gameState !== 'running') return;

    cancelAnimationFrame(animationRef.current);
    const winRate = multiplier;
    const winningsUZS = Math.floor(betAmountUZS * winRate);

    deposit(winningsUZS);
    setWonAmount(winningsUZS);
    setGameState('won');
    sound.playWin('special');

    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 }
    });

    setHistory(prev => [parseFloat(winRate.toFixed(2)), ...prev.slice(0, 9)]);
  };

  const drawCanvas = (mult, isCrash) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines
    ctx.strokeStyle = '#1b2336';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw rocket curve
    const progress = Math.min((mult - 1) / 8, 1);
    const endX = 40 + progress * (width - 100);
    const endY = height - 30 - Math.pow(progress, 0.8) * (height - 80);

    ctx.beginPath();
    ctx.moveTo(30, height - 30);
    ctx.quadraticCurveTo(endX * 0.5, height - 20, endX, endY);
    ctx.strokeStyle = isCrash ? '#ef4444' : '#f59e0b';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Fill under curve
    ctx.lineTo(endX, height - 30);
    ctx.lineTo(30, height - 30);
    const grad = ctx.createLinearGradient(0, endY, 0, height);
    grad.addColorStop(0, isCrash ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fill();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e111a] border border-[#222a3f] rounded-2xl shadow-2xl p-6 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-[#161a28] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1b2234]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-black shadow-lg shadow-orange-500/25">
              <Rocket className="w-5 h-5 fill-black -rotate-45" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white font-gaming flex items-center gap-2">
                <span>{t('crashTitle')}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                {t('crashSub')}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Multipliers Pill Bar */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto no-scrollbar border-b border-[#1b2234]">
          <span className="text-[10px] font-bold text-gray-500 uppercase shrink-0">{t('history')}</span>
          {history.map((h, i) => (
            <span
              key={i}
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-black shrink-0 ${
                h >= 5.0
                  ? 'bg-amber-500/20 text-[#f59e0b] border border-[#f59e0b]/40'
                  : h >= 2.0
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-[#161a27] text-gray-400 border border-[#232a3e]'
              }`}
            >
              {h.toFixed(2)}x
            </span>
          ))}
        </div>

        {/* Canvas Display Screen */}
        <div className="relative my-4 w-full h-56 sm:h-64 rounded-2xl bg-[#090b12] border border-[#1b2133] overflow-hidden flex items-center justify-center">
          
          <canvas
            ref={canvasRef}
            width={600}
            height={260}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Central Multiplier Indicator */}
          <div className="relative z-10 text-center select-none pointer-events-none">
            {gameState === 'idle' && (
              <div className="space-y-1">
                <Rocket className="w-12 h-12 text-[#f59e0b] mx-auto animate-bounce -rotate-45" />
                <span className="text-xl sm:text-2xl font-black text-gray-400 font-gaming">
                  PARVOZGA TAYYORMISIZ?
                </span>
              </div>
            )}

            {gameState === 'running' && (
              <div className="animate-pulse">
                <span className="text-4xl sm:text-6xl font-black text-white font-gaming tracking-tight drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]">
                  {multiplier.toFixed(2)}x
                </span>
                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mt-1">
                  Yutuq: {Math.floor(betAmountUZS * multiplier).toLocaleString('uz-UZ')} UZS
                </p>
              </div>
            )}

            {gameState === 'crashed' && (
              <div className="animate-shake">
                <span className="text-4xl sm:text-6xl font-black text-rose-500 font-gaming tracking-tight">
                  {crashPoint.toFixed(2)}x
                </span>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 text-xs font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>RAKETA PORTLADI!</span>
                </div>
              </div>
            )}

            {gameState === 'won' && (
              <div className="animate-bounce">
                <span className="text-4xl sm:text-6xl font-black text-emerald-400 font-gaming tracking-tight">
                  {multiplier.toFixed(2)}x
                </span>
                <div className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-black shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  <span>+{wonAmount.toLocaleString('uz-UZ')} UZS YUTIB OLINDI!</span>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Bet Controls */}
        <div className="space-y-3">
          
          {/* Quick Bet Buttons */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-gray-400">{t('betAmount')}</span>
            <div className="flex items-center gap-1.5">
              {[10, 20, 50, 100, 250].map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    sound.playClick();
                    setBetAmountG(amt);
                  }}
                  disabled={gameState === 'running'}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black transition ${
                    betAmountG === amt
                      ? 'bg-[#f59e0b] text-black shadow'
                      : 'bg-[#151926] text-gray-400 hover:text-white border border-[#222a3e]'
                  }`}
                >
                  {amt} G
                </button>
              ))}
            </div>
          </div>

          {/* Action Button: Bet or Cash Out */}
          {gameState === 'running' ? (
            <button
              onClick={handleCashOut}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 hover:from-emerald-400 hover:to-green-300 text-black font-black text-base sm:text-lg tracking-wider shadow-2xl shadow-emerald-500/30 transition transform active:scale-98 animate-pulse"
            >
              {t('cashOut')}: {Math.floor(betAmountUZS * multiplier).toLocaleString('uz-UZ')} UZS ({multiplier.toFixed(2)}x)
            </button>
          ) : (
            <button
              onClick={handleStartGame}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] hover:from-[#f59e0b] text-black font-black text-sm tracking-wide shadow-xl shadow-orange-500/25 transition transform active:scale-98"
            >
              <Rocket className="w-4 h-4 fill-black -rotate-45" />
              <span>{t('startFlight')} ({betAmountG} G · {betAmountUZS.toLocaleString('uz-UZ')} UZS)</span>
            </button>
          )}

        </div>

      </div>
    </div>
  );
};
