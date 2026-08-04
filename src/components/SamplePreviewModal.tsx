import React, { useState } from 'react';
import { X, Download, FileText, Sparkles, CheckCircle2, Lock, Copy, Check } from 'lucide-react';

interface SamplePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBuyClick: (offerId?: 'pdf_only' | 'pdf_mentorship') => void;
}

export const SamplePreviewModal: React.FC<SamplePreviewModalProps> = ({ isOpen, onClose, onBuyClick }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  if (!isOpen) return null;

  const samplePrompts = [
    {
      title: 'High-Demand Digital Niche Finder Prompt',
      prompt: 'Act as a digital product strategist. Analyze Etsy and Gumroad trending search data for 2026. Give me 5 micro-niches in the "Productivity & AI" space with high buyer intent, low competition, and price points between $17-$37.',
    },
    {
      title: '10-Minute E-Book Outline Generator',
      prompt: 'Create a 6-chapter comprehensive outline for a 20-page digital workbook titled "AI Prompt Engineering for Busy Professionals". Include chapter titles, key bullet points, and 3 actionable exercise templates for each chapter.',
    },
  ];

  const handleCopyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail.trim()) {
      setEmailSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0A0A0A] border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-[#F5F5F5] relative p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-white/40 hover:text-white bg-[#050505] border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold px-3 py-1 font-mono uppercase tracking-widest">
            <FileText className="w-3 h-3" />
            <span>FREE DIGITAL PRODUCT PROMPT PACK PREVIEW</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
            THE DIGITAL PRODUCT PROMPT PACK
          </h3>
          <p className="text-xs sm:text-sm text-white/60">
            From Idea to Sale: How to Build a PDF Guide People Will Actually Pay For. Get a sneak peek & test sample master prompts below!
          </p>
        </div>

        {!emailSubmitted ? (
          <form onSubmit={handleEmailSubmit} className="bg-[#050505] border border-white/10 p-5 space-y-4 font-mono">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
              Where should we send your full downloadable PDF preview?
            </h4>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="flex-1 bg-[#0A0A0A] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest px-5 py-3 text-xs transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
              >
                <Download className="w-4 h-4" />
                <span>Unlock Sample</span>
              </button>
            </div>
            <p className="text-[10px] text-white/40">
              🔒 100% Free. No credit card required. Instant download link.
            </p>
          </form>
        ) : (
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 text-xs text-amber-500 font-mono font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Sample PDF unlocked! Check your sample prompts below:</span>
          </div>
        )}

        {/* Sample Chapter Preview Excerpt */}
        <div className="space-y-4 font-mono">
          <h4 className="text-xs font-bold text-white/60 uppercase tracking-widest">
            SAMPLE MASTER AI PROMPTS:
          </h4>

          <div className="space-y-3">
            {samplePrompts.map((item, idx) => (
              <div key={idx} className="bg-[#050505] border border-white/10 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-500 flex items-center gap-1 uppercase tracking-wider font-sans">
                    <Sparkles className="w-3.5 h-3.5" /> {item.title}
                  </span>
                  <button
                    onClick={() => handleCopyPrompt(item.prompt, idx)}
                    className="text-[10px] font-bold text-white/70 bg-[#0A0A0A] border border-white/10 hover:border-amber-500/40 px-2.5 py-1 uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-amber-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs font-mono bg-[#0A0A0A] text-white/80 p-3 border border-white/5 leading-relaxed">
                  "{item.prompt}"
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#050505] border border-amber-500/30 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="font-bold text-white uppercase tracking-wider font-sans block">Ready for the Complete Handbook + Live Masterclass?</span>
              <span className="text-white/50 text-[11px] font-mono">Get instant access to all 8 modules + Live Zoom Class for ₦5,500 (or PDF guide for ₦1,000)</span>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  onClose();
                  onBuyClick('pdf_only');
                }}
                className="bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider text-[11px] px-3 py-2.5 rounded transition-all border border-white/20 cursor-pointer"
              >
                PDF Only (₦1,000)
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBuyClick('pdf_mentorship');
                }}
                className="bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-[11px] px-4 py-2.5 rounded transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] cursor-pointer"
              >
                Live Class (₦5,500)
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
