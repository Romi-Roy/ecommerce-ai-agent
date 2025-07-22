import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import db from '../lib/database';

/**
 * A record representing one CSV row.
 * Add or adjust fields as per your actual CSV headers.
 */
interface SampleRecord {
  date: string;
  item_id: string;
  eligibility?: string;
  message?: string;
  ad_sales?: string;
  impressions?: string;
  ad_spend?: string;
  clicks?: string;
  units_sold?: string;
  total_sales?: string;
  total_units_ordered?: string;
}

export function importSampleData(): void {
  try {
    const csvPath = path.join(process.cwd(), 'src/data/sample_data.csv');
    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    }) as SampleRecord[];

    console.log(`Importing ${records.length} records...`);

    const insertEligibility = db.prepare(`
      INSERT INTO product_eligibility
        (eligibility_datetime_utc, item_id, eligibility, message)
      VALUES (?, ?, ?, ?)`);
      
    const insertAdSales = db.prepare(`
      INSERT INTO ad_sales_metrics
        (date, item_id, ad_sales, impressions, ad_spend, clicks, units_sold)
      VALUES (?, ?, ?, ?, ?, ?, ?)`);
    const insertTotalSales = db.prepare(`
      INSERT INTO total_sales_metrics
        (date, item_id, total_sales, total_units_ordered)
      VALUES (?, ?, ?, ?)`);

    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const insertMany = db.transaction((recs: SampleRecord[]) => {
      for (const r of recs) {
        const itemId = parseInt(r.item_id, 10);

        // Eligibility
        if (r.eligibility !== undefined) {
            const eligibilityValue = r.eligibility === 'TRUE' ? 1 : 0;
            insertEligibility.run(
                now,
                itemId,
                eligibilityValue,
                r.message ?? null
            );
        }

        // Ad sales metrics
        if (r.ad_sales || r.impressions || r.ad_spend) {
          insertAdSales.run(
            r.date,
            itemId,
            parseFloat(r.ad_sales ?? '0'),
            parseInt(r.impressions ?? '0', 10),
            parseFloat(r.ad_spend ?? '0'),
            parseInt(r.clicks ?? '0', 10),
            parseInt(r.units_sold ?? '0', 10)
          );
        }

        // Total sales metrics
        if (r.total_sales || r.total_units_ordered) {
          insertTotalSales.run(
            r.date,
            itemId,
            parseFloat(r.total_sales ?? '0'),
            parseInt(r.total_units_ordered ?? '0', 10)
          );
        }
      }
    });

    insertMany(records);

    console.log('Sample data imported successfully!');
  } catch (err) {
    console.error('Error importing data:', err);
    throw err;
  }
}
