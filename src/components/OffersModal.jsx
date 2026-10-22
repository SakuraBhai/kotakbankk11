import React from 'react';
import { useBank } from '../context/BankContext';
import { mockOffers } from '../data/mockData';
import { X, Tag, Sparkles, Copy, Check } from 'lucide-react';

export const OffersModal = () => {
  const { activeModal, setActiveModal, triggerFeedback, showToast } = useBank();
  const [copiedCode, setCopiedCode] = React.useState(null);

  if (activeModal !== 'offers') return null;

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    triggerFeedback();
    showToast(`Promo code ${code} copied!`, "success");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const close = () => {
    triggerFeedback();
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slide-up max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#ED1B24] to-[#B00E17] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-bold text-sm">Kotak 811 Exclusive Offers</h3>
              <p className="text-[11px] text-white/80">Cashback & Discounts on your Cards</p>
            </div>
          </div>
          <button
            onClick={close}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Offers list */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {mockOffers.map((off) => (
            <div
              key={off.id}
              className={`p-4 rounded-3xl text-white bg-gradient-to-r ${off.bg} shadow-md space-y-2`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
                  {off.badge}
                </span>

                <button
                  onClick={() => handleCopyCode(off.code)}
                  className="flex items-center gap-1 text-[10px] font-mono bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-xl transition-all"
                >
                  <Tag className="w-3 h-3 text-amber-300" />
                  <span>{off.code}</span>
                  {copiedCode === off.code ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-white/70" />}
                </button>
              </div>

              <div>
                <h4 className="text-sm font-black">{off.title}</h4>
                <p className="text-[11px] text-white/90 leading-tight mt-0.5">{off.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
