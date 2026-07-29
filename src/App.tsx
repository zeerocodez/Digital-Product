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
      
      {/* Standalone Page Mode with Subtle Floating Switcher for Demo/Testing */}
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

      {/* Floating Author Navigation Switcher (Kept discreet at top right for internal testing) */}
      <div className="fixed bottom-3 right-3 z-50 bg-black/90 border border-white/20 p-1.5 rounded-lg shadow-2xl flex items-center gap-1.5 text-[10px] font-mono opacity-80 hover:opacity-100 transition-opacity">
        <button
          onClick={viewMode === 'lead' ? handleShowSalesPage : handleShowLeadPage}
          className="bg-white/10 hover:bg-white/20 text-white px-2 py-1 rounded flex items-center gap-1 font-bold"
          title="Switch Page Mode"
        >
          <span>{viewMode === 'lead' ? '🛒 Switch to Sales Page' : '📱 Switch to Free Class Page'}</span>
        </button>

        <button
          onClick={handleOpenAdmin}
          className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 px-2 py-1 rounded font-bold"
          title="Admin Leads Portal"
        >
          ⚙️ Admin
        </button>
      </div>

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


