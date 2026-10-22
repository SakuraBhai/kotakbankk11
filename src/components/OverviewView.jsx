import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { 
  User, 
  Copy, 
  Check, 
  Building2, 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  Smartphone, 
  Mail, 
  FileCheck2, 
  Share2, 
  Sparkles,
  Landmark,
  BadgeCheck,
  Download
} from 'lucide-react';

export const OverviewView = () => {
  const { user, triggerFeedback, showToast } = useBank();
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(fieldName);
    triggerFeedback('beep');
    showToast(`${fieldName} copied to clipboard!`, 'success');
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleShareDetails = () => {
    triggerFeedback('beep');
    const details = `Kotak 811 Account Details:\nName: ${user.name}\nA/C No: ${user.accountNo}\nIFSC: ${user.ifsc}\nUPI ID: ${user.upiId}\nCRN: ${user.crn}\nBranch: ${user.branch}`;
    if (navigator.share) {
      navigator.share({
        title: 'Kotak 811 Account Details',
        text: details
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(details);
      showToast("All account details copied to clipboard!", "success");
    }
  };

  return (
    <div className="p-4 space-y-4 pb-20 animate-fade-in max-w-lg mx-auto">
      {/* Overview Top Hero Card */}
      <div className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#061826] text-white p-5 rounded-3xl shadow-xl relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#ED1B24] flex items-center justify-center font-black text-lg shadow-md border border-white/40">
              {user.initials}
            </div>
            <div>
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
                PRIMARY ACCOUNT
              </span>
              <h2 className="text-base font-extrabold tracking-tight">{user.name}</h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-semibold bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30">
            <BadgeCheck className="w-4 h-4 text-emerald-300" />
            <span>Active</span>
          </div>
        </div>

        {/* Share Button */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block">Account Balance</span>
            <span className="text-lg font-black text-white">
              ₹{user.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button
            onClick={handleShareDetails}
            className="bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-white/20 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-white" />
            <span>Share Details</span>
          </button>
        </div>
      </div>

      {/* Primary Banking Details */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
          <Landmark className="w-4 h-4 text-[#ED1B24]" />
          <span>Account & Branch Details</span>
        </h3>

        {/* CRN Number */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">CRN Number</span>
            <span className="text-xs font-extrabold text-slate-900 tracking-wider font-mono">{user.crn}</span>
          </div>
          <button
            onClick={() => handleCopy(user.crn, 'CRN Number')}
            className="p-1.5 rounded-xl hover:bg-white text-slate-500 hover:text-slate-900 transition-colors"
            title="Copy CRN"
          >
            {copiedField === 'CRN Number' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Account Number */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Account Number</span>
            <span className="text-xs font-extrabold text-slate-900 tracking-wider font-mono">{user.accountNo}</span>
          </div>
          <button
            onClick={() => handleCopy(user.accountNo, 'Account Number')}
            className="p-1.5 rounded-xl hover:bg-white text-slate-500 hover:text-slate-900 transition-colors"
            title="Copy Account Number"
          >
            {copiedField === 'Account Number' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* IFSC Code */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">IFSC Code</span>
            <span className="text-xs font-extrabold text-slate-900 tracking-wider font-mono">{user.ifsc}</span>
          </div>
          <button
            onClick={() => handleCopy(user.ifsc, 'IFSC Code')}
            className="p-1.5 rounded-xl hover:bg-white text-slate-500 hover:text-slate-900 transition-colors"
            title="Copy IFSC"
          >
            {copiedField === 'IFSC Code' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* UPI ID */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">UPI ID / VPA</span>
            <span className="text-xs font-extrabold text-slate-900 font-mono">{user.upiId}</span>
          </div>
          <button
            onClick={() => handleCopy(user.upiId, 'UPI ID')}
            className="p-1.5 rounded-xl hover:bg-white text-slate-500 hover:text-slate-900 transition-colors"
            title="Copy UPI ID"
          >
            {copiedField === 'UPI ID' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Home Branch */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Home Branch</span>
            <span className="text-xs font-bold text-slate-900">{user.branch}</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">MICR Code: {user.micr || "470485002"} • IFSC: {user.ifsc}</span>
          </div>
          <button
            onClick={() => handleCopy(user.branch, 'Home Branch')}
            className="p-1.5 rounded-xl hover:bg-white text-slate-500 hover:text-slate-900 transition-colors"
            title="Copy Branch"
          >
            {copiedField === 'Home Branch' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Account Profile & Regulatory Info */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Profile & Verification</span>
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold block">Account Type</span>
            <span className="font-bold text-slate-900 text-[11px] block mt-0.5">{user.accountType}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold block">KYC Status</span>
            <span className="font-bold text-emerald-600 text-[11px] block mt-0.5">{user.kycStatus}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold block">Registered Mobile</span>
            <span className="font-bold text-slate-900 text-[11px] block mt-0.5">{user.phone}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold block">Registered Email</span>
            <span className="font-bold text-slate-900 text-[11px] block mt-0.5 truncate">{user.email}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold block">Nomination</span>
            <span className="font-bold text-emerald-600 text-[11px] block mt-0.5">Registered (Active)</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400 font-semibold block">DICGC Cover</span>
            <span className="font-bold text-slate-900 text-[11px] block mt-0.5">Insured up to ₹5L</span>
          </div>
        </div>
      </div>
    </div>
  );
};
