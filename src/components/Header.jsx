import React from 'react';
import { useBank } from '../context/BankContext';
import { Bell, Lock, Search, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';

export const Header = () => {
  const { user, notifications, setActiveModal, logout, triggerFeedback } = useBank();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-gradient-to-r from-[#ED1B24] via-[#D81820] to-[#B00E17] text-white pt-3 pb-6 px-4 rounded-b-[28px] shadow-lg relative z-20">
      {/* Top App Bar */}
      <div className="flex items-center justify-between">
        {/* Profile Avatar & Greeting */}
        <div 
          onClick={() => {
            triggerFeedback();
            setActiveModal('profile');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white text-[#ED1B24] flex items-center justify-center font-bold text-sm shadow-md border-2 border-white/40 group-hover:scale-105 transition-transform">
              {user.initials}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-400 w-3.5 h-3.5 rounded-full border-2 border-[#ED1B24]" />
          </div>
          <div>
            <div className="text-[11px] text-white/80 font-medium flex items-center gap-1">
              <span>CRN: {user.crn}</span>
              <ChevronRight className="w-3 h-3 text-white/60" />
            </div>
            <h1 className="text-base font-bold tracking-tight line-clamp-1 leading-tight">
              {user.name}
            </h1>
          </div>
        </div>

        {/* Action Icons (Notifications, Search, Lock) */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <button
            onClick={() => {
              triggerFeedback();
              setActiveModal('notifications');
            }}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center relative transition-all border border-white/20"
            title="Notifications"
          >
            <Bell className="w-4.5 h-4.5 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-[#0B2545] font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Quick Lock / Sign Out */}
          <button
            onClick={logout}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center transition-all border border-white/20"
            title="Lock Banking Session"
          >
            <Lock className="w-4 h-4 text-white/90" />
          </button>
        </div>
      </div>

      {/* Quick Search */}
      <div className="mt-4">
        <div 
          onClick={() => {
            triggerFeedback();
            setActiveModal('transfer');
          }}
          className="w-full bg-white/15 hover:bg-white/20 active:bg-white/25 border border-white/25 rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 text-white/85 text-xs backdrop-blur-sm cursor-pointer transition-all shadow-inner"
        >
          <Search className="w-4 h-4 text-white/70" />
          <span className="truncate">Search payees, bills, services, or IFSC...</span>
        </div>
      </div>
    </div>
  );
};
