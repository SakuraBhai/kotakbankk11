import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialUserData, initialTransactions, mockBeneficiaries, mockNotifications } from '../data/mockData';
import confetti from 'canvas-confetti';

const BankContext = createContext();

// Simple Web Audio Sound Synthesizer for pleasant banking chimes & haptic feedback
const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    if (type === 'beep') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'success') {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.08, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    }
  } catch (e) {
    // Audio context might be restricted before interaction
  }
};

export const BankProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(initialUserData);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [beneficiaries, setBeneficiaries] = useState(mockBeneficiaries);
  const [notifications, setNotifications] = useState(mockNotifications);
  
  // UI & Navigation States
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'pay' | 'cards' | 'passbook' | 'invest'
  const [activeModal, setActiveModal] = useState(null); // 'transfer' | 'scan' | 'addMoney' | 'receipt' | 'notifications' | 'profile' | 'bills' | 'fd'
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isBalanceHidden, setIsBalanceHidden] = useState(true);
  const [deviceFrameMode, setDeviceFrameMode] = useState('phone'); // 'phone' | 'responsive'
  const [toastMessage, setToastMessage] = useState(null);

  // Trigger Toast Notification
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Trigger Haptic / Audio
  const triggerFeedback = (type = 'beep') => {
    if (navigator.vibrate) {
      navigator.vibrate(type === 'success' ? [50, 50, 100] : 20);
    }
    playSound(type);
  };

  // Perform Transfer / Payment
  const executePayment = ({ recipientName, recipientDetail, amount, category, mode = 'UPI', remarks = 'Fund Transfer' }) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      showToast("Please enter a valid transfer amount", "error");
      return false;
    }

    if (numAmount > user.balance) {
      showToast("Insufficient account balance in Kotak 811 account", "error");
      return false;
    }

    // Deduct Balance
    const newBalance = user.balance - numAmount;
    setUser(prev => ({
      ...prev,
      balance: newBalance
    }));

    // Create Transaction
    const newTxn = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      title: recipientName || "UPI Payment",
      category: category || "Transfer",
      type: "debit",
      amount: numAmount,
      date: "Just now",
      timestamp: new Date().toISOString(),
      status: "Successful",
      mode: mode,
      refId: `UPI/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      merchant: recipientDetail || recipientName,
      icon: category === "Bill Payment" ? "Zap" : "Send",
      color: "bg-red-100 text-red-700"
    };

    setTransactions(prev => [newTxn, ...prev]);

    // Push notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: "Money Debited Successfully",
      message: `₹${numAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} debited from A/C ${user.accountNo} to ${recipientName}.`,
      time: "Just now",
      read: false,
      icon: "ArrowUpRight",
      color: "text-red-500 bg-red-50"
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Feedback
    triggerFeedback('success');
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });

    setSelectedTransaction(newTxn);
    return newTxn;
  };

  // Add Money / Deposit
  const addMoney = (amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      showToast("Please enter a valid amount", "error");
      return false;
    }

    const newBalance = user.balance + numAmount;
    setUser(prev => ({
      ...prev,
      balance: newBalance
    }));

    const newTxn = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      title: "Added Money to Kotak 811",
      category: "Deposit",
      type: "credit",
      amount: numAmount,
      date: "Just now",
      timestamp: new Date().toISOString(),
      status: "Successful",
      mode: "UPI Auto-Add",
      refId: `DEP/${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      merchant: "Self Deposit",
      icon: "PlusCircle",
      color: "bg-emerald-100 text-emerald-700"
    };

    setTransactions(prev => [newTxn, ...prev]);
    triggerFeedback('success');
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    showToast(`₹${numAmount.toLocaleString('en-IN')} added to Kotak 811 account!`, 'success');
    return true;
  };

  // Card Controls
  const toggleCardFreeze = () => {
    setUser(prev => ({
      ...prev,
      debitCard: {
        ...prev.debitCard,
        isFrozen: !prev.debitCard.isFrozen
      }
    }));
    triggerFeedback();
    showToast(user.debitCard.isFrozen ? "Card unfreezed successfully" : "Card temporarily freezed for safety", "info");
  };

  const updateCardControls = (field, value) => {
    setUser(prev => ({
      ...prev,
      debitCard: {
        ...prev.debitCard,
        [field]: value
      }
    }));
    triggerFeedback();
    showToast("Card preferences updated", "success");
  };

  // ActivMoney Toggle
  const toggleActivMoney = () => {
    setUser(prev => ({
      ...prev,
      isActivMoneyEnabled: !prev.isActivMoneyEnabled
    }));
    triggerFeedback();
    showToast(!user.isActivMoneyEnabled ? "ActivMoney Auto-Sweep Activated!" : "ActivMoney Deactivated", "info");
  };

  // Login handler
  const login = () => {
    triggerFeedback('success');
    setIsAuthenticated(true);
  };

  // Logout handler
  const logout = () => {
    triggerFeedback();
    setIsAuthenticated(false);
    setActiveTab('home');
    setActiveModal(null);
  };

  return (
    <BankContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        user,
        transactions,
        beneficiaries,
        notifications,
        setNotifications,
        activeTab,
        setActiveTab,
        activeModal,
        setActiveModal,
        selectedTransaction,
        setSelectedTransaction,
        isBalanceHidden,
        setIsBalanceHidden,
        deviceFrameMode,
        setDeviceFrameMode,
        toastMessage,
        showToast,
        triggerFeedback,
        executePayment,
        addMoney,
        toggleCardFreeze,
        updateCardControls,
        toggleActivMoney
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => useContext(BankContext);
