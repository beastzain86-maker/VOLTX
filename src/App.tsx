import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/Toast';
import { SearchModal } from './components/common/SearchModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { CartDrawer } from './components/cart/CartDrawer';

// Home sections
import { HeroSection } from './components/home/HeroSection';
import { BenefitsBar } from './components/home/BenefitsBar';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { CategoryGrid } from './components/home/CategoryGrid';
import { ProductivityBanner } from './components/home/ProductivityBanner';
import { PromoSplitCards } from './components/home/PromoSplitCards';
import { NewsletterSection } from './components/home/NewsletterSection';

// Pages
import { ShopPage } from './components/shop/ShopPage';
import { ProductDetailPage } from './components/product/ProductDetailPage';
import { CartPage } from './components/cart/CartPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { OrderConfirmationPage } from './components/checkout/OrderConfirmationPage';
import { WishlistPage } from './components/wishlist/WishlistPage';
import { AccountPage } from './components/account/AccountPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AboutPage } from './components/info/AboutPage';
import { ContactPage } from './components/info/ContactPage';
import { HostingerDeployGuide } from './components/info/HostingerDeployGuide';

const StoreContent: React.FC = () => {
  const { currentPage } = useStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <main>
            <HeroSection />
            <BenefitsBar />
            <FeaturedProducts />
            <CategoryGrid />
            <ProductivityBanner />
            <PromoSplitCards />
            <NewsletterSection />
          </main>
        );
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'account':
        return <AccountPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'hostinger-guide':
        return <HostingerDeployGuide />;
      default:
        return (
          <main>
            <HeroSection />
            <BenefitsBar />
            <FeaturedProducts />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#101114] text-white">
      {/* Top Banner & Sticky Navigation */}
      <AnnouncementBar />
      <Header />

      {/* Main View */}
      <div className="flex-1">{renderCurrentPage()}</div>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <SearchModal />
      <QuickViewModal />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
