// components/chart-container.tsx
import React from "react";

interface ChartContainerProps {
  children: React.ReactNode;
  config?: {
    [key: string]: {
      label: string;
      color?: string;
    };
  };
  className?: string;
}

export function ChartContainer({ children, config, className }: ChartContainerProps) {
  return (
    <div className={`bg-background rounded-lg border p-4 ${className}`}>
      {config && (
        <div className="mb-4 flex flex-wrap items-center gap-4">
          {Object.entries(config).map(([key, { label, color }]) => (
            <div key={key} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span
                className={`h-3 w-3 rounded-full ${color ? `bg-[${color}]` : "bg-[hsl(var(--primary))]"}`}
              />
              {label}
            </div>
          ))}
        </div>
      )}
      <div className="h-full w-full">{children}</div>
    </div>
  );
}
