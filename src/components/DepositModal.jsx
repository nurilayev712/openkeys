import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { X, CreditCard, Check, Sparkles, ShieldCheck, ArrowRight, Tag } from 'lucide-react';

const PAYMENT_METHODS = [
  { id: 'click', name: 'Click Up', badge: '0% Komissiya', color: 'from-blue-600 to-cyan-600' },
  { id: 'payme', name: 'Payme', badge: 'Tezkor', color: 'from-teal-600 to-emerald-600' },
  { id: 'uzum', name: 'Uzum Bank', badge: 'Keshbek 3%', color: 'from-purple-600 to-indigo-600' },
  { id: 'card', name: 'Visa / Humo / Uzcard', badge: 'Barcha kartalar', color: 'from-amber-600 to-yellow-600' },
  { id: 'crypto', name: 'USDT (TRC-20) / Crypto', badge: 'Anonim', color: 'from-green-600 to-teal-700' }
];

const PRESET_AMOUNTS = [
  { amount: 50000, bonus: 0 },
  { amount: 100000, bonus: 5 },
  { amount: 250000, bonus: 10 },
  { amount: 500000, bonus: 15 },
  { amount: 1000000, bonus: 20 }
];

export const DepositModal = () => {
  const { isDepositOpen, setIsDepositOpen, deposit } = useAuth();
  const { language, t } = useLanguage();
  const [selectedMethod, setSelectedMethod] = useState('click');
  const [amount, setAmount] = useState(100000);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isDepositOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().length > 2) {
      sound.playCoins();
      setPromoApplied(true);
    }
  };

  const handleDeposit = () => {
    let finalAmount = Number(amount);
    if (promoApplied) {
      finalAmount += Math.floor(finalAmount * 0.20); // +20% promo bonus
    }
    deposit(finalAmount);
    setSuccessMsg(
      language === 'UZ' 
        ? `${finalAmount.toLocaleString('uz-UZ')} so'm muvaffaqiyatli hisobingizga qo'shildi!`
        : language === 'EN'
        ? `Successfully credited ${finalAmount.toLocaleString('uz-UZ')} UZS (${Math.floor(finalAmount / 1000)} G) to your balance!`
        : `${finalAmount.toLocaleString('ru-RU')} сум (${Math.floor(finalAmount / 1000)} G) успешно зачислены на ваш баланс!`
    );
    
    setTimeout(() => {
      setSuccessMsg('');
      setIsDepositOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0e111a] border border-[#222a40] rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            setIsDepositOpen(false);
          }}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg bg-[#161a28] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {language === 'UZ' ? "TEZKOR HISOB TO'LDIRISH" : language === 'EN' ? "FAST INSTANT DEPOSIT" : "МГНОВЕННОЕ ПОПОЛНЕНИЕ"}
          </div>
          <h2 className="text-2xl font-black text-white font-gaming">
            {language === 'UZ' ? "BALANSGA PUL KIRITISH" : language === 'EN' ? "TOP UP BALANCE" : "ПОПОЛНЕНИЕ БАЛАНСА"}
          </h2>
          <p className="text-xs text-gray-400">
            {language === 'UZ' 
              ? "To'lov tizimini tanlang va orzuingizdagi keyslarni oching"
              : language === 'EN'
              ? "Choose your payment method and open your dream cases"
              : "Выберите удобный способ оплаты и открывайте любимые кейсы"}
          </p>
        </div>

        {successMsg ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">
              {language === 'UZ' ? "To'lov qabul qilindi!" : language === 'EN' ? "Payment Received!" : "Оплата принята!"}
            </h4>
            <p className="text-xs text-emerald-400 font-semibold">{successMsg}</p>
          </div>
        ) : (
          <div className="space-y-4">
            
            {/* Payment Methods */}
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">
                {language === 'UZ' ? "TO'LOV USULINI TANLANG:" : language === 'EN' ? "SELECT PAYMENT METHOD:" : "ВЫБЕРИТЕ СПОСОБ ОПЛАТЫ:"}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedMethod(pm.id);
                    }}
                    className={`p-3 rounded-xl text-left border transition ${
                      selectedMethod === pm.id
                        ? 'bg-[#1b2030] border-[#f59e0b] shadow-md'
                        : 'bg-[#121624] border-[#1e2538] hover:border-gray-600'
                    }`}
                  >
                    <div className="text-xs font-bold text-white truncate">{pm.name}</div>
                    <div className="text-[10px] text-emerald-400 font-medium">{pm.badge}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Presets */}
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-2">
                {language === 'UZ' ? "MIQDORNI TANLANG (SO'M / G):" : language === 'EN' ? "CHOOSE AMOUNT (UZS / G):" : "ВЫБЕРИТЕ СУММУ (СУМ / G):"}
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {PRESET_AMOUNTS.map((item) => (
                  <button
                    key={item.amount}
                    onClick={() => {
                      sound.playClick();
                      setAmount(item.amount);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-black transition border ${
                      amount === item.amount
                        ? 'bg-[#f59e0b] text-black border-amber-400 shadow-sm'
                        : 'bg-[#121624] text-gray-300 border-[#1e2538] hover:border-gray-600'
                    }`}
                  >
                    <div>{item.amount.toLocaleString('uz-UZ')} UZS</div>
                    <div className="text-[10px] opacity-90">{Math.floor(item.amount / 1000)} G</div>
                    {item.bonus > 0 && (
                      <div className="text-[9px] font-black text-emerald-400">
                        +{item.bonus}% bonus
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom input */}
              <input
                type="number"
                min="10000"
                step="5000"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-full bg-[#0a0d14] border border-[#1e2538] rounded-xl px-4 py-2.5 text-sm font-bold text-white focus:border-[#f59e0b] focus:outline-none"
                placeholder={language === 'UZ' ? "Boshqa miqdor kiriting..." : language === 'EN' ? "Enter custom amount..." : "Введите другую сумму..."}
              />
            </div>

            {/* Promo Code */}
            <div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={language === 'UZ' ? "Promokod (masalan: OPENKEYS)" : language === 'EN' ? "Promo code (e.g. OPENKEYS)" : "Промокод (например: OPENKEYS)"}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  disabled={promoApplied}
                  className="flex-1 bg-[#0a0d14] border border-[#1e2538] rounded-xl px-4 py-2 text-xs text-white uppercase focus:border-[#f59e0b] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                  className="px-4 py-2 bg-[#1b2030] hover:bg-[#252c42] text-[#f59e0b] text-xs font-bold rounded-xl border border-[#232b40] transition"
                >
                  {promoApplied 
                    ? (language === 'UZ' ? "Qo'llandi!" : language === 'EN' ? "Applied!" : "Применен!")
                    : (language === 'UZ' ? "Qo'llash" : language === 'EN' ? "Apply" : "Применить")}
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-emerald-400 font-bold mt-1">
                  {language === 'UZ' ? "Promokod faollashtirildi: +20% qo'shimcha sovg'a!" : language === 'EN' ? "Promo active: +20% extra deposit bonus!" : "Промокод активирован: +20% бонус к пополнению!"}
                </p>
              )}
            </div>

            {/* CTA Deposit Button */}
            <button
              onClick={handleDeposit}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-black font-black text-sm tracking-wide shadow-lg shadow-emerald-500/20 transition active:scale-98"
            >
              {language === 'UZ' 
                ? `HISOBNI TO'LDIRISH (${amount.toLocaleString('uz-UZ')} SO'M · ${Math.floor(amount / 1000)} G)`
                : language === 'EN'
                ? `TOP UP BALANCE (${amount.toLocaleString('uz-UZ')} UZS · ${Math.floor(amount / 1000)} G)`
                : `ПОПОЛНИТЬ БАЛАНС (${amount.toLocaleString('ru-RU')} СУМ · ${Math.floor(amount / 1000)} G)`}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-2 border-t border-[#1e2538]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{language === 'UZ' ? "To'lovlar to'g'ridan-to'g'ri va xavfsiz amalga oshiriladi" : language === 'EN' ? "Payments are processed securely via SSL" : "Платежи защищены и обрабатываются мгновенно"}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
