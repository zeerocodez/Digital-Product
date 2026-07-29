import React, { useState, useEffect } from 'react';
import { ShoppingBag, X, CheckCircle } from 'lucide-react';
import { RECENT_PURCHASES } from '../data/courseData';

export const SocialProofTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show initial notification after 3 seconds
    const showTimer = setTimeout(() => setIsVisible(true), 3000);

    // Rotate purchases every 9 seconds
    const rotateInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_PURCHASES.length);
        setIsVisible(true);
      }, 800);
    }, 9000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(rotateInterval);
    };
  }, []);

  if (!isVisible) return null;

  const currentPurchase = RECENT_PURCHASES[currentIndex];

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-xs w-full bg-[#0A0A0A] border border-amber-500/40 p-3.5 shadow-2xl backdrop-blur-md animate-slide-up text-[#F5F5F5] flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0">
          <ShoppingBag className="w-4 h-4" />
        </div>

        <div className="space-y-0.5 text-xs">
          <div className="flex items-center gap-1 font-mono">
            <span className="font-bold text-white">{currentPurchase.name}</span>
            <span className="text-[10px] text-white/40">({currentPurchase.location})</span>
          </div>
          <p className="text-[11px] text-amber-500 font-bold line-clamp-1">
            Purchased {currentPurchase.product}
          </p>
          <span className="text-[9px] text-white/40 font-mono block">
            Verified Sale • {currentPurchase.timeAgo}
          </span>
        </div>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="text-white/40 hover:text-white p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
