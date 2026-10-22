import React from 'react';
import { useBank } from '../context/BankContext';
import { 
  X, 
  Bell, 
  CheckCheck, 
  ArrowDownLeft, 
  ArrowUpRight, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';

const getIcon = (iconName) => {
  switch (iconName) {
    case 'ArrowDownLeft': return <ArrowDownLeft className="w-4 h-4 text-emerald-600" />;
    case 'ArrowUpRight': return <ArrowUpRight className="w-4 h-4 text-red-600" />;
    case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-blue-600" />;
    default: return <ShieldCheck className="w-4 h-4 text-amber-600" />;
  }
};

export const NotificationModal = () => {
  const { 
    notifications, 
    setNotifications, 
    activeModal, 
    setActiveModal, 
    triggerFeedback, 
    showToast 
  } = useBank();

  if (activeModal !== 'notifications') return null;

  const handleClearAll = () => {
    triggerFeedback();
    setNotifications([]);
    showToast("Notifications cleared", "info");
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
            <Bell className="w-4 h-4 text-white" />
            <h3 className="font-bold text-sm">Notifications & Alerts</h3>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-[11px] font-bold bg-white/20 hover:bg-white/30 px-2 py-1 rounded-lg text-white"
              >
                Clear All
              </button>
            )}
            <button
              onClick={close}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <CheckCheck className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-semibold">No new notifications</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-xs mt-0.5">
                  {getIcon(notif.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900">{notif.title}</h4>
                    <span className="text-[10px] text-slate-400 font-medium">{notif.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
