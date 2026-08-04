import React from 'react';
import { Check, X, Sparkles, ShieldCheck, Zap, BookOpen, Users, ArrowRight } from 'lucide-react';
import { OFFERS } from '../data/courseData';
import { OfferId } from '../types';

interface OffersComparisonSectionProps {
  onSelectOffer: (offerId: OfferId) => void;
}

export const OffersComparisonSection: React.FC<OffersComparisonSectionProps> = ({ onSelectOffer }) => {
  const offer1 = OFFERS.pdf_only;
  const offer2 = OFFERS.pdf_mentorship;

  return (
    <section id="offers-pricing" className="py-16 sm:py-24 bg-[#050505] text-[#F5F5F5] relative overflow-hidden border-t border-white/10">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-mono font-bold px-3.5 py-1.5 uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 fill-amber-500" />
            <span>SELECT YOUR OFFER & ENROLLMENT TIER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
            2 WAYS TO JOIN THE <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              AI INCOME ACADEMY
            </span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 font-sans leading-relaxed">
            Choose whether you want the standalone PDF Guide to learn at your own pace for <strong className="text-white">₦1,000</strong>, or get the complete bundle with Live Masterclass Training & Direct Mentorship for <strong className="text-amber-400">₦5,500</strong>.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* OFFER 1: PDF GUIDE ONLY (₦1,000) */}
          <div className="bg-[#0A0A0A] border border-white/15 p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-8 relative hover:border-white/30 transition-all shadow-xl">
            
            <div className="space-y-6">
              {/* Header Badge & Name */}
              <div className="space-y-2">
                <span className="inline-block bg-white/10 text-white/80 border border-white/20 text-[11px] font-mono font-bold px-3 py-1 uppercase tracking-wider">
                  OFFER 1 • STANDALONE HANDBOOK
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-white/80" />
                  <span>{offer1.name}</span>
                </h3>
                <p className="text-xs text-white/60 font-sans">
                  {offer1.description}
                </p>
              </div>

              {/* Price Tag */}
              <div className="bg-black/80 border border-white/10 p-4 rounded-2xl flex items-baseline justify-between font-mono">
                <div>
                  <div className="text-[10px] text-white/40 uppercase tracking-widest font-bold">ONE-TIME PRICE</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-black text-white">₦{offer1.price.toLocaleString()}</span>
                    <span className="text-xs text-white/40 line-through">₦{offer1.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <span className="bg-white/10 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-widest">
                  SAVE 93%
                </span>
              </div>

              {/* Included Features */}
              <div className="space-y-3 font-sans text-xs sm:text-sm">
                <div className="text-xs font-mono font-bold text-white/50 uppercase tracking-widest">
                  WHAT IS INCLUDED:
                </div>
                <ul className="space-y-2.5">
                  {offer1.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-white/90">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Not Included Features */}
                {offer1.notIncluded && (
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="text-[11px] font-mono font-bold text-white/40 uppercase tracking-widest">
                      NOT INCLUDED IN OFFER 1:
                    </div>
                    <ul className="space-y-2">
                      {offer1.notIncluded.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-white/40 text-xs">
                          <X className="w-4 h-4 text-rose-500/70 shrink-0 mt-0.5" />
                          <span className="line-through">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Select Offer 1 CTA Button */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href={offer1.selarUrl || 'https://selar.com/pdfmoneyblueprint'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-400 text-white font-black uppercase tracking-wider text-xs sm:text-sm py-4 px-5 rounded-xl border border-emerald-400/40 shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all transform hover:-translate-y-0.5 text-center"
              >
                <span>GET PDF GUIDE FOR ₦1,000 ON SELAR</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => onSelectOffer('pdf_only')}
                className="w-full text-center text-xs text-white/50 hover:text-white font-mono underline cursor-pointer py-1"
              >
                or Pay via Bank Transfer / Card Modal
              </button>

              <div className="text-[10px] text-center font-mono text-white/40 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant Selar Store Delivery via Email & WhatsApp</span>
              </div>
            </div>

          </div>

          {/* OFFER 2: PDF GUIDE + LIVE TRAINING & MENTORSHIP (₦5,500) */}
          <div className="bg-[#0D0B05] border-2 border-amber-500 p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-8 relative shadow-[0_0_50px_rgba(245,158,11,0.25)] transform hover:-translate-y-1 transition-all">
            
            {/* Top Badge Overlay */}
            <div className="absolute -top-4 inset-x-0 flex justify-center">
              <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-mono text-[11px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 fill-black" />
                <span>RECOMMENDED VIP BUNDLE</span>
              </span>
            </div>

            <div className="space-y-6 pt-2">
              {/* Header Badge & Name */}
              <div className="space-y-2">
                <span className="inline-block bg-amber-500/20 text-amber-400 border border-amber-500/40 text-[11px] font-mono font-bold px-3 py-1 uppercase tracking-wider">
                  OFFER 2 • COMPLETE VIP MASTERCLASS
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Users className="w-6 h-6 text-amber-400" />
                  <span>{offer2.name}</span>
                </h3>
                <p className="text-xs text-white/70 font-sans">
                  {offer2.description}
                </p>
              </div>

              {/* Price Tag */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-baseline justify-between font-mono">
                <div>
                  <div className="text-[10px] text-amber-400 uppercase tracking-widest font-bold">ALL-INCLUSIVE PRICE</div>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-black text-amber-400">₦{offer2.price.toLocaleString()}</span>
                    <span className="text-xs text-white/40 line-through">₦{offer2.originalPrice.toLocaleString()}</span>
                  </div>
                </div>
                <span className="bg-amber-500 text-black font-black text-[10px] px-2.5 py-1 rounded uppercase tracking-widest">
                  BEST VALUE
                </span>
              </div>

              {/* Included Features */}
              <div className="space-y-3 font-sans text-xs sm:text-sm">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
                  EVERYTHING IN OFFER 1 PLUS:
                </div>
                <ul className="space-y-2.5">
                  {offer2.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-white">
                      <div className="w-5 h-5 rounded-full bg-amber-500 text-black flex items-center justify-center shrink-0 mt-0.5 font-bold shadow-md">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className={idx >= 4 ? "font-bold text-amber-200" : ""}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Select Offer 2 CTA Button */}
            <div className="space-y-3 pt-4 border-t border-amber-500/20">
              <button
                onClick={() => onSelectOffer('pdf_mentorship')}
                className="w-full group flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-wider text-xs sm:text-sm py-4 px-5 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all transform active:scale-98 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                <span>CLAIM PDF GUIDE + LIVE MENTORSHIP (₦5,500)</span>
                <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="text-[10px] text-center font-mono text-amber-400/80 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Instant Pass + Zoom Ticket + WhatsApp VIP Access</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
