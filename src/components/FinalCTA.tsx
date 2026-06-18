'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  const { ref, visible } = useScrollReveal(0.2);
  const [email, setEmail] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const target = email ? `/register?email=${encodeURIComponent(email)}` : '/register';
      window.location.href = target;
    }
  };

  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 bg-white">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-4xl text-center"
      >
        <h2 className="text-3xl font-extrabold text-[#1a2e2c] sm:text-4xl lg:text-5xl">
          Get Started Today!
        </h2>
        <div className="w-20 h-1 bg-[#27DEBF] mx-auto mt-5 mb-6 rounded-full" />
        <p className="text-[#667E7C] text-lg max-w-lg mx-auto mb-10">
          Join 2,000+ shop owners. Start your 7-day free trial now.
        </p>

        {/* Pill-shaped email input form */}
        <form
          onSubmit={handleRegister}
          className="max-w-lg mx-auto flex flex-col sm:flex-row bg-white rounded-2xl sm:rounded-full shadow-xl border border-slate-200 p-2 gap-2 sm:gap-0"
        >
          <input
            type="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-6 py-3 rounded-xl sm:rounded-full focus:outline-none text-slate-700 placeholder-slate-400 font-medium"
            required
          />
          <button
            type="submit"
            className="bg-[#27DEBF] text-[#204341] font-extrabold px-8 py-3.5 rounded-xl sm:rounded-full hover:bg-[#22C2A7] hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Start Free Trial
          </button>
        </form>

        <p className="text-sm text-[#94a3b8] mt-6">
          No credit card required • Free trial • Cancel anytime
        </p>
      </motion.div>
    </section>
  );
}
