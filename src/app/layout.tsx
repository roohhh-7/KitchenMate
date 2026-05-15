import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { BottomNav } from "@/components/bottom-nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "Cooking Hub | Premium AI Culinary Assistant",
  description: "Experience the art of cooking with our luxury AI-powered kitchen companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} antialiased bg-[#FAF7F2] text-[#181818] min-h-screen flex flex-col font-inter overflow-x-hidden`}
      >
        <div className="flex-1 flex flex-col max-w-[390px] mx-auto w-full relative min-h-screen bg-background shadow-[0_0_100px_rgba(0,0,0,0.05)]">
          <main className="flex-1 flex flex-col w-full relative">
            {children}
          </main>
          <BottomNav />
          <Toaster position="top-center" expand={false} richColors />
        </div>
      </body>
    </html>
  );
}
