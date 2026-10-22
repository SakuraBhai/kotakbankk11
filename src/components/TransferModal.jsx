import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { 
  X, 
  Send, 
  User, 
  Landmark, 
  Smartphone, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  ArrowRight,
  Search,
  Plus
} from 'lucide-react';

export const TransferModal = () => {
  const { 
    user, 
    beneficiaries, 
    activeModal, 
    setActiveModal, 
    executePayment, 
    triggerFeedback, 
    showToast 
  } = useBank();

  const [transferMode, setTransferMode] = useState('upi'); // 'upi' | 'account'
  const [selectedPayee, setSelectedPayee] = useState(null);
  const [recipientInput, setRecipientInput] = useState('');
  const [accountNoInput, setAccountNoInput] = useState('');
  const [ifscInput, setIfscInput] = useState('');
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('Transfer');
  const [step, setStep] = useState('input'); // 'input' | 'mpin' | 'processing'
  const [mpin, setMpin] = useState(['', '', '', '', '', '']);

  if (activeModal !== 'transfer') return null;

  const handlePayeeSelect = (payee) => {
    setSelectedPayee(payee);
    setRecipientInput(payee.upiId || payee.name);
    triggerFeedback();
  };

  const handleProceedToMpin = (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      showToast("Please enter a valid transfer amount", "error");
      return;
    }
    if (numAmount > user.balance) {
      showToast("Amount exceeds your available balance", "error");
      return;
    }
    if (!recipientInput && !selectedPayee && !accountNoInput) {
      showToast("Please provide recipient details", "error");
      return;
    }
    triggerFeedback();
    setStep('mpin');
  };

  const handleMpinSubmit = () => {
    triggerFeedback('beep');
    setStep('processing');

    setTimeout(() => {
      const recipientName = selectedPayee ? selectedPayee.name : (recipientInput || "Beneficiary A/C");
      const recipientDetail = selectedPayee ? (selectedPayee.upiId || selectedPayee.bank) : (recipientInput || accountNoInput);

      const result = executePayment({
        recipientName,
        recipientDetail,
        amount,
        category: "Transfer",
        mode: transferMode === 'upi' ? 'UPI Instant' : 'IMPS 24x7',
        remarks
      });

      if (result) {
        setActiveModal('receipt');
      } else {
        setStep('input');
      }
    }, 1200);
  };

  const close = () => {
    triggerFeedback();
    setActiveModal(null);
    setStep('input');
    setAmount('');
    setRecipientInput('');
    setSelectedPayee(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-slide-up">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-[#ED1B24] to-[#B00E17] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Send className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">Transfer Money</h3>
              <p className="text-[11px] text-white/80">Kotak 811 Instant IMPS & UPI</p>
            </div>
          </div>

          <button
            onClick={close}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {step === 'input' && (
            <form onSubmit={handleProceedToMpin} className="space-y-4">
              {/* Transfer Mode Switcher */}
              <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setTransferMode('upi');
                    triggerFeedback();
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    transferMode === 'upi' ? 'bg-white text-[#ED1B24] shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>UPI ID / Mobile</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTransferMode('account');
                    triggerFeedback();
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    transferMode === 'account' ? 'bg-white text-[#ED1B24] shadow-sm' : 'text-slate-600'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5" />
                  <span>Account + IFSC</span>
                </button>
              </div>

              {/* Quick Beneficiaries Carousel */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">
                  Frequent Payees
                </label>
                <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                  {beneficiaries.map((b) => (
                    <div
                      key={b.id}
                      onClick={() => handlePayeeSelect(b)}
                      className={`flex-shrink-0 flex flex-col items-center p-2 rounded-2xl border cursor-pointer transition-all ${
                        selectedPayee?.id === b.id
                          ? 'border-[#ED1B24] bg-red-50/70 shadow-sm scale-105'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-800 to-[#ED1B24] text-white flex items-center justify-center text-xs font-bold shadow-sm">
                        {b.avatar}
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 mt-1 truncate max-w-[70px]">
                        {b.name.split(' ')[0]}
                      </span>
                      <span className="text-[9px] text-slate-400 truncate max-w-[70px]">
                        {b.bank.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input details based on mode */}
              {transferMode === 'upi' ? (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Enter UPI ID or Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. rahul@okaxis or 9876543210"
                      value={recipientInput}
                      onChange={(e) => {
                        setRecipientInput(e.target.value);
                        setSelectedPayee(null);
                      }}
                      className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-[#ED1B24] focus:ring-2 focus:ring-red-100 outline-none text-sm font-medium text-slate-900 pr-10"
                      required
                    />
                    {recipientInput && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 absolute right-3.5 top-3.5" />
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Account Number
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Bank Account Number"
                      value={accountNoInput}
                      onChange={(e) => setAccountNoInput(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:border-[#ED1B24] focus:ring-2 focus:ring-red-100 outline-none text-sm font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. HDFC0001234 / SBIN0004321"
                      value={ifscInput}
                      onChange={(e) => setIfscInput(e.target.value.toUpperCase())}
                      className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:border-[#ED1B24] focus:ring-2 focus:ring-red-100 outline-none text-sm font-mono uppercase font-semibold"
                    />
                  </div>
                </div>
              )}

              {/* Amount Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">Amount (₹)</label>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Available: ₹{user.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-xl font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#ED1B24] focus:ring-2 focus:ring-red-100 outline-none text-xl font-extrabold text-slate-900"
                    required
                  />
                </div>

                {/* Quick Amount Chips */}
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

              {/* Remarks */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Remark / Note (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dinner share, Rent, Gift"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 focus:border-[#ED1B24] focus:ring-2 focus:ring-red-100 outline-none text-xs font-medium text-slate-800"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-[#ED1B24] hover:bg-[#D81820] active:scale-[0.98] text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all mt-6"
              >
                <span>Proceed to Pay ₹{amount || '0'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 'mpin' && (
            <div className="py-4 text-center">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#ED1B24] flex items-center justify-center mx-auto mb-3">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Authorize Payment</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Sending <strong className="text-slate-900">₹{parseFloat(amount).toLocaleString('en-IN')}</strong> to{' '}
                <strong className="text-slate-900">{selectedPayee?.name || recipientInput || "Beneficiary"}</strong>
              </p>

              <div className="my-6">
                <p className="text-xs font-semibold text-slate-600 mb-3">Enter 6-Digit Kotak MPIN</p>
                <div className="flex justify-center gap-2.5">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <div
                      key={idx}
                      className="w-10 h-12 rounded-xl border-2 border-slate-300 flex items-center justify-center text-lg font-bold bg-slate-50"
                    >
                      •
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleMpinSubmit}
                  className="w-full bg-[#ED1B24] hover:bg-[#D81820] text-white py-3.5 rounded-2xl font-bold text-sm shadow-lg shadow-red-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm & Authorize</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep('input')}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-2xl font-semibold text-xs transition-colors"
                >
                  Back to Edit Details
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 text-center flex flex-col items-center justify-center">
              <div className="relative w-16 h-16 mb-4">
                <div className="w-16 h-16 rounded-full border-4 border-red-200 border-t-[#ED1B24] animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#ED1B24]" />
                </div>
              </div>
              <h4 className="text-base font-bold text-slate-900">Processing Secure Payment</h4>
              <p className="text-xs text-slate-500 mt-1">Connecting to NPCI / Kotak Payment Gateway...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
