export interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  sql?: string
  results?: Record<string, unknown>[]
  hasData?: boolean
  isError?: boolean
}
