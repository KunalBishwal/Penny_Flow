"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import GoogleButton from "react-google-button";
import { Receipt } from "lucide-react";

import { ThreeDCard } from "@/components/three-d-card";
import { AnimatedBackground } from "@/components/animated-background";
import PaperPlaneTransition from "@/components/PaperPlaneTransition";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { auth, provider, signInWithEmailAndPassword } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { createUserIfNotExists } from "@/lib/firestore";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const authenticated = sessionStorage.getItem("authenticated");
    if (authenticated === "true") {
      router.push("/");
    } else {
      setIsAuthenticated(false);
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
      setTransitioning(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Google login failed.",
      });
      setIsLoading(false);
    }
  };

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await createUserIfNotExists(result.user.uid);
      sessionStorage.setItem("authenticated", "true");
      toast({
        title: "Login successful",
        description: `Welcome, ${result.user.email}!`,
      });
      setTransitioning(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Email/password authentication failed.",
      });
      setIsLoading(false);
    }
  };

  const handleTransitionComplete = () => {
    router.push("/");
  };

  if (isAuthenticated === null) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* Transition Animation after login */}
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
                <Receipt className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-sf-pro gradient-text ml-2">
                  PennyFlow
                </h1>
              </div>
              <p className="text-muted-foreground">
                Sign in to track your expenses with AI.
              </p>
            </div>

            <form onSubmit={handleEmailPasswordLogin} className="w-full space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                  placeholder="********"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Logging in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="my-4 w-full text-center text-muted-foreground">
              OR
            </div>

            <GoogleButton
              onClick={handleGoogleLogin}
              disabled={isLoading}
              style={{ width: "100%" }}
            />
          </ThreeDCard>
        </motion.div>
      )}
    </div>
  );
}
