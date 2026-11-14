import Link from "next/link"

type Lounge = {
  id: number
  name: string
  slug: string
}

export default async function RightSidebar() {
  const response = await fetch(
    "http://localhost:8080/lounges",
    {
      cache: "no-store",
    }
  )

  if (!response.ok) {
    return null
  }

  const lounges: Lounge[] = await response.json()

  const displayedLounges = lounges.slice(0, 5)

  return (
    <aside
      className="
        self-start
        h-fit
        rounded-2xl
        border border-[var(--border)]
        bg-[var(--surface)]
        p-6
      "
    >
      <div className="flex items-center justify-between">
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[var(--secondary)]
          "
        >
          Trending lounges
        </p>

        <span
          className="
            rounded-full
            bg-[var(--accent-soft)]
            px-3 py-1
            text-xs
            font-medium
            text-[var(--accent)]
          "
        >
          Live
        </span>
      </div>

      <div className="mt-6 space-y-5">
        {displayedLounges.map((lounge, index) => (
          <Link
            key={lounge.id}
            href={`/lounges/${lounge.slug}`}
            className="
              flex
              items-start
              gap-4
              rounded-xl
              p-2
              transition
              hover:bg-[var(--surface-soft)]
            "
          >
            <span
              className="
                mt-0.5
                text-sm
                font-medium
                text-[var(--accent)]
              "
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <p
                className="
                  font-medium
                  text-[var(--foreground)]
                "
              >
                {lounge.name}
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  text-[var(--secondary)]
                "
              >
                Active discussions
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  )
}