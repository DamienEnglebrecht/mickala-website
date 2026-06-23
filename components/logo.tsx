import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center", className)}>
      <Image
        src="/logo-mickala.png"
        alt="Mickala Group"
        width={50}
        height={50}
        className="h-[50px] w-[50px]"
        priority
      />
    </span>
  )
}
