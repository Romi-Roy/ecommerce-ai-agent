"use client"

import type { Message } from "@/types/chat" 
import { DataTable } from "@/components/data-table"
import RoasGauge from "@/components/charts/RoasGauge"  
import { format } from "date-fns"
import { Database, AlertCircle } from "lucide-react"
import MetricVisualization from "./charts/MetricVisualization"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] ${isUser ? "order-2" : "order-1"}`}>
        {/* Message bubble */}
        <div
          className={`px-4 py-3 rounded-xl ${
            isUser
              ? "bg-[#1F2937] text-[#D1D5DB] rounded-br-none"
              : message.isError
                ? "bg-[#7F1D1D] text-[#FCA5A5] rounded-bl-none border border-[#991B1B]"
                : "bg-[#111827] text-[#E5E7EB] rounded-bl-none"
          } shadow-lg`}
        >
          <div className={`${isUser ? "text-base" : "text-[1.05rem]"} leading-relaxed`}>
            {message.isError && <AlertCircle className="inline w-4 h-4 mr-2" />}
            {message.content}
          </div>
        </div>

        {/* SQL Query Display */}
        {!isUser && message.sql && (
          <div className="mt-3 bg-[#1E293B] rounded-xl p-4 shadow-lg border border-[#334155]">
            <div className="flex items-center mb-2">
              <Database className="w-4 h-4 mr-2 text-[#FACC15]" />
              <h4 className="text-sm font-semibold text-[#FACC15]">Generated SQL Query</h4>
            </div>
            <code className="text-sm text-[#10B981] font-mono bg-[#0F172A] p-3 rounded-lg block overflow-x-auto">
              {message.sql}
            </code>
          </div>
        )}

        {!isUser && message.results && message.results.length > 0 && (
          <div className="mt-3">
            {message.results.length === 1 && Object.keys(message.results[0]).length === 1 ? (
              <div className="flex justify-center">
                <MetricVisualization 
                  columnName={Object.keys(message.results[0])[0]}
                  value={Number(Object.values(message.results[0])[0])} 
                />
              </div>
            ) : (
              <div className="bg-[#111827] rounded-xl p-4 shadow-lg border border-[#2A2A2A]">
                <DataTable data={message.results} />
              </div>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div className={`text-xs text-[#6B7280] mt-1 ${isUser ? "text-right" : "text-left"}`}>
          {format(message.timestamp, "HH:mm")}
        </div>
      </div>
    </div>
  )
}
