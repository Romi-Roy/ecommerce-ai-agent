'use client';

import { MetricConfig, getMetricConfig } from '@/lib/metricConfig';
import { NumberCard } from './NumberCard';
import RoasGuage from './RoasGauge';

interface Props {
  columnName: string;
  value: number;
}

export default function MetricVisualization({ columnName, value }: Props) {
  const config = getMetricConfig(columnName);
  
  if (config.visualization === 'gauge') {
    return <RoasGuage config={config} value={value} />;
  }
  
  return <NumberCard config={config} value={value} />;
}