import React from 'react';
import { Sparkles, Users, Lock, ArrowRight, Settings } from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';

interface HeaderProps {
  onBuyClick: () => void;
  onPreviewClick: () => void;
  onAdminClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBuyClick, onPreviewClick, onAdminClick }) => {
  return (
    <header className="bg-[#050505]/95 backdrop-blur-md border-b border-white/5 text-[#F5F5F5] sticky top-[33px] sm:top-[37px] z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-amber-500 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.25)] flex items-center justify-center">
            <div className="w-full h-full bg-[#050505] rounded-[3px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <div>
            <div className="font-bold tracking-tighter text-base sm:text-lg flex items-center gap-1.5 leading-none">
              <span className="text-[#F5F5F5]">DIGITAL PRODUCTS</span>
              <span className="text-amber-500">WITH AI™</span>
            </div>
            <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest hidden sm:block mt-0.5">
              Handbook & Live Training Course
            </p>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-white/60">
          <a href="#curriculum" className="hover:text-amber-500 transition-colors">
            Curriculum
          </a>
          <a href="#proof" className="hover:text-amber-500 transition-colors flex items-center gap-1.5">
            Nigerian Proofs
            <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">
              VERIFIED
            </span>
          </a>
          <a href="#calculator" className="hover:text-amber-500 transition-colors">
            Income Calculator
          </a>
          <a href="#bonuses" className="hover:text-amber-500 transition-colors">
            Bonus Vault
          </a>
          <a href="#faq" className="hover:text-amber-500 transition-colors">
            FAQ
          </a>
        </nav>

        {/* Right CTA Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onAdminClick && (
            <button
              onClick={onAdminClick}
              className="text-xs font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all flex items-center gap-1.5 font-mono"
              title="Author Admin Portal"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Admin</span>
            </button>
          )}

          <button
            onClick={onPreviewClick}
            className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white px-3.5 py-2 rounded-full border border-white/10 hover:border-white/30 transition-all hidden sm:block"
          >
            Free Sample PDF
          </button>

          <button
            onClick={onBuyClick}
            className="group relative inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded uppercase tracking-widest shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Get Access (₦{COURSE_DETAILS.discountPrice.toLocaleString()})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};

