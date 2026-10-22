import React from 'react';
import { useBank } from '../context/BankContext';
import { 
  X, 
  User, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  KeyRound, 
  Fingerprint, 
  LogOut, 
  ChevronRight,
  Sparkles,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const ProfileDrawer = () => {
  const { user, activeModal, setActiveModal, logout, triggerFeedback, showToast } = useBank();

  if (activeModal !== 'profile') return null;

  const close = () => {
    triggerFeedback();
    setActiveModal(null);
  };

  const handleAction = (title) => {
    triggerFeedback();
    showToast(`${title} feature opened`, "info");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-slide-up">
        {/* Top Profile Banner */}
        <div>
          <div className="bg-gradient-to-r from-[#ED1B24] via-[#D81820] to-[#0B2545] text-white p-6 pt-10 rounded-b-3xl relative">
            <button
              onClick={close}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white text-[#ED1B24] flex items-center justify-center text-xl font-black shadow-lg border-2 border-white/50">
                {user.initials}
              </div>
              <div>
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-xs text-white/80">CRN: {user.crn}</p>
                <div className="flex items-center gap-1 text-[10px] text-emerald-300 font-semibold mt-1 bg-white/10 px-2 py-0.5 rounded-full w-fit">
                  <ShieldCheck className="w-3 h-3" />
                  <span>{user.kycStatus}</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Contact & Account Details */}
          <div className="p-4 space-y-4">
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-2 text-xs">
              <div className="flex items-center gap-2.5 text-slate-600">
                <Phone className="w-4 h-4 text-[#ED1B24]" />
                <span className="font-medium">{user.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600">
                <Mail className="w-4 h-4 text-[#ED1B24]" />
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600">
                <MapPin className="w-4 h-4 text-[#ED1B24]" />
                <span className="font-medium line-clamp-1">{user.branch}</span>
              </div>
            </div>

            {/* Settings Options */}
            <div className="space-y-1">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                Security & Preferences
              </h4>

              {[
                { title: 'Change 6-Digit MPIN', icon: KeyRound },
                { title: 'Biometric Face ID / Fingerprint', icon: Fingerprint, badge: 'Enabled' },
                { title: 'Manage Linked UPI Handles', icon: Sparkles },
                { title: 'Full KYC & Aadhaar Certificate', icon: FileCheck },
                { title: '24x7 Kotak Customer Care', icon: HelpCircle }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAction(item.title)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold text-slate-800">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logout CTA */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={logout}
            className="w-full bg-red-50 hover:bg-red-100 text-[#ED1B24] py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>Secure Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
