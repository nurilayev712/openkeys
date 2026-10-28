import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  RU: {
    // Navigation
    logoSubtitle: 'КЕЙСЫ CS2 & PUBG',
    bonuses: 'БОНУСЫ',
    crash: 'Краш (Crash X100)',
    promo: 'Промо & Конкурсы',
    upgrade: 'Апгрейд',
    contracts: 'Контракты',
    battle: 'Кейс Батл',
    inventory: 'Инвентарь',
    login: 'ВОЙТИ',
    balance: 'Баланс',
    topUp: 'Пополнить',
    faq: 'FAQ',
    wiki: 'WIKI CS2',
    partnership: 'СОТРУДНИЧЕСТВО',
    all: 'ВСЕ',
    top: 'ТОП',
    logout: 'Выйти',

    // Hero
    prizePool: 'Призовой фонд',
    eventSubtitle: 'Ограниченная Хэллоуинская серия кейсов с повышенным шансом на ножи и секретные скины!',
    toEvent: 'К ИВЕНТУ',
    limitedEvent: 'ИВЕНТ',

    // Carnival Section
    carnivalTitle: 'КЕЙСЫ CS2: CARNIVAL OF MADNESS',
    carnivalSub: 'Эксклюзивные ивентовые кейсы с ножами и скинами тайного качества',
    collapse: 'СВЕРНУТЬ',
    expand: 'РАЗВЕРНУТЬ',

    // 7 Keys Series
    free7Title: 'СЕРИЯ 7 КЛЮЧЕЙ CS2 & PUBG',
    free7Sub: 'Кейсы кс го и пубг бесплатно каждый день',
    howItWorks: 'Как это работает?',
    freeRulesTitle: 'Правила получения бесплатных кейсов:',
    freeRule1: '1. Заходите на сайт каждый день и открывайте гарантированный бесплатный кейс серии.',
    freeRule2: '2. С каждым днем уровень сундука растет: от Каменного до Платинового (до 350 G)!',
    freeRule3: '3. Выигранные средства сразу поступают на ваш баланс для открытия любых кейсов.',

    // Toolbar & Community
    communityTitle: 'КЕЙСЫ CS2 & PUBG',
    communitySub: 'Популярные кейсы сообщества и официальные дропы PUBG',
    searchPlaceholder: 'НАЗВАНИЕ',
    clearFilters: 'ОЧИСТИТЬ',
    noCasesFound: 'По вашему запросу кейсы не найдены',
    resetFilters: 'Сбросить фильтры',

    // Inventory
    userInventory: 'ИНВЕНТАРЬ ПОЛЬЗОВАТЕЛЯ',
    wonSkins: 'ВЫИГРАННЫЕ СКИНЫ',
    totalValue: 'Общая стоимость:',
    sellAll: 'ПРОДАТЬ ВСЕ',
    sell: 'Продать',
    withdraw: 'Вывести',
    emptyInventoryTitle: 'Ваш инвентарь пуст',
    emptyInventorySub: 'Открывайте кейсы и выигрывайте лучшие скины CS2 и PUBG!',

    // Steam Withdraw
    withdrawHeader: 'ВЫВОД В STEAM (WITHDRAW)',
    withdrawSub: 'Получите выигранный скин на свой Steam аккаунт через Trade Offer',
    tradeUrlLabel: 'Ваша ссылка на обмен (Steam Trade URL):',
    findTradeUrl: 'Где взять Trade URL?',
    demoPaste: 'Вставить тестовый Trade URL',
    sendToSteam: 'ВЫВЕСТИ В STEAM (ОТПРАВИТЬ)',
    tradeOfferSent: 'TRADE OFFER ОТПРАВЛЕН!',
    tradeInstructions: 'Инструкция по принятию:',
    step1: '1. Откройте приложение Steam на смартфоне или ПК.',
    step2: '2. Перейдите в раздел "Предложения обмена".',
    step3: '3. Примите обмен от нашего бота и скин окажется в игре!',
    understood: 'ПОНЯТНО (ЗАКРЫТЬ)',

    // Case Opening
    openCase: 'ОТКРЫТЬ',
    fastOpen: 'Быстрое открытие (Fast)',
    opening: 'ОТКРЫВАЕТСЯ...',
    viewInventory: 'В инвентарь',
    saveSkin: 'Сохранить',
    openAgain: 'Открыть снова',
    odds: 'Шансы (Odds)',
    viewReel: 'Рулетка',

    // Auth prompt banner
    loginBannerTitle: 'Войдите на сайт перед открытием кейсов!',
    loginBannerSub: 'Авторизуйтесь в 1 клик и получите 1 000 000 сум (1 000 G) на демо баланс.',
    oneClickDemo: '1-Click Demo (1M сум / 1,000 G)',
    enterLogin: 'Войти (Login)',

    // Promos & Crash
    crashTitle: 'CRASH ROCKET X100',
    crashSub: 'Успей забрать выигрыш до взрыва ракеты и умножь ставку до 100 раз!',
    betAmount: 'Размер ставки:',
    startFlight: 'ЗАПУСТИТЬ РАКЕТУ',
    cashOut: 'ЗАБРАТЬ ВЫИГРЫШ',
    promoModalTitle: 'ПРОМОКОДЫ И БЕСПЛАТНЫЕ КОНКУРСЫ',
    enterPromo: 'Ввести промокод',
    activate: 'АКТИВИРОВАТЬ',
    participateFree: 'УЧАСТВОВАТЬ (БЕСПЛАТНО)',
    youParticipate: 'ВЫ УЧАСТВУЕТЕ',
    participants: 'Участников:',
    history: 'История:'
  },

  UZ: {
    // Navigation
    logoSubtitle: 'CS2 VA PUBG KEYSLARI',
    bonuses: 'BONUSLAR',
    crash: 'Crash (X100 Raketa)',
    promo: 'Promo & Konkurslar',
    upgrade: 'Apgreyd',
    contracts: 'Shartnomalar',
    battle: 'Keys Batl',
    inventory: 'Inventar',
    login: 'KIRISH',
    balance: 'Balans',
    topUp: 'To\'ldirish',
    faq: 'FAQ',
    wiki: 'WIKI CS2',
    partnership: 'HAMKORLIK',
    all: 'HAMMASI',
    top: 'TOP',
    logout: 'Chiqish',

    // Hero
    prizePool: 'Yutuq fondi',
    eventSubtitle: 'Pichoqlar va maxfiy skinlar tushish ehtimoli oshirilgan cheklangan Xellouin keyslari seriyasi!',
    toEvent: 'KEYSGA O\'TISH',
    limitedEvent: 'IVENT',

    // Carnival Section
    carnivalTitle: 'CS2 KEYSLARI: CARNIVAL OF MADNESS',
    carnivalSub: 'Pichoqlar va maxfiy sifatli skinlarga ega eksklyuziv ivent keyslari',
    collapse: 'YOPISH',
    expand: 'OCHISH',

    // 7 Keys Series
    free7Title: '7 TA KALIT SERIYASI CS2 & PUBG',
    free7Sub: 'Har kuni bepul CS2 va PUBG keyslari',
    howItWorks: 'Qanday ishlaydi?',
    freeRulesTitle: 'Bepul keyslarni olish qoidalari:',
    freeRule1: '1. Har kuni saytga kiring va kafolatlangan bepul keysni oching.',
    freeRule2: '2. Har kuni sandiq darajasi oshib boradi: Tosh sandiqdan Platina sandiqgacha (350 G gacha)!',
    freeRule3: '3. Yutilgan mablag\'lar istalgan keyslarni ochish uchun darhol balansingizga tushadi.',

    // Toolbar & Community
    communityTitle: 'CS2 & PUBG KEYSLARI',
    communitySub: 'Ommabop komyuniti keyslari va PUBG rasmiy droplari',
    searchPlaceholder: 'QIDIRUV (NOMI)',
    clearFilters: 'TOZALASH',
    noCasesFound: 'Keltirilgan parametrlar bo\'yicha keys topilmadi',
    resetFilters: 'Filtrlarni tozalash',

    // Inventory
    userInventory: 'FOYDALANUVCHI INVENTARI',
    wonSkins: 'YUTIB OLINGAN SKINLAR',
    totalValue: 'Umumiy qiymati:',
    sellAll: 'HAMMASINI SOTISH',
    sell: 'Sotish',
    withdraw: 'Yechish',
    emptyInventoryTitle: 'Inventaringiz hali bo\'sh',
    emptyInventorySub: 'Keyslarni oching va ajoyib CS2 pichoqlari hamda PUBG afsonaviy skinlarini yutib oling!',

    // Steam Withdraw
    withdrawHeader: 'STEAM GA CHIQARIB OLISH (WITHDRAW)',
    withdrawSub: 'Yutib olingan skinni Steam akkauntingizga Trade Offer orqali qabul qiling',
    tradeUrlLabel: 'Steam Trade URL havolangiz:',
    findTradeUrl: 'Trade URL ni qayerdan olaman?',
    demoPaste: 'Namunani kiritish',
    sendToSteam: 'STEAM GA CHIQARIB OLISH (YUBORISH)',
    tradeOfferSent: 'TRADE OFFER YUBORILDI!',
    tradeInstructions: 'Qabul qilish ko\'rsatmasi:',
    step1: '1. Steam ilovasini (kompyuter yoki telefonda) oching.',
    step2: '2. "Trade Offers" (Takliflar) bo\'limiga kiring.',
    step3: '3. Bot jo\'natgan taklifni tasdiqlang va skin o\'yiningiz inventariga tushadi!',
    understood: 'TUSHUNDIM (YOPISH)',

    // Case Opening
    openCase: 'OCHISH',
    fastOpen: 'Tez ochish (Fast)',
    opening: 'OCHILMOQDA...',
    viewInventory: 'Inventarga o\'tish',
    saveSkin: 'Saqlash',
    openAgain: 'Yana ochish',
    odds: 'Ehtimolliklar (Odds)',
    viewReel: 'Ruletkani ko\'rish',

    // Auth prompt banner
    loginBannerTitle: 'Keyslarni ochishdan oldin tizimga kiring!',
    loginBannerSub: '1 marta bosish orqali 1,000,000 so\'m (1,000 G) demo balans bilan barcha keyslarni ochib ko\'ring.',
    oneClickDemo: '1-Click Demo (1M So\'m / 1,000 G)',
    enterLogin: 'Kirish (Login)',

    // Promos & Crash
    crashTitle: 'CRASH ROCKET X100',
    crashSub: 'Raketa portlashidan oldin yutuqni oling va garovingizni 100 barobargacha ko\'paytiring!',
    betAmount: 'Garov miqdori:',
    startFlight: 'PARVOZNI BOSHLASH',
    cashOut: 'YUTUQNI OLISH (CASH OUT)',
    promoModalTitle: 'PROMOKODLAR VA BEPUL KONKURSLAR',
    enterPromo: 'Promokod kiritish',
    activate: 'FAOLLASHTIRISH',
    participateFree: 'QATNASHISH (BEPUL)',
    youParticipate: 'QATNASHYAPSIZ',
    participants: 'Qatnashuvchilar:',
    history: 'Tarix:'
  },

  EN: {
    // Navigation
    logoSubtitle: 'CS2 & PUBG CASES',
    bonuses: 'BONUSES',
    crash: 'Crash (X100 Rocket)',
    promo: 'Promo & Giveaways',
    upgrade: 'Upgrade',
    contracts: 'Contracts',
    battle: 'Case Battle',
    inventory: 'Inventory',
    login: 'SIGN IN',
    balance: 'Balance',
    topUp: 'Deposit',
    faq: 'FAQ',
    wiki: 'WIKI CS2',
    partnership: 'PARTNERSHIP',
    all: 'ALL',
    top: 'TOP',
    logout: 'Sign Out',

    // Hero
    prizePool: 'Prize pool',
    eventSubtitle: 'Limited Halloween case series with increased drop chance for knives and covert skins!',
    toEvent: 'TO EVENT',
    limitedEvent: 'EVENT',

    // Carnival Section
    carnivalTitle: 'CS2 CASES: CARNIVAL OF MADNESS',
    carnivalSub: 'Exclusive event cases featuring extraordinary knives and covert items',
    collapse: 'COLLAPSE',
    expand: 'EXPAND',

    // 7 Keys Series
    free7Title: '7 KEYS SERIES CS2 & PUBG',
    free7Sub: 'Free CS2 and PUBG cases every single day',
    howItWorks: 'How it works?',
    freeRulesTitle: 'Free case rules:',
    freeRule1: '1. Visit the platform every day to claim your free series crate.',
    freeRule2: '2. Each consecutive day chest level rises: from Stone to Platinum (up to 350 G)!',
    freeRule3: '3. Claimed funds instantly credit to your balance to open any cases.',

    // Toolbar & Community
    communityTitle: 'CS2 & PUBG CASES',
    communitySub: 'Popular community cases and official PUBG drops',
    searchPlaceholder: 'SEARCH NAME',
    clearFilters: 'CLEAR',
    noCasesFound: 'No cases found matching your criteria',
    resetFilters: 'Reset filters',

    // Inventory
    userInventory: 'USER INVENTORY',
    wonSkins: 'WON SKINS',
    totalValue: 'Total value:',
    sellAll: 'SELL ALL',
    sell: 'Sell',
    withdraw: 'Withdraw',
    emptyInventoryTitle: 'Your inventory is empty',
    emptyInventorySub: 'Open cases and win legendary CS2 knives and PUBG outfits!',

    // Steam Withdraw
    withdrawHeader: 'WITHDRAW TO STEAM',
    withdrawSub: 'Receive your won skin to your Steam account via Trade Offer',
    tradeUrlLabel: 'Your Steam Trade URL:',
    findTradeUrl: 'Find my Trade URL',
    demoPaste: 'Paste sample Trade URL',
    sendToSteam: 'WITHDRAW TO STEAM (SEND)',
    tradeOfferSent: 'TRADE OFFER DISPATCHED!',
    tradeInstructions: 'Acceptance instructions:',
    step1: '1. Open the Steam app on your phone or PC.',
    step2: '2. Navigate to "Trade Offers" section.',
    step3: '3. Accept our bot\'s trade offer and enjoy your skin in-game!',
    understood: 'GOT IT (CLOSE)',

    // Case Opening
    openCase: 'OPEN CASE',
    fastOpen: 'Fast Open',
    opening: 'OPENING...',
    viewInventory: 'View in Inventory',
    saveSkin: 'Keep',
    openAgain: 'Open Again',
    odds: 'Odds breakdown',
    viewReel: 'View Reel',

    // Auth prompt banner
    loginBannerTitle: 'Sign in before opening cases!',
    loginBannerSub: '1-Click authorization with 1,000,000 UZS (1,000 G) demo balance included.',
    oneClickDemo: '1-Click Demo (1M UZS / 1,000 G)',
    enterLogin: 'Sign In (Login)',

    // Promos & Crash
    crashTitle: 'CRASH ROCKET X100',
    crashSub: 'Cash out before the rocket crashes and multiply your bet up to 100x!',
    betAmount: 'Bet Amount:',
    startFlight: 'LAUNCH ROCKET',
    cashOut: 'CASH OUT',
    promoModalTitle: 'PROMO CODES & FREE GIVEAWAYS',
    enterPromo: 'Enter promo code',
    activate: 'ACTIVATE',
    participateFree: 'JOIN GIVEAWAY (FREE)',
    youParticipate: 'ENTERED',
    participants: 'Participants:',
    history: 'History:'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('openkeys_lang') || 'RU';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('openkeys_lang', lang);
  };

  const t = (key) => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.RU;
    return langDict[key] || TRANSLATIONS.RU[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
