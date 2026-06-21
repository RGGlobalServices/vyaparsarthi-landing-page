import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Link from "next/link";
import StatsSection from "@/components/StatsSection";

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <HeroSection />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#27DEBF]/30 bg-[#27DEBF]/10 text-[#204341] text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#27DEBF] animate-pulse" />
                India&apos;s #1 Kirana Management App
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-[#204341]">
                Apni Dukan Ko <br />
                <span className="bg-gradient-to-r from-[#204341] to-[#27DEBF] bg-clip-text text-transparent">
                  Smart Banao
                </span>
              </h1>

              <p className="text-lg md:text-xl text-[#667E7C] max-w-lg mb-10">
                Billing, Inventory, Udhar — Sab Ek App Mein
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                <Link
                  href="/register"
                  className="px-8 py-3.5 rounded-xl bg-[#27DEBF] text-[#204341] font-bold text-lg text-center shadow-lg shadow-[#27DEBF]/20 hover:shadow-lg hover:shadow-[#27DEBF]/30 hover:scale-105 transition-all duration-300"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="#how-it-works"
                  className="px-8 py-3.5 rounded-xl border border-slate-300 text-slate-700 bg-white font-semibold text-lg text-center hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
                >
                  See How It Works
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
                <Link
                  href="/download"
                  className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 bg-white font-medium text-base flex items-center justify-center gap-2 hover:bg-slate-50 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.523 15.3414C17.523 15.3414 16.3262 15.3414 15.1294 15.3414C15.1294 15.3414 15.1294 17.7348 15.1294 17.7348C15.1294 18.3934 14.595 18.9278 13.9364 18.9278C13.2778 18.9278 12.7434 18.3934 12.7434 17.7348C12.7434 17.7348 12.7434 15.3414 12.7434 15.3414C12.7434 15.3414 11.2566 15.3414 11.2566 15.3414C11.2566 15.3414 11.2566 17.7348 11.2566 17.7348C11.2566 18.3934 10.7222 18.9278 10.0636 18.9278C9.405 18.9278 8.8706 18.3934 8.8706 17.7348C8.8706 17.7348 8.8706 15.3414 8.8706 15.3414C8.8706 15.3414 7.6738 15.3414 7.6738 15.3414C7.0152 15.3414 6.4808 14.807 6.4808 14.1484C6.4808 14.1484 6.4808 10.5574 6.4808 10.5574C6.4808 8.2432 8.3568 6.3672 10.671 6.3672C10.671 6.3672 13.329 6.3672 13.329 6.3672C15.6432 6.3672 17.5192 8.2432 17.5192 10.5574C17.5192 10.5574 17.5192 14.1484 17.5192 14.1484C17.5192 14.807 16.9848 15.3414 16.3262 15.3414C16.3262 15.3414 17.523 15.3414 17.523 15.3414ZM11.2566 9.3604C11.2566 8.7018 10.7222 8.1674 10.0636 8.1674C9.405 8.1674 8.8706 8.7018 8.8706 9.3604C8.8706 10.019 9.405 10.5534 10.0636 10.5534C10.7222 10.5534 11.2566 10.019 11.2566 9.3604ZM15.1294 9.3604C15.1294 8.7018 14.595 8.1674 13.9364 8.1674C13.2778 8.1674 12.7434 8.7018 12.7434 9.3604C12.7434 10.019 13.2778 10.5534 13.9364 10.5534C14.595 10.5534 15.1294 10.019 15.1294 9.3604Z"/>
                  </svg>
                  Download for Android
                </Link>
                <Link
                  href="/download"
                  className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 bg-white font-medium text-base flex items-center justify-center gap-2 hover:bg-slate-50 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                  </svg>
                  Download for Windows
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-rose-500 border-2 border-white flex items-center justify-center text-sm font-bold text-white shadow-lg" role="img" aria-label="user">RK</span>
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center text-sm font-bold text-white shadow-lg" role="img" aria-label="user">PM</span>
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-white flex items-center justify-center text-sm font-bold text-white shadow-lg" role="img" aria-label="user">AS</span>
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 border-2 border-white flex items-center justify-center text-sm font-bold text-white shadow-lg" role="img" aria-label="user">SJ</span>
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white flex items-center justify-center text-sm font-bold text-white shadow-lg" role="img" aria-label="user">+</span>
                </div>
                <p className="text-slate-500 text-sm">
                  <span className="text-[#204341] font-semibold">2,000+</span> Shop Owners Trust Us
                </p>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-50">
                <img
                  src="/hero-illustration.png"
                  alt="Vyapar Sarthi Dashboard Mockup"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />

      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </>
  );
}
