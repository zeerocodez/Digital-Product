import React, { useState, useEffect } from 'react';
import { BannerNotice } from './components/BannerNotice';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProfitCalculator } from './components/ProfitCalculator';
import { InstructorSection } from './components/InstructorSection';
import { CourseCurriculum } from './components/CourseCurriculum';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BonusVaultSection } from './components/BonusVaultSection';
import { FaqSection } from './components/FaqSection';
import { SocialProofTicker } from './components/SocialProofTicker';
import { StickyBottomCTA } from './components/StickyBottomCTA';
import { CheckoutModal } from './components/CheckoutModal';
import { SamplePreviewModal } from './components/SamplePreviewModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { LeadCapturePage } from './components/LeadCapturePage';
import { Footer } from './components/Footer';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Default to standalone Lead Capture Landing Page unless ?page=sales or #sales is specified
  const [viewMode, setViewMode] = useState<'sales' | 'lead'>(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      const hash = window.location.hash;
      if (search.includes('page=sales') || hash === '#sales') {
        return 'sales';
      }
    }
    return 'lead';
  });

  const handleOpenCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
  };

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
  };

  // Sync window URL search or hash
  const handleShowLeadPage = () => {
    setViewMode('lead');
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState(null, '', '?page=lead');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowSalesPage = () => {
    setViewMode('sales');
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState(null, '', '?page=sales');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-amber-500 selection:text-black antialiased">
      
      {/* GLOBAL STANDALONE PAGE SWITCHER BAR FOR THE AUTHOR / DEMO MODE */}
      <div className="bg-[#030303] border-b border-white/10 py-1.5 px-3 text-[11px] font-mono flex items-center justify-between gap-2 text-white/70 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
          <span className="text-white/40 uppercase font-bold text-[10px] hidden sm:inline">Page:</span>
          
          <button
            onClick={handleShowLeadPage}
            className={`px-2.5 py-1 rounded font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              viewMode === 'lead'
                ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 hover:bg-white/10 text-emerald-400 border border-emerald-500/20'
            }`}
          >
            <span>📱 Free FB Ads Class Page</span>
            {viewMode === 'lead' && <span className="text-[9px] bg-black/20 px-1 rounded">ACTIVE</span>}
          </button>

          <button
            onClick={handleShowSalesPage}
            className={`px-2.5 py-1 rounded font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              viewMode === 'sales'
                ? 'bg-amber-500 text-black shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                : 'bg-white/5 hover:bg-white/10 text-amber-400 border border-amber-500/20'
            }`}
          >
            <span>🛒 Paid Handbook Sales Page</span>
            {viewMode === 'sales' && <span className="text-[9px] bg-black/20 px-1 rounded">ACTIVE</span>}
          </button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleOpenAdmin}
            className="text-[10px] font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 rounded flex items-center gap-1 transition-all"
          >
            <span>⚙️ Admin Portal</span>
          </button>
        </div>
      </div>
      
      {/* If Lead Capture Page Mode */}
      {viewMode === 'lead' ? (
        <LeadCapturePage 
          onGoToSalesPage={handleShowSalesPage}
          onAdminClick={handleOpenAdmin}
        />
      ) : (
        /* Main Sales Page Mode */
        <>
          {/* Top Urgency Announcement Banner */}
          <BannerNotice onBuyClick={handleOpenCheckout} />

          {/* Main Header Nav */}
          <Header 
            onBuyClick={handleOpenCheckout} 
            onPreviewClick={handleOpenPreview} 
            onAdminClick={handleOpenAdmin}
            onLeadCaptureClick={handleShowLeadPage}
            currentPage="sales"
          />

          {/* Hero Section with VSL & 3D Bundle Assembly */}
          <Hero onBuyClick={handleOpenCheckout} onPreviewClick={handleOpenPreview} />

          {/* Verified Testimonials & Earnings Proof */}
          <TestimonialsSection />

          {/* Interactive Profit Calculator */}
          <ProfitCalculator onBuyClick={handleOpenCheckout} />

          {/* Meet Your Instructor Section (Nuel Effiong) */}
          <InstructorSection onBuyClick={handleOpenCheckout} />

          {/* Course Curriculum Accordion */}
          <CourseCurriculum onPreviewClick={handleOpenPreview} onBuyClick={handleOpenCheckout} />

          {/* Free Bonus Vault */}
          <BonusVaultSection onBuyClick={handleOpenCheckout} />

          {/* FAQ Accordion */}
          <FaqSection />

          {/* Footer */}
          <Footer onAdminClick={handleOpenAdmin} />

          {/* Pop-up Live Student Sales Ticker */}
          <SocialProofTicker />

          {/* Persistent Bottom Mobile/Desktop CTA */}
          <StickyBottomCTA onBuyClick={handleOpenCheckout} />
        </>
      )}

      {/* Modals */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <SamplePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onBuyClick={handleOpenCheckout}
      />
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}


