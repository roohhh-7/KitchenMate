"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function GetStartedScreen() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FAF7F2] overflow-hidden relative font-inter">
      {/* TOP SECTION: Illustration (48% height) */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="h-[48vh] w-full relative flex items-end justify-center overflow-visible"
      >
        <img 
          src="/onboarding.png" 
          alt="Premium Cooking Illustration" 
          className="w-full h-full object-contain scale-110 translate-y-4"
        />
      </motion.div>

      {/* TEXT SECTION */}
      <div className="flex-1 flex flex-col px-6 pt-[28px] relative z-10">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-[#D98C8C] text-[14px] font-medium tracking-[0px] mb-[28px]"
        >
          30K+ premium recipes
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[52px] font-bold leading-[0.95] text-[#222222] tracking-[-2px] w-[75%] mb-[36px]"
        >
          Cook like <br /> a chef
        </motion.h1>

        {/* BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-auto mb-[40px] flex justify-center"
        >
          <Link href="/login">
            <Button 
              className="w-[320px] h-[58px] bg-[#FF6B6B] hover:bg-[#FF5252] rounded-full text-[18px] font-semibold text-white shadow-[0px_10px_25px_rgba(255,107,107,0.25)] transition-all active:scale-[0.97]"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Background soft textures */}
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10">
        <div className="absolute top-[20%] left-[-10%] w-64 h-64 bg-orange-100/50 blur-[100px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-64 h-64 bg-zinc-200/50 blur-[100px] rounded-full" />
      </div>
    </div>
  );
}
