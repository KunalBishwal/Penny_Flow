// app/login/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signInWithPopup, User } from "firebase/auth";
import GoogleButton from "react-google-button";
import { motion } from "framer-motion";
import { Receipt } from "lucide-react";

import { auth, provider, signInWithEmailAndPassword } from "@/lib/firebase";
import { createUserIfNotExists } from "@/lib/firestore";
import { ThreeDCard } from "@/components/three-d-card";
import { AnimatedBackground } from "@/components/animated-background";
import PaperPlaneTransition from "@/components/PaperPlaneTransition";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  // --- Hooks
  const [authChecked, setAuthChecked] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1) Guard: wait for Firebase auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        router.replace("/");
      } else {
        setAuthChecked(true);
      }
    });
    return unsubscribe;
  }, [router]);

  // 2) Google login
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserIfNotExists(result.user.uid);
      toast({
        title: "Login successful",
        description: `Welcome, ${result.user.displayName}!`,
      });
      setTransitioning(true);
    } catch {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Google login failed.",
      });
      setIsLoading(false);
    }
  };

  // 3) Email/password login
  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await createUserIfNotExists(result.user.uid);
      toast({
        title: "Login successful",
        description: `Welcome, ${result.user.email}!`,
      });
      setTransitioning(true);
    } catch {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Email/password authentication failed.",
      });
      setIsLoading(false);
    }
  };

  // 4) After animation, go home
  const handleTransitionComplete = () => {
    router.replace("/");
  };

  // Don't render UI until we know auth state
  if (!authChecked) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      {/* animated background in a wrapper */}
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      {transitioning ? (
        <PaperPlaneTransition onComplete={handleTransitionComplete} />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md mx-auto"
        >
          <ThreeDCard className="backdrop-blur-xl bg-card/30 p-8 rounded-2xl border shadow-2xl flex flex-col items-center">
            <div className="mb-6 w-full text-center">
              <div className="flex justify-center items-center mb-2">
                <Receipt className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold gradient-text ml-2">
                  PennyFlow
                </h1>
              </div>
              <p className="text-muted-foreground">
                Sign in to track your expenses with AI.
              </p>
            </div>

            <form onSubmit={handleEmailPasswordLogin} className="w-full space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-muted-foreground"
                >
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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-muted-foreground"
                >
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

            <div className="my-4 w-full text-center text-muted-foreground">OR</div>

            <GoogleButton
              onClick={handleGoogleLogin}
              disabled={isLoading}
              style={{ width: "100%" }}
            />

            <div className="mt-6 w-full text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Want to know us more?
              </p>
              <Button
                variant="outline"
                className="w-full hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => router.push("/about")}
              >
                About PennyFlow
              </Button>
            </div>
          </ThreeDCard>
        </motion.div>
      )}
    </div>
  );
}
