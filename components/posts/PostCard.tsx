type PostCardProps = {
  title: string
  author: string
  lounge: string
  votes: number
  comments: number
}

export default function PostCard({
  title,
  author,
  lounge,
  votes,
  comments,
}: PostCardProps) {
  return (
    <article className="feed-card group rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#c8102e]/40 hover:bg-white/[0.05]">
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <span className="rounded-full bg-[#c8102e]/10 px-2.5 py-1 font-medium text-[#e61d3f]">
          {lounge}
        </span>

        <span>•</span>

        <span>
          Posted by{" "}
          <span className="font-medium text-neutral-300">
            {author}
          </span>
        </span>
      </div>

      <h2 className="mt-4 text-xl font-semibold leading-snug text-white transition group-hover:text-neutral-100">
        {title}
      </h2>

      <div className="mt-5 flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-neutral-400 hover:border-[#c8102e]/40 hover:bg-[#c8102e]/10 hover:text-[#e61d3f]"
        >
          <span>▲</span>
          <span>{votes}</span>
        </button>

        <button
          type="button"
          className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-neutral-400 hover:bg-white/[0.06] hover:text-white"
        >
          {comments} Comments
        </button>
      </div>
    </article>
  )
}