import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';

interface StickyBottomCTAProps {
  onBuyClick: () => void;
}

export const StickyBottomCTA: React.FC<StickyBottomCTAProps> = ({ onBuyClick }) => {
  const [show, setShow] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 71, minutes: 59, seconds: 48 });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#050505]/95 border-t-2 border-amber-500 p-3 sm:p-4 shadow-2xl backdrop-blur-md animate-fade-in text-[#F5F5F5]">
      <div className="max-w-7xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-4">
        
        {/* Left Product Info */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {COURSE_DETAILS.title}
            </h4>
            <p className="text-[10px] font-mono text-white/60">
              Handbook + Live Masterclass • Price increases to ₦25,000 soon
            </p>
          </div>
        </div>

        {/* Center Countdown & Price */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-mono">
          <div className="bg-black border border-amber-500/40 px-2.5 py-1 text-center">
            <div className="flex items-center gap-1 text-[9px] text-amber-400 font-bold uppercase tracking-widest">
              <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
              <span>COHORT DEADLINE:</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white font-mono tracking-wider">
              {timeLeft.hours}h : {formatTime(timeLeft.minutes)}m : {formatTime(timeLeft.seconds)}s
            </div>
          </div>

          <div className="text-left">
            <span className="text-[9px] text-amber-500 font-bold block uppercase tracking-widest">ENROLLMENT FEE</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-2xl font-black text-amber-500">₦{COURSE_DETAILS.discountPrice.toLocaleString()}</span>
              <span className="text-white/40 line-through text-xs font-semibold">₦25,000</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onBuyClick}
          className="group flex-1 sm:flex-none flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest py-3 px-5 text-xs shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all transform hover:-translate-y-0.5"
        >
          <span>CLAIM ₦10,000 PASS NOW</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div>
  );
};
