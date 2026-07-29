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

  // Check URL params for ?page=lead or ?source=fb
  const [viewMode, setViewMode] = useState<'sales' | 'lead'>(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search.includes('page=lead') || search.includes('source=fb') || search.includes('whatsapp')) {
        return 'lead';
      }
    }
    return 'sales';
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

  const handleShowLeadPage = () => {
    setViewMode('lead');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowSalesPage = () => {
    setViewMode('sales');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-amber-500 selection:text-black antialiased">
      
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


