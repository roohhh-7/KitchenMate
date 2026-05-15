"use client";

import Link from "next/link";
import { ArrowLeft, Settings, CreditCard, Bell, Shield, LogOut, ChevronRight, User } from "lucide-react";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Recipe } from "@/data/recipes";

export default function ProfilePage() {
  const [savedRecipes] = useLocalStorage<Recipe[]>("kitchenmate-saved", []);
  const [pantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);

  const menuItems = [
    { icon: User, label: "Personal Details", color: "#FF6B4A" },
    { icon: Bell, label: "Notifications", color: "#4A90E2" },
    { icon: Shield, label: "Security & Privacy", color: "#50E3C2" },
    { icon: CreditCard, label: "Membership", color: "#F5A623" },
    { icon: Settings, label: "Preferences", color: "#777777" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-8 pb-32 font-inter relative overflow-hidden grain-overlay">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100/10 blur-[130px] -z-10" />

      <header className="flex items-center justify-between mb-12 pt-4">
        <Link href="/home" className="text-[#181818] p-2 -ml-2 hover:opacity-70 transition-opacity">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-[22px] font-bold text-[#181818] font-jakarta tracking-tight">Profile</h1>
        <div className="w-10 h-10" />
      </header>

      {/* AVATAR SECTION */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center mb-14"
      >
        <div className="relative mb-8">
          <div className="w-36 h-36 rounded-full border-4 border-white shadow-elevated overflow-hidden p-1 bg-white">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop" 
              alt="Rohit"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-2 right-2 w-10 h-10 bg-[#FF6B4A] rounded-full border-[3px] border-white flex items-center justify-center text-white shadow-lg"
          >
            <div className="w-2 h-2 bg-white rounded-full" />
          </motion.div>
        </div>
        <h2 className="text-[32px] font-bold text-[#1A1A1A] mb-2 font-jakarta tracking-tight">Rohit Sharma</h2>
        <p className="text-[#A0A0A0] font-bold text-[11px] uppercase tracking-widest">Premium Member</p>
      </motion.div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 gap-5 mb-14">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="bg-white rounded-[32px] p-8 flex flex-col items-center text-center shadow-premium border border-[#ECE7E1]/30"
        >
          <span className="text-[34px] font-bold text-[#1A1A1A] font-jakarta leading-none mb-2">{savedRecipes.length}</span>
          <span className="text-[10px] font-bold text-[#D0C9C0] uppercase tracking-[0.15em]">Saved</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-white rounded-[32px] p-8 flex flex-col items-center text-center shadow-premium border border-[#ECE7E1]/30"
        >
          <span className="text-[34px] font-bold text-[#1A1A1A] font-jakarta leading-none mb-2">{pantry.length}</span>
          <span className="text-[10px] font-bold text-[#D0C9C0] uppercase tracking-[0.15em]">Ingredients</span>
        </motion.div>
      </div>

      {/* MENU LIST */}
      <div className="space-y-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (index * 0.05), duration: 0.6 }}
              className="w-full h-[82px] bg-white rounded-[26px] px-7 flex items-center justify-between border border-[#ECE7E1]/20 shadow-premium active:scale-[0.98] transition-all group hover:border-[#FF6B4A]/10"
            >
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-[#FAF7F2] group-hover:bg-[#FFF5F0] group-hover:scale-105">
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <span className="text-[17px] font-bold text-[#1A1A1A] font-jakarta tracking-tight">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-[#D0C9C0] group-hover:text-[#181818] transition-all group-hover:translate-x-1" />
            </motion.button>
          );
        })}
      </div>

      {/* LOGOUT */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-14 flex items-center justify-center gap-3 text-[#FF4A4A] font-bold text-[16px] w-full hover:opacity-80 transition-opacity pb-4"
      >
        <LogOut size={20} />
        Sign Out
      </motion.button>
    </div>
  );
}
