"use client"

import Link from "next/link"
import { useState } from "react"

type Comment = {
  id: number
  postId: number
  content: string
  author: string
  createdAt: string
  votes: number
}

type MyCommentsProps = {
  comments: Comment[]
}

export default function MyComments({
  comments: initialComments,
}: MyCommentsProps) {
  const [comments, setComments] =
    useState(initialComments)

  const [deletingId, setDeletingId] =
    useState<number | null>(null)

  const [error, setError] = useState("")

  async function deleteComment(
    commentId: number
  ) {
    const confirmed = window.confirm(
      "Delete this comment? This cannot be undone."
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(commentId)
      setError("")

      const response = await fetch(
        "/api/comments/mine",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commentId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error(
          "Failed to delete comment"
        )
      }

      setComments((current) =>
        current.filter(
          (comment) =>
            comment.id !== commentId
        )
      )
    } catch (error) {
      console.error(error)

      setError(
        "Failed to delete comment."
      )
    } finally {
      setDeletingId(null)
    }
  }

  if (comments.length === 0) {
    return (
      <div
        className="
          rounded-2xl
          border border-[var(--border)]
          bg-[var(--surface)]
          p-8
        "
      >
        <p className="text-[var(--secondary)]">
          You haven&apos;t written any comments yet.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <p className="text-sm text-rose-600">
          {error}
        </p>
      )}

      {comments.map((comment) => (
        <article
          key={comment.id}
          className="
            rounded-2xl
            border border-[var(--border)]
            bg-[var(--surface)]
            p-6
          "
        >
          <div className="flex items-start justify-between gap-6">

            <Link
              href={`/posts/${comment.postId}`}
              className="
                min-w-0
                flex-1
                rounded-lg
                transition
                hover:bg-[var(--surface-soft)]
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
                  @{comment.author}
                </span>

                <span
                  className="
                    text-xs
                    text-[var(--muted)]
                  "
                >
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

              <p
                className="
                  mt-4
                  text-xs
                  font-medium
                  text-[var(--accent)]
                "
              >
                View conversation →
              </p>
            </Link>

            <button
              type="button"
              onClick={() =>
                deleteComment(comment.id)
              }
              disabled={
                deletingId === comment.id
              }
              className="
                shrink-0
                rounded-lg
                border border-[var(--border)]
                px-3 py-2
                text-sm
                text-[var(--secondary)]
                hover:border-rose-500/50
                hover:bg-rose-500/10
                hover:text-rose-600
                disabled:opacity-50
              "
            >
              {deletingId === comment.id
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>

          <div
            className="
              mt-5
              border-t
              border-[var(--border)]
              pt-4
              text-sm
              text-[var(--secondary)]
            "
          >
            ↑ {comment.votes}
          </div>
        </article>
      ))}
    </div>
  )
}