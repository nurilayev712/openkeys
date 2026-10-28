import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { RARITY_CONFIG } from '../data/cases';
import { SkinImage } from './SkinImage';
import { SteamWithdrawModal } from './SteamWithdrawModal';
import { 
  X, 
  Package, 
  Coins, 
  Send, 
  Sparkles, 
  Check, 
  ExternalLink 
} from 'lucide-react';

export const InventoryModal = () => {
  const { 
    inventory, 
    isInventoryOpen, 
    setIsInventoryOpen, 
    sellItem, 
    sellAllItems,
    removeFromInventory
  } = useAuth();

  const { t } = useLanguage();

  const [filterGame, setFilterGame] = useState('all');
  const [selectedWithdrawItem, setSelectedWithdrawItem] = useState(null);

  if (!isInventoryOpen) return null;

  const filteredItems = inventory.filter(item => {
    if (filterGame === 'all') return true;
    return item.game === filterGame;
  });

  const totalValue = inventory.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  const handleWithdraw = (item) => {
    sound.playClick();
    setSelectedWithdrawItem(item);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0e111a] border border-[#222a40] rounded-2xl shadow-2xl p-5 sm:p-8 my-auto overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            setIsInventoryOpen(false);
          }}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1.5 rounded-lg bg-[#161a28] hover:bg-[#20273c] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1b2234]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-1">
              <Package className="w-3.5 h-3.5" />
              <span>{t('userInventory')}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-gaming">
              {t('wonSkins')} ({inventory.length})
            </h2>
            <p className="text-xs text-gray-400">
              {t('totalValue')} <span className="font-extrabold text-[#f59e0b] font-gaming">{totalValue.toLocaleString('uz-UZ')} UZS ({Math.floor(totalValue / 1000)} G)</span>
            </p>
          </div>

          {/* Quick sell all button */}
          {inventory.length > 0 && (
            <button
              onClick={() => {
                sellAllItems();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 text-black text-xs font-black shadow-lg transition active:scale-95"
            >
              <Coins className="w-4 h-4" />
              <span>{t('sellAll')} (+{totalValue.toLocaleString('uz-UZ')} UZS)</span>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 my-4">
          <button
            onClick={() => {
              sound.playClick();
              setFilterGame('all');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterGame === 'all'
                ? 'bg-[#f59e0b] text-black shadow'
                : 'bg-[#151926] text-gray-400 hover:text-white border border-[#222a3e]'
            }`}
          >
            {t('all')} ({inventory.length})
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setFilterGame('cs2');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterGame === 'cs2'
                ? 'bg-[#f59e0b] text-black shadow'
                : 'bg-[#151926] text-gray-400 hover:text-white border border-[#222a3e]'
            }`}
          >
            CS 2 ({inventory.filter(i => i.game === 'cs2').length})
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setFilterGame('pubg');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              filterGame === 'pubg'
                ? 'bg-[#f59e0b] text-black shadow'
                : 'bg-[#151926] text-gray-400 hover:text-white border border-[#222a3e]'
            }`}
          >
            PUBG ({inventory.filter(i => i.game === 'pubg').length})
          </button>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-14 text-center">
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-gray-300">{t('emptyInventoryTitle')}</h4>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              {t('emptyInventorySub')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[460px] overflow-y-auto pr-1">
            {filteredItems.map((item) => {
              const rarity = RARITY_CONFIG[item.rarity] || RARITY_CONFIG.milspec;

              return (
                <div
                  key={item.dropId}
                  className="relative flex flex-col justify-between p-3 rounded-xl bg-[#111522] border border-[#1b2234] hover:border-[#2b3550] transition"
                  style={{ borderBottomColor: rarity.color, borderBottomWidth: '3px' }}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-gray-400 truncate max-w-[70px]">{item.fromCase || 'Drop'}</span>
                    <span className={rarity.text}>{rarity.name}</span>
                  </div>

                  <div className="h-24 flex items-center justify-center my-2">
                    <SkinImage
                      src={item.image}
                      weapon={item.weapon}
                      name={item.name}
                      rarity={item.rarity}
                      className="max-h-full max-w-full object-contain filter drop-shadow"
                    />
                  </div>

                  <div>
                    <div className="text-[11px] font-bold text-gray-400 truncate">{item.weapon}</div>
                    <div className="text-xs font-black text-white truncate">{item.name}</div>
                    <div className="text-xs font-black text-[#f59e0b] mt-1 font-gaming">
                      {(Number(item.price) || 0).toLocaleString('uz-UZ')} UZS
                    </div>

                    {/* Actions */}
                    <div className="grid grid-cols-2 gap-1.5 mt-2.5">
                      <button
                        onClick={() => sellItem(item.dropId)}
                        title="Balansga sotish"
                        className="py-1.5 px-1 bg-[#161a28] hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 rounded-lg text-[10px] font-bold border border-emerald-500/30 transition text-center"
                      >
                        {t('sell')}
                      </button>

                      <button
                        onClick={() => handleWithdraw(item)}
                        title="Steamga chiqarib olish"
                        className="py-1.5 px-1 bg-[#161a28] hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-lg text-[10px] font-bold border border-blue-500/30 transition text-center"
                      >
                        {t('withdraw')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Dedicated Steam Withdraw Modal */}
        <SteamWithdrawModal
          item={selectedWithdrawItem}
          isOpen={Boolean(selectedWithdrawItem)}
          onClose={() => setSelectedWithdrawItem(null)}
          onWithdrawn={(dropId) => {
            removeFromInventory(dropId);
            setSelectedWithdrawItem(null);
          }}
        />

      </div>
    </div>
  );
};
