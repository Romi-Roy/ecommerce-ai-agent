export function SkeletonLoader() {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%]">
        <div className="px-4 py-3 rounded-xl bg-[#111827] rounded-bl-none shadow-lg">
          <div className="space-y-2">
            <div className="h-4 bg-[#1C1C1C] rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-[#1C1C1C] rounded animate-pulse w-1/2"></div>
            <div className="h-4 bg-[#1C1C1C] rounded animate-pulse w-5/6"></div>
          </div>
        </div>
        <div className="flex items-center mt-2 space-x-1">
          <div className="w-1 h-1 bg-[#FACC15] rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-[#FACC15] rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-1 h-1 bg-[#FACC15] rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  )
}
