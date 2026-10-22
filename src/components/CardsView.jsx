import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { 
  CreditCard, 
  RotateCw, 
  Copy, 
  Check, 
  Lock, 
  Unlock, 
  Globe, 
  ShoppingBag, 
  Wifi, 
  ShieldAlert, 
  Sparkles,
  Sliders,
  ChevronRight,
  Info
} from 'lucide-react';

export const CardsView = () => {
  const { 
    user, 
    toggleCardFreeze, 
    updateCardControls, 
    triggerFeedback, 
    showToast 
  } = useBank();

  const [activeCardTab, setActiveCardTab] = useState('debit'); // 'debit' | 'credit'
  const [isFlipped, setIsFlipped] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const debit = user.debitCard;
  const credit = user.creditCard;

  const handleCopyCard = (num) => {
    navigator.clipboard?.writeText(num.replace(/\s+/g, ''));
    setCopied(true);
    triggerFeedback();
    showToast("Card number copied!", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFlipCard = () => {
    triggerFeedback('beep');
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="p-4 space-y-4 pb-20 animate-fade-in">
      {/* Top Card Switcher */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl max-w-xs mx-auto">
        <button
          onClick={() => {
            triggerFeedback();
            setActiveCardTab('debit');
            setIsFlipped(false);
          }}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeCardTab === 'debit' ? 'bg-[#ED1B24] text-white shadow' : 'text-slate-600'
          }`}
        >
          811 Virtual Debit Card
        </button>
        <button
          onClick={() => {
            triggerFeedback();
            setActiveCardTab('credit');
            setIsFlipped(false);
          }}
          className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeCardTab === 'credit' ? 'bg-[#0B2545] text-white shadow' : 'text-slate-600'
          }`}
        >
          League Credit Card
        </button>
      </div>

      {/* 3D Flippable Card Container */}
      <div className="perspective-1000 max-w-sm mx-auto w-full">
        <div
          onClick={handleFlipCard}
          className={`relative w-full aspect-[1.586/1] rounded-3xl cursor-pointer transition-transform duration-700 transform-style-3d shadow-2xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT OF CARD */}
          <div className={`absolute inset-0 w-full h-full rounded-3xl p-5 flex flex-col justify-between backface-hidden border ${
            activeCardTab === 'debit'
              ? 'bg-gradient-to-tr from-[#061826] via-[#0B2545] to-[#134074] border-white/20 text-white'
              : 'bg-gradient-to-tr from-[#2A0845] via-[#461257] to-[#1B1464] border-amber-400/30 text-white'
          } ${debit.isFrozen && activeCardTab === 'debit' ? 'grayscale opacity-75' : ''}`}>
            
            {/* Top Row: Chip, Contactless & Kotak 811 Logo */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {/* EMV Chip */}
                <div className="w-10 h-7 rounded-md bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-500 border border-amber-600 shadow-inner flex flex-col justify-around p-1">
                  <div className="h-0.5 w-full bg-amber-700/40 rounded-full" />
                  <div className="h-0.5 w-full bg-amber-700/40 rounded-full" />
                </div>
                <Wifi className="w-5 h-5 text-white/70 rotate-90" />
              </div>

              <div className="flex items-center gap-1.5 text-right">
                <span className="text-sm font-black tracking-tight">kotak</span>
                <span className="bg-[#ED1B24] text-white text-[10px] px-1.5 py-0.2 rounded font-black">
                  811
                </span>
              </div>
            </div>

            {/* Frozen Card Overlay Banner if frozen */}
            {debit.isFrozen && activeCardTab === 'debit' && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs rounded-3xl flex items-center justify-center gap-2 text-white font-bold text-sm">
                <Lock className="w-5 h-5 text-red-400" />
                <span>CARD TEMPORARILY FROZEN</span>
              </div>
            )}

            {/* Middle: 16 Digit Card Number */}
            <div className="my-auto">
              <div className="text-lg tracking-[0.2em] font-mono font-bold drop-shadow-md">
                {activeCardTab === 'debit' ? debit.cardNumber : credit.cardNumber}
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-300 mt-1 font-mono">
                <div>
                  <span className="text-slate-400 block text-[8px]">VALID THRU</span>
                  <span>{activeCardTab === 'debit' ? debit.expiry : credit.expiry}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[8px]">CVV</span>
                  <span>{showCvv ? (activeCardTab === 'debit' ? debit.cvv : credit.cvv) : '•••'}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Cardholder Name & Visa/Mastercard Logo */}
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-medium">
                  Card Holder
                </span>
                <span className="text-xs font-bold tracking-wider uppercase font-mono">
                  {user.name}
                </span>
              </div>

              <div className="text-right">
                <span className="text-base font-black italic tracking-tighter text-white">
                  VISA
                </span>
                <span className="text-[8px] block font-bold text-amber-300 -mt-1 tracking-widest">
                  PLATINUM
                </span>
              </div>
            </div>
          </div>

          {/* BACK OF CARD */}
          <div className={`absolute inset-0 w-full h-full rounded-3xl p-4 flex flex-col justify-between backface-hidden rotate-y-180 border ${
            activeCardTab === 'debit'
              ? 'bg-gradient-to-tl from-[#061826] via-[#0B2545] to-[#134074] border-white/20 text-white'
              : 'bg-gradient-to-tl from-[#2A0845] via-[#461257] to-[#1B1464] border-amber-400/30 text-white'
          }`}>
            {/* Magnetic Stripe */}
            <div className="-mx-4 h-9 bg-slate-950 mt-1 shadow-inner" />

            {/* Signature & CVV Strip */}
            <div className="my-2">
              <div className="flex items-center justify-between text-[9px] text-slate-300 px-1 mb-1">
                <span>Authorized Signature</span>
                <span className="font-bold text-amber-300">CVV (3 Digits)</span>
              </div>
              <div className="bg-white/90 rounded-lg p-2 flex items-center justify-between text-slate-900 font-mono text-xs">
                <span className="italic text-slate-400 text-[10px]">{user.name}</span>
                <span className="font-black bg-slate-900 text-white px-2 py-0.5 rounded text-xs">
                  {activeCardTab === 'debit' ? debit.cvv : credit.cvv}
                </span>
              </div>
            </div>

            {/* Disclaimer & Customer Care */}
            <div className="text-[8px] text-slate-300 leading-tight">
              <p>For customer assistance call 1860 266 2666 (24x7 Kotak Care). This virtual card is issued by Kotak Mahindra Bank Ltd.</p>
              <div className="flex justify-between items-center mt-1 text-slate-400">
                <span>Kotak 811 Virtual Engine</span>
                <span className="font-mono">VERIFIED BY VISA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Quick Action Buttons */}
      <div className="flex items-center justify-center gap-3 max-w-sm mx-auto">
        <button
          onClick={handleFlipCard}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition-all active:scale-95"
        >
          <RotateCw className="w-3.5 h-3.5 text-[#ED1B24]" />
          <span>Flip Card (CVV)</span>
        </button>

        <button
          onClick={() => handleCopyCard(activeCardTab === 'debit' ? debit.cardNumber : credit.cardNumber)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl shadow-sm transition-all active:scale-95"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#ED1B24]" />}
          <span>{copied ? 'Copied' : 'Copy Number'}</span>
        </button>
      </div>

      {/* Card Controls & Limits Section */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm max-w-lg mx-auto space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#ED1B24]" />
          <span>Card Security & Usage Controls</span>
        </h3>

        {/* Freeze Card Switch */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              debit.isFrozen ? 'bg-red-500 text-white' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {debit.isFrozen ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Temporary Card Freeze</h4>
              <p className="text-[11px] text-slate-500">Lock card instantly for safety</p>
            </div>
          </div>
          <button
            onClick={toggleCardFreeze}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              debit.isFrozen ? 'bg-[#ED1B24]' : 'bg-slate-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              debit.isFrozen ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Online E-commerce Switch */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Online & E-commerce Usage</h4>
              <p className="text-[11px] text-slate-500">Amazon, Flipkart, Swiggy payments</p>
            </div>
          </div>
          <button
            onClick={() => updateCardControls('onlineTxn', !debit.onlineTxn)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              debit.onlineTxn ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              debit.onlineTxn ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* International Usage Switch */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">International Usage</h4>
              <p className="text-[11px] text-slate-500">Overseas & foreign currency transactions</p>
            </div>
          </div>
          <button
            onClick={() => updateCardControls('internationalTxn', !debit.internationalTxn)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              debit.internationalTxn ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
              debit.internationalTxn ? 'translate-x-6' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Daily Spending Limit Slider */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">Daily Online Limit</span>
            <span className="font-extrabold text-[#ED1B24]">
              ₹{debit.dailyLimit.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max={debit.maxLimit}
            step="1000"
            value={debit.dailyLimit}
            onChange={(e) => updateCardControls('dailyLimit', parseInt(e.target.value))}
            className="w-full accent-[#ED1B24] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
            <span>Min: ₹1,000</span>
            <span>Max: ₹1,00,000</span>
          </div>
        </div>
      </div>
    </div>
  );
};
