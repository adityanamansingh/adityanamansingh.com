import Backdrop from "@/components/Backdrop";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument" });

export const metadata: Metadata = {
  metadataBase: new URL("https://adityanamansingh.com"),
  title: { default: "Aditya Naman Singh — Full Stack & AI Engineer", template: "%s · Aditya Naman Singh" },
  description: "Full Stack & AI Engineer with 6+ years in Laravel, Node.js, Vue and Gemini. Case studies, an interactive terminal you can ask questions, and how to reach me.",
  openGraph: { title: "Aditya Naman Singh — Full Stack & AI Engineer", description: "Bento portfolio with case studies and a terminal you can ask anything.", type: "website" },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#14161b", colorScheme: "dark light", viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=(t==="light"||t==="dark")?t:"dark"}catch(e){}` }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${instrument.variable} antialiased`}><Backdrop />{children}</body>
    </html>
  );
}
