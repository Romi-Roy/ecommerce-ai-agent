export interface EligibilityRow {
  eligibility_datetime_utc: string;
  item_id: string;
  eligibility: string;
  message?: string;
}

export interface AdSalesRow {
  date: string;
  item_id: string;
  ad_sales: string;
  impressions: string;
  ad_spend: string;
  clicks: string;
  units_sold: string;
}

export interface TotalSalesRow {
  date: string;
  item_id: string;
  total_sales: string;
  total_units_ordered: string;
}
