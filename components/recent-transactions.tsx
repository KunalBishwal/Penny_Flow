"use client";

import React from "react";
import { Expense } from "@/types/expense";
import { Trash2 } from "lucide-react";

interface RecentTransactionsProps {
  expenses: Expense[];
  onDelete?: (id: string) => void;
}

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount);
}

export function RecentTransactions({ expenses, onDelete }: RecentTransactionsProps) {
  const recent = expenses.slice(0, 5);

  return (
    <div className="space-y-2">
      {recent.map((exp, index) => (
        <div
          key={exp.id ?? `${exp.description}-${index}`}
          className="flex justify-between items-center border-b pb-2 hover:bg-muted/30 px-2 rounded transition"
        >
          <div>
            <div className="font-medium">{exp.description}</div>
            <div className="text-xs text-muted-foreground">
              {new Date(exp.date).toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="font-bold">{formatINR(Math.abs(exp.amount))}</div>
            {onDelete && exp.id && (
              <button
                onClick={() => onDelete(exp.id!)}
                className="text-red-500 hover:text-red-700"
                title="Delete Transaction"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
