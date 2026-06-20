'use client';

import { useEffect, useState } from 'react';
import { isLoggedIn, getToken } from '@/lib/auth';
import { config } from '@/lib/config';

// ── Plan definitions ──────────────────────────────────────────────────────
const plans = [
  {
    name: 'Dukaan',
    key: 'shop',
    price: 299,
    color: 'teal',
    emoji: '🏪',
    desc: 'Perfect for small kirana, grocery & retail stores',
    features: [
      'Unlimited products & categories',
      'Smart billing & GST invoices',
      'PDF bills + WhatsApp sharing',
      'Udhar Khata (up to 100 customers)',
      'Stock management & low-stock alerts',
      'Daily sales & profit reports',
      'Bulk import via Excel',
      'Multi-language (EN / HI / MR)',
      'AI Expert chat assistant',
      'Refer & Earn rewards',
    ],
  },
  {
    name: 'Vyapar',
    key: 'vyapar',
    price: 499,
    originalPrice: 699,
    color: 'blue',
    emoji: '🚀',
    popular: true,
    desc: 'For growing shops with multiple branches',
    features: [
      'Everything in Dukaan',
      'Unlimited Udhar customers',
      'Multiple shops (up to 3)',
      'Auto WhatsApp + Email bill sending',
      'Advanced analytics & trend reports',
      'AI product scan (Photo / Upload)',
      'EMI billing for electronics',
      'AI Expert chat assistant',
      'Refer & Earn rewards',
    ],
  },
  {
    name: 'Udyog',
    key: 'wholesale',
    price: 999,
    originalPrice: 1499,
    color: 'purple',
    emoji: '👑',
    desc: 'For wholesalers, distributors & large businesses',
    features: [
      'Everything in Vyapar',
      'Unlimited shops',
      'Godown / warehouse management',
      'Stock transfers between godowns',
      'Dukandar (retailer) management',
      'Dukandar credit & payment tracking',
      'WhatsApp stock alerts to retailers',
      'AI Expert chat assistant',
      'Refer & Earn rewards',
      'Priority support',
    ],
  },
];

// Light-theme color tokens per plan
const colorMap: Record<string, {
  badge: string;
  priceTxt: string;
  activeBorder: string;
  activeBg: string;
  btnFrom: string;
  btnTo: string;
  checkTxt: string;
  ring: string;
}> = {
  teal: {
    badge: 'bg-teal-50 text-teal-700 ring-1 ring-teal-200',
    priceTxt: 'text-teal-600',
    activeBorder: 'border-teal-400',
    activeBg: 'bg-teal-50/50',
    btnFrom: 'from-teal-500',
    btnTo: 'to-cyan-500',
    checkTxt: 'text-teal-500',
    ring: 'focus:ring-teal-500/30',
  },
  blue: {
    badge: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
    priceTxt: 'text-blue-600',
    activeBorder: 'border-blue-400',
    activeBg: 'bg-blue-50/50',
    btnFrom: 'from-blue-500',
    btnTo: 'to-indigo-500',
    checkTxt: 'text-blue-500',
    ring: 'focus:ring-blue-500/30',
  },
  purple: {
    badge: 'bg-purple-50 text-purple-700 ring-1 ring-purple-200',
    priceTxt: 'text-purple-600',
    activeBorder: 'border-purple-400',
    activeBg: 'bg-purple-50/50',
    btnFrom: 'from-purple-500',
    btnTo: 'to-pink-500',
    checkTxt: 'text-purple-500',
    ring: 'focus:ring-purple-500/30',
  },
};

const PLAN_RANK: Record<string, number> = { starter: 0, shop: 0, vyapar: 1, wholesale: 2 };

function resolveAppUrl(): string {
  if (typeof window !== 'undefined' && window.location.port === '3001') {
    return `${window.location.protocol}//${window.location.hostname}:3000`;
  }
  return config.FRONTEND_URL;
}

