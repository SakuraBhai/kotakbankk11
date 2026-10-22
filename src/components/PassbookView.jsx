import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { 
  Search, 
  Download, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Utensils, 
  Zap, 
  ShoppingBag, 
  Send, 
  TrendingUp, 
  Wifi, 
  PlusCircle,
  FileSpreadsheet,
  CheckCircle2
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

export const PassbookView = () => {
  const { 
    transactions, 
    user, 
    setSelectedTransaction, 
    setActiveModal, 
    triggerFeedback, 
    showToast 
  } = useBank();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all' | 'debit' | 'credit' | 'upi'

  const filteredTransactions = transactions.filter((txn) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      txn.title.toLowerCase().includes(query) ||
      txn.merchant.toLowerCase().includes(query) ||
      txn.amount.toString().includes(query) ||
      (txn.narration && txn.narration.toLowerCase().includes(query)) ||
      (txn.refId && txn.refId.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    if (filterType === 'debit') return txn.type === 'debit';
    if (filterType === 'credit') return txn.type === 'credit';
    if (filterType === 'upi') return txn.mode.includes('UPI');
    return true;
  });

  const handleDownloadStatement = () => {
    triggerFeedback('beep');
    setActiveModal('statement');
  };

  const handleTxnClick = (txn) => {
    triggerFeedback();
    setSelectedTransaction(txn);
    setActiveModal('receipt');
  };

  return (
    <div className="p-4 space-y-4 pb-20 animate-fade-in max-w-lg mx-auto">
      {/* Passbook Summary Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#134074] text-white p-4 rounded-3xl shadow-md flex items-center justify-between">
        <div>
          <span className="text-[11px] text-slate-300 font-semibold">Kotak 811 Passbook</span>
          <div className="text-lg font-extrabold mt-0.5">
            ₹{user.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-emerald-400 font-medium">A/C: {user.accountNo}</span>
        </div>

        <button
          onClick={handleDownloadStatement}
          className="bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-white/20 px-3 py-2 rounded-2xl flex items-center gap-1.5 text-xs font-bold transition-all"
        >
          <Download className="w-3.5 h-3.5 text-white" />
          <span>Statement</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Search by payee, merchant, amount..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 outline-none focus:border-[#ED1B24] focus:ring-2 focus:ring-red-100 shadow-sm"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: 'All Transactions' },
          { id: 'debit', label: 'Spent / Debits' },
          { id: 'credit', label: 'Income / Credits' },
          { id: 'upi', label: 'UPI Only' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              triggerFeedback();
              setFilterType(tab.id);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              filterType === tab.id
                ? 'bg-[#ED1B24] text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm divide-y divide-slate-100">
        {filteredTransactions.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            <FileSpreadsheet className="w-10 h-10 mx-auto mb-2 opacity-40" />
            <p className="text-xs font-semibold">No transactions found matching criteria</p>
          </div>
        ) : (
          filteredTransactions.map((txn) => {
            const isCredit = txn.type === 'credit';
            return (
              <div
                key={txn.id}
                onClick={() => handleTxnClick(txn)}
                className="p-3 hover:bg-slate-50 active:bg-slate-100 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all group"
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
                  {txn.narration && (
                    <p className="text-[10px] text-slate-500 font-mono truncate leading-tight mt-0.5" title={txn.narration}>
                      {txn.narration}
                    </p>
                  )}
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5 truncate">
                    <span className="flex-shrink-0">{txn.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                    <span className="font-mono text-slate-500 truncate">{txn.refId}</span>
                  </div>
                </div>

                {/* Right Amount & Status (Strictly 1 line, no wrapping) */}
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
          })
        )}
      </div>
    </div>
  );
};
