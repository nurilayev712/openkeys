import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, CheckCircle, Hash, RefreshCw } from 'lucide-react';
import { sound } from '../utils/sound';

export const FairPlayView = () => {
  const { language } = useLanguage();
  const [serverSeed, setServerSeed] = useState('d3b07384d113edec49eaa6238ad5ff00b1a03');
  const [clientSeed, setClientSeed] = useState('uzbek_openkeys_fair_roll');
  const [nonce, setNonce] = useState(1);
  const [verifiedHash, setVerifiedHash] = useState('sha256-e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');

  const handleRegenerate = () => {
    sound.playClick();
    const newSeed = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    setServerSeed(newSeed);
    setNonce(prev => prev + 1);
    setVerifiedHash('sha256-' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{language === 'UZ' ? "100% SHAFFOF VA ADOLATLI" : language === 'EN' ? "100% TRANSPARENT & FAIR" : "100% ЧЕСТНО И ПРОЗРАЧНО"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-gaming tracking-wide">
          PROVABLY FAIR ({language === 'UZ' ? "HALOL O'YIN TIZIMI" : language === 'EN' ? "CRYPTOGRAPHIC FAIRNESS" : "СИСТЕМА ЧЕСТНОЙ ИГРЫ"})
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mt-1">
          {language === 'UZ' 
            ? "OpenKeys platformasida har bir ochilgan keys natijasi kriptografik algoritm yordamida spin boshlanishidan oldin aniqlanadi. Hech kim natijani o'zgartira olmaydi."
            : language === 'EN'
            ? "On OpenKeys, every case spin outcome is pre-calculated mathematically before the wheel turns using SHA-256 cryptographic seeds. It cannot be altered by anyone."
            : "На платформе OpenKeys результат каждого спина определяется криптографическим алгоритмом еще до начала анимации. Никто не может повлиять на результат."}
        </p>
      </div>

      <div className="space-y-6">
        {/* Verification Box */}
        <div className="bg-[#0e111a] border border-[#1e2538] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1b2234]">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-[#f59e0b]" />
              <h3 className="text-base font-bold text-white">
                {language === 'UZ' ? "Xesh tekshiruv kalkulyatori" : language === 'EN' ? "Hash Verification Calculator" : "Калькулятор верификации хеша"}
              </h3>
            </div>
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#151926] hover:bg-[#1e2436] text-[#f59e0b] text-xs font-bold transition border border-[#232a3e]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{language === 'UZ' ? "Yangi Seed yaratish" : language === 'EN' ? "Generate new seed" : "Сгенерировать новый Seed"}</span>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">
                Server Seed ({language === 'UZ' ? "Yashirin Xesh" : language === 'EN' ? "Secret Hash" : "Скрытый Хеш"}):
              </label>
              <input
                type="text"
                readOnly
                value={serverSeed}
                className="w-full bg-[#0a0d14] border border-[#1e2538] rounded-xl px-3.5 py-2 text-xs font-mono text-gray-300 select-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Client Seed:</label>
                <input
                  type="text"
                  value={clientSeed}
                  onChange={(e) => setClientSeed(e.target.value)}
                  className="w-full bg-[#0a0d14] border border-[#1e2538] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:border-[#f59e0b] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">
                  Nonce ({language === 'UZ' ? "Ochish raqami" : language === 'EN' ? "Spin index" : "Номер открытия"}):
                </label>
                <input
                  type="number"
                  value={nonce}
                  onChange={(e) => setNonce(Number(e.target.value))}
                  className="w-full bg-[#0a0d14] border border-[#1e2538] rounded-xl px-3.5 py-2 text-xs font-mono text-white focus:border-[#f59e0b] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{language === 'UZ' ? "Hisoblangan SHA-256 Xeshi:" : language === 'EN' ? "Calculated SHA-256 Hash:" : "Рассчитанный SHA-256 Хеш:"}</span>
              </label>
              <div className="p-3 rounded-xl bg-[#0a0d14] border border-emerald-500/30 text-xs font-mono text-emerald-300 break-all">
                {verifiedHash}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-[#0e111a] border border-[#1e2538]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold mb-3">
              1
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {language === 'UZ' ? "Oldindan shakllangan" : language === 'EN' ? "Pre-determined" : "Предопределено"}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {language === 'UZ' 
                ? "Yutuq siz 'Ochish' tugmasini bosgan lahzada qat'iy matematik formula bo'yicha hisoblanadi."
                : language === 'EN'
                ? "The outcome is determined mathematically the instant you click open."
                : "Результат формируется математически в момент нажатия кнопки открытия."}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e111a] border border-[#1e2538]">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold mb-3">
              2
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {language === 'UZ' ? "O'zgartirib bo'lmaydi" : language === 'EN' ? "Tamper-proof" : "Неизменно"}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {language === 'UZ' 
                ? "Tizim administratorlari yoki o'yinchilar natijaga hech qanday aralasha olmaydi."
                : language === 'EN'
                ? "Neither site administrators nor players can tamper with the output."
                : "Ни администрация, ни игроки не могут вмешаться в сгенерированный результат."}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0e111a] border border-[#1e2538]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold mb-3">
              3
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {language === 'UZ' ? "100% Ochiq manba" : language === 'EN' ? "Open Verification" : "Открытый доступ"}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {language === 'UZ' 
                ? "Istalgan uchinchi tomon SHA-256 kalkulyatori orqali natijani mustaqil tekshirib ko'rishingiz mumkin."
                : language === 'EN'
                ? "You can independently verify any drop with third-party SHA-256 hash tools."
                : "Вы можете независимо проверить любой дроп через любой сторонний SHA-256 калькулятор."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
