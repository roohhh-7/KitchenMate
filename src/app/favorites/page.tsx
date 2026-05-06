"use client";

import Link from "next/link";
import { Heart, Clock, ChefHat, ArrowLeft, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Recipe } from "@/data/recipes";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";

export default function FavoritesPage() {
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>("kitchenmate-saved", []);

  const removeFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedRecipes(savedRecipes.filter(r => r.id !== id));
    toast("Recipe removed from favorites.");
  };

  return (
    <div className="flex-1 flex flex-col p-6 pb-32">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Link href="/home" className="p-2 -ml-2 text-zinc-400 hover:text-zinc-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-bold font-outfit text-zinc-900">Favorites</h1>
        </div>
        <p className="text-zinc-500">Your curated collection of delicious meals.</p>
      </header>

      {savedRecipes.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center text-center py-20"
        >
          <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6 text-zinc-200">
            <Heart className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 font-outfit">No favorites yet</h2>
          <p className="text-zinc-500 mt-2 max-w-[200px]">
            Explore recipes and heart the ones you love to see them here!
          </p>
          <Link href="/cooking" className={buttonVariants({ variant: "outline", className: "mt-8 rounded-2xl" })}>
            Explore Recipes
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {savedRecipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Link 
                  href={`/recipe/${recipe.id}`}
                  className="block bg-white border border-zinc-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="h-40 bg-zinc-100 relative">
                    <img 
                      src={recipe.imageUrl} 
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <button 
                      onClick={(e) => removeFavorite(recipe.id, e)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 shadow-lg transition-transform active:scale-90"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-outfit text-zinc-900 mb-2">{recipe.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1.5" />
                        {recipe.cookTime}
                      </div>
                      <div className="flex items-center">
                        <ChefHat className="w-4 h-4 mr-1.5" />
                        {recipe.difficulty}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
