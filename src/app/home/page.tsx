"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { recipes } from "@/data/recipes";
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
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-6 pb-32 font-inter">
      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 pt-4"
      >
        <h1 className="text-[36px] font-bold text-[#181818] leading-[1.1] tracking-tight">
          {greeting}, <br />
          <span className="text-[#181818]">Rohit 👋</span>
        </h1>
        <p className="text-[#777777] text-[17px] mt-3 font-medium">Ready to cook something delicious?</p>
      </motion.header>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="h-[140px] bg-white rounded-[28px] p-6 flex flex-col items-start justify-between shadow-[0px_8px_30px_rgba(0,0,0,0.06)] border border-[#ECE7E1]/30"
        >
          <div className="w-[52px] h-[52px] rounded-2xl bg-[#FFF5F0] flex items-center justify-center text-[#FF6B4A]">
            <ChefHat size={24} />
          </div>
          <div>
            <span className="text-[36px] font-bold text-[#181818] leading-none block">{pantry.length}</span>
            <span className="text-[12px] font-bold text-[#777777] uppercase tracking-widest mt-1">Pantry Items</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="h-[140px] bg-white rounded-[28px] p-6 flex flex-col items-start justify-between shadow-[0px_8px_30px_rgba(0,0,0,0.06)] border border-[#ECE7E1]/30"
        >
          <div className="w-[52px] h-[52px] rounded-2xl bg-[#FFF5F0] flex items-center justify-center text-[#FF6B4A]">
            <Heart size={24} />
          </div>
          <div>
            <span className="text-[36px] font-bold text-[#181818] leading-none block">{savedRecipes.length}</span>
            <span className="text-[12px] font-bold text-[#777777] uppercase tracking-widest mt-1">Saved Meals</span>
          </div>
        </motion.div>
      </div>

      {/* RECOMMENDED SECTION */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#FF6B4A]" />
            <h3 className="text-[22px] font-bold text-[#181818]">Recommended</h3>
          </div>
          <button className="text-[14px] font-bold text-[#FF6B4A]">See All</button>
        </div>

        <div className="flex flex-col gap-[18px]">
          {recipes.slice(0, 3).map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              <Link 
                href={`/recipe/${recipe.id}`}
                className="h-[120px] flex items-center bg-white border border-[#ECE7E1]/50 rounded-[24px] p-4 shadow-[0px_8px_30px_rgba(0,0,0,0.06)] group active:scale-[0.98] transition-transform"
              >
                <div className="w-[92px] h-[92px] rounded-[22px] overflow-hidden shrink-0 shadow-inner">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="ml-5 flex-1 overflow-hidden">
                  <h4 className="text-[20px] font-bold text-[#181818] leading-tight truncate">{recipe.title}</h4>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center text-[12px] font-bold text-[#777777]">
                      <Clock className="w-4 h-4 mr-1.5 text-[#FF6B4A]" />
                      {recipe.cookTime}
                    </div>
                    <div className="flex items-center text-[12px] font-bold text-[#777777]">
                      <ChefHat className="w-4 h-4 mr-1.5 text-[#FF6B4A]" />
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
        className="bg-[#141414] rounded-[32px] p-8 text-white overflow-hidden relative shadow-2xl mt-4"
      >
        <div className="relative z-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFB38A] block mb-4">Daily Inspiration</span>
          <h3 className="text-[24px] font-bold mb-3 leading-tight">Master the art <br /> of minimalist cooking.</h3>
          <p className="text-[#999999] text-[14px] mb-8 max-w-[200px] font-medium leading-relaxed">Elevate your daily meals with AI-guided precision.</p>
          <Link href="/cooking" className="inline-flex items-center justify-center h-[54px] px-8 bg-[#FF6B4A] text-white rounded-full font-bold text-[15px] shadow-lg shadow-[#FF6B4A]/20 transition-transform active:scale-95">
            Start Cooking
          </Link>
        </div>
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#FF6B4A]/10 blur-[60px] rounded-full" />
        <ChefHat className="absolute top-4 right-4 w-24 h-24 text-white/5 -rotate-12" />
      </motion.div>
    </div>
  );
}
