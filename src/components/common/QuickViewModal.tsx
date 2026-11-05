import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, Check, ShoppingBag, Heart, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    isInWishlist,
    toggleWishlist,
    navigateToProduct,
    navigateTo,
  } = useStore();

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentColor = selectedColor || product.colors[0]?.name || 'Default';
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, currentColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, currentColor);
    closeQuickView();
    navigateTo('checkout');
  };

  const handleGoToDetail = () => {
    closeQuickView();
    navigateToProduct(product.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#18191D] border border-[#25272B] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-white bg-[#25272B] hover:bg-[#32353B] rounded-full transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-8">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-[#101114] rounded-xl overflow-hidden border border-[#25272B] relative group">
              <img
                src={product.images[activeImgIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              {product.isSale && (
                <span className="absolute top-3 left-3 bg-[#D93636] text-white text-xs font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
                  Sale -{product.discountPercent}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImgIdx === idx ? 'border-[#229C32] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Info & Actions */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#229C32] uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-gray-500">•</span>
                <span className="text-xs text-gray-400 font-medium">{product.brand}</span>
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight">{product.name}</h2>

              {/* Price & Rating */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg line-through text-gray-500">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-sm">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="ml-1 text-white font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-gray-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed pt-1">{product.shortDesc}</p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="pt-2">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-gray-300">
                      Color: <span className="text-white font-bold">{currentColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer flex items-center justify-center ${
                          currentColor === color.name ? 'border-[#229C32] scale-110' : 'border-[#25272B] hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      >
                        {currentColor === color.name && (
                          <Check className={`w-3.5 h-3.5 ${color.hex === '#F0F2F5' || color.hex === '#FFFFFF' || color.hex === '#EDEDED' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="pt-1 flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#229C32] animate-pulse"></span>
                <span className="text-gray-300">
                  {product.stock > 10 ? 'In Stock — Ready to ship today' : `Only ${product.stock} units remaining`}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#25272B] rounded-xl bg-[#101114] p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#229C32] hover:bg-[#187C29] text-white font-bold py-3 px-5 rounded-xl transition-all shadow-[0_0_20px_rgba(34,156,50,0.3)] hover:shadow-[0_0_25px_rgba(34,156,50,0.5)] cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border border-[#25272B] transition-colors cursor-pointer ${
                    isWishlisted ? 'text-[#D93636] bg-[#D93636]/10 border-[#D93636]/30' : 'text-gray-400 hover:text-white bg-[#101114]'
                  }`}
                  aria-label="Wishlist toggle"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy Now button */}
              <button
                onClick={handleBuyNow}
                className="w-full bg-[#25272B] hover:bg-[#32353B] text-white font-semibold py-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleGoToDetail}
                className="w-full text-center text-xs text-[#229C32] hover:underline pt-1 cursor-pointer"
              >
                View full specifications, customer reviews & warranty →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
