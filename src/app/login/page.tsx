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
    // Simulate login
    setTimeout(() => {
      window.location.href = "/home";
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f9d7d7] overflow-hidden relative p-6 font-inter">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-white/30 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[40%] bg-white/20 blur-[100px] rounded-full" 
        />
      </div>

      <div className="flex-1 flex flex-col justify-center relative z-10 max-w-sm mx-auto w-full">
        {/* Logo Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#ff6b6b] mb-4 shadow-xl shadow-pink-200/50 overflow-hidden">
            <img src="/illustration.png" alt="Logo" className="w-full h-full object-cover scale-150" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-900 font-outfit">
            Welcome Back
          </h1>
          <p className="text-zinc-500 font-medium">Continue your culinary journey</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="border-none bg-white/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[40px] overflow-hidden">
            <CardHeader className="pt-10 pb-4 text-center">
              <CardTitle className="text-2xl font-black font-outfit text-zinc-900">Log In</CardTitle>
              <CardDescription className="text-zinc-400 font-medium">
                Enter your credentials to access your kitchen
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#ff6b6b] transition-colors">
                      <Mail size={18} />
                    </div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="h-14 pl-14 pr-5 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:ring-[#ff6b6b]/20 focus:border-[#ff6b6b]/50 transition-all font-medium text-zinc-900"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#ff6b6b] transition-colors">
                      <Lock size={18} />
                    </div>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="h-14 pl-14 pr-5 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:ring-[#ff6b6b]/20 focus:border-[#ff6b6b]/50 transition-all font-medium text-zinc-900"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button type="button" className="text-xs font-bold text-[#ff6b6b] hover:text-[#ff5252] transition-colors">
                      Forgot Password?
                    </button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-15 rounded-2xl bg-[#ff6b6b] hover:bg-[#ff5252] text-white font-black text-lg shadow-lg shadow-[#ff6b6b]/20 transition-all active:scale-95 flex items-center justify-center gap-2 group mt-2"
                >
                  {isLoading ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-100"></span>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-black text-zinc-300 bg-white px-4">
                  Or continue with
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-14 rounded-2xl border-zinc-100 bg-white hover:bg-zinc-50 font-bold gap-2 shadow-sm text-zinc-600 transition-all hover:scale-[1.02]">
                  <Globe size={18} className="text-zinc-400" />
                  Google
                </Button>
                <Button variant="outline" className="h-14 rounded-2xl border-zinc-100 bg-white hover:bg-zinc-50 font-bold gap-2 shadow-sm text-zinc-600 transition-all hover:scale-[1.02]">
                  <Terminal size={18} className="text-zinc-400" />
                  GitHub
                </Button>
              </div>
            </CardContent>
            <CardFooter className="pb-10 justify-center">
              <p className="text-sm text-zinc-400 font-medium">
                New here?{" "}
                <Link href="/" className="text-[#ff6b6b] font-black hover:underline underline-offset-4">
                  Create account
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 text-center text-zinc-400 text-[10px] font-bold uppercase tracking-wider leading-relaxed"
        >
          By continuing, you agree to our <br/>
          <span className="underline cursor-pointer text-zinc-500">Terms of Service</span> and <span className="underline cursor-pointer text-zinc-500">Privacy Policy</span>
        </motion.div>
      </div>
    </div>
  );
}
