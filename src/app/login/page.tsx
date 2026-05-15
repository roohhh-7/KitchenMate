"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Globe, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/home";
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#FAF7F2] p-6 font-inter">
      <div className="flex-1 flex flex-col justify-center max-w-[320px] mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-[32px] font-bold text-[#181818] tracking-tight mb-2">Welcome Back</h1>
          <p className="text-[#777777] font-medium text-[15px]">Sign in to your luxury kitchen</p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="space-y-4">
            <div className="relative group">
              <Input
                type="email"
                placeholder="Email Address"
                className="h-[58px] px-6 rounded-[18px] border-[#ECE7E1] bg-white focus:bg-white focus:ring-[#FF6B4A]/10 focus:border-[#FF6B4A]/40 transition-all font-medium text-[#181818] placeholder:text-[#A0A0A0]"
                required
              />
            </div>
            <div className="relative group">
              <Input
                type="password"
                placeholder="Password"
                className="h-[58px] px-6 rounded-[18px] border-[#ECE7E1] bg-white focus:bg-white focus:ring-[#FF6B4A]/10 focus:border-[#FF6B4A]/40 transition-all font-medium text-[#181818] placeholder:text-[#A0A0A0]"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-[13px] font-semibold text-[#FF6B4A] hover:opacity-80">
              Forgot Password?
            </button>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-[58px] bg-[#FF6B4A] hover:bg-[#E85A3D] rounded-full text-[17px] font-semibold text-white shadow-[0px_10px_25px_rgba(255,107,74,0.25)] transition-all active:scale-[0.97] mt-6"
          >
            {isLoading ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : "Sign In"}
          </Button>

          <div className="relative py-6 text-center">
            <span className="text-[12px] font-bold text-[#D0C9C0] uppercase tracking-widest bg-[#FAF7F2] px-4 relative z-10">Or connect with</span>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#ECE7E1]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-[58px] rounded-full border-[#ECE7E1] bg-white hover:bg-zinc-50 font-bold text-[14px] text-[#555] gap-2 shadow-sm">
              <Globe size={18} className="text-zinc-400" />
              Google
            </Button>
            <Button variant="outline" className="h-[58px] rounded-full border-[#ECE7E1] bg-white hover:bg-zinc-50 font-bold text-[14px] text-[#555] gap-2 shadow-sm">
              <Terminal size={18} className="text-zinc-400" />
              GitHub
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-[14px] text-[#777777] font-medium">
            Don&apos;t have an account?{" "}
            <Link href="/" className="text-[#FF6B4A] font-bold hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
