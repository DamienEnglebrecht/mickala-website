import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo-mickala.png"
        alt="Mickala Group"
        width={60}
        height={60}
        className="h-[60px] w-[60px] object-contain"
        priority
      />
      <span className="font-heading text-lg font-extrabold leading-none tracking-tight">
        MICKALA
        <span className="ml-1 text-primary">GROUP</span>
      </span>
    </span>
  )
}
