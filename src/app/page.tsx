"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f9d7d7] items-center justify-center p-6 font-inter">
      {/* Main Card */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-sm bg-white rounded-[48px] overflow-hidden shadow-2xl flex flex-col h-[85vh] relative"
      >
        {/* Top Section: Illustration */}
        <div className="relative flex-1 flex items-center justify-center p-8 bg-[#f9d7d7]/30">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="w-full h-full relative"
          >
            {/* Using the generated image */}
            <img 
              src="/illustration.png" 
              alt="Salad Bowl Illustration" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        {/* Bottom Section: Content */}
        <div className="p-10 pb-12 flex flex-col items-center text-center">
          <motion.span 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#ff6b6b] font-bold text-sm tracking-wide mb-4"
          >
            30K+ PREMIUM RECIPES
          </motion.span>
          
          <motion.h1 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-5xl font-black text-zinc-900 leading-[1.1] mb-12 font-outfit"
          >
            Cook like <br /> a chef
          </motion.h1>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full"
          >
            <Link href="/login" className="w-full">
              <Button 
                size="lg" 
                className="w-full h-18 rounded-3xl bg-[#ff6b6b] hover:bg-[#ff5252] text-white text-xl font-bold shadow-lg shadow-[#ff6b6b]/30 transition-transform active:scale-95"
              >
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative shadow at the bottom of the image section */}
        <div className="absolute top-[50%] left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </motion.div>

      {/* Background blobs for extra flair */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-white/20 blur-3xl rounded-full" />
      </div>
    </div>
  );
}
