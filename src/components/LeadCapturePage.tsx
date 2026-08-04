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
  Smartphone,
  Star,
  Zap,
  Calendar,
  Lock,
  ChevronRight,
  Send,
  BookOpen,
  TrendingUp,
  FileText,
  DollarSign,
  Play,
  HelpCircle,
  Check,
  AlertCircle
} from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';
import { ThankYouPage } from './ThankYouPage';

interface LeadCapturePageProps {
  onGoToSalesPage: () => void;
  onGoToThankYouPage?: () => void;
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
  onGoToThankYouPage,
  onAdminClick
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState('Beginner looking for extra income');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(18);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // WhatsApp group link from localStorage or default
  const [whatsappLink, setWhatsappLink] = useState(() => {
    const saved = localStorage.getItem('admin_whatsapp_group_url');
    if (!saved || saved.includes('G9x8K19m7LVL2038')) {
      localStorage.setItem('admin_whatsapp_group_url', 'https://chat.whatsapp.com/IZ2z0e9BwFqBMCAG6IBMCs');
      return 'https://chat.whatsapp.com/IZ2z0e9BwFqBMCAG6IBMCs';
    }
    return saved;
  });

  // Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 6,
    minutes: 18,
    seconds: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 0, hours: 2, minutes: 15, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Set document title dynamically
  useEffect(() => {
    document.title = "Free AI PDF Masterclass Nigeria | Create & Sell Digital Products";
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

  const scrollToForm = () => {
    const formElement = document.getElementById('optin-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert('Please fill in your name, active WhatsApp phone number, and email.');
      return;
    }

    setIsSubmitting(true);

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

      if (onGoToThankYouPage) {
        onGoToThankYouPage();
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800);
  };

  if (isSubmitted) {
    return (
      <ThankYouPage 
        leadName={name}
        leadPhone={phone}
        onGoToSalesPage={onGoToSalesPage}
        onGoToLeadPage={() => setIsSubmitted(false)}
        onAdminClick={onAdminClick}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* TOP URGENCY BANNER */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-black py-2 px-4 font-mono text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md">
        <span className="w-2 h-2 rounded-full bg-black animate-ping shrink-0" />
        <span>FREE LIVE WHATSAPP MASTERCLASS • LIMITED TO 100 SERIOUS LEARNERS ONLY</span>
        <span className="hidden sm:inline-block bg-black/15 px-2 py-0.5 rounded text-[10px] font-bold">
          {seatsLeft} SEATS LEFT
        </span>
      </div>

      {/* MAIN CONTAINER (Constrained Max-Width ~650px for tight mobile conversion) */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-9">
        
        {/* BRAND NAVBAR */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-emerald-500 text-black flex items-center justify-center font-black text-sm shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              AI
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-white uppercase">
                AI Income Academy
              </div>
              <div className="text-[10px] text-emerald-400 font-mono">
                By {COURSE_DETAILS.author}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className="text-[10px] font-mono text-white/50 hover:text-white underline"
              >
                Admin
              </button>
            )}
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="text-center space-y-4">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            <Video className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>FREE LIVE WHATSAPP MASTERCLASS</span>
          </div>

          {/* Strong Conversion Headline */}
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
            Create AI Digital Products People Want to Buy — <span className="text-emerald-400 underline decoration-emerald-500 decoration-wavy">Using Only Your Smartphone</span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm sm:text-base text-white/80 font-sans leading-relaxed max-w-xl mx-auto">
            Learn how beginners in Nigeria are creating simple PDF guides with AI and selling them through Selar, WhatsApp and Facebook.
          </p>

          {/* Practical Skills Expectations Note */}
          <div className="bg-emerald-950/20 border border-emerald-500/20 p-3 rounded-lg text-xs font-sans text-emerald-200/90 text-left sm:text-center leading-relaxed">
            💡 <strong>Practical Skills Notice:</strong> This is a practical skills class. You'll learn how to create, package, and market AI-powered digital products. Success depends on how consistently you apply what you learn.
          </div>

          {/* Class Date & Meta Bar */}
          <div className="bg-[#0A0A0A] border border-emerald-500/30 p-3 rounded-lg text-xs font-mono text-emerald-300 flex flex-wrap items-center justify-center gap-3 shadow-inner">
            <span className="flex items-center gap-1 font-bold">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Saturday
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-bold">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> 7:00 PM WAT
            </span>
            <span>•</span>
            <span>⏱️ 60 minutes</span>
            <span>•</span>
            <span className="bg-emerald-500 text-black px-2 py-0.5 rounded font-black text-[10px]">
              💯 100% FREE
            </span>
          </div>

        </div>

        {/* PROOF STRIP ABOVE THE FOLD (EXPLICIT STATS) */}
        <div className="grid grid-cols-3 gap-2 bg-[#0A0A0A] border border-white/10 p-4 rounded-xl text-center font-mono">
          <div>
            <div className="text-xl sm:text-2xl font-black text-white">2,000+</div>
            <div className="text-[10px] text-white/70 uppercase tracking-tight mt-0.5">Students Trained</div>
          </div>
          <div className="border-x border-white/10">
            <div className="text-xl sm:text-2xl font-black text-emerald-400">500+</div>
            <div className="text-[10px] text-white/70 uppercase tracking-tight mt-0.5">Digital Products Created</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 flex items-center justify-center gap-0.5">
              <span>4.9/5</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-[10px] text-white/70 uppercase tracking-tight mt-0.5">Average Student Rating</div>
          </div>
        </div>

        {/* MEET YOUR TRAINER SECTION (PLACED IMMEDIATELY AFTER HERO) */}
        <div className="bg-gradient-to-b from-[#0A0A0A] to-black border-2 border-emerald-500/30 p-5 sm:p-7 rounded-2xl space-y-4 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[9px] font-mono font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            VERIFIED INSTRUCTOR
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <img 
              src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&q=80"
              alt="Nuel Effiong - Founder AI Income Academy"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-emerald-500 object-cover shrink-0 shadow-lg shadow-emerald-500/10"
              referrerPolicy="no-referrer"
            />
            
            <div className="space-y-2 text-center sm:text-left">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                MEET YOUR TRAINER
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">Nuel Effiong</h2>
              <p className="text-xs text-emerald-400 font-mono font-bold">
                Founder, AI Income Academy & Zeerocodes
              </p>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed space-y-2.5 pt-2 border-t border-white/10">
            <p>
              I help Nigerians use Artificial Intelligence to build practical digital products and online income skills.
            </p>
            <p>
              Over the past few years I've trained students, built AI solutions and helped entrepreneurs understand how to turn knowledge into digital products people actually buy.
            </p>
            <p className="font-semibold text-emerald-300">
              In this free class I'll show you the exact beginner-friendly workflow. No fluff. No hype. Just practical implementation.
            </p>
          </div>
        </div>

        {/* 2-MINUTE VIDEO MESSAGE FROM NUEL EFFIONG */}
        <div className="bg-[#0A0A0A] border border-white/10 p-4 sm:p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase">
              <Video className="w-4 h-4 text-emerald-400" />
              <span>WATCH 2-MINUTE MESSAGE FROM NUEL</span>
            </div>
            <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded font-mono">
              ⏱️ 02:14
            </span>
          </div>

          {!isVideoPlaying ? (
            <div 
              onClick={() => setIsVideoPlaying(true)}
              className="relative aspect-video rounded-xl bg-gradient-to-br from-emerald-950/60 via-black to-slate-950 border border-emerald-500/30 overflow-hidden cursor-pointer group flex items-center justify-center shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=800&q=80"
                alt="Video Thumbnail Nuel Effiong"
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

              <div className="relative z-10 text-center space-y-2 p-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.8)] group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-black ml-1" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-white uppercase tracking-tight">
                  Tap To Watch: "Why AI Digital Products Still Work in 2026"
                </div>
                <div className="text-[10px] text-emerald-300 font-mono">
                  🔊 Turn sound on (02:14 min)
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-video rounded-xl bg-black border border-emerald-500/50 p-4 flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center text-xs font-mono text-emerald-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  PLAYING VIDEO MESSAGE
                </span>
                <button 
                  onClick={() => setIsVideoPlaying(false)}
                  className="text-white/60 hover:text-white underline text-[10px]"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2 text-center py-4">
                <div className="text-sm font-bold text-white">
                  "Hi, I'm Nuel. If you're seeing this page, you're probably wondering whether creating AI digital products still works in Nigeria..."
                </div>
                <p className="text-xs text-white/70 italic">
                  "The answer is 100% yes. In this free live class, I'll walk you through the exact smartphone workflow."
                </p>
              </div>

              <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                <div className="bg-emerald-500 h-full w-2/3 animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {/* "IF YOU'VE EVER SAID..." EMOTIONAL CONNECTION SECTION */}
        <div className="bg-[#0A0A0A] border border-white/10 p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
            IF YOU'VE EVER SAID...
          </h3>

          <div className="space-y-2.5 font-sans text-xs sm:text-sm text-white/90">
            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-amber-400 text-base shrink-0">💬</span>
              <span><em>"I don't know what to sell online."</em></span>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-amber-400 text-base shrink-0">💬</span>
              <span><em>"I don't have capital to buy physical goods."</em></span>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-amber-400 text-base shrink-0">💬</span>
              <span><em>"I'm not good with complicated technology."</em></span>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-amber-400 text-base shrink-0">💬</span>
              <span><em>"I only have my smartphone."</em></span>
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-xl text-center text-xs sm:text-sm font-bold text-emerald-300">
            👉 Then this free 60-minute live masterclass was created specifically for you!
          </div>
        </div>

        {/* OPT-IN FORM / WHATSAPP ACCESS BOX */}
        <div id="optin-form" className="scroll-mt-6">
          {!isSubmitted ? (
            <div className="bg-[#0A0A0A] border-2 border-emerald-500 p-5 sm:p-7 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.3)] space-y-5">
              
              {/* COUNTDOWN TIMER HEADER */}
              <div className="bg-emerald-950/50 border border-emerald-500/40 p-3.5 rounded-xl text-center space-y-2">
                <div className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span>REGISTRATION CLOSES IN:</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 font-mono text-emerald-400">
                  <div className="bg-black border border-emerald-500/40 px-3 py-1.5 rounded-lg text-center min-w-[52px]">
                    <span className="text-xl sm:text-2xl font-black">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="block text-[8px] text-white/50 font-bold">DAYS</span>
                  </div>
                  <span className="text-xl font-bold text-white/40">:</span>
                  <div className="bg-black border border-emerald-500/40 px-3 py-1.5 rounded-lg text-center min-w-[52px]">
                    <span className="text-xl sm:text-2xl font-black">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="block text-[8px] text-white/50 font-bold">HOURS</span>
                  </div>
                  <span className="text-xl font-bold text-white/40">:</span>
                  <div className="bg-black border border-emerald-500/40 px-3 py-1.5 rounded-lg text-center min-w-[52px]">
                    <span className="text-xl sm:text-2xl font-black">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="block text-[8px] text-white/50 font-bold">MINUTES</span>
                  </div>
                  <span className="text-xl font-bold text-white/40">:</span>
                  <div className="bg-black border border-emerald-500/40 px-3 py-1.5 rounded-lg text-center min-w-[52px]">
                    <span className="text-xl sm:text-2xl font-black">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="block text-[8px] text-white/50 font-bold">SECONDS</span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-300 font-mono font-bold">
                  🔥 {seatsLeft} Seats Remaining • Live Class Starts Saturday 7:00 PM WAT
                </div>
              </div>

              {/* FORM FIELDS */}
              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                <div>
                  <label className="block text-xs font-mono font-bold text-white/90 uppercase mb-1">
                    Your Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Udeme Okon"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-xl p-3.5 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-white/90 uppercase mb-1">
                    Your Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. udeme@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-xl p-3.5 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-white/90 uppercase mb-1">
                    Active WhatsApp Phone Number <span className="text-emerald-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <span className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-3.5 text-white/80 font-mono text-xs flex items-center shrink-0 font-bold">
                      🇳🇬 +234
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0812 345 6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black border border-white/20 rounded-xl p-3.5 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* PRIMARY DOMINANT CTA #1 */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-base sm:text-lg py-5 px-6 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all flex items-center justify-center gap-2 transform active:scale-98 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">RESERVING YOUR SEAT...</span>
                    ) : (
                      <>
                        <MessageSquare className="w-6 h-6 fill-black shrink-0" />
                        <span>🚀 RESERVE MY FREE SEAT ON WHATSAPP</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center font-mono text-[11px] text-amber-400/90 pt-1 flex items-center justify-center gap-2">
                  <span>⚠️ Limited to serious learners only • 100% Free</span>
                </div>

              </form>

            </div>
          ) : (
            /* SUBMITTED STATE: DIRECT WHATSAPP ENTRY */
            <div className="bg-[#0A0A0A] border-2 border-emerald-400 p-6 sm:p-8 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.4)] text-center space-y-5">
              <div className="w-16 h-16 bg-emerald-500 text-black rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold px-3 py-1 rounded uppercase">
                  SUCCESS! YOUR SEAT IS RESERVED
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-3">
                  FINAL STEP: Join The Official WhatsApp Class Group
                </h2>
                <p className="text-xs text-white/80 max-w-md mx-auto mt-1 font-sans">
                  Welcome <strong className="text-white">{name}</strong>! Click the green button below to enter the WhatsApp class group where the live video link & PDF workbook will be posted.
                </p>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-base sm:text-lg py-5 px-6 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all transform hover:scale-[1.02]"
              >
                <MessageSquare className="w-6 h-6 fill-black" />
                <span>ENTER WHATSAPP CLASS GROUP NOW</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <p className="text-[11px] text-emerald-400 font-mono">
                💡 Tip: Tap "Join Group" when WhatsApp opens on your phone.
              </p>
            </div>
          )}
        </div>

        {/* "WHAT HAPPENS NEXT?" SECTION (LOWERS ANXIETY) */}
        <div className="bg-[#0A0A0A] border border-white/10 p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
            WHAT HAPPENS NEXT?
          </h3>

          <div className="space-y-3 font-sans text-xs sm:text-sm text-white/80">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <p>Click the green button above & enter your name & WhatsApp number.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <p>Join the official WhatsApp class group in one tap.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <p>Receive class reminders and your free PDF workbook before class.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                4
              </div>
              <p>Attend the 60-minute live smartphone masterclass on Saturday at 7:00 PM WAT.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                5
              </div>
              <p>Ask your questions live and get direct answers from Nuel Effiong.</p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-mono font-bold text-xs flex items-center justify-center shrink-0">
                6
              </div>
              <p>Decide whether to join the premium programme for advanced mentorship.</p>
            </div>
          </div>
        </div>

        {/* PUNCHY MOBILE SCANNING BLOCK ("IMAGINE THIS..." WITH EMOTIONAL PAYOFF) */}
        <div className="bg-gradient-to-b from-[#0A0A0A] to-black border border-emerald-500/30 p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
            IMAGINE THIS...
          </h3>

          <div className="grid grid-cols-1 gap-2.5 text-xs sm:text-sm font-sans text-white/90">
            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-lg">📱</span>
              <span>Create one simple digital PDF guide</span>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-lg">🤖</span>
              <span>AI helps you write and outline it in minutes</span>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-lg">🛒</span>
              <span>Upload it to Selar for automated delivery</span>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-lg">💳</span>
              <span>Someone buys it while you sleep</span>
            </div>

            <div className="bg-black/60 border border-emerald-500/40 p-3.5 rounded-lg flex items-center gap-3 bg-emerald-950/20">
              <span className="text-xl">📲</span>
              <span className="font-bold text-emerald-400">You receive instant payment directly into your Nigerian bank account!</span>
            </div>
          </div>

          {/* REPEATED CTA #2 */}
          <div className="pt-3">
            <button
              onClick={scrollToForm}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-sm sm:text-base py-4 px-6 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 fill-black shrink-0" />
              <span>🚀 RESERVE MY FREE SEAT ON WHATSAPP</span>
            </button>
          </div>
        </div>

        {/* WHAT YOU'LL LEARN SECTION */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
            IN THIS FREE 60-MINUTE CLASS YOU'LL LEARN:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm font-sans">
            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl space-y-1.5">
              <div className="text-emerald-400 font-mono font-bold text-xs flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> 01. PRODUCT IDEAS
              </div>
              <p className="text-white/80 leading-relaxed">
                How to find PDF guide ideas that people in Nigeria are already searching and eager to pay for.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl space-y-1.5">
              <div className="text-emerald-400 font-mono font-bold text-xs flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> 02. FAST AI CREATION
              </div>
              <p className="text-white/80 leading-relaxed">
                How to use ChatGPT & Gemini to write and structure a complete 20-page guide in under 30 minutes.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl space-y-1.5">
              <div className="text-emerald-400 font-mono font-bold text-xs flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> 03. SMARTPHONE DESIGN
              </div>
              <p className="text-white/80 leading-relaxed">
                How to design beautiful, professional e-book covers and PDFs using free mobile tools.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl space-y-1.5">
              <div className="text-emerald-400 font-mono font-bold text-xs flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> 04. AUTOMATED SELAR
              </div>
              <p className="text-white/80 leading-relaxed">
                How to upload to Selar so customers pay via bank transfer/card and receive downloads 24/7.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl space-y-1.5">
              <div className="text-emerald-400 font-mono font-bold text-xs flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> 05. WHATSAPP & FB ADS
              </div>
              <p className="text-white/80 leading-relaxed">
                How to promote your guide with simple ₦2,000/day Facebook Ads & WhatsApp status strategies.
              </p>
            </div>

            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl space-y-1.5">
              <div className="text-emerald-400 font-mono font-bold text-xs flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> 06. 7-DAY ACTION PLAN
              </div>
              <p className="text-white/80 leading-relaxed">
                The step-by-step 7-day roadmap to take you from total beginner to your first digital sale.
              </p>
            </div>
          </div>

          {/* REPEATED CTA #3 */}
          <div className="pt-2">
            <button
              onClick={scrollToForm}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-sm sm:text-base py-4 px-6 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5 fill-black shrink-0" />
              <span>🚀 RESERVE MY FREE SEAT ON WHATSAPP</span>
            </button>
          </div>
        </div>

        {/* OBJECTION HANDLING / HESITATION BREAKERS */}
        <div className="bg-[#0A0A0A] border border-white/10 p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-400" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </h3>

          <div className="space-y-3 font-sans text-xs sm:text-sm">
            <div className="bg-black/60 border border-white/10 p-3.5 rounded-xl space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">Q:</span> Do I need a laptop?
              </div>
              <div className="text-white/80 pl-5">
                <strong className="text-emerald-400">No.</strong> Everything demonstrated in the masterclass works 100% from your Android or iPhone.
              </div>
            </div>

            <div className="bg-black/60 border border-white/10 p-3.5 rounded-xl space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">Q:</span> Do I need prior tech experience?
              </div>
              <div className="text-white/80 pl-5">
                <strong className="text-emerald-400">No.</strong> Absolute beginners are welcome. We break everything down step-by-step.
              </div>
            </div>

            <div className="bg-black/60 border border-white/10 p-3.5 rounded-xl space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">Q:</span> What if I don't know how to use AI?
              </div>
              <div className="text-white/80 pl-5">
                <strong className="text-emerald-400">Perfect.</strong> That's exactly who this class is designed for! You will see exact copy-paste prompts.
              </div>
            </div>

            <div className="bg-black/60 border border-white/10 p-3.5 rounded-xl space-y-1">
              <div className="font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400">Q:</span> How much is the class?
              </div>
              <div className="text-white/80 pl-5">
                <strong className="text-emerald-400">100% Free.</strong> There is no registration fee required for Saturday's masterclass.
              </div>
            </div>
          </div>
        </div>

        {/* AUTHENTIC STUDENT PROOF & SCREENSHOT SIMULATIONS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
              STUDENT PROOF & FEEDBACK:
            </h2>
            <span className="text-[10px] text-emerald-400 font-mono">VERIFIED WHATSAPP / SELAR</span>
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            
            {/* Screenshot Testimonial 1 */}
            <div className="bg-[#0A0A0A] border border-emerald-500/30 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center text-xs">
                    UO
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Udeme Okon (Uyo)</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Verified WhatsApp Message</div>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  ₦145,000 Alert
                </span>
              </div>

              <div className="bg-[#05110B] border border-emerald-500/20 p-3 rounded-lg text-xs text-emerald-200 font-mono leading-relaxed space-y-1">
                <p>💬 "Boss Nuel! I created my first 18-page PDF guide on graphic design prompts 2 days after your class. Published on Selar and made ₦145,000 this week alone!"</p>
                <div className="text-[9px] text-emerald-400/70 text-right">Today at 2:14 PM • WhatsApp Verified</div>
              </div>
            </div>

            {/* Screenshot Testimonial 2 */}
            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center text-xs">
                    CO
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Chinedu O. (Enugu)</div>
                    <div className="text-[10px] text-amber-400 font-mono">38 Copies Sold</div>
                  </div>
                </div>
                <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  Selar Verified
                </span>
              </div>

              <p className="text-xs text-white/80 font-sans italic leading-relaxed">
                “Nuel's WhatsApp class made everything crystal clear. I compiled an AI prompts guide for small business owners and sold 38 copies in my first 5 days.”
              </p>
            </div>

            {/* Screenshot Testimonial 3 */}
            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center text-xs">
                    AB
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Amina B. (Kano)</div>
                    <div className="text-[10px] text-emerald-400 font-mono">Smartphone Learner</div>
                  </div>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  ₦95,000 First Week
                </span>
              </div>

              <p className="text-xs text-white/80 font-sans italic leading-relaxed">
                “Using only my Android phone and ChatGPT, I launched an e-book for NYSC corpers. Made ₦95,000 in my first week!”
              </p>
            </div>

          </div>
        </div>

        {/* FINAL CLOSING SECTION & REPEATED CTA #5 */}
        <div className="bg-[#0A0A0A] border-2 border-emerald-500/60 p-6 sm:p-8 rounded-2xl text-center space-y-4 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase">
            READY TO CREATE YOUR FIRST AI DIGITAL PRODUCT?
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto">
            Seats for Saturday's free 60-minute WhatsApp video masterclass are strictly limited to 100 serious learners.
          </p>

          <button
            onClick={scrollToForm}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-base sm:text-lg py-5 px-6 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all flex items-center justify-center gap-2 transform active:scale-98"
          >
            <MessageSquare className="w-6 h-6 fill-black shrink-0" />
            <span>🚀 RESERVE MY FREE SEAT ON WHATSAPP</span>
          </button>

          <div className="text-[10px] font-mono text-white/50">
            ⚠️ Registration closes once 100 seats are filled.
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-6 text-center text-[11px] text-white/40 font-mono space-y-2">
          <p>© {new Date().getFullYear()} AI Income Academy • {COURSE_DETAILS.publisher}. All rights reserved.</p>
          <p className="text-[10px]">
            Facebook Disclaimer: This site is not part of the Facebook website or Meta Platforms, Inc.
          </p>
        </footer>

      </main>

      {/* STICKY BOTTOM MOBILE WHATSAPP BUTTON (DOMINANT 20% TALLER) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-black/95 backdrop-blur-lg border-t border-emerald-500/40 shadow-[0_-8px_25px_rgba(0,0,0,0.9)]">
        <button
          onClick={scrollToForm}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-xs py-4 px-4 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.7)] flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-5 h-5 fill-black shrink-0" />
          <span>🚀 RESERVE MY FREE SEAT ON WHATSAPP</span>
        </button>
      </div>

    </div>
  );
};
