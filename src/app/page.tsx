"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden bg-[#141414]">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/landing.png" 
          alt="Premium Food Photography" 
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
      </div>

      <div className="flex-1 flex flex-col justify-end p-8 pb-16 relative z-10 max-w-sm mx-auto w-full">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        >
          <h1 className="text-5xl font-serif font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Cook Beautiful Meals With What You Have
          </h1>
          <p className="text-white/70 text-lg mb-10 font-medium leading-relaxed">
            Your pantry turned into personalized recipes.
          </p>

          <Link href="/login" className="w-full">
            <Button 
              size="lg" 
              className="w-full h-18 rounded-[32px] bg-[#FF6A1A] hover:bg-[#E55A16] text-white text-xl font-bold transition-all active:scale-[0.98] shadow-xl shadow-[#FF6A1A]/20"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 2 }}
          className="mt-12 text-center text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          Designed for the Modern Kitchen
        </motion.div>
      </div>

      {/* Subtle Grain Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay">
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>
    </div>
  );
}
