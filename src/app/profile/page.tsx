"use client";

import Link from "next/link";
import { User, Settings, Refrigerator, Heart, ChefHat, LogOut, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Recipe } from "@/data/recipes";

export default function ProfilePage() {
  const [pantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);
  const [savedRecipes] = useLocalStorage<Recipe[]>("kitchenmate-saved", []);

  const settingsItems = [
    { icon: User, label: "Personal Information" },
    { icon: ChefHat, label: "Cooking Preferences" },
    { icon: Settings, label: "Notification Settings" },
    { icon: LogOut, label: "Sign Out", color: "text-red-500" },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 pb-32">
      <header className="mb-10 text-center flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-[40px] bg-zinc-900 flex items-center justify-center text-white mb-4 shadow-2xl shadow-zinc-900/20 border-4 border-white"
        >
          <User className="w-10 h-10" />
        </motion.div>
        <h1 className="text-2xl font-bold font-outfit text-zinc-900">Rohit</h1>
        <p className="text-zinc-500 text-sm">Member since May 2026</p>
      </header>

      {/* Profile Stats */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-white border border-zinc-100 rounded-[32px] p-6 shadow-sm flex flex-col items-center">
          <Refrigerator className="w-6 h-6 text-zinc-300 mb-2" />
          <span className="text-xl font-bold font-outfit">{pantry.length}</span>
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Ingredients</span>
        </div>
        <div className="bg-white border border-zinc-100 rounded-[32px] p-6 shadow-sm flex flex-col items-center">
          <Heart className="w-6 h-6 text-zinc-300 mb-2" />
          <span className="text-xl font-bold font-outfit">{savedRecipes.length}</span>
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">Favorites</span>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="bg-white border border-zinc-100 rounded-[32px] overflow-hidden shadow-sm">
        {settingsItems.map((item, index) => (
          <button 
            key={item.label}
            className={`w-full flex items-center p-5 hover:bg-zinc-50 transition-colors ${
              index !== settingsItems.length - 1 ? "border-b border-zinc-100" : ""
            }`}
          >
            <div className={`p-2 rounded-xl bg-zinc-50 mr-4 ${item.color || "text-zinc-900"}`}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className={`font-semibold text-sm ${item.color || "text-zinc-900"}`}>{item.label}</span>
            <ChevronRight className="w-4 h-4 ml-auto text-zinc-300" />
          </button>
        ))}
      </div>

      <p className="text-center text-zinc-300 text-[10px] mt-10 uppercase tracking-widest font-bold">
        KitchenMate v1.0.0
      </p>
    </div>
  );
}
