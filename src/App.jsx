import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';
import { CARNIVAL_CASES, COMMUNITY_CASES, ALL_CASES } from './data/cases';
import { sound } from './utils/sound';
import { Navbar } from './components/Navbar';
import { LiveDropsTicker } from './components/LiveDropsTicker';
import { HeroBanner } from './components/HeroBanner';
import { CaseCard } from './components/CaseCard';
import { FreeKeysSection } from './components/FreeKeysSection';
import { CaseOpeningModal } from './components/CaseOpeningModal';
import { AuthModal } from './components/AuthModal';
import { DepositModal } from './components/DepositModal';
import { InventoryModal } from './components/InventoryModal';
import { SkinUpgrader } from './components/SkinUpgrader';
import { FairPlayView } from './components/FairPlayModal';
import { DailyBonusModal } from './components/DailyBonusModal';
import { CaseBattleModal } from './components/CaseBattleModal';
import { ContractsModal } from './components/ContractsModal';
import { CrashGameModal } from './components/CrashGameModal';
import { PromoGiveawayModal } from './components/PromoGiveawayModal';
import { InfoModal } from './components/InfoModal';
import { LiveDropPreviewModal } from './components/LiveDropPreviewModal';
import { Footer } from './components/Footer';
import { 
  Search, 
  RotateCcw, 
  ChevronUp, 
  ChevronDown, 
  Lock, 
  Sparkles, 
  Gamepad2, 
  Flame,
  Layers,
  Package
} from 'lucide-react';

