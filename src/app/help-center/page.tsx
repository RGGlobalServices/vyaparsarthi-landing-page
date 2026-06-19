export default function HelpCenter() {
  return (
    <div className="min-h-screen relative pt-28 pb-20 bg-gradient-to-br from-white via-[#F3F9FF] to-[#E8F6F4] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-[#27DEBF]/5 animate-float-slow -z-10" />
      <div className="absolute top-40 left-[5%] w-48 h-48 rounded-full bg-[#2460DA]/5 animate-float -z-10" />
      <div className="absolute bottom-32 right-[25%] w-36 h-36 rounded-full bg-[#27DEBF]/8 animate-float-slow -z-10" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="text-4xl font-extrabold mb-8 text-[#204341] tracking-tight">Help Center</h1>
        <div className="space-y-6">
          <div className="p-6 md:p-8 rounded-3xl bg-white/80 border border-slate-200/80 shadow-xl shadow-[#204341]/2 backdrop-blur-sm hover:border-[#27DEBF]/50 transition duration-300">
            <h3 className="text-xl font-bold text-[#204341] mb-3">How do I create a bill?</h3>
            <p className="text-[#667E7C] leading-relaxed font-medium">Go to Billing section, add customer details, select products, and generate the bill. You can print or share it via WhatsApp.</p>
          </div>
          <div className="p-6 md:p-8 rounded-3xl bg-white/80 border border-slate-200/80 shadow-xl shadow-[#204341]/2 backdrop-blur-sm hover:border-[#27DEBF]/50 transition duration-300">
            <h3 className="text-xl font-bold text-[#204341] mb-3">How do I track inventory?</h3>
            <p className="text-[#667E7C] leading-relaxed font-medium">Add products in the Inventory section. Stock levels update automatically when bills are created.</p>
          </div>
          <div className="p-6 md:p-8 rounded-3xl bg-white/80 border border-slate-200/80 shadow-xl shadow-[#204341]/2 backdrop-blur-sm hover:border-[#27DEBF]/50 transition duration-300">
            <h3 className="text-xl font-bold text-[#204341] mb-3">Can I use it on mobile?</h3>
            <p className="text-[#667E7C] leading-relaxed font-medium">Yes! Vyapar Sarthi works on any device with a web browser. No app installation required.</p>
          </div>
          <div className="p-6 md:p-8 rounded-3xl bg-white/80 border border-slate-200/80 shadow-xl shadow-[#204341]/2 backdrop-blur-sm hover:border-[#27DEBF]/50 transition duration-300">
            <h3 className="text-xl font-bold text-[#204341] mb-3">How do I reset my password?</h3>
            <p className="text-[#667E7C] leading-relaxed font-medium">Click on &quot;Forgot Password&quot; on the login page and follow the instructions sent to your email.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
