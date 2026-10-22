import React from 'react';
import { useBank } from '../context/BankContext';
import { 
  Smartphone, 
  Landmark, 
  Zap, 
  CreditCard, 
  PiggyBank, 
  Car, 
  TrendingUp, 
  BadgePercent, 
  ShieldCheck, 
  FileText,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const QuickActions = () => {
  const { setActiveModal, setActiveTab, triggerFeedback } = useBank();

  const services = [
    {
      id: 'upi',
      name: 'Pay to Contact',
      badge: 'Instant',
      icon: Smartphone,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      action: () => setActiveModal('transfer')
    },
    {
      id: 'bank-transfer',
      name: 'Bank Transfer',
      badge: 'NEFT/IMPS',
      icon: Landmark,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      action: () => setActiveModal('transfer')
    },
    {
      id: 'bills',
      name: 'Pay Bills',
      badge: 'BBPS',
      icon: Zap,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      action: () => setActiveTab('bills')
    },
    {
      id: 'cards',
      name: 'Cards & Controls',
      badge: 'Virtual',
      icon: CreditCard,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      action: () => setActiveTab('cards')
    },
    {
      id: 'fd',
      name: 'Fixed Deposit',
      badge: '7.4% p.a.',
      icon: PiggyBank,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      action: () => setActiveTab('invest')
    },
    {
      id: 'fastag',
      name: 'FASTag Recharge',
      badge: 'Toll',
      icon: Car,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
      action: () => setActiveTab('bills')
    },
    {
      id: 'invest',
      name: 'Mutual Funds',
      badge: 'Zero Fee',
      icon: TrendingUp,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      action: () => setActiveTab('invest')
    },
    {
      id: 'offers',
      name: '811 Offers',
      badge: '5% Back',
      icon: BadgePercent,
      color: 'bg-orange-50 text-orange-600 border-orange-200',
      action: () => setActiveModal('offers')
    }
  ];

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
          <span>Banking & Services</span>
        </h2>
        <span className="text-[11px] font-semibold text-[#ED1B24] cursor-pointer hover:underline">
          View All (12+)
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2.5">
        {services.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                triggerFeedback();
                item.action();
              }}
              className="flex flex-col items-center p-2 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 active:scale-95 transition-all group relative overflow-hidden"
            >
              {/* Mini Badge */}
              {item.badge && (
                <span className="absolute top-1 right-1 text-[8px] font-black px-1 rounded bg-slate-100 text-slate-600 group-hover:bg-[#ED1B24] group-hover:text-white transition-colors">
                  {item.badge}
                </span>
              )}

              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border mb-1.5 transition-transform group-hover:scale-105 ${item.color}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 group-hover:text-slate-900 text-center leading-tight line-clamp-2">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
