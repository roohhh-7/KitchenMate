"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { recipes, Recipe } from "@/data/recipes";
import { ArrowLeft, Clock, ChefHat, Heart, Share2, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { toast } from "sonner";

export default function RecipeDetail() {
  const { id } = useParams();
  const [savedRecipes, setSavedRecipes] = useLocalStorage<Recipe[]>("kitchenmate-saved", []);
  
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) return <div className="p-8 text-center bg-[#FAF7F2] min-h-screen">Recipe not found</div>;

  const isSaved = savedRecipes.some((r) => r.id === recipe.id);

  const toggleSave = () => {
    if (isSaved) {
      setSavedRecipes(savedRecipes.filter((r) => r.id !== recipe.id));
      toast("Removed from luxury collection.");
    } else {
      setSavedRecipes([...savedRecipes, recipe]);
      toast.success("Added to luxury collection!");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] pb-32 font-inter relative overflow-x-hidden">
      {/* HERO SECTION */}
      <div className="relative h-[55vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={recipe.imageUrl} 
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/30" />
        
        {/* NAV OVERLAY */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
          <Link href="/home" className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#181818] shadow-lg active:scale-90 transition-all">
            <ArrowLeft size={22} />
          </Link>
          <div className="flex gap-3">
            <button className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#181818] shadow-lg active:scale-90 transition-all">
              <Share2 size={20} />
            </button>
            <button 
              onClick={toggleSave}
              className="w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#181818] shadow-lg active:scale-90 transition-all"
            >
              <Heart size={22} className={isSaved ? "fill-[#FF6B4A] text-[#FF6B4A]" : ""} />
            </button>
          </div>
        </div>

        {/* FLOATING PLAY BUTTON */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-20 h-20 bg-[#FF6B4A] rounded-full flex items-center justify-center text-white shadow-[0px_10px_30px_rgba(255,107,74,0.4)] cursor-pointer active:scale-90 transition-all">
            <Play size={32} className="ml-1" />
          </div>
        </motion.div>
      </div>

      {/* CONTENT SECTION */}
      <div className="flex-1 flex flex-col px-6 -mt-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-[40px] p-8 shadow-premium border border-[#ECE7E1]/50"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center text-[12px] font-bold text-[#777777] uppercase tracking-[0.2em] bg-[#FAF7F2] px-4 py-2 rounded-full">
              <Clock className="w-4 h-4 mr-2 text-[#FF6B4A]" />
              {recipe.cookTime}
            </div>
            <div className="flex items-center text-[12px] font-bold text-[#777777] uppercase tracking-[0.2em] bg-[#FAF7F2] px-4 py-2 rounded-full">
              <ChefHat className="w-4 h-4 mr-2 text-[#FF6B4A]" />
              {recipe.difficulty}
            </div>
          </div>

          <h1 className="text-[42px] font-bold leading-[1.05] text-[#181818] tracking-tight mb-6 font-outfit">
            {recipe.title}
          </h1>

          <p className="text-[#777777] text-[16px] leading-relaxed font-medium mb-10">
            A masterfully balanced dish that combines seasonal ingredients with refined techniques for a truly gourmet experience.
          </p>

          <div className="space-y-12">
            {/* INGREDIENTS */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[22px] font-bold text-[#181818]">Ingredients</h3>
                <span className="text-[14px] font-bold text-[#FF6B4A]">{recipe.ingredients.length} items</span>
              </div>
              <div className="space-y-4">
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} className="flex items-center gap-4 py-3 border-b border-[#ECE7E1]/50 last:border-0 group">
                    <div className="w-3 h-3 rounded-full border-2 border-[#FF6B4A] group-hover:bg-[#FF6B4A] transition-colors" />
                    <span className="text-[17px] font-medium text-[#181818] flex-1">{ing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* INSTRUCTIONS */}
            <div>
              <h3 className="text-[22px] font-bold text-[#181818] mb-8">Preparation</h3>
              <div className="space-y-10">
                {recipe.instructions.map((step, i) => (
                  <div key={i} className="relative pl-12 group">
                    <div className="absolute left-0 top-0 text-[48px] font-black text-[#FF6B4A]/10 select-none group-hover:text-[#FF6B4A]/20 transition-colors leading-none">
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                    <p className="text-[17px] font-medium text-[#181818] leading-relaxed relative z-10 pt-2">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* START COOKING CTA */}
      <div className="fixed bottom-10 left-0 right-0 z-40 px-6 flex justify-center pointer-events-none">
        <Button className="w-[90%] max-w-[340px] h-18 bg-[#181818] hover:bg-zinc-800 text-white rounded-full font-bold text-[18px] shadow-2xl pointer-events-auto active:scale-95 transition-all flex items-center justify-center gap-3">
          <ChefHat size={22} />
          Start Mode
        </Button>
      </div>
    </div>
  );
}
