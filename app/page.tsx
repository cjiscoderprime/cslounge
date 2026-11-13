import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Link from "next/link"

import Navbar from "@/components/layout/Navbar"
import PostCard from "@/components/posts/PostCard"
import CreatePostForm from "@/components/posts/CreatePostForm"
import CreateLoungeForm from "@/components/lounges/CreateLoungeForm"

import type { Lounge } from "@/types/lounge"

type PostFeedItem = {
  id: number
  title: string
  content: string
  author: string
  lounge: string
  votes: number
  comments: number
}

export default async function Home() {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("JSESSIONID")

  if (!sessionId) {
    redirect("/login")
  }

  const authResponse = await fetch(
    "http://localhost:8080/users/me",
    {
      headers: {
        Cookie: `JSESSIONID=${sessionId.value}`,
      },
      cache: "no-store",
    }
  )

  if (!authResponse.ok) {
    redirect("/login")
  }

  const currentUser = await authResponse.json()

  const postsResponse = await fetch(
    "http://localhost:3000/api/posts",
    {
      cache: "no-store",
    }
  )

  const postsJson: { data: PostFeedItem[] } =
    await postsResponse.json()

  const posts = postsJson.data.slice(0, 10)

  const loungesResponse = await fetch(
    "http://localhost:3000/api/lounges",
    {
      cache: "no-store",
    }
  )

  const loungesJson: { data: Lounge[] } =
    await loungesResponse.json()

  const lounges = loungesJson.data

  return (
  <>
    <Navbar />

    <main className="mx-auto w-full max-w-7xl px-6 py-16">

      <section className="max-w-4xl">

        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[var(--secondary)]
          "
        >
          Developer community · Welcome back,{" "}
          <span className="text-[var(--accent)]">
            {currentUser.username}
          </span>
        </p>

        <h1
          className="
            mt-6
            text-5xl
            font-bold
            leading-[1.05]
            tracking-[-0.04em]
            text-[var(--foreground)]
            md:text-6xl
          "
        >
          What are developers talking
          <br />
          about{" "}
          <span className="text-[var(--accent)]">
            today?
          </span>
        </h1>

        <p
          className="
            mt-6
            max-w-3xl
            text-lg
            leading-8
            text-[var(--secondary)]
          "
        >
          Discover technical conversations,
          exchange ideas, and learn how other
          developers think through hard problems.
        </p>

        <details className="mt-8">

          <summary className="list-none">

            <span
              className="
                inline-flex
                cursor-pointer
                rounded-full
                bg-[var(--accent)]
                px-6 py-3
                text-sm
                font-semibold
                text-white
                hover:bg-[var(--accent-hover)]
              "
            >
              Start a discussion →
            </span>

          </summary>

          <div className="mt-6 max-w-3xl">
            <CreatePostForm lounges={lounges} />
          </div>

        </details>

      </section>

      <div
        className="
          mt-16
          grid
          gap-9
          lg:grid-cols-[minmax(0,1fr)_330px]
        "
      >

        <section>

          <div className="mb-5 flex items-center justify-between">

            <h2
              className="
                text-3xl
                font-semibold
                tracking-tight
                text-[var(--foreground)]
              "
            >
              Latest discussions
            </h2>

            <span className="text-sm text-[var(--secondary)]">
              {posts.length} posts
            </span>

          </div>

          <div className="flex flex-col gap-4">

            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                author={post.author}
                lounge={post.lounge}
                votes={post.votes}
                comments={post.comments}
              />
            ))}

          </div>

        </section>

        <aside>

          <section
            className="
              overflow-hidden
              rounded-2xl
              border border-[var(--border)]
              bg-[var(--surface)]
            "
          >

            <div
              className="
                border-b
                border-[var(--border)]
                bg-[var(--surface-soft)]
                px-5 py-4
              "
            >
              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-[var(--secondary)]
                "
              >
                <span className="mr-2 text-[var(--accent)]">
                  ●
                </span>
                Trending lounges
              </p>
            </div>

            <div className="p-4">

              {lounges
                .slice(0, 5)
                .map((lounge, index) => (

                  <Link
                    key={lounge.id}
                    href={`/lounges/${lounge.slug}`}
                    className="
                      flex
                      items-center
                      gap-4
                      rounded-xl
                      px-3 py-4
                      hover:bg-[var(--surface-soft)]
                    "
                  >

                    <span
                      className="
                        font-mono
                        text-sm
                        text-[var(--accent)]
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="
                        text-sm
                        font-medium
                        text-[var(--foreground)]
                      "
                    >
                      {lounge.name}
                    </span>

                  </Link>

                ))}

            </div>

          </section>

        </aside>

      </div>

    </main>
  </>
)
}