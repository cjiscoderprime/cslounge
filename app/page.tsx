///app is HTTP + pages
import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar"
import RightSidebar from "@/components/layout/RightSidebar"
import PostCard from "@/components/posts/PostCard"
import { getPosts } from "@/lib/db/posts"
import CreatePostForm from "@/components/posts/CreatePostForm"
import { getLounges } from "@/lib/db/lounges"

export default async function Home(){
  const [posts, lounges] = await Promise.all([
    getPosts(),
    getLounges(),
  ])

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
