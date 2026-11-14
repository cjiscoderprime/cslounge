"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"


type Comment = {
  id: number
  content: string
  author: string
  createdAt: string
  votes: number
}

type PostInteractionsProps = {
  postId: number
  initialVotes: number
  initialCommentCount: number
  lounge: string
  author: string
  title: string
  content: string
}

export default function PostInteractions({
  postId,
  initialVotes,
  initialCommentCount,
  lounge,
  author,
  title,
  content,
}: PostInteractionsProps) {
  const router = useRouter()

  const [votes, setVotes] = useState(initialVotes)
  const [commentCount, setCommentCount] =
    useState(initialCommentCount)

  const [comments, setComments] = useState<Comment[]>([])
  const [commentContent, setCommentContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  async function loadComments() {
    try {
      const response = await fetch(
        `/api/posts/${postId}/comments`,
        {
          cache: "no-store",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to load comments")
      }

      const result = await response.json()

      setComments(result.data)
      setCommentCount(result.data.length)
    } catch (error) {
      console.error(error)
      setError("Failed to load comments")
    }
  }

  useEffect(() => {
    loadComments()
  }, [postId])

  useEffect(() => {
    setVotes(initialVotes)
    setCommentCount(initialCommentCount)
  }, [initialVotes, initialCommentCount])

  async function handleVote(value: 1 | -1) {
    try {
      setError("")

      const response = await fetch(
        `/api/posts/${postId}/vote`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to vote")
      }

      router.refresh()
    } catch (error) {
      console.error(error)
      setError("Failed to save vote")
    }
  }

  async function handleCommentVote(
    commentId: number,
    value: 1 | -1
  ) {
    try {
      setError("")

      const response = await fetch(
        `/api/comments/${commentId}/vote`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            value,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to vote")
      }

      await loadComments()
    } catch (error) {
      console.error(error)
      setError("Failed to vote on comment")
    }
  }

  async function handleCommentSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (!commentContent.trim()) {
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      const response = await fetch(
        `/api/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: commentContent,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to create comment")
      }

      setCommentContent("")

      await loadComments()

      router.refresh()
    } catch (error) {
      console.error(error)
      setError("Failed to post comment")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mt-8">

      {/* POST + POST VOTING */}
      <article
        className="
          rounded-2xl
          border border-[var(--border)]
          bg-[var(--surface)]
          p-8
        "
      >
        <div className="flex items-center gap-2 text-sm text-[var(--secondary)]">
          <Link
            href={`/lounges/${lounge.toLowerCase().replace(/\s+/g, "-")}`}
            className="
              font-medium
              text-[var(--accent)]
              hover:underline
            "
          >
            {lounge}
          </Link>

          <span>•</span>

          <span>
            Posted by{" "}
            <span className="font-medium text-[var(--foreground)]">
              {author}
            </span>
          </span>
        </div>

        <h1
          className="
            mt-6
            text-3xl
            font-bold
            tracking-tight
            text-[var(--foreground)]
          "
        >
          {title}
        </h1>

        <p
          className="
            mt-6
            whitespace-pre-wrap
            text-base
            leading-8
            text-[var(--secondary)]
          "
        >
          {content}
        </p>

        <div
          className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-3
            border-t
            border-[var(--border)]
            pt-5
          "
        >
          <button
            type="button"
            onClick={() => handleVote(1)}
            className="
              rounded-lg
              border border-[var(--border)]
              bg-[var(--surface-soft)]
              px-4 py-2
              text-sm
              text-[var(--foreground)]
              hover:border-green-500/50
              hover:bg-green-500/10
              hover:text-green-600
            "
          >
            ↑ Upvote
          </button>

          <span
            className="
              min-w-8
              text-center
              font-semibold
              text-[var(--foreground)]
            "
          >
            {votes}
          </span>

          <button
            type="button"
            onClick={() => handleVote(-1)}
            className="
              rounded-lg
              border border-[var(--border)]
              bg-[var(--surface-soft)]
              px-4 py-2
              text-sm
              text-[var(--foreground)]
              hover:border-rose-500/50
              hover:bg-rose-500/10
              hover:text-rose-600
            "
          >
            ↓ Downvote
          </button>

          <span className="ml-2 text-sm text-[var(--secondary)]">
            {commentCount}{" "}
            {commentCount === 1 ? "comment" : "comments"}
          </span>
        </div>
      </article>

      {/* COMMENT FORM */}
      <div
        className="
          mt-8
          rounded-2xl
          border border-[var(--border)]
          bg-[var(--surface)]
          p-6
        "
      >
        <h2
          className="
            text-xl
            font-semibold
            text-[var(--foreground)]
          "
        >
          Join the discussion
        </h2>

        <form
          onSubmit={handleCommentSubmit}
          className="mt-5"
        >
          <textarea
            value={commentContent}
            onChange={(event) =>
              setCommentContent(event.target.value)
            }
            placeholder="Write a comment..."
            rows={4}
            className="
              w-full
              resize-none
              rounded-xl
              border border-[var(--border)]
              bg-[var(--surface-soft)]
              p-4
              text-sm
              text-[var(--foreground)]
              placeholder:text-[var(--muted)]
            "
          />

          <div className="mt-3 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                rounded-lg
                bg-[var(--accent)]
                px-5 py-2.5
                text-sm
                font-semibold
                text-white
                hover:bg-[var(--accent-hover)]
                disabled:opacity-50
              "
            >
              {isSubmitting
                ? "Posting..."
                : "Post Comment"}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <p className="mt-4 text-sm text-[var(--accent)]">
          {error}
        </p>
      )}

      {/* COMMENTS */}
      <section className="mt-10">
        <h2
          className="
            text-2xl
            font-semibold
            text-[var(--foreground)]
          "
        >
          Comments
        </h2>

        {comments.length === 0 ? (
          <p className="mt-4 text-sm text-[var(--secondary)]">
            No comments yet. Start the discussion.
          </p>
        ) : (
          <div className="mt-5 flex flex-col gap-4">
            {comments.map((comment) => (
              <article
                key={comment.id}
                className="
                  rounded-2xl
                  border border-[var(--border)]
                  bg-[var(--surface)]
                  p-5
                "
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="
                      text-sm
                      font-semibold
                      text-[var(--accent)]
                    "
                  >
                    {comment.author}
                  </span>

                  <span className="text-xs text-[var(--muted)]">
                    {new Date(
                      comment.createdAt
                    ).toLocaleString()}
                  </span>
                </div>

                <p
                  className="
                    mt-3
                    whitespace-pre-wrap
                    text-sm
                    leading-6
                    text-[var(--secondary)]
                  "
                >
                  {comment.content}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleCommentVote(
                        comment.id,
                        1
                      )
                    }
                    className="
                      rounded-lg
                      border border-[var(--border)]
                      px-3 py-1.5
                      text-sm
                      text-[var(--secondary)]
                      hover:border-green-500/50
                      hover:bg-green-500/10
                      hover:text-green-600
                    "
                  >
                    ↑
                  </button>

                  <span
                    className="
                      min-w-5
                      text-center
                      text-sm
                      font-medium
                      text-[var(--foreground)]
                    "
                  >
                    {comment.votes}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      handleCommentVote(
                        comment.id,
                        -1
                      )
                    }
                    className="
                      rounded-lg
                      border border-[var(--border)]
                      px-3 py-1.5
                      text-sm
                      text-[var(--secondary)]
                      hover:border-rose-500/50
                      hover:bg-rose-500/10
                      hover:text-rose-600
                    "
                  >
                    ↓
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </section>
  )
}