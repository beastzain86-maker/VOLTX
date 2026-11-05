import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import {
  Filter,
  SlidersHorizontal,
  X,
  Search,
  Star,
  Check,
  ChevronDown,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    searchQuery,
    setSearchQuery,
  } = useStore();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>(
    selectedCategoryFilter || 'All'
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(750);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [onlySale, setOnlySale] = useState<boolean>(
    selectedCategoryFilter === 'best' || selectedCategoryFilter === 'sale'
  );
  const [onlyNew, setOnlyNew] = useState<boolean>(selectedCategoryFilter === 'new');
  const [sortBy, setSortBy] = useState<
    'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
  >('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, [products]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (
          selectedCategory !== 'All' &&
          selectedCategory !== 'new' &&
          selectedCategory !== 'best'
        ) {
          if (p.category !== selectedCategory) return false;
        }

        // New / Best special tabs
        if (selectedCategory === 'new' && !p.isNew) return false;
        if (selectedCategory === 'best' && !p.isBestSeller) return false;

        // Specific toggles
        if (onlyNew && !p.isNew) return false;
        if (onlySale && !p.isSale) return false;
        if (onlyInStock && p.stock <= 0) return false;

        // Price
        if (p.price > maxPrice) return false;

        // Rating
        if (p.rating < minRating) return false;

        // Brands
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.shortDesc.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCat && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest')
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [
    products,
    selectedCategory,
    selectedBrands,
    maxPrice,
    minRating,
    onlyInStock,
    onlySale,
    onlyNew,
    sortBy,
    searchQuery,
  ]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBrands([]);
    setMaxPrice(750);
    setMinRating(0);
    setOnlyInStock(false);
    setOnlySale(false);
    setOnlyNew(false);
    setSortBy('featured');
    setSearchQuery('');
  };

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedBrands.length +
    (maxPrice < 750 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlySale ? 1 : 0) +
    (onlyNew ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="bg-[#F7F7F8] min-h-screen text-[#171717] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#229C32]">Catalog</span>
            {selectedCategory !== 'All' && (
              <>
                <span>/</span>
                <span className="text-[#171717] font-bold">{selectedCategory}</span>
              </>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-['Space_Grotesk']">
                Explore Technology
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Showing {filteredProducts.length} high-performance tech products
              </p>
            </div>

            {/* Mobile Filter Trigger Button */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#E8E8E8] py-2.5 px-4 rounded-xl text-sm font-semibold shadow-sm cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#229C32]" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Layout Grid: Sidebar + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Search within catalog */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E8E8] shadow-sm">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter keywords..."
                  className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#229C32]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E8E8] shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                  Categories
                </h3>
                {selectedCategory !== 'All' && (
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="text-[11px] text-[#229C32] hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    selectedCategory === 'All'
                      ? 'bg-[#101114] text-white font-bold'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>All Products</span>
                  <span className="text-[10px] opacity-75">{products.length}</span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat.name
                        ? 'bg-[#229C32] text-white font-bold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="truncate">{cat.name}</span>
                    <span className="text-[10px] opacity-75">{cat.itemCount}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider Filter */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E8E8] shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                  Max Price
                </h3>
                <span className="text-xs font-bold text-[#229C32]">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="50"
                max="750"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#229C32] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>$50</span>
                <span>$400</span>
                <span>$750</span>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E8E8] shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717] pb-2 border-b border-gray-100">
                Brand
              </h3>
              <div className="space-y-2">
                {brands.map((brand) => {
                  const isChecked = selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleBrandToggle(brand)}
                        className="rounded border-gray-300 text-[#229C32] focus:ring-[#229C32] cursor-pointer"
                      />
                      <span>{brand}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Quick Status Toggles */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8E8E8] shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717] pb-2 border-b border-gray-100">
                Availability & Deals
              </h3>
              <div className="space-y-2.5 text-xs text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="rounded border-gray-300 text-[#229C32] focus:ring-[#229C32]"
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlySale}
                    onChange={(e) => setOnlySale(e.target.checked)}
                    className="rounded border-gray-300 text-[#229C32] focus:ring-[#229C32]"
                  />
                  <span>On Sale Items</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={onlyNew}
                    onChange={(e) => setOnlyNew(e.target.checked)}
                    className="rounded border-gray-300 text-[#229C32] focus:ring-[#229C32]"
                  />
                  <span>New Arrivals Only</span>
                </label>
              </div>
            </div>

            {/* Reset All Filters Button */}
            {activeFilterCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters ({activeFilterCount})</span>
              </button>
            )}
          </div>

          {/* Product Grid Area (3 Columns on Desktop) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Top Bar: Sort By & Active Tags */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Active Badges */}
              <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                <span className="text-xs font-semibold text-gray-500">Active:</span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 text-[#171717] px-2.5 py-1 rounded-full text-xs font-medium">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory('All')}>
                      <X className="w-3 h-3 text-gray-500 hover:text-black cursor-pointer" />
                    </button>
                  </span>
                )}
                {onlySale && (
                  <span className="inline-flex items-center gap-1 bg-[#D93636]/10 text-[#D93636] px-2.5 py-1 rounded-full text-xs font-medium">
                    Sale
                    <button onClick={() => setOnlySale(false)}>
                      <X className="w-3 h-3 text-[#D93636] cursor-pointer" />
                    </button>
                  </span>
                )}
                {onlyNew && (
                  <span className="inline-flex items-center gap-1 bg-[#101114] text-white px-2.5 py-1 rounded-full text-xs font-medium">
                    New
                    <button onClick={() => setOnlyNew(false)}>
                      <X className="w-3 h-3 text-white cursor-pointer" />
                    </button>
                  </span>
                )}
                {selectedBrands.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 bg-gray-100 text-[#171717] px-2.5 py-1 rounded-full text-xs font-medium"
                  >
                    {b}
                    <button onClick={() => handleBrandToggle(b)}>
                      <X className="w-3 h-3 text-gray-500 hover:text-black cursor-pointer" />
                    </button>
                  </span>
                ))}
                {activeFilterCount === 0 && (
                  <span className="text-xs text-gray-400">All Products</span>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <span className="text-xs font-semibold text-gray-500">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3 py-1.5 text-xs font-semibold text-[#171717] focus:outline-none focus:border-[#229C32] cursor-pointer"
                >
                  <option value="featured">Featured / Best</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Releases</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E8E8E8] p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#171717]">No products matched your filters</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try broadening your price range or resetting brand and category filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-[#229C32] hover:bg-[#187C29] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Slide-over */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="text-base font-bold text-[#171717]">Filter Products</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1.5 text-gray-500 hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Categories</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setMobileFilterOpen(false);
                    }}
                    className="w-full text-left py-1.5 text-xs font-medium text-gray-700"
                  >
                    All Categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCategory(c.name);
                        setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left py-1.5 text-xs font-medium ${
                        selectedCategory === c.name ? 'text-[#229C32] font-bold' : 'text-gray-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Max Price:</span>
                  <span className="text-[#229C32]">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="750"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#229C32]"
                />
              </div>

              {/* In-Stock */}
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={onlySale}
                    onChange={(e) => setOnlySale(e.target.checked)}
                  />
                  <span>On Sale Only</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#229C32] text-white font-bold py-3 rounded-xl text-xs"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
