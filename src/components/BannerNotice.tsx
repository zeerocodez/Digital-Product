import React, { useState, useEffect } from 'react';
import { Zap, Clock, ShieldCheck } from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';

interface BannerNoticeProps {
  onBuyClick: () => void;
}

export const BannerNotice: React.FC<BannerNoticeProps> = ({ onBuyClick }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 71, minutes: 59, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black font-semibold py-2 px-4 text-xs sm:text-sm border-b border-amber-400/30 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-black uppercase tracking-wider text-[11px] sm:text-xs">
          <span className="inline-flex items-center justify-center bg-black text-amber-500 p-1 rounded text-xs shrink-0">
            <Zap className="w-3.5 h-3.5 fill-amber-500" />
          </span>
          <span>LIVE COHORT DEADLINE: FEE INCREASES TO ₦25,000 SOON!</span>
          <span className="hidden lg:inline text-black/90 font-black">• HANDBOOK + LIVE ZOOM CLASSROOM PASS INCLUDED</span>
        </div>

        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5 bg-black px-2.5 py-1 rounded text-amber-400 border border-black/30 shadow-md">
            <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="uppercase tracking-widest text-[9px] text-white/80 hidden sm:inline">Price Hike In:</span>
            <span className="font-mono font-black text-[11px] sm:text-xs tracking-wider">
              {timeLeft.hours}h : {formatTime(timeLeft.minutes)}m : {formatTime(timeLeft.seconds)}s
            </span>
          </div>

          <button
            onClick={onBuyClick}
            className="hidden sm:flex items-center gap-1 bg-black hover:bg-neutral-900 text-amber-400 font-black px-3 py-1 rounded transition-all text-xs uppercase tracking-widest shadow-md hover:scale-105"
          >
            Claim ₦{COURSE_DETAILS.discountPrice.toLocaleString()} Pass
          </button>
        </div>
      </div>
    </div>
  );
};
