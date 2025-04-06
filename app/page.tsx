"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowDown, ArrowUp, CreditCard, DollarSign, Percent, Wallet } from "lucide-react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ExpenseChart } from "@/components/expense-chart"
import { RecentTransactions } from "@/components/recent-transactions"
import { CategoryBreakdown } from "@/components/category-breakdown"
import { ThreeDCard } from "@/components/three-d-card"

export default function Dashboard() {
  const [progress, setProgress] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)


  useEffect(() => {
  
    const checkAuth = () => {
      const authenticated = sessionStorage.getItem("authenticated")
      if (authenticated === "true") {
        setIsAuthenticated(true)
      } else {

        setIsAuthenticated(false)
        setTimeout(() => {
          router.push("/login")
        }, 50)
      }
    }

    checkAuth()
  }, [router])

  useEffect(() => {
    const timer = setTimeout(() => setProgress(68), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!headerRef.current) return

    gsap.from(headerRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
  }, [])

  const stats = [
    {
      title: "Total Spent",
      value: "$2,450",
      description: "This month",
      icon: DollarSign,
      change: "+12.5%",
      changeType: "increase",
    },
    {
      title: "Budget Left",
      value: "$1,150",
      description: "From $3,600",
      icon: Wallet,
      change: "32%",
      changeType: "neutral",
    },
    {
      title: "Transactions",
      value: "24",
      description: "This month",
      icon: CreditCard,
      change: "+3",
      changeType: "increase",
    },
    {
      title: "Savings",
      value: "$420",
      description: "From last month",
      icon: Percent,
      change: "+8.2%",
      changeType: "increase",
    },
  ]


  if (isAuthenticated === null || isAuthenticated === false) {
    return null
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div ref={headerRef} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-sf-pro gradient-text">Dashboard</h1>
          <p className="text-muted-foreground">Track your expenses and budget at a glance.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">April 2025</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ThreeDCard>
              <Card className="border border-border/50 bg-card/50 backdrop-blur-sm h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <div className="mt-2 flex items-center text-xs">
                    {stat.changeType === "increase" ? (
                      <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                    ) : stat.changeType === "decrease" ? (
                      <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                    ) : null}
                    <span
                      className={
                        stat.changeType === "increase"
                          ? "text-green-500"
                          : stat.changeType === "decrease"
                            ? "text-red-500"
                            : "text-muted-foreground"
                      }
                    >
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </ThreeDCard>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <ThreeDCard depth={20} sensitivity={5}>
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle>Expense Trend</CardTitle>
                <CardDescription>Your spending over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseChart />
              </CardContent>
            </Card>
          </ThreeDCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <ThreeDCard depth={20} sensitivity={5}>
            <Card className="border border-border/50 bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle>Budget Status</CardTitle>
                <CardDescription>Monthly budget progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Budget</span>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <Progress
                      value={progress}
                      className="h-2"
                      style={{
                        background: "rgba(30, 30, 35, 0.5)",
                        boxShadow: progress > 80 ? "0 0 10px rgba(239, 68, 68, 0.7)" : "none",
                      }}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>$0</span>
                      <span>$3,600</span>
                    </div>
                  </div>

                  <CategoryBreakdown />
                </div>
              </CardContent>
            </Card>
          </ThreeDCard>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <ThreeDCard depth={15} sensitivity={3}>
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </ThreeDCard>
      </motion.div>
    </div>
  )
}

