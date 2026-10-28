import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="h-8 w-1 rounded-full bg-[#c8102e] transition-all group-hover:h-10" />

          <h2 className="text-xl font-bold tracking-tight text-white">
            CS
            <span className="text-[#c8102e]">
              Lounge
            </span>
          </h2>
        </Link>

        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-400">
            Developer Community
          </span>
        </div>

      </div>
    </nav>
  )
}