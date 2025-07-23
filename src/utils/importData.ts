import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import db from '../lib/database';
import {
  EligibilityRow, AdSalesRow, TotalSalesRow
} from '../types/data-row-models';

function loadCsv<T>(fileName: string): T[] {
  const csvPath = path.join(process.cwd(), 'src/data', fileName);
  const csv = fs.readFileSync(csvPath, 'utf8');
  return parse(csv, { columns: true, skip_empty_lines: true }) as T[];
}

export function importData(): void {
  const eligRows  = loadCsv<EligibilityRow>('product_eligibility.csv');
  const adRows    = loadCsv<AdSalesRow>('ad_sales_metrics.csv');
  const totalRows = loadCsv<TotalSalesRow>('total_sales_metrics.csv');

  console.log(
    `Importing: elig ${eligRows.length}, ads ${adRows.length}, totals ${totalRows.length}`
  );

  const stmtElig = db.prepare(`
    INSERT INTO product_eligibility
      (eligibility_datetime_utc, item_id, eligibility, message)
    VALUES (?, ?, ?, ?)`);

  const stmtAds = db.prepare(`
    INSERT INTO ad_sales_metrics
      (date, item_id, ad_sales, impressions, ad_spend, clicks, units_sold)
    VALUES (?, ?, ?, ?, ?, ?, ?)`);

  const stmtTotal = db.prepare(`
    INSERT INTO total_sales_metrics
      (date, item_id, total_sales, total_units_ordered)
    VALUES (?, ?, ?, ?)`);

  db.transaction(() => {
    // 3.1 Eligibility
    for (const r of eligRows) {
      stmtElig.run(
        r.eligibility_datetime_utc,
        parseInt(r.item_id, 10),
        r.eligibility === 'TRUE' ? 1 : 0,
        r.message ?? null
      );
    }

    // 3.2 Ad sales
    for (const r of adRows) {
      stmtAds.run(
        r.date,
        parseInt(r.item_id, 10),
        parseFloat(r.ad_sales),
        parseInt(r.impressions, 10),
        parseFloat(r.ad_spend),
        parseInt(r.clicks, 10),
        parseInt(r.units_sold, 10)
      );
    }

    // 3.3 Total sales
    for (const r of totalRows) {
      stmtTotal.run(
        r.date,
        parseInt(r.item_id, 10),
        parseFloat(r.total_sales),
        parseInt(r.total_units_ordered, 10)
      );
    }
  })();

  console.log('CSV import complete.');
}