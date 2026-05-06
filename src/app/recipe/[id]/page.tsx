"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Heart, CheckCircle2, Share } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { recipes, Recipe } from "@/data/recipes";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>("kitchenmate-saved", []);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const found = recipes.find(r => r.id === id);
    if (found) {
      setRecipe(found);
    } else {
      router.push("/");
    }
  }, [id, router]);

  if (!recipe) return null;

  const isSaved = savedRecipes.some(r => r.id === recipe.id);

  const handleSave = () => {
    if (isSaved) {
      setSavedRecipes(savedRecipes.filter(r => r.id !== recipe.id));
      toast("Recipe removed from saved.");
    } else {
      setSavedRecipes([...savedRecipes, recipe]);
      toast.success("Recipe saved successfully!");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `KitchenMate: ${recipe.title}`,
          text: recipe.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-white overflow-y-auto">
      <div className="relative h-64 bg-zinc-100 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm border border-white/20"
            >
              <Share className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm border border-white/20"
            >
              <Heart className={`w-5 h-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 -mt-6 bg-white rounded-t-3xl relative z-10 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 bg-orange-100 text-orange-800 text-[10px] font-bold tracking-wider uppercase rounded-full">
            {recipe.cuisineType}
          </span>
          <span className="px-2.5 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-bold tracking-wider uppercase rounded-full">
            {recipe.difficulty}
          </span>
        </div>

        <h1 className="text-3xl font-bold font-outfit text-zinc-900 mb-2 leading-tight">
          {recipe.title}
        </h1>
        
        <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
          {recipe.description}
        </p>

        <div className="flex items-center gap-6 mb-8 py-4 border-y border-zinc-100">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-zinc-500 font-medium">Cook Time</p>
              <p className="text-sm font-semibold text-zinc-900">{recipe.cookTime}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-zinc-900 mb-4 font-outfit">Ingredients</h2>
          <ul className="grid grid-cols-2 gap-y-3 gap-x-4">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-zinc-700 capitalize">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-zinc-900 mb-4 font-outfit">Instructions</h2>
          <div className="flex flex-col gap-5">
            {recipe.cookingSteps.map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex gap-4"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-900 font-bold text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </div>
                  {i !== recipe.cookingSteps.length - 1 && (
                    <div className="w-px h-full bg-zinc-100 my-1" />
                  )}
                </div>
                <p className="text-sm text-zinc-700 leading-relaxed pt-1 pb-2">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-12 mb-6 pt-6 border-t border-zinc-100 text-center">
          <p className="text-zinc-400 text-sm font-medium flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            Enjoy your meal!
          </p>
        </div>
      </div>
    </div>
  );
}
