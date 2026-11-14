import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import Navbar from "@/components/layout/Navbar"
import MyPosts from "@/components/account/MyPosts"
import MyComments from "@/components/account/MyComments"

type User = {
  id: number
  username: string
}

type Post = {
  id: number
  title: string
  content: string
  author: string
  lounge: string
  votes: number
  comments: number
}

type Comment = {
  id: number
  postId: number
  content: string
  author: string
  createdAt: string
  votes: number
}

export default async function AccountPage() {
  const cookieStore = await cookies()
  const sessionId =
    cookieStore.get("JSESSIONID")

  if (!sessionId) {
    redirect("/login")
  }

  const [
    userResponse,
    postsResponse,
    commentsResponse,
  ] = await Promise.all([
    fetch(
      "http://localhost:8080/users/me",
      {
        headers: {
          Cookie: `JSESSIONID=${sessionId.value}`,
        },
        cache: "no-store",
      }
    ),

    fetch(
      "http://localhost:8080/posts/mine",
      {
        headers: {
          Cookie: `JSESSIONID=${sessionId.value}`,
        },
        cache: "no-store",
      }
    ),

    fetch(
      "http://localhost:8080/comments/mine",
      {
        headers: {
          Cookie: `JSESSIONID=${sessionId.value}`,
        },
        cache: "no-store",
      }
    ),
  ])

  if (!userResponse.ok) {
    redirect("/login")
  }

  if (!postsResponse.ok) {
    throw new Error(
      "Failed to load account posts"
    )
  }

  if (!commentsResponse.ok) {
    throw new Error(
      "Failed to load account comments"
    )
  }

  const user: User =
    await userResponse.json()

  const posts: Post[] =
    await postsResponse.json()

  const comments: Comment[] =
    await commentsResponse.json()

  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-5xl px-6 py-14">
        <section>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.22em]
              text-[var(--secondary)]
            "
          >
            Account
          </p>

          <h1
            className="
              mt-4
              text-4xl
              font-bold
              tracking-tight
              text-[var(--foreground)]
            "
          >
            @{user.username}
          </h1>

          <p className="mt-3 text-[var(--secondary)]">
            Manage your discussions and activity.
          </p>
        </section>

        <section className="mt-12">
          <div
            className="
              mb-6
              flex
              items-end
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--accent)]
                "
              >
                Activity
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  text-[var(--foreground)]
                "
              >
                Your posts
              </h2>
            </div>

            <span className="text-sm text-[var(--secondary)]">
              {posts.length}{" "}
              {posts.length === 1
                ? "post"
                : "posts"}
            </span>
          </div>

          <MyPosts initialPosts={posts} />
        </section>

        <section className="mt-16">
          <div
            className="
              mb-6
              flex
              items-end
              justify-between
              gap-4
            "
          >
            <div>
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--accent)]
                "
              >
                Activity
              </p>

              <h2
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  text-[var(--foreground)]
                "
              >
                Your comments
              </h2>
            </div>

            <span className="text-sm text-[var(--secondary)]">
              {comments.length}{" "}
              {comments.length === 1
                ? "comment"
                : "comments"}
            </span>
          </div>

          <MyComments comments={comments} />
        </section>
      </main>
    </>
  )
}