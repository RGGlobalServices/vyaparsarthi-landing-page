export default function Refund() {
  return (
    <div className="min-h-screen relative pt-28 pb-20 bg-gradient-to-br from-white via-[#F3F9FF] to-[#E8F6F4] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-[#27DEBF]/5 animate-float-slow -z-10" />
      <div className="absolute top-40 left-[5%] w-48 h-48 rounded-full bg-[#2460DA]/5 animate-float -z-10" />
      <div className="absolute bottom-32 right-[25%] w-36 h-36 rounded-full bg-[#27DEBF]/8 animate-float-slow -z-10" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-[#204341]/2 backdrop-blur-sm">
          <h1 className="text-4xl font-extrabold mb-6 text-[#204341] tracking-tight">Refund Policy</h1>
          <p className="text-[#667E7C] text-sm font-semibold mb-6">Last updated: January 2026</p>
          <div className="space-y-6 text-[#667E7C] leading-relaxed font-medium">
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">1. Subscription Plans</h2>
              <p>All subscription plans are billed on a monthly or annual basis. You may cancel your subscription at any time.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">2. Refunds</h2>
              <p>Refunds are provided on a case-by-case basis. If you are not satisfied with our service, please contact us within 7 days of purchase.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">3. Free Trial</h2>
              <p>We offer a free trial period. You will not be charged during the trial period. Your subscription will only begin after the trial ends.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#204341] mt-8 mb-3">4. Contact for Refunds</h2>
              <p>For refund requests, email us at <a href="mailto:gbroindustries@gmail.com" className="text-[#2460DA] hover:text-[#27DEBF] font-semibold transition">gbroindustries@gmail.com</a> with your registered account details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
