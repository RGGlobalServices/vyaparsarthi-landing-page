export default function Privacy() {
  return (
    <div className="min-h-screen relative pt-28 pb-20 bg-gradient-to-br from-white via-[#F3F9FF] to-[#E8F6F4] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-[#27DEBF]/5 animate-float-slow -z-10" />
      <div className="absolute top-40 left-[5%] w-48 h-48 rounded-full bg-[#2460DA]/5 animate-float -z-10" />
      <div className="absolute bottom-32 right-[25%] w-36 h-36 rounded-full bg-[#27DEBF]/8 animate-float-slow -z-10" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-[#204341]/2 backdrop-blur-sm">
          <h1 className="text-4xl font-extrabold mb-6 text-[#204341] tracking-tight">Privacy Policy</h1>
          <p className="text-[#667E7C] text-sm font-semibold mb-6">Last updated: January 2026</p>
          <div className="space-y-6 text-[#667E7C] leading-relaxed font-medium">
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly, including your name, email address, phone number, shop details, and business information when you register for Vyapar Sarthi.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">2. How We Use Your Information</h2>
              <p>We use the information to provide, maintain, and improve our services, process transactions, send technical notices, and respond to your comments and questions.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">3. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information. All data is encrypted in transit and at rest.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">4. Contact Us</h2>
              <p>If you have questions about this privacy policy, contact us at <a href="mailto:gbroindustries@gmail.com" className="text-[#2460DA] hover:text-[#27DEBF] font-semibold transition">gbroindustries@gmail.com</a>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
