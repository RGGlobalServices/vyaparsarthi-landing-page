'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken, getUser, isLoggedIn, apiGet } from '@/lib/auth';
import { config } from '@/lib/config';

// ── helpers ─────────────────────────────────────────────────────────────
async function apiPatch(path: string, body: object, token: string) {
  const res = await fetch(`${config.API_BASE}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || 'Request failed');
  return data;
}

const TOOL_LABELS: Record<string, string> = {
  billing: '🧾 Billing', stock: '📦 Stock', udhar: '📒 Udhar',
  ai: '🤖 Vyapar Guru', calendar: '📅 Calendar', reports: '📊 Reports',
  products: '🏷️ Products', returns: '↩️ Returns', customers: '👥 Customers',
  dukandar: '🤝 Dukandar', settings: '⚙️ Settings',
};

const PLAN_COLORS: Record<string, { bg: string; text: string; border: string; emoji: string }> = {
  starter: { bg: 'bg-teal-50',    text: 'text-teal-700',   border: 'border-teal-200',  emoji: '🌱' },
  shop:    { bg: 'bg-teal-50',    text: 'text-teal-700',   border: 'border-teal-200',  emoji: '🏪' },
  vyapar:  { bg: 'bg-blue-50',    text: 'text-blue-700',   border: 'border-blue-200',  emoji: '🚀' },
  udyog:   { bg: 'bg-purple-50',  text: 'text-purple-700', border: 'border-purple-200',emoji: '👑' },
  wholesale:{ bg: 'bg-amber-50',  text: 'text-amber-700',  border: 'border-amber-200', emoji: '🏭' },
};

function planLabel(plan: string) {
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

// ── Eye toggle icon ───────────────────────────────────────────────────────
function EyeIcon({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button type="button" tabIndex={-1} onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition">
      {show ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7a9.97 9.97 0 014.9 1.275M15 12a3 3 0 11-4.5-2.598M3 3l18 18" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      )}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────
export default function ProfilePage() {
  const router = useRouter();
  const token  = typeof window !== 'undefined' ? getToken() : null;

  const [loading, setLoading]   = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [shop, setShop]         = useState<any>(null);
  const [toolUsages, setToolUsages] = useState<any[]>([]);

  // Change password
  const [cpCurrent, setCpCurrent]     = useState('');
  const [cpNew, setCpNew]             = useState('');
  const [cpConfirm, setCpConfirm]     = useState('');
  const [cpLoading, setCpLoading]     = useState(false);
  const [cpError, setCpError]         = useState('');
  const [cpOk, setCpOk]               = useState(false);
  const [showCpCurrent, setShowCpCurrent] = useState(false);
  const [showCpNew, setShowCpNew]         = useState(false);
  const [showCpConfirm, setShowCpConfirm] = useState(false);

  // Profit password
  const [ppCurrent, setPpCurrent]     = useState('');
  const [ppNew, setPpNew]             = useState('');
  const [ppLoading, setPpLoading]     = useState(false);
  const [ppError, setPpError]         = useState('');
  const [ppOk, setPpOk]               = useState(false);
  const [hasPP, setHasPP]             = useState(false);
  const [showPpCurrent, setShowPpCurrent] = useState(false);
  const [showPpNew, setShowPpNew]         = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login'); return; }
    const tok = getToken()!;
    (async () => {
      try {
        const [ui, sh, tu] = await Promise.all([
          apiGet('/user/profile', tok),
          apiGet('/shop/profile', tok),
          apiGet('/user/tool-usage', tok),
        ]);
        setUserInfo(ui);
        setShop(sh);
        setToolUsages(tu || []);
        setHasPP(!!ui.hasProfitPassword);
      } catch {}
      setLoading(false);
    })();
  }, [router]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault(); setCpError(''); setCpOk(false);
    if (!cpCurrent) { setCpError('Enter your current password.'); return; }
    if (cpNew.length < 6) { setCpError('New password must be at least 6 characters.'); return; }
    if (cpNew !== cpConfirm) { setCpError('New passwords do not match.'); return; }
    setCpLoading(true);
    try {
      await apiPatch('/user/profile', { currentPassword: cpCurrent, newPassword: cpNew }, token!);
      setCpOk(true); setCpCurrent(''); setCpNew(''); setCpConfirm('');
    } catch (err: any) { setCpError(err.message || 'Failed to change password.'); }
    finally { setCpLoading(false); }
  };

  const handleSetProfitPwd = async (e: React.FormEvent) => {
    e.preventDefault(); setPpError(''); setPpOk(false);
    if (!ppCurrent) { setPpError('Enter your current login password.'); return; }
    if (ppNew.length < 4) { setPpError('Profit password must be at least 4 characters.'); return; }
    setPpLoading(true);
    try {
      await apiPatch('/user/profile', { currentPassword: ppCurrent, profitViewPassword: ppNew }, token!);
      setPpOk(true); setHasPP(true); setPpCurrent(''); setPpNew('');
      setTimeout(() => setPpOk(false), 3000);
    } catch (err: any) { setPpError(err.message || 'Failed to set profit password.'); }
    finally { setPpLoading(false); }
  };

  const handleRemoveProfitPwd = async () => {
    if (!ppCurrent) { setPpError('Enter your current login password first.'); return; }
    setPpLoading(true); setPpError(''); setPpOk(false);
    try {
      await apiPatch('/user/profile', { currentPassword: ppCurrent, removeProfitPassword: true }, token!);
      setHasPP(false); setPpCurrent(''); setPpNew(''); setPpOk(true);
      setTimeout(() => setPpOk(false), 3000);
    } catch (err: any) { setPpError(err.message || 'Failed to remove profit password.'); }
    finally { setPpLoading(false); }
  };

  // ── Style tokens (light theme matching landing page) ─────────────────────
  const inp  = "w-full px-4 py-2.5 pr-11 rounded-xl bg-white border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-sm transition-all";
  const card = "rounded-2xl bg-white border border-slate-200 shadow-sm p-6";
  const lbl  = "block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5";
  const btn  = "px-6 py-2.5 rounded-xl bg-linear-to-r from-teal-500 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const sectionHead = "text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2";

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-teal-500 border-t-transparent rounded-full animate-spin" style={{ borderWidth: 3 }} />
          <p className="text-slate-400 text-sm">Loading your account…</p>
        </div>
      </div>
    );
  }

  const planKey    = (shop?.subscriptionPlan || shop?.subscription_plan || 'starter').toLowerCase();
  const planStatus = shop?.subscriptionStatus || shop?.subscription_status || 'active';
  const planExpiry = shop?.subscriptionExpiry || shop?.subscription_expiry;
  const planColor  = PLAN_COLORS[planKey] || PLAN_COLORS.starter;
  const topTool    = toolUsages[0];
  const userName   = userInfo?.name || getUser()?.name || '—';
  const userEmail  = userInfo?.email || getUser()?.email || '—';

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-center gap-4">
          <Link href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-sm font-medium hover:border-teal-400 hover:text-teal-600 transition-all shadow-sm">
            ← Back
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-800">My Account</h1>
            <p className="text-slate-500 text-sm">Manage your profile, security &amp; preferences</p>
          </div>
        </div>

        {/* ── Account Info + Plan ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Account Info */}
          <div className={card}>
            <p className={sectionHead}>
              <span className="w-1 h-4 rounded bg-teal-500 inline-block" />
              Account Info
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-xl font-black text-white shrink-0 shadow">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-800 truncate">{userName}</p>
                <p className="text-slate-500 text-sm truncate">{userEmail}</p>
                {userInfo?.mobile && <p className="text-slate-400 text-xs mt-0.5">{userInfo.mobile}</p>}
              </div>
            </div>
            {(shop?.name || shop?.shop_name) && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 mb-0.5">Shop</p>
                <p className="font-semibold text-slate-700 text-sm">{shop.name || shop.shop_name}</p>
              </div>
            )}
          </div>

          {/* Current Plan */}
          <div className={card}>
            <p className={sectionHead}>
              <span className="w-1 h-4 rounded bg-teal-500 inline-block" />
              Current Plan
            </p>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold capitalize border ${planColor.bg} ${planColor.text} ${planColor.border}`}>
              {planColor.emoji} {planLabel(planKey)}
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Status:</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  planStatus === 'active' ? 'bg-emerald-50 text-emerald-600' :
                  planStatus === 'trial'  ? 'bg-amber-50 text-amber-600' :
                  'bg-red-50 text-red-600'
                }`}>{planStatus}</span>
              </div>
              {planExpiry && (
                <p className="text-xs text-slate-400">
                  Expires: <span className="text-slate-600 font-medium">{new Date(planExpiry).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </p>
              )}
            </div>
            <Link href="/#pricing"
              className="mt-4 block text-center py-2.5 rounded-xl bg-linear-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold hover:opacity-90 transition-all shadow-sm active:scale-95">
              Upgrade Plan →
            </Link>
          </div>
        </div>

        {/* ── Tool Usage ── */}
        {toolUsages.length > 0 && (
          <div className={card}>
            <p className={sectionHead}>
              <span className="w-1 h-4 rounded bg-teal-500 inline-block" />
              Tool Usage
            </p>
            {topTool && (
              <div className="mb-4 p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center gap-3">
                <span className="text-2xl">{TOOL_LABELS[topTool.tool]?.split(' ')[0] || '🔧'}</span>
                <div>
                  <p className="text-xs text-slate-400">Most Used</p>
                  <p className="font-bold text-teal-700">{TOOL_LABELS[topTool.tool] || topTool.tool}</p>
                  <p className="text-xs text-slate-500">{topTool.count} {topTool.count === 1 ? 'time' : 'times'}</p>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {toolUsages.map((u: any) => (
                <div key={u.tool} className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-base">{TOOL_LABELS[u.tool]?.split(' ')[0] || '🔧'}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{TOOL_LABELS[u.tool]?.replace(/^[^ ]+ /, '') || u.tool}</p>
                    <p className="text-[10px] text-slate-400">{u.count}× used</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Change Password ── */}
        <div className={card}>
          <p className={sectionHead}>
            <span className="text-base">🔑</span>
            Change Password
          </p>
          {cpOk ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium flex items-center gap-2">
              ✅ Password changed successfully!
            </div>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className={lbl}>Current Password</label>
                <div className="relative">
                  <input type={showCpCurrent ? 'text' : 'password'} value={cpCurrent}
                    onChange={e => { setCpCurrent(e.target.value); setCpError(''); }}
                    placeholder="Your current password" className={inp} autoComplete="current-password" />
                  <EyeIcon show={showCpCurrent} onToggle={() => setShowCpCurrent(v => !v)} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={lbl}>New Password</label>
                  <div className="relative">
                    <input type={showCpNew ? 'text' : 'password'} value={cpNew}
                      onChange={e => { setCpNew(e.target.value); setCpError(''); }}
                      placeholder="Min 6 characters" className={inp} autoComplete="new-password" />
                    <EyeIcon show={showCpNew} onToggle={() => setShowCpNew(v => !v)} />
                  </div>
                </div>
                <div>
                  <label className={lbl}>Confirm New Password</label>
                  <div className="relative">
                    <input type={showCpConfirm ? 'text' : 'password'} value={cpConfirm}
                      onChange={e => { setCpConfirm(e.target.value); setCpError(''); }}
                      placeholder="Repeat new password" className={inp} autoComplete="new-password" />
                    <EyeIcon show={showCpConfirm} onToggle={() => setShowCpConfirm(v => !v)} />
                  </div>
                </div>
              </div>
              {cpError && (
                <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">⚠️ {cpError}</p>
              )}
              <button type="submit" disabled={cpLoading} className={btn}>
                {cpLoading ? 'Saving…' : 'Update Password'}
              </button>
            </form>
          )}
        </div>

        {/* ── Profit View Password ── */}
        <div className={card}>
          <p className={sectionHead}>
            <span className="text-base">🔒</span>
            Today&apos;s Profit Password
          </p>
          <p className="text-slate-500 text-sm mb-4 -mt-2">
            Set a separate PIN / password to unlock today&apos;s profit in the app.
            {hasPP
              ? <span className="ml-1 text-emerald-600 font-medium">A password is currently set.</span>
              : <span className="ml-1 text-slate-400">No password is set yet.</span>}
          </p>
          {ppOk && (
            <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm font-medium flex items-center gap-2">
              ✅ Profit password {hasPP ? 'updated' : 'removed'} successfully!
            </div>
          )}
          <form onSubmit={handleSetProfitPwd} className="space-y-4">
            <div>
              <label className={lbl}>Your Current Login Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input type={showPpCurrent ? 'text' : 'password'} value={ppCurrent}
                  onChange={e => { setPpCurrent(e.target.value); setPpError(''); }}
                  placeholder="Verify your identity" className={inp} autoComplete="current-password" />
                <EyeIcon show={showPpCurrent} onToggle={() => setShowPpCurrent(v => !v)} />
              </div>
            </div>
            <div>
              <label className={lbl}>{hasPP ? 'New Profit Password' : 'Set Profit Password'}</label>
              <div className="relative">
                <input type={showPpNew ? 'text' : 'password'} value={ppNew}
                  onChange={e => { setPpNew(e.target.value); setPpError(''); }}
                  placeholder="Min 4 characters (can be a PIN like 1234)" className={inp} autoComplete="new-password" />
                <EyeIcon show={showPpNew} onToggle={() => setShowPpNew(v => !v)} />
              </div>
            </div>
            {ppError && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">⚠️ {ppError}</p>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              <button type="submit" disabled={ppLoading} className={btn}>
                {ppLoading ? 'Saving…' : hasPP ? 'Update Profit Password' : 'Set Profit Password'}
              </button>
              {hasPP && (
                <button type="button" onClick={handleRemoveProfitPwd} disabled={ppLoading}
                  className="px-4 py-2.5 rounded-xl border border-red-200 text-red-500 text-sm font-medium bg-red-50 hover:bg-red-100 transition-all disabled:opacity-50">
                  Remove Password
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ── Open App CTA ── */}
        <div className="rounded-2xl bg-linear-to-r from-teal-500 to-cyan-500 p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-black text-lg">Ready to manage your store?</p>
            <p className="text-teal-100 text-sm">Open the dashboard to start billing, tracking stock &amp; more.</p>
          </div>
          <a href={config.FRONTEND_URL || 'https://app.vyaparsarthii.com'}
            className="shrink-0 px-6 py-2.5 bg-white text-teal-700 font-bold rounded-xl text-sm hover:bg-teal-50 transition-all shadow active:scale-95">
            Open Dashboard →
          </a>
        </div>

      </div>
    </div>
  );
}
