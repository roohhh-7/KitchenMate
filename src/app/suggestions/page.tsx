"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, Clock, ChefHat, Heart } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion } from "framer-motion";
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
      <div className="flex-1 flex flex-col p-6 h-full items-center justify-center text-center">
        <ChefHat className="w-16 h-16 text-zinc-300 mb-6" />
        <h2 className="text-xl font-medium text-zinc-900 mb-2">Pantry is empty</h2>
        <p className="text-zinc-500 mb-8 max-w-[250px]">
          Add a few ingredients to your pantry to get meal suggestions.
        </p>
        <Link href="/pantry" className={buttonVariants({ size: "lg", className: "rounded-2xl bg-zinc-900 text-white px-8" })}>
          Go to Pantry
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 h-full overflow-y-auto">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/" className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-full -ml-2 mr-2 text-zinc-500" })}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold font-outfit text-zinc-900">Suggestions</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={fetchSuggestions} 
          disabled={isLoading}
          className="rounded-full text-zinc-500"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </header>

      {isLoading ? (
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="w-full h-48 rounded-3xl" />
              <Skeleton className="w-3/4 h-6 rounded-lg" />
              <Skeleton className="w-full h-4 rounded-lg" />
              <Skeleton className="w-5/6 h-4 rounded-lg" />
            </div>
          ))}
        </div>
      ) : error === "fetch_error" ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-zinc-500 mb-4">Something went wrong. Please try again.</p>
          <Button onClick={fetchSuggestions} variant="outline" className="rounded-2xl">
            Retry
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-8 pb-8">
          {suggestions.map((suggestion, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              key={suggestion.id}
              className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm flex flex-col"
            >
              <div className="relative h-48 bg-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={suggestion.imageUrl}
                  alt={suggestion.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-zinc-900 shadow-sm">
                  {suggestion.matchPercentage}% Match
                </div>
                <button
                  onClick={() => handleSave(suggestion.fullRecipe)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-zinc-600 transition-colors hover:text-red-500"
                >
                  <Heart className={`w-4 h-4 ${isSaved(suggestion.id) ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-zinc-900 font-outfit leading-tight">
                    {suggestion.title}
                  </h3>
                  <div className="flex items-center text-xs font-medium text-zinc-500 shrink-0 mt-1">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {suggestion.cookTime}
                  </div>
                </div>
                
                <p className="text-sm text-zinc-600 mb-4 line-clamp-2">
                  {suggestion.description}
                </p>

                <div className="bg-zinc-50 p-3 rounded-2xl mb-4 text-xs text-zinc-600 border border-zinc-100/50">
                  <span className="font-semibold text-zinc-900 mr-1">Why:</span> 
                  {suggestion.reason}
                </div>

                {suggestion.missingIngredients.length > 0 && (
                  <div className="mb-5">
                    <p className="text-xs font-semibold text-zinc-900 mb-2">Missing:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {suggestion.missingIngredients.map(item => (
                        <Badge key={item} variant="secondary" className="bg-zinc-100 text-zinc-500 hover:bg-zinc-200 border-none px-2 py-0.5 text-[10px]">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-2">
                  <Link 
                    href={`/recipe/${suggestion.id}`}
                    className={buttonVariants({ className: "w-full h-12 rounded-xl bg-orange-100 text-orange-700 hover:bg-orange-200 shadow-none font-medium text-sm" })}
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
