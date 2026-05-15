"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function GetStartedScreen() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FFF8F3] overflow-hidden relative font-inter grain-overlay">
      {/* Background Gradient & Blobs */}
      <div className="absolute inset-0 premium-gradient-bg -z-10" />
      <div className="absolute top-[10%] left-[-10%] w-80 h-80 bg-[#FFD7BE]/30 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-[#FFE5D6]/40 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      {/* TOP SECTION: Illustration (slightly larger) */}
      <div className="h-[52vh] w-full relative flex items-end justify-center overflow-visible px-4">
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <img 
            src="/onboarding.png" 
            alt="Premium Cooking Illustration" 
            className="w-full h-full object-contain scale-125 z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
          />
          
          {/* Floating Elements for Depth */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[10%] w-12 h-12 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-premium"
          >
            <span className="text-xl">🍅</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[40%] left-[5%] w-10 h-10 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-premium"
          >
            <span className="text-xl">🌿</span>
          </motion.div>
          <motion.div
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[15%] right-[5%] w-14 h-14 bg-white/40 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-premium"
          >
            <span className="text-2xl">🍋</span>
          </motion.div>
        </motion.div>
      </div>

      {/* TEXT SECTION */}
      <div className="flex-1 flex flex-col px-8 pt-8 relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-[#D98C8C] text-[15px] font-bold tracking-[0.05em] uppercase mb-4"
        >
          30K+ premium recipes
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-[58px] font-bold leading-[0.9] text-[#1A1A1A] tracking-[-0.04em] mb-10 font-jakarta"
        >
          Cook like <br /> a chef
        </motion.h1>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-auto mb-12 flex justify-center"
        >
          <Link href="/login" className="w-full max-w-[320px]">
            <Button 
              className="w-full h-[60px] cta-gradient hover:opacity-90 rounded-full text-[18px] font-semibold text-white shadow-[0px_10px_25px_rgba(255,107,107,0.3)] transition-all active:scale-[0.97] border-t border-white/20"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
