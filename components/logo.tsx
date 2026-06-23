import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className="flex h-9 w-9 items-center justify-center rounded-md bg-primary"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none">
          <path d="M12 21V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M6 21h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <rect x="6" y="3" width="12" height="4" rx="1" fill="currentColor" />
          <path d="M4 9.5l3-1M20 9.5l-3-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-heading text-base font-extrabold tracking-tight text-foreground">
          MICKALA
        </span>
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
          GROUP
        </span>
      </span>
    </span>
  )
}
