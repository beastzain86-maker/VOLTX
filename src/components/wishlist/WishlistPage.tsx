import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist, moveWishlistToCart, navigateTo } = useStore();

  const handleAddAllToCart = () => {
    wishlist.forEach((product) => {
      moveWishlistToCart(product);
    });
  };

  return (
    <div className="bg-[#F7F7F8] min-h-screen text-[#171717] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D93636] mb-1">
              <Heart className="w-4 h-4 fill-[#D93636]" />
              <span>Saved Equipment</span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#171717] tracking-tight font-['Space_Grotesk']">
              My Wishlist
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="text-xs font-semibold text-gray-500 hover:text-[#D93636] flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>

              <button
                onClick={handleAddAllToCart}
                className="bg-[#229C32] hover:bg-[#187C29] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All to Cart</span>
              </button>
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E8E8] p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-red-50 text-[#D93636] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold text-[#171717]">Your Wishlist is Empty</h2>
            <p className="text-xs text-gray-500">
              Save your favorite gadgets and audiophile headphones to track prices and availability.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="bg-[#229C32] hover:bg-[#187C29] text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-all shadow-md cursor-pointer"
              >
                Explore Catalog
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
