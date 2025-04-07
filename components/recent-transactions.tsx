// components/recent-transactions.tsx
"use client";

import React from "react";
import { Expense } from "@/types/expense";

interface RecentTransactionsProps {
  expenses: Expense[];
}

export function RecentTransactions({ expenses }: RecentTransactionsProps) {
  // For demo, simply list the most recent 5 transactions
  const recent = expenses.slice(0, 5);

  return (
    <div className="space-y-2">
      {recent.map((exp) => (
        <div key={exp.id} className="flex justify-between border-b pb-2">
          <div>
            <div className="font-medium">{exp.description}</div>
            <div className="text-xs text-muted-foreground">{new Date(exp.date).toLocaleString()}</div>
          </div>
          <div className="font-bold">${Math.abs(exp.amount).toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
