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
  DollarSign
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
  const [seatsLeft, setSeatsLeft] = useState(18);

  // WhatsApp group link from localStorage or default
  const [whatsappLink, setWhatsappLink] = useState(() => {
    return localStorage.getItem('admin_whatsapp_group_url') || 'https://chat.whatsapp.com/G9x8K19m7LVL2038';
  });

  // Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 8,
    minutes: 42,
    seconds: 15
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

      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 800);
  };

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
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
        
        {/* BRAND NAVBAR */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-emerald-500 text-black flex items-center justify-center font-black text-sm shadow-[0_0_15px_rgba(16,185,129,0.4)]">
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

        {/* PROOF STRIP ABOVE THE FOLD */}
        <div className="grid grid-cols-3 gap-2 bg-[#0A0A0A] border border-white/10 p-4 rounded-xl text-center font-mono">
          <div>
            <div className="text-lg sm:text-2xl font-black text-white">2,000+</div>
            <div className="text-[10px] text-white/60 uppercase">Students Reached</div>
          </div>
          <div className="border-x border-white/10">
            <div className="text-lg sm:text-2xl font-black text-emerald-400">500+</div>
            <div className="text-[10px] text-white/60 uppercase">Products Created</div>
          </div>
          <div>
            <div className="text-lg sm:text-2xl font-black text-amber-400 flex items-center justify-center gap-0.5">
              <span>4.9/5</span>
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-[10px] text-white/60 uppercase">Student Rating</div>
          </div>
        </div>

        {/* OPT-IN FORM / WHATSAPP ACCESS BOX */}
        <div id="optin-form" className="scroll-mt-6">
          {!isSubmitted ? (
            <div className="bg-[#0A0A0A] border-2 border-emerald-500/80 p-5 sm:p-7 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.2)] space-y-5">
              
              {/* COUNTDOWN TIMER HEADER */}
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-lg text-center space-y-1.5">
                <div className="text-[10px] font-mono font-bold text-white/70 uppercase tracking-widest flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span>REGISTRATION CLOSES IN:</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 font-mono text-emerald-400">
                  <div className="bg-black border border-emerald-500/40 px-2.5 py-1 rounded text-center">
                    <span className="text-lg sm:text-xl font-black">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="block text-[8px] text-white/50">DAYS</span>
                  </div>
                  <span className="text-lg font-bold text-white/40">:</span>
                  <div className="bg-black border border-emerald-500/40 px-2.5 py-1 rounded text-center">
                    <span className="text-lg sm:text-xl font-black">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="block text-[8px] text-white/50">HRS</span>
                  </div>
                  <span className="text-lg font-bold text-white/40">:</span>
                  <div className="bg-black border border-emerald-500/40 px-2.5 py-1 rounded text-center">
                    <span className="text-lg sm:text-xl font-black">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="block text-[8px] text-white/50">MINS</span>
                  </div>
                  <span className="text-lg font-bold text-white/40">:</span>
                  <div className="bg-black border border-emerald-500/40 px-2.5 py-1 rounded text-center">
                    <span className="text-lg sm:text-xl font-black">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="block text-[8px] text-white/50">SECS</span>
                  </div>
                </div>
              </div>

              {/* FORM FIELDS */}
              <form onSubmit={handleSubmit} className="space-y-3.5 font-sans">
                <div>
                  <label className="block text-xs font-mono font-bold text-white/80 uppercase mb-1">
                    Your Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Udeme Okon"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-white/80 uppercase mb-1">
                    Your Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. udeme@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/20 rounded-lg p-3 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-white/80 uppercase mb-1">
                    Active WhatsApp Phone Number <span className="text-emerald-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <span className="bg-white/10 border border-white/20 rounded-lg px-3 py-3 text-white/70 font-mono text-xs flex items-center shrink-0">
                      🇳🇬 +234
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0812 345 6789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-black border border-white/20 rounded-lg p-3 text-white text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* PRIMARY CTA #1 */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-sm sm:text-base py-4 px-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2 transform active:scale-95"
                  >
                    {isSubmitting ? (
                      <span className="animate-pulse">RESERVING YOUR SEAT...</span>
                    ) : (
                      <>
                        <MessageSquare className="w-5 h-5 fill-black shrink-0" />
                        <span>JOIN THE FREE CLASS ON WHATSAPP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center font-mono text-[10px] text-amber-400/90 pt-1 flex items-center justify-center gap-2">
                  <span>⚠️ Limited to serious learners only • 100% Free</span>
                </div>

              </form>

            </div>
          ) : (
            /* SUBMITTED STATE: DIRECT WHATSAPP ENTRY */
            <div className="bg-[#0A0A0A] border-2 border-emerald-400 p-6 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.3)] text-center space-y-5">
              <div className="w-14 h-14 bg-emerald-500 text-black rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold px-3 py-1 rounded uppercase">
                  SUCCESS! YOUR SEAT IS RESERVED
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-3">
                  FINAL STEP: Join The Official WhatsApp Class Group
                </h2>
                <p className="text-xs text-white/70 max-w-md mx-auto mt-1 font-sans">
                  Welcome <strong className="text-white">{name}</strong>! Click the green button below to enter the WhatsApp class group where the live video link & PDF workbook will be posted.
                </p>
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-sm sm:text-base py-4 px-6 rounded-xl shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all transform hover:scale-[1.02]"
              >
                <MessageSquare className="w-5 h-5 fill-black" />
                <span>ENTER WHATSAPP CLASS GROUP NOW</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-[11px] text-emerald-400 font-mono">
                💡 Tip: Tap "Join Group" when WhatsApp opens on your phone.
              </p>
            </div>
          )}
        </div>

        {/* WHO THIS IS FOR SECTION */}
        <div className="bg-[#0A0A0A] border border-white/10 p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3">
            THIS TRAINING IS FOR YOU IF:
          </h3>

          <ul className="space-y-3 text-xs sm:text-sm text-white/80 font-sans">
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </div>
              <span>You have an <strong>Android or iOS smartphone</strong> and internet access.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </div>
              <span>You want a <strong>practical digital skill</strong>, not another "get rich quick" scheme.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                ✓
              </div>
              <span>You are ready to create your <strong>first AI digital product within 7 days</strong>.</span>
            </li>
          </ul>
        </div>

        {/* PUNCHY MOBILE SCANNING BLOCK ("IMAGINE THIS...") */}
        <div className="bg-gradient-to-b from-[#0A0A0A] to-black border border-emerald-500/30 p-5 sm:p-6 rounded-2xl space-y-4">
          <h3 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
            IMAGINE THIS...
          </h3>

          <div className="grid grid-cols-1 gap-2.5 text-xs sm:text-sm font-sans text-white/90">
            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-lg">📱</span>
              <span>Create a simple digital guide on your smartphone</span>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-lg">🤖</span>
              <span>Use AI (ChatGPT/Gemini) to write the first draft in minutes</span>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-lg">🛒</span>
              <span>Upload it to Selar for automated 24/7 delivery</span>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-lg">💬</span>
              <span>Promote it on WhatsApp & Facebook effortlessly</span>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-lg flex items-center gap-3">
              <span className="text-lg">💳</span>
              <span className="font-bold text-emerald-400">Get paid directly to your Nigerian bank account when someone buys!</span>
            </div>
          </div>

          {/* REPEATED CTA #2 */}
          <div className="pt-3">
            <button
              onClick={scrollToForm}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-black shrink-0" />
              <span>JOIN THE FREE CLASS ON WHATSAPP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* WHAT YOU'LL LEARN SECTION (6 REWRITTEN BULLETS) */}
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
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-black shrink-0" />
              <span>JOIN THE FREE CLASS ON WHATSAPP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* FOUNDER / TRAINER SECTION */}
        <div className="bg-[#0A0A0A] border border-white/10 p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            MEET YOUR TRAINER
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              alt="Nuel Effiong - Founder AI Income Academy"
              className="w-20 h-20 rounded-full border-2 border-emerald-500 object-cover shrink-0 shadow-lg"
            />
            
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-bold text-white">Nuel Effiong</h3>
              <p className="text-xs text-emerald-400 font-mono">Founder, AI Income Academy & Zeerocodes</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed italic">
            "I help Nigerians use AI and automation to create digital products, attract customers and build income skills from their smartphones. This free class is a practical introduction to the exact workflow I teach inside my premium programme."
          </p>

          {/* REPEATED CTA #4 */}
          <div className="pt-2">
            <button
              onClick={scrollToForm}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-xs sm:text-sm py-3.5 px-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-black shrink-0" />
              <span>JOIN THE FREE CLASS ON WHATSAPP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* REAL PROOF & TESTIMONIALS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white">
              WHAT PAST STUDENTS ARE SAYING:
            </h2>
            <span className="text-[10px] text-emerald-400 font-mono">VERIFIED SELAR / WHATSAPP</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            
            {/* Testimonial 1 */}
            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs sm:text-sm">Udeme, Uyo</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  ₦145,000 Earned
                </span>
              </div>
              <p className="text-xs text-white/80 font-sans italic leading-relaxed">
                “I created my first PDF guide two days after Nuel's class and published it on Selar. I was shocked when the first alert dropped on WhatsApp!”
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs sm:text-sm">Chinedu O., Enugu</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  38 Copies Sold
                </span>
              </div>
              <p className="text-xs text-white/80 font-sans italic leading-relaxed">
                “Nuel's WhatsApp class made it so straightforward. I compiled an AI prompts guide for business owners and sold 38 copies in my first 5 days.”
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#0A0A0A] border border-white/10 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs sm:text-sm">Amina B., Kano</span>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                  ₦95,000 First Week
                </span>
              </div>
              <p className="text-xs text-white/80 font-sans italic leading-relaxed">
                “Using only my smartphone and Gemini AI, I launched an e-book for corpers. Made ₦95,000 in my first week!”
              </p>
            </div>

          </div>
        </div>

        {/* FINAL CLOSING SECTION & REPEATED CTA #5 */}
        <div className="bg-[#0A0A0A] border-2 border-emerald-500/60 p-6 rounded-2xl text-center space-y-4 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
          <h2 className="text-xl sm:text-2xl font-black text-white uppercase">
            READY TO CREATE YOUR FIRST AI DIGITAL PRODUCT?
          </h2>
          <p className="text-xs sm:text-sm text-white/70 max-w-md mx-auto">
            Seats for Saturday's free 60-minute WhatsApp video masterclass are strictly limited to 100 serious learners.
          </p>

          <button
            onClick={scrollToForm}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-sm sm:text-base py-4 px-6 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all flex items-center justify-center gap-2 transform active:scale-95"
          >
            <MessageSquare className="w-5 h-5 fill-black shrink-0" />
            <span>JOIN THE FREE CLASS ON WHATSAPP</span>
            <ArrowRight className="w-4 h-4" />
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

      {/* STICKY BOTTOM MOBILE WHATSAPP BUTTON */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-black/95 backdrop-blur-lg border-t border-emerald-500/30 shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
        <button
          onClick={scrollToForm}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-wider text-xs py-3.5 px-4 rounded-lg shadow-[0_0_20px_rgba(16,185,129,0.6)] flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 fill-black shrink-0" />
          <span>JOIN FREE WHATSAPP CLASS</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
