"use client";

import { useState, useEffect } from "react";
import { ThreeDCard } from "@/components/three-d-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addExpense } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { useCurrency } from "@/lib/currency-context";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { GradientNotification } from "@/components/ui/gradient-notification";

const categories = [
  { value: "food", label: "Food" },
  { value: "transport", label: "Transport" },
  { value: "shopping", label: "Shopping" },
  { value: "utilities", label: "Utilities" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health" },
  { value: "education", label: "Education" },
  { value: "travel", label: "Travel" },
  { value: "other", label: "Other" },
];

export default function AddExpensePage() {
  const router = useRouter();
  const [date, setDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currency, setCurrency] = useState("₹");

  const [userId, setUserId] = useState<string>("");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !selectedCategory || !description) {
      setNotification({
        type: "error",
        title: "Missing information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (!userId) {
      setNotification({
        type: "error",
        title: "Not authenticated",
        description: "Please log in to add an expense.",
      });
      return;
    }

    const expenseData = {
      amount: parseFloat(amount),
      description,
      note,
      category: selectedCategory,
      date: date.toISOString(),
    };

    try {
      await addExpense(userId, expenseData);
      setNotification({
        type: "success",
        title: "Expense Added",
        description: `${currency}${amount} for ${description} has been added.`,
      });
      setAmount("");
      setDescription("");
      setNote("");
      setSelectedCategory(null);
    } catch (error) {
      setNotification({
        type: "error",
        title: "Error",
        description: "Failed to add expense. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      {notification && <GradientNotification {...notification} />}

      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-sf-pro">Add Expense</h1>
        <p className="text-muted-foreground">Manually add a new expense to your tracker.</p>
      </div>

      <div className="mx-auto max-w-md">
        <ThreeDCard>
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>New Expense</CardTitle>
              <CardDescription>Enter the details of your expense</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {currency}
                    </span>
                    <Input
                      id="amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="pl-8"
                      type="number"
                      step="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    title="Select category"
                    value={selectedCategory || ""}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What did you spend on?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={format(date, "yyyy-MM-dd")}
                    onChange={(e) => setDate(new Date(e.target.value))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="note">Note (Optional)</Label>
                  <Textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add any additional details"
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                >
                  Add Expense
                </Button>
              </CardFooter>
            </form>
          </Card>
        </ThreeDCard>
      </div>
    </div>
  );
}
