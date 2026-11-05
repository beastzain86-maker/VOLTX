import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Phone, MapPin, MessageSquare, Check, HelpCircle, ChevronDown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { addToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Question');
  const [message, setMessage] = useState('');
  const [ticketId, setTicketId] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does shipping take and how do I track my order?',
      a: 'Orders are dispatched within 24 hours from our warehouse. Standard Ground takes 3-5 business days, while FedEx Priority arrives in 1-2 business days. You will receive an email tracking link with real-time GPS scans immediately upon courier handover.',
    },
    {
      q: 'What is your 30-day money-back guarantee policy?',
      a: 'If you are not 100% satisfied with your audio gear or accessories, you can initiate a return within 30 days of delivery. We provide a prepaid shipping label and issue a full refund upon receipt of the hardware in original packaging.',
    },
    {
      q: 'How does the 2-Year Official Warranty work?',
      a: 'All VOLTX hardware carries an automatic 2-year warranty covering material defects, acoustic driver degradation, and battery performance below 80% capacity. Contact our team with your order number for expedited replacement.',
    },
    {
      q: 'Which payment methods are accepted at checkout?',
      a: 'We accept all major credit and debit cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, PayPal Express, and Cash on Delivery in supported regions.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const generatedId = 'TKT-' + Math.floor(10000 + Math.random() * 90000);
    setTicketId(generatedId);
    addToast(`Support ticket #${generatedId} opened. An engineer will reply shortly.`, 'success');

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-[#101114] min-h-screen text-white py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-[#229C32] uppercase tracking-wider bg-[#18191D] border border-[#25272B] px-3 py-1 rounded-full">
            24/7 Dedicated Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
            Contact Hardware Support
          </h1>
          <p className="text-sm text-gray-400">
            Have a question regarding driver specifications, firmware, or your delivery? We're here to help.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#18191D] p-6 rounded-3xl border border-[#25272B] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#229C32]/20 border border-[#229C32]/40 text-[#229C32] flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Direct Email</h4>
              <p className="text-xs text-gray-400">support@voltxgear.com</p>
              <span className="text-[10px] text-[#229C32] font-semibold">Average reply: 2 hours</span>
            </div>
          </div>

          <div className="bg-[#18191D] p-6 rounded-3xl border border-[#25272B] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#229C32]/20 border border-[#229C32]/40 text-[#229C32] flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Phone Assistance</h4>
              <p className="text-xs text-gray-400">+1 (800) 542-8920</p>
              <span className="text-[10px] text-gray-500">Mon - Fri, 8am - 6pm PST</span>
            </div>
          </div>

          <div className="bg-[#18191D] p-6 rounded-3xl border border-[#25272B] flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#229C32]/20 border border-[#229C32]/40 text-[#229C32] flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Engineering HQ</h4>
              <p className="text-xs text-gray-400">San Francisco, CA</p>
              <span className="text-[10px] text-gray-500">742 Montgomery Street</span>
            </div>
          </div>
        </div>

        {/* Contact Form + FAQs Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form (6 cols) */}
          <div className="lg:col-span-6 bg-[#18191D] p-6 sm:p-8 rounded-3xl border border-[#25272B] space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Send Us a Message</h3>
              <p className="text-xs text-gray-400 mt-1">
                Fill out the form below to connect directly with a technical representative.
              </p>
            </div>

            {ticketId && (
              <div className="p-4 rounded-2xl bg-[#229C32]/10 border border-[#229C32]/30 text-xs text-gray-300 space-y-1">
                <p className="font-bold text-[#229C32]">✓ Ticket #{ticketId} Created</p>
                <p>We have logged your inquiry and sent an acknowledgment to your email.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-300 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marcus Miller"
                  className="w-full bg-[#101114] border border-[#25272B] focus:border-[#229C32] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus@example.com"
                  className="w-full bg-[#101114] border border-[#25272B] focus:border-[#229C32] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Topic</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#101114] border border-[#25272B] focus:border-[#229C32] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                >
                  <option value="Product Question">Product Specifications & Compatibility</option>
                  <option value="Order Status">Order Tracking & Shipping Status</option>
                  <option value="Warranty Claim">Warranty Claim or Replacement</option>
                  <option value="Wholesale">Commercial & Bulk Purchasing</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-300 mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry or order details..."
                  className="w-full bg-[#101114] border border-[#25272B] focus:border-[#229C32] rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#229C32] hover:bg-[#187C29] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(34,156,50,0.3)] cursor-pointer"
              >
                Submit Message
              </button>
            </form>
          </div>

          {/* FAQs (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white">Frequently Asked Questions</h3>
              <p className="text-xs text-gray-400 mt-1">
                Quick answers regarding ordering, returns, and worldwide shipping.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-[#18191D] rounded-2xl border border-[#25272B] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-white hover:text-[#229C32] transition-colors cursor-pointer"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          isOpen ? 'rotate-180 text-[#229C32]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-gray-400 leading-relaxed border-t border-[#25272B] pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
