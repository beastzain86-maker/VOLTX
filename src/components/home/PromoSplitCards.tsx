import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

export const PromoSplitCards: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <section className="bg-[#101114] py-16 sm:py-20 border-b border-[#25272B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Card: New Arrivals */}
          <div
            onClick={() => navigateTo('shop', { category: 'new' })}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#18191D] to-[#111215] border border-[#25272B] hover:border-[#229C32]/60 p-8 sm:p-10 flex flex-col justify-between min-h-[420px] transition-all duration-300 shadow-xl cursor-pointer"
          >
            {/* Background Graphic Photography */}
            <div className="absolute right-0 bottom-0 w-3/5 h-4/5 pointer-events-none opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
              <img
                src="https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?q=80&w=900&auto=format&fit=crop"
                alt="New Arrivals VR and Spatial Tech"
                className="w-full h-full object-contain object-bottom-right"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#18191D] via-transparent to-transparent" />
            </div>

            {/* Left Card Top Info */}
            <div className="relative z-10 max-w-xs space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#229C32]/20 text-[#229C32] border border-[#229C32]/30">
                <Sparkles className="w-3.5 h-3.5" /> Just Released
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] leading-tight">
                New Arrivals
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Step into spatial visual headsets, dual-driver wireless buds, and ultra-high polling esports mice.
              </p>
            </div>

            {/* Left Card Bottom CTA */}
            <div className="relative z-10 pt-8">
              <button
                className="inline-flex items-center gap-2 bg-[#229C32] group-hover:bg-[#187C29] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(34,156,50,0.3)] cursor-pointer"
              >
                <span>Explore New Arrivals</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Card: Best Sellers */}
          <div
            onClick={() => navigateTo('shop', { category: 'best' })}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#18191D] to-[#111215] border border-[#25272B] hover:border-[#229C32]/60 p-8 sm:p-10 flex flex-col justify-between min-h-[420px] transition-all duration-300 shadow-xl cursor-pointer"
          >
            {/* Background Graphic Photography */}
            <div className="absolute right-0 bottom-0 w-3/5 h-4/5 pointer-events-none opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700">
              <img
                src="https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=900&auto=format&fit=crop"
                alt="Best Sellers Audio and Accessories"
                className="w-full h-full object-contain object-bottom-right"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#18191D] via-transparent to-transparent" />
            </div>

            {/* Right Card Top Info */}
            <div className="relative z-10 max-w-xs space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white border border-white/20">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Customer Favorites
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-['Space_Grotesk'] leading-tight">
                Best Sellers
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Proven audiophile headphones, 140W GaN power stations, and 360° waterproof sound systems.
              </p>
            </div>

            {/* Right Card Bottom CTA */}
            <div className="relative z-10 pt-8">
              <button
                className="inline-flex items-center gap-2 bg-white group-hover:bg-gray-100 text-[#101114] font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                <span>Shop Best Sellers</span>
                <ArrowRight className="w-4 h-4 text-[#229C32] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
