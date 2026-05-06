import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "KitchenMate - Decide dinner in under 30 seconds",
  description: "A decision-first cooking assistant that helps you quickly decide what to cook using ingredients you already have.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-[#fcfbf9] text-zinc-900 font-sans selection:bg-orange-100 selection:text-orange-900 flex flex-col antialiased">
        <main className="flex-grow flex flex-col mx-auto w-full max-w-md bg-white min-h-screen shadow-sm relative border-x border-zinc-100/50">
          {children}
        </main>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
