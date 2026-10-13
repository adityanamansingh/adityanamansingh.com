import Backdrop from "@/components/Backdrop";
import Analytics from "@/components/Analytics";
import { SITE, SITE_DESC, siteJsonLd } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Aditya Naman Singh — Full Stack & AI Engineer", template: "%s · Aditya Naman Singh" },
  description: SITE_DESC,
  applicationName: "Aditya Naman Singh",
  authors: [{ name: "Aditya Naman Singh", url: SITE }],
  creator: "Aditya Naman Singh",
  keywords: ["Aditya Naman Singh", "Full Stack Engineer", "AI Engineer", "Laravel", "Node.js", "Vue 3", "Gemini", "RAG", "Delhi NCR", "portfolio"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { title: "Aditya Naman Singh — Full Stack & AI Engineer", description: SITE_DESC, url: SITE, siteName: "Aditya Naman Singh", locale: "en_IN", type: "profile", firstName: "Aditya", lastName: "Singh" },
  twitter: { card: "summary_large_image", title: "Aditya Naman Singh — Full Stack & AI Engineer", description: SITE_DESC },
};
export const viewport: Viewport = { themeColor: "#14161b", colorScheme: "dark light", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=(t==="light"||t==="dark")?t:"dark"}catch(e){}` }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd()) }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${instrument.variable} antialiased`}><Backdrop />{children}<Analytics /></body>
    </html>
  );
}
