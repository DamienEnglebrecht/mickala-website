import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo-mickala.png"
        alt="Mickala Group"
        width={50}
        height={50}
        className="h-[50px] w-[50px] object-contain"
        priority
      />
      <span className="font-heading text-lg font-extrabold leading-none tracking-tight">
        MICKALA
        <span className="ml-1 text-primary">GROUP</span>
      </span>
    </span>
  )
}
