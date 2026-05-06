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
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-24 h-24 bg-zinc-900 rounded-[40px] flex items-center justify-center text-white mb-8 shadow-2xl shadow-zinc-900/20"
        >
          <ChefHat size={48} className="text-orange-500" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl font-black tracking-tight text-zinc-900 mb-4 font-outfit">
            Kitchen<span className="text-orange-500">Mate</span>
          </h1>
          <p className="text-xl text-zinc-500 mb-12 max-w-[280px] mx-auto font-medium">
            Decide dinner in under <span className="text-zinc-900 font-bold underline decoration-orange-500 underline-offset-4">30 seconds</span>.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full max-w-[320px] flex flex-col gap-4"
        >
          <Link href="/home" className="w-full">
            <Button size="lg" className="w-full h-16 text-lg rounded-3xl bg-zinc-900 hover:bg-zinc-800 text-white shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
              Sign Up
            </Button>
          </Link>
          
          <Link href="/home" className="w-full">
            <Button variant="outline" size="lg" className="w-full h-16 text-lg rounded-3xl border-zinc-200 bg-white hover:bg-zinc-50 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
              Log In
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-12 flex items-center gap-2 text-zinc-400 text-sm font-medium"
        >
          <Sparkles size={16} className="text-orange-400" />
          AI-Powered Kitchen Assistant
        </motion.div>
      </div>
    </div>
  );
}
