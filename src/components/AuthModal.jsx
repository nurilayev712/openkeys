import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/sound';
import { X, ShieldCheck, Lock, Mail, User, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authMode,
    setAuthMode,
    login,
    signup,
    loginWithSteam,
    loginWithDemo
  } = useAuth();

  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    username: '',
    emailOrUsername: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (authMode === 'login') {
      if (!formData.emailOrUsername || !formData.password) {
        setError(language === 'UZ' ? "Iltimos, barcha maydonlarni to'ldiring!" : language === 'EN' ? "Please fill in all fields!" : "Пожалуйста, заполните все поля!");
        return;
      }
      login(formData.emailOrUsername, formData.password);
    } else {
      if (!formData.username || !formData.email || !formData.password) {
        setError(language === 'UZ' ? "Iltimos, barcha maydonlarni to'ldiring!" : language === 'EN' ? "Please fill in all fields!" : "Пожалуйста, заполните все поля!");
        return;
      }
      signup(formData.username, formData.email, formData.password);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#0e111a] border border-[#222a40] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
        style={{
          boxShadow: '0 0 50px rgba(0,0,0,0.8), 0 0 30px rgba(245, 158, 11, 0.15)'
        }}
      >
        {/* Background glow accents */}
        <div className="absolute -top-20 -left-20 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            setIsAuthModalOpen(false);
          }}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-1 rounded-lg bg-[#161a28] hover:bg-[#20273a] transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPENKEYS {language === 'UZ' ? 'AVTORIZATSIYA' : language === 'EN' ? 'AUTHORIZATION' : 'АВТОРИЗАЦИЯ'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-gaming">
            {authMode === 'login' 
              ? (language === 'UZ' ? 'AKKAUNTGA KIRISH' : language === 'EN' ? 'SIGN IN' : 'ВХОД В АККАУНТ')
              : (language === 'UZ' ? "RO'YXATDAN O'TISH" : language === 'EN' ? 'REGISTRATION' : 'РЕГИСТРАЦИЯ')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {authMode === 'login'
              ? (language === 'UZ' ? 'CS2 va PUBG keyslarini ochish uchun tizimga kiring' : language === 'EN' ? 'Sign in to open CS2 and PUBG cases' : 'Войдите на сайт для открытия кейсов CS2 и PUBG')
              : (language === 'UZ' ? "Yangi akkaunt oching va 300,000 so'm xush kelibsiz bonusini oling!" : language === 'EN' ? 'Create an account and get 300,000 UZS welcome balance!' : 'Создайте аккаунт и получите 300,000 сум бонуса!')}
          </p>
        </div>

        {/* Instant 1-Click Fast Auth (Best for instant testing) */}
        <div className="space-y-2.5 mb-5">
          <button
            onClick={loginWithDemo}
            type="button"
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 text-black shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5 active:translate-y-0 transition duration-150"
          >
            <Flame className="w-4 h-4 fill-black" />
            <span>
              {language === 'UZ' 
                ? "1-CLICK DEMO KIRISH (1,000,000 SO'M / 1,000 G)"
                : language === 'EN'
                ? "1-CLICK DEMO LOGIN (1,000,000 UZS / 1,000 G)"
                : "ДЕМО ВХОД В 1 КЛИК (1 000 000 СУМ / 1 000 G)"}
            </span>
          </button>

          <button
            onClick={loginWithSteam}
            type="button"
            className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-[#171d25] hover:bg-[#222b37] border border-blue-500/30 text-white transition duration-150"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 0 0-10 10c0 4.7 3.2 8.6 7.6 9.7l2.8-4.1a3 3 0 0 1-.4-.6l-3.3 1.4a4.4 4.4 0 0 1-.3-1.6c0-2.4 2-4.4 4.4-4.4.4 0 .8 0 1.2.2l2.3-3.4A5 5 0 0 1 12 7c2.8 0 5 2.2 5 5s-2.2 5-5 5c-.4 0-.8 0-1.2-.2l-2.4 3.5a10 10 0 0 0 3.6.7 10 10 0 0 0 10-10A10 10 0 0 0 12 2z"/>
            </svg>
            <span>{language === 'UZ' ? "Steam orqali tezkor kirish" : language === 'EN' ? "Fast login via Steam" : "Быстрый вход через Steam"}</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-[#1e2538]"></div>
          <span className="flex-shrink mx-3 text-xs text-gray-500 uppercase font-medium">
            {language === 'UZ' ? "yoki login orqali" : language === 'EN' ? "or via email" : "или через логин"}
          </span>
          <div className="flex-grow border-t border-[#1e2538]"></div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex p-1 bg-[#0a0d14] rounded-xl mb-4 border border-[#1e2538]">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setAuthMode('login');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              authMode === 'login'
                ? 'bg-[#1b2030] text-[#f59e0b] shadow-md border border-[#f59e0b]/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {language === 'UZ' ? "Kirish (Sign In)" : language === 'EN' ? "Sign In" : "Войти"}
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setAuthMode('signup');
              setError('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              authMode === 'signup'
                ? 'bg-[#1b2030] text-[#f59e0b] shadow-md border border-[#f59e0b]/40'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {language === 'UZ' ? "Ro'yxatdan o'tish" : language === 'EN' ? "Sign Up" : "Регистрация"}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-2.5 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authMode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                {language === 'UZ' ? "Foydalanuvchi nomi" : language === 'EN' ? "Username" : "Имя пользователя"}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="CyberSniper"
                  value={formData.username}
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-[#0a0d14] border border-[#1e2538] focus:border-[#f59e0b] focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-600 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              {authMode === 'login' 
                ? (language === 'UZ' ? 'Email yoki Login' : language === 'EN' ? 'Email or Username' : 'Email или Логин')
                : 'Email'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type={authMode === 'login' ? 'text' : 'email'}
                placeholder={authMode === 'login' ? 'demo@openkeys.uz' : 'player@openkeys.uz'}
                value={authMode === 'login' ? formData.emailOrUsername : formData.email}
                onChange={e =>
                  authMode === 'login'
                    ? setFormData({ ...formData, emailOrUsername: e.target.value })
                    : setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-[#0a0d14] border border-[#1e2538] focus:border-[#f59e0b] focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-600 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">
              {language === 'UZ' ? "Parol" : language === 'EN' ? "Password" : "Пароль"}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#0a0d14] border border-[#1e2538] focus:border-[#f59e0b] focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-gray-600 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black shadow-lg shadow-amber-500/25 transition duration-150"
          >
            {authMode === 'login' 
              ? (language === 'UZ' ? "KIRISH VA O'YINNI BOSHLASH" : language === 'EN' ? "SIGN IN & PLAY" : "ВОЙТИ И ИГРАТЬ")
              : (language === 'UZ' ? "RO'YXATDAN O'TISH (300,000 SO'M BONUS)" : language === 'EN' ? "REGISTER (300,000 UZS BONUS)" : "ЗАРЕГИСТРИРОВАТЬСЯ (300 000 СУМ БОНУС)")}
          </button>
        </form>

        {/* Security badge */}
        <div className="mt-5 pt-4 border-t border-[#1e2538] flex items-center justify-center gap-2 text-[11px] text-gray-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>256-bit SSL {language === 'UZ' ? "xavfsizlik va Provably Fair himoyasi" : language === 'EN' ? "security & Provably Fair" : "безопасность и Provably Fair"}</span>
        </div>
      </div>
    </div>
  );
};
