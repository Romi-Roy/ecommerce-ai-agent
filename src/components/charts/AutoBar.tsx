'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type Props = { data: Record<string, unknown>[] };

export default function AutoBar({ data }: Props) {
  if (!data.length) return null;
  const [xKey, yKey] = Object.keys(data[0]);
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <BarChart data={data as any[]}>
          <XAxis dataKey={xKey} stroke="#FACC15" />
          <YAxis stroke="#FACC15" />
          <Tooltip />
          <Bar dataKey={yKey} fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
