"use client"

import Link from "next/link"
import { useState } from "react"

type Post = {
  id: number
  title: string
  content: string
  author: string
  lounge: string
  votes: number
  comments: number
}

type MyPostsProps = {
  initialPosts: Post[]
}

export default function MyPosts({
  initialPosts,
}: MyPostsProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [deletingId, setDeletingId] =
    useState<number | null>(null)
  const [error, setError] = useState("")

  async function deletePost(postId: number) {
    const confirmed = window.confirm(
      "Delete this post? This cannot be undone."
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(postId)
      setError("")

      const response = await fetch(
        "/api/posts/mine",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to delete post")
      }

      setPosts((current) =>
        current.filter(
          (post) => post.id !== postId
        )
      )
    } catch (error) {
      console.error(error)
      setError("Failed to delete post.")
    } finally {
      setDeletingId(null)
    }
  }

  if (posts.length === 0) {
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
          You haven&apos;t created any posts yet.
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

      {posts.map((post) => (
        <article
          key={post.id}
          className="
            rounded-2xl
            border border-[var(--border)]
            bg-[var(--surface)]
            p-6
          "
        >
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.14em]
                  text-[var(--accent)]
                "
              >
                {post.lounge}
              </p>

              <Link
                href={`/posts/${post.id}`}
                className="
                  mt-2
                  block
                  text-xl
                  font-semibold
                  text-[var(--foreground)]
                  hover:text-[var(--accent)]
                "
              >
                {post.title}
              </Link>

              <p
                className="
                  mt-3
                  line-clamp-2
                  text-sm
                  leading-6
                  text-[var(--secondary)]
                "
              >
                {post.content}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                deletePost(post.id)
              }
              disabled={
                deletingId === post.id
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
              {deletingId === post.id
                ? "Deleting..."
                : "Delete"}
            </button>
          </div>

          <div
            className="
              mt-5
              flex
              items-center
              gap-5
              border-t
              border-[var(--border)]
              pt-4
              text-sm
              text-[var(--secondary)]
            "
          >
            <span>
              ↑ {post.votes}
            </span>

            <span>
              {post.comments}{" "}
              {post.comments === 1
                ? "comment"
                : "comments"}
            </span>
          </div>
        </article>
      ))}
    </div>
  )
}