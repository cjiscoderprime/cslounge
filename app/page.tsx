///app is HTTP + pages
import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar"
import RightSidebar from "@/components/layout/RightSidebar"
import PostCard from "@/components/posts/PostCard"

import CreatePostForm from "@/components/posts/CreatePostForm"
import type {Lounge} from "@/types/lounge"

import CreateLoungeForm from "@/components/lounges/CreateLoungeForm"

type PostFeedItem = {
  id: number
  title: string
  content: string
  author: string
  lounge: string
  votes: number
  comments: number
}

export default async function Home(){

const response = await fetch("http://localhost:8080/hello",{
    cache: "no-store",
  })

  const message = await response.text()

  const postsResponse = await fetch("http://localhost:3000/api/posts", {
  cache: "no-store",
})

const postsJson: { data: PostFeedItem[] } = await postsResponse.json()
const posts = postsJson.data

const loungesResponse = await fetch("http://localhost:3000/api/lounges", {
  cache: "no-store",
})

const loungesJson: { data: Lounge[] } = await loungesResponse.json()
const lounges = loungesJson.data

  return (
    <>
      <Navbar />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-[220px_minmax(0,1fr)_280px] lg:px-6">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <main className="page-enter min-w-0">
          <section className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e61d3f]">
              CSLounge
            </p>

            <h1 className="mt-2 text-1xl font-bold tracking-tight text-white">
              Discussions from across the community
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-400">
              Explore conversations, share ideas, and connect with developers
              across different areas of computer science.
            </p>
          </section>

          <CreateLoungeForm />

          <CreatePostForm lounges={lounges} />

          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Feed
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  Latest Discussions
                </h2>
              </div>

              <span className="text-xs text-neutral-600">
                {posts.length} posts
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  title={post.title}
                  author={post.author}
                  lounge={post.lounge}
                  votes={post.votes}
                  comments={post.comments}
                />
              ))}
            </div>
          </section>
        </main>

        <div className="hidden lg:block">
          <RightSidebar />
        </div>
      </div>
    </>
  )
}
