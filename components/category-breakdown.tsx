"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

// Sample data
const data = [
  { name: "Food", value: 850, color: "#00f0ff" },
  { name: "Transport", value: 450, color: "#9f00ff" },
  { name: "Shopping", value: 650, color: "#ff00f0" },
  { name: "Bills", value: 500, color: "#0070f3" },
]

export function CategoryBreakdown() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Category Breakdown</h3>

      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${value}`, "Amount"]}
              contentStyle={{
                background: "rgba(30, 30, 35, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "0.5rem",
                color: "white",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {data.map((category) => (
          <div key={category.name} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: category.color }} />
            <div className="flex w-full justify-between text-xs">
              <span>{category.name}</span>
              <span>${category.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

