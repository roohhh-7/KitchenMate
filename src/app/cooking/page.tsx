"use client";

import Link from "next/link";
import { ChefHat, Refrigerator, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function CookingHub() {
  const [pantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);

  return (
    <div className="flex-1 flex flex-col p-8 pb-32 bg-[#F6F3EE] relative overflow-hidden font-inter">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[60%] h-[40%] bg-[#FF6A1A]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <header className="mb-12 relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7B7B7B] mb-2 block">
          Kitchen Command
        </span>
        <h1 className="text-4xl font-serif font-bold text-[#141414] tracking-tight leading-tight">
          Cooking <span className="text-[#FF6A1A]">Hub</span>
        </h1>
        <p className="text-[#7B7B7B] font-medium mt-2">Where your culinary vision comes to life.</p>
      </header>

      <div className="flex flex-col gap-8 relative z-10">
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
            className="block bg-[#141414] rounded-[48px] p-10 text-white shadow-2xl shadow-[#141414]/20 overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 bg-white/10 rounded-[24px] flex items-center justify-center mb-8 backdrop-blur-md border border-white/10">
                <Sparkles className="w-8 h-8 text-[#FF6A1A]" />
              </div>
              <h2 className="text-3xl font-serif font-bold mb-3 leading-tight">
                Discover <br/>Your Next Meal
              </h2>
              <p className="text-[#7B7B7B] text-sm mb-12 max-w-[220px] font-medium leading-relaxed">
                AI-powered suggestions tailored to your signature pantry.
              </p>
              <div className="mt-auto flex items-center font-bold text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all text-[#FF6A1A]">
                Start Exploring <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
            <ChefHat className="absolute -right-16 -top-16 w-80 h-80 text-white/5 rotate-12 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#FF6A1A]/10 blur-[80px] rounded-full" />
          </Link>
        </motion.div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              href="/pantry"
              className="bg-white rounded-[32px] p-8 flex flex-col items-center text-center shadow-soft border border-[#E5E1D8]/20 hover:border-[#FF6A1A]/20 transition-all active:scale-95 h-full"
            >
              <div className="w-14 h-14 bg-[#F6F3EE] text-[#141414] rounded-[20px] flex items-center justify-center mb-5 group-hover:text-[#FF6A1A]">
                <Refrigerator className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#141414]">The Fridge</h3>
              <p className="text-[10px] font-bold text-[#7B7B7B] mt-2 uppercase tracking-widest bg-[#F6F3EE] px-3 py-1 rounded-full">{pantry.length} Items</p>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              href="/home"
              className="bg-white rounded-[32px] p-8 flex flex-col items-center text-center shadow-soft border border-[#E5E1D8]/20 hover:border-[#FF6A1A]/20 transition-all active:scale-95 h-full"
            >
              <div className="w-14 h-14 bg-[#F6F3EE] text-[#141414] rounded-[20px] flex items-center justify-center mb-5">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#141414]">Cookbook</h3>
              <p className="text-[10px] font-bold text-[#7B7B7B] mt-2 uppercase tracking-widest bg-[#F6F3EE] px-3 py-1 rounded-full">Archive</p>
            </Link>
          </motion.div>
        </div>

        {/* Premium Tip Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[40px] p-8 mt-4 relative overflow-hidden shadow-soft border border-[#E5E1D8]/10"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <Badge className="bg-[#FF6A1A] hover:bg-[#FF6A1A] text-white border-none rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest">Culinary Tip</Badge>
            </div>
            <p className="text-lg text-[#141414] font-serif font-bold leading-relaxed">
              &quot;Adding a pinch of salt to your onions while sautéing helps them release moisture and cook faster!&quot;
            </p>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6A1A]/5 blur-[40px] rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
