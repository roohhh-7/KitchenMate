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
    <div className="flex-1 flex flex-col p-6 h-full">
      <header className="flex items-center mb-8">
        <Link href="/cooking" className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-full -ml-2 mr-2 text-zinc-500" })}>
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold font-outfit text-zinc-900">Your Pantry</h1>
      </header>

      <div className="flex gap-2 mb-8">
        <Input
          placeholder="Add an ingredient..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="rounded-2xl h-12 bg-zinc-50 border-zinc-200 focus-visible:ring-orange-200 focus-visible:ring-offset-0 focus-visible:border-orange-300"
        />
        <Button 
          onClick={() => addIngredient(inputValue)}
          className="h-12 w-12 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white flex-shrink-0"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="mb-8">
        <h2 className="text-sm font-medium text-zinc-500 mb-3">Quick Add</h2>
        <div className="flex flex-wrap gap-2">
          {COMMON_INGREDIENTS.filter(item => !pantry.includes(item)).map(item => (
            <Badge
              key={item}
              variant="outline"
              className="px-3 py-1.5 rounded-full cursor-pointer hover:bg-zinc-100 border-zinc-200 text-zinc-600 transition-colors"
              onClick={() => addIngredient(item)}
            >
              + {item}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <h2 className="text-sm font-medium text-zinc-500 mb-3">
          Currently in Pantry ({pantry.length})
        </h2>
        
        {pantry.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/50">
            <p className="text-zinc-500 text-sm">
              Your pantry is empty. Add a few ingredients to get meal suggestions.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {pantry.map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 rounded-full bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors flex items-center gap-1.5"
                  >
                    {item}
                    <button
                      onClick={() => removeIngredient(item)}
                      className="hover:bg-orange-300 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
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
          className="mt-6 pt-4 border-t border-zinc-100"
        >
          <Link 
            href="/suggestions"
            className={buttonVariants({ size: "lg", className: "w-full h-14 text-base rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm" })}
          >
            Find Recipes
          </Link>
        </motion.div>
      )}
    </div>
  );
}
