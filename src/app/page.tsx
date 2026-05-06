"use client";

import Link from "next/link";
import { ArrowRight, ChefHat, Heart, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { Recipe } from "@/data/recipes";
import { motion } from "framer-motion";

export default function Home() {
  const [pantry] = useLocalStorage<string[]>("kitchenmate-pantry", []);
  const [savedRecipes] = useLocalStorage<Recipe[]>("kitchenmate-saved", []);

  return (
    <div className="flex-1 flex flex-col p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 flex flex-col justify-center mb-12"
      >
        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-600">
          <ChefHat size={32} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-3 font-outfit">
          KitchenMate
        </h1>
        <p className="text-lg text-zinc-500 mb-10 max-w-[280px]">
          Decide dinner in under 30 seconds.
        </p>

        <div className="flex flex-col gap-4">
          <Link 
            href="/suggestions"
            className={buttonVariants({ size: "lg", className: "w-full h-14 text-base rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm" })}
          >
              What Can I Cook?
              <ArrowRight className="ml-2 w-5 h-5" />
          </Link>

          <Link 
            href="/pantry"
            className={buttonVariants({ variant: "outline", size: "lg", className: "w-full h-14 text-base rounded-2xl border-zinc-200 bg-white hover:bg-zinc-50 shadow-sm" })}
          >
              <Plus className="mr-2 w-5 h-5 text-zinc-400" />
              Manage Pantry
              {pantry.length > 0 && (
                <span className="ml-auto bg-orange-100 text-orange-700 text-xs font-medium px-2 py-0.5 rounded-full">
                  {pantry.length}
                </span>
              )}
          </Link>
        </div>
      </motion.div>

      {savedRecipes.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-auto"
        >
          <div className="flex items-center gap-2 mb-4 text-zinc-900">
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <h3 className="font-medium">Saved Recipes</h3>
          </div>
          <div className="flex overflow-x-auto gap-3 pb-4 snap-x hide-scrollbar">
            {savedRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipe/${recipe.id}`}
                className="flex-none w-48 bg-white border border-zinc-100 rounded-2xl overflow-hidden shadow-sm snap-start group"
              >
                <div className="h-24 bg-zinc-100 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm text-zinc-900 truncate">
                    {recipe.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1">
                    {recipe.cookTime} • {recipe.difficulty}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
