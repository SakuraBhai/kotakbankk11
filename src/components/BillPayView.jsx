import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { mockBillerCategories } from '../data/mockData';
import { 
  Zap, 
  Smartphone, 
  Car, 
  Tv, 
  Wifi, 
  Flame, 
  CreditCard, 
  Droplets,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';

const getBillerIcon = (iconName) => {
  switch (iconName) {
    case 'Zap': return <Zap className="w-5 h-5 text-amber-600" />;
    case 'Smartphone': return <Smartphone className="w-5 h-5 text-blue-600" />;
    case 'Car': return <Car className="w-5 h-5 text-emerald-600" />;
    case 'Tv': return <Tv className="w-5 h-5 text-purple-600" />;
    case 'Wifi': return <Wifi className="w-5 h-5 text-indigo-600" />;
    case 'Flame': return <Flame className="w-5 h-5 text-orange-600" />;
    case 'CreditCard': return <CreditCard className="w-5 h-5 text-rose-600" />;
    default: return <Droplets className="w-5 h-5 text-cyan-600" />;
  }
};

export const BillPayView = () => {
  const { executePayment, setActiveModal, triggerFeedback, showToast } = useBank();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBiller, setSelectedBiller] = useState(null);
  const [consumerNumber, setConsumerNumber] = useState('');
  const [billAmount, setBillAmount] = useState('1499.00');

  const handleSelectBiller = (cat, biller) => {
    triggerFeedback();
    setSelectedCategory(cat);
    setSelectedBiller(biller);
    setConsumerNumber('98765' + Math.floor(10000 + Math.random() * 90000));
  };

  const handlePayBill = (e) => {
    e.preventDefault();
    triggerFeedback('beep');

    executePayment({
      recipientName: `${selectedBiller} (${selectedCategory.name})`,
      recipientDetail: `Consumer ID: ${consumerNumber}`,
      amount: billAmount,
      category: "Bill Payment",
      mode: "Bharat BillPay (BBPS)",
      remarks: `${selectedCategory.name} payment for ${selectedBiller}`
    });

    setSelectedBiller(null);
    setSelectedCategory(null);
    setActiveModal('receipt');
  };

  return (
    <div className="p-4 space-y-4 pb-20 animate-fade-in max-w-lg mx-auto">
      {/* BBPS Trust Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-4 rounded-3xl shadow-md flex items-center justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded-full">
            BHARAT BILLPAY
          </span>
          <h2 className="text-base font-bold mt-1">Recharge & Pay Bills</h2>
          <p className="text-[11px] text-white/80">Zero convenience fee on Kotak 811</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
          <Zap className="w-6 h-6 text-amber-300" />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Popular Bill Categories
        </h3>

        <div className="grid grid-cols-4 gap-2.5">
          {mockBillerCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectBiller(cat, cat.billers[0])}
              className="flex flex-col items-center p-2 rounded-2xl border border-slate-100 hover:border-red-200 hover:bg-red-50/50 active:scale-95 transition-all group"
            >
              <div className="w-11 h-11 rounded-2xl bg-slate-50 group-hover:bg-white flex items-center justify-center border border-slate-100 mb-1.5 shadow-sm">
                {getBillerIcon(cat.icon)}
              </div>
              <span className="text-[11px] font-semibold text-slate-700 group-hover:text-slate-900 text-center line-clamp-2 leading-tight">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bill Payment Form Sheet */}
      {selectedBiller && selectedCategory && (
        <div className="bg-white rounded-3xl p-5 border-2 border-red-200 shadow-lg space-y-4 animate-slide-up relative">
          <button
            onClick={() => {
              triggerFeedback();
              setSelectedBiller(null);
            }}
            className="absolute top-4 right-4 p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
              {getBillerIcon(selectedCategory.icon)}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#ED1B24]">
                {selectedCategory.name}
              </span>
              <h4 className="text-sm font-bold text-slate-900">{selectedBiller}</h4>
            </div>
          </div>

          <form onSubmit={handlePayBill} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Consumer / Account Number
              </label>
              <input
                type="text"
                value={consumerNumber}
                onChange={(e) => setConsumerNumber(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs font-mono font-bold text-slate-800 outline-none focus:border-[#ED1B24]"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Bill Due Amount (₹)
              </label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-base font-extrabold text-slate-900 outline-none focus:border-[#ED1B24]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ED1B24] hover:bg-[#D81820] text-white py-3.5 rounded-2xl font-bold text-xs shadow-md shadow-red-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Pay Bill ₹{parseFloat(billAmount || 0).toLocaleString('en-IN')}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
