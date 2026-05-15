"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { recipes, Recipe } from "@/data/recipes";
import { motion } from "framer-motion";
import { Heart, Clock, ChefHat, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const [pantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);
  const [savedRecipes] = useLocalStorage<Recipe[]>("kitchenmate-saved", []);
  const [greeting, setGreeting] = useState("Good Morning");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 || hour < 4) setGreeting("Good Evening");
    else setGreeting("Good Morning");
  }, []);

  // Simple logic for recommendations: pick 3 recipes
  // In a real app, this would be more complex
  const recommendedRecipes = recipes.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col p-6 pb-32 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-10%] w-[50%] h-[30%] bg-orange-100/30 blur-[80px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[20%] bg-zinc-100/50 blur-[80px] rounded-full" />
      </div>

      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 relative"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black font-outfit text-zinc-900 leading-tight">
              {greeting}, <br/>
              <span className="text-orange-500">Rohit 👋</span>
            </h1>
            <p className="text-zinc-500 mt-1 font-medium">Ready to cook something delicious?</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl bg-white border border-zinc-100 shadow-sm flex items-center justify-center text-zinc-400"
          >
            <Heart size={20} />
          </motion.div>
        </div>
      </motion.header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/60 backdrop-blur-md border border-zinc-100 rounded-[32px] p-6 flex flex-col items-center text-center shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 mb-3">
            <ChefHat size={20} />
          </div>
          <span className="text-2xl font-black text-zinc-900 font-outfit">{pantry.length}</span>
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Pantry Items</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/60 backdrop-blur-md border border-zinc-100 rounded-[32px] p-6 flex flex-col items-center text-center shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 mb-3">
            <Heart size={20} />
          </div>
          <span className="text-2xl font-black text-zinc-900 font-outfit">{savedRecipes.length}</span>
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Saved Meals</span>
        </motion.div>
      </div>

      {/* Featured/Recommended Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-orange-500 rounded-full" />
            <h3 className="text-xl font-black font-outfit text-zinc-900">For You</h3>
          </div>
          <button className="text-sm font-bold text-orange-600">See All</button>
        </div>

        <div className="flex flex-col gap-4">
          {recommendedRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              <Link 
                href={`/recipe/${recipe.id}`}
                className="flex items-center bg-white border border-zinc-100 rounded-[28px] p-3.5 shadow-sm hover:shadow-md transition-all group active:scale-[0.98]"
              >
                <div className="w-20 h-20 rounded-[20px] overflow-hidden shrink-0 shadow-inner">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-bold text-zinc-900 line-clamp-1 font-outfit">{recipe.title}</h4>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center text-[11px] font-medium text-zinc-500">
                      <Clock className="w-3.5 h-3.5 mr-1 text-orange-400" />
                      {recipe.cookTime}
                    </div>
                    <div className="flex items-center text-[11px] font-medium text-zinc-500">
                      <ChefHat className="w-3.5 h-3.5 mr-1 text-orange-400" />
                      {recipe.difficulty}
                    </div>
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    {recipe.ingredients.slice(0, 2).map(ing => (
                      <Badge key={ing} variant="secondary" className="text-[9px] py-0.5 px-2 bg-zinc-50 text-zinc-500 border-none font-bold uppercase tracking-tight">
                        {ing}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="mt-4">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-zinc-900 rounded-[32px] p-8 text-white overflow-hidden relative shadow-xl shadow-zinc-900/20"
        >
          <div className="relative z-10">
            <Badge className="mb-4 bg-orange-500 hover:bg-orange-600 border-none text-[10px] font-black uppercase tracking-widest px-3 py-1">AI Powered</Badge>
            <h3 className="text-2xl font-black font-outfit mb-2 leading-tight">Feeling <br/>Adventurous?</h3>
            <p className="text-zinc-400 text-sm mb-6 max-w-[180px] font-medium">Let AI decide your perfect meal based on your pantry.</p>
            <Link href="/cooking" className="inline-flex items-center justify-center h-14 px-8 bg-orange-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-orange-900/20 transition-transform active:scale-95">
              Start Magic
            </Link>
          </div>
          <Sparkles className="absolute -right-6 -bottom-6 w-40 h-40 text-orange-500/10 -rotate-12" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-[50px] rounded-full" />
        </motion.div>
      </section>
    </div>
  );
}
