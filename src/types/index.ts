export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  slug: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isSale?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  images: string[];
  colors: ProductColor[];
  shortDesc: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  reviews: Review[];
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  itemCount: number;
  image: string;
  iconName: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
}

export interface DeliveryAddress {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  state?: string;
  streetAddress: string;
  postalCode: string;
  isDefault?: boolean;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'card' | 'paypal' | 'apple_pay' | 'cod';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  shippingAddress: DeliveryAddress;
  shippingMethod: 'standard' | 'express';
  shippingCost: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role: 'customer' | 'admin';
  savedAddresses: DeliveryAddress[];
  joinedDate: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minSpend?: number;
  description: string;
  isActive: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
  title?: string;
}
