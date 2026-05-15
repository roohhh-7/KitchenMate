"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Globe, Terminal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/home";
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#F6F3EE] p-6 font-inter">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Link href="/" className="inline-block mb-8">
            <h2 className="text-2xl font-serif font-bold text-[#141414]">Cooking Hub</h2>
          </Link>
          <h1 className="text-4xl font-serif font-bold text-[#141414] leading-tight mb-3">
            Welcome Back
          </h1>
          <p className="text-[#7B7B7B] font-medium">Continue your culinary journey with us.</p>
        </motion.div>

        {/* Auth Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Card className="border-none bg-white shadow-soft rounded-[32px] overflow-hidden">
            <CardHeader className="pt-10 pb-4 px-8">
              <CardTitle className="text-xl font-bold text-[#141414]">Log In</CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#7B7B7B] ml-1">Email Address</label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    className="h-14 px-6 rounded-[20px] border-[#E5E1D8] bg-[#F9F8F6] focus:bg-white focus:ring-[#FF6A1A]/20 transition-all font-medium text-[#141414]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#7B7B7B]">Password</label>
                    <button type="button" className="text-[10px] font-bold uppercase tracking-widest text-[#FF6A1A]">Forgot?</button>
                  </div>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-14 px-6 rounded-[20px] border-[#E5E1D8] bg-[#F9F8F6] focus:bg-white focus:ring-[#FF6A1A]/20 transition-all font-medium text-[#141414]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-16 rounded-[24px] bg-[#FF6A1A] hover:bg-[#E55A16] text-white font-bold text-lg shadow-lg shadow-[#FF6A1A]/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                >
                  {isLoading ? "Signing in..." : "Log In"}
                </Button>
              </form>

              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-[#E5E1D8]"></span>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] font-bold text-[#7B7B7B] bg-white px-4">
                  or continue with
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-14 rounded-[20px] border-[#E5E1D8] text-[#141414] font-bold gap-2 hover:bg-[#F9F8F6] transition-colors">
                  <Globe size={18} />
                  Google
                </Button>
                <Button variant="outline" className="h-14 rounded-[20px] border-[#E5E1D8] text-[#141414] font-bold gap-2 hover:bg-[#F9F8F6] transition-colors">
                  <Terminal size={18} />
                  GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-[#7B7B7B] font-medium">
            Don&apos;t have an account?{" "}
            <Link href="#" className="text-[#FF6A1A] font-bold hover:underline underline-offset-4">Sign Up</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
