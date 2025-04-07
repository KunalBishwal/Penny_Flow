// components/expense-chart.tsx
"use client";

import React from "react";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { Expense } from "@/types/expense";

interface ExpenseChartProps {
  expenses: Expense[];
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  // Process the expenses to aggregate data for the chart.
  // For demo purposes, we'll use static data if expenses is empty.
  const data = expenses.length
    ? expenses.map((exp) => ({
        date: new Date(exp.date).toLocaleDateString(),
        amount: exp.amount,
      }))
    : [
        { date: "Jan", amount: 1200 },
        { date: "Feb", amount: 1800 },
        { date: "Mar", amount: 1400 },
        { date: "Apr", amount: 2450 },
      ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#00f0ff" />
      </BarChart>
    </ResponsiveContainer>
  );
}
