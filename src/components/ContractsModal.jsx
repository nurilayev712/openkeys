import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { FileText, X, Sparkles, Check, Package } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CARNIVAL_CASES } from '../data/cases';

export const ContractsModal = ({ isOpen, onClose }) => {
  const { user, inventory, deduct, addToInventory, setIsAuthModalOpen, setIsDepositOpen } = useAuth();
  const { language, t } = useLanguage();
  const [isProcessing, setIsProcessing] = useState(false);
  const [contractResult, setContractResult] = useState(null);

  if (!isOpen) return null;

  const handleSignContract = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    const cost = 50000; // 50 G
    if (user.balance < cost) {
      sound.playClick();
      setIsDepositOpen(true);
      return;
    }

    if (!deduct(cost)) {
      setIsDepositOpen(true);
      return;
    }

    setIsProcessing(true);
    setContractResult(null);
    sound.playOpen();

    setTimeout(() => {
      // Pick random rare skin
      const pool = CARNIVAL_CASES.flatMap(c => c.items.filter(i => ['covert', 'special', 'classified'].includes(i.rarity)));
      const winner = pool[Math.floor(Math.random() * pool.length)];

      sound.playWin(winner.rarity);
      addToInventory(winner, 'Контракт обмена');
      setContractResult(winner);
      setIsProcessing(false);

      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0e111a] border border-[#222a40] rounded-2xl shadow-2xl p-6 overflow-hidden">
        
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
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-gaming">КОНТРАКТЫ ОБМЕНА</h3>
            <p className="text-xs text-gray-400">Обменяйте контракт на гарантированный ценный скин!</p>
          </div>
        </div>

        {/* Contract parchment display */}
        <div className="my-4 p-5 rounded-xl bg-[#121522] border border-[#1e2335] text-center">
          {contractResult ? (
            <div className="animate-scaleIn">
              <span className="text-[11px] font-black text-emerald-400 uppercase">КОНТРАКТ ВЫПОЛНЕН!</span>
              <div className="w-32 h-24 mx-auto my-2 flex items-center justify-center">
                <img src={contractResult.image} alt={contractResult.name} className="max-h-full max-w-full object-contain filter drop-shadow" />
              </div>
              <h4 className="text-sm font-bold text-white">{contractResult.weapon} | {contractResult.name}</h4>
              <p className="text-xs font-black text-[#f59e0b] font-gaming mt-1">
                {contractResult.price.toLocaleString('uz-UZ')} UZS
              </p>
            </div>
          ) : (
            <div className="py-4">
              <FileText className="w-12 h-12 text-[#f59e0b] mx-auto mb-2 opacity-80" />
              <p className="text-xs text-gray-300 font-bold">Подпишите контракт на сумму 50 G (50 000 UZS)</p>
              <p className="text-[11px] text-gray-500 mt-1">Шанс получить Тайное оружие или Нож!</p>
            </div>
          )}
        </div>

        {/* Sign Button */}
        <button
          onClick={handleSignContract}
          disabled={isProcessing}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] hover:from-[#f59e0b] text-black font-black text-sm tracking-wider shadow-lg shadow-orange-500/25 disabled:opacity-50 transition"
        >
          {isProcessing ? 'ПОДПИСАНИЕ КОНТРАКТА...' : 'ПОДПИСАТЬ КОНТРАКТ (50 G)'}
        </button>

      </div>
    </div>
  );
};
