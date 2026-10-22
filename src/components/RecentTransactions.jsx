import React from 'react';
import { useBank } from '../context/BankContext';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  ChevronRight, 
  Utensils, 
  Zap, 
  ShoppingBag, 
  Send, 
  TrendingUp, 
  Wifi, 
  PlusCircle,
  Clock
} from 'lucide-react';

const getCategoryIcon = (iconName, type) => {
  switch (iconName) {
    case 'Utensils': return <Utensils className="w-4 h-4" />;
    case 'Zap': return <Zap className="w-4 h-4" />;
    case 'ShoppingBag': return <ShoppingBag className="w-4 h-4" />;
    case 'Send': return <Send className="w-4 h-4" />;
    case 'TrendingUp': return <TrendingUp className="w-4 h-4" />;
    case 'Wifi': return <Wifi className="w-4 h-4" />;
    case 'PlusCircle': return <PlusCircle className="w-4 h-4" />;
    default: return type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />;
  }
};

export const RecentTransactions = () => {
  const { 
    transactions, 
    setActiveTab, 
    setSelectedTransaction, 
    setActiveModal, 
    triggerFeedback 
  } = useBank();

  // Show top 4 recent transactions on home screen
  const recentList = transactions.slice(0, 4);

  const handleTransactionClick = (txn) => {
    triggerFeedback();
    setSelectedTransaction(txn);
    setActiveModal('receipt');
  };

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between mb-2.5">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
          <span>Recent Transactions</span>
        </h2>
        <button
          onClick={() => {
            triggerFeedback();
            setActiveTab('passbook');
          }}
          className="text-[11px] font-bold text-[#ED1B24] flex items-center hover:underline"
        >
          <span>Passbook</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="bg-white rounded-3xl p-2 border border-slate-100 shadow-sm divide-y divide-slate-50">
        {recentList.map((txn) => {
          const isCredit = txn.type === 'credit';
          return (
            <div
              key={txn.id}
              onClick={() => handleTransactionClick(txn)}
              className="p-3 hover:bg-slate-50 active:bg-slate-100 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-colors group"
            >
              {/* Left Category Icon */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold flex-shrink-0 ${
                isCredit ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-[#ED1B24]'
              }`}>
                {getCategoryIcon(txn.icon, txn.type)}
              </div>

              {/* Center Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#ED1B24] transition-colors truncate">
                  {txn.title}
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5 truncate">
                  <span className="flex-shrink-0">{txn.date}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                  <span className="font-medium text-slate-500 truncate">{txn.mode}</span>
                </div>
              </div>

              {/* Right Amount & Status */}
              <div className="text-right flex-shrink-0 whitespace-nowrap pl-1">
                <div className={`text-xs font-black tracking-tight whitespace-nowrap ${
                  isCredit ? 'text-emerald-600' : 'text-slate-900'
                }`}>
                  {isCredit ? '+' : '-'} ₹{txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-full inline-block mt-0.5">
                  {txn.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
