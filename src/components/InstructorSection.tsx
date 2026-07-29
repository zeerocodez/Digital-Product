import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, Sparkles, MapPin, CheckCircle, Video } from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';

interface InstructorSectionProps {
  onBuyClick: () => void;
}

const DEFAULT_PORTRAIT = 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80';

export const InstructorSection: React.FC<InstructorSectionProps> = ({ onBuyClick }) => {
  const [imageSrc, setImageSrc] = useState<string>(() => {
    return localStorage.getItem('nuel_author_image') || DEFAULT_PORTRAIT;
  });

  useEffect(() => {
    const handlePhotoUpdate = () => {
      const updated = localStorage.getItem('nuel_author_image');
      if (updated) setImageSrc(updated);
    };
    window.addEventListener('author_photo_updated', handlePhotoUpdate);
    return () => window.removeEventListener('author_photo_updated', handlePhotoUpdate);
  }, []);

  const handleImageError = () => {
    setImageSrc(DEFAULT_PORTRAIT);
  };

  return (
    <section className="py-16 md:py-24 bg-[#0A0A0A] border-t border-white/10 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Author Studio Photo */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glowing Border */}
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-lg blur opacity-30" />

              <div className="relative bg-[#050505] border-2 border-amber-500 p-2 shadow-2xl overflow-hidden group">
                
                {/* Camera Viewfinder Overlay Header */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between font-mono text-[10px]">
                  <div className="flex items-center gap-1.5 bg-black/80 border border-red-500/50 text-red-400 px-2.5 py-1 rounded backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold tracking-widest">● REC STUDIO</span>
                  </div>
                  <div className="bg-black/80 border border-white/20 text-amber-400 px-2 py-1 rounded backdrop-blur-md font-bold">
                    4K HDR 60FPS
                  </div>
                </div>

                {/* Corner Viewfinder Target Marks */}
                <div className="absolute top-12 left-6 z-20 text-amber-500/60 font-mono text-xs">┌</div>
                <div className="absolute top-12 right-6 z-20 text-amber-500/60 font-mono text-xs">┐</div>
                <div className="absolute bottom-16 left-6 z-20 text-amber-500/60 font-mono text-xs">└</div>
                <div className="absolute bottom-16 right-6 z-20 text-amber-500/60 font-mono text-xs">┘</div>

                <img
                  src={imageSrc}
                  onError={handleImageError}
                  alt="Nuel Effiong - Lead Author & Instructor in Studio"
                  className="w-full h-[480px] object-cover object-top contrast-105 group-hover:scale-105 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Studio & Initiative Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#0A0A0A]/95 border border-amber-500/60 p-3 backdrop-blur-md font-mono z-20">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-[9px] text-amber-500 font-bold uppercase tracking-widest">
                        <Video className="w-3 h-3 text-amber-500" />
                        <span>AFRICA'S AI CAPACITY BUILDING INITIATIVE</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wider mt-0.5">
                        {COURSE_DETAILS.author}
                      </h3>
                      <p className="text-[10px] text-white/50 font-sans">
                        Recording Live Masterclass in Studio (Lagos, Nigeria)
                      </p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/30 p-2 text-amber-400 shrink-0">
                      <Award className="w-5 h-5 text-amber-500" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Location Tag */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/60 font-mono">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>Africa's AI Capacity Building Initiative • {COURSE_DETAILS.location}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Authority */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>MEET YOUR INSTRUCTOR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase leading-tight">
              "My Goal Is To Help 10,000 Nigerian Creators Build <span className="text-amber-500">Sustainable Revenue</span> With AI."
            </h2>

            <div className="space-y-4 text-white/70 text-sm sm:text-base leading-relaxed">
              <p>
                Hello, I’m <strong className="text-white">{COURSE_DETAILS.author}</strong>, Founder of <strong className="text-white">{COURSE_DETAILS.publisher}</strong>. Over the last 4 years, I’ve built and automated multiple digital products—ranging from PDF guides and Notion templates to prompt libraries and WhatsApp sales bots.
              </p>
              <p>
                I authored <strong className="text-amber-400">{COURSE_DETAILS.title}</strong> specifically for Nigerian creators, students, freelancers, and side-hustlers who want a clear, step-by-step roadmap to generate legitimate income without physical inventory or complex setup.
              </p>
            </div>

            {/* Core Stats Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2 font-mono">
              <div className="bg-[#050505] border border-white/10 p-3 text-center">
                <div className="text-xl sm:text-2xl font-bold text-amber-500">{COURSE_DETAILS.studentsEnrolled}</div>
                <div className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">Students Taught</div>
              </div>
              <div className="bg-[#050505] border border-white/10 p-3 text-center">
                <div className="text-xl sm:text-2xl font-bold text-amber-500">8 Modules</div>
                <div className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">PDF + Live Masterclass</div>
              </div>
              <div className="bg-[#050505] border border-white/10 p-3 text-center">
                <div className="text-xl sm:text-2xl font-bold text-amber-500">4.9 / 5</div>
                <div className="text-[9px] text-white/40 uppercase tracking-wider mt-0.5">Average Rating</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2 pt-2 text-xs sm:text-sm text-white/80 font-sans">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Includes direct entry to Nuel's upcoming live Zoom training session</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Step-by-step local payment integration with Selar, Paystack & Flutterwave</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span>30-Day 100% money-back guarantee backed by Zeerocodes Automation Ltd</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onBuyClick}
                className="group inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-xs sm:text-sm py-3.5 px-6 shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>JOIN NUEL'S LIVE CLASS & GET HANDBOOK</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
