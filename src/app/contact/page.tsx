"use client";

import { useState } from "react";
import { apiPost } from "@/lib/auth";

const faqs = [
  { q: "How do I reset my password?", a: "Go to the login page and click 'Forgot Password'. Enter your registered email, and we'll send you a reset link." },
  { q: "Can I use Vyapar Sarthi on multiple devices?", a: "Yes! Your data syncs across all devices. Simply log in with your account on any phone, tablet, or computer." },
  { q: "Is my data safe?", a: "Absolutely. We use end-to-end encryption and follow industry best practices to keep your business data secure." },
  { q: "How do I export my reports?", a: "Go to Reports section in the app and click 'Export'. You can download data as PDF or Excel files." },
  { q: "Do you offer offline mode?", a: "Yes, Vyapar Sarthi works offline. All data syncs automatically when you're back online." },
  { q: "How do I add multiple users to my shop?", a: "In Settings, go to 'Team Management' and invite your staff members via their email or phone number." },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await apiPost('/support/contact', {
        name: contactForm.name,
        email: contactForm.email,
        type: 'general',
        subject: contactForm.subject,
        message: contactForm.message,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative pt-28 pb-20 bg-gradient-to-br from-white via-[#F3F9FF] to-[#E8F6F4] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-[#27DEBF]/5 animate-float-slow -z-10" />
      <div className="absolute top-40 left-[5%] w-48 h-48 rounded-full bg-[#2460DA]/5 animate-float -z-10" />
      <div className="absolute bottom-32 right-[25%] w-36 h-36 rounded-full bg-[#27DEBF]/8 animate-float-slow -z-10" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-[#204341] to-[#27DEBF] bg-clip-text text-transparent">
              How Can We Help?
            </span>
          </h1>
          <p className="text-[#667E7C] text-lg max-w-2xl mx-auto font-medium">
            We&apos;re here for you. Reach out anytime — we typically respond within 2 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-[#204341]/2 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#204341] mb-6">Send a Message</h2>
            {submitted ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-[#27DEBF] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-[#204341] text-lg font-bold mb-2">Message Sent!</p>
                <p className="text-[#667E7C] text-sm font-medium">We&apos;ll get back to you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Your Name</label>
                  <input type="text" value={contactForm.name} onChange={(e) => update("name", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200" placeholder="Ramesh Kumar" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Email Address</label>
                  <input type="email" value={contactForm.email} onChange={(e) => update("email", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200" placeholder="ramesh@example.com" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Subject</label>
                  <input type="text" value={contactForm.subject} onChange={(e) => update("subject", e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200" placeholder="How can we help?" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Message</label>
                  <textarea value={contactForm.message} onChange={(e) => update("message", e.target.value)} rows={5} className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200 resize-none" placeholder="Describe your issue in detail..." required />
                </div>
                {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
                <button type="submit" disabled={submitting} className="w-full py-3.5 rounded-xl bg-[#27DEBF] text-[#204341] font-bold shadow-lg shadow-[#27DEBF]/10 hover:bg-[#22C2A7] hover:scale-[1.01] hover:shadow-xl transition-all duration-300 disabled:opacity-50">
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-[#204341]/2 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-[#204341] mb-4">Contact Us Directly</h2>
              <div className="space-y-4">
                <a href="mailto:gbroindustries@gmail.com" className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-[#27DEBF]/50 hover:bg-white hover:scale-[1.01] transition-all duration-300 group">
                  <span className="w-10 h-10 rounded-lg bg-[#2460DA]/10 flex items-center justify-center text-lg group-hover:scale-110 transition">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#2460DA]"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </span>
                  <div>
                    <p className="text-[#204341] font-bold">Email Us</p>
                    <p className="text-[#667E7C] text-sm font-semibold">gbroindustries@gmail.com</p>
                  </div>
                </a>
                <a href="https://wa.me/919921142657" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-200 hover:border-emerald-500/50 hover:bg-white hover:scale-[1.01] transition-all duration-300 group">
                  <span className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-lg group-hover:scale-110 transition">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-500"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.585 1.927c-.053.177.138.336.31.246l1.921-1.007c.97.578 2.175.885 3.452.885 3.18 0 5.767-2.587 5.768-5.766 0-3.181-2.586-5.764-5.767-5.764Z"/><path d="M9.94 8.6a.697.697 0 0 0-.497.344.72.72 0 0 0-.098.573c.369 1.354 1.064 2.418 1.982 3.113.376.286.794.497 1.18.684.275.133.592.249.84.083.206-.136.352-.358.465-.593.112-.234.057-.436-.009-.594-.045-.106-.174-.286-.514-.53-.476-.342-.793-.53-.903-.719-.085-.146-.039-.267.015-.361.064-.112.146-.225.204-.357.063-.148.017-.282-.022-.37-.05-.112-.172-.427-.285-.696-.146-.348-.46-.502-.695-.558a1.14 1.14 0 0 0-.483-.008c-.098.019-.217.046-.304.226Z"/></svg>
                  </span>
                  <div>
                    <p className="text-[#204341] font-bold">WhatsApp</p>
                    <p className="text-[#667E7C] text-sm font-semibold">+91 9921142657</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-[#204341]/2 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-[#204341] mb-4">Response Time</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#667E7C] font-semibold">Email</span>
                  <span className="text-[#204341] font-bold">Within 4 hours</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#667E7C] font-semibold">WhatsApp</span>
                  <span className="text-[#204341] font-bold">Within 1 hour</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#667E7C] font-semibold">Phone Support</span>
                  <span className="text-[#204341] font-bold">9 AM - 8 PM (Mon-Sat)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-[#204341] mb-10 tracking-tight">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4 mb-20">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/80 border border-slate-200/80 rounded-2xl shadow-md overflow-hidden hover:border-[#27DEBF]/30 transition duration-300">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full px-6 py-4 flex items-center justify-between text-left text-[#204341] font-bold hover:text-[#27DEBF] transition">
                {faq.q}
                <svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className={`px-6 transition-all duration-300 overflow-hidden ${openFaq === i ? "pb-4 max-h-96" : "max-h-0"}`}>
                <p className="text-[#667E7C] text-sm leading-relaxed font-medium">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
