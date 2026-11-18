import { notFound } from "next/navigation"

import Navbar from "@/components/layout/Navbar"
import PostInteractions from "@/components/posts/PostInteractions"

import { BACKEND_URL } from "@/lib/backend"

type PostDetail = {
  id: number
  title: string
  content: string
  author: string
  lounge: string
  votes: number
  comments: number
}

export default async function PostPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const response = await fetch(
    `${BACKEND_URL}/api/posts/${id}`,
    {
      cache: "no-store",
    }
  )

  if (response.status === 404) {
    notFound()
  }

  if (!response.ok) {
    throw new Error("Failed to load post")
  }

  const result: { data: PostDetail } = await response.json()
  const post = result.data

  return (
    <>
        <Navbar />

        <main className="mx-auto w-full max-w-4xl px-6 py-14">

        <PostInteractions
            postId={post.id}
            initialVotes={post.votes}
            initialCommentCount={post.comments}
            lounge={post.lounge}
            author={post.author}
            title={post.title}
            content={post.content}
        />
    

        </main>
    </>
  )
}