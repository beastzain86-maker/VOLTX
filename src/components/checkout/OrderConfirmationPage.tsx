import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
  MapPin,
  ExternalLink,
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { lastOrder, navigateTo } = useStore();

  if (!lastOrder) {
    return (
      <div className="bg-[#F7F7F8] min-h-screen py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-[#E8E8E8]">
          <h2 className="text-xl font-bold mb-2">No Active Order Found</h2>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-[#229C32] text-white text-xs font-bold py-2.5 px-6 rounded-xl"
          >
            Explore Store Catalog
          </button>
        </div>
      </div>
    );
  }

  const order = lastOrder;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#F7F7F8] min-h-screen text-[#171717] py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Success Badge */}
        <div className="bg-white rounded-3xl border border-[#E8E8E8] shadow-sm p-8 sm:p-12 text-center space-y-4 mb-8">
          <div className="w-16 h-16 bg-[#229C32]/10 text-[#229C32] rounded-full flex items-center justify-center mx-auto mb-2 border border-[#229C32]/30 shadow-[0_0_20px_rgba(34,156,50,0.2)]">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <span className="text-xs font-extrabold uppercase tracking-widest text-[#229C32] bg-[#229C32]/10 px-3 py-1 rounded-full">
            Payment Verified & Dispatched
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight font-['Space_Grotesk']">
            Thank you for your order!
          </h1>

          <p className="text-sm text-gray-600 max-w-lg mx-auto">
            We have emailed your confirmation receipt and live tracking information to{' '}
            <strong className="text-[#171717]">{order.shippingAddress.email}</strong>.
          </p>

          <div className="inline-flex items-center gap-4 bg-[#F7F7F8] border border-[#E8E8E8] px-5 py-3 rounded-2xl text-xs font-mono font-bold mt-2">
            <span>Order Reference: <span className="text-[#229C32]">{order.orderNumber}</span></span>
            <span className="text-gray-300">|</span>
            <span>Date: {order.date}</span>
          </div>
        </div>

        {/* Live Tracking Progress Timeline */}
        <div className="bg-white rounded-3xl border border-[#E8E8E8] shadow-sm p-6 sm:p-8 mb-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold text-[#229C32] uppercase tracking-wider">
                Status: {order.status.toUpperCase()}
              </span>
              <h3 className="text-base font-bold text-[#171717]">Delivery Progress</h3>
            </div>
            <div className="text-right text-xs">
              <span className="text-gray-500">Carrier:</span>{' '}
              <strong className="text-[#171717]">{order.carrier || 'FedEx Express'}</strong>
              <p className="text-[11px] font-mono text-gray-500">
                Tracking #{order.trackingNumber}
              </p>
            </div>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="space-y-1.5">
              <div className="w-7 h-7 mx-auto rounded-full bg-[#229C32] text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <p className="font-bold text-[#171717]">Confirmed</p>
              <p className="text-[10px] text-gray-400">Payment clear</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-7 h-7 mx-auto rounded-full bg-[#229C32] text-white flex items-center justify-center font-bold animate-pulse">
                2
              </div>
              <p className="font-bold text-[#171717]">Processing</p>
              <p className="text-[10px] text-[#229C32]">Packing in lab</p>
            </div>
            <div className="space-y-1.5 opacity-60">
              <div className="w-7 h-7 mx-auto rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                3
              </div>
              <p className="font-semibold text-gray-600">In Transit</p>
              <p className="text-[10px] text-gray-400">Carrier pickup</p>
            </div>
            <div className="space-y-1.5 opacity-60">
              <div className="w-7 h-7 mx-auto rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">
                4
              </div>
              <p className="font-semibold text-gray-600">Delivered</p>
              <p className="text-[10px] text-gray-400">Arrives {order.estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E8E8] shadow-sm space-y-2 text-xs">
            <h4 className="font-bold text-sm text-[#171717] flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-[#229C32]" />
              <span>Destination Address</span>
            </h4>
            <p className="font-bold text-gray-800 text-sm">{order.shippingAddress.fullName}</p>
            <p className="text-gray-600">{order.shippingAddress.streetAddress}</p>
            <p className="text-gray-600">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
            </p>
            <p className="text-gray-600">{order.shippingAddress.country}</p>
            <p className="text-gray-500 pt-1 font-mono">{order.shippingAddress.phone}</p>
          </div>

          {/* Payment Summary */}
          <div className="bg-white p-6 rounded-3xl border border-[#E8E8E8] shadow-sm space-y-2 text-xs">
            <h4 className="font-bold text-sm text-[#171717] flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-[#229C32]" />
              <span>Billing Summary</span>
            </h4>
            <div className="flex justify-between text-gray-600">
              <span>Payment Type:</span>
              <strong className="text-[#171717] uppercase">{order.paymentMethod.replace('_', ' ')}</strong>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Items Subtotal:</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#229C32]">
                <span>Discount Applied:</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Delivery Cost:</span>
              <span>{order.shippingCost === 0 ? 'FREE' : `$${order.shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Sales Tax:</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-[#171717] border-t border-gray-100 pt-2">
              <span>Grand Total Paid:</span>
              <span className="text-[#229C32]">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div className="bg-white rounded-3xl border border-[#E8E8E8] shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-base font-bold text-[#171717]">Items in This Shipment</h3>
          </div>
          <div className="divide-y divide-gray-100 p-6">
            {order.items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-xl bg-[#F7F7F8] border border-[#E8E8E8]"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[#171717]">{item.product.name}</h4>
                    <p className="text-xs text-gray-500">
                      Finish: {item.selectedColor} • Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-extrabold text-sm text-[#171717]">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#171717] border border-[#E8E8E8] font-bold text-xs py-3 px-6 rounded-xl transition-colors cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4 text-[#229C32]" />
            <span>Print Invoice & Packing Slip</span>
          </button>

          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#229C32] hover:bg-[#187C29] text-white font-bold text-xs py-3.5 px-8 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
