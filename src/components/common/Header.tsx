import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from './BrandLogo';
import {
  Search,
  User as UserIcon,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Shield,
  LogOut,
  Package,
  Layers,
  Sparkles,
  Server,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    navigateTo,
    navigateToCategory,
    categories,
    cartCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsSearchModalOpen,
    currentUser,
    login,
    logout,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', page: 'shop' as const },
    { label: 'New Arrivals', page: 'shop' as const, category: 'new' },
    { label: 'Best Sellers', page: 'shop' as const, category: 'best' },
    { label: 'About', page: 'about' as const },
    { label: 'Contact', page: 'contact' as const },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#101114]/95 backdrop-blur-md shadow-xl border-b border-[#25272B]'
            : 'bg-[#101114] border-b border-[#18191D]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer transition-transform hover:opacity-95 shrink-0"
          >
            <BrandLogo size="md" showTagline={false} />
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => navigateTo('shop')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer relative ${
                currentPage === 'shop' ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Shop
              {currentPage === 'shop' && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#229C32] rounded-full animate-in fade-in" />
              )}
            </button>

            <button
              onClick={() => navigateTo('shop', { category: 'new' })}
              className="px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#229C32]" />
              <span>New Arrivals</span>
            </button>

            <button
              onClick={() => navigateTo('shop', { category: 'best' })}
              className="px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              Best Sellers
            </button>

            {/* Categories Mega Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoryMenuOpen(true)}
              onMouseLeave={() => setIsCategoryMenuOpen(false)}
            >
              <button
                className="px-3 py-2 text-sm font-semibold text-gray-300 hover:text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1 group"
              >
                <span>Categories</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isCategoryMenuOpen ? 'rotate-180 text-[#229C32]' : 'text-gray-400 group-hover:text-white'
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isCategoryMenuOpen && (
                <div className="absolute top-full left-0 w-72 bg-[#18191D] border border-[#25272B] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#A0A5B1] px-3 py-1 mb-1">
                    Product Categories
                  </div>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setIsCategoryMenuOpen(false);
                          navigateToCategory(cat.name);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-[#25272B] transition-colors text-left cursor-pointer group"
                      >
                        <span className="group-hover:text-[#229C32] transition-colors">{cat.name}</span>
                        <span className="text-xs text-gray-500 bg-[#101114] px-2 py-0.5 rounded-full">
                          {cat.itemCount}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateTo('about')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer relative ${
                currentPage === 'about' ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              About
              {currentPage === 'about' && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#229C32] rounded-full" />
              )}
            </button>

            <button
              onClick={() => navigateTo('contact')}
              className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer relative ${
                currentPage === 'contact' ? 'text-white' : 'text-gray-300 hover:text-white'
              }`}
            >
              Contact
              {currentPage === 'contact' && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#229C32] rounded-full" />
              )}
            </button>
          </nav>

          {/* Right Side: Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-2.5 text-gray-300 hover:text-white hover:bg-[#18191D] rounded-xl transition-colors cursor-pointer relative"
              aria-label="Search"
              title="Search products (or press /)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => navigateTo('wishlist')}
              className="p-2.5 text-gray-300 hover:text-white hover:bg-[#18191D] rounded-xl transition-colors cursor-pointer relative"
              aria-label="Wishlist"
              title="Saved items"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'text-[#D93636] fill-[#D93636]' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D93636] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon with Counter */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="p-2.5 text-gray-300 hover:text-white hover:bg-[#18191D] rounded-xl transition-colors cursor-pointer relative"
              aria-label="Cart"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#229C32] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(34,156,50,0.8)]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`p-2.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentUser
                    ? 'bg-[#18191D] text-white border border-[#25272B]'
                    : 'text-gray-300 hover:text-white hover:bg-[#18191D]'
                }`}
                aria-label="Account"
              >
                {currentUser?.role === 'admin' ? (
                  <Shield className="w-5 h-5 text-[#229C32]" />
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
                {currentUser && (
                  <span className="hidden md:inline text-xs font-semibold max-w-[80px] truncate">
                    {currentUser.name}
                  </span>
                )}
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 bg-[#18191D] border border-[#25272B] rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in duration-150"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  {currentUser ? (
                    <div className="space-y-2">
                      <div className="p-2 border-b border-[#25272B]">
                        <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                        <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                        <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#25272B] text-[#229C32]">
                          Role: {currentUser.role}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigateTo('account');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-[#25272B] rounded-xl transition-colors text-left cursor-pointer"
                      >
                        <UserIcon className="w-4 h-4 text-[#229C32]" />
                        <span>My Account & Orders</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigateTo('admin');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-[#25272B] rounded-xl transition-colors text-left cursor-pointer"
                      >
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <span>Admin Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigateTo('hostinger-guide');
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-200 hover:text-white hover:bg-[#25272B] rounded-xl transition-colors text-left cursor-pointer"
                      >
                        <Server className="w-4 h-4 text-blue-400" />
                        <span>Hostinger Deployment</span>
                      </button>

                      <div className="border-t border-[#25272B] pt-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#D93636] hover:bg-[#D93636]/10 rounded-xl transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 p-1">
                      <p className="text-xs text-gray-400 mb-2">Sign in to track orders & manage your wishlist.</p>
                      <button
                        onClick={() => {
                          login('alex.vance@techgear.io', 'customer');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full bg-[#229C32] hover:bg-[#187C29] text-white text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Sign In as Demo Customer
                      </button>
                      <button
                        onClick={() => {
                          login('admin@voltxgear.com', 'admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full bg-[#25272B] hover:bg-[#32353B] text-white text-xs font-bold py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Sign In as Store Admin
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2.5 text-gray-300 hover:text-white hover:bg-[#18191D] rounded-xl transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs bg-[#101114] border-l border-[#25272B] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#25272B]">
                <BrandLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('home');
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-base font-semibold text-white hover:bg-[#18191D] cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('shop');
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-base font-semibold text-white hover:bg-[#18191D] cursor-pointer"
                >
                  Shop Catalog
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('shop', { category: 'new' });
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-base font-semibold text-white hover:bg-[#18191D] cursor-pointer flex items-center justify-between"
                >
                  <span>New Arrivals</span>
                  <span className="text-[10px] bg-[#229C32] text-white px-2 py-0.5 rounded-full font-bold">
                    NEW
                  </span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigateTo('shop', { category: 'best' });
                  }}
                  className="w-full text-left py-2.5 px-3 rounded-xl text-base font-semibold text-white hover:bg-[#18191D] cursor-pointer"
                >
                  Best Sellers
                </button>

                <div className="pt-2 pb-1 text-xs font-bold uppercase tracking-wider text-[#A0A5B1] px-3">
                  Categories
                </div>
                {categories.slice(0, 5).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateToCategory(cat.name);
                    }}
                    className="w-full text-left py-2 px-3 text-sm font-medium text-gray-400 hover:text-white hover:bg-[#18191D] rounded-lg cursor-pointer"
                  >
                    {cat.name}
                  </button>
                ))}

                <div className="border-t border-[#25272B] pt-4 mt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('about');
                    }}
                    className="w-full text-left py-2 px-3 text-sm text-gray-300 hover:text-white cursor-pointer"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('contact');
                    }}
                    className="w-full text-left py-2 px-3 text-sm text-gray-300 hover:text-white cursor-pointer"
                  >
                    Contact & Support
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('admin');
                    }}
                    className="w-full text-left py-2 px-3 text-sm text-[#229C32] font-semibold cursor-pointer"
                  >
                    Admin Dashboard
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#25272B] text-xs text-gray-500">
              © 2026 VOLTX GEAR Inc.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
