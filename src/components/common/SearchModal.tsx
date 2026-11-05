import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, ArrowRight, Tag, Star } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    searchQuery,
    setSearchQuery,
    products,
    categories,
    navigateToProduct,
    navigateToCategory,
    navigateTo,
  } = useStore();

  const [inputVal, setInputVal] = useState(searchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const filteredProducts = inputVal.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(inputVal.toLowerCase()) ||
          p.brand.toLowerCase().includes(inputVal.toLowerCase()) ||
          p.category.toLowerCase().includes(inputVal.toLowerCase()) ||
          p.shortDesc.toLowerCase().includes(inputVal.toLowerCase())
      )
    : [];

  const handleSelectProduct = (productId: string) => {
    setIsSearchModalOpen(false);
    navigateToProduct(productId);
  };

  const handleSelectCategory = (catName: string) => {
    setIsSearchModalOpen(false);
    navigateToCategory(catName);
  };

  const handleViewAllResults = () => {
    setSearchQuery(inputVal);
    setIsSearchModalOpen(false);
    navigateTo('shop');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#18191D] border border-[#25272B] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#25272B] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#229C32] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputVal.trim()) {
                handleViewAllResults();
              }
              if (e.key === 'Escape') {
                setIsSearchModalOpen(false);
              }
            }}
            placeholder="Search audio, smartwatches, keyboards, 140W chargers..."
            className="w-full bg-transparent text-white placeholder-gray-500 text-base focus:outline-none"
          />
          {inputVal && (
            <button
              onClick={() => setInputVal('')}
              className="text-gray-400 hover:text-white p-1 rounded cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#25272B] text-gray-300 hover:text-white hover:bg-[#32353B] transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Search Body */}
        <div className="overflow-y-auto p-4 space-y-6">
          {inputVal.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A0A5B1]">
                  Matching Products ({filteredProducts.length})
                </span>
                {filteredProducts.length > 0 && (
                  <button
                    onClick={handleViewAllResults}
                    className="text-xs font-semibold text-[#229C32] hover:text-[#187C29] flex items-center gap-1 cursor-pointer"
                  >
                    View in Shop <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  <p className="text-base text-gray-200 font-medium">
                    No gadgets matched "{inputVal}"
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Try searching for "earbuds", "watch", "titanium", or "charger"
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[#25272B] transition-all cursor-pointer group"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg bg-[#101114] border border-[#25272B] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#229C32] uppercase tracking-wider">
                            {product.category}
                          </span>
                          <span className="text-gray-500 text-xs">•</span>
                          <span className="text-[11px] text-gray-400">{product.brand}</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white truncate group-hover:text-[#229C32] transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center text-amber-400 text-xs">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span className="ml-1 text-gray-300 font-medium">{product.rating}</span>
                          </div>
                          <span className="text-gray-500 text-xs">•</span>
                          <span className="text-xs text-gray-400">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-white">${product.price}</span>
                        {product.originalPrice && (
                          <span className="block text-xs line-through text-gray-500">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Popular Search Categories */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#A0A5B1] mb-2.5">
                  Popular Categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.name)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25272B] hover:bg-[#32353B] text-xs font-medium text-gray-200 hover:text-white transition-all cursor-pointer"
                    >
                      <Tag className="w-3 h-3 text-[#229C32]" />
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trending Gadgets */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#A0A5B1] mb-2.5">
                  Trending Gadgets
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {products.slice(0, 4).map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.id)}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#25272B] transition-colors cursor-pointer"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded bg-[#101114]"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-white truncate">{p.name}</p>
                        <p className="text-[11px] font-bold text-[#229C32]">${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
