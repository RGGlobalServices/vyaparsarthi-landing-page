export default function Terms() {
  return (
    <div className="min-h-screen relative pt-28 pb-20 bg-gradient-to-br from-white via-[#F3F9FF] to-[#E8F6F4] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-[#27DEBF]/5 animate-float-slow -z-10" />
      <div className="absolute top-40 left-[5%] w-48 h-48 rounded-full bg-[#2460DA]/5 animate-float -z-10" />
      <div className="absolute bottom-32 right-[25%] w-36 h-36 rounded-full bg-[#27DEBF]/8 animate-float-slow -z-10" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-[#204341]/2 backdrop-blur-sm">
          <h1 className="text-4xl font-extrabold mb-6 text-[#204341] tracking-tight">Terms of Service</h1>
          <p className="text-[#667E7C] text-sm font-semibold mb-6">Last updated: January 2026</p>
          <div className="space-y-6 text-[#667E7C] leading-relaxed font-medium">
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using Vyapar Sarthi, you agree to be bound by these terms. If you do not agree, do not use the service.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">2. Description of Service</h2>
              <p>Vyapar Sarthi provides shop management tools including billing, inventory tracking, udhar management, and analytics.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">3. User Responsibilities</h2>
              <p>You are responsible for maintaining the confidentiality of your account and for all activities under your account.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">4. Limitation of Liability</h2>
              <p>Vyapar Sarthi shall not be liable for any indirect, incidental, or consequential damages arising from the use of the service.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
