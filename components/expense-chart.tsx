"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Expense } from "@/types/expense";
import { ChartContainer } from "../components/chart-container";
import { ChartTooltip, ChartTooltipContent } from "../components/ChartTooltip";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

interface ExpenseChartProps {
  expenses: Expense[];
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  const expenseMap: Record<string, number> = {};

  expenses.forEach((exp) => {
    const dateStr = new Date(exp.date).toLocaleDateString("en-IN");
    expenseMap[dateStr] = (expenseMap[dateStr] || 0) + exp.amount;
  });

  const chartData = Object.entries(expenseMap)
    .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
    .map(([date, amount]) => ({ date, amount }));

  const fallbackData = [
    { date: "Jan", amount: 1200 },
    { date: "Feb", amount: 1800 },
    { date: "Mar", amount: 1400 },
    { date: "Apr", amount: 2450 },
  ];

  return (
    <ChartContainer
      config={{
        amount: {
          label: "Amount",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData.length ? chartData : fallbackData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickFormatter={(value) => formatINR(Number(value))}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
