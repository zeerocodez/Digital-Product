import React, { useState } from 'react';
import { Star, Play, ShieldCheck, ArrowRight, Zap, Download, Sparkles, Volume2, VolumeX, CheckCircle, Flame, BookOpen, Users } from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';
import { Product3DMockup } from './Product3DMockup';
import { OfferId } from '../types';

interface HeroProps {
  onBuyClick: (offerId?: OfferId) => void;
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

        {/* Live Training & Offers Announcement Callout */}
        <div className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border-2 border-amber-500 p-4 sm:p-5 text-center relative shadow-[0_0_30px_rgba(245,158,11,0.25)] animate-pulse">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-black text-xs sm:text-sm uppercase tracking-wider mb-1 font-mono">
            <Zap className="w-4 h-4 fill-amber-400 shrink-0" />
            <span>🔥 2 EXCLUSIVE OFFERS AVAILABLE TODAY 🔥</span>
            <Zap className="w-4 h-4 fill-amber-400 shrink-0" />
          </div>
          <p className="text-sm sm:text-lg font-black text-white uppercase tracking-wide">
            OFFER 1: PDF GUIDE ONLY (₦1,000) OR OFFER 2: PDF GUIDE + LIVE MENTORSHIP (₦5,500)
          </p>
          <p className="text-xs text-amber-300 mt-1 font-mono">
            Get instant PDF download, or upgrade to join Nuel Effiong's Live Masterclass & VIP WhatsApp Community!
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

              {/* CTA Box & Dual Offer Action Buttons */}
            <div className="bg-[#0A0A0A] border border-amber-500/30 p-5 sm:p-6 space-y-4 shadow-2xl rounded-2xl">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest">SELECT YOUR ENROLLMENT PACKAGE</div>
                  <div className="flex items-baseline gap-3 mt-1 font-mono">
                    <span className="text-xl sm:text-2xl font-black text-white">Offer 1: <strong className="text-white">₦1,000</strong></span>
                    <span className="text-white/30">•</span>
                    <span className="text-xl sm:text-2xl font-black text-amber-400">Offer 2: <strong className="text-amber-400">₦5,500</strong></span>
                  </div>
                </div>

                <a
                  href="#offers-pricing"
                  className="text-[11px] font-mono text-amber-400 hover:underline flex items-center gap-1 font-bold uppercase tracking-wider"
                >
                  <span>View Full Comparison</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Action Buttons Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://selar.com/pdfmoneyblueprint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center bg-emerald-600/30 hover:bg-emerald-600/40 text-white border border-emerald-500/50 font-bold uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-center"
                >
                  <div className="flex items-center gap-1.5 font-black text-sm text-emerald-300">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>BUY PDF GUIDE FOR ₦1,000 ON SELAR</span>
                  </div>
                  <span className="text-[10px] text-white/70 font-mono mt-0.5 normal-case font-normal">Instant Store Link: selar.com/pdfmoneyblueprint</span>
                </a>

                <button
                  onClick={() => onBuyClick('pdf_mentorship')}
                  className="group flex flex-col items-center justify-center bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-wider text-xs py-3.5 px-4 rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 font-black text-sm">
                    <Users className="w-4 h-4 fill-black" />
                    <span>PDF + LIVE MENTORSHIP (₦5,500)</span>
                  </div>
                  <span className="text-[10px] text-black/80 font-mono mt-0.5 normal-case font-semibold">Includes Live Zoom Class & VIP Community</span>
                </button>
              </div>

              {/* Guarantees & Payment Trust Icons */}
              <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-white/50 gap-2 font-mono border-t border-white/5">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Instant Delivery via Email & WhatsApp</span>
                </div>
                <button
                  onClick={onPreviewClick}
                  className="text-white/60 hover:text-amber-400 underline flex items-center gap-1 text-[11px]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Free Sample</span>
                </button>
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
