"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ThreeDCard } from "@/components/three-d-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react"; // Trash bin icon

export default function CurrencyConverterPage() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;

  const handleConvert = async () => {
    if (!amount) return;
    setIsLoading(true);
    try {
      // Fetch exchange rate first
      const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`);
      const data = await res.json();

      if (data.result === "success") {
        const conversionRate = data.conversion_rate;
        setResult(parseFloat(amount) * conversionRate);
      } else {
        console.error("Error:", data["error-type"]);
      }
    } catch (error) {
      console.error("Error converting currency", error);
    }
    setIsLoading(false);
  };

  // Clear function to reset amount and result
  const handleClear = () => {
    setResult(null);
    setAmount("");
  };

  return (
    <div className="container mx-auto py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ThreeDCard>
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm p-6">
            <CardHeader>
              <CardTitle>Currency Converter</CardTitle>
              <CardDescription>
                Convert currencies like a wizard – because every buck and rupee has a story!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromCurrency">From</Label>
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toCurrency">To</Label>
                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleConvert} disabled={isLoading || !amount}>
                {isLoading ? "Converting..." : "Convert"}
              </Button>
              <div className="mt-4">
                {result !== null && (
                  <div className="flex items-center justify-between">
                    <div className="mt-4 text-lg font-bold">
                      {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={handleClear}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                )}
                <Button onClick={() => router.back()} variant="secondary" className="mt-4">
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </ThreeDCard>
      </motion.div>
    </div>
  );
}
