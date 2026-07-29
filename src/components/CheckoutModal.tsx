import React, { useState } from 'react';
import { X, Lock, ShieldCheck, CheckCircle2, ArrowRight, CreditCard, Sparkles, Download, Copy, Check, Zap } from 'lucide-react';
import { COURSE_DETAILS } from '../data/courseData';
import { OrderState } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [order, setOrder] = useState<OrderState>({
    fullName: '',
    email: '',
    paymentMethod: 'card',
    includeOrderBump: true,
    isProcessing: false,
    isSuccess: false,
    downloadKey: '',
  });

  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const totalAmount = COURSE_DETAILS.discountPrice + (order.includeOrderBump ? COURSE_DETAILS.regularPriceBump : 0);

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
      setTimeout(() => setCopiedKey(null as any), 2000);
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
                Claim Instant Digital Access + Live Class
              </h3>
              <p className="text-xs text-white/60">
                Unlock the entire handbook, 500+ AI prompt vault, and Live Zoom Training Pass immediately.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="bg-[#050505] border border-white/10 p-4 space-y-3 font-mono">
              <div className="flex items-center justify-between text-[10px] font-bold border-b border-white/10 pb-2 uppercase tracking-widest text-white/40">
                <span>ITEM SUMMARY</span>
                <span>PRICE</span>
              </div>

              <div className="flex items-start justify-between gap-2 text-xs">
                <div>
                  <h4 className="font-bold text-white uppercase tracking-wide font-sans">{COURSE_DETAILS.title}</h4>
                  <p className="text-[10px] text-white/40 font-mono">Includes 8 PDF Modules + Live Zoom Masterclass + ₦45,000 Bonus Vault</p>
                </div>
                <span className="font-bold text-amber-500 font-mono">₦{COURSE_DETAILS.discountPrice.toLocaleString()}</span>
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
                        order.paymentMethod === 'paystack' || order.paymentMethod === 'card'
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
                className="w-full group flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-xs sm:text-sm py-4 px-6 shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all"
              >
                {order.isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment via {order.paymentMethod.toUpperCase()}...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-black" />
                    <span>PAY ₦{totalAmount.toLocaleString()} & GET ACCESS</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-white/40 text-center font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant PDF Download + Live Zoom Invite Sent to Email</span>
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
                Welcome To The Inner Circle!
              </h3>
              <p className="text-xs text-white/60 max-w-sm mx-auto font-sans">
                Thank you <strong>{order.fullName}</strong>. A confirmation email with your access link has been dispatched to <strong>{order.email}</strong>.
              </p>
            </div>

            {/* Generated License & Token Box */}
            <div className="bg-[#050505] border border-amber-500/40 p-5 space-y-3 text-left">
              <div className="flex items-center justify-between text-xs font-bold text-amber-500">
                <span>YOUR INSTANT DOWNLOAD KEY:</span>
                <span className="text-[10px] bg-amber-500/10 px-2 py-0.5 border border-amber-500/20 text-amber-500">ACTIVATED</span>
              </div>

              <div className="flex items-center justify-between bg-[#0A0A0A] border border-white/10 p-3 font-mono text-sm font-bold text-white">
                <span>{order.downloadKey}</span>
                <button
                  onClick={handleCopyKey}
                  className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 uppercase tracking-wider"
                >
                  {copiedKey ? <Check className="w-4 h-4 text-amber-500" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedKey ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <p className="text-[10px] text-white/40">
                Use this token to access the course portal, prompt vault, and Canva templates.
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  alert('Launching Course Member Dashboard & Download Portal...');
                }}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-xs py-3.5 px-6 shadow-[0_0_20px_rgba(245,158,11,0.25)] transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Open Student Portal & Access Vault</span>
              </button>

              <button
                onClick={onClose}
                className="w-full text-xs font-bold text-white/40 hover:text-white py-2 uppercase tracking-wider"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
