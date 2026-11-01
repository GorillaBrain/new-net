import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "NEW NET — Designing an Alternative Architecture for the Internet",
  description:
    "NEW NET — Exploring an alternative internet architecture built around digital sovereignty, decentralisation, privacy, interoperability, information freedom, and security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-[#07090e] text-slate-200 antialiased selection:bg-blue-500/30 selection:text-blue-200">
        <Navbar />
        <main className="flex-1 bg-tech-grid">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
