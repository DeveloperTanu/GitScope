"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { EventTypeStat } from "@/types/analytics";

const tick = { fill: "var(--muted-foreground)", fontSize: 12 };

export default function ActivityBars({ data }: { data: EventTypeStat[] }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(160, data.length * 38)}>
      <BarChart data={data} layout="vertical" margin={{ left: 4, right: 16 }}>
        <CartesianGrid horizontal={false} stroke="var(--border)" />
        <XAxis type="number" allowDecimals={false} tick={tick} stroke="var(--border)" />
        <YAxis type="category" dataKey="label" width={104} tick={tick} stroke="var(--border)" />
        <Tooltip
          cursor={{ fill: "var(--muted)" }}
          contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }}
          labelStyle={{ color: "var(--foreground)" }}
        />
        <Bar dataKey="count" name="Events" fill="var(--accent)" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
