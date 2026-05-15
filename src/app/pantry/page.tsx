"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const COMMON_INGREDIENTS = [
  "eggs", "rice", "onion", "tomato", "paneer", "milk", "bread", "potato", "garlic", "ginger"
];

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient(inputValue);
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 h-full relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-10%] w-[50%] h-[30%] bg-orange-100/20 blur-[80px] rounded-full" />
      </div>

      <header className="flex items-center mb-8">
        <Link href="/cooking" className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-2xl -ml-2 mr-2 text-zinc-400 hover:bg-zinc-100 transition-colors" })}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-black font-outfit text-zinc-900 tracking-tight">Your Pantry</h1>
      </header>

      <div className="flex gap-2 mb-10">
        <div className="flex-1 relative group">
          <Input
            placeholder="Add an ingredient..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="rounded-[20px] h-14 bg-white/60 backdrop-blur-sm border-zinc-100 focus-visible:ring-orange-500/20 focus-visible:ring-offset-0 focus-visible:border-orange-500/50 shadow-sm transition-all font-medium pl-5"
          />
        </div>
        <Button 
          onClick={() => addIngredient(inputValue)}
          className="h-14 w-14 rounded-[20px] bg-zinc-900 hover:bg-zinc-800 text-white flex-shrink-0 shadow-lg shadow-zinc-900/10 transition-transform active:scale-95"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      <div className="mb-10">
        <h2 className="text-[11px] font-black text-zinc-400 mb-4 uppercase tracking-[0.2em]">Quick Add</h2>
        <div className="flex flex-wrap gap-2.5">
          {COMMON_INGREDIENTS.filter(item => !pantry.includes(item)).map(item => (
            <Badge
              key={item}
              variant="outline"
              className="px-4 py-2 rounded-xl cursor-pointer hover:bg-orange-50 hover:border-orange-200 border-zinc-100 text-zinc-500 hover:text-orange-600 transition-all font-bold text-[11px] bg-white shadow-sm"
              onClick={() => addIngredient(item)}
            >
              + {item}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">
            Currently in Pantry
          </h2>
          <Badge variant="secondary" className="bg-orange-100 text-orange-600 border-none font-black text-[10px]">
            {pantry.length} ITEMS
          </Badge>
        </div>
        
        {pantry.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 px-6 rounded-[32px] border-2 border-dashed border-zinc-100 bg-white/40 backdrop-blur-sm"
          >
            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-300">
              <Plus size={32} />
            </div>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed">
              Your pantry is empty. <br/>Add a few ingredients to get started.
            </p>
          </motion.div>
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
                    variant="secondary"
                    className="px-4 py-2.5 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 transition-all flex items-center gap-2 font-bold text-xs shadow-md shadow-zinc-900/10 group"
                  >
                    {item}
                    <button
                      onClick={() => removeIngredient(item)}
                      className="text-white/40 hover:text-orange-400 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {pantry.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 pt-6"
        >
          <Link 
            href="/suggestions"
            className={buttonVariants({ size: "lg", className: "w-full h-16 text-lg rounded-3xl bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-900/10 font-black transition-transform active:scale-[0.98]" })}
          >
            Find Recipes
          </Link>
        </motion.div>
      )}
    </div>
  );
}
