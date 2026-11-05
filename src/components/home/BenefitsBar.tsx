import React from 'react';
import { Truck, RotateCcw, Headphones, ShieldCheck } from 'lucide-react';

export const BenefitsBar: React.FC = () => {
  const benefits = [
    {
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#18191D] border border-[#229C32]/40 flex items-center justify-center text-[#229C32] shadow-[0_0_15px_rgba(34,156,50,0.15)] shrink-0">
          <Truck className="w-6 h-6 stroke-[1.8]" />
        </div>
      ),
      title: 'Free Shipping',
      description: 'Free delivery on qualifying orders over $99 worldwide.',
    },
    {
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#18191D] border border-[#229C32]/40 flex items-center justify-center text-[#229C32] shadow-[0_0_15px_rgba(34,156,50,0.15)] shrink-0">
          <RotateCcw className="w-6 h-6 stroke-[1.8]" />
        </div>
      ),
      title: 'Easy Returns',
      description: '30-Day hassle-free return and instant exchange policy.',
    },
    {
      icon: (
        <div className="w-12 h-12 rounded-2xl bg-[#18191D] border border-[#229C32]/40 flex items-center justify-center text-[#229C32] shadow-[0_0_15px_rgba(34,156,50,0.15)] shrink-0">
          <Headphones className="w-6 h-6 stroke-[1.8]" />
        </div>
      ),
      title: 'Customer Support',
      description: 'Dedicated 24/7 technical customer assistance.',
    },
  ];

  return (
    <section className="bg-[#101114] border-b border-[#25272B] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 sm:p-5 rounded-2xl bg-[#18191D]/80 border border-[#25272B] hover:border-[#229C32]/50 transition-all duration-300 group"
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">{item.title}</h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
