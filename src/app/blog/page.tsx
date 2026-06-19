import Link from "next/link";

const posts = [
  {
    title: "How to Digitize Your Kirana Store in 5 Simple Steps",
    excerpt: "Transform your traditional shop into a smart store with billing, inventory, and udhar management — all from your phone.",
    date: "May 15, 2026",
    slug: "digitize-kirana-store",
  },
  {
    title: "Top 10 Features Every Kirana Shop Management App Should Have",
    excerpt: "From smart billing to AI insights, discover the must-have features that can save you time and grow your business.",
    date: "April 28, 2026",
    slug: "top-features-kirana-app",
  },
  {
    title: "Understanding Udhar Book: Digital Credit Management for Shop Owners",
    excerpt: "Learn how digital udhar management can reduce losses, track customer credit, and improve cash flow for your shop.",
    date: "April 10, 2026",
    slug: "udhar-book-digital-credit",
  },
  {
    title: "Why Your Shop Needs AI-Powered Inventory Management",
    excerpt: "AI can predict demand, reduce waste, and optimize stock levels. See how small shops are benefiting from smart inventory.",
    date: "March 22, 2026",
    slug: "ai-inventory-management",
  },
  {
    title: "The Future of Kirana Stores in India: 2026 & Beyond",
    excerpt: "Explore how technology is reshaping India's 12+ million Kirana stores and what it means for shop owners.",
    date: "March 5, 2026",
    slug: "future-of-kirana-stores",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen relative pt-28 pb-20 bg-gradient-to-br from-white via-[#F3F9FF] to-[#E8F6F4] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-[#27DEBF]/5 animate-float-slow -z-10" />
      <div className="absolute top-40 left-[5%] w-48 h-48 rounded-full bg-[#2460DA]/5 animate-float -z-10" />
      <div className="absolute bottom-32 right-[25%] w-36 h-36 rounded-full bg-[#27DEBF]/8 animate-float-slow -z-10" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-[#204341] to-[#27DEBF] bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-[#667E7C] text-lg max-w-2xl mx-auto font-medium">
            Tips, guides, and insights for Kirana shop owners to grow their business with smart technology.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white/80 border border-slate-200/80 rounded-3xl p-6 md:p-8 hover:border-[#27DEBF]/50 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 shadow-lg shadow-[#204341]/2 group">
              <Link href={`/blog/${post.slug}`}>
                <p className="text-xs text-[#667E7C] font-semibold mb-2">{post.date}</p>
                <h2 className="text-xl font-bold text-[#204341] group-hover:text-[#27DEBF] transition-colors mb-3 leading-snug">{post.title}</h2>
                <p className="text-[#667E7C] text-sm leading-relaxed font-medium">{post.excerpt}</p>
                <span className="inline-block mt-4 text-sm text-[#2460DA] font-bold group-hover:text-[#27DEBF] transition-colors group-hover:underline">Read More &rarr;</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
