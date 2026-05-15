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

interface Suggestion {
  id: string;
  title: string;
  description: string;
  cookTime: string;
  matchPercentage: number;
  missingIngredients: string[];
  reason: string;
  imageUrl: string;
  fullRecipe: any;
}

export default function SuggestionsPage() {
  const [pantry, setPantry, isPantryHydrated] = useLocalStorage<string[]>("kitchenmate-pantry", []);
  const [savedRecipes, setSavedRecipes, isSavedHydrated] = useLocalStorage<any[]>("kitchenmate-saved", []);
  
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
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
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

  const handleSave = (recipe: any) => {
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
      <div className="flex-1 flex flex-col p-8 h-full items-center justify-center text-center bg-[#F6F3EE]">
        <div className="w-24 h-24 bg-white rounded-[32px] shadow-soft flex items-center justify-center text-[#7B7B7B] mb-8">
          <ChefHat size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-[#141414] mb-4">Pantry is empty</h2>
        <p className="text-[#7B7B7B] mb-10 max-w-[280px] font-medium leading-relaxed">
          Fill your fridge with some ingredients to unlock personalized culinary inspiration.
        </p>
        <Link href="/pantry" className={buttonVariants({ size: "lg", className: "h-16 px-10 rounded-[24px] bg-[#141414] text-white font-bold shadow-xl active:scale-95 transition-all" })}>
          Go to Fridge
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-8 h-full bg-[#F6F3EE] relative overflow-hidden font-inter">
      <header className="flex items-center justify-between mb-12 relative z-10">
        <div className="flex items-center">
          <Link href="/home" className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center mr-4 active:scale-95 transition-transform">
            <ArrowLeft className="w-5 h-5 text-[#141414]" />
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#141414]">Inspiration</h1>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={fetchSuggestions} 
          disabled={isLoading}
          className="w-12 h-12 rounded-2xl border-[#E5E1D8] shadow-soft text-[#7B7B7B] hover:text-[#FF6A1A] transition-all bg-white"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </header>

      {isLoading ? (
        <div className="flex flex-col gap-10 relative z-10 pb-24">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-6">
              <Skeleton className="w-full h-72 rounded-[40px] shadow-soft" />
              <div className="space-y-4 px-2">
                <Skeleton className="w-3/4 h-8 rounded-xl" />
                <Skeleton className="w-full h-5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-12 pb-32 relative z-10">
          <AnimatePresence mode="popLayout">
            {suggestions.map((suggestion, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                key={suggestion.id}
                className="bg-white rounded-[48px] overflow-hidden shadow-soft flex flex-col group active:scale-[0.99] transition-all border border-[#E5E1D8]/20"
              >
                <div className="relative h-80 bg-[#F0EDE8] overflow-hidden">
                  <img
                    src={suggestion.imageUrl}
                    alt={suggestion.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-[#141414] shadow-sm flex items-center gap-2 uppercase tracking-widest">
                    <Sparkles size={12} className="text-[#FF6A1A]" />
                    {suggestion.matchPercentage}% Curated
                  </div>
                  
                  <button
                    onClick={() => handleSave(suggestion.fullRecipe)}
                    className="absolute top-6 right-6 w-12 h-12 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm text-[#7B7B7B] transition-all hover:text-red-500 active:scale-90"
                  >
                    <Heart className={`w-5 h-5 ${isSaved(suggestion.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-3xl font-serif font-bold text-[#141414] mb-4 leading-tight">
                    {suggestion.title}
                  </h3>

                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center text-[11px] font-bold text-[#7B7B7B] uppercase tracking-wider">
                      <Clock className="w-4 h-4 mr-2 text-[#FF6A1A]" />
                      {suggestion.cookTime}
                    </div>
                    <div className="flex items-center text-[11px] font-bold text-[#7B7B7B] uppercase tracking-wider">
                      <ChefHat className="w-4 h-4 mr-2 text-[#FF6A1A]" />
                      {suggestion.fullRecipe?.difficulty || "Medium"}
                    </div>
                  </div>
                  
                  <p className="text-sm text-[#7B7B7B] mb-8 font-medium leading-relaxed line-clamp-2">
                    {suggestion.description}
                  </p>

                  <div className="bg-[#F6F3EE] p-6 rounded-[24px] mb-8 text-[13px] text-[#141414] border border-[#E5E1D8]/50 font-medium leading-relaxed">
                    <span className="font-black text-[10px] uppercase tracking-[0.2em] text-[#FF6A1A] block mb-2">Editorial Note</span> 
                    {suggestion.reason}
                  </div>

                  <div className="mt-auto">
                    <Link 
                      href={`/recipe/${suggestion.id}`}
                      className={buttonVariants({ className: "w-full h-16 rounded-[24px] bg-[#141414] hover:bg-[#FF6A1A] text-white shadow-xl shadow-[#141414]/10 font-bold text-lg transition-all active:scale-[0.98]" })}
                    >
                      View Full Recipe
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 right-0 w-[50%] h-[30%] bg-[#FF6A1A]/5 blur-[120px] rounded-full pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[20%] bg-[#7B8B6F]/5 blur-[120px] rounded-full pointer-events-none -z-0" />
    </div>
  );
}
