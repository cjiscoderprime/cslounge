import Link from "next/link"

type PostCardProps = {
  id: number
  title: string
  author: string
  lounge: string
  votes: number
  comments: number
}

export default function PostCard({
  id,
  title,
  author,
  lounge,
  votes,
  comments,
}: PostCardProps) {
  return (
    <Link
      href={`/posts/${id}`}
      className="block"
    >
      <article className="feed-card rounded-2xl p-6">

        <div className="flex items-start justify-between gap-4">

          <div>
            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[var(--accent)]
              "
            >
              {lounge}
            </p>

            <h2
              className="
                mt-4
                text-xl
                font-semibold
                tracking-tight
                text-[var(--foreground)]
              "
            >
              {title}
            </h2>

            <p className="mt-2 text-sm text-[var(--secondary)]">
              Posted by{" "}
              <span className="font-medium text-[var(--accent)]">
                {author}
              </span>
            </p>
          </div>

          <span
            className="
              rounded-md
              bg-[var(--surface-soft)]
              px-2.5 py-1
              text-[11px]
              font-medium
              uppercase
              tracking-wide
              text-[var(--muted)]
            "
          >
            Post
          </span>

        </div>

        <div className="mt-5 flex items-center gap-3">

          <div
            className="
              rounded-lg
              border border-[var(--border)]
              bg-[var(--surface-soft)]
              px-3 py-2
              text-sm
              text-[var(--foreground)]
            "
          >
            ↑ {votes}
          </div>

          <div
            className="
              rounded-lg
              border border-[var(--border)]
              px-3 py-2
              text-sm
              text-[var(--secondary)]
            "
          >
            ◯ {comments}{" "}
            {comments === 1 ? "comment" : "comments"}
          </div>

        </div>

      </article>
    </Link>
  )
}