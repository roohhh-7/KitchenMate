"use client";

import Link from "next/link";
import { ArrowLeft, Settings, CreditCard, Bell, Shield, LogOut, ChevronRight, User } from "lucide-react";
import { motion } from "framer-motion";
import { useLocalStorage } from "@/hooks/use-local-storage";

export default function ProfilePage() {
  const [savedRecipes] = useLocalStorage<Recipe[]>("kitchenmate-saved", []);
  const [pantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);

  const menuItems = [
    { icon: User, label: "Personal Information", color: "#FF6B4A" },
    { icon: Bell, label: "Notifications", color: "#4A90E2" },
    { icon: Shield, label: "Security & Privacy", color: "#50E3C2" },
    { icon: CreditCard, label: "Luxury Subscription", color: "#F5A623" },
    { icon: Settings, label: "App Settings", color: "#777777" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#FAF7F2] p-6 pb-32 font-inter relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/20 blur-[100px] -z-10" />

      <header className="flex items-center justify-between mb-12 pt-4">
        <Link href="/home" className="text-[#181818] p-2 -ml-2">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-[20px] font-bold text-[#181818]">Your Profile</h1>
        <div className="w-10 h-10" />
      </header>

      {/* AVATAR SECTION */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center mb-12"
      >
        <div className="relative mb-6">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden p-1 bg-white">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop" 
              alt="Rohit"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-1 right-1 w-8 h-8 bg-[#FF6B4A] rounded-full border-2 border-white flex items-center justify-center text-white">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </div>
        </div>
        <h2 className="text-[28px] font-bold text-[#181818] mb-1 font-outfit">Rohit Sharma</h2>
        <p className="text-[#777777] font-medium text-[14px]">Member since May 2024</p>
      </motion.div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[28px] p-6 flex flex-col items-center text-center shadow-premium border border-[#ECE7E1]/50"
        >
          <span className="text-[28px] font-bold text-[#181818]">{savedRecipes.length}</span>
          <span className="text-[10px] font-bold text-[#777777] uppercase tracking-widest mt-1">Saved</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[28px] p-6 flex flex-col items-center text-center shadow-premium border border-[#ECE7E1]/50"
        >
          <span className="text-[28px] font-bold text-[#181818]">{pantry.length}</span>
          <span className="text-[10px] font-bold text-[#777777] uppercase tracking-widest mt-1">Ingredients</span>
        </motion.div>
      </div>

      {/* MENU LIST */}
      <div className="space-y-4">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
              className="w-full h-[78px] bg-white rounded-[24px] px-6 flex items-center justify-between border border-[#ECE7E1]/30 shadow-premium active:scale-[0.98] transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center transition-colors bg-[#FAF7F2] group-hover:bg-[#FFF5F0]">
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <span className="text-[16px] font-bold text-[#181818]">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-[#D0C9C0] group-hover:text-[#181818] transition-colors" />
            </motion.button>
          );
        })}
      </div>

      {/* LOGOUT */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex items-center justify-center gap-3 text-red-500 font-bold text-[16px] w-full"
      >
        <LogOut size={20} />
        Sign Out
      </motion.button>
    </div>
  );
}
