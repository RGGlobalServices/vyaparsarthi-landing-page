'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Ramesh Gupta',
    store: 'Kirana Store',
    quote: 'Pehle hisaab rakhte rakhte dimaag kharab ho jaata tha. Ab toh mobile uthao aur bill banao.',
    initials: 'RG',
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Sunita Agarwal',
    store: 'General Store',
    quote: 'Udhar ka hisaab kabhi mila nahi. Is app ne toh bahut easy kar diya.',
    initials: 'SA',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    name: 'Dr. Mahesh Patil',
    store: 'Medical Store',
    quote: 'AI se stock alert mil jaata hai. Kabhi expiry ka tension nahi.',
    initials: 'MP',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Amit Verma',
    store: 'Sweet Shop',
    quote: 'Customer ko bill WhatsApp pe chala jata hai. Kaagaz ka kharch bach gaya aur customer bhi khush.',
    initials: 'AV',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Vijay Singh',
    store: 'Electrical Store',
    quote: 'Mobile se hi inventory check ho jati hai. Dukan pe na hote hue bhi mujhe sab pata rehta hai.',
    initials: 'VS',
    color: 'from-purple-500 to-pink-500',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white py-12">
      {/* Wave SVG divider (white -> blue transition) */}
      <div className="w-full overflow-hidden leading-none bg-white">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-[60px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C320,120 420,120 720,120 C1020,120 1120,0 1440,0 L1440,120 L0,120 Z"
            fill="#2460DA"
          />
        </svg>
      </div>

      {/* Blue Panel */}
      <div className="bg-[#2460DA] py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto relative px-4 sm:px-6">
          {/* Quote Icon */}
          <div className="flex justify-center mb-8">
            <svg
              className="h-12 w-12 text-[#27DEBF] opacity-80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-4.765 2.627-4.765 5.986h5.77v9.864h-11v-0.001zm-14 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-4.766 2.627-4.766 5.986h5.77v9.864h-11v-0.001z" />
            </svg>
          </div>

          {/* Testimonial Quote */}
          <div className="min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="text-2xl md:text-3xl italic text-white font-medium max-w-3xl mx-auto leading-relaxed">
                  &ldquo;{testimonials[activeIndex].quote}&rdquo;
                </blockquote>
                <p className="text-[#27DEBF] font-extrabold text-lg mt-6">
                  — {testimonials[activeIndex].name}
                </p>
                <p className="text-blue-200 text-sm mt-1">
                  {testimonials[activeIndex].store}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-2 justify-center mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'bg-[#27DEBF] w-8' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Wave SVG divider (blue -> white transition) */}
      <div className="w-full overflow-hidden leading-none bg-white">
        <svg
          viewBox="0 0 1440 120"
          className="relative block w-full h-[60px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C320,0 420,0 720,0 C1020,0 1120,120 1440,120 L1440,0 L0,0 Z"
            fill="#2460DA"
          />
        </svg>
      </div>

      {/* Overlapping Avatar Row */}
      <div className="flex justify-center -mt-10 relative z-10">
        <div className="flex items-center -space-x-3 sm:-space-x-4 bg-white p-2.5 rounded-full shadow-lg border border-slate-100">
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full border-2 transition-all duration-300 ${
                activeIndex === i
                  ? 'scale-110 border-[#27DEBF] z-20 shadow-md'
                  : 'scale-90 border-transparent hover:scale-100 opacity-60 hover:opacity-100'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-sm font-black text-white shadow-inner select-none`}
              >
                {t.initials}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
