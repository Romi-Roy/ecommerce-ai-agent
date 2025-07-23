'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { MetricConfig } from '@/lib/metricConfig';
import { TrendingUp, DollarSign, Hash, Activity } from 'lucide-react';

interface Props {
  config: MetricConfig;
  value: number;
}

export function NumberCard({ config, value }: Props) {
  const formatValue = (val: number, cfg: MetricConfig): string => {
    switch (cfg.valueType) {
      case 'currency':
        return `${cfg.format}${val.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}`;
      case 'count':
        return val.toLocaleString();
      case 'percentage':
        return `${val.toFixed(1)}${cfg.format}`;
      case 'decimal':
        return val.toFixed(2);
      default:
        return val.toString();
    }
  };

  const getIcon = (valueType: string) => {
    switch (valueType) {
      case 'currency':
        return <DollarSign className="w-6 h-6" style={{ color: config.color }} />;
      case 'count':
        return <Hash className="w-6 h-6" style={{ color: config.color }} />;
      case 'percentage':
        return <TrendingUp className="w-6 h-6" style={{ color: config.color }} />;
      default:
        return <Activity className="w-6 h-6" style={{ color: config.color }} />;
    }
  };

  return (
    <Card className="bg-[#111827] border-[#2A2A2A] w-80">
      <CardHeader className="text-center pb-2">
        <div className="flex items-center justify-center space-x-2">
          {getIcon(config.valueType)}
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
        <div className="text-4xl font-bold text-white">
          {formatValue(value, config)}
        </div>
        
        <div className="mt-2 text-xs text-[#6B7280]">
          Current value
        </div>
      </CardContent>
    </Card>
  );
}