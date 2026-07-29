import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Video, 
  Clock, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Play, 
  Lock, 
  ChevronRight,
  Send,
  BookOpen
} from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';

interface LeadCapturePageProps {
  onGoToSalesPage: () => void;
  onAdminClick?: () => void;
}

export interface CapturedLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  goal: string;
  timestamp: string;
  source: string;
}

export const LeadCapturePage: React.FC<LeadCapturePageProps> = ({
  onGoToSalesPage,
  onAdminClick
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('Beginner looking for extra income');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(14);

  // WhatsApp group link from localStorage or default
  const [whatsappLink, setWhatsappLink] = useState(() => {
    return localStorage.getItem('admin_whatsapp_group_url') || 'https://chat.whatsapp.com/G9x8K19m7LVL2038';
  });

  // Urgency Timer
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 52 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { minutes: 15, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen for admin whatsapp link changes
  useEffect(() => {
    const handleUpdate = () => {
      const updated = localStorage.getItem('admin_whatsapp_group_url');
      if (updated) setWhatsappLink(updated);
    };
    window.addEventListener('whatsapp_link_updated', handleUpdate);
    return () => window.removeEventListener('whatsapp_link_updated', handleUpdate);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert('Please fill in your name, active WhatsApp phone number, and email.');
      return;
    }

    setIsSubmitting(true);

    // Save Lead to localStorage for Admin Portal access
    setTimeout(() => {
      const newLead: CapturedLead = {
        id: 'lead_' + Date.now(),
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim().startsWith('+') ? phone.trim() : '+234' + phone.trim().replace(/^0/, ''),
        goal,
        timestamp: new Date().toLocaleString(),
        source: 'Facebook Ads Campaign'
      };

      try {
        const existingRaw = localStorage.getItem('fb_ads_leads');
        const existing: CapturedLead[] = existingRaw ? JSON.parse(existingRaw) : [];
        const updated = [newLead, ...existing];
        localStorage.setItem('fb_ads_leads', JSON.stringify(updated));
        window.dispatchEvent(new Event('new_lead_captured'));
      } catch (err) {
        console.error('Error saving lead:', err);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setSeatsLeft(prev => Math.max(1, prev - 1));

      // Optional auto scroll to success box
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Top FB Ad Campaign Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-black py-2.5 px-4 font-mono text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md">
        <span className="w-2 h-2 rounded-full bg-black animate-ping" />
        <span>SPECIAL FACEBOOK ADS INVITATION • FREE 1-HOUR WHATSAPP VIDEO MASTERCLASS</span>
        <span className="hidden sm:inline-block bg-black/10 px-2 py-0.5 rounded text-[10px]">
          SEATS: {seatsLeft} REMAINING
        </span>
      </div>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        
        {/* Brand Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500 text-black flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              AI
            </div>
            <div>
              <div className="font-bold text-base sm:text-lg tracking-tight uppercase text-white">
                Africa's AI Capacity Building Initiative
              </div>
              <div className="text-xs text-emerald-400 font-mono">
                Hosted by {COURSE_DETAILS.author} • {COURSE_DETAILS.publisher}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onGoToSalesPage}
              className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3.5 py-2 transition-all flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>SKIP TO PAID HANDBOOK OFFER →</span>
            </button>

            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className="text-xs font-mono text-white/50 hover:text-white underline"
              >
                Admin
              </button>
            )}
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="text-center space-y-5 max-w-3xl mx-auto">
          
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
            <Video className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>FREE 1-HOUR LIVE VIDEO TRAINING (THIS SATURDAY @ 8PM WAT)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-[1.15]">
            "How To Build & Automate A <span className="text-emerald-400 underline decoration-emerald-500 decoration-wavy">₦250k–₦1.5M/Month</span> AI Digital Product Business From Your Smartphone"
          </h1>

          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-sans leading-relaxed">
            Zero coding required. No inventory needed. Join Nuel Effiong in an exclusive 1-Hour WhatsApp Video Masterclass revealing the exact blueprint 3,420+ Nigerian creators use to earn in Naira & USD.
          </p>

        </div>

        {/* CONDITIONAL DISPLAY: FORM OR WHATSAPP REDIRECT */}
        <div className="mt-10 max-w-2xl mx-auto">

          {!isSubmitted ? (
            /* FORM STATE */
            <div className="bg-[#0A0A0A] border-2 border-emerald-500/60 p-6 sm:p-8 rounded-xl shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden">
              
              {/* Top Form Header */}
              <div className="bg-emerald-500/10 border-b border-emerald-500/20 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div>
                  <h3 className="font-bold text-white uppercase text-base tracking-wider flex items-center justify-center sm:justify-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>CLAIM YOUR FREE WHATSAPP CLASS SEAT</span>
                  </h3>
                  <p className="text-xs text-white/60 font-mono mt-0.5">
                    Enter your active WhatsApp number below to receive the class link & PDF workbook.
                  </p>
                </div>

                <div className="bg-black/60 border border-emerald-500/40 px-3 py-1.5 font-mono text-center shrink-0">
                  <div className="text-[9px] text-white/50 uppercase">SEATS RESERVING FAST</div>
                  <div className="text-xs font-bold text-emerald-400">
                    {timeLeft.minutes}m {timeLeft.seconds}s LEFT
                  </div>
                </div>
              </div>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                
                <div>
                  <label className="block text-xs font-mono font-bold text-white/80 uppercase mb-1">
                    Your Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Emeka Okonkwo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded p-3 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-white/80 uppercase mb-1">
                    Your Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. emeka@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded p-3 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-white/80 uppercase mb-1">
                    Active WhatsApp Phone Number <span className="text-emerald-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <span className="bg-white/10 border border-white/20 rounded px-3 py-3 text-white/70 font-mono text-sm flex items-center">
                      🇳🇬 +234
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0812 345 6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black border border-white/20 rounded p-3 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-white/40 font-mono mt-1">
                    🔒 We respect your privacy. You will only receive class reminders on WhatsApp.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-white/80 uppercase mb-1">
                    What is your current goal?
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded p-3 text-white text-sm focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Beginner looking for extra income">Beginner looking for extra income</option>
                    <option value="Student / NYSC Corper">Student / NYSC Corper</option>
                    <option value="Freelancer / Content Creator">Freelancer / Content Creator</option>
                    <option value="Business Owner scaling with AI">Business Owner scaling with AI</option>
                  </select>
                </div>

                {/* Big WhatsApp CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-black uppercase tracking-wider text-sm sm:text-base py-4 px-6 rounded-lg shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">RESERVING YOUR WHATSAPP SEAT...</span>
                    ) : (
                      <>
                        <MessageSquare className="w-5 h-5 fill-black group-hover:scale-110 transition-transform" />
                        <span>GET FREE WHATSAPP CLASS ACCESS NOW →</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center font-mono text-[10px] text-white/50 pt-2 flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    100% Free Live Class
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-emerald-400" />
                    WhatsApp Group #4
                  </span>
                </div>

              </form>
            </div>
          ) : (
            /* SUCCESS CONFIRMATION STEP (WHATSAPP REDIRECT) */
            <div className="bg-[#0A0A0A] border-2 border-emerald-400 p-6 sm:p-8 rounded-xl shadow-[0_0_50px_rgba(16,185,129,0.3)] text-center space-y-6">
              
              <div className="w-16 h-16 bg-emerald-500 text-black rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold px-3 py-1 rounded uppercase tracking-wider">
                  SUCCESS! YOUR SEAT IS RESERVED
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-3">
                  FINAL STEP: Join The Official WhatsApp Class Group
                </h2>
                <p className="text-sm text-white/70 max-w-lg mx-auto mt-2 font-sans">
                  Welcome <strong className="text-white">{name}</strong>! Click the big green button below to enter the WhatsApp class group where the live video link and PDF workbook will be posted.
                </p>
              </div>

              {/* BIG WHATSAPP DIRECT LINK BUTTON */}
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-lg space-y-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-base sm:text-lg py-4 px-6 rounded-lg shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all transform hover:scale-[1.02]"
                >
                  <MessageSquare className="w-6 h-6 fill-black" />
                  <span>CLICK HERE TO JOIN WHATSAPP GROUP NOW</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                <p className="text-xs text-emerald-400 font-mono">
                  💡 Tip: Make sure to tap "Join Group" when WhatsApp opens.
                </p>
              </div>

              {/* BRIDGE BANNER TO PAID OFFER */}
              <div className="pt-6 border-t border-white/10 text-left bg-black/40 p-5 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    WANT TO SKIP THE FREE CLASS WAIT?
                  </span>
                  <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 font-mono">
                    FULL 8-MODULE BUNDLE
                  </span>
                </div>

                <p className="text-xs text-white/70 font-sans">
                  If you want immediate access to the full 8-module AI Digital Products Handbook, video masterclass recordings, and 1,000+ ready-to-sell prompts right now, you can proceed directly to the official sales page:
                </p>

                <button
                  onClick={onGoToSalesPage}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-wider text-xs sm:text-sm py-3 px-4 rounded transition-all flex items-center justify-center gap-2"
                >
                  <span>GO TO FULL PAID HANDBOOK & OFFER PAGE NOW</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

        {/* VALUE BULLETS: WHAT YOU WILL LEARN IN THE 1-HOUR CLASS */}
        <div className="mt-16 border-t border-white/10 pt-12 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
              WHAT YOU WILL LEARN IN THIS <span className="text-emerald-400">FREE 1-HOUR WHATSAPP MASTERCLASS</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/60 font-mono">
              Actionable tactics designed specifically for the Nigerian digital economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            
            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-lg space-y-3">
              <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold font-mono">
                01
              </div>
              <h3 className="font-bold text-white text-base">The AI Product Selection Formula</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Discover the top 5 high-demand digital product niches in Nigeria (PDF guides, prompts, templates) that people pay cash for daily.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-lg space-y-3">
              <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold font-mono">
                02
              </div>
              <h3 className="font-bold text-white text-base">Smartphone AI Content Generation</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                How to use ChatGPT & Gemini on your smartphone to write, format, and package a complete 30-page digital guide in under 2 hours.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-6 rounded-lg space-y-3">
              <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold font-mono">
                03
              </div>
              <h3 className="font-bold text-white text-base">Automated Local Payments (Selar/Paystack)</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Setup instant automated delivery so customers pay via bank transfer or card, and automatically receive their download file 24/7.
              </p>
            </div>

          </div>

        </div>

        {/* SOCIAL PROOF & TESTIMONIAL PREVIEW */}
        <div className="mt-12 bg-[#0A0A0A] border border-white/10 p-6 rounded-xl font-mono space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">
              STUDENT RESULTS FROM PREVIOUS BATCHES
            </span>
            <span className="text-[10px] text-white/50">VERIFIED WHATSAPP FEEDBACK</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-white/80">
            <div className="bg-black/60 p-4 border border-white/5 rounded space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Chinedu O. (Enugu)</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">₦420,000 Earned</span>
              </div>
              <p className="text-white/60 text-xs italic">
                "I attended Nuel's WhatsApp class last month. Implemented theSelar automation strategy and made my first 5 sales in 48 hours!"
              </p>
            </div>

            <div className="bg-black/60 p-4 border border-white/5 rounded space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Amina B. (Kano)</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">₦850,000 Earned</span>
              </div>
              <p className="text-white/60 text-xs italic">
                "The 1-hour video training completely opened my eyes. I turned my knowledge into a simple prompt library and sold 120 copies."
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-16 border-t border-white/10 pt-8 text-center text-xs text-white/40 font-mono space-y-2">
          <p>© {new Date().getFullYear()} {COURSE_DETAILS.publisher}. All rights reserved.</p>
          <p className="text-[10px]">
            Facebook Disclaimer: This site is not part of the Facebook website or Meta Platforms, Inc.
          </p>
        </footer>

      </main>

    </div>
  );
};
