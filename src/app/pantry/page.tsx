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
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-8 pb-32 font-inter relative overflow-hidden grain-overlay">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/10 blur-[120px] -z-10" />

      <header className="flex items-center justify-between mb-12 pt-4">
        <div className="flex items-center">
          <Link href="/home" className="mr-5 text-[#181818] p-2 -ml-2 hover:opacity-70 transition-opacity">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-[34px] font-bold text-[#181818] tracking-[-0.02em] font-jakarta">My Pantry</h1>
        </div>
        <div className="bg-white border border-[#ECE7E1]/50 text-[#A0A0A0] font-bold px-5 py-2 rounded-full shadow-sm text-[11px] tracking-widest uppercase">
          {pantry.length} ITEMS
        </div>
      </header>

      {/* SEARCH / ADD SECTION */}
      <div className="flex gap-4 mb-12">
        <div className="flex-1 relative group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D0C9C0] group-focus-within:text-[#FF6B4A] transition-colors">
            <Search size={20} />
          </div>
          <Input
            placeholder="Search ingredients..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addIngredient(inputValue)}
            className="h-[64px] pl-16 pr-6 rounded-[24px] border-[#ECE7E1] bg-white focus:ring-[#FF6B4A]/10 focus:border-[#FF6B4A]/40 shadow-premium transition-all font-medium placeholder:text-[#D0C9C0]"
          />
        </div>
        <Button 
          onClick={() => addIngredient(inputValue)}
          className="h-[64px] w-[64px] rounded-[24px] bg-[#1A1A1A] hover:bg-zinc-800 text-white flex-shrink-0 shadow-elevated active:scale-95 transition-all border-t border-white/5"
        >
          <Plus size={28} />
        </Button>
      </div>

      {/* QUICK CATEGORIES */}
      <div className="mb-14">
        <h2 className="text-[11px] font-bold text-[#D0C9C0] uppercase tracking-[0.2em] mb-8">Essentials Collection</h2>
        <div className="space-y-10">
          {Object.entries(CATEGORIES).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-[15px] font-bold text-[#181818] mb-5 font-jakarta tracking-tight">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {items.filter(item => !pantry.includes(item)).map(item => (
                  <Badge
                    key={item}
                    variant="outline"
                    className="px-6 py-3 rounded-full cursor-pointer bg-white/50 hover:bg-white hover:border-[#FFB38A]/50 border-[#ECE7E1]/50 text-[#777777] hover:text-[#FF6B4A] transition-all font-bold text-[13px] tracking-tight shadow-sm"
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
        <h2 className="text-[11px] font-bold text-[#D0C9C0] uppercase tracking-[0.2em] mb-8">Currently in Kitchen</h2>
        
        {pantry.length === 0 ? (
          <div className="text-center py-20 px-10 rounded-[40px] border border-dashed border-[#ECE7E1] bg-white/40 backdrop-blur-sm shadow-premium">
            <div className="w-20 h-20 bg-white rounded-[28px] flex items-center justify-center mx-auto mb-8 shadow-premium border border-[#ECE7E1]/20">
              <Refrigerator size={34} className="text-[#D0C9C0]" />
            </div>
            <p className="text-[#777777] text-[16px] font-medium leading-relaxed">
              Your luxury pantry is currently empty. <br />Add ingredients to start cooking.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <AnimatePresence mode="popLayout">
              {pantry.map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.85, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 10 }}
                  layout
                >
                  <Badge
                    className="px-6 py-3.5 rounded-full bg-[#1A1A1A] text-white flex items-center gap-3 font-bold text-[14px] shadow-elevated group hover:bg-zinc-800 transition-all border-t border-white/10"
                  >
                    <span className="tracking-tight">{item}</span>
                    <button
                      onClick={() => removeIngredient(item)}
                      className="text-white/30 hover:text-[#FF6B4A] transition-colors"
                    >
                      <X size={14} className="stroke-[3.5px]" />
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
          className="mt-12"
        >
          <Link 
            href="/suggestions"
            className={buttonVariants({ className: "w-full h-[64px] rounded-full cta-gradient hover:opacity-95 text-white shadow-glow font-bold text-[18px] active:scale-[0.98] transition-all border-t border-white/20" })}
          >
            Curate Menu
          </Link>
        </motion.div>
      )}
    </div>
  );
}
