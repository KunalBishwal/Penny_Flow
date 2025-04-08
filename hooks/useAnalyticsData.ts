// hooks/useAnalyticsData.ts
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { parseISO, format } from "date-fns";

// Define types for our analytics data
export type MonthlyData = {
  month: string;
  amount: number;
};

export type CategoryData = {
  name: string;
  value: number;
  color: string;
};

export type WeekdayData = {
  name: string;
  value: number;
};

export function useAnalyticsData(userId: string) {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [weekdayData, setWeekdayData] = useState<WeekdayData[]>([]);

  useEffect(() => {
    if (!userId) return;

    
    const expensesRef = collection(db, "users", userId, "expenses");
    const q = query(expensesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const expenses = snapshot.docs.map((doc) => doc.data());

      const monthlyMap: Record<string, number> = {};
      expenses.forEach((exp: any) => {
        if (exp.date) {
          const date = parseISO(exp.date);
          const month = format(date, "MMM");
          monthlyMap[month] = (monthlyMap[month] || 0) + exp.amount;
        }
      });
      const monthly = Object.entries(monthlyMap).map(([month, amount]) => ({
        month,
        amount,
      }));
      setMonthlyData(monthly);

      // Calculate category breakdown
      const categoryMap: Record<string, number> = {};
      expenses.forEach((exp: any) => {
        const cat = exp.category || "Other";
        categoryMap[cat] = (categoryMap[cat] || 0) + exp.amount;
      });
      const colorPalette = ["#00f0ff", "#9f00ff", "#ff00f0", "#0070f3", "#ff6f00", "#00e676"];
      const categories = Object.entries(categoryMap).map(([name, value], index) => ({
        name,
        value,
        color: colorPalette[index % colorPalette.length],
      }));
      setCategoryData(categories);

      // Calculate weekday spending
      const weekMap: Record<string, number> = {};
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      expenses.forEach((exp: any) => {
        if (exp.date) {
          const date = parseISO(exp.date);
          const day = days[date.getDay()];
          weekMap[day] = (weekMap[day] || 0) + exp.amount;
        }
      });
      const weekdays = days.map((day) => ({
        name: day,
        value: weekMap[day] || 0,
      }));
      setWeekdayData(weekdays);
    });

    return () => unsubscribe();
  }, [userId]);

  return { monthlyData, categoryData, weekdayData };
}
