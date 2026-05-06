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
    <div className="flex-1 flex flex-col p-6 pb-32">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold font-outfit text-zinc-900 leading-tight">
          {greeting}, <span className="text-orange-500">Rohit 👋</span>
        </h1>
        <p className="text-zinc-500 mt-1">Ready to cook something delicious?</p>
      </motion.header>

      {/* Stats Quick View */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-5 flex flex-col items-center text-center">
          <span className="text-2xl font-bold text-zinc-900 font-outfit">{pantry.length}</span>
          <span className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Pantry Items</span>
        </div>
        <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-5 flex flex-col items-center text-center">
          <span className="text-2xl font-bold text-zinc-900 font-outfit">{savedRecipes.length}</span>
          <span className="text-xs text-zinc-500 uppercase tracking-wider mt-1">Saved Meals</span>
        </div>
      </div>

      {/* Featured/Recommended Section */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <h3 className="text-lg font-semibold font-outfit text-zinc-900">Recommended for you</h3>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {recommendedRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={`/recipe/${recipe.id}`}
                className="flex items-center bg-white border border-zinc-100 rounded-[24px] p-3 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold text-zinc-900 line-clamp-1">{recipe.title}</h4>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center text-[10px] text-zinc-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {recipe.cookTime}
                    </div>
                    <div className="flex items-center text-[10px] text-zinc-500">
                      <ChefHat className="w-3 h-3 mr-1" />
                      {recipe.difficulty}
                    </div>
                  </div>
                  <div className="mt-2 flex gap-1">
                    {recipe.ingredients.slice(0, 2).map(ing => (
                      <Badge key={ing} variant="outline" className="text-[9px] py-0 px-1.5 text-zinc-400 border-zinc-200">
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

      {/* Quick Access or Popular section could go here */}
      <section className="mt-4">
        <div className="bg-orange-500 rounded-[32px] p-6 text-white overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-xl font-bold font-outfit mb-2">Feeling adventurous?</h3>
            <p className="text-orange-100 text-sm mb-6 max-w-[200px]">Let AI decide your perfect meal based on what you have.</p>
            <Link href="/cooking" className="inline-flex items-center justify-center h-12 px-6 bg-white text-orange-600 rounded-2xl font-bold text-sm shadow-lg shadow-orange-900/10">
              Start Cooking Now
            </Link>
          </div>
          <Sparkles className="absolute -right-4 -bottom-4 w-32 h-32 text-orange-400/30 -rotate-12" />
        </div>
      </section>
    </div>
  );
}
