'use client';

export default function HeroSection() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Wave SVG background */}
      <svg
        className="absolute bottom-0 left-0 w-full h-auto"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,192L48,176C96,160,192,128,288,133.3C384,139,480,181,576,186.7C672,192,768,160,864,149.3C960,139,1056,149,1152,165.3C1248,181,1344,203,1392,213.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="#F3F9FF"
        />
        <path
          d="M0,256L48,245.3C96,235,192,213,288,208C384,203,480,213,576,224C672,235,768,245,864,240C960,235,1056,213,1152,208C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          fill="rgba(39,222,191,0.07)"
        />
      </svg>

      {/* Decorative floating circles */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#27DEBF]/5 animate-float-slow" />
      <div className="absolute top-40 left-[5%] w-40 h-40 rounded-full bg-[#2460DA]/5 animate-float" />
      <div className="absolute bottom-32 right-[25%] w-24 h-24 rounded-full bg-[#27DEBF]/8 animate-float-slow" />
      <div className="absolute top-[60%] left-[15%] w-16 h-16 rounded-full bg-[#2460DA]/5 animate-float" />
    </div>
  );
}
