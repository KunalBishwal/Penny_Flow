"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Coffee, Download, Fuel, Search, ShoppingBag, Utensils, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ThreeDCard } from "@/components/three-d-card"

const transactions = [
  {
    id: "t1",
    name: "Starbucks",
    category: "Food",
    amount: -24.5,
    date: "Today, 10:30 AM",
    icon: Coffee,
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
  },
  {
    id: "t2",
    name: "Amazon",
    category: "Shopping",
    amount: -89.99,
    date: "Yesterday, 2:45 PM",
    icon: ShoppingBag,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    id: "t3",
    name: "Electric Bill",
    category: "Utilities",
    amount: -120.0,
    date: "Apr 20, 2025",
    icon: Zap,
    iconColor: "text-yellow-500",
    iconBg: "bg-yellow-500/10",
  },
  {
    id: "t4",
    name: "Gas Station",
    category: "Transport",
    amount: -45.75,
    date: "Apr 18, 2025",
    icon: Fuel,
    iconColor: "text-red-500",
    iconBg: "bg-red-500/10",
  },
  {
    id: "t5",
    name: "Restaurant",
    category: "Food",
    amount: -68.2,
    date: "Apr 15, 2025",
    icon: Utensils,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
  },
  {
    id: "t6",
    name: "Starbucks",
    category: "Food",
    amount: -18.75,
    date: "Apr 12, 2025",
    icon: Coffee,
    iconColor: "text-green-500",
    iconBg: "bg-green-500/10",
  },
  {
    id: "t7",
    name: "Grocery Store",
    category: "Food",
    amount: -125.4,
    date: "Apr 10, 2025",
    icon: ShoppingBag,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-500/10",
  },
  {
    id: "t8",
    name: "Movie Tickets",
    category: "Entertainment",
    amount: -32.5,
    date: "Apr 8, 2025",
    icon: Utensils,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-500/10",
  },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || transaction.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto py-6">
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
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
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
                        <div className="text-right font-medium">${Math.abs(transaction.amount).toFixed(2)}</div>
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
  )
}

