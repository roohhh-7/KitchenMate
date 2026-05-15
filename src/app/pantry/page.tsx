"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, X, Search, Refrigerator as FridgeIcon, Sparkles } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "dairy", label: "Dairy & Eggs", icon: "🥛", shelf: 0 },
  { id: "veg", label: "Produce", icon: "🥬", shelf: 1 },
  { id: "protein", label: "Proteins", icon: "🥩", shelf: 2 },
  { id: "pantry", label: "Condiments", icon: "🧂", shelf: 3 },
];

const ITEM_MAP: Record<string, string> = {
  milk: "/milk.png",
  eggs: "/milk.png", // Use placeholder or generic for now
  onion: "/veg.png",
  tomato: "/veg.png",
  paneer: "/milk.png",
  potato: "/veg.png",
  garlic: "/veg.png",
};

export default function PantryPage() {
  const [pantry, setPantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);
  const [inputValue, setInputValue] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

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

  // Mock categorizing for the visual fridge
  const shelvedItems = useMemo(() => {
    const shelves: string[][] = [[], [], [], []];
    pantry.forEach((item, index) => {
      shelves[index % 4].push(item);
    });
    return shelves;
  }, [pantry]);

  return (
    <div className="flex-1 flex flex-col bg-[#F6F3EE] min-h-screen relative overflow-hidden font-inter">
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay">
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      </div>

      <div className="p-8 pb-32 relative z-10 flex flex-col h-full">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center">
            <Link href="/cooking" className="w-12 h-12 rounded-2xl bg-white shadow-soft flex items-center justify-center mr-4 active:scale-95 transition-transform">
              <ArrowLeft className="w-5 h-5 text-[#141414]" />
            </Link>
            <h1 className="text-3xl font-serif font-bold text-[#141414]">My Fridge</h1>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FF6A1A]/10 flex items-center justify-center text-[#FF6A1A]">
            <FridgeIcon size={24} />
          </div>
        </header>

        {/* Search / Add Section */}
        <div className="flex gap-3 mb-10">
          <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7B7B7B] group-focus-within:text-[#FF6A1A] transition-colors" />
            <Input
              placeholder="What did you buy?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-16 pl-14 pr-6 rounded-[24px] bg-white border-none shadow-soft focus-visible:ring-[#FF6A1A]/20 transition-all font-medium text-[#141414]"
            />
          </div>
          <Button 
            onClick={() => addIngredient(inputValue)}
            className="h-16 w-16 rounded-[24px] bg-[#141414] hover:bg-[#FF6A1A] text-white flex-shrink-0 shadow-xl transition-all active:scale-95"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>

        {/* Visual Fridge Container */}
        <div className="flex-1 flex flex-col gap-6 perspective-[1000px]">
          {shelvedItems.map((shelf, shelfIndex) => (
            <div key={shelfIndex} className="relative group">
              {/* Shelf Base */}
              <div className="absolute -bottom-1 left-0 right-0 h-4 bg-[#E5E1D8] rounded-full blur-[2px] opacity-40 -z-10" />
              
              <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-6 min-h-[140px] border border-white relative shadow-soft overflow-hidden">
                <div className="absolute top-4 left-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#7B7B7B]">
                  Shelf {shelfIndex + 1}
                </div>
                
                <div className="mt-6 flex flex-wrap gap-4">
                  <AnimatePresence mode="popLayout">
                    {shelf.map((item) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, scale: 0.5, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        layout
                        className="relative group/item"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-20 bg-[#F6F3EE] rounded-xl flex items-center justify-center shadow-soft border border-[#E5E1D8]/20 relative overflow-hidden group-hover/item:border-[#FF6A1A]/30 transition-all">
                            {ITEM_MAP[item] ? (
                              <img src={ITEM_MAP[item]} alt={item} className="w-10 h-10 object-contain" />
                            ) : (
                              <span className="text-2xl">{CATEGORIES[shelfIndex].icon}</span>
                            )}
                            <button 
                              onClick={() => removeIngredient(item)}
                              className="absolute top-1 right-1 w-5 h-5 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3 text-[#141414]" />
                            </button>
                          </div>
                          <span className="text-[10px] font-bold text-[#7B7B7B] mt-2 uppercase tracking-tighter truncate w-16 text-center">
                            {item}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {shelf.length === 0 && (
                    <div className="flex-1 flex items-center justify-center py-4 opacity-20 italic text-sm text-[#7B7B7B]">
                      Empty Shelf
                    </div>
                  )}
                </div>

                {/* Shelf Reflection/Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6A1A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {pantry.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10"
          >
            <Link 
              href="/suggestions"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full h-18 rounded-[32px] bg-[#141414] hover:bg-[#FF6A1A] text-white text-lg font-bold shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              )}
            >
              <Sparkles size={20} />
              Find Inspiration
            </Link>
          </motion.div>
        ) : (
          <div className="text-center mt-10">
            <p className="text-[#7B7B7B] text-sm italic font-medium leading-relaxed">
              &quot;A clean fridge is a happy fridge. <br/> Add some items to get started.&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
