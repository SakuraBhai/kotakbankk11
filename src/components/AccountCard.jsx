import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Send, 
  PlusCircle, 
  Landmark, 
  ShieldCheck, 
  Zap
} from 'lucide-react';

export const AccountCard = () => {
  const { 
    user, 
    isBalanceHidden, 
    setIsBalanceHidden, 
    setActiveModal, 
    setActiveTab, 
    triggerFeedback, 
    showToast,
    toggleActivMoney
  } = useBank();

  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    triggerFeedback();
    showToast(`${fieldName} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formattedBalance = user.balance.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const formattedActivBalance = user.activMoneyBalance.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="-mt-3 px-4 z-20 relative">
      <div className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#061826] text-white rounded-3xl p-5 shadow-xl border border-white/10 relative overflow-hidden">
        {/* Subtle Decorative Background Lines */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Top Tier: Account Type */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="bg-[#ED1B24] text-white text-[11px] font-black px-2 py-0.5 rounded tracking-wider shadow-sm">
              811 SUPER
            </span>
            <span className="text-xs text-slate-300 font-medium truncate">
              {user.accountType}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-semibold bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Active</span>
          </div>
        </div>

        {/* Middle Tier: Main Available Balance with Eye Toggle next to it */}
        <div className="mt-4">
          <p className="text-xs text-slate-400 font-medium">Available Balance</p>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-slate-300">₹</span>
              <span className="text-3xl font-extrabold tracking-tight text-white transition-all duration-200">
                {isBalanceHidden ? '••••••••' : formattedBalance}
              </span>
            </div>

            {/* Eye Icon button directly beside balance */}
            <button
              onClick={() => {
                triggerFeedback('beep');
                setIsBalanceHidden(!isBalanceHidden);
              }}
              className="p-1.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-slate-200 hover:text-white transition-all border border-white/15 shadow-sm flex items-center justify-center cursor-pointer"
              title={isBalanceHidden ? "Unhide Balance" : "Hide Balance"}
            >
              {isBalanceHidden ? (
                <EyeOff className="w-4 h-4 text-amber-300" />
              ) : (
                <Eye className="w-4 h-4 text-emerald-300" />
              )}
            </button>
          </div>
        </div>

        {/* Account Details Row (A/C No, IFSC, UPI) */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs bg-black/20 p-2.5 rounded-2xl border border-white/5">
          <div className="flex items-center justify-between pr-2 border-r border-white/10">
            <div>
              <span className="text-[10px] text-slate-400 block leading-tight">A/C Number</span>
              <span className="font-semibold text-slate-200 tracking-wider">
                {isBalanceHidden ? '••••••' + user.accountNo.slice(-4) : user.accountNo}
              </span>
            </div>
            <button
              onClick={() => handleCopy(user.accountNo, 'Account Number')}
              className="text-slate-400 hover:text-white p-1"
              title="Copy Account Number"
            >
              {copiedField === 'Account Number' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          <div className="flex items-center justify-between pl-2">
            <div>
              <span className="text-[10px] text-slate-400 block leading-tight">IFSC Code</span>
              <span className="font-semibold text-slate-200 tracking-wider">{user.ifsc}</span>
            </div>
            <button
              onClick={() => handleCopy(user.ifsc, 'IFSC')}
              className="text-slate-400 hover:text-white p-1"
              title="Copy IFSC"
            >
              {copiedField === 'IFSC' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Quick Action Buttons (Send, Add, Passbook) */}
        <div className="mt-4 grid grid-cols-3 gap-3 pt-2 border-t border-white/10">
          <button
            onClick={() => {
              triggerFeedback();
              setActiveModal('transfer');
            }}
            className="flex flex-col items-center gap-1.5 group active:scale-95 transition-transform"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#ED1B24] to-red-500 text-white flex items-center justify-center shadow-md shadow-red-900/30 group-hover:scale-105 transition-transform">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white">
              Send Money
            </span>
          </button>

          <button
            onClick={() => {
              triggerFeedback();
              setActiveModal('addMoney');
            }}
            className="flex flex-col items-center gap-1.5 group active:scale-95 transition-transform"
          >
            <div className="w-11 h-11 rounded-2xl bg-white/15 hover:bg-white/20 text-white flex items-center justify-center border border-white/15 group-hover:scale-105 transition-transform">
              <PlusCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white">
              Add Money
            </span>
          </button>

          <button
            onClick={() => {
              triggerFeedback();
              setActiveTab('overview');
            }}
            className="flex flex-col items-center gap-1.5 group active:scale-95 transition-transform"
          >
            <div className="w-11 h-11 rounded-2xl bg-white/15 hover:bg-white/20 text-white flex items-center justify-center border border-white/15 group-hover:scale-105 transition-transform">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white">
              Overview
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
