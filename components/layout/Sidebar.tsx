import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="app-surface h-fit rounded-2xl p-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Explore
        </p>

        <nav className="mt-3 flex flex-col gap-1">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-200 transition hover:bg-white/5 hover:text-white"
          >
            Home
          </Link>
        </nav>
      </div>

      <div className="my-4 h-px bg-white/10" />

      <div>
        <div className="flex items-center justify-between px-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Lounges
          </p>
        </div>

        <nav className="mt-3 flex flex-col gap-1">
          <Link
            href="/lounges/systems"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white"
          >
            <span className="h-2 w-2 rounded-full bg-neutral-600 transition group-hover:bg-[#c8102e]" />
            Systems
          </Link>

          <Link
            href="/lounges/cloud"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white"
          >
            <span className="h-2 w-2 rounded-full bg-neutral-600 transition group-hover:bg-[#c8102e]" />
            Cloud
          </Link>

          <Link
            href="/lounges/databases"
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-300 transition hover:bg-white/5 hover:text-white"
          >
            <span className="h-2 w-2 rounded-full bg-neutral-600 transition group-hover:bg-[#c8102e]" />
            Databases
          </Link>
        </nav>
      </div>
    </aside>
  )
}