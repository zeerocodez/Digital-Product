import React, { useState, useEffect } from 'react';
import { X, Lock, ShieldCheck, CheckCircle2, ArrowRight, CreditCard, Sparkles, Download, Copy, Check, Zap, BookOpen, Users } from 'lucide-react';
import { COURSE_DETAILS, OFFERS } from '../data/courseData';
import { OrderState, OfferId } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOfferId?: OfferId;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, selectedOfferId = 'pdf_mentorship' }) => {
  const [order, setOrder] = useState<OrderState>({
    fullName: '',
    email: '',
    selectedOfferId: selectedOfferId,
    paymentMethod: 'card',
    includeOrderBump: true,
    isProcessing: false,
    isSuccess: false,
    downloadKey: '',
  });

  const [copiedKey, setCopiedKey] = useState(false);

  useEffect(() => {
    if (selectedOfferId) {
      setOrder(prev => ({ ...prev, selectedOfferId }));
    }
  }, [selectedOfferId]);

  if (!isOpen) return null;

  const activeOffer = OFFERS[order.selectedOfferId] || OFFERS.pdf_mentorship;
  const totalAmount = activeOffer.price + (order.includeOrderBump ? COURSE_DETAILS.regularPriceBump : 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrder((prev) => ({ ...prev, isProcessing: true }));

    // Simulate instant payment verification & download token generation
    setTimeout(() => {
      const generatedKey = 'NG-AI-' + Math.random().toString(36).substring(2, 9).toUpperCase() + '-2026';
      setOrder((prev) => ({
        ...prev,
        isProcessing: false,
        isSuccess: true,
        downloadKey: generatedKey,
      }));
    }, 1800);
  };

  const handleCopyKey = () => {
    if (order.downloadKey) {
      navigator.clipboard.writeText(order.downloadKey);
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0A0A0A] border border-white/10 max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl text-[#F5F5F5] relative p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-white/40 hover:text-white bg-[#050505] border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!order.isSuccess ? (
          <>
            {/* Header */}
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold px-3 py-1 font-mono uppercase tracking-widest">
                <Lock className="w-3 h-3" />
                <span>256-BIT SECURE NIGERIAN CHECKOUT</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
                Claim Instant Digital Access
              </h3>
              <p className="text-xs text-white/60">
                Select your offer tier below and enter your details to gain instant access.
              </p>
            </div>

            {/* OFFER SELECTION TABS IN CHECKOUT */}
            <div className="space-y-1.5 font-mono">
              <label className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                1. CHOOSE YOUR OFFER TIER:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOrder(prev => ({ ...prev, selectedOfferId: 'pdf_only' }))}
                  className={`p-3 text-left border rounded-xl transition-all ${
                    order.selectedOfferId === 'pdf_only'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg'
                      : 'bg-[#050505] border-white/10 text-white/50 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase">
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> PDF Only</span>
                    <span className="text-xs font-mono font-black text-white">₦1,000</span>
                  </div>
                  <p className="text-[9px] text-emerald-400/80 font-sans mt-1">E-Book Handbook Download</p>
                </button>

                <button
                  type="button"
                  onClick={() => setOrder(prev => ({ ...prev, selectedOfferId: 'pdf_mentorship' }))}
                  className={`p-3 text-left border rounded-xl transition-all relative ${
                    order.selectedOfferId === 'pdf_mentorship'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-[#050505] border-white/10 text-white/50 hover:border-amber-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Live VIP</span>
                    <span className="text-xs font-mono font-black text-amber-400">₦5,500</span>
                  </div>
                  <p className="text-[9px] text-amber-400/80 font-sans mt-1">PDF + Live Zoom & Mentorship</p>
                </button>
              </div>
            </div>

            {/* Direct Selar Callout for PDF Only offer */}
            {order.selectedOfferId === 'pdf_only' && (
              <div className="bg-emerald-950/40 border border-emerald-500/40 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-400 font-mono flex items-center gap-1.5 uppercase">
                    <Zap className="w-3.5 h-3.5 fill-emerald-400" /> Instant Selar Store Link Available
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                    ₦1,000 ONLY
                  </span>
                </div>
                <p className="text-xs text-emerald-100/80 font-sans leading-snug">
                  You can pay ₦1,000 directly via our official Selar checkout page for instant automatic file delivery to your email!
                </p>
                <a
                  href="https://selar.com/pdfmoneyblueprint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-xs py-2.5 px-4 rounded transition-all shadow-md mt-1"
                >
                  <span>GO TO SELAR STORE (https://selar.com/pdfmoneyblueprint)</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </a>
              </div>
            )}

            {/* Order Summary Box */}
            <div className="bg-[#050505] border border-white/10 p-4 space-y-3 font-mono">
              <div className="flex items-center justify-between text-[10px] font-bold border-b border-white/10 pb-2 uppercase tracking-widest text-white/40">
                <span>ITEM SUMMARY</span>
                <span>PRICE</span>
              </div>

              <div className="flex items-start justify-between gap-2 text-xs">
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wide font-sans">{activeOffer.name}</h4>
                  <p className="text-[10px] text-white/40 font-mono">{activeOffer.tagline}</p>
                </div>
                <span className="font-bold text-amber-500 font-mono">₦{activeOffer.price.toLocaleString()}</span>
              </div>

              {/* High-Converting Order Bump */}
              <div className="bg-amber-500/10 border-2 border-dashed border-amber-500/40 p-3 space-y-2 mt-2 font-sans">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={order.includeOrderBump}
                    onChange={(e) => setOrder((prev) => ({ ...prev, includeOrderBump: e.target.checked }))}
                    className="mt-1 w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-1 uppercase tracking-wider font-mono">
                      <Zap className="w-3.5 h-3.5 fill-amber-500" />
                      ONE-TIME OFFER: Add WhatsApp Sales Bot Templates (+₦{COURSE_DETAILS.regularPriceBump.toLocaleString()})
                    </span>
                    <p className="text-[11px] text-white/60 leading-tight">
                      Get our pre-written copy-paste WhatsApp autoresponder scripts to turn inquiries into paying customers automatically.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-sm font-bold">
                <span className="text-white/80 uppercase tracking-wider">TOTAL DUE TODAY:</span>
                <span className="text-2xl text-amber-500 font-mono">₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitOrder} className="space-y-4 font-mono">
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-white/60 block mb-1 uppercase tracking-widest">
                    Your Full Name:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tunde Adebayo"
                    value={order.fullName}
                    onChange={(e) => setOrder((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="w-full bg-[#050505] border border-white/10 px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-white/60 block mb-1 uppercase tracking-widest">
                    Your Email Address (For Delivery & Zoom Link):
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tunde@example.com"
                    value={order.email}
                    onChange={(e) => setOrder((prev) => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-[#050505] border border-white/10 px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Payment Selector Tabs */}
                <div>
                  <label className="text-[10px] font-bold text-white/60 block mb-1.5 uppercase tracking-widest">
                    Select Preferred Payment Method:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrder((prev) => ({ ...prev, paymentMethod: 'paystack' }))}
                      className={`py-2 px-2 border text-[11px] font-bold flex items-center justify-center gap-1 transition-all uppercase tracking-wider ${
                        order.paymentMethod === 'paystack'
                          ? 'bg-amber-500 text-black border-amber-500'
                          : 'bg-[#050505] text-white/60 border-white/10'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5" /> Paystack
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrder((prev) => ({ ...prev, paymentMethod: 'bank_transfer' }))}
                      className={`py-2 px-2 border text-[11px] font-bold flex items-center justify-center gap-1 transition-all uppercase tracking-wider ${
                        order.paymentMethod === 'bank_transfer'
                          ? 'bg-amber-500 text-black border-amber-500'
                          : 'bg-[#050505] text-white/60 border-white/10'
                      }`}
                    >
                      Bank Transfer
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrder((prev) => ({ ...prev, paymentMethod: 'flutterwave' }))}
                      className={`py-2 px-2 border text-[11px] font-bold flex items-center justify-center gap-1 transition-all uppercase tracking-wider ${
                        order.paymentMethod === 'flutterwave'
                          ? 'bg-amber-500 text-black border-amber-500'
                          : 'bg-[#050505] text-white/60 border-white/10'
                      }`}
                    >
                      Flutterwave
                    </button>

                    <button
                      type="button"
                      onClick={() => setOrder((prev) => ({ ...prev, paymentMethod: 'card' }))}
                      className={`py-2 px-2 border text-[11px] font-bold flex items-center justify-center gap-1 transition-all uppercase tracking-wider ${
                        order.paymentMethod === 'card'
                          ? 'bg-amber-500 text-black border-amber-500'
                          : 'bg-[#050505] text-white/60 border-white/10'
                      }`}
                    >
                      Naira Card
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={order.isProcessing}
                className="w-full group flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-xs sm:text-sm py-4 px-6 shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
              >
                {order.isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment via {order.paymentMethod.toUpperCase()}...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-black" />
                    <span>PAY ₦{totalAmount.toLocaleString()} & GET ACCESS NOW</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-white/40 text-center font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant Access Details Delivered to Email + WhatsApp</span>
              </div>
            </form>
          </>
        ) : (
          /* Order Confirmation Success View */
          <div className="space-y-6 text-center py-4 font-mono">
            <div className="w-16 h-16 bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 border border-amber-500/20">
                ORDER SUCCESSFUL!
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider font-sans">
                Welcome To The AI Academy!
              </h3>
              <p className="text-xs text-white/60 max-w-sm mx-auto font-sans">
                Your payment of <strong className="text-amber-500">₦{totalAmount.toLocaleString()}</strong> for <strong className="text-white">{activeOffer.name}</strong> was confirmed. Your digital license key has been generated below:
              </p>
            </div>

            {/* License Key Box */}
            <div className="bg-[#050505] border border-amber-500/40 p-4 space-y-2 text-center">
              <div className="text-[10px] text-white/40 uppercase tracking-widest">YOUR DIGITAL LICENSE KEY:</div>
              <div className="text-xl sm:text-2xl font-black text-amber-400 tracking-wider">
                {order.downloadKey}
              </div>

              <button
                onClick={handleCopyKey}
                className="inline-flex items-center gap-1.5 text-xs text-amber-500 hover:text-amber-400 font-bold uppercase tracking-wider pt-1"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey ? 'COPIED TO CLIPBOARD!' : 'COPY LICENSE KEY'}</span>
              </button>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => alert(`Downloading PDF Guide Handbook (${activeOffer.name})...`)}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-xs py-4 px-6 shadow-lg transition-all"
              >
                <Download className="w-4 h-4 fill-black" />
                <span>DOWNLOAD HANDBOOK PDF IMMEDIATELY</span>
              </button>

              <button
                onClick={onClose}
                className="w-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-bold uppercase tracking-wider text-xs py-3 px-4 border border-white/10"
              >
                Return to Website
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
