import React, { useState } from 'react';
import { Star, Play, ShieldCheck, ArrowRight, Zap, Download, Sparkles, Volume2, VolumeX, CheckCircle, Flame } from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';
import { Product3DMockup } from './Product3DMockup';

interface HeroProps {
  onBuyClick: () => void;
  onPreviewClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBuyClick, onPreviewClick }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-[#050505] text-[#F5F5F5]">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Top Proof Tag */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 bg-[#0A0A0A] border border-amber-500/20 px-4 py-1.5 shadow-xl">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
              ))}
            </div>
            <span className="text-xs font-semibold text-white/80">
              4.9/5 Rating from <span className="text-amber-500 font-bold">{COURSE_DETAILS.studentsEnrolled}</span> Nigerian Creators
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] px-3.5 py-1.5">
            <Flame className="w-3.5 h-3.5 fill-amber-500" />
            <span>2026 OFFICIAL HANDBOOK & LIVE MASTERCLASS</span>
          </div>
        </div>

        {/* Live Training High Voltage Announcement Callout */}
        <div className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border-2 border-amber-500 p-4 sm:p-5 text-center relative shadow-[0_0_30px_rgba(245,158,11,0.25)] animate-pulse">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-black text-xs sm:text-sm uppercase tracking-wider mb-1 font-mono">
            <Zap className="w-4 h-4 fill-amber-400 shrink-0" />
            <span>🔥 SPECIAL INCLUDED BONUS 🔥</span>
            <Zap className="w-4 h-4 fill-amber-400 shrink-0" />
          </div>
          <p className="text-sm sm:text-lg font-black text-white uppercase tracking-wide">
            PURCHASING THIS PDF GUIDE GIVES YOU ACCESS TO THE LIVE TRAINING COURSE!!
          </p>
          <p className="text-xs text-white/70 mt-1 font-mono">
            Interactive Live Zoom Masterclass + Q&A with Nuel Effiong Included at No Extra Cost!
          </p>
        </div>

        {/* Main Headline & Subheadline */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
            DIGITAL PRODUCTS CREATION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 uppercase">WITH ARTIFICIAL INTELLIGENCE</span>
          </h1>

          <p className="text-sm sm:text-base text-amber-400/90 font-mono uppercase tracking-widest font-semibold">
            {COURSE_DETAILS.tagline}
          </p>

          <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto font-normal leading-relaxed">
            Create. Launch. Sell. Scale. Master the art of building profitable digital products, e-books, Notion systems, Canva kits, and automated WhatsApp sales funnels in Nigeria.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-white/50">
            <span>Written by <strong className="text-white">{COURSE_DETAILS.author}</strong> ({COURSE_DETAILS.authorTitle})</span>
            <span className="hidden sm:inline">•</span>
            <span>Published by <strong className="text-white">{COURSE_DETAILS.publisher}</strong></span>
          </div>
        </div>

        {/* Main Grid: VSL / Video Demo & 3D Bundle Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: VSL Video Player Mockup & Direct Buy Controls */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Video Player (VSL) */}
            <div className="relative bg-[#0A0A0A] border border-white/10 overflow-hidden shadow-2xl group">
              
              {/* Video Thumbnail Background */}
              <div className="relative aspect-video bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
                
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
                  alt="Digital Products Creation with AI Masterclass"
                  className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-30 transition-opacity"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

                {/* Overlaid Play Button & Video State */}
                <div className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)] transform group-hover:scale-110 transition-all duration-300"
                    aria-label="Play Video Presentation"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-black translate-x-0.5" />
                  </button>

                  <div className="mt-4 space-y-1">
                    <span className="bg-amber-500 text-black text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-0.5">
                      SYSTEM DEMO • NUEL EFFIONG
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {isPlaying ? '▶ Playing: How Tunde Made ₦480,000 Selling AI PDFs on Selar' : 'Click To Watch: How To Launch Your AI Digital Product Store in 48 Hours'}
                    </h3>
                  </div>
                </div>

                {/* Video Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-[#0A0A0A]/90 border-t border-white/10 flex items-center justify-between text-xs text-white/60 z-20 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">[LIVE TRAINING INCLUDED]</span>
                  </div>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-amber-500" />}
                    <span className="text-[10px] uppercase tracking-widest">{isMuted ? 'Muted' : 'Sound On'}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* CTA Box & Buy Button */}
            <div className="bg-[#0A0A0A] border border-white/10 p-6 space-y-4 shadow-2xl">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-amber-500 font-mono">₦{COURSE_DETAILS.discountPrice.toLocaleString()}</span>
                  <span className="text-sm font-semibold text-white/40 line-through font-mono">₦{COURSE_DETAILS.originalPrice.toLocaleString()}</span>
                  <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">
                    87% OFF
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 border border-amber-500/20">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>PDF Handbook + Live Masterclass Ticket</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <button
                  onClick={onBuyClick}
                  className="sm:col-span-8 group relative flex items-center justify-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-xs sm:text-sm py-4 px-6 shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles className="w-4 h-4 fill-black" />
                  <span>PAY ₦{COURSE_DETAILS.discountPrice.toLocaleString()} & GET ACCESS</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onPreviewClick}
                  className="sm:col-span-4 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-bold uppercase tracking-widest text-xs py-4 px-4 border border-white/10 transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-500" />
                  <span>Free Sample</span>
                </button>
              </div>

              {/* Guarantees & Payment Trust Icons */}
              <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-white/50 gap-2 font-mono">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🔒 Paystack / Selar / Bank Transfer</span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: 3D Product Bundle Assembly */}
          <div className="lg:col-span-5">
            <Product3DMockup />
          </div>

        </div>

      </div>
    </section>
  );
};
