import React from 'react';
import { Gift, Shield, Sparkles, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { BONUSES, COURSE_DETAILS } from '../data/courseData';
import { BonusItem } from '../types';

interface BonusVaultSectionProps {
  onBuyClick: () => void;
}

export const BonusVaultSection: React.FC<BonusVaultSectionProps> = ({ onBuyClick }) => {
  const totalBonusValue = BONUSES.reduce((acc, b) => acc + b.value, 0);

  return (
    <section id="bonuses" className="py-16 md:py-24 bg-[#050505] text-[#F5F5F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] font-mono">
            <Gift className="w-3.5 h-3.5" />
            <span>FREE LAUNCH BONUSES (₦{totalBonusValue.toLocaleString()} VALUE)</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
            Order Today & Get <span className="text-amber-500">4 Master Bonuses</span> FREE
          </h2>

          <p className="text-white/60 text-sm sm:text-base">
            Included at zero extra cost when you get the DIGITAL PRODUCTS CREATION WITH AI handbook today.
          </p>
        </div>

        {/* Bonus Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {BONUSES.map((bonus: BonusItem) => (
            <div
              key={bonus.id}
              className="bg-[#0A0A0A] border border-white/10 hover:border-amber-500/40 p-6 shadow-xl flex flex-col sm:flex-row gap-5 items-start transition-all"
            >
              <img
                src={bonus.image}
                alt={bonus.title}
                className="w-full sm:w-32 h-32 object-cover shrink-0 border border-white/10"
                referrerPolicy="no-referrer"
              />

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[9px] font-bold font-mono px-2.5 py-0.5 uppercase tracking-wider">
                    {bonus.badge}
                  </span>
                  <span className="text-xs font-bold text-amber-500 font-mono">
                    VALUE: ₦{bonus.value.toLocaleString()} (FREE)
                  </span>
                </div>

                <h3 className="text-base font-bold text-white uppercase tracking-wider">
                  {bonus.title}
                </h3>

                <p className="text-xs text-white/60 leading-relaxed font-normal">
                  {bonus.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stack Value Banner & Claim Button */}
        <div className="mt-12 max-w-4xl mx-auto bg-[#0A0A0A] border border-amber-500/40 text-white p-8 shadow-2xl text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold px-3 py-1 uppercase tracking-widest font-mono">
            <Zap className="w-3.5 h-3.5 fill-amber-500" />
            TOTAL PACKAGE VALUE: ₦{(COURSE_DETAILS.originalPrice + totalBonusValue).toLocaleString()}
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">
            Get The Handbook + Live Training + ₦{totalBonusValue.toLocaleString()} Bonus Vault For Only <span className="text-amber-500">₦{COURSE_DETAILS.discountPrice.toLocaleString()}</span>
          </h3>

          <p className="text-xs sm:text-sm font-semibold text-white/60 max-w-2xl mx-auto">
            100% Guaranteed. If you don't build your first digital product, get a full 100% refund immediately.
          </p>

          <button
            onClick={onBuyClick}
            className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black text-xs sm:text-sm uppercase tracking-widest py-4 px-8 shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all transform hover:-translate-y-0.5"
          >
            <span>CLAIM ₦{COURSE_DETAILS.discountPrice.toLocaleString()} HANDBOOK + LIVE CLASS TICKET</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
