"use client";

import Link from "next/link";
import { ChefHat, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#fcfbf9] overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[40%] bg-orange-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[40%] bg-zinc-100/50 blur-[120px] rounded-full" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.6 
          }}
          className="w-24 h-24 bg-zinc-900 rounded-[32px] flex items-center justify-center text-white mb-10 shadow-2xl shadow-zinc-900/40 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <ChefHat size={48} className="text-orange-500 relative z-10" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-6xl font-black tracking-tighter text-zinc-900 mb-4 font-outfit">
            Kitchen<span className="text-orange-500">Mate</span>
          </h1>
          <p className="text-xl text-zinc-500 mb-14 max-w-[300px] mx-auto font-medium leading-relaxed">
            Decide dinner in under <span className="text-zinc-900 font-bold px-2 py-0.5 bg-orange-100 rounded-lg text-orange-700">30 seconds</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-[340px] flex flex-col gap-4"
        >
          <Link href="/login" className="w-full">
            <Button size="lg" className="w-full h-18 text-xl rounded-3xl bg-zinc-900 hover:bg-zinc-800 text-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-all hover:scale-[1.03] active:scale-[0.97] font-bold">
              Get Started
            </Button>
          </Link>
          
          <Link href="/login" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-18 text-xl rounded-3xl border-2 border-zinc-100 bg-white hover:bg-zinc-50 shadow-sm transition-all hover:scale-[1.03] active:scale-[0.97] text-zinc-900 font-bold">
              Sign In
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 flex items-center gap-2.5 text-zinc-400 text-sm font-bold tracking-tight bg-white/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-zinc-100 shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <Sparkles size={16} className="text-orange-400" />
          AI-POWERED ASSISTANT
        </motion.div>
      </div>
    </div>
  );
}
