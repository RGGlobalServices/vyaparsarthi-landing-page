import Link from "next/link";

export const metadata = {
  title: "Download Vyapar Sarthi - Android & Windows App",
  description: "Download the Vyapar Sarthi app for your Android smartphone or Windows Desktop. Manage your Kirana store billing and inventory easily.",
};

export default function DownloadPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#27DEBF]/20 to-transparent -skew-y-6 origin-top-left -z-10" />
      <div className="absolute bottom-0 right-0 w-full h-[500px] bg-gradient-to-tl from-[#27DEBF]/10 to-transparent skew-y-6 origin-bottom-right -z-10" />

      <div className="max-w-4xl w-full mx-auto text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#204341] mb-6">
          Download <span className="bg-gradient-to-r from-[#204341] to-[#27DEBF] bg-clip-text text-transparent">Vyapar Sarthi</span>
        </h1>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
          Choose your platform to get started. Our app works seamlessly offline and syncs your data securely to the cloud when you're back online.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Android Download Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.523 15.3414C17.523 15.3414 16.3262 15.3414 15.1294 15.3414C15.1294 15.3414 15.1294 17.7348 15.1294 17.7348C15.1294 18.3934 14.595 18.9278 13.9364 18.9278C13.2778 18.9278 12.7434 18.3934 12.7434 17.7348C12.7434 17.7348 12.7434 15.3414 12.7434 15.3414C12.7434 15.3414 11.2566 15.3414 11.2566 15.3414C11.2566 15.3414 11.2566 17.7348 11.2566 17.7348C11.2566 18.3934 10.7222 18.9278 10.0636 18.9278C9.405 18.9278 8.8706 18.3934 8.8706 17.7348C8.8706 17.7348 8.8706 15.3414 8.8706 15.3414C8.8706 15.3414 7.6738 15.3414 7.6738 15.3414C7.0152 15.3414 6.4808 14.807 6.4808 14.1484C6.4808 14.1484 6.4808 10.5574 6.4808 10.5574C6.4808 8.2432 8.3568 6.3672 10.671 6.3672C10.671 6.3672 13.329 6.3672 13.329 6.3672C15.6432 6.3672 17.5192 8.2432 17.5192 10.5574C17.5192 10.5574 17.5192 14.1484 17.5192 14.1484C17.5192 14.807 16.9848 15.3414 16.3262 15.3414C16.3262 15.3414 17.523 15.3414 17.523 15.3414ZM11.2566 9.3604C11.2566 8.7018 10.7222 8.1674 10.0636 8.1674C9.405 8.1674 8.8706 8.7018 8.8706 9.3604C8.8706 10.019 9.405 10.5534 10.0636 10.5534C10.7222 10.5534 11.2566 10.019 11.2566 9.3604ZM15.1294 9.3604C15.1294 8.7018 14.595 8.1674 13.9364 8.1674C13.2778 8.1674 12.7434 8.7018 12.7434 9.3604C12.7434 10.019 13.2778 10.5534 13.9364 10.5534C14.595 10.5534 15.1294 10.019 15.1294 9.3604Z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#204341] mb-2">Android App</h2>
            <p className="text-sm text-slate-500 mb-8">For smartphones and tablets running Android 8.0 or higher.</p>
            <a 
              href="https://github.com/RGGlobalServices/vyaparsarthi-landing-page/raw/main/public/downloads/VyaparSarthi.apk" 
              download="Vyapar Sarthi.apk"
              className="mt-auto w-full py-4 rounded-xl font-bold text-white bg-green-500 hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download APK
            </a>
          </div>

          {/* Windows Download Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center transition-transform hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#204341] mb-2">Windows Desktop</h2>
            <p className="text-sm text-slate-500 mb-8">For PCs and laptops running Windows 10 or Windows 11.</p>
            <a 
              href="https://github.com/RGGlobalServices/vyaparsarthi-landing-page/raw/main/public/downloads/VyaparSarthi-Setup.exe" 
              download="Vyapar Sarthi Setup.exe"
              className="mt-auto w-full py-4 rounded-xl font-bold text-white bg-blue-500 hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download .EXE
            </a>
          </div>
        </div>

        <div className="mt-16 inline-flex items-center gap-2 text-sm text-slate-500">
          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          100% Safe & Secure. Free from viruses and malware.
        </div>
      </div>
    </div>
  );
}
