import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
  Truck,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    navigateTo,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');

  const freeShippingThreshold = 99;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    if (applyCoupon(couponCode)) {
      setCouponCode('');
    }
  };

  return (
    <div className="bg-[#F7F7F8] min-h-screen text-[#171717] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#171717] tracking-tight font-['Space_Grotesk']">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {cartCount} item{cartCount !== 1 ? 's' : ''} in your cart
            </p>
          </div>

          <button
            onClick={() => navigateTo('shop')}
            className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-black cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E8E8E8] p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-[#171717]">Your cart is currently empty</h2>
            <p className="text-xs text-gray-500">
              Explore our collection of flagship wireless earbuds, smartwatches, and accessories.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('shop')}
                className="bg-[#229C32] hover:bg-[#187C29] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(34,156,50,0.3)] cursor-pointer"
              >
                Start Shopping Now
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Items Table (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free Shipping Alert Banner */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8E8E8] shadow-sm">
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-[#229C32] font-bold flex items-center gap-1.5">
                      <Truck className="w-4 h-4" /> You unlocked FREE Express Shipping!
                    </span>
                  ) : (
                    <span className="text-gray-600">
                      Add <strong className="text-[#171717]">${remainingForFreeShipping.toFixed(2)}</strong> more to get <strong className="text-[#229C32]">Free Shipping</strong>
                    </span>
                  )}
                  <span className="text-gray-400 font-mono text-[11px]">
                    {progressToFreeShipping.toFixed(0)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#229C32] transition-all duration-500 rounded-full"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items Card List */}
              <div className="bg-white rounded-3xl border border-[#E8E8E8] shadow-sm overflow-hidden">
                <div className="p-6 divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}`}
                      className="py-6 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-xl bg-[#F7F7F8] border border-[#E8E8E8] shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-[#229C32] uppercase tracking-wider">
                            {item.product.brand}
                          </span>
                          <h3 className="font-bold text-sm text-[#171717] leading-snug">
                            {item.product.name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Finish: <span className="text-gray-800 font-medium">{item.selectedColor}</span>
                          </p>
                          <span className="text-sm font-extrabold text-[#171717] sm:hidden block mt-1">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                        <div className="flex items-center border border-[#E8E8E8] rounded-xl bg-[#F7F7F8] p-1">
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#171717]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                            }
                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="text-base font-extrabold text-[#171717] hidden sm:block w-20 text-right">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                          className="text-gray-400 hover:text-[#D93636] p-2 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs">
                  <button
                    onClick={clearCart}
                    className="text-gray-500 hover:text-[#D93636] cursor-pointer"
                  >
                    Clear entire cart
                  </button>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="text-[#229C32] font-bold hover:underline cursor-pointer sm:hidden"
                  >
                    + Add more items
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl border border-[#E8E8E8] p-6 shadow-sm space-y-5">
                <h3 className="text-lg font-bold text-[#171717]">Order Summary</h3>

                {/* Coupon Input Form */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon code (VOLTX20)"
                      className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl pl-9 pr-3 py-2 text-xs uppercase focus:outline-none focus:border-[#229C32]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[#101114] hover:bg-[#18191D] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs bg-[#229C32]/10 border border-[#229C32]/30 text-[#229C32] px-3 py-2 rounded-xl">
                    <span>
                      Coupon <strong>{appliedCoupon.code}</strong> applied (-${discount.toFixed(2)})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs hover:underline cursor-pointer font-bold"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {/* Pricing Breakdown */}
                <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#171717]">${subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-[#229C32]">
                      <span>Discount ({appliedCoupon?.discountPercent}%)</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#171717]">
                      {shipping === 0 ? <strong className="text-[#229C32]">FREE</strong> : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Estimated Sales Tax (8%)</span>
                    <span className="font-semibold text-[#171717]">${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-lg font-extrabold text-[#171717] border-t border-gray-100 pt-3">
                    <span>Total</span>
                    <span className="text-[#229C32]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => navigateTo('checkout')}
                  className="w-full flex items-center justify-center gap-2 bg-[#229C32] hover:bg-[#187C29] text-white font-bold py-4 px-6 rounded-xl text-base transition-all shadow-[0_0_20px_rgba(34,156,50,0.3)] hover:shadow-[0_0_25px_rgba(34,156,50,0.5)] cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-[#229C32]" />
                  <span>30-Day Money-Back Guarantee & SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
