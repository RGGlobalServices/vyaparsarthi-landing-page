'use client';

import { useState } from 'react';
import Link from 'next/link';
import { config } from '@/lib/config';

type Step = 'email' | 'otp' | 'reset' | 'done';

async function apiFetch(path: string, body: object) {
  const res = await fetch(`${config.API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.detail || data.message || 'Request failed');
  return data;
}

export default function ForgotPasswordPage() {
  const [step, setStep]           = useState<Step>('email');
  const [email, setEmail]         = useState('');
  const [otp, setOtp]             = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPwd, setNewPwd]       = useState('');
  const [showPwd, setShowPwd]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  // Step 1: send OTP
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) { setError('Please enter your email.'); return; }
    setLoading(true); setError('');
    try {
      await apiFetch('/auth/forgot-password', { email: email.trim() });
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally { setLoading(false); }
  }

  // Step 2: verify OTP
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!otp || otp.length !== 6) { setError('Enter the 6-digit OTP from your email.'); return; }
    setLoading(true); setError('');
    try {
      const data = await apiFetch('/auth/verify-otp', { email, otp });
      setResetToken(data.resetToken);
      setStep('reset');
    } catch (err: any) {
      setError(err.message || 'Incorrect OTP. Please try again.');
    } finally { setLoading(false); }
  }

  // Step 3: reset password
  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!newPwd || newPwd.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true); setError('');
    try {
      await apiFetch('/auth/reset-password', { resetToken, newPassword: newPwd });
      setStep('done');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally { setLoading(false); }
  }

  const inputCls = "w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200 text-sm";
  const btnCls   = "w-full py-3.5 rounded-xl bg-[#27DEBF] text-[#204341] font-bold text-base shadow-lg shadow-[#27DEBF]/10 hover:bg-[#22C2A7] hover:scale-[1.01] hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-24 bg-gradient-to-br from-[#F3F9FF] via-white to-[#E8F6F4] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-[#27DEBF]/5 animate-float-slow -z-10" />
      <div className="absolute top-40 left-[5%] w-48 h-48 rounded-full bg-[#2460DA]/5 animate-float -z-10" />
      <div className="absolute bottom-32 right-[25%] w-36 h-36 rounded-full bg-[#27DEBF]/8 animate-float-slow -z-10" />
      <div className="absolute top-[60%] left-[15%] w-24 h-24 rounded-full bg-[#2460DA]/5 animate-float -z-10" />

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/70 border border-slate-200/80 rounded-3xl p-8 sm:p-10 backdrop-blur-md shadow-2xl shadow-[#204341]/5 transition-all duration-300">

          {/* Step indicators */}
          <div className="flex items-center gap-2 mb-8">
            {(['email', 'otp', 'reset'] as Step[]).map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                  step === s ? 'bg-[#27DEBF] text-[#204341] shadow-lg shadow-[#27DEBF]/20' :
                  (['otp', 'reset', 'done'].indexOf(step) > i || step === 'done') ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}>{i + 1}</div>
                {i < 2 && <div className={`h-1 flex-1 rounded ${(['otp', 'reset', 'done'].indexOf(step) > i) ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>

          {/* Done */}
          {step === 'done' && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-[#204341] tracking-tight">Password Reset!</h2>
                <p className="text-[#667E7C] text-sm mt-2 font-medium">Your password has been changed. You can now sign in.</p>
              </div>
              <Link href="/login"
                className="block w-full py-3.5 rounded-xl bg-[#27DEBF] text-[#204341] font-bold text-center hover:bg-[#22C2A7] hover:scale-[1.01] hover:shadow-xl transition-all duration-300">
                Go to Login
              </Link>
            </div>
          )}

          {/* Step 1: Email */}
          {step === 'email' && (
            <>
              <h1 className="text-2xl font-extrabold text-[#204341] mb-1 tracking-tight">Forgot Password</h1>
              <p className="text-[#667E7C] text-sm mb-6 font-medium">Enter your email and we&apos;ll send a 6-digit OTP to reset your password.</p>
              <form onSubmit={handleSendOtp} className="space-y-5">
                <input type="email" placeholder="Email address" value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  className={inputCls} required />
                {error && <p className="text-red-600 text-sm flex items-center gap-1 font-medium">⚠️ {error}</p>}
                <button type="submit" disabled={loading} className={btnCls}>
                  {loading ? 'Sending OTP…' : 'Send OTP'}
                </button>
              </form>
            </>
          )}

          {/* Step 2: OTP */}
          {step === 'otp' && (
            <>
              <h1 className="text-2xl font-extrabold text-[#204341] mb-1 tracking-tight">Enter OTP</h1>
              <p className="text-[#667E7C] text-sm mb-6 font-medium">
                We sent a 6-digit code to <span className="text-[#2460DA] font-semibold">{email}</span>. It expires in 10 minutes.
              </p>
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <input
                  type="text" inputMode="numeric" maxLength={6}
                  placeholder="______"
                  value={otp}
                  onChange={e => { setOtp(e.target.value.replace(/\D/g, '')); setError(''); }}
                  className={`${inputCls} text-center tracking-[0.5em] text-2xl font-mono`} />
                {error && <p className="text-red-600 text-sm flex items-center gap-1 font-medium">⚠️ {error}</p>}
                <button type="submit" disabled={loading} className={btnCls}>
                  {loading ? 'Verifying…' : 'Verify OTP'}
                </button>
                <p className="text-center text-xs text-[#667E7C] font-medium">
                  Didn&apos;t receive it?{' '}
                  <button type="button" onClick={() => { setStep('email'); setOtp(''); setError(''); }}
                    className="text-[#2460DA] hover:text-[#27DEBF] font-semibold transition-colors">Resend</button>
                </p>
              </form>
            </>
          )}

          {/* Step 3: New password */}
          {step === 'reset' && (
            <>
              <h1 className="text-2xl font-extrabold text-[#204341] mb-1 tracking-tight">Set New Password</h1>
              <p className="text-[#667E7C] text-sm mb-6 font-medium">Choose a strong password for your account.</p>
              <form onSubmit={handleReset} className="space-y-5">
                <div className="relative">
                  <input type={showPwd ? 'text' : 'password'} placeholder="New password (min 6 chars)" value={newPwd}
                    onChange={e => { setNewPwd(e.target.value); setError(''); }}
                    className={`${inputCls} pr-12`} />
                  <button type="button" onClick={() => setShowPwd(v => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#204341] transition-colors text-xs font-semibold">
                    {showPwd ? 'Hide' : 'Show'}
                  </button>
                </div>
                {error && <p className="text-red-600 text-sm flex items-center gap-1 font-medium">⚠️ {error}</p>}
                <button type="submit" disabled={loading} className={btnCls}>
                  {loading ? 'Resetting…' : 'Reset Password'}
                </button>
              </form>
            </>
          )}

          {step !== 'done' && (
            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm text-[#2460DA] hover:text-[#27DEBF] font-semibold transition-colors">
                ← Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
