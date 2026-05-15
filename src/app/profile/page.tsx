"use client";

import Link from "next/link";
import { User, Settings, Refrigerator, Heart, ChefHat, LogOut, ChevronRight, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function ProfilePage() {
  const [pantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);
  const [savedRecipes] = useLocalStorage<any[]>("kitchenmate-saved", []);

  const settingsItems = [
    { icon: User, label: "Personal Information" },
    { icon: ChefHat, label: "Cooking Preferences" },
    { icon: Award, label: "Achievements" },
    { icon: Settings, label: "Notification Settings" },
    { icon: LogOut, label: "Sign Out", color: "text-red-500" },
  ];

  return (
    <div className="flex-1 flex flex-col p-8 pb-32 bg-[#F6F3EE] font-inter">
      <header className="mb-12 text-center flex flex-col items-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-28 h-28 rounded-[44px] bg-[#141414] flex items-center justify-center text-white mb-6 shadow-2xl shadow-[#141414]/20 border-4 border-white overflow-hidden"
        >
          {/* Using a placeholder for avatar */}
          <User className="w-12 h-12" />
        </motion.div>
        <h1 className="text-3xl font-serif font-bold text-[#141414] mb-1">Rohit</h1>
        <p className="text-[#7B7B7B] text-xs font-bold uppercase tracking-widest">Master of the Kitchen</p>
      </header>

      {/* Profile Stats */}
      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="bg-white rounded-[32px] p-8 shadow-soft border border-[#E5E1D8]/20 flex flex-col items-center text-center">
          <Refrigerator className="w-6 h-6 text-[#7B7B7B] mb-3" />
          <span className="text-2xl font-serif font-bold text-[#141414]">{pantry.length}</span>
          <span className="text-[10px] text-[#7B7B7B] font-bold uppercase tracking-widest mt-1">Ingredients</span>
        </div>
        <div className="bg-white rounded-[32px] p-8 shadow-soft border border-[#E5E1D8]/20 flex flex-col items-center text-center">
          <Heart className="w-6 h-6 text-[#7B7B7B] mb-3" />
          <span className="text-2xl font-serif font-bold text-[#141414]">{savedRecipes.length}</span>
          <span className="text-[10px] text-[#7B7B7B] font-bold uppercase tracking-widest mt-1">Saved</span>
        </div>
      </div>

      {/* Settings Menu */}
      <div className="bg-white rounded-[40px] overflow-hidden shadow-soft border border-[#E5E1D8]/10 px-4">
        {settingsItems.map((item, index) => (
          <button 
            key={item.label}
            className={cn(
              "w-full flex items-center py-6 px-4 transition-all group active:scale-[0.98]",
              index !== settingsItems.length - 1 ? "border-b border-[#F6F3EE]" : ""
            )}
          >
            <div className={cn(
              "p-3 rounded-2xl bg-[#F6F3EE] mr-5 transition-colors group-hover:bg-[#FF6A1A]/10 group-hover:text-[#FF6A1A]",
              item.color || "text-[#141414]"
            )}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className={cn(
              "font-bold text-sm tracking-tight",
              item.color || "text-[#141414]"
            )}>{item.label}</span>
            <ChevronRight className="w-4 h-4 ml-auto text-[#E5E1D8] group-hover:text-[#FF6A1A] transition-colors" />
          </button>
        ))}
      </div>

      <p className="text-center text-[#E5E1D8] text-[10px] mt-12 uppercase tracking-[0.3em] font-black">
        Cooking Hub v2.0 Premium
      </p>
    </div>
  );
}

import { cn } from "@/lib/utils";