export function App() {
  const { user, inventory, setIsAuthModalOpen, setAuthMode, loginWithDemo, setIsInventoryOpen } = useAuth();
  const { t } = useLanguage();

  // Active navigation tab: 'cases' | 'upgrader' | 'fairplay' | 'battle' | 'contracts'
  const [activeTab, setActiveTab] = useState('cases');
  const [selectedGame, setSelectedGame] = useState('all'); // 'all' | 'cs2' | 'pubg'
  const [searchQuery, setSearchQuery] = useState('');
  const [priceGMax, setPriceGMax] = useState(99999);
  const [isCarnivalCollapsed, setIsCarnivalCollapsed] = useState(false);
  const [activeOpeningCase, setActiveOpeningCase] = useState(null);
  const [isDailyBonusOpen, setIsDailyBonusOpen] = useState(false);
  const [infoModalTab, setInfoModalTab] = useState(null); // 'faq' | 'wiki' | 'partnership' | null
  const [previewDropItem, setPreviewDropItem] = useState(null);

  // Automatically prompt auth modal on initial visit if user is not logged in ("kershdan oldn login sigin bolsn")
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setIsAuthModalOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  // Filter helper
  const filterCase = (c) => {
    if (selectedGame !== 'all' && c.game !== selectedGame) return false;
    if (c.priceG && c.priceG > priceGMax) return false;
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(query);
      const matchItem = c.items?.some(i => 
        i.name.toLowerCase().includes(query) || i.weapon.toLowerCase().includes(query)
      );
      return matchName || matchItem;
    }
    return true;
  };

  const filteredCarnivalCases = useMemo(() => {
    return CARNIVAL_CASES.filter(filterCase);
  }, [selectedGame, priceGMax, searchQuery]);

  const filteredCommunityCases = useMemo(() => {
    return COMMUNITY_CASES.filter(filterCase);
  }, [selectedGame, priceGMax, searchQuery]);

  const handleResetFilters = () => {
    sound.playClick();
    setSearchQuery('');
    setPriceGMax(99999);
    setSelectedGame('all');
  };

  const handleOpenCase = (caseItem) => {
    if (!user) {
      setIsAuthModalOpen(true);
    } else {
      setActiveOpeningCase(caseItem);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0d14] text-gray-100 selection:bg-[#f59e0b] selection:text-black">
      
      {/* ── TOP LIVE DROPS BAR (Screenshot 1 & 2) ─────────────────────────── */}
      <LiveDropsTicker onSelectItem={(item) => {
        sound.playClick();
        setPreviewDropItem(item);
      }} />

      {/* ── MAIN & SUB NAVBAR (Screenshot 1) ──────────────────────────────── */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedGame={selectedGame}
        setSelectedGame={setSelectedGame}
        onOpenBonus={() => setIsDailyBonusOpen(true)}
        onOpenInfo={(initialTab) => setInfoModalTab(initialTab)}
      />

      {/* ── MAIN BODY CONTENT ──────────────────────────────────────────────── */}
      <main className="flex-1">
        
        {/* CASES VIEW */}
        {activeTab === 'cases' && (
          <>
            {/* CARNIVAL OF MADNESS HERO BANNER (Screenshot 1) */}
            <HeroBanner
              onSelectGame={(game) => setSelectedGame(game)}
              onOpenBonus={() => setIsDailyBonusOpen(true)}
              onScrollToCases={() => {
                const el = document.getElementById('carnival-cases-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
              
              {/* Not Logged In Banner reminder */}
              {!user && (
                <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#111624] to-[#111624] border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{t('loginBannerTitle')}</h4>
                      <p className="text-xs text-gray-400">
                        {t('loginBannerSub')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={loginWithDemo}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-amber-400 text-black text-xs font-black shadow-lg shadow-amber-500/20 transition transform active:scale-95"
                    >
                      {t('oneClickDemo')}
                    </button>
                    <button
                      onClick={() => {
                        setAuthMode('login');
                        setIsAuthModalOpen(true);
                      }}
                      className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#161b2b] hover:bg-[#1d2338] text-white text-xs font-bold border border-[#242c44] transition"
                    >
                      {t('enterLogin')}
                    </button>
                  </div>
                </div>
              )}

              {/* ── SECTION 1: CARNIVAL OF MADNESS CASES (Screenshots 2 & 3) ──── */}
              <section id="carnival-cases-section" className="mb-12 scroll-mt-24">
                <div className="flex items-center justify-between pb-4 border-b border-[#1b2133] mb-6">
                  
                  {/* Title & Badge */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#2e1d14] border border-[#f59e0b]/40 flex items-center justify-center text-[#f59e0b]">
                      <Flame className="w-5 h-5 fill-[#f59e0b]" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider flex items-center gap-2">
                        <span>{t('carnivalTitle')}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30">
                          {t('limitedEvent')}
                        </span>
                      </h2>
                      <p className="text-xs text-gray-400">
                        {t('carnivalSub')}
                      </p>
                    </div>
                  </div>

                  {/* Collapse / Expand Button (Screenshot 2) */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      setIsCarnivalCollapsed(!isCarnivalCollapsed);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#151926] hover:bg-[#1d2335] text-xs font-bold text-gray-300 border border-[#232a3e] transition"
                  >
                    <span>{isCarnivalCollapsed ? t('expand') : t('collapse')}</span>
                    {isCarnivalCollapsed ? (
                      <ChevronDown className="w-3.5 h-3.5 text-[#f59e0b]" />
                    ) : (
                      <ChevronUp className="w-3.5 h-3.5 text-[#f59e0b]" />
                    )}
                  </button>

                </div>

                {/* 12 Carnival Cases Grid (Screenshots 2 & 3) */}
                {!isCarnivalCollapsed && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredCarnivalCases.map((caseItem) => (
                      <CaseCard
                        key={caseItem.id}
                        caseData={caseItem}
                        onOpen={handleOpenCase}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* ── SECTION 2: СЕРИЯ 7 КЛЮЧЕЙ CS2 & PUBG (Screenshot 4) ──────── */}
              <FreeKeysSection />

              {/* ── SECTION 3: COMMUNITY & PUBG CASES WITH TOOLBAR (Screenshots 3, 4, 5) ─ */}
              <section className="mt-12">
                
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#1b2133] mb-8">
                  
                  {/* Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#151926] border border-[#242c42] flex items-center justify-center text-[#f59e0b]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-lg font-black text-white uppercase tracking-wider">
                        {t('communityTitle')}
                      </h2>
                      <p className="text-xs text-gray-400">
                        {t('communitySub')}
                      </p>
                    </div>
                  </div>

                  {/* Filter Toolbar (Screenshots 3 & 4) */}
                  <div className="flex flex-wrap items-center gap-3">
                    
                    {/* Game Filter Pills */}
                    <div className="flex items-center gap-1 bg-[#101420] p-1 rounded-xl border border-[#1b2234]">
                      <button
                        onClick={() => {
                          sound.playClick();
                          setSelectedGame('all');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                          selectedGame === 'all'
                            ? 'bg-[#f59e0b] text-black shadow'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {t('all')} ({COMMUNITY_CASES.length})
                      </button>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setSelectedGame('cs2');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                          selectedGame === 'cs2'
                            ? 'bg-[#f59e0b] text-black shadow'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        CS2
                      </button>
                      <button
                        onClick={() => {
                          sound.playClick();
                          setSelectedGame('pubg');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                          selectedGame === 'pubg'
                            ? 'bg-orange-500 text-black shadow'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        PUBG
                      </button>
                    </div>

                    {/* Search Input "НАЗВАНИЕ" (Screenshots 3 & 4) */}
                    <div className="relative w-44 sm:w-56">
                      <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#101420] border border-[#1b2234] focus:border-[#f59e0b] rounded-xl py-2 pl-9 pr-3 text-xs uppercase font-bold text-white placeholder-gray-500 focus:outline-none transition"
                      />
                    </div>

                    {/* Price Range Slider G 0 — G 99999 (Screenshots 3 & 4) */}
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#101420] border border-[#1b2234] rounded-xl text-xs font-bold text-gray-400">
                      <span className="text-[#10b981] font-black">G 0</span>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="10"
                        value={priceGMax === 99999 ? 2000 : priceGMax}
                        onChange={(e) => setPriceGMax(Number(e.target.value))}
                        className="w-24 sm:w-32 accent-[#10b981] cursor-pointer"
                      />
                      <span className="text-gray-300 font-black">
                        G {priceGMax === 99999 ? 'MAX' : priceGMax}
                      </span>
                    </div>

                    {/* Reset Button "ОЧИСТИТЬ" (Screenshots 3 & 4) */}
                    <button
                      onClick={handleResetFilters}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#161a27] hover:bg-[#1f2538] text-xs font-bold text-gray-300 hover:text-white border border-[#232b3e] transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-gray-400" />
                      <span>{t('clearFilters')}</span>
                    </button>

                  </div>

                </div>

                {/* Cases Grid (Screenshots 4 & 5) */}
                {filteredCommunityCases.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {filteredCommunityCases.map((caseItem) => (
                      <CaseCard
                        key={caseItem.id}
                        caseData={caseItem}
                        onOpen={handleOpenCase}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-500">
                    <p className="text-sm font-bold">{t('noCasesFound')}</p>
                    <button
                      onClick={handleResetFilters}
                      className="mt-3 px-4 py-2 rounded-xl bg-[#f59e0b] text-black font-black text-xs"
                    >
                      {t('resetFilters')}
                    </button>
                  </div>
                )}

              </section>

            </div>
          </>
        )}

        {/* SKIN UPGRADER VIEW */}
        {activeTab === 'upgrader' && <SkinUpgrader />}

        {/* FAIR PLAY / PROVABLY FAIR VIEW */}
        {activeTab === 'fairplay' && <FairPlayView />}

      </main>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <Footer
        onSelectGame={(game) => {
          setSelectedGame(game);
          setActiveTab('cases');
        }}
        onSelectTab={(tab) => setActiveTab(tab)}
        onOpenInfo={(initialTab) => setInfoModalTab(initialTab)}
      />

      {/* ── GLOBAL MODALS ─────────────────────────────────────────────────── */}
      <AuthModal />
      <DepositModal />
      <InventoryModal />
      <DailyBonusModal
        isOpen={isDailyBonusOpen}
        onClose={() => setIsDailyBonusOpen(false)}
      />

      {/* Info, FAQ & Partnership Modal */}
      <InfoModal
        isOpen={!!infoModalTab}
        initialTab={infoModalTab || 'faq'}
        onClose={() => setInfoModalTab(null)}
      />

      {/* Live Drop Interactive Preview Modal */}
      <LiveDropPreviewModal
        dropItem={previewDropItem}
        isOpen={!!previewDropItem}
        onClose={() => setPreviewDropItem(null)}
        onOpenCase={(caseItem) => {
          setActiveTab('cases');
          handleOpenCase(caseItem);
        }}
      />

      {/* Case Battle Minigame Modal */}
      <CaseBattleModal
        isOpen={activeTab === 'battle'}
        onClose={() => setActiveTab('cases')}
      />

      {/* Contracts Trade-Up Modal */}
      <ContractsModal
        isOpen={activeTab === 'contracts'}
        onClose={() => setActiveTab('cases')}
      />

      {/* Crash Rocket X100 Minigame Modal */}
      <CrashGameModal
        isOpen={activeTab === 'crash'}
        onClose={() => setActiveTab('cases')}
      />

      {/* Promo & Giveaways Modal */}
      <PromoGiveawayModal
        isOpen={activeTab === 'promo'}
        onClose={() => setActiveTab('cases')}
      />

      {/* Active Case Opening Roulette Modal */}
      {activeOpeningCase && (
        <CaseOpeningModal
          caseData={activeOpeningCase}
          onClose={() => setActiveOpeningCase(null)}
        />
      )}

      {/* Floating Quick-Access Inventory Button */}
      <button
        onClick={() => {
          sound.playClick();
          if (!user) {
            setIsAuthModalOpen(true);
          } else {
            setIsInventoryOpen(true);
          }
        }}
        className="shine-sweep gold-glow-breath fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#ea580c] via-[#f59e0b] to-[#ea580c] hover:from-[#f59e0b] text-black font-black text-xs sm:text-sm shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95 transition transform border border-amber-300 group cursor-pointer"
        title="Inventarni ochish"
      >
        <Package className="w-5 h-5 fill-black group-hover:rotate-12 transition transform" />
        <span className="tracking-wide">{t('inventory').toUpperCase()}</span>
        {user && inventory.length > 0 && (
          <span className="px-2 py-0.5 rounded-full text-xs font-black bg-black text-[#f59e0b] shadow">
            {inventory.length}
          </span>
        )}
      </button>

    </div>
  );
}

export default App;
