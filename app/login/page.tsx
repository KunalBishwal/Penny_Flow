"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { gsap } from "gsap"
import { Receipt, ArrowRight, User, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { AnimatedBackground } from "@/components/animated-background"

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Invalid credentials",
        description: "Please enter both email and password.",
      })
      return
    }
    
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      sessionStorage.setItem('authenticated', 'true')
      toast({
        title: "Login successful",
        description: "Welcome to ExpenseAI!",
      })
      router.push("/")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // 3D card tilt effect using GSAP for smoother animation
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      
      gsap.to(card, {
        duration: 0.3,
        transform: `perspective(1000px) rotateX(${deltaY * 0.05}deg) rotateY(${deltaX * 0.05}deg) scale(1.05)`,
        ease: 'power2.out'
      })
    }

    const handleLeave = () => {
      gsap.to(card, {
        duration: 0.5,
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        ease: 'power2.out'
      })
    }

    card.addEventListener('mousemove', handleMove)
    card.addEventListener('mouseleave', handleLeave)

    return () => {
      card.removeEventListener('mousemove', handleMove)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div 
          ref={cardRef}
          // Removed transition-transform to let GSAP manage transforms,
          // added default light blue border (border-blue-300).
          className="backdrop-blur-xl bg-card/30 p-8 rounded-2xl border border-blue-300 shadow-2xl hover:shadow-[0_0_15px_rgba(100,100,255,0.7)]"
        >
          <div className="mb-6 text-center">
            <div className="flex justify-center items-center mb-2">
              <Receipt className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-3xl font-bold font-sf-pro gradient-text">
                PennyFlow
              </h1>
            </div>
            <p className="text-muted-foreground">
              Sign in to track your expenses with AI
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  title="Remember me"
                  placeholder="Remember me"
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            
            <Button
              type="submit"
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
                  Sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </Button>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <a href="#" className="text-primary hover:underline">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
