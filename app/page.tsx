///app is HTTP + pages
import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar"
import RightSidebar from "@/components/layout/RightSidebar"
import PostCard from "@/components/posts/PostCard"

import CreatePostForm from "@/components/posts/CreatePostForm"
import type {Lounge} from "@/types/lounge"
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
    <Navbar/>

    <div className = "grid grid-cols-[220px_1fr_280px] gap-6 p-6">
    <Sidebar/>

    <main>
      <h1 className = "text-2xl font-bold">Home</h1>

      <p className = "mt-2">
        Discussions from across CSLounge
      </p>

      <p className = "mt-2">
        Backend says: {message}
      </p>

      <CreatePostForm lounges={lounges}/>

      <div className = "mt-6 flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard
            key = {post.id}
            title = {post.title}
            author = {post.author}
            lounge = {post.lounge}
            votes = {post.votes}
            comments = {post.comments}
            />
        ))}
      
      </div>
    </main>

    <RightSidebar/>
    </div>
    </>
  )
}
