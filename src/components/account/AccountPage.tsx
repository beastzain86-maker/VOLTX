import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order, DeliveryAddress } from '../../types';
import {
  User as UserIcon,
  Package,
  MapPin,
  Settings,
  LogOut,
  Plus,
  Trash2,
  ExternalLink,
  Shield,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    login,
    signup,
    logout,
    updateUserProfile,
    addDeliveryAddress,
    removeDeliveryAddress,
    orders,
    navigateTo,
    navigateToProduct,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Address form modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState<DeliveryAddress>({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    country: 'United States',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    isDefault: false,
  });

  // Auth toggle when not logged in
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPassword, setAuthPassword] = useState('');

  if (!currentUser) {
    return (
      <div className="bg-[#F7F7F8] min-h-screen py-16 flex items-center justify-center px-4">
        <div className="bg-white max-w-md w-full p-8 rounded-3xl border border-[#E8E8E8] shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-[#229C32]/10 text-[#229C32] rounded-2xl flex items-center justify-center mx-auto">
              <UserIcon className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-[#171717] font-['Space_Grotesk']">
              {authMode === 'login' ? 'Welcome Back' : 'Create Customer Account'}
            </h2>
            <p className="text-xs text-gray-500">
              Access your order history, parcel tracking, and saved delivery addresses.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (authMode === 'login') {
                login(authEmail || 'customer@voltxgear.com');
              } else {
                signup(authName || 'Valued Customer', authEmail);
              }
            }}
            className="space-y-4"
          >
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="Alex Vance"
                  className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="alex.vance@example.com"
                className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#229C32] hover:bg-[#187C29] text-white font-bold py-3 rounded-xl text-xs transition-colors cursor-pointer shadow-md"
            >
              {authMode === 'login' ? 'Sign In to Account' : 'Register Account'}
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="pt-2 border-t border-gray-100 space-y-2">
            <button
              onClick={() => login('alex.vance@techgear.io', 'customer')}
              className="w-full bg-[#F7F7F8] hover:bg-gray-100 text-[#171717] font-semibold py-2 rounded-xl text-xs border border-[#E8E8E8] transition-colors cursor-pointer"
            >
              Demo Customer Login (One-Click)
            </button>
            <button
              onClick={() => login('admin@voltxgear.com', 'admin')}
              className="w-full bg-[#101114] hover:bg-[#18191D] text-white font-semibold py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#229C32]" />
              <span>Sign In as Store Administrator</span>
            </button>
          </div>

          <div className="text-center text-xs text-gray-500 pt-2">
            {authMode === 'login' ? (
              <span>
                Don't have an account?{' '}
                <button
                  onClick={() => setAuthMode('signup')}
                  className="text-[#229C32] font-bold hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="text-[#229C32] font-bold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.streetAddress || !newAddr.city) return;
    addDeliveryAddress(newAddr);
    setShowAddressModal(false);
    setNewAddr({
      fullName: currentUser.name,
      email: currentUser.email,
      phone: '',
      country: 'United States',
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      isDefault: false,
    });
  };

  return (
    <div className="bg-[#F7F7F8] min-h-screen text-[#171717] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Account Header */}
        <div className="bg-white rounded-3xl border border-[#E8E8E8] p-6 sm:p-8 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#101114] text-white flex items-center justify-center text-xl font-bold font-['Space_Grotesk'] border-2 border-[#229C32]/40">
              {currentUser.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight font-['Space_Grotesk']">
                  {currentUser.name}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#229C32]/10 text-[#229C32] px-2 py-0.5 rounded">
                  {currentUser.role}
                </span>
              </div>
              <p className="text-xs text-gray-500">{currentUser.email}</p>
              <p className="text-[11px] text-gray-400 mt-1">
                Customer since {currentUser.joinedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser.role === 'admin' && (
              <button
                onClick={() => navigateTo('admin')}
                className="bg-[#101114] hover:bg-[#18191D] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Shield className="w-4 h-4 text-[#229C32]" />
                <span>Admin Console</span>
              </button>
            )}
            <button
              onClick={logout}
              className="text-gray-500 hover:text-[#D93636] border border-[#E8E8E8] hover:border-red-200 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E8E8E8] pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#101114] text-white'
                : 'text-gray-600 hover:text-black bg-white border border-[#E8E8E8]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'addresses'
                ? 'bg-[#101114] text-white'
                : 'text-gray-600 hover:text-black bg-white border border-[#E8E8E8]'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Saved Addresses ({currentUser.savedAddresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#101114] text-white'
                : 'text-gray-600 hover:text-black bg-white border border-[#E8E8E8]'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Account Settings</span>
          </button>
        </div>

        {/* Tab 1: Orders List */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-[#E8E8E8] text-center max-w-md mx-auto space-y-3">
                <Package className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="text-base font-bold text-[#171717]">No Orders Placed Yet</h3>
                <p className="text-xs text-gray-500">
                  Your shipped items and tracking history will appear here.
                </p>
                <button
                  onClick={() => navigateTo('shop')}
                  className="bg-[#229C32] text-white text-xs font-bold py-2.5 px-6 rounded-xl cursor-pointer"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white p-6 rounded-3xl border border-[#E8E8E8] shadow-sm hover:border-gray-300 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-[#171717]">
                        {ord.orderNumber}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500">Placed on {ord.date}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                          ord.status === 'delivered'
                            ? 'bg-[#229C32]/10 text-[#229C32]'
                            : ord.status === 'shipped'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {ord.status}
                      </span>
                      <span className="font-extrabold text-sm text-[#171717]">
                        ${ord.total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Items preview */}
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-3 overflow-x-auto py-1">
                      {ord.items.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => navigateToProduct(item.product.id)}
                          className="flex items-center gap-2 p-1.5 rounded-xl border border-[#E8E8E8] bg-[#F7F7F8] hover:border-[#229C32] cursor-pointer transition-colors"
                          title={item.product.name}
                        >
                          <img
                            src={item.product.images[0]}
                            alt=""
                            className="w-10 h-10 object-cover rounded-lg"
                          />
                          <span className="text-xs font-bold text-[#171717] max-w-[120px] truncate">
                            {item.product.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrderDetails(ord)}
                        className="text-xs font-bold text-[#229C32] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Order Details</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Tracking Bar */}
                  {ord.trackingNumber && (
                    <div className="bg-[#F7F7F8] p-3 rounded-xl border border-[#E8E8E8] flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#229C32]" />
                        <span>{ord.estimatedDelivery}</span>
                      </div>
                      <span className="font-mono text-[11px] text-gray-500">
                        {ord.carrier}: {ord.trackingNumber}
                      </span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#171717]">Shipping Destinations</h3>
              <button
                onClick={() => setShowAddressModal(true)}
                className="bg-[#229C32] hover:bg-[#187C29] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentUser.savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white p-6 rounded-3xl border border-[#E8E8E8] shadow-sm relative flex flex-col justify-between"
                >
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-[#171717]">{addr.fullName}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold text-[#229C32] bg-[#229C32]/10 px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{addr.streetAddress}</p>
                    <p className="text-gray-600">
                      {addr.city}, {addr.state} {addr.postalCode}
                    </p>
                    <p className="text-gray-600">{addr.country}</p>
                    <p className="text-gray-500 pt-1 font-mono">{addr.phone}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end mt-4">
                    <button
                      onClick={() => addr.id && removeDeliveryAddress(addr.id)}
                      className="text-xs text-gray-400 hover:text-[#D93636] flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E8] shadow-sm max-w-xl">
            <h3 className="text-lg font-bold text-[#171717] mb-6">Profile Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={currentUser.name}
                  onChange={(e) => updateUserProfile({ name: e.target.value })}
                  className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue={currentUser.email}
                  onChange={(e) => updateUserProfile({ email: e.target.value })}
                  className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#229C32]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('Profile preferences updated in secure storage.')}
                  className="bg-[#101114] text-white text-xs font-bold py-2.5 px-6 rounded-xl cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Details Modal */}
        {selectedOrderDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-bold text-[#171717]">
                    Order #{selectedOrderDetails.orderNumber}
                  </h3>
                  <p className="text-xs text-gray-500">Date: {selectedOrderDetails.date}</p>
                </div>
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="text-gray-400 hover:text-black font-bold text-sm cursor-pointer p-1"
                >
                  ✕
                </button>
              </div>

              {/* Items */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-gray-500">Items Ordered</h4>
                <div className="divide-y divide-gray-100">
                  {selectedOrderDetails.items.map((item, idx) => (
                    <div key={idx} className="py-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt=""
                          className="w-12 h-12 object-cover rounded-lg border border-[#E8E8E8]"
                        />
                        <div>
                          <p className="font-bold text-[#171717]">{item.product.name}</p>
                          <p className="text-gray-500">
                            Finish: {item.selectedColor} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-[#171717]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financials */}
              <div className="bg-[#F7F7F8] p-4 rounded-2xl border border-[#E8E8E8] space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${selectedOrderDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{selectedOrderDetails.shippingCost === 0 ? 'FREE' : `$${selectedOrderDetails.shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>${selectedOrderDetails.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#171717] pt-2 border-t border-[#E8E8E8]">
                  <span>Total Paid:</span>
                  <span className="text-[#229C32]">${selectedOrderDetails.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="bg-[#101114] text-white text-xs font-bold py-2.5 px-6 rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Address Modal */}
        {showAddressModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-[#171717]">Add New Delivery Address</h3>
              <form onSubmit={handleSaveAddress} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newAddr.fullName}
                    onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                    className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={newAddr.streetAddress}
                    onChange={(e) => setNewAddr({ ...newAddr, streetAddress: e.target.value })}
                    className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">State / Zip</label>
                    <input
                      type="text"
                      required
                      value={newAddr.postalCode}
                      onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                      className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                    className="w-full bg-[#F7F7F8] border border-[#E8E8E8] rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(false)}
                    className="px-4 py-2 text-xs text-gray-500 hover:text-black cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#229C32] text-white text-xs font-bold px-5 py-2 rounded-xl cursor-pointer"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
