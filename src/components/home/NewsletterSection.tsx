import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Check, ArrowRight, ShieldCheck } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { addSubscriber } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    if (addSubscriber(email)) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-[#18191D] py-16 sm:py-20 text-white relative overflow-hidden border-b border-[#25272B]">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#229C32]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#101114] border border-[#25272B] text-xs font-semibold text-gray-300 mb-4">
          <Mail className="w-3.5 h-3.5 text-[#229C32]" />
          <span className="text-[#229C32] font-bold uppercase tracking-wider text-[11px]">
            VIP Insider Access
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk'] mb-3">
          Stay Ahead of Technology
        </h2>

        <p className="text-base text-gray-400 max-w-xl mx-auto mb-8">
          Get exclusive product drops, member-only discounts, and the latest hardware engineering breakthroughs straight to your inbox.
        </p>

        {isSubscribed ? (
          <div className="bg-[#229C32]/10 border border-[#229C32]/30 rounded-2xl p-6 max-w-md mx-auto text-center space-y-2 animate-in fade-in">
            <div className="w-10 h-10 rounded-full bg-[#229C32] text-white flex items-center justify-center mx-auto">
              <Check className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h4 className="text-lg font-bold text-white">You're On The List!</h4>
            <p className="text-xs text-gray-300">
              Use promo code <span className="font-mono font-bold text-white bg-[#101114] px-2 py-0.5 rounded">WELCOME10</span> for 10% off your first checkout.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-[#101114] border border-[#25272B] focus:border-[#229C32] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-[#229C32] hover:bg-[#187C29] text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(34,156,50,0.3)] hover:shadow-[0_0_25px_rgba(34,156,50,0.5)] cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mt-4">
          <ShieldCheck className="w-3.5 h-3.5 text-[#229C32]" />
          <span>No spam. Unsubscribe at any time with a single click.</span>
        </div>
      </div>
    </section>
  );
};
