import type { Metadata } from "next";
import type { Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: {
    default: "Vyapar Sarthi - Apni Dukan Ko Smart Banao",
    template: "%s | Vyapar Sarthi"
  },
  description: "India's #1 Kirana shop management app. Smart billing, inventory tracking, udhar management, and AI-powered insights for your store.",
  keywords: ["kirana app", "shop management", "vyapar sarthi", "billing software", "inventory tracking", "udhar management", "india"],
  authors: [{ name: 'Vyapar Sarthi Team' }],
  creator: 'Vyapar Sarthi',
  publisher: 'Vyapar Sarthi',
  metadataBase: new URL('https://vyaparsarthii.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://vyaparsarthii.com',
    title: "Vyapar Sarthi - Apni Dukan Ko Smart Banao",
    description: "India's #1 Kirana shop management app. Smart billing, inventory tracking, udhar management, and AI-powered insights.",
    siteName: 'Vyapar Sarthi',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Vyapar Sarthi Landing Page',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vyapar Sarthi - Apni Dukan Ko Smart Banao",
    description: "India's #1 Kirana shop management app. Smart billing, inventory tracking, udhar management, and AI-powered insights.",
    creator: '@vyaparsarthi',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`} style={{ scrollPaddingTop: '80px' }}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
