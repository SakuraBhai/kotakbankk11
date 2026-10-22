import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { 
  X, 
  QrCode, 
  Flashlight, 
  Image as ImageIcon, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ScanPayModal = () => {
  const { activeModal, setActiveModal, executePayment, triggerFeedback } = useBank();
  const [torchOn, setTorchOn] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [customAmount, setCustomAmount] = useState('');

  if (activeModal !== 'scan') return null;

  const quickMerchants = [
    { name: 'Starbucks Coffee', upi: 'starbucks@kotak', amount: 280, note: 'Cold Brew & Croissant' },
    { name: 'Dominos Pizza India', upi: 'dominos@icici', amount: 549, note: 'Farmhouse Pizza' },
    { name: 'DMart Supermarket', upi: 'dmart.retail@axis', amount: 1420, note: 'Weekly Groceries' },
    { name: 'Mumbai Auto Rickshaw', upi: 'mh02auto@upi', amount: 75, note: 'Meter Fare' }
  ];

  const handleScanSample = (merchant) => {
    triggerFeedback('beep');
    setSelectedMerchant(merchant);
    setCustomAmount(merchant.amount.toString());
  };

  const handlePayNow = () => {
    if (!selectedMerchant) return;
    triggerFeedback('beep');
    
    executePayment({
      recipientName: selectedMerchant.name,
      recipientDetail: selectedMerchant.upi,
      amount: customAmount || selectedMerchant.amount,
      category: "Food & Dining",
      mode: "UPI QR Scan",
      remarks: selectedMerchant.note
    });

    setActiveModal('receipt');
  };

  const close = () => {
    triggerFeedback();
    setActiveModal(null);
    setSelectedMerchant(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-md animate-fade-in p-0 sm:p-4">
      <div className="bg-slate-900 text-white w-full max-w-md rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-slide-up border border-slate-800">
        
        {/* Scanner Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-[#ED1B24]" />
            <h3 className="font-bold text-sm">Scan Any UPI QR</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                triggerFeedback();
                setTorchOn(!torchOn);
              }}
              className={`p-2 rounded-full border transition-colors ${
                torchOn ? 'bg-amber-400 text-slate-900 border-amber-400' : 'bg-white/10 text-white border-white/20'
              }`}
            >
              <Flashlight className="w-4 h-4" />
            </button>

            <button
              onClick={close}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scanner Viewfinder Simulation */}
        <div className="p-6 flex flex-col items-center">
          <div className="relative w-64 h-64 rounded-3xl bg-slate-950 border-2 border-slate-700 flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Viewfinder Corners */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-[#ED1B24] rounded-tl-xl" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-[#ED1B24] rounded-tr-xl" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-[#ED1B24] rounded-bl-xl" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-[#ED1B24] rounded-br-xl" />

            {/* Laser Line Animation */}
            <div className="absolute left-4 right-4 h-0.5 bg-[#ED1B24] shadow-[0_0_12px_#ED1B24] animate-laser" />

            {/* Mock QR Code Pattern inside */}
            <div className="opacity-20 flex flex-col items-center">
              <QrCode className="w-32 h-32 text-white" />
            </div>

            <span className="absolute bottom-3 text-[10px] text-white/60 font-mono tracking-widest uppercase">
              Align QR Code Inside
            </span>
          </div>

          {/* Quick Mock QR Triggers */}
          <div className="mt-5 w-full">
            <p className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Tap Sample Merchant QR to Simulate:</span>
            </p>

            <div className="grid grid-cols-2 gap-2">
              {quickMerchants.map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => handleScanSample(m)}
                  className={`p-2.5 rounded-2xl border text-left transition-all ${
                    selectedMerchant?.name === m.name
                      ? 'border-[#ED1B24] bg-red-950/40 shadow-md'
                      : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-xs font-bold text-white truncate">{m.name}</div>
                  <div className="text-[10px] text-[#ED1B24] font-semibold mt-0.5">₹{m.amount}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Sheet when Merchant is Selected */}
          {selectedMerchant && (
            <div className="mt-4 w-full bg-slate-800/90 border border-slate-700 p-3.5 rounded-2xl animate-fade-in">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-xs font-bold text-white">{selectedMerchant.name}</h4>
                  <p className="text-[10px] text-slate-400 font-mono">{selectedMerchant.upi}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2 text-sm font-bold text-slate-400">₹</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 pl-7 pr-3 py-1.5 rounded-xl text-sm font-bold text-white outline-none focus:border-[#ED1B24]"
                  />
                </div>
                <button
                  onClick={handlePayNow}
                  className="bg-[#ED1B24] hover:bg-[#D81820] text-white px-4 py-2 rounded-xl text-xs font-bold transition-transform active:scale-95 shadow-md shadow-red-900/40"
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
