import React from 'react';
import { Sparkles, BookOpen, FileCheck, Shield, CheckCircle2, Award, Zap } from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';

export const Product3DMockup: React.FC = () => {
  return (
    <div className="relative mx-auto max-w-xl w-full">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full -z-10 animate-pulse" />

      {/* Main Container Card */}
      <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden group">
        
        {/* Floating Badge */}
        <div className="absolute top-4 right-4 bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-1.5 backdrop-blur-md">
          <Award className="w-3.5 h-3.5" />
          <span>OFFICIAL MASTER BUNDLE</span>
        </div>

        {/* 3D Layer Visual Assembly */}
        <div className="mt-4 pt-4 flex flex-col items-center justify-center gap-6">
          
          {/* Main Book & Tablet Composite */}
          <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center">
            
            {/* Background Deck Shadow */}
            <div className="absolute bottom-2 w-3/4 h-6 bg-black/80 blur-md rounded-full transform scale-y-50" />

            {/* Main Course E-Book Box (3D Perspective) */}
            <div className="relative w-52 sm:w-60 bg-[#050505] border-2 border-amber-500 p-5 shadow-2xl transform -rotate-3 hover:rotate-0 transition-all duration-500 z-20 group-hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[8px] font-mono tracking-widest text-amber-500 font-bold uppercase">
                  NIGERIAN CREATORS HANDBOOK
                </span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>

              <div className="py-3 border-y border-amber-500/30 my-1 text-center">
                <span className="text-[9px] text-amber-400 font-mono font-bold tracking-widest block uppercase">
                  CREATE. LAUNCH. SELL. SCALE.
                </span>
                <h4 className="text-sm sm:text-base font-black text-white leading-tight uppercase tracking-wide mt-1">
                  DIGITAL PRODUCTS <br />
                  CREATION <span className="text-amber-500">WITH AI</span>
                </h4>
                <p className="text-[9px] text-white/70 mt-1 font-mono leading-tight">
                  A Comprehensive Learner’s Handbook for Nigerian Creators
                </p>
              </div>

              <div className="mt-2 text-center">
                <p className="text-[10px] font-bold text-white uppercase tracking-wider">NUEL EFFIONG</p>
                <p className="text-[8px] text-white/40 font-mono">PUBLISHED BY ZEEROCODES</p>
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono font-bold text-white/80 mt-3 pt-2 border-t border-white/10">
                <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5">
                  2026 EDITION
                </span>
                <span className="text-amber-500 font-bold">₦{COURSE_DETAILS.discountPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Secondary Item: Live Zoom Class Pass (Right Stack) */}
            <div className="absolute right-0 sm:right-2 top-4 w-44 sm:w-52 bg-[#0F0F0F] border border-amber-500 p-3 shadow-xl transform rotate-6 transition-transform group-hover:rotate-3 z-10">
              <div className="flex items-center gap-1.5 text-amber-500 text-[9px] font-bold uppercase tracking-widest mb-1">
                <Zap className="w-3.5 h-3.5 fill-amber-500" />
                <span>INCLUDED BONUS</span>
              </div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider">Live Training Course Ticket</h5>
              <p className="text-[9px] text-amber-400 mt-1 font-mono">Interactive Zoom Session + Q&A</p>
            </div>

            {/* Tertiary Item: 500+ Prompts Vault (Left Stack) */}
            <div className="absolute left-0 sm:left-2 bottom-2 w-40 sm:w-48 bg-[#050505]/95 border border-amber-500/60 p-3 shadow-lg transform -rotate-6 group-hover:-rotate-2 z-30 backdrop-blur-sm">
              <div className="flex items-center gap-1 text-amber-500 text-[9px] font-bold uppercase tracking-widest">
                <BookOpen className="w-3 h-3 text-amber-500" />
                <span>BONUS VAULT</span>
              </div>
              <p className="text-[10px] text-white/90 font-bold mt-0.5 uppercase tracking-wider">500+ AI Prompt Library</p>
            </div>

          </div>

          {/* Value Breakdown Pills */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] pt-4 border-t border-white/5 font-mono">
            <div className="bg-[#050505] border border-white/10 p-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-white/80">8 Full Modules</span>
            </div>
            <div className="bg-[#050505] border border-white/10 p-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-white/80">Live Zoom Pass</span>
            </div>
            <div className="bg-[#050505] border border-white/10 p-2 flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-white/80">500+ Prompts</span>
            </div>
          </div>

          {/* Pricing Value Tag */}
          <div className="w-full bg-amber-500/10 border border-amber-500/20 p-3 flex items-center justify-between font-mono">
            <div className="text-left">
              <span className="text-[9px] uppercase tracking-widest text-white/40 block font-semibold">
                TOTAL PACKAGE VALUE
              </span>
              <span className="text-white/40 line-through text-sm font-semibold">₦{COURSE_DETAILS.originalPrice.toLocaleString()}</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] uppercase tracking-widest text-amber-500 block font-bold">
                TODAY ONLY FEE
              </span>
              <span className="text-2xl font-bold text-amber-500">₦{COURSE_DETAILS.discountPrice.toLocaleString()}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
