import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus, Tag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    cartCount,
    subtotal,
    shipping,
    discount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    removeFromCart,
    updateCartQuantity,
    navigateTo,
  } = useStore();

  const [couponInput, setCouponInput] = React.useState('');

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 99;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Slide-out drawer */}
      <div className="relative w-full max-w-md bg-[#18191D] border-l border-[#25272B] h-full shadow-2xl flex flex-col justify-between z-10 text-white animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#25272B] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#229C32]" />
            <h3 className="text-lg font-bold">Shopping Cart</h3>
            <span className="text-xs bg-[#25272B] text-gray-300 font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 text-gray-400 hover:text-white bg-[#25272B] hover:bg-[#32353B] rounded-lg transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#101114] px-5 py-3 border-b border-[#25272B]">
          <div className="flex justify-between items-center text-xs mb-1.5">
            {remainingForFreeShipping === 0 ? (
              <span className="font-bold text-[#229C32] flex items-center gap-1">
                🎉 You qualified for FREE Express Shipping!
              </span>
            ) : (
              <span className="text-gray-300">
                Add <strong className="text-white">${remainingForFreeShipping.toFixed(2)}</strong> more for <strong className="text-[#229C32]">Free Shipping</strong>
              </span>
            )}
            <span className="text-[11px] text-gray-400 font-mono">
              {progressToFreeShipping.toFixed(0)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#25272B] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#229C32] transition-all duration-500 rounded-full"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-[#25272B] flex items-center justify-center mb-4 text-gray-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Your cart is empty</h4>
              <p className="text-xs text-gray-400 max-w-xs mb-6">
                Discover next-gen audio, smart accessories, and desk essentials.
              </p>
              <button
                onClick={() => {
                  setIsCartDrawerOpen(false);
                  navigateTo('shop');
                }}
                className="bg-[#229C32] hover:bg-[#187C29] text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(34,156,50,0.3)]"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="flex gap-4 p-3 rounded-xl bg-[#101114] border border-[#25272B]"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-18 h-18 object-cover rounded-lg bg-[#18191D] shrink-0 border border-[#25272B]"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-white leading-tight line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        className="text-gray-500 hover:text-[#D93636] p-0.5 transition-colors cursor-pointer shrink-0"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Color: <span className="text-gray-200">{item.selectedColor}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1">
                    <div className="flex items-center border border-[#25272B] rounded-lg bg-[#18191D]">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedColor, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.selectedColor, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Calculations */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#25272B] bg-[#101114] space-y-3">
            {/* Promo coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Promo code (e.g. VOLTX20)"
                  className="w-full bg-[#18191D] border border-[#25272B] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 uppercase focus:outline-none focus:border-[#229C32]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#25272B] hover:bg-[#32353B] text-gray-200 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Active Coupon Badge */}
            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs bg-[#229C32]/10 border border-[#229C32]/30 text-[#229C32] px-3 py-1.5 rounded-lg">
                <span className="font-medium">
                  Code <strong>{appliedCoupon.code}</strong> applied (-${discount.toFixed(2)})
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-xs hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Pricing breakdown */}
            <div className="space-y-1 text-xs text-gray-400 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#229C32]">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="text-white font-medium">
                  {shipping === 0 ? <strong className="text-[#229C32]">FREE</strong> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#25272B] pt-2 text-sm font-bold text-white">
                <span>Total</span>
                <span className="text-base text-[#229C32]">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-[#229C32] hover:bg-[#187C29] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-[0_0_20px_rgba(34,156,50,0.3)] hover:shadow-[0_0_25px_rgba(34,156,50,0.5)] cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#229C32]" />
              <span>256-Bit SSL Encrypted & 30-Day Money-Back Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
