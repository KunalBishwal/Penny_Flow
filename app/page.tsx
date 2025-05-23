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
import { getExpenses, getUserSettings, deleteExpense } from "@/lib/firestore";
import { getCurrencySymbol } from "@/lib/currency";
import { sendBudgetAlertEmail } from "@/lib/mailService";

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

export default function Dashboard() {
  const router = useRouter();

  // ─── Auth State ─────────────────────────────────────────────
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

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

  // ─── Data & UI State ────────────────────────────────────────
  const [expenses, setExpenses] = useState<any[]>([]);
  const [userSettings, setUserSettings] = useState<any>(null);
  const [currency, setCurrency] = useState("USD ($)");
  const [alertSent50, setAlertSent50] = useState(false);
  const [alertSent100, setAlertSent100] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const headerRef = useRef<HTMLDivElement>(null);

  const userId = user?.uid || "";
  const userEmail = user?.email || "";

  // ─── Fetch Data ─────────────────────────────────────────────
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const fetched = await getExpenses(userId);
        setExpenses(fetched);
        const settings = await getUserSettings(userId);
        setUserSettings(settings);
        if (settings.currency) setCurrency(settings.currency);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [userId]);

  // ─── Live Clock ─────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      setCurrentDateTime(
        new Date().toLocaleString("en-US", {
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  // ─── Header Animation ───────────────────────────────────────
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

  // ─── Delete Expense ─────────────────────────────────────────
  const handleDeleteExpense = async (expenseId: string) => {
    try {
      await deleteExpense(userId, expenseId);
      setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    } catch (err) {
      console.error(err);
    }
  };

  // ─── Stats Calculations ─────────────────────────────────────
  const totalSpent = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const budget = userSettings?.budget || 0;
  const budgetLeft = budget - totalSpent;
  const budgetStatus =
    budget > 0
      ? Math.min(Math.round((totalSpent / budget) * 100), 100)
      : 0;
  const transactionCount = expenses.length;
  const symbol = getCurrencySymbol(currency);

  // ─── Budget Alert Emails ────────────────────────────────────
  useEffect(() => {
    if (!userEmail || budget <= 0) return;
    (async () => {
      if (budgetStatus >= 100 && !alertSent100) {
        try {
          await sendBudgetAlertEmail(
            userEmail,
            budget,
            currency,
            `Hi there,\n\nYou've exceeded your monthly budget of ${currency} ${budget}!`
          );
          setAlertSent100(true);
        } catch (err) {
          console.error(err);
        }
      } else if (budgetStatus >= 50 && !alertSent50) {
        try {
          await sendBudgetAlertEmail(
            userEmail,
            budget,
            currency,
            `🚨 You've used 50% of your budget (${currency} ${(
              budget *
              0.5
            ).toFixed(2)}).`
          );
          setAlertSent50(true);
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [budgetStatus, budget, currency, userEmail, alertSent50, alertSent100]);

  // ─── Build Stats Array ──────────────────────────────────────
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

  // ─── Auth Guard ─────────────────────────────────────────────
  if (!authChecked) return null;

  // ─── Render ────────────────────────────────────────────────
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
                <CardHeader className="flex justify-between pb-2">
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

      {/* Expense Trend & Budget Status */}
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
                <CardDescription>Monthly budget progress</CardDescription>
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
                        {budget > 0 ? budget.toFixed(2) : "-"}
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

      {/* Currency Converter Card */}
      <motion.div
        initial={{ opacity: 0, x: 100, rotate: 180 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-1 sm:col-span-2 lg:col-span-1"
      >
        <ThreeDCard depth={15} sensitivity={3}>
          <Card className="bg-card/50 backdrop-blur-sm p-4">
            <CardHeader>
              <CardTitle>Currency Converter</CardTitle>
              <CardDescription>
                Convert currencies – because money talks and conversions should too!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ready to make your money speak a new language? Click below!
              </p>
              <Button
                onClick={() => router.push("/CurrencyConverter")}
                className="mt-4 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
              >
                Go Convert!
              </Button>
            </CardContent>
          </Card>
        </ThreeDCard>
      </motion.div>

      <Footer />
    </div>
  );
}
