"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Clock, ChefHat, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function HomePage() {
  const [pantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);
  const [savedRecipes] = useLocalStorage<any[]>("kitchenmate-saved", []);
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 || hour < 4) setGreeting("Good Evening");
    else setGreeting("Good Morning");
  }, []);

  return (
    <div className="flex-1 flex flex-col p-8 pb-32 bg-[#F6F3EE] font-inter">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7B7B7B] mb-2 block">
          Welcome Back
        </span>
        <h1 className="text-4xl font-serif font-bold text-[#141414] leading-tight">
          {greeting}, <br/>
          <span className="text-[#FF6A1A]">Rohit</span>
        </h1>
      </motion.header>

      {/* Premium Stats Section */}
      <div className="grid grid-cols-2 gap-5 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[32px] p-6 shadow-soft border border-[#E5E1D8]/30 flex flex-col items-center text-center group transition-all hover:border-[#FF6A1A]/20"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#F6F3EE] flex items-center justify-center text-[#141414] mb-3 group-hover:bg-[#FF6A1A]/10 group-hover:text-[#FF6A1A] transition-colors">
            <ChefHat size={24} />
          </div>
          <span className="text-3xl font-serif font-bold text-[#141414]">{pantry.length}</span>
          <span className="text-[10px] text-[#7B7B7B] font-bold uppercase tracking-widest mt-1">Pantry Items</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[32px] p-6 shadow-soft border border-[#E5E1D8]/30 flex flex-col items-center text-center group transition-all hover:border-[#FF6A1A]/20"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#F6F3EE] flex items-center justify-center text-[#141414] mb-3 group-hover:bg-[#FF6A1A]/10 group-hover:text-[#FF6A1A] transition-colors">
            <Heart size={24} />
          </div>
          <span className="text-3xl font-serif font-bold text-[#141414]">{savedRecipes.length}</span>
          <span className="text-[10px] text-[#7B7B7B] font-bold uppercase tracking-widest mt-1">Saved Meals</span>
        </motion.div>
      </div>

      {/* Curated Recommendations */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#FF6A1A] rounded-full" />
            <h3 className="text-2xl font-serif font-bold text-[#141414]">Curated For You</h3>
          </div>
          <button className="text-xs font-bold uppercase tracking-widest text-[#FF6A1A] hover:underline underline-offset-4 transition-all">
            See All
          </button>
        </div>

        <div className="flex flex-col gap-8">
          {[
            { id: 1, title: "Artisan Pepperoni Pizza", time: "25 min", difficulty: "Medium", img: "/recipe1.png" },
            { id: 2, title: "Creamy Herb Fettuccine", time: "15 min", difficulty: "Easy", img: "/recipe2.png" }
          ].map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              <Link 
                href={`/recipe/${recipe.id}`}
                className="block bg-white rounded-[40px] p-4 shadow-soft border border-[#E5E1D8]/20 group active:scale-[0.98] transition-all"
              >
                <div className="relative h-64 rounded-[32px] overflow-hidden mb-6">
                  <img 
                    src={recipe.img} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md w-10 h-10 rounded-2xl flex items-center justify-center text-[#141414] shadow-sm hover:text-red-500 transition-colors">
                    <Heart size={18} />
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <h4 className="text-2xl font-serif font-bold text-[#141414] mb-3 leading-tight">
                    {recipe.title}
                  </h4>
                  <div className="flex items-center gap-5">
                    <div className="flex items-center text-[11px] font-bold text-[#7B7B7B] uppercase tracking-wider">
                      <Clock className="w-4 h-4 mr-2 text-[#FF6A1A]" />
                      {recipe.time}
                    </div>
                    <div className="flex items-center text-[11px] font-bold text-[#7B7B7B] uppercase tracking-wider">
                      <ChefHat className="w-4 h-4 mr-2 text-[#FF6A1A]" />
                      {recipe.difficulty}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Floating Action CTA */}
      <section className="mt-4">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-[#151515] rounded-[40px] p-10 text-white overflow-hidden relative shadow-2xl shadow-[#151515]/20"
        >
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#FF6A1A] mb-4 block">
              Smart Assistant
            </span>
            <h3 className="text-3xl font-serif font-bold mb-4 leading-tight">
              Turn your pantry <br/> into a masterpiece.
            </h3>
            <p className="text-[#7B7B7B] text-sm mb-10 max-w-[200px] leading-relaxed">
              Let AI curate the perfect meal from what you have on hand.
            </p>
            <Link href="/cooking" className="inline-flex items-center justify-center h-16 px-10 bg-[#FF6A1A] text-white rounded-[24px] font-bold text-lg shadow-xl shadow-[#FF6A1A]/20 transition-all active:scale-[0.95]">
              Let&apos;s Cook
            </Link>
          </div>
          <Sparkles className="absolute -right-10 -bottom-10 w-48 h-48 text-[#FF6A1A]/5 -rotate-12" />
        </motion.div>
      </section>
    </div>
  );
}
