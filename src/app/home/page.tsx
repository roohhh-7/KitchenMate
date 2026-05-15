"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { recipes, Recipe } from "@/data/recipes";
import { motion } from "framer-motion";
import { Clock, ChefHat, Sparkles, Heart } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function HomePage() {
  const [pantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);
  const [savedRecipes] = useLocalStorage<Recipe[]>("kitchenmate-saved", []);
  const [greeting, setGreeting] = useState("Good Evening");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-8 pb-32 font-inter relative grain-overlay">
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 pt-4"
      >
        <h1 className="text-[38px] font-bold text-[#1A1A1A] leading-[1.05] tracking-[-0.03em] font-jakarta">
          {greeting}, <br />
          <span className="text-[#1A1A1A]">Rohit 👋</span>
        </h1>
        <p className="text-[#777777] text-[17px] mt-4 font-medium leading-relaxed">Ready to cook something delicious?</p>
      </motion.header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 gap-5 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="h-[145px] bg-white rounded-[28px] p-6 flex flex-col items-start justify-between shadow-premium border border-[#ECE7E1]/20 group hover:border-[#FF6B4A]/20 transition-all"
        >
          <div className="w-[52px] h-[52px] rounded-2xl bg-[#FFF5F0] flex items-center justify-center text-[#FF6B4A] shadow-inner">
            <ChefHat size={24} />
          </div>
          <div>
            <span className="text-[38px] font-bold text-[#1A1A1A] leading-none block font-jakarta">{pantry.length}</span>
            <span className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-[0.1em] mt-2 block">Pantry Items</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="h-[145px] bg-white rounded-[28px] p-6 flex flex-col items-start justify-between shadow-premium border border-[#ECE7E1]/20 group hover:border-[#FF6B4A]/20 transition-all"
        >
          <div className="w-[52px] h-[52px] rounded-2xl bg-[#FFF5F0] flex items-center justify-center text-[#FF6B4A] shadow-inner">
            <Heart size={24} />
          </div>
          <div>
            <span className="text-[38px] font-bold text-[#1A1A1A] leading-none block font-jakarta">{savedRecipes.length}</span>
            <span className="text-[11px] font-bold text-[#A0A0A0] uppercase tracking-[0.1em] mt-2 block">Saved Meals</span>
          </div>
        </motion.div>
      </div>

      {/* RECOMMENDED SECTION */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FF6B4A]/10 flex items-center justify-center">
              <Sparkles size={16} className="text-[#FF6B4A]" />
            </div>
            <h3 className="text-[24px] font-bold text-[#1A1A1A] tracking-tight font-jakarta">Daily Picks</h3>
          </div>
          <button className="text-[14px] font-bold text-[#FF6B4A] hover:opacity-80 transition-opacity">See All</button>
        </div>

        <div className="flex flex-col gap-5">
          {recipes.slice(0, 3).map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.8 }}
            >
              <Link 
                href={`/recipe/${recipe.id}`}
                className="h-[125px] flex items-center bg-white border border-[#ECE7E1]/30 rounded-[26px] p-4 shadow-premium group active:scale-[0.98] transition-all hover:shadow-elevated"
              >
                <div className="w-[92px] h-[92px] rounded-[22px] overflow-hidden shrink-0 shadow-inner">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="ml-6 flex-1 overflow-hidden pr-2">
                  <h4 className="text-[20px] font-bold text-[#1A1A1A] leading-tight font-jakarta truncate">{recipe.title}</h4>
                  <div className="flex items-center gap-5 mt-4">
                    <div className="flex items-center text-[11px] font-bold text-[#777777] uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5 mr-2 text-[#FF6B4A]" />
                      {recipe.cookTime}
                    </div>
                    <div className="flex items-center text-[11px] font-bold text-[#777777] uppercase tracking-wider">
                      <ChefHat className="w-3.5 h-3.5 mr-2 text-[#FF6B4A]" />
                      {recipe.difficulty}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* LUXURY BANNER */}
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-[#1A1A1A] rounded-[36px] p-10 text-white overflow-hidden relative shadow-elevated mt-4 group"
      >
        <div className="relative z-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFB38A] block mb-5">Chef's Selection</span>
          <h3 className="text-[28px] font-bold mb-4 leading-[1.1] tracking-tight font-jakarta">Elevate your home <br /> dining experience.</h3>
          <p className="text-[#999999] text-[15px] mb-10 max-w-[220px] font-medium leading-relaxed">Unlock advanced techniques and curated seasonal ingredients.</p>
          <Link href="/cooking" className="inline-flex items-center justify-center h-[58px] px-10 bg-[#FF6B4A] text-white rounded-full font-bold text-[16px] shadow-glow transition-all hover:scale-105 active:scale-95 border-t border-white/20">
            Start Mode
          </Link>
        </div>
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#FF6B4A]/10 blur-[80px] rounded-full group-hover:bg-[#FF6B4A]/20 transition-colors" />
        <ChefHat className="absolute top-8 right-8 w-24 h-24 text-white/5 -rotate-12 transition-transform group-hover:rotate-0" />
      </motion.div>
    </div>
  );
}
