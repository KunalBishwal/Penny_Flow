// types/expense.ts
export interface Expense {
    id?: string;
    amount: number;
    description: string;
    category: string;
    date: string;
    note?: string;
  }
  