// ── Component ─────────────────────────────────────────────────────────────
export default function PaymentPage() {
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [subStatus, setSubStatus]     = useState<string>('');
  const [redirecting, setRedirecting] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn()) { window.location.href = '/login?redirect=/payment'; return; }
    const token = getToken();
    if (!token) return;
    fetch(`${config.API_BASE}/shop/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(shop => {
        const status = (shop?.subscriptionStatus ?? shop?.subscription_status ?? '').toLowerCase();
        const p      = (shop?.subscriptionPlan   ?? shop?.subscription_plan   ?? '').toLowerCase();
        setSubStatus(status);
        if (p && status !== 'expired' && status !== 'cancelled') setCurrentPlan(p);
      })
      .catch(() => {});
  }, []);

  const isPaid  = subStatus === 'active';
  const isTrial = subStatus === 'trial';

  function handleSelect(planKey: string) {
    setRedirecting(planKey);
    window.location.href = `${resolveAppUrl()}/en/payment?plan=${planKey}`;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Pricing Plans
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-800 mb-4 leading-tight">
            Choose Your{' '}
            <span className="text-teal-500">Plan</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Subscribe to keep your shop running after the free trial. Pay monthly —
            we&apos;ll remind you before it expires, no automatic charges.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><span className="text-teal-500">✓</span> 30-day money-back guarantee</span>
            <span className="flex items-center gap-1.5"><span className="text-teal-500">✓</span> Pay monthly via PayU</span>
            <span className="flex items-center gap-1.5"><span className="text-teal-500">✓</span> Cancel anytime</span>
          </div>
        </div>

        {/* ── Plan Cards ── */}
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          {plans.map((plan) => {
            const isCurrent     = currentPlan === plan.key || (plan.key === 'shop' && currentPlan === 'starter');
            const isActive      = isCurrent && isPaid;
            const isOnTrial     = isCurrent && isTrial;
            const isRedirecting = redirecting === plan.key;
            const c             = colorMap[plan.color];

            return (
              <div
                key={plan.key}
                className={[
                  'relative flex flex-col rounded-2xl border-2 bg-white p-7 shadow-sm transition-all duration-300',
                  plan.popular && !isActive ? 'shadow-blue-100 shadow-lg' : '',
                  isActive ? `${c.activeBorder} ${c.activeBg}` : 'border-slate-200 hover:border-slate-300 hover:shadow-md',
                ].join(' ')}
              >
                {/* Popular badge */}
                {plan.popular && !isActive && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-blue-600 px-4 py-1 text-[11px] font-black uppercase tracking-widest text-white shadow-lg shadow-blue-500/30">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="flex flex-col h-full">
                  {/* Plan name + status */}
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-xl">{plan.emoji}</span>
                    <h3 className="text-xl font-black text-slate-800">{plan.name}</h3>
                    {isCurrent && (
                      <span className={`ml-auto rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
                        isPaid
                          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                          : 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
                      }`}>
                        {isPaid ? 'Active' : 'On Trial'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mb-5">{plan.desc}</p>

                  {/* Pricing */}
                  <div className="mb-6 pb-6 border-b border-slate-100">
                    {plan.originalPrice && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-slate-400 line-through">₹{plan.originalPrice}</span>
                        <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[11px] font-bold text-emerald-600">
                          {Math.round((1 - plan.price / plan.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1">
                      <span className={`text-4xl font-black ${c.priceTxt}`}>₹{plan.price}</span>
                      <span className="text-slate-400 text-sm font-medium">/month</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Billed monthly · renew anytime</p>
                  </div>

                  {/* Features */}
                  <ul className="mb-8 flex flex-col gap-2.5 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-slate-600">
                        <svg className={`mt-0.5 h-4 w-4 shrink-0 ${c.checkTxt}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  {isActive ? (
                    <div className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-300 bg-emerald-50 py-3 text-sm font-bold text-emerald-700">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Current Plan
                    </div>
                  ) : isOnTrial ? (
                    <button
                      onClick={() => handleSelect(plan.key)}
                      disabled={isRedirecting}
                      className={`mt-auto w-full rounded-xl bg-linear-to-r ${c.btnFrom} ${c.btnTo} py-3 text-center text-sm font-bold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95 disabled:opacity-60`}
                    >
                      {isRedirecting ? 'Redirecting…' : 'Activate Plan'}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSelect(plan.key)}
                      disabled={isRedirecting}
                      className={`mt-auto w-full rounded-xl bg-linear-to-r ${c.btnFrom} ${c.btnTo} py-3 text-center text-sm font-bold text-white shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-95 disabled:opacity-60`}
                    >
                      {isRedirecting
                        ? 'Redirecting…'
                        : currentPlan
                          ? (PLAN_RANK[plan.key] > PLAN_RANK[currentPlan] ? 'Upgrade Plan' : 'Switch Plan')
                          : `Subscribe — ₹${plan.price}/mo`}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Trust bar ── */}
        <div className="mt-12 rounded-2xl bg-white border border-slate-200 shadow-sm px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔒</span>
              <span>Payments secured by <strong className="text-slate-700">PayU</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💰</span>
              <span><strong className="text-slate-700">30-day</strong> money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔄</span>
              <span>Cancel anytime, <strong className="text-slate-700">no lock-in</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <span>All plans include <strong className="text-slate-700">AI Expert</strong></span>
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Prices are in Indian Rupees (₹) · GST may apply · Plans renew monthly
        </p>
      </div>
    </div>
  );
}
