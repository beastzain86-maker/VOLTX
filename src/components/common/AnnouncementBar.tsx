import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, Copy, Check, Server } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { applyCoupon, addToast, navigateTo } = useStore();
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('VOLTX20');
    setCopied(true);
    applyCoupon('VOLTX20');
    addToast('Coupon VOLTX20 copied and applied to your cart!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-[#18191D] border-b border-[#25272B] text-xs text-gray-300 py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left message with badge */}
        <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#229C32]/20 text-[#229C32] border border-[#229C32]/30 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" /> Special Launch Offer
          </span>
          <span className="text-gray-200">
            Enjoy <strong className="text-white font-semibold">20% OFF</strong> all flagship audio and tech accessories.
          </span>
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1 font-semibold text-[#229C32] hover:text-[#187C29] underline transition-colors cursor-pointer ml-1"
          >
            Use code <code className="bg-[#25272B] px-1.5 py-0.5 rounded text-white font-mono text-[11px]">VOLTX20</code>
            {copied ? <Check className="w-3 h-3 text-[#229C32]" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>

        {/* Right side deployment docs link & shipping reminder */}
        <div className="hidden md:flex items-center gap-4 text-[11px] text-[#A0A5B1]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#229C32]"></span>
            Free Worldwide Shipping on orders over $99
          </span>
          <div className="h-3 w-px bg-[#25272B]"></div>
          <button
            onClick={() => navigateTo('hostinger-guide')}
            className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors cursor-pointer group"
          >
            <Server className="w-3 h-3 text-[#229C32]" />
            <span>Hostinger Deploy Guide</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
