"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X, Search, Refrigerator } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = {
  "Essentials": ["eggs", "milk", "bread", "butter"],
  "Vegetables": ["onion", "tomato", "potato", "garlic", "ginger", "spinach"],
  "Proteins": ["paneer", "chicken", "tofu", "beans"],
  "Grains": ["rice", "pasta", "quinoa", "flour"]
};

export default function PantryPage() {
  const [pantry, setPantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);
  const [inputValue, setInputValue] = useState("");

  const addIngredient = (ingredient: string) => {
    const normalized = ingredient.trim().toLowerCase();
    if (normalized && !pantry.includes(normalized)) {
      setPantry([...pantry, normalized]);
    }
    setInputValue("");
  };

  const removeIngredient = (ingredient: string) => {
    setPantry(pantry.filter((item) => item !== ingredient));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-6 pb-32 font-inter relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50/30 blur-[100px] -z-10" />

      <header className="flex items-center justify-between mb-10 pt-4">
        <div className="flex items-center">
          <Link href="/home" className="mr-4 text-[#181818] p-2 -ml-2">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-[32px] font-bold text-[#181818] tracking-tight">Your Pantry</h1>
        </div>
        <Badge className="bg-white border-[#ECE7E1] text-[#777777] font-bold px-4 py-1.5 rounded-full shadow-sm">
          {pantry.length} ITEMS
        </Badge>
      </header>

      {/* SEARCH / ADD SECTION */}
      <div className="flex gap-3 mb-10">
        <div className="flex-1 relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A0A0A0] group-focus-within:text-[#FF6B4A] transition-colors">
            <Search size={20} />
          </div>
          <Input
            placeholder="Search ingredients..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addIngredient(inputValue)}
            className="h-[64px] pl-14 pr-6 rounded-[24px] border-[#ECE7E1] bg-white focus:ring-[#FF6B4A]/10 focus:border-[#FF6B4A]/40 shadow-premium transition-all font-medium"
          />
        </div>
        <Button 
          onClick={() => addIngredient(inputValue)}
          className="h-[64px] w-[64px] rounded-[24px] bg-[#181818] hover:bg-zinc-800 text-white flex-shrink-0 shadow-lg active:scale-95 transition-all"
        >
          <Plus size={28} />
        </Button>
      </div>

      {/* QUICK CATEGORIES */}
      <div className="mb-12">
        <h2 className="text-[12px] font-bold text-[#D0C9C0] uppercase tracking-[0.2em] mb-6">Quick Select</h2>
        <div className="space-y-8">
          {Object.entries(CATEGORIES).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-[14px] font-bold text-[#181818] mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2.5">
                {items.filter(item => !pantry.includes(item)).map(item => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="px-5 py-2.5 rounded-full cursor-pointer hover:bg-white hover:border-[#FFB38A] border-[#ECE7E1] text-[#777777] hover:text-[#FF6B4A] transition-all font-bold text-[13px] bg-[#FFFFFF]/50"
                    onClick={() => addIngredient(item)}
                  >
                    + {item}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CURRENT PANTRY */}
      <div className="flex-1">
        <h2 className="text-[12px] font-bold text-[#D0C9C0] uppercase tracking-[0.2em] mb-6">In Stock</h2>
        
        {pantry.length === 0 ? (
          <div className="text-center py-16 px-8 rounded-[32px] border-2 border-dashed border-[#ECE7E1] bg-white/30 backdrop-blur-sm">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Refrigerator size={32} className="text-[#D0C9C0]" />
            </div>
            <p className="text-[#777777] text-[15px] font-medium leading-relaxed">
              Your luxury pantry is waiting. <br />Start adding ingredients.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <AnimatePresence mode="popLayout">
              {pantry.map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  layout
                >
                  <Badge
                    className="px-5 py-3 rounded-full bg-[#181818] text-white flex items-center gap-2.5 font-bold text-[14px] shadow-lg group hover:bg-[#333] transition-all"
                  >
                    {item}
                    <button
                      onClick={() => removeIngredient(item)}
                      className="text-white/40 hover:text-[#FF6B4A] transition-colors"
                    >
                      <X size={14} className="stroke-[3px]" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* FIND RECIPES ACTION */}
      {pantry.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10"
        >
          <Link 
            href="/suggestions"
            className={buttonVariants({ className: "w-full h-[64px] rounded-full bg-[#FF6B4A] hover:bg-[#E85A3D] text-white shadow-xl shadow-[#FF6B4A]/20 font-bold text-[17px] active:scale-[0.98] transition-all" })}
          >
            Curate Recommendations
          </Link>
        </motion.div>
      )}
    </div>
  );
}
