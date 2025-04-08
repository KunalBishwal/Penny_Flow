"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Receipt, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AnimatedBackground } from "@/components/animated-background";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/lib/firebase";
import { createUserIfNotExists } from "@/lib/firestore";
import { ThreeDCard } from "@/components/three-d-card";
import PaperPlaneTransition from "@/components/PaperPlaneTransition";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // 🔐 Check if user is already logged in
  useEffect(() => {
    const authenticated = sessionStorage.getItem("authenticated");
    if (authenticated === "true") {
      router.push("/"); // 👈 Already logged in, redirect to dashboard
    } else {
      setIsAuthenticated(false); // Not authenticated, show login UI
    }
  }, [router]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);

      await createUserIfNotExists(result.user.uid);

      sessionStorage.setItem("authenticated", "true");

      toast({
        title: "Login successful",
        description: `Welcome, ${result.user.displayName}!`,
      });

      setTransitioning(true); // Trigger transition animation
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Google login failed.",
      });
      setIsLoading(false);
    }
  };

  const handleTransitionComplete = () => {
    router.push("/"); // Go to dashboard
  };

  // Don’t render anything until auth check is done
  if (isAuthenticated === null) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* ✨ Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* 🚀 Transition animation after login */}
      {transitioning ? (
        <PaperPlaneTransition onComplete={handleTransitionComplete} />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md mx-auto"
        >
          <ThreeDCard className="backdrop-blur-xl bg-card/30 p-8 rounded-2xl border border-blue-300 shadow-2xl hover:shadow-[0_0_15px_rgba(100,100,255,0.7)] flex flex-col items-center">
            <div className="mb-6 w-full text-center">
              <div className="flex justify-center items-center mb-2">
                <Receipt className="h-8 w-8 text-primary mr-2" />
                <h1 className="text-3xl font-bold font-sf-pro gradient-text">
                  PennyFlow
                </h1>
              </div>
              <p className="text-muted-foreground">
                Sign in with your Google account to track your expenses with AI.
              </p>
            </div>

            <div className="w-full space-y-6">
              <Button
                onClick={handleGoogleLogin}
                className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center">
                    Sign in with Google
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                )}
              </Button>
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Not a member? Learn more about PennyFlow{" "}
                </span>
                <a href="/about" className="text-primary hover:underline">
                  here
                </a>
              </div>
            </div>
          </ThreeDCard>
        </motion.div>
      )}
    </div>
  );
}
