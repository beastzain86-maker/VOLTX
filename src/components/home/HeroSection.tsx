import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, Shield, Zap, ChevronRight, Play } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { navigateTo, openQuickView, products } = useStore();

  const featuredEarbuds = products[0];
  const featuredWatch = products[1];

  return (
    <section className="relative bg-[#101114] text-white overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#18191D]">
      {/* Subtle radial ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#229C32]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Promotional Copy */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18191D] border border-[#25272B] text-xs font-semibold text-gray-300">
              <span className="w-2 h-2 rounded-full bg-[#229C32] animate-ping" />
              <span className="text-[#229C32] font-bold uppercase tracking-wider text-[11px]">Next-Gen Series</span>
              <span className="text-gray-500">•</span>
              <span>Built for High Performance</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-['Space_Grotesk']">
              Discover Technology.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-[#229C32]">
                Upgrade Your Lifestyle.
              </span>
            </h1>

            {/* Supporting description */}
            <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore premium gadgets, studio-grade audio, smart accessories, and innovative workspace gear engineered for your everyday life.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#229C32] hover:bg-[#187C29] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 shadow-[0_0_30px_rgba(34,156,50,0.35)] hover:shadow-[0_0_40px_rgba(34,156,50,0.55)] cursor-pointer group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigateTo('shop', { category: 'new' })}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#18191D] hover:bg-[#25272B] text-white border border-[#25272B] hover:border-gray-600 font-semibold px-7 py-4 rounded-xl text-base transition-all cursor-pointer"
              >
                <span>Explore Collection</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-[#18191D] grid grid-cols-3 gap-4 text-center lg:text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <p className="text-2xl font-extrabold text-white">45dB</p>
                <p className="text-xs text-gray-400 mt-0.5">Active Noise Shield</p>
              </div>
              <div className="border-x border-[#25272B] px-2">
                <p className="text-2xl font-extrabold text-white">8K Hz</p>
                <p className="text-xs text-gray-400 mt-0.5">Ultra-low Polling</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#229C32]">140W</p>
                <p className="text-xs text-gray-400 mt-0.5">GaN III Fast Power</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero High-Quality Tech Composition */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Main Stage Grid Container */}
            <div className="relative w-full max-w-xl mx-auto">
              {/* Back Card: Studio Headphones backdrop */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#18191D] via-[#101114] to-[#15171B] border border-[#25272B] p-4 sm:p-6 shadow-2xl">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0D0E11] group">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop"
                    alt="VOLTX Horizon Over-Ear Studio Headphones"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101114] via-transparent to-transparent opacity-80" />

                  {/* On-image banner */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#229C32] uppercase tracking-wider bg-[#101114]/90 px-2.5 py-1 rounded-md backdrop-blur-sm border border-[#229C32]/30 inline-block mb-1">
                        Flagship Acoustic Series
                      </span>
                      <h3 className="text-lg font-bold text-white">Horizon Studio ANC</h3>
                      <p className="text-xs text-gray-300">Audiophile Planar Sound • 60h Battery</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-white">$299</span>
                    </div>
                  </div>
                </div>

                {/* Floating Bottom Left Card: Smartwatch */}
                <div
                  onClick={() => featuredWatch && openQuickView(featuredWatch)}
                  className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#18191D]/95 border border-[#25272B] p-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 cursor-pointer hover:border-[#229C32] transition-all max-w-[240px] group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop"
                    alt="VOLTX Titanium Smartwatch"
                    className="w-14 h-14 rounded-xl object-cover bg-black shrink-0 border border-[#25272B]"
                  />
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-[#229C32] uppercase tracking-wider">
                      Titanium GPS
                    </span>
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-[#229C32] transition-colors">
                      Chronos Ultra
                    </h4>
                    <p className="text-xs font-bold text-white mt-0.5">$349</p>
                  </div>
                </div>

                {/* Floating Top Right Card: Wireless Earbuds */}
                <div
                  onClick={() => featuredEarbuds && openQuickView(featuredEarbuds)}
                  className="absolute -top-6 -right-4 sm:-right-6 bg-[#18191D]/95 border border-[#25272B] p-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 cursor-pointer hover:border-[#229C32] transition-all max-w-[230px] group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=300&auto=format&fit=crop"
                    alt="VOLTX Apex Pro ANC Earbuds"
                    className="w-14 h-14 rounded-xl object-cover bg-black shrink-0 border border-[#25272B]"
                  />
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-[#229C32] uppercase tracking-wider">
                      Best Seller
                    </span>
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-[#229C32] transition-colors">
                      Apex Pro Earbuds
                    </h4>
                    <p className="text-xs font-bold text-white mt-0.5">$189</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
