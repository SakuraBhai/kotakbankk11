import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { 
  X, 
  PlusCircle, 
  CreditCard, 
  Smartphone, 
  Landmark, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const AddMoneyModal = () => {
  const { activeModal, setActiveModal, addMoney, triggerFeedback, user } = useBank();
  const [amount, setAmount] = useState('');
  const [paymentSource, setPaymentSource] = useState('upi'); // 'upi' | 'card' | 'netbanking'

  if (activeModal !== 'addMoney') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    triggerFeedback('beep');
    const success = addMoney(amount);
    if (success) {
      setActiveModal(null);
      setAmount('');
    }
  };

  const close = () => {
    triggerFeedback();
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slide-up max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ED1B24] to-[#B00E17] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-white" />
            <div>
              <h3 className="text-base font-bold">Add Money to Kotak 811</h3>
              <p className="text-[11px] text-white/80">Instant deposit via UPI / Cards</p>
            </div>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Enter Deposit Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-xl font-bold text-slate-400">₹</span>
              <input
                type="number"
                min="10"
                step="any"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-9 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#ED1B24] focus:ring-2 focus:ring-red-100 outline-none text-xl font-extrabold text-slate-900"
                required
              />
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-2 mt-2">
              {[500, 1000, 2000, 5000].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setAmount(chip.toString());
                    triggerFeedback();
                  }}
                  className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
                >
                  +₹{chip}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">
              Select Deposit Method
            </label>
            <div className="space-y-2">
              {[
                { id: 'upi', name: 'Instant UPI (Google Pay / PhonePe)', icon: Smartphone, fee: 'Free' },
                { id: 'card', name: 'Other Bank Debit Card', icon: CreditCard, fee: 'Free' },
                { id: 'netbanking', name: 'Net Banking (50+ Banks)', icon: Landmark, fee: 'Free' }
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    triggerFeedback();
                    setPaymentSource(m.id);
                  }}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentSource === m.id
                      ? 'border-[#ED1B24] bg-red-50/70 shadow-sm'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <m.icon className="w-4 h-4 text-[#ED1B24]" />
                    <span className="text-xs font-bold text-slate-900">{m.name}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                    {m.fee}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ED1B24] hover:bg-[#D81820] text-white py-3.5 rounded-2xl font-bold text-xs shadow-md shadow-red-500/25 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Deposit ₹{amount || '0'} Instantly</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
