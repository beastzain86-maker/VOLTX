import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

export const FeaturedProducts: React.FC = () => {
  const { products, navigateTo, navigateToCategory } = useStore();
  const [activeTab, setActiveTab] = useState<'All' | 'Wireless Earbuds' | 'Smartwatches' | 'Audio & Speakers' | 'Gaming Accessories'>('All');

  // Filter products based on selected tab or featured
  const featuredList = products.filter((p) => {
    if (activeTab === 'All') {
      return p.isFeatured || p.isBestSeller;
    }
    return p.category === activeTab;
  });

  const tabs = ['All', 'Wireless Earbuds', 'Smartwatches', 'Audio & Speakers', 'Gaming Accessories'] as const;

  return (
    <section className="bg-[#F7F7F8] py-16 sm:py-20 border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#229C32] mb-1">
              <Flame className="w-4 h-4 fill-[#229C32]" />
              <span>Engineered For Precision</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-['Space_Grotesk']">
              Featured Products
            </h2>
            <p className="text-sm text-[#777777] mt-1 max-w-lg">
              Explore our highest-rated audio gear, smart wearables, and competitive gaming peripherals.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold px-3.5 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#101114] text-white shadow-md'
                    : 'bg-white text-[#777777] hover:text-[#171717] border border-[#E8E8E8] hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards Per Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredList.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Bottom Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo('shop')}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#171717] font-bold px-8 py-3.5 rounded-xl border border-[#E8E8E8] shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <span>Explore Entire Store Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#229C32] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
