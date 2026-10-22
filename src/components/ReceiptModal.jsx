import React from 'react';
import { useBank } from '../context/BankContext';
import { 
  X, 
  CheckCircle2, 
  Share2, 
  Download, 
  Copy, 
  ShieldCheck, 
  Landmark, 
  ArrowUpRight,
  ArrowDownLeft,
  Sparkles
} from 'lucide-react';

export const ReceiptModal = () => {
  const { 
    selectedTransaction, 
    activeModal, 
    setActiveModal, 
    user, 
    triggerFeedback, 
    showToast 
  } = useBank();

  if (activeModal !== 'receipt' || !selectedTransaction) return null;

  const txn = selectedTransaction;
  const isCredit = txn.type === 'credit';

  const handleShare = () => {
    triggerFeedback('beep');
    if (navigator.share) {
      navigator.share({
        title: 'Kotak 811 Payment Receipt',
        text: `Transferred ₹${txn.amount} to ${txn.title}. Ref: ${txn.refId}`,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`Kotak 811 Receipt: Paid ₹${txn.amount} to ${txn.title}. Ref: ${txn.refId}`);
      showToast("Receipt details copied to share!", "success");
    }
  };

  const handleDownloadPdf = () => {
    triggerFeedback('success');
    showToast(`Receipt ${txn.refId}.pdf downloaded!`, "success");
  };

  const close = () => {
    triggerFeedback();
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-slide-up max-h-[92vh]">
        {/* Receipt Header Banner */}
        <div className="bg-gradient-to-r from-[#0B2545] to-[#134074] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black tracking-wider text-[#ED1B24] bg-white px-2 py-0.5 rounded">
              811 RECEIPT
            </span>
            <span className="text-xs text-slate-300 font-medium">{txn.mode}</span>
          </div>

          <button
            onClick={close}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Receipt Details Card */}
        <div className="p-6 overflow-y-auto flex-1 text-center">
          {/* Green Checkmark */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="text-base font-bold text-slate-900">Payment {txn.status}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{txn.date}</p>

          {/* Big Amount */}
          <div className="my-4">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {isCredit ? '+' : '-'} ₹{txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Details Table */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5 text-left text-xs mb-4">
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Paid To / From</span>
              <span className="font-bold text-slate-900 text-right">{txn.title}</span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">Merchant / Payee</span>
              <span className="font-mono text-slate-700 text-right">{txn.merchant}</span>
            </div>

            {txn.narration && (
              <div className="flex justify-between items-start py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Bank Narration</span>
                <span className="font-mono text-[11px] text-slate-800 text-right max-w-[220px] break-all">{txn.narration}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">{isCredit ? 'Credited Account' : 'Debited Account'}</span>
              <span className="font-mono font-semibold text-slate-800">
                Kotak 811 (••••{user.accountNo.slice(-4)})
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500 font-medium">UPI / Bank Ref ID</span>
              <span className="font-mono font-bold text-slate-900">{txn.refId}</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500 font-medium">Category</span>
              <span className="font-semibold text-[#ED1B24]">{txn.category}</span>
            </div>
          </div>

          {/* Action Buttons (Share, Download PDF) */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleShare}
              className="py-3 px-4 rounded-2xl border border-slate-200 hover:bg-slate-50 font-bold text-xs text-slate-700 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5 text-[#ED1B24]" />
              <span>Share Receipt</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className="py-3 px-4 rounded-2xl bg-[#0B2545] hover:bg-[#134074] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-slate-900/20"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Save as PDF</span>
            </button>
          </div>
        </div>

        {/* Bottom Safety Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Kotak 811 Bank Authenticated Transaction</span>
          </p>
        </div>
      </div>
    </div>
  );
};
