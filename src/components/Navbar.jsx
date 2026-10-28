import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { 
  Key, 
  Coins, 
  Plus, 
  Volume2, 
  VolumeX, 
  Package, 
  LogOut, 
  Flame, 
  FileText, 
  Swords, 
  Gift, 
  Send, 
  ChevronDown,
  Rocket,
  User as UserIcon
} from 'lucide-react';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  selectedGame, 
  setSelectedGame,
  onOpenBonus,
  onOpenInfo
}) => {
  const {
    user,
    inventory,
    setIsAuthModalOpen,
    setIsDepositOpen,
    setIsInventoryOpen,
    isSoundMuted,
    toggleSound,
    logout
  } = useAuth();

  const { language, setLanguage, t } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0e111a] border-b border-[#1b2030] shadow-xl">
      
      {/* ── TOP MAIN HEADER (Screenshot 1) ─────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo & Links */}
          <div className="flex items-center gap-6">
            
            {/* OPENKEYS Logo */}
            <div 
              onClick={() => {
                sound.playClick();
                setActiveTab('cases');
              }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ea580c] via-[#f59e0b] to-[#fbbf24] p-0.5 flex items-center justify-center shadow-lg shadow-orange-500/25 group-hover:scale-105 transition transform">
                <div className="w-full h-full rounded-[10px] bg-[#0e111a] flex items-center justify-center">
                  <Key className="w-5 h-5 text-[#f59e0b] rotate-45" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider text-white font-gaming leading-none">
                  OPEN<span className="text-[#f59e0b]">KEYS</span>
                </span>
                <span className="text-[9px] font-extrabold text-gray-400 tracking-widest uppercase">
                  {t('logoSubtitle')}
                </span>
              </div>
            </div>

            {/* Language Selector (RU / UZ) */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#151926] hover:bg-[#1d2335] text-xs font-bold text-gray-300 border border-[#222a40] transition"
              >
                <span>{language}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute left-0 mt-1 w-24 bg-[#151926] border border-[#222a40] rounded-lg shadow-xl py-1 z-50">
                  {['RU', 'UZ', 'EN'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsLangMenuOpen(false);
                      }}
                      className="w-full px-3 py-1.5 text-left text-xs font-bold text-gray-300 hover:text-white hover:bg-[#20273c]"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-5 text-xs font-bold text-gray-400 uppercase tracking-wide">
              <button 
                onClick={() => {
                  sound.playClick();
                  if (onOpenInfo) onOpenInfo('faq');
                }} 
                className="hover:text-white transition cursor-pointer"
              >
                {t('faq')}
              </button>
              <button 
                onClick={() => {
                  sound.playClick();
                  if (onOpenInfo) onOpenInfo('wiki');
                }} 
                className="hover:text-white transition cursor-pointer"
              >
                {t('wiki')}
              </button>
              <button 
                onClick={() => {
                  sound.playClick();
                  if (onOpenInfo) onOpenInfo('partnership');
                }} 
                className="hover:text-white transition flex items-center gap-1 cursor-pointer"
              >
                <span>{t('partnership')}</span>
              </button>
            </nav>

          </div>

          {/* Right: Social icons & Login button */}
          <div className="flex items-center gap-3">
            
            {/* Social icons & Online badge */}
            <div className="hidden sm:flex items-center gap-2.5 text-gray-400 mr-2">
              <a href="https://t.me" target="_blank" rel="noreferrer" title="Telegram" className="p-1.5 rounded-lg bg-[#151926] hover:text-[#f59e0b] hover:bg-[#1e2436] transition">
                <Send className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[#121624] border border-[#1e2538] text-[11px] font-bold text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 radar-pulse" />
                <span className="text-[10px] text-emerald-400 font-black">24/7 ONLINE</span>
              </div>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={isSoundMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
              className="p-2 rounded-xl bg-[#151926] border border-[#222a40] text-gray-400 hover:text-[#f59e0b] transition"
            >
              {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#f59e0b]" />}
            </button>

            {/* Always Visible Inventory Button */}
            <button
              onClick={() => {
                sound.playClick();
                if (!user) {
                  setIsAuthModalOpen(true);
                } else {
                  setIsInventoryOpen(true);
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#151926] hover:bg-[#1f2537] border border-[#222a40] hover:border-[#f59e0b]/50 text-gray-200 hover:text-white text-xs font-bold transition shadow-sm"
              title="Inventarni ochish"
            >
              <Package className="w-4 h-4 text-[#f59e0b]" />
              <span className="font-black">{t('inventory')}</span>
              {user && inventory.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#f59e0b] text-black">
                  {inventory.length}
                </span>
              )}
            </button>

            {user ? (
              /* User logged in state */
              <div className="flex items-center gap-2.5">

                {/* Balance pill */}
                <div className="flex items-center bg-[#151926] border border-[#222a40] rounded-xl p-1 shadow-inner">
                  <div className="px-3 py-0.5 text-left">
                    <span className="block text-[9px] text-gray-400 font-semibold uppercase leading-tight">
                      {t('balance')}
                    </span>
                    <span className="text-xs sm:text-sm font-black text-[#f59e0b] font-gaming">
                      {Math.floor((Number(user.balance) || 0) / 1000).toLocaleString('ru-RU')} G
                    </span>
                  </div>

                  <button
                    onClick={() => setIsDepositOpen(true)}
                    className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-black font-black transition active:scale-95"
                    title={t('topUp')}
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-1.5 p-1 rounded-xl bg-[#151926] border border-[#222a40] hover:border-[#f59e0b]/50"
                  >
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-8 h-8 rounded-lg bg-dark-800 object-cover"
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div 
                      className="absolute right-0 mt-2 w-48 bg-[#151926] border border-[#222a40] rounded-xl shadow-2xl py-2 z-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <div className="px-3 py-1.5 border-b border-[#222a40]">
                        <p className="text-xs font-bold text-white truncate">{user.username}</p>
                        <p className="text-[10px] text-[#f59e0b] font-extrabold">{(Number(user.balance) || 0).toLocaleString('uz-UZ')} UZS</p>
                      </div>
                      <button onClick={() => setIsInventoryOpen(true)} className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#20273c]">
                        {t('inventory')} ({inventory.length})
                      </button>
                      <button onClick={() => setIsDepositOpen(true)} className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-[#20273c]">
                        {t('topUp')}
                      </button>
                      <button onClick={logout} className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-red-500/10">
                        {t('logout')}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              /* Orange ВОЙТИ button (Screenshot 1) */
              <button
                onClick={() => {
                  sound.playClick();
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] hover:from-[#f59e0b] hover:to-[#ea580c] text-black shadow-lg shadow-orange-500/25 transition transform active:scale-95"
              >
                <span>{t('login')}</span>
                <Key className="w-4 h-4 fill-black" />
              </button>
            )}

          </div>

        </div>
      </div>

      {/* ── SUB-NAVIGATION BAR (Screenshot 1 + Extras) ───────────────────────── */}
      <div className="border-t border-[#181d2c] bg-[#111420]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 overflow-x-auto no-scrollbar gap-3">
            
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* БОНУСЫ with golden gift box (Screenshot 1) */}
              <button
                onClick={() => {
                  sound.playClick();
                  if (onOpenBonus) onOpenBonus();
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#201d14] to-[#2a2210] border border-[#f59e0b]/40 hover:border-[#f59e0b] text-[#f59e0b] text-xs font-black transition shrink-0 shadow-sm"
              >
                <img 
                  src="/images/ggdrop/bonus-box.png" 
                  alt="Бонусы" 
                  className="w-7 h-7 object-contain animate-bounce"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <span>{t('bonuses')}</span>
              </button>

              {/* CRASH ROCKET (New Minigame) */}
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('crash');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition shrink-0 ${
                  activeTab === 'crash'
                    ? 'bg-[#1b2030] text-[#f59e0b] border border-[#f59e0b]/40'
                    : 'text-gray-400 hover:text-white hover:bg-[#161a29]'
                }`}
              >
                <Rocket className="w-4 h-4 text-amber-400 -rotate-45" />
                <span>{t('crash')}</span>
              </button>

              {/* ПРОМО & КОНКУРСЫ (New Giveaway/Promo) */}
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('promo');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition shrink-0 ${
                  activeTab === 'promo'
                    ? 'bg-[#1b2030] text-purple-400 border border-purple-500/40'
                    : 'text-gray-400 hover:text-white hover:bg-[#161a29]'
                }`}
              >
                <Gift className="w-4 h-4 text-purple-400" />
                <span>{t('promo')}</span>
              </button>

              {/* Апгрейд (Screenshot 1) */}
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('upgrader');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition shrink-0 ${
                  activeTab === 'upgrader'
                    ? 'bg-[#1b2030] text-[#f59e0b] border border-[#f59e0b]/40'
                    : 'text-gray-400 hover:text-white hover:bg-[#161a29]'
                }`}
              >
                <Flame className="w-4 h-4 text-emerald-400" />
                <span>{t('upgrade')}</span>
              </button>

              {/* Контракты (Screenshot 1) */}
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('contracts');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition shrink-0 ${
                  activeTab === 'contracts'
                    ? 'bg-[#1b2030] text-[#f59e0b] border border-[#f59e0b]/40'
                    : 'text-gray-400 hover:text-white hover:bg-[#161a29]'
                }`}
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>{t('contracts')}</span>
              </button>

              {/* Кейс Батл (Screenshot 1) */}
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('battle');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition shrink-0 ${
                  activeTab === 'battle'
                    ? 'bg-[#1b2030] text-[#f59e0b] border border-[#f59e0b]/40'
                    : 'text-gray-400 hover:text-white hover:bg-[#161a29]'
                }`}
              >
                <Swords className="w-4 h-4 text-rose-400" />
                <span>{t('battle')}</span>
              </button>

              {/* Инвентарь in subnav */}
              <button
                onClick={() => {
                  sound.playClick();
                  if (!user) {
                    setIsAuthModalOpen(true);
                  } else {
                    setIsInventoryOpen(true);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-gray-300 hover:text-white hover:bg-[#161a29] transition shrink-0 border border-transparent hover:border-[#f59e0b]/30"
              >
                <Package className="w-4 h-4 text-[#f59e0b]" />
                <span>{t('inventory')}</span>
                {user && inventory.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-[#f59e0b] text-black">
                    {inventory.length}
                  </span>
                )}
              </button>

            </div>

            {/* Game Switcher: CS 2 & PUBG */}
            <div className="flex items-center gap-1.5 bg-[#0e111a] p-1 rounded-xl border border-[#1e2335] shrink-0">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('cases');
                  setSelectedGame('all');
                }}
                className={`px-3 py-1 text-xs font-black rounded-lg transition ${
                  selectedGame === 'all'
                    ? 'bg-[#f59e0b] text-black shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {t('all')}
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('cases');
                  setSelectedGame('cs2');
                }}
                className={`px-3 py-1 text-xs font-black rounded-lg transition ${
                  selectedGame === 'cs2'
                    ? 'bg-[#f59e0b] text-black shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                CS 2
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('cases');
                  setSelectedGame('pubg');
                }}
                className={`px-3 py-1 text-xs font-black rounded-lg transition ${
                  selectedGame === 'pubg'
                    ? 'bg-[#ea580c] text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                PUBG
              </button>
            </div>

          </div>
        </div>
      </div>

    </header>
  );
};
