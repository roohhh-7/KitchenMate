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
    <div className="fixed bottom-8 left-0 right-0 z-50 px-6 flex justify-center pointer-events-none">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-[90%] max-w-[350px] h-[82px] bg-white rounded-full flex items-center justify-around shadow-[0px_8px_30px_rgba(0,0,0,0.06)] px-4 pointer-events-auto border border-[#ECE7E1]/50"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <Link key={item.href} href={item.href} className="relative -mt-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "w-[74px] h-[74px] rounded-full flex items-center justify-center shadow-xl transition-all",
                    isActive 
                      ? "bg-[#FF6B4A] text-white" 
                      : "bg-[#141414] text-white hover:bg-zinc-800"
                  )}
                >
                  <Icon className="w-8 h-8" />
                </motion.div>
              </Link>
            );
          }

          return (
            <Link key={item.href} href={item.href} className="relative flex flex-col items-center justify-center">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-2xl transition-colors relative",
                  isActive ? "text-[#FF6B4A]" : "text-[#D0C9C0] hover:text-zinc-600"
                )}
              >
                <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
                {isActive && (
                  <motion.div 
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1 w-1 h-1 bg-[#FF6B4A] rounded-full"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
