'use client';

import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MetricConfig } from '@/lib/metricConfig';
import { TrendingUp } from 'lucide-react';

interface Props {
  config: MetricConfig;
  value: number;
}

export default function RoasGauge({ config, value }: Props) {
  // Smart scaling based on metric type and value
  const getGaugeData = (val: number, cfg: MetricConfig) => {
    let percent: number;
    let displayValue: string;
    
    if (cfg.valueType === 'percentage') {
      // For percentages, normalize to 0-100 scale
      if (val <= 100) {
        percent = val;
      } else {
        // For values > 100%, scale logarithmically to prevent overflow
        percent = Math.min(90, 50 + Math.log10(val - 100) * 10);
      }
      displayValue = `${val.toFixed(1)}${cfg.format}`;
    } else {
      // For other types, this shouldn't happen, but handle gracefully
      percent = Math.min(val / 10, 100);
      displayValue = val.toFixed(1);
    }
    
    return { percent, displayValue };
  };

  const { percent, displayValue } = getGaugeData(value, config);
  const chartData = [{ name: config.header.toLowerCase(), uv: percent }];

  // Color coding for performance ranges (for percentage metrics)
  const getGaugeColor = (val: number, cfg: MetricConfig): string => {
    if (cfg.valueType === 'percentage') {
      if (val >= 300) return '#10B981'; // green - excellent
      if (val >= 150) return '#FACC15'; // yellow - good  
      if (val >= 100) return '#F59E0B'; // amber - okay
      return '#EF4444'; // red - poor
    }
    return cfg.color;
  };

  return (
    <Card className="bg-[#111827] border-[#2A2A2A] w-80">
      <CardHeader className="text-center pb-2">
        <div className="flex items-center justify-center space-x-2">
          <TrendingUp className="w-5 h-5" style={{ color: config.color }} />
          <h3 className="text-sm font-medium text-[#9CA3AF]">
            {config.header}
          </h3>
        </div>
        {config.description && (
          <p className="text-xs text-[#6B7280] mt-1">
            {config.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex flex-col items-center">
        <div className="w-48 h-48">
          <ResponsiveContainer>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="90%"
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
                cornerRadius={8}
                fill={getGaugeColor(value, config)}
                background={{ fill: '#1F2937' }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center mt-2">
          <div className="text-4xl font-bold text-white">
            {displayValue}
          </div>
          
          {/* Performance indicator for RoAS */}
          {config.valueType === 'percentage' && (
            <div className={`text-sm mt-1 font-medium ${
              value >= 300 ? 'text-green-400' :
              value >= 150 ? 'text-yellow-400' :
              value >= 100 ? 'text-amber-400' :
              'text-red-400'
            }`}>
              {value >= 300 ? 'Excellent' :
               value >= 150 ? 'Good' :
               value >= 100 ? 'Break-even+' :
               'Below target'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}