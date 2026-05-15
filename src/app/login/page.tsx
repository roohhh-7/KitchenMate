"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, Mail, Lock, ArrowRight, Globe, Terminal } from "lucide-react";
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
    <div className="flex-1 flex flex-col min-h-screen bg-[#fcfbf9] overflow-hidden relative p-6">
      {/* Dynamic Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[80%] h-[50%] bg-orange-100/40 blur-[100px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, -45, 0],
            x: [0, -30, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[40%] bg-zinc-200/40 blur-[100px] rounded-full" 
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
          <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-white mb-4 shadow-xl shadow-zinc-900/10">
            <ChefHat size={32} className="text-orange-500" />
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
          <Card className="border-zinc-200/50 bg-white/70 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[32px] overflow-hidden border-none">
            <CardHeader className="pt-8 pb-4">
              <CardTitle className="text-xl font-bold font-outfit">Log In</CardTitle>
              <CardDescription className="text-zinc-500 font-medium">
                Enter your credentials to access your kitchen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors">
                      <Mail size={18} />
                    </div>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="h-14 pl-12 pr-4 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:ring-orange-500/20 focus:border-orange-500/50 transition-all font-medium"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-500 transition-colors">
                      <Lock size={18} />
                    </div>
                    <Input
                      type="password"
                      placeholder="Password"
                      className="h-14 pl-12 pr-4 rounded-2xl border-zinc-100 bg-zinc-50/50 focus:bg-white focus:ring-orange-500/20 focus:border-orange-500/50 transition-all font-medium"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button type="button" className="text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                      Forgot Password?
                    </button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full h-14 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-lg shadow-lg shadow-zinc-900/10 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-100"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-4 text-zinc-400 font-bold tracking-widest">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-14 rounded-2xl border-zinc-100 bg-white hover:bg-zinc-50 font-semibold gap-2 shadow-sm">
                  <Globe size={18} className="text-zinc-600" />
                  Google
                </Button>
                <Button variant="outline" className="h-14 rounded-2xl border-zinc-100 bg-white hover:bg-zinc-50 font-semibold gap-2 shadow-sm">
                  <Terminal size={18} className="text-zinc-600" />
                  GitHub
                </Button>
              </div>
            </CardContent>
            <CardFooter className="pb-8 justify-center">
              <p className="text-sm text-zinc-500 font-medium">
                Don&apos;t have an account?{" "}
                <Link href="#" className="text-orange-600 font-bold hover:underline underline-offset-4">
                  Create one
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-8 text-center text-zinc-400 text-xs font-medium"
        >
          By continuing, you agree to our <br/>
          <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>
        </motion.div>
      </div>
    </div>
  );
}
