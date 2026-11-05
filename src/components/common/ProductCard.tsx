import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Star, Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    addToCart,
    isInWishlist,
    toggleWishlist,
    openQuickView,
    navigateToProduct,
  } = useStore();

  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateToProduct(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, product.colors[0]?.name);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-[#E8E8E8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-[#F7F7F8] overflow-hidden flex items-center justify-center p-4">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {product.isSale && (
            <span className="bg-[#D93636] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-sm">
              Sale -{product.discountPercent}%
            </span>
          )}
          {product.isNew && !product.isSale && (
            <span className="bg-[#101114] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-110 cursor-pointer ${
            isWishlisted ? 'text-[#D93636] fill-[#D93636]' : 'text-gray-400 hover:text-black'
          }`}
          aria-label="Save to wishlist"
          title="Save to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 rounded-lg"
        />

        {/* Quick View Overlay Button */}
        <div className="absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={handleQuickView}
            className="w-full flex items-center justify-center gap-1.5 bg-[#101114]/90 hover:bg-[#101114] text-white text-xs font-bold py-2.5 px-3 rounded-xl backdrop-blur-sm transition-colors cursor-pointer shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Brand */}
          <div className="flex items-center justify-between text-xs text-[#777777] mb-1.5">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#229C32]">
              {product.category}
            </span>
            <span className="font-medium text-gray-400">{product.brand}</span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-[#171717] text-base leading-snug line-clamp-2 group-hover:text-[#229C32] transition-colors mb-2">
            {product.name}
          </h3>

          {/* Star Rating & Review count */}
          <div className="flex items-center gap-1.5 mb-3 text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span className="ml-1 font-bold text-[#171717]">{product.rating}</span>
            </div>
            <span className="text-gray-400">({product.reviewCount})</span>
            {product.stock > 0 && product.stock <= 5 && (
              <span className="ml-auto text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                Only {product.stock} left
              </span>
            )}
          </div>
        </div>

        {/* Price & Add to Cart action */}
        <div className="pt-3 border-t border-[#E8E8E8] flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-[#171717] tracking-tight">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs line-through text-[#777777]">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-gray-500 block">
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs text-white transition-all duration-200 cursor-pointer ${
              product.stock === 0
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#229C32] hover:bg-[#187C29] shadow-[0_4px_12px_rgba(34,156,50,0.25)] hover:shadow-[0_4px_16px_rgba(34,156,50,0.4)] active:scale-95'
            }`}
            title="Add to Cart"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
