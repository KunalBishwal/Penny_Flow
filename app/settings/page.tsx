// app/settings/page.tsx

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ThreeDCard } from "@/components/three-d-card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { updateBudget } from "@/lib/firestore";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { GradientNotification } from "@/components/ui/gradient-notification";

export default function SettingsPage() {
  const [budgetAmount, setBudgetAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [userId, setUserId] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; title: string; description: string } | null>(null);

  useEffect(() => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      setUserId(uid);
      const fetchUserSettings = async () => {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setBudgetAmount(data.budget?.toString() || "");
          setCurrency(data.currency || "");
        } else {
          console.error("User doc doesn't exist.");
        }
      };
      fetchUserSettings();
    }
  }, []);

  const handleSaveBudget = async () => {
    try {
      await updateBudget(userId, {
        budget: parseFloat(budgetAmount),
        currency,
      });
      setNotification({
        type: "success",
        title: "Budget Updated",
        description: `Monthly budget set to ${currency} ${budgetAmount}`,
      });
    } catch {
      setNotification({
        type: "error",
        title: "Error",
        description: "Failed to update budget.",
      });
    }
  };

  const getCurrencySymbol = () => {
    if (currency.includes("USD")) return "$";
    if (currency.includes("INR")) return "₹";
    if (currency.includes("EUR")) return "€";
    if (currency.includes("GBP")) return "£";
    if (currency.includes("JPY")) return "¥";
    return "$";
  };

  return (
    <div className="container mx-auto py-6">
      {notification && <GradientNotification {...notification} />}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-sf-pro">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>

        <Tabs defaultValue="budget" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="appearance">Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="budget" className="space-y-6">
            <ThreeDCard>
              <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Budget Settings</CardTitle>
                  <CardDescription>Set your monthly budget and currency</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Monthly Budget</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {getCurrencySymbol()}
                      </span>
                      <Input id="budget" value={budgetAmount} onChange={(e) => setBudgetAmount(e.target.value)} className="pl-8" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD ($)">USD ($)</SelectItem>
                        <SelectItem value="INR (₹)">INR (₹)</SelectItem>
                        <SelectItem value="EUR (€)">EUR (€)</SelectItem>
                        <SelectItem value="GBP (£)">GBP (£)</SelectItem>
                        <SelectItem value="JPY (¥)">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleSaveBudget}
                    className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                  >
                    Save Budget Settings
                  </Button>
                </CardFooter>
              </Card>
            </ThreeDCard>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
