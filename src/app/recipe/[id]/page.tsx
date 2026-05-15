"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, Heart, CheckCircle2, Share, ChefHat } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button } from "@/components/ui/button";
import { recipes, Recipe } from "@/data/recipes";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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
      router.push("/home");
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
          title: `Cooking Hub: ${recipe.title}`,
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
    <div className="flex-1 flex flex-col h-full bg-[#F6F3EE] overflow-y-auto font-inter">
      <div className="relative h-[450px] bg-[#F0EDE8] shrink-0">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F6F3EE] via-transparent to-black/30" />
        
        <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-start z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="w-12 h-12 rounded-2xl bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="w-12 h-12 rounded-2xl bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/20"
            >
              <Share className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSave}
              className="w-12 h-12 rounded-2xl bg-white/20 hover:bg-white/40 text-white backdrop-blur-md border border-white/20"
            >
              <Heart className={`w-5 h-5 ${isSaved ? "fill-[#FF6A1A] text-[#FF6A1A]" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-10 -mt-16 bg-[#F6F3EE] rounded-t-[56px] relative z-10 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Badge className="bg-[#FF6A1A]/10 text-[#FF6A1A] border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
              {recipe.cuisineType}
            </Badge>
            <Badge className="bg-[#7B8B6F]/10 text-[#7B8B6F] border-none rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest">
              {recipe.difficulty}
            </Badge>
          </div>

          <h1 className="text-4xl font-serif font-bold text-[#141414] mb-4 leading-tight tracking-tight">
            {recipe.title}
          </h1>
          
          <p className="text-[#7B7B7B] text-lg mb-10 leading-relaxed font-medium">
            {recipe.description}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-12 py-8 border-y border-[#E5E1D8]/50">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center text-[#FF6A1A]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-[#7B7B7B] font-bold uppercase tracking-widest mb-1">Time</p>
                <p className="text-sm font-black text-[#141414]">{recipe.cookTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center text-[#FF6A1A]">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-[#7B7B7B] font-bold uppercase tracking-widest mb-1">Skill</p>
                <p className="text-sm font-black text-[#141414]">{recipe.difficulty}</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-[#141414] mb-8">Ingredients</h2>
            <div className="grid grid-cols-1 gap-4">
              {recipe.ingredients.map((ingredient, i) => (
                <div key={i} className="flex items-center gap-4 text-[#141414] font-bold text-sm bg-white p-5 rounded-[24px] shadow-soft border border-[#E5E1D8]/20">
                  <div className="w-3 h-3 rounded-full bg-[#FF6A1A]/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FF6A1A]" />
                  </div>
                  <span className="capitalize">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-24">
            <h2 className="text-2xl font-serif font-bold text-[#141414] mb-8">Method</h2>
            <div className="flex flex-col gap-8">
              {recipe.cookingSteps.map((step, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                  className="flex gap-6"
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 rounded-2xl bg-[#141414] text-white font-black text-xs flex items-center justify-center shrink-0 shadow-lg">
                      {i + 1}
                    </div>
                    {i !== recipe.cookingSteps.length - 1 && (
                      <div className="w-px h-full bg-[#E5E1D8] my-3" />
                    )}
                  </div>
                  <p className="text-[15px] text-[#141414] leading-relaxed pt-2 pb-4 font-medium">
                    {step}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mb-12 pt-10 border-t border-[#E5E1D8]/50 text-center">
            <p className="text-[#7B7B7B] text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#7B8B6F]" />
              Bon Appétit
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
