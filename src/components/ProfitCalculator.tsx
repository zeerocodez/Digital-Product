import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';

interface ProfitCalculatorProps {
  onBuyClick: () => void;
}

export const ProfitCalculator: React.FC<ProfitCalculatorProps> = ({ onBuyClick }) => {
  const [productPrice, setProductPrice] = useState<number>(5000);
  const [salesPerDay, setSalesPerDay] = useState<number>(3);

  const dailyRevenue = productPrice * salesPerDay;
  const monthlyRevenue = dailyRevenue * 30;
  const annualRevenue = monthlyRevenue * 12;

  return (
    <section id="calculator" className="py-16 md:py-24 bg-[#050505] border-y border-white/5 text-[#F5F5F5] relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Nigerian Income Estimator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
            Calculate Your <span className="text-amber-500">Monthly Naira</span> Income
          </h2>

          <p className="text-white/60 text-sm sm:text-base">
            Digital products have <strong>95%+ profit margins</strong> in Nigeria. Automated delivery via Selar & Paystack means sales go directly into your local Nigerian bank account 24/7.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-[#0A0A0A] border border-white/10 p-6 sm:p-10 shadow-2xl max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center font-mono">
          
          {/* Left Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Slider 1: Product Price */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-white/80">
                  Digital Product Price (Naira):
                </label>
                <span className="text-xl font-bold text-amber-500 bg-amber-500/10 px-3 py-1 border border-amber-500/20">
                  ₦{productPrice.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min="2000"
                max="25000"
                step="1000"
                value={productPrice}
                onChange={(e) => setProductPrice(Number(e.target.value))}
                className="w-full h-2 bg-white/10 appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-wider">
                <span>₦2,000 (Short E-book)</span>
                <span>₦5,000 (Guide + Prompts)</span>
                <span>₦25,000 (Master Bundle)</span>
              </div>
            </div>

            {/* Slider 2: Sales Per Day */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-white/80">
                  Estimated Sales Per Day:
                </label>
                <span className="text-xl font-bold text-amber-500 bg-amber-500/10 px-3 py-1 border border-amber-500/20">
                  {salesPerDay} {salesPerDay === 1 ? 'sale' : 'sales'}/day
                </span>
              </div>

              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={salesPerDay}
                onChange={(e) => setSalesPerDay(Number(e.target.value))}
                className="w-full h-2 bg-white/10 appearance-none cursor-pointer accent-amber-500"
              />

              <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-wider">
                <span>1 sale/day</span>
                <span>5 sales/day</span>
                <span>10 sales/day</span>
                <span>20 sales/day</span>
              </div>
            </div>

            {/* Included Edge Feature Notes */}
            <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-white/70 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Instant automated payouts into GTBank, Access, Kuda, OPay, Zenith</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Automated PDF delivery via Selar or WhatsApp Sales Bot</span>
              </div>
            </div>

          </div>

          {/* Right Outcome Column */}
          <div className="lg:col-span-5 bg-[#050505] border border-amber-500/30 p-6 text-center space-y-6 shadow-2xl relative">
            
            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 border border-amber-500/20 inline-block font-mono">
              PROJECTED PROFIT
            </span>

            <div className="space-y-1">
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">ESTIMATED MONTHLY NAIRA</p>
              <div className="text-3xl sm:text-4xl font-bold text-amber-500 font-mono tracking-tight">
                ₦{monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-amber-400 font-bold font-mono">
                (₦{dailyRevenue.toLocaleString()}/day • ₦{annualRevenue.toLocaleString()}/year)
              </p>
            </div>

            <div className="pt-2 text-xs text-white/70 leading-relaxed bg-white/5 p-3 border border-white/10 font-sans">
              💡 <strong>Instant Payback:</strong> Just <strong>2 sales</strong> at ₦5,000 completely pays for your ₦{COURSE_DETAILS.discountPrice.toLocaleString()} handbook + live training investment!
            </div>

            <button
              onClick={onBuyClick}
              className="w-full group flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-xs py-3.5 px-4 shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all cursor-pointer"
            >
              <span>Get Handbook & Live Class (₦{COURSE_DETAILS.discountPrice.toLocaleString()})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
