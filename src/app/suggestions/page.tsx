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

      if (data.error) throw new Error(data.error);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="flex-1 flex flex-col p-6 h-full items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-orange-100/30 blur-[100px] rounded-full" />
        </div>
        <div className="w-20 h-20 bg-zinc-50 rounded-3xl flex items-center justify-center text-zinc-300 mb-8 shadow-inner">
          <ChefHat size={40} />
        </div>
        <h2 className="text-2xl font-black font-outfit text-zinc-900 mb-3">Pantry is empty</h2>
        <p className="text-zinc-500 mb-10 max-w-[280px] font-medium leading-relaxed">
          Add a few ingredients to your pantry to unlock AI-powered meal suggestions.
        </p>
        <Link href="/pantry" className={buttonVariants({ size: "lg", className: "h-16 rounded-3xl bg-zinc-900 text-white px-10 font-bold shadow-xl shadow-zinc-900/20 transition-transform active:scale-95" })}>
          Go to Pantry
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 h-full relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-10%] w-[50%] h-[30%] bg-orange-100/20 blur-[80px] rounded-full" />
      </div>

      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Link href="/cooking" className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-2xl -ml-2 mr-3 text-zinc-400 hover:bg-zinc-100 transition-colors" })}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-black font-outfit text-zinc-900 tracking-tight">Suggestions</h1>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={fetchSuggestions} 
          disabled={isLoading}
          className="rounded-2xl border-zinc-100 shadow-sm text-zinc-400 hover:text-orange-500 hover:border-orange-200 transition-all"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </header>

      {isLoading ? (
        <div className="flex flex-col gap-8 pb-10">
          {[1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-4">
              <Skeleton className="w-full h-56 rounded-[32px]" />
              <div className="px-2 space-y-3">
                <Skeleton className="w-3/4 h-8 rounded-xl" />
                <Skeleton className="w-full h-5 rounded-lg" />
                <Skeleton className="w-5/6 h-5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : error === "fetch_error" ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-zinc-500 mb-6 font-medium">Something went wrong. <br/>Please try again.</p>
          <Button onClick={fetchSuggestions} variant="outline" className="h-14 px-8 rounded-2xl border-zinc-200 font-bold">
            Retry
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-10 pb-20">
          <AnimatePresence mode="popLayout">
            {suggestions.map((suggestion, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                key={suggestion.id}
                className="bg-white/70 backdrop-blur-md border border-zinc-100 rounded-[36px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col group active:scale-[0.99] transition-transform"
              >
                <div className="relative h-56 bg-zinc-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={suggestion.imageUrl}
                    alt={suggestion.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-[10px] font-black text-zinc-900 shadow-sm flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles size={12} className="text-orange-500" />
                    {suggestion.matchPercentage}% Match
                  </div>
                  
                  <button
                    onClick={() => handleSave(suggestion.fullRecipe)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm text-zinc-400 transition-all hover:text-red-500 active:scale-90"
                  >
                    <Heart className={`w-5 h-5 ${isSaved(suggestion.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </button>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-2xl font-black text-zinc-900 font-outfit leading-[1.1]">
                      {suggestion.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center text-[11px] font-bold text-zinc-500 uppercase tracking-tight">
                      <Clock className="w-4 h-4 mr-1.5 text-orange-500" />
                      {suggestion.cookTime}
                    </div>
                    <div className="flex items-center text-[11px] font-bold text-zinc-500 uppercase tracking-tight">
                      <ChefHat className="w-4 h-4 mr-1.5 text-orange-500" />
                      {suggestion.fullRecipe.difficulty}
                    </div>
                  </div>
                  
                  <p className="text-[13px] text-zinc-500 mb-6 font-medium leading-relaxed line-clamp-2">
                    {suggestion.description}
                  </p>

                  <div className="bg-orange-50/50 p-4 rounded-2xl mb-6 text-[12px] text-orange-800 border border-orange-100/50 font-medium leading-relaxed">
                    <span className="font-black text-[10px] uppercase tracking-widest text-orange-600 block mb-1">AI Recommendation</span> 
                    {suggestion.reason}
                  </div>

                  {suggestion.missingIngredients.length > 0 && (
                    <div className="mb-6">
                      <p className="text-[10px] font-black text-zinc-400 mb-3 uppercase tracking-widest">Missing Essentials</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestion.missingIngredients.map(item => (
                          <Badge key={item} variant="secondary" className="bg-zinc-50 text-zinc-400 hover:bg-zinc-100 border-none px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto pt-2">
                    <Link 
                      href={`/recipe/${suggestion.id}`}
                      className={buttonVariants({ className: "w-full h-14 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-900/10 font-bold text-sm transition-transform active:scale-[0.98]" })}
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
    </div>
  );
}
