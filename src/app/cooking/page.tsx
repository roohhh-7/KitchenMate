"use client";

import Link from "next/link";
import { ChefHat, Refrigerator, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Badge } from "@/components/ui/badge";

export default function CookingHub() {
  const [pantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);

  return (
    <div className="flex-1 flex flex-col p-6 pb-32 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-10%] w-[50%] h-[30%] bg-orange-100/20 blur-[80px] rounded-full" />
      </div>

      <header className="mb-10">
        <h1 className="text-3xl font-black font-outfit text-zinc-900 tracking-tight leading-tight">Cooking <br/><span className="text-orange-500">Hub</span></h1>
        <p className="text-zinc-500 font-medium">Your kitchen command center.</p>
      </header>

      <div className="flex flex-col gap-8">
        {/* Main Action: AI Suggestions */}
        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <Link 
            href="/suggestions"
            className="block bg-zinc-900 rounded-[40px] p-8 text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md border border-white/10">
                <Sparkles className="w-7 h-7 text-orange-400" />
              </div>
              <h2 className="text-3xl font-black font-outfit mb-2 leading-tight">Find My <br/>Next Meal</h2>
              <p className="text-zinc-400 text-[13px] mb-10 max-w-[220px] font-medium leading-relaxed">
                AI-powered suggestions tailored to your pantry.
              </p>
              <div className="mt-auto flex items-center font-black text-sm uppercase tracking-widest group-hover:gap-3 transition-all text-orange-500">
                Let&apos;s Cook <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
            <ChefHat className="absolute -right-12 -top-12 w-64 h-64 text-white/5 rotate-12 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-500/10 blur-[60px] rounded-full" />
          </Link>
        </motion.div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-5">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              href="/pantry"
              className="bg-white/60 backdrop-blur-md border border-zinc-100 rounded-[32px] p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all active:scale-95 h-full"
            >
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
                <Refrigerator className="w-6 h-6" />
              </div>
              <h3 className="font-black font-outfit text-zinc-900">My Pantry</h3>
              <p className="text-[10px] font-black text-zinc-400 mt-2 uppercase tracking-widest bg-zinc-50 px-2 py-0.5 rounded-full">{pantry.length} Items</p>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              href="/home"
              className="bg-white/60 backdrop-blur-md border border-zinc-100 rounded-[32px] p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all active:scale-95 h-full"
            >
              <div className="w-12 h-12 bg-zinc-50 text-zinc-900 rounded-2xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-black font-outfit text-zinc-900">Recipe Book</h3>
              <p className="text-[10px] font-black text-zinc-400 mt-2 uppercase tracking-widest bg-zinc-50 px-2 py-0.5 rounded-full">Browse All</p>
            </Link>
          </motion.div>
        </div>

        {/* Featured Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-orange-50/50 border border-orange-100/50 rounded-[32px] p-6 mt-4 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-orange-500 hover:bg-orange-500 text-white border-none rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">Tip</Badge>
              <span className="text-[11px] font-black text-orange-900 uppercase tracking-widest">Cooking Hack</span>
            </div>
            <p className="text-sm text-orange-800 leading-relaxed font-bold">
              &quot;Adding a pinch of salt to your onions while sautéing helps them release moisture and cook faster!&quot;
            </p>
          </div>
          <Sparkles className="absolute -right-4 -top-4 w-20 h-20 text-orange-200/20" />
        </motion.div>
      </div>
    </div>
  );
}
