"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface OcrResultDisplayProps {
  result: {
    fullText: string
    extractedInfo: {
      date: string
      amount: string
      vendor: string
    }
  }
}

export function OcrResultDisplay({ result }: OcrResultDisplayProps) {
  const [date, setDate] = useState<Date | undefined>(
    result.extractedInfo.date ? new Date(result.extractedInfo.date) : undefined,
  )
  const [amount, setAmount] = useState(result.extractedInfo.amount)
  const [vendor, setVendor] = useState(result.extractedInfo.vendor)
  const [category, setCategory] = useState("Food")

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="vendor">Vendor</Label>
        <Input id="vendor" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Vendor name" />
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
              className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select defaultValue={category} onValueChange={setCategory}>
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

      <Button className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90">
        Save Expense
      </Button>
    </div>
  )
}

