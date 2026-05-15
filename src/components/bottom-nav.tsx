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
    <div className="fixed bottom-6 left-0 right-0 z-50 px-6 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <motion.nav 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="bg-white/80 backdrop-blur-xl border border-zinc-200/50 rounded-[32px] px-2 py-2 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.isCenter) {
              return (
                <Link key={item.href} href={item.href} className="relative -mt-10 px-2">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-colors",
                      isActive 
                        ? "bg-orange-500 text-white" 
                        : "bg-zinc-900 text-white hover:bg-zinc-800"
                    )}
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>
                </Link>
              );
            }

            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "flex flex-col items-center justify-center py-2 rounded-2xl transition-colors relative",
                    isActive ? "text-orange-500" : "text-zinc-400 hover:text-zinc-600"
                  )}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute -bottom-1 w-1 h-1 bg-orange-500 rounded-full"
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
