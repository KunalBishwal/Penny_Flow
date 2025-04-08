"use client";

import { useEffect, useState, useRef } from "react";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  DollarSign,
  Percent,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ExpenseChart } from "@/components/expense-chart";
import { RecentTransactions } from "@/components/recent-transactions";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { ThreeDCard } from "@/components/three-d-card";
import { Footer } from "@/components/Footer";
import {
  getExpenses,
  getUserSettings,
  deleteExpense,
} from "@/lib/firestore";
import { getCurrencySymbol } from "@/lib/currency";
import { auth } from "@/lib/firebase";
import { sendBudgetAlertEmail } from "@/lib/mailService";

export default function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [userSettings, setUserSettings] = useState<any>(null);
  const [currency, setCurrency] = useState("USD ($)");
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [alertSent, setAlertSent] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [alertSent50, setAlertSent50] = useState(false);
  const [alertSent100, setAlertSent100] = useState(false);

  const user = auth.currentUser;
  const userId = user?.uid || "";
  const userEmail = user?.email || "";


  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      setCurrentDateTime(now.toLocaleString("en-US", options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auth Check
  useEffect(() => {
    const authenticated = sessionStorage.getItem("authenticated");
    if (authenticated === "true" && userId) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      setTimeout(() => {
        router.push("/login");
      }, 50);
    }
  }, [router, userId]);

  // GSAP Animation for header
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

  // Data Fetching from Firestore
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedExpenses = await getExpenses(userId);
        setExpenses(fetchedExpenses);

        const settings = await getUserSettings(userId);
        setUserSettings(settings);
        if (settings.currency) {
          setCurrency(settings.currency);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (isAuthenticated && userId) {
      fetchData();
    }
  }, [isAuthenticated, userId]);

  // Delete Handler for expenses
  const handleDeleteExpense = async (expenseId: string) => {
    try {
      await deleteExpense(userId, expenseId);
      setExpenses((prev) => prev.filter((exp) => exp.id !== expenseId));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };


  const totalSpent = expenses.reduce((acc, exp) => acc + (exp.amount || 0), 0);
  const budget = userSettings?.budget || 0;
  const budgetLeft = budget - totalSpent;
  const transactionCount = expenses.length;
  const budgetStatus =
    budget > 0 ? Math.min(Math.round((totalSpent / budget) * 100), 100) : 0;
  const symbol = getCurrencySymbol(currency);

  useEffect(() => {
    const sendAlert = async () => {
      if (userEmail && budget > 0) {
   
        if (budgetStatus >= 100 && !alertSent100) {
          const message = `Hi there,
  
  Just a heads-up! You've exceeded your monthly budget of ${currency} ${budget}. Time to pump the brakes on those expenses!
  
  Stay money-smart! 💸`;
          try {
            await sendBudgetAlertEmail(userEmail, budget, currency, message);
            console.log("✅ Budget alert email (100%) sent to", userEmail);
            setAlertSent100(true);
          } catch (err) {
            console.error("❌ Failed to send 100% budget alert email:", err);
          }
        }
      
        else if (budgetStatus >= 50 && budgetStatus < 100 && !alertSent50) {
          const message = "🚨 Heads up! You've used 50% of your budget.";
          try {
            await sendBudgetAlertEmail(userEmail, budget, currency, message);
            console.log("✅ Budget alert email (50%) sent to", userEmail);
            setAlertSent50(true);
          } catch (err) {
            console.error("❌ Failed to send 50% budget alert email:", err);
          }
        }
      }
    };
  
    sendAlert();
  }, [budgetStatus, budget, currency, userEmail, alertSent50, alertSent100]);
  


  // Build stats array dynamically (could be moved to a hook or API call)
  const stats = [
    {
      title: "Total Spent",
      value: `${symbol}${totalSpent.toFixed(2)}`,
      description: "This month",
      icon: DollarSign,
      change: budgetStatus > 100 ? "Over budget" : `${budgetStatus}% used`,
      changeType: totalSpent <= budget ? "increase" : "decrease",
    },
    {
      title: "Budget Left",
      value: `${symbol}${budgetLeft.toFixed(2)}`,
      description: "Remaining from monthly budget",
      icon: Wallet,
      change: budgetLeft > 0 ? "On track" : "Over budget",
      changeType: budgetLeft > 0 ? "increase" : "decrease",
    },
    {
      title: "Transactions",
      value: `${transactionCount}`,
      description: "This month",
      icon: CreditCard,
      change: transactionCount > 0 ? `+${transactionCount}` : "0",
      changeType: "increase",
    },
    {
      title: "Budget Status",
      value: `${budgetStatus}%`,
      description: "Utilization",
      icon: Percent,
      change: budgetStatus <= 100 ? "Within budget" : "Exceeded",
      changeType: budgetStatus <= 100 ? "increase" : "decrease",
    },
  ];

  if (isAuthenticated === null || isAuthenticated === false) return null;

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div ref={headerRef} className="flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-sf-pro gradient-text">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track your expenses and budget at a glance.
          </p>
        </div>
        <span className="text-xs sm:text-sm text-muted-foreground mt-2 sm:mt-0">
          {currentDateTime}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ThreeDCard>
              <Card className="border border-gray-200 dark:border-gray-700 bg-card/50 backdrop-blur-sm h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <ThreeDCard depth={20} sensitivity={5}>
            <Card className="border border-gray-200 dark:border-gray-700 bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle>Expense Trend</CardTitle>
                <CardDescription>Your spending over the last 30 days</CardDescription>
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
            <Card className="border border-gray-200 dark:border-gray-700 bg-card/50 backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle>Budget Status</CardTitle>
                <CardDescription>Monthly budget progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Overall Budget</span>
                      <span className="text-sm font-medium">
                        {budget > 0 ? `${symbol}${budget.toFixed(2)}` : "-"}
                      </span>
                    </div>
                    <Progress
                      value={budget > 0 ? budgetStatus : 0}
                      className="h-2"
                      style={{
                        background: "rgba(30, 30, 35, 0.5)",
                        boxShadow:
                          budgetStatus > 80
                            ? "0 0 10px rgba(239, 68, 68, 0.7)"
                            : "none",
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <ThreeDCard depth={15} sensitivity={3}>
          <Card className="border border-gray-200 dark:border-gray-700 bg-card/50 backdrop-blur-sm">
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
