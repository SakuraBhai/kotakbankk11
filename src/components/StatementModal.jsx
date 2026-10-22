import React, { useRef } from 'react';
import { useBank } from '../context/BankContext';
import { X, Printer, Download, Landmark } from 'lucide-react';

export const StatementModal = () => {
  const { user, transactions, activeModal, setActiveModal, triggerFeedback, showToast } = useBank();
  const printRef = useRef(null);

  if (activeModal !== 'statement') return null;

  const close = () => {
    triggerFeedback();
    setActiveModal(null);
  };

  const handlePrint = () => {
    triggerFeedback('beep');
    window.print();
  };

  const handleDownloadPdf = () => {
    triggerFeedback('success');
    showToast("Statement downloaded successfully!", "success");
    window.print();
  };

  // Statement rows displayed in chronological order (1 to 27)
  const statementRows = [...transactions].reverse();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[96vh] overflow-hidden">
        {/* Modal Top Action Bar (hidden when printing) */}
        <div className="bg-[#0B2545] text-white px-4 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <span className="bg-[#ED1B24] text-white text-[11px] font-black px-2 py-0.5 rounded tracking-wide">
              KOTAK
            </span>
            <span className="text-xs font-bold">Account e-Statement</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={close}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Printable Statement Sheet */}
        <div ref={printRef} className="p-6 md:p-8 overflow-y-auto flex-1 font-sans text-slate-800 bg-white">
          {/* Top Header Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            {/* Left: Customer Info */}
            <div className="space-y-1 text-xs">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 uppercase">
                {user.name}
              </h1>
              <p className="text-xs font-medium text-slate-700">CRN {user.crn}</p>

              <div className="pt-3 text-[11px] text-slate-600 leading-relaxed">
                {(user.addressLines || [
                  "Sitapur road, Gomti Nagar, Lucknow",
                  "Gomti Nagar, Lucknow",
                  "Santipuram",
                  "Gomti Nagar - 226010",
                  "Uttar Pradesh - India"
                ]).map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>

            {/* Right: Account Meta */}
            <div className="text-xs space-y-1.5 md:text-right">
              <div className="flex md:justify-end gap-2 text-slate-500">
                <span>Account No</span>
                <span className="font-bold text-slate-900">{user.accountNo}</span>
              </div>
              <div className="flex md:justify-end gap-2 text-slate-500">
                <span>Account Type</span>
                <span className="font-bold text-slate-900">{user.accountType}</span>
              </div>
              <div className="flex md:justify-end gap-2 text-slate-500">
                <span>Branch</span>
                <span className="font-bold text-slate-900">{user.branchName || "Lucknow"}</span>
              </div>
              <div className="flex md:justify-end gap-2 text-slate-500">
                <span>Branch Phone Number</span>
                <span className="font-bold text-slate-900">{user.branchPhone || "67582457468"}</span>
              </div>
              <div className="flex md:justify-end gap-2 text-slate-500 pt-2">
                <span>Account Status</span>
                <span className="font-bold text-slate-900">{user.accountStatus || "Active"}</span>
              </div>
              <div className="flex md:justify-end gap-2 text-slate-500">
                <span>Nominee Registered</span>
                <span className="font-bold text-slate-900">{user.nomineeRegistered || "Yes"}</span>
              </div>
              <div className="flex md:justify-end gap-2 text-slate-500 pt-2">
                <span>Currency</span>
                <span className="font-bold text-slate-900">{user.currency || "INDIAN RUPEE"}</span>
              </div>
            </div>
          </div>

          {/* MICR & IFSC Line */}
          <div className="text-xs py-2 border-t border-slate-200 flex flex-wrap items-center gap-4 text-slate-600 mb-2">
            <div>
              <span>MICR </span>
              <span className="font-bold text-slate-900">{user.micr || "470485002"}</span>
            </div>
            <div>
              <span>IFSC Code </span>
              <span className="font-bold text-slate-900">{user.ifsc}</span>
            </div>
          </div>

          {/* Red Header Bar */}
          <div className="bg-[#ED1B24] text-white text-center py-2 px-3 font-semibold text-xs tracking-wide shadow-sm rounded-t">
            Savings Account Transactions
          </div>

          {/* Statement Table */}
          <div className="overflow-x-auto border border-t-0 border-slate-200 rounded-b">
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-slate-400 text-white font-medium">
                  <th className="py-1.5 px-2 text-center w-8">#</th>
                  <th className="py-1.5 px-2 whitespace-nowrap">Date</th>
                  <th className="py-1.5 px-3">Description</th>
                  <th className="py-1.5 px-2 whitespace-nowrap">Chq/Ref. No.</th>
                  <th className="py-1.5 px-2 text-right whitespace-nowrap">Withdrawal (Dr.)</th>
                  <th className="py-1.5 px-2 text-right whitespace-nowrap">Deposit (Cr.)</th>
                  <th className="py-1.5 px-2 text-right whitespace-nowrap">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {/* Opening Balance Row */}
                <tr className="bg-slate-50 text-slate-700 font-medium">
                  <td className="py-1.5 px-2 text-center">-</td>
                  <td className="py-1.5 px-2 text-center">-</td>
                  <td className="py-1.5 px-3 font-semibold text-slate-800">Opening Balance</td>
                  <td className="py-1.5 px-2 text-center">-</td>
                  <td className="py-1.5 px-2 text-right">-</td>
                  <td className="py-1.5 px-2 text-right">-</td>
                  <td className="py-1.5 px-2 text-right font-bold text-slate-900">
                    {(user.openingBalance || 594.27).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>

                {/* All 27 Transactions */}
                {statementRows.map((txn, index) => {
                  const isDebit = txn.type === 'debit';
                  return (
                    <tr key={txn.id || index} className="hover:bg-slate-50 transition-colors">
                      <td className="py-1.5 px-2 text-center text-slate-500 font-mono">
                        {txn.statementNo || index + 1}
                      </td>
                      <td className="py-1.5 px-2 whitespace-nowrap text-slate-700 font-medium">
                        {txn.date}
                      </td>
                      <td className="py-1.5 px-3 text-slate-800 break-all leading-tight font-mono text-[10px]">
                        {txn.narration || txn.title}
                      </td>
                      <td className="py-1.5 px-2 whitespace-nowrap font-mono text-[10px] text-slate-600">
                        {txn.refId}
                      </td>
                      <td className="py-1.5 px-2 text-right font-medium text-slate-800 whitespace-nowrap">
                        {isDebit ? txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
                      </td>
                      <td className="py-1.5 px-2 text-right font-medium text-slate-800 whitespace-nowrap">
                        {!isDebit ? txn.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : ''}
                      </td>
                      <td className="py-1.5 px-2 text-right font-bold text-slate-900 whitespace-nowrap">
                        {txn.balance ? txn.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
