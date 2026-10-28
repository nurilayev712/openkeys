import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { 
  X, 
  HelpCircle, 
  BookOpen, 
  Handshake, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Flame, 
  Sparkles,
  Send
} from 'lucide-react';

export const InfoModal = ({ isOpen, initialTab = 'faq', onClose }) => {
  const { language, t } = useLanguage();
  const [tab, setTab] = useState(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#0e111a] border border-[#222a40] rounded-2xl shadow-2xl overflow-hidden p-6 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1.5 rounded-lg bg-[#161a28] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab Headers */}
        <div className="flex items-center gap-2 pb-4 border-b border-[#1b2234]">
          <button
            onClick={() => { sound.playClick(); setTab('faq'); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition ${
              tab === 'faq'
                ? 'bg-[#f59e0b] text-black shadow'
                : 'bg-[#151926] text-gray-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setTab('wiki'); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition ${
              tab === 'wiki'
                ? 'bg-[#f59e0b] text-black shadow'
                : 'bg-[#151926] text-gray-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>WIKI CS2</span>
          </button>

          <button
            onClick={() => { sound.playClick(); setTab('partnership'); }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black transition ${
              tab === 'partnership'
                ? 'bg-[#f59e0b] text-black shadow'
                : 'bg-[#151926] text-gray-400 hover:text-white'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>{t('partnership')}</span>
          </button>
        </div>

        {/* Content Container */}
        <div className="overflow-y-auto pr-1 py-4 space-y-4 flex-1 text-xs text-gray-300">
          
          {/* FAQ TAB */}
          {tab === 'faq' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-[#121624] border border-[#1e2538] space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{language === 'UZ' ? "Yutib olingan skinni Steam akkauntimga qanday chiqaraman?" : language === 'EN' ? "How do I withdraw won skins to my Steam account?" : "Как вывести выигранный скин на свой Steam аккаунт?"}</span>
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {language === 'UZ' 
                    ? "Inventaringizga kiring, yutilgan skin ustidagi 'Yechish' (Steam) tugmasini bosing va Steam Trade URL havolangizni kiriting. Bizning avtomatlashtirilgan botimiz 1-2 daqiqada sizga Trade Offer jo'natadi."
                    : language === 'EN'
                    ? "Open your inventory, click 'Withdraw' on your skin, and paste your Steam Trade URL. Our automated bot dispatches a trade offer within 1-2 minutes."
                    : "Перейдите в Инвентарь, нажмите 'Вывести' у нужного скина и укажите свой Steam Trade URL. Наш автоматический бот отправит трейд-оффер в течение 1-2 минут."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#121624] border border-[#1e2538] space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{language === 'UZ' ? "Qanday to'lov usullari orqali hisobni to'ldirish mumkin?" : language === 'EN' ? "What payment methods are supported?" : "Какие способы пополнения доступны?"}</span>
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {language === 'UZ' 
                    ? "Click Up, Payme, Uzum Bank, Visa/Humo/Uzcard hamda USDT (TRC-20) / Kriptovalyuta orqali tezkor va 0% komissiya bilan to'ldirish mumkin."
                    : language === 'EN'
                    ? "Click Up, Payme, Uzum Bank, Visa/Mastercard/Uzcard, and USDT (TRC-20) / Crypto with 0% commission."
                    : "Click Up, Payme, Uzum Bank, Visa/Humo/Uzcard и USDT (TRC-20) / Криптовалюта с 0% комиссии."}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#121624] border border-[#1e2538] space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{language === 'UZ' ? "Provably Fair (Halollik kafolati) nima?" : language === 'EN' ? "What is Provably Fair?" : "Что такое Provably Fair (Честная игра)?"}</span>
                </h4>
                <p className="text-gray-400 leading-relaxed">
                  {language === 'UZ' 
                    ? "Har bir tushadigan skin SHA-256 xeshi yordamida spin boshlanishidan oldin aniqlanadi. Natijani hech kim o'zgartira olmaydi va buni mustaqil xesh kalkulyatori orqali tekshirish mumkin."
                    : language === 'EN'
                    ? "Every drop outcome is calculated via SHA-256 cryptography prior to spin initiation. It is tamper-proof and verifiable."
                    : "Результат каждого спина рассчитывается до запуска через SHA-256 хеширование. Никто не может повлиять на результат, его можно проверить независимо."}
                </p>
              </div>
            </div>
          )}

          {/* WIKI CS2 TAB */}
          {tab === 'wiki' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-xl bg-[#121624] border border-[#1e2538] space-y-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#f59e0b]" />
                  <span>CS2 Skin Sifatlari (Rarities)</span>
                </h4>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-center justify-between p-2 rounded-lg bg-[#0a0d14]">
                    <span className="font-bold text-yellow-400">Extraordinary / Special (★)</span>
                    <span className="text-gray-400">Pichoqlar (Karambit, Butterfly, M9)</span>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg bg-[#0a0d14]">
                    <span className="font-bold text-red-500">Covert (Тайное)</span>
                    <span className="text-gray-400">AWP Dragon Lore, M4A4 Howl, AK-47 Wild Lotus</span>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg bg-[#0a0d14]">
                    <span className="font-bold text-pink-500">Classified (Засекреченное)</span>
                    <span className="text-gray-400">AK-47 Vulcan, Printstream, Asiimov</span>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg bg-[#0a0d14]">
                    <span className="font-bold text-purple-400">Restricted (Запрещенное)</span>
                    <span className="text-gray-400">Glock Water Elemental, M4A1-S Decimator</span>
                  </li>
                  <li className="flex items-center justify-between p-2 rounded-lg bg-[#0a0d14]">
                    <span className="font-bold text-blue-400">Mil-Spec (Армейское)</span>
                    <span className="text-gray-400">AK-47 Elite Build, P250 Valence</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#121624] border border-[#1e2538] space-y-2">
                <h4 className="text-sm font-bold text-white">PUBG BATTLEGROUNDS Qurollari</h4>
                <p className="text-gray-400">
                  Platformamizda shuningdek PUBG o'yinining eng nodir progresseable va afsonaviy skinlari: <strong>M416 Glacier (Muzlik)</strong>, <strong>M416 The Fool</strong>, <strong>Beryl M762 Gear Head</strong> va boshqalar mavjud!
                </p>
              </div>
            </div>
          )}

          {/* PARTNERSHIP TAB */}
          {tab === 'partnership' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 via-[#121624] to-[#121624] border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-[#f59e0b] font-bold text-sm">
                  <Flame className="w-5 h-5 fill-[#f59e0b]" />
                  <span>STREAMER & BLOGGERLAR UCHUN HAMKORLIK</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  YouTube, Twitch, TikTok yoki Telegram kanaliga egamisiz? OpenKeys jamoasi kontent yaratuvchilar uchun eksklyuziv shartlarni taklif etadi:
                </p>
                <ul className="space-y-1.5 list-disc list-inside text-gray-300">
                  <li>Referal havolangiz orqali kirgan har bir o'yinchidan <strong>10% gacha sof daromad</strong>.</li>
                  <li>Obunachilaringiz uchun shaxsiy nomingizdagi <strong>Promokod (+25% bonus)</strong>.</li>
                  <li>Video va strimlar uchun <strong>bepul ochish balansi va sovg'a skinlar</strong>.</li>
                  <li>Kriptovalyuta yoki bank kartasiga 24/7 komissiyasiz yechib olish.</li>
                </ul>

                <div className="pt-2">
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#f59e0b] hover:bg-amber-400 text-black font-black text-xs transition"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegram Menejer: @openkeys_collab</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#1b2234] flex items-center justify-between text-[11px] text-gray-500">
          <span>OpenKeys Support — 24/7 onlayn</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#161a28] hover:bg-[#20273a] text-gray-300 font-bold transition"
          >
            {t('understood')}
          </button>
        </div>

      </div>
    </div>
  );
};
