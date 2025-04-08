// hooks/useDashboardStats.ts
import { useEffect, useState } from "react";
import { getExpenses, getUserSettings, deleteExpense } from "@/lib/firestore";
import { getCurrencySymbol } from "@/lib/currency";
import { auth } from "@/lib/firebase";
import { sendBudgetAlertEmail } from "@/lib/mailService";

export const useDashboardStats = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [userSettings, setUserSettings] = useState<any>(null);
  const [currency, setCurrency] = useState("USD ($)");
  const [alertSent, setAlertSent] = useState(false);
  const user = auth.currentUser;
  const userId = user?.uid || "";
  const userEmail = user?.email || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpenses(userId);
        setExpenses(data);
        const settings = await getUserSettings(userId);
        setUserSettings(settings);
        if (settings.currency) setCurrency(settings.currency);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      }
    };

    if (userId) fetchData();
  }, [userId]);

  // Calculations
  const totalSpent = expenses.reduce((acc, exp) => acc + (exp.amount || 0), 0);
  const budget = userSettings?.budget || 0;
  const budgetLeft = budget - totalSpent;
  const budgetStatus = budget > 0 ? Math.min(Math.round((totalSpent / budget) * 100), 100) : 0;
  const transactionCount = expenses.length;
  const symbol = getCurrencySymbol(currency);

  // Email alert
  useEffect(() => {
    const triggerAlert = async () => {
      if (userEmail && budget > 0 && budgetStatus === 100 && !alertSent) {
        try {
          await sendBudgetAlertEmail(userEmail, budget, currency);
          setAlertSent(true);
        } catch (err) {
          console.error("Budget alert email failed:", err);
        }
      }
    };
    triggerAlert();
  }, [budgetStatus, budget, currency, userEmail, alertSent]);

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      await deleteExpense(userId, expenseId);
      setExpenses((prev) => prev.filter((e) => e.id !== expenseId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return {
    expenses,
    budget,
    currency,
    totalSpent,
    budgetLeft,
    budgetStatus,
    transactionCount,
    symbol,
    handleDeleteExpense,
  };
};
