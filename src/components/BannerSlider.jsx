import React, { useState, useEffect } from 'react';
import { mockOffers } from '../data/mockData';
import { Sparkles, ChevronRight, Tag } from 'lucide-react';
import { useBank } from '../context/BankContext';

export const BannerSlider = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { setActiveModal, triggerFeedback } = useBank();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % mockOffers.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const offer = mockOffers[currentIdx];

  return (
    <div className="px-4 py-2">
      <div 
        onClick={() => {
          triggerFeedback();
          setActiveModal('offers');
        }}
        className={`relative overflow-hidden rounded-3xl p-4 text-white bg-gradient-to-r ${offer.bg} shadow-md cursor-pointer transition-all duration-500 min-h-[110px] flex flex-col justify-between`}
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="flex items-start justify-between z-10">
          <span className="bg-white/20 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
            {offer.badge}
          </span>
          <div className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded-md text-[10px] font-mono">
            <Tag className="w-2.5 h-2.5 text-amber-300" />
            <span>{offer.code}</span>
          </div>
        </div>

        <div className="z-10 mt-2">
          <h3 className="text-sm font-black tracking-tight">{offer.title}</h3>
          <p className="text-[11px] text-white/90 line-clamp-2 mt-0.5 font-medium leading-tight">
            {offer.tagline}
          </p>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center gap-1.5 mt-3 z-10">
          {mockOffers.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIdx(idx);
              }}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIdx ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
