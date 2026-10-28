import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { KeyRound, ShieldCheck, Heart, Send } from 'lucide-react';
import { sound } from '../utils/sound';

export const Footer = ({ onSelectGame, onSelectTab, onOpenInfo }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#090b12] border-t border-[#1a1f30] pt-12 pb-8 mt-16 text-gray-400">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#181d2d]">
          
          {/* Col 1: Logo & About */}
          <div className="md:col-span-2 space-y-4">
            <div 
              onClick={() => {
                sound.playClick();
                if (onSelectTab) onSelectTab('cases');
              }}
              className="flex items-center gap-2.5 cursor-pointer group inline-flex"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 text-black font-black group-hover:scale-105 transition">
                <KeyRound className="w-5 h-5 fill-black" />
              </div>
              <span className="text-xl font-black text-white font-gaming tracking-wide">
                OPEN<span className="text-amber-400">KEYS</span>
              </span>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              {language === 'UZ' 
                ? "OpenKeys — Counter-Strike 2 va PUBG: BATTLEGROUNDS o'yinlari uchun O'zbekistondagi eng sifatli, ishonchli va shaffof keys ochish platformasi. BullDrop uslubidagi rasmiy mexanika va provably fair kafolati."
                : language === 'EN'
                ? "OpenKeys is the premier, verified case opening and skin upgrade platform for CS2 and PUBG. Authentic mechanics and 100% provably fair cryptographic guarantees."
                : "OpenKeys — Официальная платформа открытия кейсов и апгрейда скинов для CS2 и PUBG в Узбекистане. Аутентичная механика в стиле BullDrop и 100% гарантия честности Provably Fair."}
            </p>

            <div className="flex items-center gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111522] border border-[#1b2234]">
                <span className="text-amber-400 font-bold">18+</span>
                <span>{language === 'UZ' ? "Faqat voyaga yetganlar uchun" : language === 'EN' ? "18+ Adults only" : "Только для лиц старше 18 лет"}</span>
              </div>
              <button 
                onClick={() => {
                  sound.playClick();
                  if (onSelectTab) onSelectTab('fairplay');
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#111522] border border-[#1b2234] hover:border-emerald-500/50 hover:text-emerald-400 transition cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Provably Fair</span>
              </button>
            </div>
          </div>

          {/* Col 2: Games */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">
              {language === 'UZ' ? "O'YINLAR" : language === 'EN' ? "GAMES" : "ИГРЫ"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onSelectGame) onSelectGame('cs2');
                    if (onSelectTab) onSelectTab('cases');
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition cursor-pointer text-left"
                >
                  {language === 'UZ' ? "CS 2 Keyslari" : language === 'EN' ? "CS2 Cases" : "Кейсы CS 2"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onSelectGame) onSelectGame('cs2');
                    if (onSelectTab) onSelectTab('cases');
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition cursor-pointer text-left"
                >
                  {language === 'UZ' ? "CS 2 Pichoqlar (Knives)" : language === 'EN' ? "CS2 Knives" : "Ножи CS 2"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onSelectGame) onSelectGame('pubg');
                    if (onSelectTab) onSelectTab('cases');
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition cursor-pointer text-left"
                >
                  {language === 'UZ' ? "PUBG Cratelar" : language === 'EN' ? "PUBG Crates" : "PUBG Кейсы"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onSelectGame) onSelectGame('pubg');
                    if (onSelectTab) onSelectTab('cases');
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition cursor-pointer text-left"
                >
                  Glacier M416 & The Fool
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onSelectTab) onSelectTab('upgrader');
                  }}
                  className="hover:text-amber-400 transition cursor-pointer text-left"
                >
                  Skin Upgrader
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Community */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-3">
              {language === 'UZ' ? "QO'LLAB-QUVVATLASH" : language === 'EN' ? "SUPPORT" : "ПОДДЕРЖКА"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition flex items-center gap-1.5 text-left"
                >
                  <Send className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>24/7 Telegram Yordam (@OpenKeysSupport)</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onOpenInfo) onOpenInfo('faq');
                  }}
                  className="hover:text-amber-400 transition cursor-pointer text-left"
                >
                  {language === 'UZ' ? "To'lov va yechib olish qoidalari" : language === 'EN' ? "Payment & Withdrawal Rules" : "Правила пополнения и вывода"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onOpenInfo) onOpenInfo('faq');
                  }}
                  className="hover:text-amber-400 transition cursor-pointer text-left"
                >
                  {language === 'UZ' ? "Foydalanish shartlari" : language === 'EN' ? "Terms of Service" : "Условия использования"}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playClick();
                    if (onOpenInfo) onOpenInfo('partnership');
                  }}
                  className="hover:text-amber-400 transition cursor-pointer text-left"
                >
                  {language === 'UZ' ? "Hamkorlik dasturi" : language === 'EN' ? "Affiliate Program" : "Партнерская программа"}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© 2026 OPENKEYS. {language === 'UZ' ? "Barcha huquqlar himoyalangan. Valve Corporation yoki KRAFTON bilan bog'liq emas." : language === 'EN' ? "All rights reserved. Not affiliated with Valve Corporation or KRAFTON." : "Все права защищены. Не связано с Valve Corporation или KRAFTON."}</p>
          <p className="flex items-center gap-1">
            <span>OpenKeys Premium Experience</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
