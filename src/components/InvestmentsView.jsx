import React, { useState } from 'react';
import { useBank } from '../context/BankContext';
import { 
  TrendingUp, 
  PiggyBank, 
  Calculator, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck,
  ArrowRight,
  Percent
} from 'lucide-react';

export const InvestmentsView = () => {
  const { user, toggleActivMoney, triggerFeedback, showToast } = useBank();
  
  // FD Calculator States
  const [depositAmount, setDepositAmount] = useState(50000);
  const [tenureMonths, setTenureMonths] = useState(13); // 390 days ~ 13 months
  const interestRate = 7.40; // 7.4% p.a.

  // Compounded quarterly calculation: A = P(1 + r/400)^(4 * t)
  const years = tenureMonths / 12;
  const maturityAmount = Math.round(depositAmount * Math.pow(1 + (interestRate / 400), 4 * years));
  const interestEarned = maturityAmount - depositAmount;

  const handleOpenFd = () => {
    triggerFeedback('success');
    showToast(`Instant Fixed Deposit of ₹${depositAmount.toLocaleString('en-IN')} booked successfully!`, 'success');
  };

  return (
    <div className="p-4 space-y-4 pb-20 animate-fade-in max-w-lg mx-auto">
      {/* ActivMoney Highlight Banner */}
      <div className="bg-gradient-to-br from-[#0B2545] via-[#134074] to-[#061826] text-white p-5 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="flex items-start justify-between">
          <div>
            <span className="bg-[#ED1B24] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider">
              AUTO SWEEP
            </span>
            <h2 className="text-lg font-black mt-2">Kotak ActivMoney</h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Earn FD interest up to <strong className="text-amber-400">7.40% p.a.</strong> on your idle balance without locking your funds.
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
            <TrendingUp className="w-6 h-6 text-amber-400" />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block">Total Swept to FD</span>
            <span className="text-base font-extrabold text-white">
              ₹{user.activMoneyBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <button
            onClick={toggleActivMoney}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              user.isActivMoneyEnabled
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-[#ED1B24] text-white hover:bg-red-600'
            }`}
          >
            {user.isActivMoneyEnabled ? '✓ Enabled' : 'Enable ActivMoney'}
          </button>
        </div>
      </div>

      {/* Interactive Fixed Deposit (FD) Calculator */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-[#ED1B24] flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">FD Return Calculator</h3>
              <p className="text-[11px] text-slate-500">Highest return for 390 days (7.40% p.a.)</p>
            </div>
          </div>
          <span className="text-xs font-black text-[#ED1B24] bg-red-50 px-2 py-1 rounded-lg">
            {interestRate}% p.a.
          </span>
        </div>

        {/* Deposit Amount Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-semibold">Investment Amount</span>
            <span className="text-sm font-black text-slate-900">
              ₹{depositAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="500000"
            step="5000"
            value={depositAmount}
            onChange={(e) => setDepositAmount(parseInt(e.target.value))}
            className="w-full accent-[#ED1B24] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-medium">
            <span>₹10,000</span>
            <span>₹5,00,000</span>
          </div>
        </div>

        {/* Tenure Pills */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-2">Select Tenure</label>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { label: '390 Days', months: 13, rate: '7.40%' },
              { label: '1 Year', months: 12, rate: '7.10%' },
              { label: '2 Years', months: 24, rate: '7.15%' },
              { label: '5 Years', months: 60, rate: '6.20%' }
            ].map((t) => (
              <button
                key={t.months}
                type="button"
                onClick={() => {
                  triggerFeedback();
                  setTenureMonths(t.months);
                }}
                className={`py-2 px-1 rounded-2xl border text-center transition-all ${
                  tenureMonths === t.months
                    ? 'border-[#ED1B24] bg-red-50 text-[#ED1B24] font-bold shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 font-medium'
                }`}
              >
                <div className="text-[11px] leading-tight">{t.label}</div>
                <div className="text-[9px] font-bold opacity-80">{t.rate}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Maturity Breakdown Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 grid grid-cols-2 gap-3 text-center">
          <div className="border-r border-slate-200 pr-2">
            <span className="text-[10px] text-slate-500 block font-medium">Total Interest Earned</span>
            <span className="text-sm font-extrabold text-emerald-600">
              +₹{interestEarned.toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block font-medium">Maturity Amount</span>
            <span className="text-sm font-extrabold text-slate-900">
              ₹{maturityAmount.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleOpenFd}
          className="w-full bg-[#ED1B24] hover:bg-[#D81820] active:scale-95 text-white py-3.5 rounded-2xl font-bold text-xs shadow-md shadow-red-500/25 transition-all flex items-center justify-center gap-2"
        >
          <PiggyBank className="w-4 h-4" />
          <span>Open Fixed Deposit Instantly</span>
        </button>
      </div>

      {/* Zero Commission Direct Mutual Funds */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Direct Mutual Funds (0% Commission)
          </h3>
          <span className="text-[10px] text-[#ED1B24] font-bold cursor-pointer">Explore All</span>
        </div>

        <div className="space-y-2">
          {[
            { name: 'Kotak Bluechip Large Cap Fund', returns: '+18.4% (3Y)', badge: 'Low Risk', sip: '₹500/mo' },
            { name: 'Kotak Emerging Equity Midcap Fund', returns: '+26.8% (3Y)', badge: 'High Growth', sip: '₹1000/mo' },
            { name: 'Kotak Nifty 50 Index Fund', returns: '+15.2% (3Y)', badge: 'Passive Index', sip: '₹500/mo' }
          ].map((fund, idx) => (
            <div
              key={idx}
              onClick={() => {
                triggerFeedback();
                showToast(`Selected ${fund.name} for SIP investment`, "info");
              }}
              className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div>
                <h4 className="text-xs font-bold text-slate-900">{fund.name}</h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                  <span className="bg-slate-200 px-1.5 py-0.2 rounded font-medium">{fund.badge}</span>
                  <span>Min SIP: {fund.sip}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-extrabold text-emerald-600 block">{fund.returns}</span>
                <span className="text-[10px] text-slate-400">CAGR</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
