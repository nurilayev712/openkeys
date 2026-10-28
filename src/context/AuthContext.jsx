import React, { createContext, useContext, useState, useEffect } from 'react';
import { sound } from '../utils/sound';

const AuthContext = createContext(null);

const STORAGE_KEY = 'openkeys_user_v1';
const INVENTORY_KEY = 'openkeys_inventory_v1';
const HISTORY_KEY = 'openkeys_history_v1';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (parsed) {
        const bal = Number(parsed.balance);
        if (isNaN(bal) || bal < 0) {
          parsed.balance = 1000000; // auto-heal demo balance
        } else {
          parsed.balance = bal;
        }
      }
      return parsed;
    } catch {
      return null;
    }
  });

  const [inventory, setInventory] = useState(() => {
    try {
      const saved = localStorage.getItem(INVENTORY_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.map(item => ({
          ...item,
          game: item.game || (item.rarity?.startsWith('pubg') ? 'pubg' : 'cs2')
        }));
      }
      return [];
    } catch {
      return [];
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(sound.isMuted());

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsSoundMuted(muted);
  };

  const loginWithDemo = () => {
    sound.playCoins();
    const demoUser = {
      id: 'demo_' + Date.now(),
      username: 'LuckyGamer_UZ',
      email: 'gamer@openkeys.uz',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150&auto=format&fit=crop&q=80',
      balance: 1000000, // 1 million so'm demo balans
      joinedAt: new Date().toISOString(),
      isSteam: false,
      level: 14
    };
    setUser(demoUser);
    setIsAuthModalOpen(false);
  };

  const loginWithSteam = () => {
    sound.playCoins();
    const steamUser = {
      id: 'steam_' + Math.floor(Math.random() * 90000000 + 10000000),
      username: 'SteamPlayer_' + Math.floor(Math.random() * 999),
      email: 'steam_user@steamcommunity.com',
      avatar: 'https://avatars.steamstatic.com/b5bd56c1aa424414d79d0f413723ac40c840fb5d_full.jpg',
      balance: 500000, // 500,000 so'm starter balance
      joinedAt: new Date().toISOString(),
      isSteam: true,
      level: 25
    };
    setUser(steamUser);
    setIsAuthModalOpen(false);
  };

  const login = (emailOrUsername, password) => {
    sound.playCoins();
    const newUser = {
      id: 'user_' + Date.now(),
      username: emailOrUsername.split('@')[0] || 'Oyunchi',
      email: emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername}@mail.uz`,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${emailOrUsername}`,
      balance: 200000, // 200,000 so'm starter bonus
      joinedAt: new Date().toISOString(),
      isSteam: false,
      level: 5
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const signup = (username, email, password) => {
    sound.playCoins();
    const newUser = {
      id: 'user_' + Date.now(),
      username: username || 'YangiOyunchi',
      email: email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`,
      balance: 300000, // 300,000 so'm xush kelibsiz bonusi
      joinedAt: new Date().toISOString(),
      isSteam: false,
      level: 1
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    sound.playClick();
    setUser(null);
  };

  const deposit = (amount) => {
    const num = Number(amount);
    if (!user || isNaN(num) || num <= 0) return false;
    sound.playCoins();
    setUser(prev => ({
      ...prev,
      balance: Math.round((Number(prev.balance) || 0) + num)
    }));
    return true;
  };

  const deduct = (amount) => {
    const num = Number(amount);
    if (!user) {
      setIsAuthModalOpen(true);
      return false;
    }
    if (isNaN(num) || num <= 0) return false;
    const currentBalance = Number(user.balance) || 0;
    if (currentBalance < num) {
      setIsDepositOpen(true);
      return false;
    }
    setUser(prev => ({
      ...prev,
      balance: Math.max(0, Math.round(currentBalance - num))
    }));
    return true;
  };

  const addToInventory = (item, caseName) => {
    const dropItem = {
      ...item,
      game: item.game || (item.rarity?.startsWith('pubg') ? 'pubg' : 'cs2'),
      dropId: 'drop_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      droppedAt: new Date().toISOString(),
      fromCase: caseName
    };
    setInventory(prev => [dropItem, ...prev]);
    setHistory(prev => [dropItem, ...prev.slice(0, 49)]);
    return dropItem;
  };

  const sellItem = (dropId) => {
    const item = inventory.find(i => i.dropId === dropId);
    if (!item) return;
    const price = Number(item.price) || 0;
    sound.playCoins();
    setInventory(prev => prev.filter(i => i.dropId !== dropId));
    setUser(prev => ({
      ...prev,
      balance: Math.round((Number(prev.balance) || 0) + price)
    }));
  };

  const sellAllItems = () => {
    if (inventory.length === 0) return 0;
    const total = inventory.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    sound.playCoins();
    setInventory([]);
    setUser(prev => ({
      ...prev,
      balance: Math.round((Number(prev.balance) || 0) + total)
    }));
    return total;
  };

  const removeFromInventory = (dropId) => {
    setInventory(prev => prev.filter(i => i.dropId !== dropId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        inventory,
        history,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isDepositOpen,
        setIsDepositOpen,
        isInventoryOpen,
        setIsInventoryOpen,
        isSoundMuted,
        toggleSound,
        loginWithDemo,
        loginWithSteam,
        login,
        signup,
        logout,
        deposit,
        deduct,
        addToInventory,
        removeFromInventory,
        sellItem,
        sellAllItems
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
