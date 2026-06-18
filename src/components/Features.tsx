'use client';

import { motion } from 'framer-motion';

const badgeStyles = {
  indigo: { bg: 'bg-indigo-50/80', border: 'border-indigo-100', dot: 'bg-indigo-500', text: 'text-indigo-600', icon: 'bg-indigo-500', glow: 'from-indigo-100/50 to-blue-50/50' },
  emerald: { bg: 'bg-emerald-50/80', border: 'border-emerald-100', dot: 'bg-emerald-500', text: 'text-emerald-600', icon: 'bg-emerald-500', glow: 'from-emerald-100/50 to-teal-50/50' },
  amber: { bg: 'bg-amber-50/80', border: 'border-amber-100', dot: 'bg-amber-500', text: 'text-amber-600', icon: 'bg-amber-500', glow: 'from-amber-100/50 to-orange-50/50' },
  purple: { bg: 'bg-purple-50/80', border: 'border-purple-100', dot: 'bg-purple-500', text: 'text-purple-600', icon: 'bg-purple-500', glow: 'from-purple-100/50 to-pink-50/50' },
};

const mainFeatures = [
  {
    id: 'billing',
    title: 'Smart Billing',
    subtitle: 'Fast, accurate, and print-ready bills in seconds',
    desc: 'Create professional bills instantly with our intuitive billing interface. Designed for speed — whether it\'s a single item or a full cart.',
    points: [
      'Generate GST-compliant invoices with auto-calculation',
      'Print or share bills via WhatsApp instantly',
      'Support for returns, discounts, and partial payments',
      'Auto-save draft bills for quick repeat customers',
    ],
    badge: 'indigo' as keyof typeof badgeStyles,
    img: (
      <img
        src="/billing-mockup.png"
        alt="Smart Billing Mockup"
        className="w-full h-auto rounded-xl object-cover aspect-[4/3] border border-slate-100 shadow-sm"
      />
    ),
  },
  {
    id: 'inventory',
    title: 'Inventory Management',
    subtitle: 'Never run out of stock again',
    desc: 'Track every item in your shop in real time. Get alerts when stock runs low and know exactly what to reorder.',
    points: [
      'Real-time stock tracking for thousands of products',
      'Low-stock and expiry alerts via notification',
      'Bulk import products from Excel/CSV in minutes',
      'Categorize by type — Kirana, Pharmacy, General Store & more',
    ],
    badge: 'emerald' as keyof typeof badgeStyles,
    img: (
      <img
        src="/inventory-mockup.png"
        alt="Inventory Management Mockup"
        className="w-full h-auto rounded-xl object-cover aspect-[4/3] border border-slate-100 shadow-sm"
      />
    ),
  },
  {
    id: 'udhar',
    title: 'Udhar Book',
    subtitle: 'Digital ledger for credit sales & pending payments',
    desc: 'Replace your physical udhar book with a smart digital ledger. Track who owes you, send reminders, and never lose a record.',
    points: [
      'Record credit sales with customer name & phone',
      'Automatic total due calculation for each customer',
      'Send WhatsApp payment reminders in one tap',
      'View payment history and udhar reports anytime',
    ],
    badge: 'amber' as keyof typeof badgeStyles,
    img: (
      <img
        src="/udhar-mockup.png"
        alt="Udhar Book Mockup"
        className="w-full h-auto rounded-xl object-cover aspect-[4/3] border border-slate-100 shadow-sm"
      />
    ),
  },
  {
    id: 'ai',
    title: 'AI Insights',
    subtitle: 'Smart suggestions powered by artificial intelligence',
    desc: 'Let AI analyze your sales data and give you actionable recommendations to grow your business and reduce losses.',
    points: [
      'Predict best-selling products for upcoming season',
      'Smart pricing suggestions to maximize profit',
      'Detect slow-moving stock and suggest discounts',
      'Get daily sales summary & business health score',
    ],
    badge: 'purple' as keyof typeof badgeStyles,
    img: (
      <svg viewBox="0 0 400 320" className="w-full h-auto" fill="none">
        <rect x="20" y="20" width="360" height="280" rx="16" className="fill-white stroke-slate-200" strokeWidth="1.5" />
        <rect x="40" y="40" width="80" height="28" rx="8" className="fill-purple-50/70" />
        <text x="50" y="59" className="fill-purple-600 text-xs font-bold" fontSize="11">AI INSIGHTS</text>
        <rect x="280" y="40" width="80" height="28" rx="20" className="fill-purple-50/70 stroke-purple-100" strokeWidth="1" />
        <text x="292" y="59" className="fill-purple-600 text-[9px] font-bold" fontSize="9">LIVE</text>
        <circle cx="354" cy="54" r="3" fill="#8b5cf6"><animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" /></circle>
        <rect x="40" y="80" width="320" height="55" rx="8" className="fill-slate-50" />
        <text x="55" y="100" className="fill-slate-800 text-xs font-bold" fontSize="11">📈 Sales Forecast</text>
        <text x="55" y="120" className="fill-slate-500 text-[10px]" fontSize="10">Expected sales this week: ₹18,500</text>
        <rect x="40" y="145" width="320" height="55" rx="8" className="fill-slate-50" />
        <text x="55" y="165" className="fill-slate-800 text-xs font-bold" fontSize="11">📦 Restock Alert</text>
        <text x="55" y="185" className="fill-slate-500 text-[10px]" fontSize="10">Top items to reorder: Rice, Oil, Spices</text>
        <rect x="40" y="210" width="320" height="55" rx="8" className="fill-slate-50" />
        <text x="55" y="230" className="fill-slate-800 text-xs font-bold" fontSize="11">💰 Profit Optimizer</text>
        <text x="55" y="250" className="fill-slate-500 text-[10px]" fontSize="10">Increase margin on Atta by 3% for +₹2,400/month</text>
        <rect x="220" y="275" width="140" height="24" rx="6" className="fill-purple-50/70" />
        <text x="235" y="292" className="fill-purple-600 text-[9px] font-bold" fontSize="9">View All Insights →</text>
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[#1a2e2c] sm:text-4xl">
            Everything You Need
          </h2>
          <div className="w-20 h-1 bg-[#27DEBF] mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-lg text-[#667E7C]">
            Powerful tools designed specifically for Indian small businesses and kirana shops.
          </p>
        </div>

        <div className="space-y-28">
          {mainFeatures.map((feature, i) => {
            const s = badgeStyles[feature.badge];
            return (
              <motion.div
                id={feature.id}
                key={feature.id}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
              >
                <div className="flex-1 w-full max-w-lg lg:max-w-none">
                  <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${s.bg} ${s.border} border`}>
                    <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className={`text-sm font-bold ${s.text}`}>{feature.title}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-[#1a2e2c] mt-4 leading-tight">
                    {feature.subtitle}
                  </h3>
                  <p className="text-[#667E7C] text-base leading-relaxed mt-4 max-w-md">
                    {feature.desc}
                  </p>
                  <ul className="mt-6 space-y-3.5">
                    {feature.points.map((point, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${s.icon} rounded-full p-0.5`} viewBox="0 0 20 20" fill="white">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                        <span className="text-slate-700 text-sm font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full max-w-lg lg:max-w-none">
                  <div className="relative">
                    <div className={`absolute -inset-4 bg-gradient-to-r ${s.glow} rounded-3xl blur-3xl opacity-50`} />
                    <div className="relative rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
                      {feature.img}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
