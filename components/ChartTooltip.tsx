// components/chart-tooltip.tsx
import { TooltipProps } from "recharts";
import React from "react";

export function ChartTooltip({ content }: { content: React.ReactElement }) {
  return <>{content}</>;
}

export function ChartTooltipContent({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-md border bg-popover px-3 py-2 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-2">
          <span className="text-[0.8rem] capitalize text-muted-foreground">{entry.name}</span>
          <span className="text-sm font-medium text-foreground">${entry.value}</span>
        </div>
      ))}
    </div>
  );
}
