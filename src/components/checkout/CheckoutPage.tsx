import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { DeliveryAddress, PaymentMethod } from '../../types';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Truck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Tag,
  DollarSign,
  Package,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    appliedCoupon,
    applyCoupon,
    currentUser,
    createOrder,
    navigateTo,
  } = useStore();

  // Pre-fill from current user if saved
  const defaultAddress = currentUser?.savedAddresses[0];

  const [formData, setFormData] = useState<DeliveryAddress>({
    fullName: defaultAddress?.fullName || (currentUser?.name ? currentUser.name : ''),
    email: defaultAddress?.email || (currentUser?.email ? currentUser.email : ''),
    phone: defaultAddress?.phone || '',
    country: defaultAddress?.country || 'United States',
    streetAddress: defaultAddress?.streetAddress || '',
    city: defaultAddress?.city || '',
    state: defaultAddress?.state || 'CA',
    postalCode: defaultAddress?.postalCode || '',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  // Card payment dummy state
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-[#F7F7F8] min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-[#E8E8E8] shadow-sm space-y-4">
          <Package className="w-12 h-12 text-gray-400 mx-auto" />
          <h2 className="text-xl font-bold text-[#171717]">Your Cart is Empty</h2>
          <p className="text-xs text-gray-500">Please add items to cart before proceeding to checkout.</p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#229C32] text-white text-xs font-bold py-2.5 px-6 rounded-xl cursor-pointer"
          >
            Return to Store
          </button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.streetAddress || !formData.city) {
      alert('Please fill out all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      createOrder({
        shippingAddress: formData,
        shippingMethod,
        paymentMethod,
      });
      setIsSubmitting(false);
      navigateTo('order-confirmation');
    }, 800);
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      applyCoupon(couponCode);
      setCouponCode('');
    }
  };

  return (
    <div className="bg-[#F7F7F8] min-h-screen text-[#171717] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigateTo('cart')}
            className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-black cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shopping Cart</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Lock className="w-3.5 h-3.5 text-[#229C32]" />
            <span>256-Bit SSL End-to-End Encrypted</span>
          </div>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Shipping & Payment Information */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Customer Contact & Delivery Address */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E8] shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#101114] text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h2 className="text-lg font-bold text-[#171717]">Delivery Address</h2>
                  </div>
                  {currentUser && (
                    <span className="text-xs text-[#229C32] font-semibold">
                      Logged in as {currentUser.email}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Vance"
                      className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alex.vance@example.com"
                      className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="streetAddress"
                      required
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="Street name, apartment, suite, unit"
                      className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="San Francisco"
                      className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="California"
                      className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Postal Code / ZIP *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="94111"
                      className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Method */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E8] shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <span className="w-7 h-7 rounded-full bg-[#101114] text-white text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h2 className="text-lg font-bold text-[#171717]">Shipping Method</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-start justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      shippingMethod === 'standard'
                        ? 'border-[#229C32] bg-[#229C32]/5'
                        : 'border-[#E8E8E8] hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm text-[#171717] block">Standard Ground</span>
                      <span className="text-xs text-gray-500">3-5 Business Days Delivery</span>
                    </div>
                    <span className="font-bold text-xs text-[#229C32]">
                      {shipping === 0 ? 'FREE' : '$9.99'}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-start justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      shippingMethod === 'express'
                        ? 'border-[#229C32] bg-[#229C32]/5'
                        : 'border-[#E8E8E8] hover:border-gray-300'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm text-[#171717] block">FedEx Priority Air</span>
                      <span className="text-xs text-gray-500">1-2 Business Days Tracking</span>
                    </div>
                    <span className="font-bold text-xs text-[#171717]">$14.99</span>
                  </label>
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E8] shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <span className="w-7 h-7 rounded-full bg-[#101114] text-white text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h2 className="text-lg font-bold text-[#171717]">Payment Method</h2>
                </div>

                {/* Method selector tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#229C32] bg-[#229C32]/5 text-[#171717]'
                        : 'border-[#E8E8E8] text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#229C32]" />
                    <span>Credit Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'paypal'
                        ? 'border-[#229C32] bg-[#229C32]/5 text-[#171717]'
                        : 'border-[#E8E8E8] text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-blue-600 font-extrabold text-sm font-serif">PayPal</span>
                    <span>PayPal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-3 rounded-xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'apple_pay'
                        ? 'border-[#229C32] bg-[#229C32]/5 text-[#171717]'
                        : 'border-[#E8E8E8] text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-extrabold text-sm"> Pay</span>
                    <span>Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border-2 text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#229C32] bg-[#229C32]/5 text-[#171717]'
                        : 'border-[#E8E8E8] text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <DollarSign className="w-5 h-5 text-amber-500" />
                    <span>Cash On Deliv.</span>
                  </button>
                </div>

                {/* Card Fields */}
                {paymentMethod === 'card' && (
                  <div className="bg-[#F7F7F8] p-5 rounded-2xl border border-[#E8E8E8] space-y-3 mt-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full bg-white border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#229C32]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={cardExp}
                          onChange={(e) => setCardExp(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full bg-white border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#229C32]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">CVC / CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="•••"
                          className="w-full bg-white border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#229C32]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Sticky Order Review */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl border border-[#E8E8E8] p-6 sm:p-8 shadow-sm space-y-5">
                <h3 className="text-lg font-bold text-[#171717]">Order Breakdown</h3>

                {/* Mini items list */}
                <div className="divide-y divide-gray-100 max-h-60 overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}`}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-lg bg-[#F7F7F8] border border-[#E8E8E8] shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-[#171717] truncate">{item.product.name}</p>
                          <p className="text-gray-500">
                            Qty: {item.quantity} • {item.selectedColor}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-[#171717] shrink-0">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo code (VOLTX20)"
                      className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:border-[#229C32]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="bg-[#101114] text-white text-xs font-bold px-3 py-2 rounded-xl cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-[11px] text-[#229C32] font-semibold mt-1">
                      ✓ Coupon {appliedCoupon.code} applied (-${discount.toFixed(2)})
                    </p>
                  )}
                </div>

                {/* Pricing Table */}
                <div className="space-y-2 text-xs text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#171717]">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#229C32]">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#171717]">
                      {shippingMethod === 'express' ? (
                        '$14.99'
                      ) : shipping === 0 ? (
                        <strong className="text-[#229C32]">FREE</strong>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sales Tax (8%)</span>
                    <span className="font-semibold text-[#171717]">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-[#171717] border-t border-gray-100 pt-3">
                    <span>Total Due</span>
                    <span className="text-xl text-[#229C32]">
                      $
                      {(
                        total + (shippingMethod === 'express' ? 14.99 - (shipping || 0) : 0)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#229C32] hover:bg-[#187C29] text-white font-bold py-4 px-6 rounded-xl text-base transition-all shadow-[0_0_20px_rgba(34,156,50,0.3)] hover:shadow-[0_0_25px_rgba(34,156,50,0.5)] cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Processing Payment...' : 'Complete Order'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center text-[10px] text-gray-400 space-y-1">
                  <p>By placing this order you agree to VOLTX GEAR terms & privacy.</p>
                  <p>30-Day Money Back Guarantee • Free Express Returns</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
