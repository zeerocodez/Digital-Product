import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import { FAQS } from '../data/courseData';
import { FAQItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#080808] border-t border-white/5 text-[#F5F5F5] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We've Got Answers</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
            Frequently Asked <span className="text-amber-500">Questions</span>
          </h2>

          <p className="text-white/60 text-sm">
            Everything you need to know about the AI Digital Products Money system.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq: FAQItem, idx: number) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`border transition-all overflow-hidden ${
                  isOpen
                    ? 'bg-[#0A0A0A] border-amber-500/40 shadow-xl'
                    : 'bg-[#0A0A0A] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 flex items-center justify-between text-left focus:outline-none gap-4"
                >
                  <span className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    {faq.question}
                  </span>
                  <div className="p-1 text-amber-500 shrink-0">
                    {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-white/70 leading-relaxed border-t border-white/5 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Contact Box */}
        <div className="mt-10 text-center bg-[#0A0A0A] border border-white/10 p-6 space-y-2 font-mono">
          <p className="text-xs text-white/60">
            Have a custom question not answered here?
          </p>
          <p className="text-xs text-amber-500 font-bold">
            Email Support: <a href="mailto:support@aidigitalmoney.com" className="underline">support@aidigitalmoney.com</a>
          </p>
        </div>

      </div>
    </section>
  );
};
