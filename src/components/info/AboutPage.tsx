import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShieldCheck, Cpu, Headphones, Zap, Award, Users, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="bg-[#101114] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18191D] border border-[#25272B] text-xs font-semibold text-gray-300">
            <Cpu className="w-3.5 h-3.5 text-[#229C32]" />
            <span className="text-[#229C32] font-bold uppercase tracking-wider text-[11px]">
              Engineered In San Francisco
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white font-['Space_Grotesk']">
            Acoustic Purity Meets Structural Rigidity
          </h1>

          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            VOLTX GEAR was founded by acoustic engineers, competitive gamers, and industrial designers tired of disposable plastic tech gadgets. We build technology accessories from aerospace-grade alloys, beryllium transducers, and military-grade gallium nitride circuits.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#18191D] p-8 rounded-3xl border border-[#25272B] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#229C32]/20 border border-[#229C32]/40 text-[#229C32] flex items-center justify-center">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Audiophile Transducers</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every driver is individually matched within 0.5dB across left and right channels to eliminate phase cancellation and provide authentic three-dimensional spatial staging.
            </p>
          </div>

          <div className="bg-[#18191D] p-8 rounded-3xl border border-[#25272B] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#229C32]/20 border border-[#229C32]/40 text-[#229C32] flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Gallium Nitride III</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Our GaN power architectures run 40% cooler than silicon, enabling pocketable chargers capable of full-speed 140W MacBook Pro charging with real-time OLED wattage meters.
            </p>
          </div>

          <div className="bg-[#18191D] p-8 rounded-3xl border border-[#25272B] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#229C32]/20 border border-[#229C32]/40 text-[#229C32] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">2-Year Lab Warranty</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We stand behind every weld, screw, and battery cell. Every hardware purchase includes our no-hassle 2-year warranty and 30-day money-back guarantee.
            </p>
          </div>
        </div>

        {/* Visual Lab Section */}
        <div className="relative rounded-3xl overflow-hidden border border-[#25272B] bg-[#18191D]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="p-8 sm:p-12 space-y-4">
              <span className="text-xs font-bold text-[#229C32] uppercase tracking-wider">
                Laboratory Standards
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Zero Compromise Materials
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                From aircraft Grade 5 titanium in our smartwatches to lubricated linear mechanical key switches and virgin-grade PTFE mouse skates, our gear is engineered for daily tactile satisfaction.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => navigateTo('shop')}
                  className="bg-[#229C32] hover:bg-[#187C29] text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Explore Hardware Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="aspect-[4/3] bg-black">
              <img
                src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1000&auto=format&fit=crop"
                alt="VOLTX Lab setup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
