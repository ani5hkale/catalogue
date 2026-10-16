import React, { useState } from 'react';
import { X, CheckCircle2, Download, Send, PhoneCall, Mail, MapPin } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUnitCode?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialUnitCode = '',
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: initialUnitCode || 'Residential Suite',
    preferredTime: 'Morning',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#172216] border border-[#C8A97E]/30 p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-[#E8DFD1] hover:text-white flex items-center justify-center transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#2A3A29] border border-[#C8A97E] flex items-center justify-center text-[#C8A97E] mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F3ED] font-light">
              Inquiry Received
            </h3>
            <p className="text-sm text-[#D5C7B2] max-w-md font-light leading-relaxed">
              Thank you, <strong className="text-white">{formData.fullName}</strong>. A dedicated senior advisor from Perose Property Group will contact you regarding{' '}
              <strong className="text-[#C8A97E]">{formData.interest}</strong> shortly.
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  alert('Belgrade Arbor Architectural Brochure PDF downloaded successfully.');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8A97E] text-[#121811] text-xs uppercase tracking-widest font-bold hover:bg-[#DFC79B] transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download Brochure (PDF)</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#E8DFD1] hover:bg-white/5 transition-colors"
              >
                Return to Site
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A97E] font-medium block mb-1">
                Private Consultation &amp; Booking
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F5F3ED] font-light">
                Inquire About Belgrade Arbor
              </h3>
              <p className="text-xs sm:text-sm text-[#A68553] font-light mt-1">
                Experience architectural exclusivity. Speak directly with our client advisory team.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#D5C7B2] block mb-1.5 font-medium">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Petrović"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F160E] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C8A97E] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#D5C7B2] block mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F160E] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C8A97E] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#D5C7B2] block mb-1.5 font-medium">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+381 60 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F160E] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C8A97E] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#D5C7B2] block mb-1.5 font-medium">
                    Unit or Space of Interest
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Unit A.07.01 or Sky Penthouse"
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0F160E] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C8A97E] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#D5C7B2] block mb-1.5 font-medium">
                  Message / Special Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your timing, desired floor elevation, or investment profile..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0F160E] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#C8A97E] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#C8A97E] hover:bg-[#DFC79B] text-[#121811] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 transition-all shadow-xl cursor-pointer mt-4"
              >
                <Send className="w-4 h-4" />
                <span>Submit Confidential Inquiry</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-[11px] text-[#A68553] gap-2">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C8A97E]" /> Bulevar heroja sa Košara, Belgrade
              </span>
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-[#C8A97E]" /> +381 (0) 11 430 0000
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#C8A97E]" /> sales@belgradearbor.rs
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
