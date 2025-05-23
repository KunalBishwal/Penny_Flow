// app/page.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  DollarSign,
  Percent,
  Wallet,
} from "lucide-react";

import { auth } from "@/lib/firebase";
import { ThreeDCard } from "@/components/three-d-card";
import { ExpenseChart } from "@/components/expense-chart";
import { RecentTransactions } from "@/components/recent-transactions";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { useDashboardStats } from "@/hooks/useDashboardStats";

export default function Dashboard() {
  const router = useRouter();

  // ─── Auth State ─────────────────────────────────────────────
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // ─── Data & Actions (custom hook) ───────────────────────────
  const {
    expenses,
    budget,
    currency,
    totalSpent,
    budgetLeft,
    budgetStatus,
    transactionCount,
    symbol,
    handleDeleteExpense,
  } = useDashboardStats();

  // ─── UI State ───────────────────────────────────────────────
  const headerRef = useRef<HTMLDivElement>(null);
  const [currentDateTime, setCurrentDateTime] = useState("");

  // ─── 1) Listen for Firebase auth once ───────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setAuthChecked(true);
      } else {
        router.replace("/login");
      }
    });
    return unsubscribe;
  }, [router]);

  // ─── 2) Live clock ──────────────────────────────────────────
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDateTime(
        now.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  // ─── 3) GSAP header intro ───────────────────────────────────
  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, []);

  // ─── Build stats array ──────────────────────────────────────
  const stats = [
    {
      title: "Total Spent",
      value: `${symbol}${totalSpent.toFixed(2)}`,
      description: "This month",
      icon: DollarSign,
      change:
        budgetStatus > 100 ? "Over budget" : `${budgetStatus}% used`,
      changeType: totalSpent <= budget ? "increase" : "decrease",
    },
    {
      title: "Budget Left",
      value: `${symbol}${budgetLeft.toFixed(2)}`,
      description: "Remaining",
      icon: Wallet,
      change: budgetLeft > 0 ? "On track" : "Over budget",
      changeType: budgetLeft > 0 ? "increase" : "decrease",
    },
    {
      title: "Transactions",
      value: `${transactionCount}`,
      description: "This month",
      icon: CreditCard,
      change:
        transactionCount > 0 ? `+${transactionCount}` : "0",
      changeType: "increase",
    },
    {
      title: "Budget Status",
      value: `${budgetStatus}%`,
      description: "Utilization",
      icon: Percent,
      change:
        budgetStatus <= 100 ? "Within budget" : "Exceeded",
      changeType:
        budgetStatus <= 100 ? "increase" : "decrease",
    },
  ];

  // ─── now guard rendering ────────────────────────────────────
  if (!authChecked) return null;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div
        ref={headerRef}
        className="flex flex-col sm:flex-row items-center justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Track your expenses and budget at a glance.
          </p>
        </div>
        <span className="text-xs text-muted-foreground">
          {currentDateTime}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <ThreeDCard>
              <Card className="bg-card/50 backdrop-blur-sm h-full">
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  <div className="mt-2 flex items-center text-xs">
                    {stat.changeType === "increase" ? (
                      <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
                    )}
                    <span
                      className={
                        stat.changeType === "increase"
                          ? "text-green-500"
                          : "text-red-500"
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

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <ThreeDCard depth={20} sensitivity={5}>
            <Card className="bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle>Expense Trend</CardTitle>
                <CardDescription>
                  Your spending over the last 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ExpenseChart expenses={expenses} />
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
            <Card className="bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle>Budget Status</CardTitle>
                <CardDescription>Monthly progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Overall Budget</span>
                      <span className="text-sm">
                        {budget > 0
                          ? `${symbol}${budget.toFixed(2)}`
                          : "-"}
                      </span>
                    </div>
                    <Progress
                      value={budget > 0 ? budgetStatus : 0}
                      className="h-2"
                      style={{
                        background: "rgba(30,30,35,0.5)",
                        boxShadow:
                          budgetStatus > 80
                            ? "0 0 10px rgba(239,68,68,0.7)"
                            : undefined,
                      }}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{symbol}0</span>
                      <span>
                        {symbol}
                        {budget > 0
                          ? budget.toFixed(2)
                          : "-"}
                      </span>
                    </div>
                  </div>
                  <CategoryBreakdown expenses={expenses} />
                </div>
              </CardContent>
            </Card>
          </ThreeDCard>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <ThreeDCard depth={15} sensitivity={3}>
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentTransactions
                expenses={expenses}
                onDelete={handleDeleteExpense}
              />
            </CardContent>
          </Card>
        </ThreeDCard>
      </motion.div>

      <Footer />
    </div>
  );
}
