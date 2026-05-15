"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Refrigerator, ChefHat, Heart, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/pantry", icon: Refrigerator, label: "Pantry" },
  { href: "/cooking", icon: ChefHat, label: "Cook", isCenter: true },
  { href: "/favorites", icon: Heart, label: "Saved" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  // Don't show navbar on the landing or login page
  if (pathname === "/" || pathname === "/login") return null;

  return (
    <div className="fixed bottom-10 left-0 right-0 z-50 px-8 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <motion.nav 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className="bg-white/70 backdrop-blur-2xl border border-white/50 rounded-[40px] px-3 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.isCenter) {
              return (
                <Link key={item.href} href={item.href} className="relative -mt-12 px-2">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-18 h-18 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300",
                      isActive 
                        ? "bg-[#FF6A1A] text-white" 
                        : "bg-[#141414] text-white hover:bg-[#FF6A1A]"
                    )}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                </Link>
              );
            }

            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 rounded-[24px] transition-all relative",
                    isActive ? "text-[#FF6A1A]" : "text-[#7B7B7B] hover:text-[#141414]"
                  )}
                >
                  <Icon className={cn("w-6 h-6 mb-1 transition-transform", isActive && "scale-110")} />
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabPill"
                      className="absolute -bottom-1 w-1.5 h-1.5 bg-[#FF6A1A] rounded-full"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </motion.nav>
      </div>
    </div>
  );
}
