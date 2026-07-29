import React from 'react';
import { ShieldCheck, Sparkles, Lock, Heart } from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';

interface FooterProps {
  onAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 text-white/50 text-xs py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Guarantee Section */}
        <div className="bg-[#0A0A0A] border border-white/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                30-Day 100% Risk-Free Guarantee
              </h4>
              <p className="text-xs text-white/60">
                Try the full AI Digital Products Money course for 30 full days. If you aren't completely thrilled, get 100% of your money back.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-white/40 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6 shrink-0">
            <span>🔒 256-Bit SSL</span>
            <span>• Verified Purchase</span>
          </div>
        </div>

        {/* Brand & Disclaimer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4 border-t border-white/5">
          
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-base uppercase tracking-wider">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>DIGITAL PRODUCTS WITH AI™</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-sans">
              A Comprehensive Learner’s Handbook for Nigerian Creators. Written by Nuel Effiong and published by Zeerocodes Automation Limited.
            </p>
            <p className="text-[11px] text-white/40 font-mono">
              © {new Date().getFullYear()} Zeerocodes Automation Limited. All rights reserved.
            </p>
          </div>

          <div className="md:col-span-7 space-y-3 text-[11px] text-white/40 leading-relaxed font-mono">
            <h5 className="font-bold text-white/70 uppercase tracking-widest text-[10px]">
              EARNINGS & LEGAL DISCLAIMER
            </h5>
            <p className="font-sans text-xs text-white/50">
              Earnings and income representations made by AI Digital Products Money are aspirational statements only of your earnings potential. The success of students, testimonials, and examples used are exceptional results and are not intended to guarantee that anyone will achieve the same or similar results.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 font-bold text-white/70 uppercase tracking-wider text-[10px]">
              <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Privacy Policy: We protect your personal data and never sell email addresses.'); }} className="hover:text-amber-500 transition-colors">Privacy Policy</a>
              <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Terms of Service: Instant digital product download delivery upon purchase.'); }} className="hover:text-amber-500 transition-colors">Terms of Service</a>
              <a href="#refund" onClick={(e) => { e.preventDefault(); alert('Refund Policy: 30-day money back guarantee via support@aidigitalmoney.com.'); }} className="hover:text-amber-500 transition-colors">Refund Policy</a>
              <a href="mailto:support@aidigitalmoney.com" className="hover:text-amber-500 transition-colors">Support Contact</a>
              {onAdminClick && (
                <button
                  onClick={onAdminClick}
                  className="text-amber-500 hover:text-amber-400 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 border border-amber-500/20 rounded font-mono"
                >
                  ⚙️ Admin Portal
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
