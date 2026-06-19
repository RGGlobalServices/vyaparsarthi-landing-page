"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { login, isLoggedIn, redirectAfterAuth, getRedirectParam } from "@/lib/auth";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    setRedirect(getRedirectParam());
    if (isLoggedIn()) redirectAfterAuth("/");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      redirectAfterAuth("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-24 bg-gradient-to-br from-[#F3F9FF] via-white to-[#E8F6F4] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-[#27DEBF]/5 animate-float-slow -z-10" />
      <div className="absolute top-40 left-[5%] w-48 h-48 rounded-full bg-[#2460DA]/5 animate-float -z-10" />
      <div className="absolute bottom-32 right-[25%] w-36 h-36 rounded-full bg-[#27DEBF]/8 animate-float-slow -z-10" />
      <div className="absolute top-[60%] left-[15%] w-24 h-24 rounded-full bg-[#2460DA]/5 animate-float -z-10" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3.5xl font-extrabold text-[#204341] tracking-tight">
            Welcome Back
          </h1>
          <p className="text-[#667E7C] mt-2 text-sm font-medium">Sign in to your Vyapar Sarthi account</p>
        </div>

        <div className="bg-white/70 border border-slate-200/80 rounded-3xl p-8 sm:p-10 backdrop-blur-md shadow-2xl shadow-[#204341]/5 transition-all duration-300">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[#204341]/80 mb-1.5">
                Email Address
              </label>
              <input
                id="email" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200"
                placeholder="you@example.com" required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-bold text-[#204341]/80">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-[#2460DA] hover:text-[#27DEBF] font-semibold transition">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200"
                  placeholder="Enter your password" required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#204341] transition"
                  tabIndex={-1}
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#27DEBF] text-[#204341] font-bold text-lg shadow-lg shadow-[#27DEBF]/10 hover:bg-[#22C2A7] hover:scale-[1.01] hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white/80 px-4 text-slate-400">or continue with</span>
            </div>
          </div>

          <GoogleSignInButton />

          <p className="mt-6 text-center text-sm text-[#667E7C] font-medium">
            Don&apos;t have an account?{" "}
            <Link href={`/register${redirect ? `?redirect=${redirect}` : ''}`} className="text-[#2460DA] hover:text-[#27DEBF] font-semibold transition">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
