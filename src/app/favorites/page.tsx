"use client";

import Link from "next/link";
import { ArrowLeft, Clock, ChefHat, Heart, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Recipe } from "@/data/recipes";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function FavoritesPage() {
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>("kitchenmate-saved", []);

  const removeRecipe = (id: string) => {
    setSavedRecipes(savedRecipes.filter(r => r.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-6 pb-32 font-inter">
      <header className="flex items-center justify-between mb-10 pt-4">
        <div className="flex items-center">
          <Link href="/home" className="mr-4 text-[#181818] p-2 -ml-2">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-[32px] font-bold text-[#181818] tracking-tight">Favorites</h1>
        </div>
      </header>

      {savedRecipes.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-10">
          <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center text-[#D0C9C0] mb-8 shadow-premium">
            <Heart size={40} className="fill-current opacity-20" />
          </div>
          <h2 className="text-[24px] font-bold text-[#181818] mb-3">No favorites yet</h2>
          <p className="text-[#777777] text-[15px] font-medium leading-relaxed mb-10">
            Start curating your luxury recipe collection.
          </p>
          <Link href="/home" className="inline-flex items-center justify-center h-16 px-10 bg-[#181818] text-white rounded-full font-bold text-[16px] shadow-xl active:scale-95 transition-all">
            Explore Recipes
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <AnimatePresence mode="popLayout">
            {savedRecipes.map((recipe, index) => (
              <motion.div
                key={recipe.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <Link href={`/recipe/${recipe.id}`} className="block relative h-[380px] rounded-[32px] overflow-hidden shadow-2xl group active:scale-[0.99] transition-transform">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-[12px] font-bold text-white/80 uppercase tracking-widest">
                        <Clock className="w-4 h-4 mr-2 text-[#FFB38A]" />
                        {recipe.cookTime}
                      </div>
                      <div className="flex items-center text-[12px] font-bold text-white/80 uppercase tracking-widest">
                        <ChefHat className="w-4 h-4 mr-2 text-[#FFB38A]" />
                        {recipe.difficulty}
                      </div>
                    </div>
                    <h3 className="text-[32px] font-bold text-white leading-[1.1] mb-2 font-outfit">{recipe.title}</h3>
                  </div>
                </Link>

                <button 
                  onClick={() => removeRecipe(recipe.id)}
                  className="absolute top-6 right-6 w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#181818] shadow-xl hover:text-red-500 transition-all active:scale-90 z-20 border border-white/20"
                >
                  <Trash2 size={24} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
