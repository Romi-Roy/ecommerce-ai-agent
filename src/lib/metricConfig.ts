export interface MetricConfig {
  header: string;
  valueType: 'currency' | 'percentage' | 'count' | 'decimal';
  format: string;
  visualization: 'gauge' | 'number_card';
  color: string;
  description?: string;
}

export const METRIC_CONFIGS: Record<string, MetricConfig> = {
  // Sales metrics
  total_sales: {
    header: 'Total Sales',
    valueType: 'currency',
    format: '$',
    visualization: 'number_card',
    color: '#10B981', // green
    description: 'Total revenue from all sales'
  },
  ad_sales: {
    header: 'Ad Sales',
    valueType: 'currency', 
    format: '$',
    visualization: 'number_card',
    color: '#10B981',
    description: 'Revenue generated from advertising'
  },
  
  // Cost metrics
  ad_spend: {
    header: 'Ad Spend',
    valueType: 'currency',
    format: '$', 
    visualization: 'number_card',
    color: '#EF4444', // red
    description: 'Total advertising costs'
  },
  cpc: {
    header: 'Cost Per Click', 
    valueType: 'currency',
    format: '$',
    visualization: 'number_card', 
    color: '#F59E0B', // amber
    description: 'Average cost for each click'
  },
  
  // Performance metrics  
  roas: {
    header: 'Return on Ad Spend',
    valueType: 'percentage',
    format: '%',
    visualization: 'gauge',
    color: '#FACC15', // yellow
    description: 'Revenue generated per dollar spent on ads'
  },
  
  // Volume metrics
  impressions: {
    header: 'Total Impressions',
    valueType: 'count', 
    format: '',
    visualization: 'number_card',
    color: '#8B5CF6', // purple
    description: 'Total number of ad views'
  },
  clicks: {
    header: 'Total Clicks',
    valueType: 'count',
    format: '',
    visualization: 'number_card', 
    color: '#06B6D4', // cyan
    description: 'Total number of ad clicks'
  },
  units_sold: {
    header: 'Units Sold',
    valueType: 'count',
    format: '',
    visualization: 'number_card',
    color: '#84CC16', // lime
    description: 'Total products sold'
  }
};

export function getMetricConfig(columnName: string): MetricConfig {
  // Direct match first
  if (METRIC_CONFIGS[columnName]) {
    return METRIC_CONFIGS[columnName];
  }
  
  // Fallback patterns for unknown metrics
  if (columnName.includes('sales') || columnName.includes('revenue')) {
    return {
      header: formatColumnName(columnName),
      valueType: 'currency',
      format: '$', 
      visualization: 'number_card',
      color: '#10B981'
    };
  }
  
  if (columnName.includes('spend') || columnName.includes('cost')) {
    return {
      header: formatColumnName(columnName),
      valueType: 'currency',
      format: '$',
      visualization: 'number_card', 
      color: '#EF4444'
    };
  }
  
  if (columnName.includes('roas') || columnName.includes('percentage') || columnName.includes('rate')) {
    return {
      header: formatColumnName(columnName),
      valueType: 'percentage',
      format: '%',
      visualization: 'gauge',
      color: '#FACC15'
    };
  }
  
  // Default fallback
  return {
    header: formatColumnName(columnName),
    valueType: 'decimal', 
    format: '',
    visualization: 'number_card',
    color: '#6B7280'
  };
}

function formatColumnName(name: string): string {
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}
