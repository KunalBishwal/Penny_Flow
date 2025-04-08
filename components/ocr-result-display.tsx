"use client";

import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, isValid } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { GradientNotification } from "@/components/ui/gradient-notification";
import { extractExpenseDataFromGemini } from "@/lib/gemini";
import { Button } from "@/components/ui/button";

interface OcrResultDisplayProps {
  result: {
    fullText: string;
    extractedInfo: {
      date: string;
      amount: string;
      vendor: string;
      category?: string;
    };
  };
}

export function OcrResultDisplay({ result }: OcrResultDisplayProps) {
  const [date, setDate] = useState<Date | undefined>(
    result.extractedInfo.date ? new Date(result.extractedInfo.date) : undefined
  );
  const [amount, setAmount] = useState(result.extractedInfo.amount);
  const [vendor, setVendor] = useState(result.extractedInfo.vendor);
  const [category, setCategory] = useState(result.extractedInfo.category || "Food");
  const [loadingGemini, setLoadingGemini] = useState(false);
  const [parsedGeminiData, setParsedGeminiData] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    title: string;
    description: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const enrichWithGemini = async () => {
      setLoadingGemini(true);
      try {
        const enriched = await extractExpenseDataFromGemini(result.fullText);
        setLoadingGemini(false);
        if (enriched) {
          if (enriched.amount) setAmount(enriched.amount);
          if (enriched.vendor) setVendor(enriched.vendor);
          if (enriched.date) {
            const parsedDate = new Date(enriched.date);
            setDate(isValid(parsedDate) ? parsedDate : undefined);
          }
          if (enriched.category) setCategory(enriched.category);
          setParsedGeminiData(enriched);
        }
      } catch (error) {
        setLoadingGemini(false);
        console.error("Error enriching with Gemini:", error);
        setNotification({
          type: "error",
          title: "AI Enrichment Failed",
          description: "Failed to enhance OCR result with AI.",
        });
      }
    };

    enrichWithGemini();
  }, [result.fullText]);

  const saveExpense = async () => {
    if (!user) {
      setNotification({
        type: "error",
        title: "Not Logged In",
        description: "Please log in to save your expense.",
      });
      return;
    }

    if (!amount || !vendor || !date || !isValid(date)) {
      setNotification({
        type: "error",
        title: "Missing Info",
        description: "Please fill in all required fields.",
      });
      return;
    }

    try {
      await addDoc(collection(db, "users", user.uid, "expenses"), {
        vendor,
        amount: parseFloat(amount),
        date: date.toISOString(),
        category,
        createdAt: serverTimestamp(),
      });

      setNotification({
        type: "success",
        title: "Expense Saved",
        description: `${vendor} - $${amount}`,
      });

    } catch (err) {
      console.error("Save error:", err);
      setNotification({
        type: "error",
        title: "Error Saving",
        description: "Something went wrong. Try again.",
      });
    }
  };

  return (
    <>
      {notification && (
        <GradientNotification
          type={notification.type}
          title={notification.title}
          description={notification.description}
        />
      )}

      <div className="space-y-4">
        {loadingGemini && (
          <p className="text-sm italic text-muted-foreground">Analyzing receipt with AI...</p>
        )}

        <div className="space-y-2">
          <Label htmlFor="vendor">Vendor</Label>
          <Input
            id="vendor"
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            placeholder="Vendor name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="pl-8"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date || !isValid(date) ? "text-muted-foreground" : ""
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date && isValid(date) ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Food">Food</SelectItem>
              <SelectItem value="Transport">Transport</SelectItem>
              <SelectItem value="Shopping">Shopping</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Entertainment">Entertainment</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
          onClick={saveExpense}
        >
          Save Expense
        </Button>
      </div>
    </>
  );
}
