"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Clock, ChefHat, Heart, Sparkles } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Recipe } from "@/data/recipes";

interface Suggestion {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  matchPercentage: number;
  missingIngredients: string[];
  reason: string;
  imageUrl: string;
  fullRecipe: Recipe;
}

export default function SuggestionsPage() {
  const [pantry, setPantry, isPantryHydrated] = useLocalStorage<string[]>("kitchenmate-pantry", []);
  const [savedRecipes, setSavedRecipes, isSavedHydrated] = useLocalStorage<Recipe[]>("kitchenmate-saved", []);
  
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async () => {
    if (pantry.length === 0) {
      setError("pantry_empty");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pantry }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch");
      }

      setSuggestions(data.recipes);
    } catch (err) {
      console.error(err);
      setError("fetch_error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isPantryHydrated) {
      fetchSuggestions();
    }
  }, [isPantryHydrated]);

  const handleSave = (recipe: Recipe) => {
    if (savedRecipes.some((r) => r.id === recipe.id)) {
      setSavedRecipes(savedRecipes.filter((r) => r.id !== recipe.id));
      toast("Recipe removed from saved.");
    } else {
      setSavedRecipes([...savedRecipes, recipe]);
      toast.success("Recipe saved successfully!");
    }
  };

  const isSaved = (id: string) => savedRecipes.some((r) => r.id === id);

  if (isPantryHydrated && error === "pantry_empty") {
    return (
      <div className="flex-1 flex flex-col p-6 h-full items-center justify-center text-center bg-[#FAF7F2]">
        <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center text-[#D0C9C0] mb-8 shadow-premium">
          <ChefHat size={40} />
        </div>
        <h2 className="text-[28px] font-bold text-[#181818] mb-3">Pantry is empty</h2>
        <p className="text-[#777777] text-[15px] font-medium leading-relaxed mb-10 max-w-[260px]">
          Add ingredients to your luxury pantry to unlock curated recipes.
        </p>
        <Link href="/pantry" className={buttonVariants({ size: "lg", className: "h-[64px] px-10 rounded-full bg-[#181818] text-white font-bold" })}>
          Update Pantry
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-6 pb-32 font-inter relative">
      <header className="flex items-center justify-between mb-10 pt-4">
        <div className="flex items-center">
          <Link href="/home" className="mr-4 text-[#181818] p-2 -ml-2">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-[32px] font-bold text-[#181818] tracking-tight">Curated</h1>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={fetchSuggestions} 
          disabled={isLoading}
          className="rounded-2xl border-[#ECE7E1] text-[#777777] shadow-sm"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </header>

      {isLoading ? (
        <div className="space-y-12">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-6">
              <Skeleton className="w-full h-[320px] rounded-[32px]" />
              <div className="space-y-4">
                <Skeleton className="w-3/4 h-8 rounded-xl" />
                <Skeleton className="w-full h-5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          <AnimatePresence mode="popLayout">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="group relative"
              >
                <Link href={`/recipe/${suggestion.id}`} className="block relative h-[380px] rounded-[32px] overflow-hidden shadow-2xl group active:scale-[0.99] transition-transform">
                  <img
                    src={suggestion.imageUrl}
                    alt={suggestion.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl">
                    <Sparkles size={14} className="text-[#FF6B4A]" />
                    <span className="text-[12px] font-black text-[#181818] uppercase tracking-wider">{suggestion.matchPercentage}% Match</span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-[12px] font-bold text-white/80 uppercase tracking-widest">
                        <Clock className="w-4 h-4 mr-2 text-[#FFB38A]" />
                        {suggestion.cookTime}
                      </div>
                      <div className="flex items-center text-[12px] font-bold text-white/80 uppercase tracking-widest">
                        <ChefHat className="w-4 h-4 mr-2 text-[#FFB38A]" />
                        {suggestion.fullRecipe.difficulty}
                      </div>
                    </div>
                    <h3 className="text-[36px] font-bold text-white leading-[1.1] font-outfit mb-4">{suggestion.title}</h3>
                  </div>
                </Link>
                
                <button
                  onClick={() => handleSave(suggestion.fullRecipe)}
                  className="absolute bottom-32 right-8 w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#181818] shadow-2xl active:scale-90 transition-all z-20 border border-white/20"
                >
                  <Heart className={`w-6 h-6 ${isSaved(suggestion.id) ? "fill-[#FF6B4A] text-[#FF6B4A]" : ""}`} />
                </button>

                <div className="mt-8 px-2">
                  <p className="text-[12px] font-bold text-[#FF6B4A] uppercase tracking-[0.2em] mb-2">Chef&apos;s Note</p>
                  <p className="text-[15px] text-[#777777] font-medium leading-relaxed italic">&quot;{suggestion.reason}&quot;</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
