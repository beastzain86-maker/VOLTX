import React from 'react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from './BrandLogo';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Server,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, navigateToCategory } = useStore();

  return (
    <footer className="bg-[#101114] text-white border-t border-[#25272B] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#25272B]">
          {/* Brand & Mission (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" showTagline={true} />
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              VOLTX GEAR is a dedicated technology laboratory and direct-to-consumer hardware brand. We engineer high-fidelity acoustic transducers, aerospace smart accessories, and desk essentials designed for uncompromising performance.
            </p>

            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#229C32]" />
                <span>742 Montgomery St, San Francisco, CA 94111</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#229C32]" />
                <span>support@voltxgear.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#229C32]" />
                <span>+1 (800) 542-8920 (Mon - Fri, 8am - 6pm PST)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A0A5B1]">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Contact & Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Our Acoustic Story
                </button>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">
                  Careers <span className="text-[10px] text-[#229C32] font-semibold bg-[#229C32]/10 px-1.5 py-0.5 rounded">Hiring</span>
                </span>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('hostinger-guide')}
                  className="text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>Hostinger Setup</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Shopping */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A0A5B1]">Shopping</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Shop All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'new' })}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop', { category: 'best' })}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Wireless Earbuds')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Wireless Earbuds
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateToCategory('Smartwatches')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Smartwatches
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Customer Service & Socials */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A0A5B1]">
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Returns & Refunds
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Help FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#A0A5B1] mb-2">
                Follow Us
              </p>
              <div className="flex items-center gap-2 text-gray-400">
                {['Facebook', 'Instagram', 'YouTube', 'TikTok', 'X'].map((net) => (
                  <span
                    key={net}
                    className="w-8 h-8 rounded-lg bg-[#18191D] border border-[#25272B] hover:border-[#229C32] hover:text-[#229C32] flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                    title={net}
                  >
                    {net[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span>© 2026 VOLTX GEAR Inc. All rights reserved.</span>
            <span>•</span>
            <span>Designed for Hostinger & Global Node.js Deployment</span>
          </div>

          {/* Secure Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="flex items-center gap-1 text-[11px] text-gray-400 mr-2">
              <Lock className="w-3.5 h-3.5 text-[#229C32]" /> Secure Checkout:
            </span>
            <span className="px-2.5 py-1 rounded bg-[#18191D] border border-[#25272B] text-gray-300 font-bold text-[10px]">
              VISA
            </span>
            <span className="px-2.5 py-1 rounded bg-[#18191D] border border-[#25272B] text-gray-300 font-bold text-[10px]">
              MASTERCARD
            </span>
            <span className="px-2.5 py-1 rounded bg-[#18191D] border border-[#25272B] text-gray-300 font-bold text-[10px]">
              AMEX
            </span>
            <span className="px-2.5 py-1 rounded bg-[#18191D] border border-[#25272B] text-gray-300 font-bold text-[10px]">
              APPLE PAY
            </span>
            <span className="px-2.5 py-1 rounded bg-[#18191D] border border-[#25272B] text-gray-300 font-bold text-[10px]">
              PAYPAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
