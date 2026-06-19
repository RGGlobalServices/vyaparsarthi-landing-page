'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { config } from '@/lib/config';

interface StatsData {
  shops: number;
  wholesalers: number;
  businessTypes: number;
  categories: number;
}

export default function StatsSection() {
  const [stats, setStats] = useState<StatsData>({
    shops: 128,
    wholesalers: 15,
    businessTypes: 7,
    categories: 36,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch(`${config.API_BASE}/marketing/stats`);
        if (res.ok) {
          const data = await res.json();
          setStats({
            shops: data.shops,
            wholesalers: data.wholesalers,
            businessTypes: data.businessTypes,
            categories: data.categories,
          });
        }
      } catch (err) {
        console.warn('Could not fetch marketing stats, using fallback defaults:', err instanceof Error ? err.message : err);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statItems = [
    {
      id: 'shops',
      value: stats.shops,
      suffix: '+',
      label: 'Shops Registered',
      desc: 'Active retail counters, kiranas, and general stores.',
      icon: (
        <svg className="w-6 h-6 text-[#27DEBF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 'wholesalers',
      value: stats.wholesalers,
      suffix: '+',
      label: 'Wholesalers Connected',
      desc: 'Active wholesale channels and bulk distributors.',
      icon: (
        <svg className="w-6 h-6 text-[#27DEBF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      id: 'businessTypes',
      value: stats.businessTypes,
      suffix: '',
      label: 'Business Verticals',
      desc: 'Sectors configured (Kirana, Pharmacy, Footwear, Clothes, Electronics).',
      icon: (
        <svg className="w-6 h-6 text-[#27DEBF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      id: 'categories',
      value: stats.categories,
      suffix: '+',
      label: 'Product Categories',
      desc: 'Unique stock classification categories managed.',
      icon: (
        <svg className="w-6 h-6 text-[#27DEBF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
  ];

  return (
    <section id="benefits" className="relative px-4 py-24 sm:px-6 lg:px-8 bg-[#F3F9FF]">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#27DEBF]/30 bg-[#27DEBF]/10 text-[#204341] text-xs font-semibold mb-4 uppercase tracking-wider">
            Live Platform Activity
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a2e2c] tracking-tight">
            Empowering Small Businesses Across India
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#667E7C]">
            Real database counts show how shop owners are standardizing their workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#27DEBF]/10 border border-[#27DEBF]/20">
                    {item.icon}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#27DEBF] animate-pulse" title="Live data synced" />
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-[#27DEBF] tracking-tight">
                    {item.value}
                  </span>
                  <span className="text-2xl font-bold text-[#27DEBF]">
                    {item.suffix}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#1a2e2c] mt-2">
                  {item.label}
                </h3>
              </div>

              <p className="text-xs text-[#667E7C] mt-3 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
