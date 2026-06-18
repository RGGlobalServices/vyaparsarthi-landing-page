import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
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

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
                <a
                  href="/register"
                  className="px-8 py-3.5 rounded-xl bg-[#27DEBF] text-[#204341] font-bold text-lg text-center shadow-lg shadow-[#27DEBF]/20 hover:shadow-lg hover:shadow-[#27DEBF]/30 hover:scale-105 transition-all duration-300"
                >
                  Start Free Trial
                </a>
                <a
                  href="#how-it-works"
                  className="px-8 py-3.5 rounded-xl border border-slate-300 text-slate-700 bg-white font-semibold text-lg text-center hover:bg-slate-50 hover:border-slate-400 transition-all duration-300"
                >
                  See How It Works
                </a>
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
