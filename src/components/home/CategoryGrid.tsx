import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Layers } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const { categories, navigateToCategory } = useStore();

  return (
    <section className="bg-white py-16 sm:py-20 border-b border-[#E8E8E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#229C32] mb-1">
              <Layers className="w-4 h-4" />
              <span>Browse By Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-['Space_Grotesk']">
              Product Categories
            </h2>
          </div>
          <p className="text-sm text-[#777777] max-w-md">
            Engineered hardware tailored for audiophiles, digital creators, and competitive gamers.
          </p>
        </div>

        {/* 8 Categories Grid (4 cols on lg, 2 on sm) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => navigateToCategory(category.name)}
              className="group relative rounded-2xl overflow-hidden bg-[#101114] border border-[#E8E8E8] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer h-72 flex flex-col justify-end p-6"
            >
              {/* Background Product Photography */}
              <div className="absolute inset-0 z-0">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-85"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#101114] via-[#101114]/50 to-transparent" />
              </div>

              {/* Content Box */}
              <div className="relative z-10 text-white space-y-2">
                <span className="text-[11px] font-bold text-[#229C32] uppercase tracking-wider bg-[#101114]/80 px-2 py-0.5 rounded border border-[#229C32]/30 inline-block">
                  {category.itemCount} Products
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-[#229C32] transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-1">{category.description}</p>

                {/* Explore button */}
                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#229C32] transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
