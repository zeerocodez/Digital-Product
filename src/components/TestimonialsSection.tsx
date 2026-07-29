import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, Quote, Filter, Award, TrendingUp, DollarSign, Globe2, Layers, Check } from 'lucide-react';
import { TESTIMONIALS } from '../data/courseData';
import { Testimonial } from '../types';

export const TestimonialsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [activeProofTab, setActiveProofTab] = useState<'nestuge' | 'multicurrency'>('nestuge');

  const platforms = ['All', 'Nestuge', 'Multi-Currency', 'Selar', 'Paystack', 'WhatsApp', 'Flutterwave', 'Direct Sales'];

  const filteredTestimonials = activeFilter === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.platform === activeFilter);

  return (
    <section id="proof" className="py-16 md:py-24 bg-[#080808] border-t border-white/5 text-[#F5F5F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold px-3 py-1 uppercase tracking-[0.2em] font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>Verified Live Earnings Dashboards & Creator Proofs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
            Real Revenue From <span className="text-amber-500">Nigerian Creators</span>
          </h2>

          <p className="text-white/60 text-sm sm:text-base">
            See actual verified revenue dashboards from creators using AI to package, launch, and monetize digital products across Africa and globally.
          </p>
        </div>

        {/* FEATURED DASHBOARD EARNINGS PROOF CARDS */}
        <div className="mb-16 bg-[#0B0C10] border border-amber-500/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 bg-amber-500 text-black font-mono font-bold text-[10px] px-3 py-1 uppercase tracking-widest">
            LIVE VERIFIED DASHBOARD PROOF
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-6 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-amber-500" />
                <span>Featured Creator Dashboard Breakdowns</span>
              </h3>
              <p className="text-xs text-white/60 font-mono mt-1">
                Verified live analytics directly from Nestuge & Pan-African Multi-Currency Payment Gateways.
              </p>
            </div>

            {/* Proof Selector Tabs */}
            <div className="flex items-center gap-2 bg-[#050505] p-1.5 border border-white/10 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveProofTab('nestuge')}
                className={`px-4 py-2 font-bold uppercase transition-all flex items-center gap-1.5 ${
                  activeProofTab === 'nestuge'
                    ? 'bg-amber-500 text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Nestuge ($20k+)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveProofTab('multicurrency')}
                className={`px-4 py-2 font-bold uppercase transition-all flex items-center gap-1.5 ${
                  activeProofTab === 'multicurrency'
                    ? 'bg-amber-500 text-black'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>Multi-Currency (2.2k Sales)</span>
              </button>
            </div>
          </div>

          {/* Tab 1: Nestuge Dashboard Proof */}
          {activeProofTab === 'nestuge' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Recreated Visual Dashboard Card */}
              <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
                <div className="text-center border-b border-slate-100 pb-4 mb-6">
                  <span className="text-xs font-semibold text-slate-800">
                    Over <span className="text-emerald-600 font-bold">$20k</span> Earned on Nestuge
                  </span>
                </div>

                {/* Simulated Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col gap-1">
                    <div className="w-6 h-0.5 bg-slate-800 rounded"></div>
                    <div className="w-6 h-0.5 bg-slate-800 rounded"></div>
                    <div className="w-6 h-0.5 bg-slate-800 rounded"></div>
                  </div>
                  <div className="text-xl font-bold tracking-tight text-slate-900">Overview</div>
                  <div className="flex items-center gap-3 text-slate-400">
                    <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">🔔</div>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">🌙</div>
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">👤</div>
                  </div>
                </div>

                {/* Card 1: Revenue */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-4 shadow-sm">
                  <p className="text-sm font-medium text-slate-600 mb-2">All-time Revenue</p>
                  <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-2">
                    $ 21,073.67
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    $78.93k left to receive our Titan Plaque
                  </p>
                </div>

                {/* Card 2: Customers */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
                  <p className="text-sm font-medium text-slate-600 mb-2">Total Customers</p>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    2,384
                  </div>
                </div>
              </div>

              {/* Text Description & Highlights */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5" /> Nestuge Platform Verified
                </div>
                <h4 className="text-2xl font-bold text-white tracking-tight">
                  Over $21,000 USD Generated from 2,384 Global Buyers
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  By structuring digital products into simple downloadable workbooks and prompt systems, creators can monetize both local and international traffic with automated payouts on Nestuge.
                </p>
                <div className="bg-[#050505] p-4 border border-white/10 font-mono text-xs space-y-2 text-white/80">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-white/40">Total Revenue:</span>
                    <span className="text-emerald-400 font-bold">$21,073.67 USD</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-white/40">Customer Volume:</span>
                    <span className="text-amber-400 font-bold">2,384 buyers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Next Milestone:</span>
                    <span className="text-white">Nestuge Titan Plaque</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Multi-Currency Sales Dashboard Proof */}
          {activeProofTab === 'multicurrency' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Recreated Visual Dashboard Card */}
              <div className="lg:col-span-7 bg-[#050505] text-slate-100 rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/10 relative font-sans">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <span className="text-xs font-mono text-white/40">11:06 📱 Live Gateway Stats</span>
                  <button className="bg-purple-950/80 hover:bg-purple-900 border border-purple-500/30 text-purple-200 text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5">
                    Export Data in CSV 📥
                  </button>
                </div>

                <div className="space-y-3 font-sans">
                  {/* Total Sales */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-white tracking-tight">2217</div>
                    <div className="text-xs text-white/50 font-medium mt-0.5">No of Sales</div>
                  </div>

                  {/* NGN */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-emerald-400 tracking-tight">₦ 6,281,400</div>
                    <div className="text-xs text-white/50 font-medium mt-0.5">Total Volume (NGN)</div>
                  </div>

                  {/* USD */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                    <div className="text-xl font-bold text-amber-400 tracking-tight">$ 1,823.07</div>
                    <div className="text-xs text-white/50 font-medium mt-0.5">Total Volume (USD)</div>
                  </div>

                  {/* Multi-currency grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
                      <div className="font-bold text-white">£ 40.90</div>
                      <div className="text-[10px] text-white/40">GBP</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
                      <div className="font-bold text-white">GHC 3,888.08</div>
                      <div className="text-[10px] text-white/40">GHS</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
                      <div className="font-bold text-white">KSh 1,000,896</div>
                      <div className="text-[10px] text-white/40">KES</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg">
                      <div className="font-bold text-white">CFA 227,388</div>
                      <div className="text-[10px] text-white/40">XAF</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Description & Highlights */}
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold px-3 py-1 uppercase tracking-wider">
                  <Globe2 className="w-3.5 h-3.5" /> Multi-Currency African Funnel
                </div>
                <h4 className="text-2xl font-bold text-white tracking-tight">
                  2,217 Sales Across 6 African & Foreign Currencies
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  Selling digital products in Nigeria, Kenya, Ghana, Cameroon, UK, and USA. Learn how Module 7 & 8 guide you through setting up multi-currency checkouts effortlessly.
                </p>
                <div className="bg-[#050505] p-4 border border-white/10 font-mono text-xs space-y-2 text-white/80">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-white/40">Nigerian Volume (NGN):</span>
                    <span className="text-emerald-400 font-bold">₦6,281,400</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span className="text-white/40">Kenyan Shillings (KES):</span>
                    <span className="text-amber-400 font-bold">KSh 1,000,896</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">USD + Foreign Currencies:</span>
                    <span className="text-white font-bold">$1,823 USD + £40 GBP</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/40 flex items-center gap-1 mr-2 font-mono">
            <Filter className="w-3.5 h-3.5" /> Filter Platform:
          </span>
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => setActiveFilter(platform)}
              className={`text-xs font-bold uppercase tracking-widest px-4 py-2 transition-all ${
                activeFilter === platform
                  ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                  : 'bg-[#0A0A0A] text-white/60 border border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item: Testimonial) => (
            <div
              key={item.id}
              className="bg-[#0A0A0A] border border-white/10 hover:border-amber-500/40 p-6 shadow-xl flex flex-col justify-between transition-all duration-200 group relative"
            >
              <div className="space-y-4">
                
                {/* Result Highlight Badge */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs font-bold font-mono px-3 py-1 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {item.result}
                  </span>

                  <span className="text-[10px] font-mono font-bold text-white/40 bg-white/5 border border-white/10 px-2 py-1">
                    {item.platform}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                  <span className="text-xs font-mono font-bold text-white/40 ml-1">5.0</span>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-white/80 leading-relaxed font-normal italic relative">
                  "{item.quote}"
                </p>

              </div>

              {/* Author Row */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 object-cover border border-amber-500/40"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1 uppercase tracking-wider">
                      {item.name}
                      {item.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 inline" title="Verified Purchase" />
                      )}
                    </h4>
                    <p className="text-[11px] text-white/40 font-mono">{item.role}</p>
                  </div>
                </div>

                <span className="text-[10px] text-white/30 font-mono">{item.date}</span>
              </div>

            </div>
          ))}
        </div>

        {/* Aggregate Social Proof Counter Footer */}
        <div className="mt-12 text-center bg-[#0A0A0A] border border-white/10 p-6 max-w-3xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-6 sm:gap-8 shadow-2xl font-mono">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-500">420+</div>
            <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Enrolled Creators</div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-white/10" />
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">$21,000+</div>
            <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Nestuge Revenue</div>
          </div>
          <div className="hidden sm:block h-8 w-px bg-white/10" />
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-500">2,200+</div>
            <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-0.5">Multi-Currency Sales</div>
          </div>
        </div>

      </div>
    </section>
  );
};

