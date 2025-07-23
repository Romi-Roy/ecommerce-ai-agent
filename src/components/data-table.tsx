"use client"

import { BarChart3, TrendingUp } from "lucide-react"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"

interface DataTableProps {
  data: Record<string, unknown>[]
}

export function DataTable({ data }: DataTableProps) {
  if (!data || data.length === 0) {
    return <div className="text-center py-4 text-[#6B7280]">No data to display</div>
  }

  const headers = Object.keys(data[0])
  const isNumericData = headers.some((header) =>
    data.some((row) => typeof row[header] === "number")
  )

  return (
    <div>
      <div className="flex items-center mb-3">
        {isNumericData ? (
          <TrendingUp className="w-4 h-4 mr-2 text-[#FACC15]" />
        ) : (
          <BarChart3 className="w-4 h-4 mr-2 text-[#FACC15]" />
        )}
        <h4 className="text-sm font-semibold text-white">
          Query Results ({data.length} {data.length === 1 ? "row" : "rows"})
        </h4>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full border border-[#374151] rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow className="bg-[#1F2937]">
              {headers.map((header) => (
                <TableHead
                  key={header}
                  className="border-b border-[#374151] px-4 py-3 text-left text-sm font-semibold text-[#FACC15] uppercase tracking-wider"
                >
                  {header.replace(/_/g, " ")}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-[#0F172A] divide-y divide-[#374151]">
            {data.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-[#1E293B] transition-colors">
                {headers.map((header) => (
                  <TableCell key={header} className="px-4 py-3 text-sm text-[#E5E7EB]">
                    {typeof row[header] === "number"
                      ? row[header]?.toLocaleString()
                      : String(row[header] ?? "N/A")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
