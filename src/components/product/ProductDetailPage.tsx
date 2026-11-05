import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import {
  Star,
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Zap,
  Check,
  Minus,
  Plus,
  ArrowRight,
  Share2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    getProductById,
    products,
    addToCart,
    isInWishlist,
    toggleWishlist,
    addProductReview,
    addToast,
    navigateTo,
    navigateToCategory,
  } = useStore();

  const product = getProductById(selectedProductId || '') || products[0];

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  // Review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  // Related products from same category or brand
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor);
    navigateTo('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    addProductReview(product.id, {
      author: reviewName,
      rating: reviewRating,
      title: reviewTitle || 'Verified Experience',
      comment: reviewComment,
    });

    setReviewName('');
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="bg-[#F7F7F8] min-h-screen text-[#171717] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={() => navigateTo('home')} className="hover:text-black cursor-pointer">
            Home
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-black cursor-pointer">
            Shop
          </button>
          <span>/</span>
          <button
            onClick={() => navigateToCategory(product.category)}
            className="hover:text-[#229C32] cursor-pointer"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#171717] font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Showcase Card */}
        <div className="bg-white rounded-3xl border border-[#E8E8E8] shadow-sm p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Primary Active Image Display */}
              <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl bg-[#F7F7F8] border border-[#E8E8E8] overflow-hidden group flex items-center justify-center p-6">
                <img
                  src={product.images[activeImgIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-xl"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {product.isSale && (
                    <span className="bg-[#D93636] text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                      Save {product.discountPercent}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="bg-[#101114] text-white text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                      2026 Release
                    </span>
                  )}
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black transition-colors shadow-sm cursor-pointer"
                  title="Share product link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImgIdx(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImgIdx === idx
                          ? 'border-[#229C32] ring-2 ring-[#229C32]/20'
                          : 'border-transparent opacity-70 hover:opacity-100 bg-[#F7F7F8]'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Buying & Details Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#229C32] bg-[#229C32]/10 px-2.5 py-0.5 rounded-md">
                    {product.brand}
                  </span>
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-xs text-gray-500 font-medium">{product.category}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight leading-snug font-['Space_Grotesk']">
                  {product.name}
                </h1>
                <p className="text-xs text-[#777777] mt-1 font-medium">{product.tagline}</p>

                {/* Rating & Review jump */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= Math.round(product.rating)
                            ? 'fill-amber-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-1.5 font-bold text-sm text-[#171717]">{product.rating}</span>
                  </div>
                  <span className="text-gray-300">|</span>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className="text-xs text-gray-500 hover:text-[#229C32] hover:underline cursor-pointer"
                  >
                    {product.reviewCount} verified reviews
                  </button>
                </div>
              </div>

              {/* Price Row */}
              <div className="bg-[#F7F7F8] p-4 rounded-2xl border border-[#E8E8E8] flex items-baseline justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg line-through text-gray-400">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#229C32] block">
                    {product.stock > 0 ? '✓ Ready to Ship' : 'Out of Stock'}
                  </span>
                  <span className="text-[11px] text-gray-500">Tax calculated at checkout</span>
                </div>
              </div>

              {/* Short summary */}
              <p className="text-sm text-gray-600 leading-relaxed">{product.shortDesc}</p>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>
                      Selected Finish: <strong className="text-[#171717]">{selectedColor}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 text-xs font-medium transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-[#229C32] bg-[#229C32]/5 text-[#171717] font-bold shadow-sm'
                            : 'border-[#E8E8E8] text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons: Quantity, Add to Cart, Buy Now */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-[#E8E8E8] rounded-xl bg-[#F7F7F8] p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black rounded-lg transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-[#171717]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="w-9 h-9 flex items-center justify-center text-gray-500 hover:text-black rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 flex items-center justify-center gap-2 bg-[#229C32] hover:bg-[#187C29] text-white font-bold py-3.5 px-6 rounded-xl text-base transition-all shadow-[0_0_20px_rgba(34,156,50,0.25)] hover:shadow-[0_0_25px_rgba(34,156,50,0.4)] cursor-pointer"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>

                  {/* Wishlist toggle */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      isWishlisted
                        ? 'text-[#D93636] bg-[#D93636]/10 border-[#D93636]/30'
                        : 'text-gray-400 hover:text-black border-[#E8E8E8] bg-white'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Buy Now instant checkout */}
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                  className="w-full bg-[#101114] hover:bg-[#18191D] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Buy Now — Instant Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#229C32]" />
                </button>
              </div>

              {/* Guarantees Box */}
              <div className="pt-4 border-t border-[#E8E8E8] grid grid-cols-2 gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#229C32]" />
                  <span>Free Express Delivery $99+</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#229C32]" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#229C32]" />
                  <span>2-Year Official Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#229C32]" />
                  <span>Dispatches in 24 Hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section: Overview / Specifications / Customer Reviews */}
        <div className="bg-white rounded-3xl border border-[#E8E8E8] shadow-sm p-6 sm:p-10 mb-16">
          {/* Tabs Bar */}
          <div className="flex items-center gap-4 sm:gap-8 border-b border-[#E8E8E8] pb-4 mb-8 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => setActiveTab('overview')}
              className={`text-base font-bold pb-2 transition-colors cursor-pointer relative ${
                activeTab === 'overview'
                  ? 'text-[#171717]'
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              Product Overview
              {activeTab === 'overview' && (
                <span className="absolute bottom-[-17px] left-0 right-0 h-1 bg-[#229C32] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`text-base font-bold pb-2 transition-colors cursor-pointer relative ${
                activeTab === 'specs'
                  ? 'text-[#171717]'
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              Technical Specifications
              {activeTab === 'specs' && (
                <span className="absolute bottom-[-17px] left-0 right-0 h-1 bg-[#229C32] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-base font-bold pb-2 transition-colors cursor-pointer relative ${
                activeTab === 'reviews'
                  ? 'text-[#171717]'
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              Customer Reviews ({product.reviews.length})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-[-17px] left-0 right-0 h-1 bg-[#229C32] rounded-full" />
              )}
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="max-w-3xl space-y-4">
                <h3 className="text-xl font-bold text-[#171717]">Architectural Engineering</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#171717] mb-4">Key Performance Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-[#F7F7F8] border border-[#E8E8E8]"
                    >
                      <Check className="w-5 h-5 text-[#229C32] shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Specifications */}
          {activeTab === 'specs' && (
            <div className="animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-[#171717] mb-4">Complete Technical Matrix</h3>
              <div className="rounded-2xl border border-[#E8E8E8] overflow-hidden">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([label, val], idx) => (
                      <tr
                        key={label}
                        className={idx % 2 === 0 ? 'bg-[#F7F7F8]' : 'bg-white'}
                      >
                        <td className="py-3 px-5 font-bold text-gray-700 w-1/3 border-b border-[#E8E8E8]">
                          {label}
                        </td>
                        <td className="py-3 px-5 text-gray-600 border-b border-[#E8E8E8]">
                          {val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews & Submission */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8E8E8]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-extrabold text-[#171717]">{product.rating}</span>
                    <div>
                      <div className="flex text-amber-500">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-4 h-4 fill-amber-500" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        Based on {product.reviewCount} customer ratings
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-[#101114] hover:bg-[#187C29] text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-colors cursor-pointer"
                >
                  {showReviewForm ? 'Cancel Review' : 'Write a Customer Review'}
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form
                  onSubmit={handleSubmitReview}
                  className="bg-[#F7F7F8] p-6 rounded-2xl border border-[#E8E8E8] space-y-4 max-w-xl animate-in fade-in"
                >
                  <h4 className="text-base font-bold text-[#171717]">Submit Verified Review</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Sarah Miller"
                        className="w-full bg-white border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#229C32]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Rating (1-5 Stars)
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full bg-white border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#229C32]"
                      >
                        <option value={5}>5 Stars - Outstanding</option>
                        <option value={4}>4 Stars - Very Good</option>
                        <option value={3}>3 Stars - Average</option>
                        <option value={2}>2 Stars - Subpar</option>
                        <option value={1}>1 Star - Poor</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Review Title
                    </label>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="e.g. Incredible acoustic clarity"
                      className="w-full bg-white border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#229C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Your Comments
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your experience regarding build quality, battery, sound, or comfort..."
                      className="w-full bg-white border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#229C32]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-[#229C32] hover:bg-[#187C29] text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-colors cursor-pointer"
                  >
                    Publish Review
                  </button>
                </form>
              )}

              {/* Existing Reviews List */}
              <div className="space-y-4">
                {product.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-2xl bg-[#F7F7F8] border border-[#E8E8E8] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#171717]">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] font-bold text-[#229C32] bg-[#229C32]/10 px-2 py-0.5 rounded-full">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating ? 'fill-amber-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>

                    <h5 className="font-bold text-sm text-[#171717]">{rev.title}</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-extrabold text-[#171717] font-['Space_Grotesk']">
                  Related Hardware
                </h3>
                <p className="text-xs text-gray-500">Frequently paired with this gadget</p>
              </div>
              <button
                onClick={() => navigateTo('shop')}
                className="text-xs font-bold text-[#229C32] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>View Full Store</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
