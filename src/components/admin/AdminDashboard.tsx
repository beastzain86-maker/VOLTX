import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Order, OrderStatus, Coupon } from '../../types';
import {
  Shield,
  Package,
  DollarSign,
  Users,
  ShoppingCart,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Tag,
  Mail,
  Settings,
  Server,
  ArrowLeft,
  X,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    createCoupon,
    subscribers,
    categories,
    navigateTo,
    addToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'coupons' | 'subscribers'>('overview');

  // Add product modal state
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProd, setNewProd] = useState<Omit<Product, 'id' | 'createdAt'>>({
    name: '',
    tagline: '',
    slug: '',
    brand: 'VOLTX',
    category: 'Wireless Earbuds',
    price: 99,
    originalPrice: 129,
    discountPercent: 23,
    rating: 4.8,
    reviewCount: 1,
    stock: 25,
    isNew: true,
    isSale: false,
    isFeatured: true,
    isBestSeller: false,
    images: ['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=900&auto=format&fit=crop'],
    colors: [{ name: 'Matte Black', hex: '#111215', inStock: true }],
    shortDesc: 'High-performance audio equipment built with custom acoustic transducers.',
    description: 'Engineered for audio purists and daily commuters alike.',
    features: ['Active Noise Cancellation', 'Hi-Res Audio Certified', 'Long-lasting battery'],
    specs: { Driver: '10mm Dynamic', Battery: '30h Total' },
    reviews: [],
  });

  // New coupon modal state
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(50);
  const [newCouponDesc, setNewCouponDesc] = useState('');

  // Editing product modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Stats calculation
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCustomers = 48 + orders.length; // simulated pool + real orders

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;
    addProduct({
      ...newProd,
      slug: newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    });
    setShowAddProductModal(false);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    createCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      minSpend: Number(newCouponMin),
      description: newCouponDesc || `${newCouponDiscount}% off order`,
      isActive: true,
    });
    setShowCouponModal(false);
    setNewCouponCode('');
  };

  return (
    <div className="bg-[#101114] min-h-screen text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Admin Header */}
        <div className="bg-[#18191D] rounded-3xl border border-[#25272B] p-6 sm:p-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#229C32]/20 border border-[#229C32]/40 text-[#229C32] flex items-center justify-center">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
                  VOLTX Commerce Control Center
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#229C32] text-white px-2 py-0.5 rounded">
                  Admin Active
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Manage live catalog items, customer orders, promotions, and store settings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('hostinger-guide')}
              className="bg-[#25272B] hover:bg-[#32353B] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-colors cursor-pointer border border-[#32353B]"
            >
              <Server className="w-4 h-4 text-blue-400" />
              <span>Hostinger Config</span>
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="bg-[#229C32] hover:bg-[#187C29] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>View Customer Storefront</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#25272B] pb-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#229C32] text-white'
                : 'text-gray-400 hover:text-white bg-[#18191D]'
            }`}
          >
            Overview & Metrics
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#229C32] text-white'
                : 'text-gray-400 hover:text-white bg-[#18191D]'
            }`}
          >
            Products ({totalProducts})
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#229C32] text-white'
                : 'text-gray-400 hover:text-white bg-[#18191D]'
            }`}
          >
            Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'coupons'
                ? 'bg-[#229C32] text-white'
                : 'text-gray-400 hover:text-white bg-[#18191D]'
            }`}
          >
            Coupons ({coupons.length})
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'subscribers'
                ? 'bg-[#229C32] text-white'
                : 'text-gray-400 hover:text-white bg-[#18191D]'
            }`}
          >
            Newsletter Leads ({subscribers.length})
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#18191D] p-6 rounded-3xl border border-[#25272B] space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span>Gross Sales</span>
                  <DollarSign className="w-4 h-4 text-[#229C32]" />
                </div>
                <p className="text-3xl font-extrabold text-white">${totalSales.toFixed(2)}</p>
                <p className="text-[11px] text-[#229C32] font-semibold flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +28.4% from last period
                </p>
              </div>

              <div className="bg-[#18191D] p-6 rounded-3xl border border-[#25272B] space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span>Completed Orders</span>
                  <ShoppingCart className="w-4 h-4 text-blue-400" />
                </div>
                <p className="text-3xl font-extrabold text-white">{totalOrders}</p>
                <p className="text-[11px] text-gray-400 font-semibold">100% fulfillment rate</p>
              </div>

              <div className="bg-[#18191D] p-6 rounded-3xl border border-[#25272B] space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span>Active Catalog Products</span>
                  <Package className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-3xl font-extrabold text-white">{totalProducts}</p>
                <p className="text-[11px] text-gray-400 font-semibold">Across 8 categories</p>
              </div>

              <div className="bg-[#18191D] p-6 rounded-3xl border border-[#25272B] space-y-2">
                <div className="flex items-center justify-between text-gray-400 text-xs">
                  <span>VIP Subscribers</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <p className="text-3xl font-extrabold text-white">{subscribers.length}</p>
                <p className="text-[11px] text-gray-400 font-semibold">Email marketing leads</p>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="bg-[#18191D] rounded-3xl border border-[#25272B] p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#25272B]">
                <h3 className="text-base font-bold text-white">Latest Dispatches</h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-[#229C32] hover:underline cursor-pointer"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead>
                    <tr className="border-b border-[#25272B] text-gray-400 font-semibold">
                      <th className="py-3 px-4">Order #</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Carrier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((o) => (
                      <tr key={o.id} className="border-b border-[#25272B]/50 hover:bg-[#25272B]/30">
                        <td className="py-3.5 px-4 font-mono font-bold text-white">{o.orderNumber}</td>
                        <td className="py-3.5 px-4">{o.shippingAddress.fullName}</td>
                        <td className="py-3.5 px-4 text-gray-400">{o.date}</td>
                        <td className="py-3.5 px-4 font-bold text-white">${o.total.toFixed(2)}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full font-bold uppercase text-[10px] ${
                              o.status === 'delivered'
                                ? 'bg-[#229C32]/20 text-[#229C32]'
                                : o.status === 'shipped'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-gray-400 font-mono">{o.carrier || 'Standard'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Products CRUD Table */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Hardware Catalog</h3>
                <p className="text-xs text-gray-400">Add, edit pricing, or restock inventory items.</p>
              </div>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="bg-[#229C32] hover:bg-[#187C29] text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="bg-[#18191D] rounded-3xl border border-[#25272B] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-300">
                  <thead>
                    <tr className="border-b border-[#25272B] bg-[#141518] text-gray-400 font-semibold">
                      <th className="py-3.5 px-4">Product</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Brand</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Stock</th>
                      <th className="py-3.5 px-4">Rating</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-b border-[#25272B]/50 hover:bg-[#25272B]/40">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.images[0]}
                              alt=""
                              className="w-10 h-10 object-cover rounded-lg border border-[#25272B]"
                            />
                            <div className="max-w-xs">
                              <p className="font-bold text-white truncate">{p.name}</p>
                              <span className="text-[10px] text-gray-400 truncate block">
                                {p.tagline}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#229C32] font-semibold">{p.category}</td>
                        <td className="py-3.5 px-4 text-gray-400">{p.brand}</td>
                        <td className="py-3.5 px-4 font-bold text-white">${p.price}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`font-bold ${
                              p.stock <= 5 ? 'text-[#D93636]' : 'text-gray-300'
                            }`}
                          >
                            {p.stock} units
                          </span>
                        </td>
                        <td className="py-3.5 px-4">★ {p.rating} ({p.reviewCount})</td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setEditingProduct(p)}
                              className="p-1.5 text-gray-400 hover:text-white hover:bg-[#25272B] rounded-lg transition-colors cursor-pointer"
                              title="Edit product"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 text-gray-400 hover:text-[#D93636] hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Order Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white">Customer Order Operations</h3>
              <p className="text-xs text-gray-400">
                Update status from Processing to Shipped or Delivered.
              </p>
            </div>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-[#18191D] p-6 rounded-3xl border border-[#25272B] space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#25272B] gap-3">
                    <div>
                      <span className="font-mono font-bold text-white text-base">
                        Order #{ord.orderNumber}
                      </span>
                      <p className="text-xs text-gray-400">
                        Customer: <strong className="text-white">{ord.shippingAddress.fullName}</strong> ({ord.shippingAddress.email})
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">Change Status:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="bg-[#101114] border border-[#25272B] rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-[#229C32] cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-300">
                    <div>
                      <span className="text-gray-500 block">Delivery Address:</span>
                      <p>{ord.shippingAddress.streetAddress}</p>
                      <p>{ord.shippingAddress.city}, {ord.shippingAddress.postalCode}</p>
                    </div>

                    <div>
                      <span className="text-gray-500 block">Ordered Items:</span>
                      {ord.items.map((i, idx) => (
                        <p key={idx}>
                          {i.quantity}x {i.product.name} ({i.selectedColor})
                        </p>
                      ))}
                    </div>

                    <div>
                      <span className="text-gray-500 block">Financial Summary:</span>
                      <p>Payment: {ord.paymentMethod.toUpperCase()}</p>
                      <p className="font-bold text-white text-sm mt-0.5">
                        Total: ${ord.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Coupons */}
        {activeTab === 'coupons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Promo Codes & Discounts</h3>
                <p className="text-xs text-gray-400">Manage promotional marketing campaigns.</p>
              </div>
              <button
                onClick={() => setShowCouponModal(true)}
                className="bg-[#229C32] hover:bg-[#187C29] text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Coupon</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="bg-[#18191D] p-6 rounded-3xl border border-[#25272B] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-extrabold text-lg text-[#229C32] bg-[#229C32]/10 border border-[#229C32]/30 px-3 py-1 rounded-xl">
                      {c.code}
                    </span>
                    <span className="text-xs font-bold text-white bg-[#25272B] px-2 py-0.5 rounded">
                      {c.discountPercent}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">{c.description}</p>
                  <div className="text-[11px] text-gray-500 pt-2 border-t border-[#25272B]">
                    Min spend: ${c.minSpend || 0} • Status: Active
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="bg-[#18191D] rounded-3xl border border-[#25272B] p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#25272B]">
              <div>
                <h3 className="text-lg font-bold text-white">Newsletter VIP Subscribers</h3>
                <p className="text-xs text-gray-400">Email marketing audience</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(subscribers.join(', '));
                  addToast('All subscriber emails copied to clipboard!', 'info');
                }}
                className="bg-[#25272B] hover:bg-[#32353B] text-white text-xs font-bold py-2 px-3 rounded-xl cursor-pointer"
              >
                Copy All Emails
              </button>
            </div>

            <div className="divide-y divide-[#25272B]">
              {subscribers.map((email, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#229C32]" />
                    <span className="font-medium text-white">{email}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">Subscribed & Verified</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Add Product */}
        {showAddProductModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#18191D] border border-[#25272B] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4 text-white">
              <div className="flex items-center justify-between pb-3 border-b border-[#25272B]">
                <h3 className="text-lg font-bold">Add New Hardware Item</h3>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="p-1 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    placeholder="VOLTX Matrix Studio Audio"
                    className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#229C32]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Category</label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                      className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#229C32]"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Brand</label>
                    <input
                      type="text"
                      value={newProd.brand}
                      onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                      className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#229C32]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Price ($)</label>
                    <input
                      type="number"
                      required
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                      className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#229C32]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Original Price ($)</label>
                    <input
                      type="number"
                      value={newProd.originalPrice || ''}
                      onChange={(e) => setNewProd({ ...newProd, originalPrice: Number(e.target.value) })}
                      className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#229C32]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Stock Quantity</label>
                    <input
                      type="number"
                      required
                      value={newProd.stock}
                      onChange={(e) => setNewProd({ ...newProd, stock: Number(e.target.value) })}
                      className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#229C32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Product Image URL</label>
                  <input
                    type="url"
                    required
                    value={newProd.images[0]}
                    onChange={(e) => setNewProd({ ...newProd, images: [e.target.value] })}
                    className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#229C32]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-300 mb-1">Short Description</label>
                  <textarea
                    rows={2}
                    value={newProd.shortDesc}
                    onChange={(e) => setNewProd({ ...newProd, shortDesc: e.target.value })}
                    className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#229C32]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#229C32] hover:bg-[#187C29] text-white font-bold px-6 py-2 rounded-xl cursor-pointer"
                  >
                    Save & Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Product */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#18191D] border border-[#25272B] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-4 text-white">
              <div className="flex items-center justify-between pb-3 border-b border-[#25272B]">
                <h3 className="text-lg font-bold">Edit Product: {editingProduct.name}</h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="p-1 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Price ($)</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                      }
                      className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-300 mb-1">Stock</label>
                    <input
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })
                      }
                      className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 text-gray-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#229C32] hover:bg-[#187C29] text-white font-bold px-6 py-2 rounded-xl cursor-pointer"
                  >
                    Update Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: New Coupon */}
        {showCouponModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#18191D] border border-[#25272B] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-white">
              <h3 className="text-lg font-bold">Create Promo Code</h3>
              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    placeholder="e.g. FLASH30"
                    className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white uppercase font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Discount %</label>
                  <input
                    type="number"
                    required
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                    className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-300 mb-1">Minimum Spend ($)</label>
                  <input
                    type="number"
                    value={newCouponMin}
                    onChange={(e) => setNewCouponMin(Number(e.target.value))}
                    className="w-full bg-[#101114] border border-[#25272B] rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCouponModal(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#229C32] text-white font-bold px-5 py-2 rounded-xl cursor-pointer"
                  >
                    Activate Coupon
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
