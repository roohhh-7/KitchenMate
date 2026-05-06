"use client";

import Link from "next/link";
import { ChefHat, Refrigerator, ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function CookingHub() {
  const [pantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);

  return (
    <div className="flex-1 flex flex-col p-6 pb-32">
      <header className="mb-10">
        <h1 className="text-3xl font-bold font-outfit text-zinc-900">Cooking Hub</h1>
        <p className="text-zinc-500">Your kitchen command center.</p>
      </header>

      <div className="flex flex-col gap-6">
        {/* Main Action: AI Suggestions */}
        <motion.div
          whileHover={{ y: -4 }}
          className="relative group"
        >
          <Link 
            href="/suggestions"
            className="block bg-zinc-900 rounded-[32px] p-8 text-white shadow-2xl shadow-zinc-900/20 overflow-hidden"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                <Sparkles className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold font-outfit mb-2">Find My Next Meal</h2>
              <p className="text-zinc-400 text-sm mb-8 max-w-[200px]">
                AI-powered suggestions based on your current pantry items.
              </p>
              <div className="mt-auto flex items-center font-semibold group-hover:gap-2 transition-all">
                Let's Cook <ArrowRight className="ml-2 w-5 h-5 text-orange-500" />
              </div>
            </div>
            <ChefHat className="absolute -right-8 -top-8 w-48 h-48 text-white/5 rotate-12" />
          </Link>
        </motion.div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link 
            href="/pantry"
            className="bg-white border border-zinc-100 rounded-[32px] p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-4 text-zinc-900">
              <Refrigerator className="w-6 h-6" />
            </div>
            <h3 className="font-bold font-outfit">My Pantry</h3>
            <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">{pantry.length} Items</p>
          </Link>

          <Link 
            href="/home"
            className="bg-white border border-zinc-100 rounded-[32px] p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 bg-zinc-50 rounded-2xl flex items-center justify-center mb-4 text-zinc-900">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-bold font-outfit">Recipe Book</h3>
            <p className="text-[10px] text-zinc-400 mt-1 uppercase tracking-widest">Browse All</p>
          </Link>
        </div>

        {/* Featured Card */}
        <div className="bg-orange-50 border border-orange-100/50 rounded-[32px] p-6 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-orange-500 text-white border-none rounded-full px-2">Tip</Badge>
            <span className="text-xs font-semibold text-orange-900">Cooking Hack</span>
          </div>
          <p className="text-sm text-orange-800 leading-relaxed font-medium">
            "Adding a pinch of salt to your onions while sautéing helps them release moisture and cook faster!"
          </p>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </span>
  );
}
