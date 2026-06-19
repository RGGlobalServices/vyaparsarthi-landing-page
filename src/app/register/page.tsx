"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { register, isLoggedIn, redirectAfterAuth, getRedirectParam } from "@/lib/auth";
import { config } from "@/lib/config";
import GoogleSignInButton from "@/components/GoogleSignInButton";

// Resolve the app (dashboard) URL at runtime so it never depends on baked-in
// env vars (which point to the wrong port on the landing page).
function resolveAppUrl(): string {
  if (typeof window !== "undefined" && window.location.port === "3000") {
    return `${window.location.protocol}//${window.location.hostname}:3001`;
  }
  return config.FRONTEND_URL;
}

const businessTypes = ["Kirana", "Pharmacy", "Clothing", "Electronics", "Cosmetics", "General Store"];
const languages = ["EN", "HI", "MR"];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    shopName: "",
    shopAddress: "",
    businessType: "",
    city: "",
    language: "EN",
    referralCode: "",
    agreedToTerms: false,
  });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    setRedirect(getRedirectParam());
    if (isLoggedIn()) {
      redirectAfterAuth("/");
    }
  }, []);

  const update = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (step === 1) return form.fullName && form.email && form.phone && form.password;
    if (step === 2) return form.shopName && form.shopAddress && form.businessType && form.city;
    if (step === 3) return form.agreedToTerms;
    return false;
  };

  const nextStep = () => {
    setError("");
    if (canProceed() && step < 3) setStep((s) => s + 1);
  };

  const prevStep = () => {
    setError("");
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({
        email: form.email,
        password: form.password,
        name: form.fullName.split(" ")[0],
        fullName: form.fullName,
        mobile: form.phone,
        storeName: form.shopName,
        businessType: form.businessType,
      });
      // Every new account starts a free trial — redirect to plan selection
      // so the user picks a plan before accessing the app.
      window.location.href = `/payment`;
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
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

      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3.5xl font-extrabold text-[#204341] tracking-tight">
            Create Your Account
          </h1>
          <p className="text-[#667E7C] mt-2 text-sm font-medium">Join 2,000+ shop owners managing smarter</p>
        </div>

        <div className="bg-white/70 border border-slate-200/80 rounded-3xl p-8 sm:p-10 backdrop-blur-md shadow-2xl shadow-[#204341]/5 transition-all duration-300">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    s === step
                      ? "bg-[#27DEBF] text-[#204341] shadow-lg shadow-[#27DEBF]/20"
                      : s < step
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                >
                  {s < step ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    s
                  )}
                </div>
                {s < 3 && (
                  <div className={`w-16 sm:w-24 h-1 mx-2 rounded transition-all duration-300 ${s < step ? "bg-emerald-500" : "bg-slate-200"}`} />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <>
                <h2 className="text-lg font-bold text-[#204341]">Personal Details</h2>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200"
                    placeholder="Ramesh Kumar"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200"
                    placeholder="ramesh@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200"
                      placeholder="Min. 8 characters"
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
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268-2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
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
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-lg font-bold text-[#204341]">Shop Details</h2>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Shop Name</label>
                  <input
                    type="text"
                    value={form.shopName}
                    onChange={(e) => update("shopName", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200"
                    placeholder="Ramesh Kirana Store"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Shop Address</label>
                  <textarea
                    value={form.shopAddress}
                    onChange={(e) => update("shopAddress", e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200 resize-none"
                    placeholder="123, Main Road, Near Bus Stand..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Business Type</label>
                  <select
                    value={form.businessType}
                    onChange={(e) => update("businessType", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200"
                  >
                    <option value="">Select business type</option>
                    {businessTypes.map((bt) => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200"
                    placeholder="Mumbai"
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-lg font-bold text-[#204341]">Preferences</h2>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Preferred Language</label>
                  <div className="flex gap-3">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => update("language", lang)}
                        className={`flex-1 py-3 rounded-xl border font-bold transition ${
                          form.language === lang
                            ? "border-[#27DEBF] bg-[#27DEBF]/10 text-[#204341]"
                            : "border-slate-200 bg-slate-50/50 text-[#667E7C] hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#204341]/80 mb-1.5">Referral Code (optional)</label>
                  <input
                    type="text"
                    value={form.referralCode}
                    onChange={(e) => update("referralCode", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50/50 border border-slate-200 text-[#204341] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#27DEBF]/10 focus:border-[#27DEBF] focus:bg-white transition-all duration-200"
                    placeholder="Enter referral code"
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agreedToTerms}
                    onChange={(e) => update("agreedToTerms", e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-slate-300 bg-slate-50/50 accent-[#27DEBF]"
                  />
                  <span className="text-sm text-[#667E7C] font-medium">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[#2460DA] hover:text-[#27DEBF] font-semibold">Terms of Service</Link> and{" "}
                    <Link href="/privacy" className="text-[#2460DA] hover:text-[#27DEBF] font-semibold">Privacy Policy</Link>
                  </span>
                </label>
              </>
            )}

            <div className="flex gap-3 pt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-[#204341] font-semibold hover:bg-slate-50 transition-all"
                >
                  Back
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                    canProceed()
                      ? "bg-[#27DEBF] text-[#204341] shadow-lg shadow-[#27DEBF]/10 hover:bg-[#22C2A7] hover:scale-[1.01] hover:shadow-xl"
                      : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  }`}
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed() || loading}
                  className={`flex-1 py-3.5 rounded-xl font-bold transition-all duration-300 ${
                    canProceed() && !loading
                      ? "bg-[#27DEBF] text-[#204341] shadow-lg shadow-[#27DEBF]/10 hover:bg-[#22C2A7] hover:scale-[1.01] hover:shadow-xl"
                      : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              )}
            </div>
          </form>

          {config.GOOGLE_CLIENT_ID && (
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white/80 px-4 text-slate-400">or sign up with</span></div>
            </div>
          )}
          <GoogleSignInButton />

          <p className="mt-6 text-center text-sm text-[#667E7C] font-medium">
            Already have an account?{" "}
            <Link href={`/login${redirect ? `?redirect=${redirect}` : ''}`} className="text-[#2460DA] hover:text-[#27DEBF] font-semibold transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
