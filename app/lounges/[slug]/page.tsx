import { notFound } from "next/navigation"
import Navbar from "@/components/layout/Navbar"
import Sidebar from "@/components/layout/Sidebar"
import RightSidebar from "@/components/layout/RightSidebar"
import PostCard from "@/components/posts/PostCard"

import { getLoungebySlug } from "@/lib/db/lounges"
import { getPostsByLoungeSlug } from "@/lib/db/posts"

type LoungePageProps = {
    params: Promise<{
        slug:string
    }>
}

export default async function LoungePage({
    params,
}: LoungePageProps){
    const {slug} = await params

    const [lounge, posts] = await Promise.all([
        getLoungebySlug(slug),
        getPostsByLoungeSlug(slug),
    ])

    if(!lounge){
        notFound()
    }
    return (
        <>
        <Navbar/>
        <div className="grid grid-cols-[220px_1fr_280px] gap-6 p-6">
            <Sidebar/>
        <main>
            <h1 className = "text-2xl font-bold">
                {lounge.name}
            </h1>
            
            <p className = "mt-2">
                Discussions in the {lounge.name} lounge.
            </p>
            <div className = "mt-6 flex flex-col gap-4">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard
                        key = {post.id}
                        title = {post.title}
                        author = {post.author}
                        lounge = {post.lounge}
                        votes = {post.votes}
                        comments = {post.comments}
                        />
                    ))
                ) : (
                    <p> No posts in this lounge yet</p>
                )}
            </div>
        </main>
        <RightSidebar/>
        </div>
        </>
    )
}