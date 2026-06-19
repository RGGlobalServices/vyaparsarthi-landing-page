"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const stats = [
  { label: "Active Shop Owners", value: 10, suffix: "+" },
  { label: "City Covered", value: 1, suffix: "" },
  { label: "Monthly Transactions", value: 10000, suffix: "+", format: true },
];

const team = [
  { name: "Rahul Gosavi", role: "Product Research & Development Head", initials: "RG" },
  { name: "Ashish Gosavi", role: "Research And Marketing Team Head", initials: "AG" },
  { name: "Adarsh More", role: "Marketing Team", initials: "AM" },
  { name: "Harsh Dharnkar", role: "Marketing Team", initials: "HD" },
  { name: "Sai Kale", role: "Marketing Team", initials: "SK" },
  { name: "Ketan Vishwakarma", role: "Marketing Team", initials: "KV" },
];

function CountUp({ target, suffix, format }: { target: number; suffix: string; format?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {format ? `${(count / 1000).toFixed(count >= 1000 ? 1 : 0)}K` : count}
      {suffix}
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen relative pt-28 pb-20 bg-gradient-to-br from-white via-[#F3F9FF] to-[#E8F6F4] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-[#27DEBF]/5 animate-float-slow -z-10" />
      <div className="absolute top-40 left-[5%] w-48 h-48 rounded-full bg-[#2460DA]/5 animate-float -z-10" />
      <div className="absolute bottom-32 right-[25%] w-36 h-36 rounded-full bg-[#27DEBF]/8 animate-float-slow -z-10" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-[#204341] to-[#27DEBF] bg-clip-text text-transparent">
              About Vyapar Sarthi
            </span>
          </h1>
          <p className="text-[#667E7C] text-lg max-w-2xl mx-auto font-medium">
            Empowering India&apos;s Kirana stores with smart technology. We believe every shop owner deserves modern tools to grow their business.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white/80 border border-slate-200/80 rounded-3xl p-6 text-center shadow-xl shadow-[#204341]/2 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-extrabold text-[#27DEBF] mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} format={stat.format} />
              </div>
              <div className="text-[#667E7C] text-sm font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-[#204341]/2 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#204341] mb-4">Our Mission</h2>
            <p className="text-[#667E7C] leading-relaxed font-medium">
              To simplify shop management for every Kirana store owner in India through intuitive, affordable, and powerful technology — bridging the gap between traditional retail and modern commerce.
            </p>
          </div>
          <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-[#204341]/2 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#204341] mb-4">Our Vision</h2>
            <p className="text-[#667E7C] leading-relaxed font-medium">
              A future where every small shop in India runs smarter — with real-time inventory, digital payments, AI-powered insights, and seamless customer management — all from their phone.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-center text-[#204341] mb-10 tracking-tight">Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {team.map((member) => (
            <div key={member.name} className="bg-white/80 border border-slate-200/80 rounded-3xl p-6 text-center shadow-lg shadow-[#204341]/2 hover:border-[#27DEBF]/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full bg-[#27DEBF]/10 border border-[#27DEBF]/20 mx-auto mb-4 flex items-center justify-center text-xl font-bold text-[#204341] group-hover:scale-105 group-hover:bg-[#27DEBF] group-hover:text-[#204341] transition-all duration-300">
                {member.initials}
              </div>
              <h3 className="text-[#204341] font-bold">{member.name}</h3>
              <p className="text-[#667E7C] text-sm mt-1 font-semibold">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/register"
            className="inline-flex px-8 py-3.5 rounded-xl bg-[#27DEBF] text-[#204341] font-bold text-lg shadow-lg shadow-[#27DEBF]/10 hover:bg-[#22C2A7] hover:scale-105 transition-all duration-300"
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  );
}
