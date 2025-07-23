'use client';

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface Props {
  value: number;          
}

export default function RoasGauge({ value }: Props) {
  const percent = Math.min(value, 999) / 10;   
  const chartData = [{ name: 'roas', uv: percent }];

  return (
    <Card className="bg-[#111827] border-[#2A2A2A] w-64">
      <CardHeader className="text-center text-sm text-[#9CA3AF] pb-0">
        Return on Ad Spend
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <div className="w-44 h-44">
          <ResponsiveContainer>
            <RadialBarChart
              innerRadius="75%"
              outerRadius="100%"
              data={chartData}
              startAngle={90}
              endAngle={-269}  
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                tick={false}
              />
              <RadialBar
                dataKey="uv"
                cornerRadius={50}
                fill="#FACC15"
                background={{ fill: '#1F2937' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <span className="mt-2 text-3xl font-semibold text-white">
          {value.toFixed(1)}%
        </span>
      </CardContent>
    </Card>
  );
}
