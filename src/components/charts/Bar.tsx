"use client"
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

export default function BarMini({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#FACC15" />
        <YAxis stroke="#FACC15" />
        <Tooltip />
        <Bar dataKey="value" fill="#FACC15" radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
