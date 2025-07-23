"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import AutoBar from "@/components/charts/AutoBar"; 

interface DataTableProps {
  data: Record<string, unknown>[];
}

export function DataTable({ data }: DataTableProps) {
  if (!Array.isArray(data) || data.length === 0)
    return (
      <div className="text-center py-4 text-[#6B7280]">No data to display</div>
    );

  const headers = Object.keys(data[0]);
  const showMiniChart =
    headers.length === 2 &&
    data.every((row) => typeof row[headers[1]] === "number") &&
    data.length <= 20; // keep it readable

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table className="min-w-full border border-[#374151] rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-[#1F2937]">
              {headers.map((h) => (
                <TableHead
                  key={h}
                  className="border-b border-[#374151] px-4 py-3 text-left text-sm font-semibold text-[#FACC15] uppercase tracking-wider"
                >
                  {h.replace(/_/g, " ")}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="bg-[#0F172A] divide-y divide-[#374151]">
            {data.map((row, idx) => (
              <TableRow
                key={idx}
                className="hover:bg-[#1E293B] transition-colors"
              >
                {headers.map((h) => (
                  <TableCell
                    key={h}
                    className="px-4 py-3 text-sm text-[#E5E7EB]"
                  >
                    {typeof row[h] === "number"
                      ? (row[h] as number).toLocaleString()
                      : String(row[h] ?? "N/A")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {showMiniChart && (
        <div className="mt-2">
          <AutoBar data={data} />
        </div>
      )}
    </div>
  );
}
