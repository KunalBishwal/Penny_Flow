"use client"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const data = [
  { date: "Apr 01", amount: 120 },
  { date: "Apr 05", amount: 220 },
  { date: "Apr 10", amount: 180 },
  { date: "Apr 15", amount: 350 },
  { date: "Apr 20", amount: 290 },
  { date: "Apr 25", amount: 190 },
  { date: "Apr 30", amount: 270 },
]

export function ExpenseChart() {
  return (
    <ChartContainer
      config={{
        amount: {
          label: "Amount",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickFormatter={(value) => `$${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorAmount)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

