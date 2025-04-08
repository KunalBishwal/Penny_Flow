"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ThreeDCard } from "@/components/three-d-card";
import { Download, Search } from "lucide-react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Import category icons from lucide-react
import { Utensils, ShoppingBag, Fuel, Zap, Film, Coffee } from "lucide-react";
const categoryIcons: Record<string, any> = {
  Food: Utensils,
  Shopping: ShoppingBag,
  Transport: Fuel,
  Utilities: Zap,
  Entertainment: Film,
  Coffee: Coffee,
};

type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  icon: any;
  iconColor: string;
  iconBg: string;
};

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      try {
        const expensesRef = collection(db, "users", user.uid, "expenses");
        const snapshot = await getDocs(expensesRef);
        const fetched: Transaction[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          // Use data.name if available; otherwise, fall back to data.category for filtering
          const name =
            typeof data.name === "string" && data.name.trim()
              ? data.name
              : typeof data.category === "string" && data.category.trim()
              ? data.category
              : "Uncategorized";
          const category =
            typeof data.category === "string" && data.category.trim()
              ? data.category
              : "Uncategorized";
          const amount = typeof data.amount === "number" ? data.amount : 0;
          const date = data.date
            ? new Date(data.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            : "Unknown Date";
          const icon = categoryIcons[category] || ShoppingBag;
          return {
            id: doc.id,
            name,
            category,
            amount,
            date,
            icon,
            iconColor: "text-blue-500",
            iconBg: "bg-blue-500/10",
          };
        });
        setTransactions(fetched);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Function to export filtered transactions as a PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transactions", 14, 20);
    const tableColumn = ["Name", "Category", "Amount (₹)", "Date"];
    const tableRows = filteredTransactions.map((tx) => [
      tx.name,
      tx.category,
      tx.amount.toFixed(2),
      tx.date,
    ]);
    // @ts-ignore autoTable is added by jspdf-autotable
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
    doc.save("transactions.pdf");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin h-8 w-8 border-4 border-muted border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-sf-pro">Transactions</h1>
          <p className="text-muted-foreground">View and manage your expense transactions.</p>
        </div>
        <ThreeDCard>
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>All Transactions</CardTitle>
                  <CardDescription>Showing {filteredTransactions.length} transactions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Coffee">Coffee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="flex items-center justify-between rounded-lg border border-border/50 p-4 hover:bg-card/80 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${transaction.iconBg}`}>
                          <transaction.icon className={`h-5 w-5 ${transaction.iconColor}`} />
                        </div>
                        <div>
                          <div className="font-medium">{transaction.name}</div>
                          <div className="text-xs text-muted-foreground">{transaction.date}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="hidden sm:inline-flex text-xs">
                          {transaction.category}
                        </Badge>
                        <div className="text-right font-medium">₹{Math.abs(transaction.amount).toFixed(2)}</div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed border-border">
                    <p className="text-muted-foreground">No transactions found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </ThreeDCard>
      </motion.div>
    </div>
  );
}
