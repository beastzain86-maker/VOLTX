import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, CheckCircle2, Cpu, Zap, Sliders } from 'lucide-react';

export const ProductivityBanner: React.FC = () => {
  const { navigateToCategory } = useStore();

  return (
    <section className="bg-[#101114] py-16 sm:py-24 text-white overflow-hidden relative border-b border-[#25272B]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#229C32]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Promotional Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#18191D] border border-[#25272B] text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-[#229C32]" />
              <span className="text-[#229C32] font-bold uppercase tracking-wider text-[11px]">
                Workspace Innovation
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight font-['Space_Grotesk']">
              Power Your Productivity
            </h2>

            <p className="text-base sm:text-lg text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Essential technology accessories for work, gaming and everyday life. Built from anodized metals and calibrated for peak desk ergonomics.
            </p>

            {/* Feature Checkpoints */}
            <div className="space-y-3 pt-2 text-left max-w-md mx-auto lg:mx-0">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-[#229C32] shrink-0" />
                <span>Aircraft-grade CNC machined aluminum construction</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-[#229C32] shrink-0" />
                <span>140W GaN III fast power delivery & smart telemetry</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-[#229C32] shrink-0" />
                <span>Ultra-silent dampening acoustics for marathon focus</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <button
                onClick={() => navigateToCategory('Computer Accessories')}
                className="inline-flex items-center justify-center gap-3 bg-[#229C32] hover:bg-[#187C29] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 shadow-[0_0_25px_rgba(34,156,50,0.3)] hover:shadow-[0_0_35px_rgba(34,156,50,0.5)] cursor-pointer group"
              >
                <span>Browse Accessories</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Desk Setup Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-[#25272B] bg-[#18191D] p-3 shadow-2xl group">
              <div className="aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop"
                  alt="High-end workstation desk setup with mechanical keyboard and accessories"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101114]/90 via-transparent to-transparent" />

                {/* Overlaid Badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between bg-[#18191D]/90 backdrop-blur-md p-4 rounded-xl border border-[#25272B]">
                  <div>
                    <p className="text-xs font-bold text-[#229C32] uppercase tracking-wider">
                      Flagship Hardware
                    </p>
                    <h4 className="text-sm font-bold text-white">NovaForge 75% Keyboard & Aerolight</h4>
                  </div>
                  <span className="text-xs font-bold bg-[#229C32] text-white px-2.5 py-1 rounded-lg">
                    In Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
