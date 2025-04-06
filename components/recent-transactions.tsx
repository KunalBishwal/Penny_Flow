"use client"

import { motion } from "framer-motion"
import { Coffee, Fuel, ShoppingBag, Utensils, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

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
]

export function RecentTransactions() {
  return (
    <div className="space-y-4">
      {transactions.map((transaction, index) => (
        <motion.div
          key={transaction.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
          className="flex items-center justify-between rounded-lg border border-border/50 p-3 hover:bg-card/80 transition-colors"
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
            <Badge variant="outline" className="text-xs">
              {transaction.category}
            </Badge>
            <div className="text-right font-medium">${Math.abs(transaction.amount).toFixed(2)}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

