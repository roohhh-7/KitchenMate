"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Refrigerator, ChefHat, Heart, User } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/pantry", icon: Refrigerator, label: "Pantry" },
  { href: "/cooking", icon: ChefHat, label: "Cooking", isCenter: true },
  { href: "/favorites", icon: Heart, label: "Favorites" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  // Don't show navbar on the landing or login page
  if (pathname === "/" || pathname === "/login") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center w-full">
      <div className="w-full max-w-[390px] relative">
        {/* The Main Navbar Container */}
        <motion.nav 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="w-full h-[86px] glass-nav flex items-center justify-around px-2 relative"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.isCenter) {
              return (
                <div key={item.href} className="relative w-16 h-16 flex items-center justify-center">
                  <Link href={item.href} className="absolute bottom-[28px] z-50">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={cn(
                        "w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-elevated transition-all border-4 border-background",
                        isActive 
                          ? "bg-[#FF6B4A] text-white" 
                          : "bg-[#1A1A1A] text-white"
                      )}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>
                  </Link>
                </div>
              );
            }

            return (
              <Link key={item.href} href={item.href} className="flex-1 flex flex-col items-center justify-center h-full pt-2">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex flex-col items-center justify-center transition-all relative",
                    isActive ? "text-[#FF6B4A]" : "text-[#A0A0A0]"
                  )}
                >
                  <Icon className={cn("w-[24px] h-[24px]", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                  <span className={cn("text-[10px] font-bold mt-1.5 uppercase tracking-widest", isActive ? "opacity-100" : "opacity-0")}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTabDot"
                      className="absolute -bottom-2 w-1 h-1 bg-[#FF6B4A] rounded-full"
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
