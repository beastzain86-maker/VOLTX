import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  User,
  Coupon,
  ToastMessage,
  DeliveryAddress,
  OrderStatus,
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES, INITIAL_COUPONS } from '../data/products';

export type PageView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'wishlist'
  | 'account'
  | 'admin'
  | 'about'
  | 'contact'
  | 'hostinger-guide';

interface StoreContextType {
  // Navigation & View
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  selectedProductId: string | null;
  navigateToProduct: (productId: string) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (category: string | null) => void;
  navigateToCategory: (categoryName: string) => void;
  navigateTo: (page: PageView, options?: { productId?: string; category?: string }) => void;

  // Products
  products: Product[];
  categories: Category[];
  getProductById: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addProductReview: (productId: string, review: { author: string; rating: number; title: string; comment: string }) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor: string) => void;
  updateCartQuantity: (productId: string, selectedColor: string, quantity: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (product: Product) => void;
  clearWishlist: () => void;

  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  // Auth & Account
  currentUser: User | null;
  login: (email: string, role?: 'customer' | 'admin') => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  addDeliveryAddress: (address: DeliveryAddress) => void;
  removeDeliveryAddress: (id: string) => void;

  // Orders
  orders: Order[];
  lastOrder: Order | null;
  createOrder: (orderData: {
    shippingAddress: DeliveryAddress;
    shippingMethod: 'standard' | 'express';
    paymentMethod: Order['paymentMethod'];
  }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Coupons & Admin
  coupons: Coupon[];
  createCoupon: (coupon: Coupon) => void;
  subscribers: string[];
  addSubscriber: (email: string) => boolean;

  // Toasts
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastMessage['type'], title?: string) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEMO_USER: User = {
  id: 'usr-demo-1',
  name: 'Alex Vance',
  email: 'alex.vance@techgear.io',
  role: 'customer',
  joinedDate: '2026-01-10',
  savedAddresses: [
    {
      id: 'addr-1',
      fullName: 'Alex Vance',
      email: 'alex.vance@techgear.io',
      phone: '+1 (555) 234-8900',
      country: 'United States',
      city: 'San Francisco',
      state: 'CA',
      streetAddress: '742 Montgomery St, Suite 400',
      postalCode: '94111',
      isDefault: true,
    },
  ],
};

const DEMO_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'VTX-94821',
    date: '2026-10-28',
    status: 'delivered',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Stealth Black',
      },
      {
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        selectedColor: 'Volcanic Black',
      },
    ],
    shippingAddress: DEMO_USER.savedAddresses[0],
    shippingMethod: 'express',
    shippingCost: 0,
    subtotal: 318,
    discount: 31.8,
    tax: 22.89,
    total: 309.09,
    paymentMethod: 'card',
    couponCode: 'WELCOME10',
    trackingNumber: 'FX-884920194US',
    carrier: 'FedEx Express',
    estimatedDelivery: 'Delivered on Oct 30, 2026',
  },
  {
    id: 'ord-102',
    orderNumber: 'VTX-98240',
    date: '2026-11-02',
    status: 'shipped',
    items: [
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedColor: 'Matte Titanium',
      },
    ],
    shippingAddress: DEMO_USER.savedAddresses[0],
    shippingMethod: 'standard',
    shippingCost: 0,
    subtotal: 349,
    discount: 0,
    tax: 27.92,
    total: 376.92,
    paymentMethod: 'apple_pay',
    trackingNumber: 'UPS-9102481029',
    carrier: 'UPS Air Track',
    estimatedDelivery: 'Estimated by Nov 08, 2026',
  },
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('voltx_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const categories = INITIAL_CATEGORIES;

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('voltx_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Wishlist
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('voltx_wishlist');
      return saved ? JSON.parse(saved) : [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[4]];
    } catch {
      return [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[4]];
    }
  });

  // Quick View
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // User & Orders
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('voltx_user');
      return saved ? JSON.parse(saved) : DEMO_USER;
    } catch {
      return DEMO_USER;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('voltx_orders');
      return saved ? JSON.parse(saved) : DEMO_ORDERS;
    } catch {
      return DEMO_ORDERS;
    }
  });

  const [lastOrder, setLastOrder] = useState<Order | null>(() => {
    return orders.length > 0 ? orders[0] : null;
  });

  // Coupons & Subscribers
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [subscribers, setSubscribers] = useState<string[]>([
    'marcus.tech@example.com',
    'sarah.audio@example.com',
  ]);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('voltx_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('voltx_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('voltx_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('voltx_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('voltx_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('voltx_user');
    }
  }, [currentUser]);

  // Toast Helpers
  const addToast = (message: string, type: ToastMessage['type'] = 'success', title?: string) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, title }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation helpers
  const navigateTo = (page: PageView, options?: { productId?: string; category?: string }) => {
    if (options?.productId) {
      setSelectedProductId(options.productId);
    }
    if (options?.category !== undefined) {
      setSelectedCategoryFilter(options.category);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategory = (categoryName: string) => {
    setSelectedCategoryFilter(categoryName);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Products CRUD
  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: 'prod-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProducts((prev) => [newProduct, ...prev]);
    addToast(`"${newProduct.name}" added successfully to store catalog.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
    addToast('Product details updated.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product removed from catalog.', 'info');
  };

  const addProductReview = (
    productId: string,
    reviewData: { author: string; rating: number; title: string; comment: string }
  ) => {
    const newReview = {
      id: 'rev-' + Date.now(),
      author: reviewData.author || 'Verified Customer',
      rating: reviewData.rating,
      date: new Date().toISOString().split('T')[0],
      title: reviewData.title,
      comment: reviewData.comment,
      verified: true,
    };

    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [newReview, ...p.reviews];
          const avgRating =
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: Number(avgRating.toFixed(1)),
          };
        }
        return p;
      })
    );
    addToast('Thank you! Your verified review has been published.', 'success');
  };

  // Cart Management
  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    const color = selectedColor || product.colors[0]?.name || 'Standard';

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor: color }];
      }
    });

    addToast(`Added ${quantity}x "${product.name}" to cart`, 'success', 'Cart Updated');
  };

  const removeFromCart = (productId: string, selectedColor: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedColor === selectedColor))
    );
    addToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, selectedColor: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedColor === selectedColor) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.code === 'FREESHIP') {
      discount = 0;
    } else {
      discount = (subtotal * appliedCoupon.discountPercent) / 100;
    }
  }

  // Free shipping on orders over $99 or if coupon is FREESHIP
  const shipping =
    subtotal === 0 || subtotal >= 99 || appliedCoupon?.code === 'FREESHIP' ? 0 : 9.99;
  const tax = Number(((subtotal - discount) * 0.08).toFixed(2));
  const total = Number((subtotal - discount + shipping + tax).toFixed(2));

  const applyCoupon = (code: string): boolean => {
    const formattedCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === formattedCode && c.isActive);

    if (!found) {
      addToast('Invalid or expired coupon code.', 'error');
      return false;
    }

    if (found.minSpend && subtotal < found.minSpend) {
      addToast(`Minimum spend of $${found.minSpend} required for code ${found.code}.`, 'warning');
      return false;
    }

    setAppliedCoupon(found);
    addToast(`Coupon "${found.code}" applied successfully!`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon code removed.', 'info');
  };

  // Wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        addToast(`Removed "${product.name}" from wishlist`, 'info');
        return prev.filter((p) => p.id !== product.id);
      } else {
        addToast(`Saved "${product.name}" to wishlist`, 'success');
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const moveWishlistToCart = (product: Product) => {
    addToCart(product, 1);
    setWishlist((prev) => prev.filter((p) => p.id !== product.id));
  };

  const clearWishlist = () => {
    setWishlist([]);
    addToast('Wishlist cleared', 'info');
  };

  // Quick View
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // User Auth
  const login = (email: string, role: 'customer' | 'admin' = 'customer') => {
    const user: User = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0],
      email,
      role,
      joinedDate: new Date().toISOString().split('T')[0],
      savedAddresses: role === 'customer' ? DEMO_USER.savedAddresses : [],
    };
    setCurrentUser(user);
    addToast(`Welcome back, ${user.name}! Signed in as ${role}.`, 'success');
  };

  const signup = (name: string, email: string) => {
    const user: User = {
      id: 'usr-' + Date.now(),
      name,
      email,
      role: 'customer',
      joinedDate: new Date().toISOString().split('T')[0],
      savedAddresses: [],
    };
    setCurrentUser(user);
    addToast(`Account created for ${name}. Welcome to VOLTX GEAR!`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('You have been signed out.', 'info');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    setCurrentUser({ ...currentUser, ...updates });
    addToast('Profile updated successfully.', 'success');
  };

  const addDeliveryAddress = (address: DeliveryAddress) => {
    if (!currentUser) return;
    const newAddr = { ...address, id: 'addr-' + Date.now() };
    const updatedAddresses = address.isDefault
      ? [newAddr, ...currentUser.savedAddresses.map((a) => ({ ...a, isDefault: false }))]
      : [...currentUser.savedAddresses, newAddr];

    setCurrentUser({ ...currentUser, savedAddresses: updatedAddresses });
    addToast('Delivery address saved.', 'success');
  };

  const removeDeliveryAddress = (id: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      savedAddresses: currentUser.savedAddresses.filter((a) => a.id !== id),
    });
    addToast('Address removed.', 'info');
  };

  // Orders
  const createOrder = (orderData: {
    shippingAddress: DeliveryAddress;
    shippingMethod: 'standard' | 'express';
    paymentMethod: Order['paymentMethod'];
  }): Order => {
    const orderNumber = 'VTX-' + Math.floor(10000 + Math.random() * 90000);
    const orderDate = new Date().toISOString().split('T')[0];
    const estDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      date: orderDate,
      status: 'processing',
      items: [...cart],
      shippingAddress: orderData.shippingAddress,
      shippingMethod: orderData.shippingMethod,
      shippingCost: shipping,
      subtotal,
      discount,
      tax,
      total,
      paymentMethod: orderData.paymentMethod,
      couponCode: appliedCoupon?.code,
      trackingNumber: 'TRK-' + Math.floor(100000000 + Math.random() * 900000000),
      carrier: orderData.shippingMethod === 'express' ? 'FedEx Priority Overnight' : 'Standard Ground',
      estimatedDelivery: estDate,
    };

    // Update stock levels
    setProducts((prev) =>
      prev.map((prod) => {
        const cartMatch = cart.find((c) => c.product.id === prod.id);
        if (cartMatch) {
          const newStock = Math.max(0, prod.stock - cartMatch.quantity);
          return { ...prod, stock: newStock };
        }
        return prod;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);
    setLastOrder(newOrder);
    clearCart();
    setAppliedCoupon(null);

    addToast(`Order #${newOrder.orderNumber} placed successfully!`, 'success', 'Order Confirmed');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    addToast(`Order status updated to ${status}.`, 'info');
  };

  const createCoupon = (newCoupon: Coupon) => {
    setCoupons((prev) => [newCoupon, ...prev]);
    addToast(`Coupon "${newCoupon.code}" created.`, 'success');
  };

  const addSubscriber = (email: string): boolean => {
    if (subscribers.includes(email.toLowerCase())) {
      addToast('You are already subscribed to the newsletter!', 'info');
      return false;
    }
    setSubscribers((prev) => [email.toLowerCase(), ...prev]);
    addToast('Welcome! Check your inbox for your 10% coupon code: WELCOME10', 'success', 'Subscribed!');
    return true;
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        navigateToProduct,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        navigateToCategory,
        navigateTo,

        products,
        categories,
        getProductById,
        addProduct,
        updateProduct,
        deleteProduct,
        addProductReview,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        cartCount,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,

        wishlist,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        clearWishlist,

        quickViewProduct,
        openQuickView,
        closeQuickView,

        searchQuery,
        setSearchQuery,
        isSearchModalOpen,
        setIsSearchModalOpen,

        currentUser,
        login,
        signup,
        logout,
        updateUserProfile,
        addDeliveryAddress,
        removeDeliveryAddress,

        orders,
        lastOrder,
        createOrder,
        updateOrderStatus,

        coupons,
        createCoupon,
        subscribers,
        addSubscriber,

        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
