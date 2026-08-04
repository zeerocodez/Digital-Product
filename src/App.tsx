import React, { useState, useEffect } from 'react';
import { BannerNotice } from './components/BannerNotice';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { OffersComparisonSection } from './components/OffersComparisonSection';
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
import { ThankYouPage } from './components/ThankYouPage';
import { Footer } from './components/Footer';
import { OfferId } from './types';

export default function App() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<OfferId>('pdf_mentorship');

  // Default to standalone Lead Capture Landing Page unless ?page=sales or ?page=thankyou is specified
  const [viewMode, setViewMode] = useState<'sales' | 'lead' | 'thankyou'>(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      const hash = window.location.hash;
      if (search.includes('page=sales') || hash === '#sales') {
        return 'sales';
      }
      if (search.includes('page=thankyou') || hash === '#thankyou') {
        return 'thankyou';
      }
    }
    return 'lead';
  });

  const handleOpenCheckout = (offerId?: OfferId) => {
    if (offerId) {
      setSelectedOfferId(offerId);
    }
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

  const handleShowThankYouPage = () => {
    setViewMode('thankyou');
    if (typeof window !== 'undefined' && window.history) {
      window.history.replaceState(null, '', '?page=thankyou');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-amber-500 selection:text-black antialiased">
      
      {/* Standalone Page Mode Routing */}
      {viewMode === 'lead' ? (
        <LeadCapturePage 
          onGoToSalesPage={handleShowSalesPage}
          onGoToThankYouPage={handleShowThankYouPage}
          onAdminClick={handleOpenAdmin}
        />
      ) : viewMode === 'thankyou' ? (
        <ThankYouPage 
          onGoToSalesPage={handleShowSalesPage}
          onGoToLeadPage={handleShowLeadPage}
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

          {/* 2 Offers Package Comparison Section */}
          <OffersComparisonSection onSelectOffer={(offerId) => handleOpenCheckout(offerId)} />

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

      {/* Floating Author Navigation Switcher (Kept discreet at bottom right for internal testing) */}
      <div className="fixed bottom-3 right-3 z-50 bg-black/95 border border-white/20 p-1.5 rounded-xl shadow-2xl flex items-center gap-1.5 text-[10px] font-mono opacity-85 hover:opacity-100 transition-opacity">
        <button
          onClick={handleShowLeadPage}
          className={`px-2 py-1 rounded font-bold ${
            viewMode === 'lead' ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title="Free Class Lead Page"
        >
          📱 Lead Page
        </button>

        <button
          onClick={handleShowThankYouPage}
          className={`px-2 py-1 rounded font-bold ${
            viewMode === 'thankyou' ? 'bg-emerald-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title="Thank You & WhatsApp Page"
        >
          🎉 Thank You Page
        </button>

        <button
          onClick={handleShowSalesPage}
          className={`px-2 py-1 rounded font-bold ${
            viewMode === 'sales' ? 'bg-amber-500 text-black' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title="Handbook Sales Page"
        >
          🛒 Sales Page
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
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedOfferId={selectedOfferId}
      />
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


