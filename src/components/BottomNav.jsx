import React from 'react';
import { useBank } from '../context/BankContext';
import { 
  Home, 
  SendHorizontal, 
  CreditCard, 
  Landmark, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const BottomNav = () => {
  const { activeTab, setActiveTab, triggerFeedback } = useBank();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'pay', label: 'Pay & Transfer', icon: SendHorizontal },
    { id: 'cards', label: 'Cards', icon: CreditCard },
    { id: 'overview', label: 'Overview', icon: Landmark },
    { id: 'invest', label: 'Invest & FD', icon: TrendingUp }
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const IconComponent = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                triggerFeedback();
                setActiveTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 relative ${
                isActive
                  ? 'text-[#ED1B24]'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {/* Active Background Glow / Indicator */}
              {isActive && (
                <span className="absolute -top-2 w-8 h-1 bg-[#ED1B24] rounded-full shadow-[0_0_8px_#ED1B24]" />
              )}

              <div className={`p-1.5 rounded-xl transition-transform ${
                isActive ? 'scale-110 bg-red-50 text-[#ED1B24]' : ''
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>

              <span className={`text-[10px] tracking-tight mt-0.5 font-bold ${
                isActive ? 'text-[#ED1B24]' : 'text-slate-500'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
