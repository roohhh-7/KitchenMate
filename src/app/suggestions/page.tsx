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
      toast("Removed from luxury collection.");
    } else {
      setSavedRecipes([...savedRecipes, recipe]);
      toast.success("Added to luxury collection!");
    }
  };

  const isSaved = (id: string) => savedRecipes.some((r) => r.id === id);

  if (isPantryHydrated && error === "pantry_empty") {
    return (
      <div className="flex-1 flex flex-col p-8 h-full items-center justify-center text-center bg-[#FAF7F2] grain-overlay">
        <div className="w-24 h-24 bg-white rounded-[36px] flex items-center justify-center text-[#D0C9C0] mb-10 shadow-premium border border-[#ECE7E1]/30">
          <ChefHat size={40} />
        </div>
        <h2 className="text-[32px] font-bold text-[#1A1A1A] mb-4 font-jakarta tracking-tight leading-tight">Your pantry <br /> is empty</h2>
        <p className="text-[#777777] text-[16px] font-medium leading-relaxed mb-12 max-w-[280px]">
          Add ingredients to your luxury kitchen to unlock curated recommendations.
        </p>
        <Link href="/pantry" className={buttonVariants({ size: "lg", className: "h-[64px] px-12 rounded-full bg-[#1A1A1A] text-white font-bold text-[17px] shadow-elevated" })}>
          Update Pantry
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-8 pb-36 font-inter relative grain-overlay">
      <header className="flex items-center justify-between mb-12 pt-4">
        <div className="flex items-center">
          <Link href="/home" className="mr-5 text-[#181818] p-2 -ml-2 hover:opacity-70 transition-opacity">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-[36px] font-bold text-[#181818] tracking-[-0.02em] font-jakarta">Curated</h1>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={fetchSuggestions} 
          disabled={isLoading}
          className="w-12 h-12 rounded-2xl border-[#ECE7E1] text-[#A0A0A0] shadow-sm bg-white"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </header>

      {isLoading ? (
        <div className="space-y-14">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-8">
              <Skeleton className="w-full h-[360px] rounded-[40px]" />
              <div className="space-y-5 px-2">
                <Skeleton className="w-3/4 h-10 rounded-2xl" />
                <Skeleton className="w-full h-6 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-16">
          <AnimatePresence mode="popLayout">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <Link href={`/recipe/${suggestion.id}`} className="block relative h-[420px] rounded-[40px] overflow-hidden shadow-elevated group active:scale-[0.99] transition-all">
                  <img
                    src={suggestion.imageUrl}
                    alt={suggestion.title}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  
                  <div className="absolute top-8 left-8 flex items-center gap-2.5 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl border border-white/20">
                    <Sparkles size={16} className="text-[#FF6B4A]" />
                    <span className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-widest">{suggestion.matchPercentage}% MATCH</span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-10">
                    <div className="flex items-center gap-6 mb-5">
                      <div className="flex items-center text-[12px] font-bold text-white/90 uppercase tracking-[0.2em]">
                        <Clock className="w-4 h-4 mr-2.5 text-[#FFB38A]" />
                        {suggestion.cookTime}
                      </div>
                      <div className="flex items-center text-[12px] font-bold text-white/90 uppercase tracking-[0.2em]">
                        <ChefHat className="w-4 h-4 mr-2.5 text-[#FFB38A]" />
                        {suggestion.fullRecipe.difficulty}
                      </div>
                    </div>
                    <h3 className="text-[42px] font-bold text-white leading-[1.05] font-jakarta tracking-tight mb-6">{suggestion.title}</h3>
                  </div>
                </Link>
                
                <button
                  onClick={() => handleSave(suggestion.fullRecipe)}
                  className="absolute bottom-36 right-10 w-16 h-16 bg-white rounded-full flex items-center justify-center text-[#1A1A1A] shadow-elevated active:scale-90 transition-all z-20 border-4 border-transparent hover:border-[#FF6B4A]/10"
                >
                  <Heart className={`w-7 h-7 transition-all ${isSaved(suggestion.id) ? "fill-[#FF6B4A] text-[#FF6B4A] scale-110" : "text-[#D0C9C0]"}`} />
                </button>

                <div className="mt-10 px-4 border-l-[3px] border-[#FFB38A]/30">
                  <p className="text-[11px] font-bold text-[#FF6B4A] uppercase tracking-[0.3em] mb-3">Culinary Insight</p>
                  <p className="text-[17px] text-[#777777] font-medium leading-relaxed italic pr-4 tracking-tight">&quot;{suggestion.reason}&quot;</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
