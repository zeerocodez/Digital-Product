import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Smartphone, 
  Bell, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Zap,
  Users
} from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';

interface ThankYouPageProps {
  leadName?: string;
  leadPhone?: string;
  onGoToSalesPage?: () => void;
  onGoToLeadPage?: () => void;
  onAdminClick?: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  leadName,
  leadPhone,
  onGoToSalesPage,
  onGoToLeadPage,
  onAdminClick
}) => {
  // WhatsApp group link from localStorage or default
  const [whatsappLink, setWhatsappLink] = useState(() => {
    const saved = localStorage.getItem('admin_whatsapp_group_url');
    if (!saved || saved.includes('G9x8K19m7LVL2038')) {
      localStorage.setItem('admin_whatsapp_group_url', 'https://chat.whatsapp.com/IZ2z0e9BwFqBMCAG6IBMCs');
      return 'https://chat.whatsapp.com/IZ2z0e9BwFqBMCAG6IBMCs';
    }
    return saved;
  });

  // Auto redirect countdown state
  const [countdown, setCountdown] = useState<number>(5);
  const [autoRedirectEnabled, setAutoRedirectEnabled] = useState<boolean>(true);

  // Retrieve lead details if not passed as props
  const [displayLeadName, setDisplayLeadName] = useState<string>(leadName || '');

  useEffect(() => {
    if (!displayLeadName) {
      try {
        const rawLeads = localStorage.getItem('fb_ads_leads');
        if (rawLeads) {
          const leads = JSON.parse(rawLeads);
          if (Array.isArray(leads) && leads.length > 0) {
            setDisplayLeadName(leads[0].name || '');
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [displayLeadName]);

  useEffect(() => {
    document.title = "Seat Confirmed! | Join WhatsApp Group - AI Income Academy";
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

  // Auto-redirect timer logic (safely opens in a new tab instead of crashing the iframe)
  useEffect(() => {
    if (!autoRedirectEnabled) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setAutoRedirectEnabled(false);
      try {
        window.open(whatsappLink, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.error('Auto redirect blocked by popup blocker:', err);
      }
    }
  }, [countdown, autoRedirectEnabled, whatsappLink]);

  const handleManualJoin = () => {
    setAutoRedirectEnabled(false);
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* TOP CONFIRMATION BANNER */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 text-black py-2.5 px-4 font-mono text-center text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg">
        <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping shrink-0" />
        <span>SEAT RESERVED • ACTION REQUIRED BELOW TO ENTER CLASS</span>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        
        {/* BRAND HEADER */}
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

          <div className="flex items-center gap-3 text-[11px] font-mono">
            {onGoToLeadPage && (
              <button 
                onClick={onGoToLeadPage}
                className="text-white/60 hover:text-white underline"
              >
                ← Back
              </button>
            )}
            {onAdminClick && (
              <button 
                onClick={onAdminClick}
                className="text-amber-400 hover:text-amber-300 font-bold"
              >
                Admin
              </button>
            )}
          </div>
        </div>

        {/* HERO SUCCESS CARD */}
        <div className="bg-[#0A0A0A] border-2 border-emerald-500 p-6 sm:p-8 rounded-3xl text-center space-y-6 shadow-[0_0_60px_rgba(16,185,129,0.25)] relative overflow-hidden">
          
          <div className="w-20 h-20 bg-emerald-500 text-black rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.7)] animate-bounce">
            <CheckCircle2 className="w-11 h-11 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
              🎉 REGISTRATION SUCCESSFUL
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">
              {displayLeadName ? `Congratulations, ${displayLeadName}!` : 'Congratulations! Your Seat is Reserved'}
            </h1>
            <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto font-sans leading-relaxed">
              You're officially registered for the <strong className="text-emerald-400">Free AI PDF Digital Products Masterclass</strong> with Nuel Effiong.
            </p>
          </div>

          {/* AUTO REDIRECT NOTICE BOX */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-300 font-bold">
              <Clock className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>
                {autoRedirectEnabled && countdown > 0 
                  ? `AUTOMATICALLY OPENING WHATSAPP IN ${countdown} SECOND${countdown === 1 ? '' : 'S'}...`
                  : 'READY TO JOIN WHATSAPP GROUP'
                }
              </span>
            </div>

            {/* DOMINANT PRIMARY CTA BUTTON */}
            <a
              href={whatsappLink}
              onClick={handleManualJoin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-base sm:text-lg py-5 px-6 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.7)] transition-all transform active:scale-98 cursor-pointer"
            >
              <MessageSquare className="w-6 h-6 fill-black shrink-0" />
              <span>JOIN THE WHATSAPP CLASS GROUP NOW</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </a>

            {autoRedirectEnabled && countdown > 0 && (
              <button
                type="button"
                onClick={() => setAutoRedirectEnabled(false)}
                className="text-[10px] text-white/50 hover:text-white underline block mx-auto"
              >
                Pause automatic redirect
              </button>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-amber-400/90 font-mono">
            <span>💡 Tap "Join Group" on WhatsApp to secure your spot inside the class.</span>
          </div>

        </div>

        {/* 3 STEPS TO PREPARE FOR CLASS */}
        <div className="bg-[#0A0A0A] border border-white/10 p-5 sm:p-7 rounded-2xl space-y-5">
          <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-white border-b border-white/10 pb-3 flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-400" />
            <span>3 QUICK STEPS TO BE READY FOR SATURDAY</span>
          </h2>

          <div className="space-y-4 font-sans text-xs sm:text-sm text-white/90">
            <div className="bg-black/60 border border-white/10 p-4 rounded-xl flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-black font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                1
              </div>
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">Join the Official WhatsApp Group</div>
                <p className="text-white/70 leading-relaxed">
                  All live video streaming links, training notifications, and Q&A updates will be posted inside the WhatsApp group.
                </p>
              </div>
            </div>

            <div className="bg-black/60 border border-white/10 p-4 rounded-xl flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-black font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                2
              </div>
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">Get Your Smartphone Ready</div>
                <p className="text-white/70 leading-relaxed">
                  You don't need a computer! Make sure your phone is charged and you have a web browser (Chrome or Safari) ready.
                </p>
              </div>
            </div>

            <div className="bg-black/60 border border-white/10 p-4 rounded-xl flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-black font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                3
              </div>
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">Download Free Class Workbook</div>
                <p className="text-white/70 leading-relaxed">
                  A free PDF workbook will be dropped inside the WhatsApp group 1 hour before class begins on Saturday at 7:00 PM WAT.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CLASS DETAILS SUMMARY CARD */}
        <div className="bg-[#0A0A0A] border border-emerald-500/30 p-5 rounded-2xl space-y-4">
          <h3 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            CLASS DETAILS & SCHEDULE
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
            <div className="bg-black/60 border border-white/10 p-3 rounded-xl">
              <div className="text-white/50 text-[10px] uppercase">DAY</div>
              <div className="text-sm font-bold text-white mt-1">Saturday</div>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-xl">
              <div className="text-white/50 text-[10px] uppercase">TIME</div>
              <div className="text-sm font-bold text-emerald-400 mt-1">7:00 PM WAT</div>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-xl">
              <div className="text-white/50 text-[10px] uppercase">VENUE</div>
              <div className="text-sm font-bold text-white mt-1">WhatsApp Live</div>
            </div>

            <div className="bg-black/60 border border-white/10 p-3 rounded-xl">
              <div className="text-white/50 text-[10px] uppercase">TRAINER</div>
              <div className="text-sm font-bold text-white mt-1">Nuel Effiong</div>
            </div>
          </div>
        </div>

        {/* REPEATED SECONDARY CTA */}
        <div className="text-center space-y-3 pt-2">
          <a
            href={whatsappLink}
            onClick={handleManualJoin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-base py-4 px-6 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
          >
            <MessageSquare className="w-5 h-5 fill-black" />
            <span>CLICK HERE IF WHATSAPP DID NOT OPEN AUTOMATICALLY</span>
          </a>

          {onGoToSalesPage && (
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-white/60 mb-2 font-sans">
                Want to read the full course curriculum & handbook details?
              </p>
              <button
                onClick={onGoToSalesPage}
                className="text-xs font-mono text-amber-400 hover:text-amber-300 underline font-bold flex items-center justify-center gap-1 mx-auto"
              >
                <span>Browse Paid Learner Handbook Sales Page</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-6 text-center text-[11px] text-white/40 font-mono space-y-2">
          <p>© {new Date().getFullYear()} AI Income Academy • {COURSE_DETAILS.publisher}. All rights reserved.</p>
        </footer>

      </main>

    </div>
  );
};
