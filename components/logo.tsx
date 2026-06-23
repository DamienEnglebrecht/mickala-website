import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center", className)}>
      <Image
        src="/logo-mickala.png"
        alt="Mickala Group"
        width={180}
        height={48}
        className="h-9 w-auto"
        priority
      />
    </span>
  )
}
