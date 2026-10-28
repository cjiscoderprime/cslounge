export default function RightSidebar() {
  const popularLounges = [
    "Web Development",
    "Systems",
    "Cloud",
    "AI / ML",
  ]

  return (
    <aside className="app-surface h-fit rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Trending
          </p>

          <h2 className="mt-1 text-base font-semibold text-white">
            Popular Lounges
          </h2>
        </div>

        <span className="rounded-full bg-[#c8102e]/15 px-2 py-1 text-xs font-medium text-[#e61d3f]">
          Live
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {popularLounges.map((lounge, index) => (
          <div
            key={lounge}
            className="group flex items-center gap-3 rounded-xl px-3 py-3 transition hover:bg-white/5"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/5 text-xs font-semibold text-neutral-500 transition group-hover:bg-[#c8102e]/15 group-hover:text-[#e61d3f]">
              {index + 1}
            </span>

            <div>
              <p className="text-sm font-medium text-neutral-300 transition group-hover:text-white">
                {lounge}
              </p>

              <p className="mt-0.5 text-xs text-neutral-600">
                Active discussions
              </p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}