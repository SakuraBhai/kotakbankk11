import React from 'react';
import { useBank } from '../context/BankContext';
import { Sparkles } from 'lucide-react';

export const DeviceFrame = ({ children }) => {
  const { toastMessage } = useBank();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start sm:justify-center antialiased selection:bg-red-500 selection:text-white">
      {/* App Main Container: Full-screen on mobile/APK, clean centered container on desktop web */}
      <main className="w-full max-w-md min-h-screen sm:min-h-[850px] sm:max-h-[92vh] sm:rounded-3xl bg-[#0B2545] text-slate-900 flex flex-col shadow-2xl relative overflow-hidden sm:border sm:border-slate-800">
        <div className="flex-1 flex flex-col h-full min-h-full overflow-y-auto relative no-scrollbar">
          {children}
        </div>
      </main>

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 z-50 animate-slide-up flex items-center gap-2.5 bg-slate-900/95 text-white border border-slate-700 px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <span>{toastMessage.message}</span>
        </div>
      )}
    </div>
  );
};
