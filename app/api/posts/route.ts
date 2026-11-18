import { cookies } from "next/headers"

import { BACKEND_URL } from "@/lib/backend"

export async function GET(request: Request){
    try{
        const { searchParams } = new URL(request.url)
        const slug  = searchParams.get("slug")

        const springUrl = slug
            ?`${BACKEND_URL}/posts/by-lounge?slug=${encodeURIComponent(slug)}`
            :`${BACKEND_URL}/posts`

        const response = await fetch(springUrl, {
            cache: "no-store",
        })

        if(!response.ok){
            throw new Error("Spring backend failed to load posts")
        }
        const posts = await response.json()

        return Response.json({
            data: posts,
        })
    } catch(error){
        console.error(error)
        return Response.json(
            {
                error: {
                    message: "Failed to load posts",
                },
            },
            {
                status: 500,
            }
        )
    }
}

export async function POST(request: Request){
    try{
        const body = await request.json()

        const { title, loungeId, content} = body

        if (!title || !content || !loungeId){
            return Response.json(
                {
                    error: {
                        message: "title, content and loungeId are required",
                    },
                },
                {
                    status: 400,
                }
            )
        }

    const cookieStore = await cookies()
    const sessionId = cookieStore.get("JSESSIONID")

    if (!sessionId) {
    return Response.json(
        {
            error: {
                message: "You must be logged in to create a post",
            },
        },
        {
            status: 401,
        }
        )
    }    

    const response = await fetch(`${BACKEND_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Cookie: `JSESSIONID=${sessionId.value}`,
        },
        body: JSON.stringify({
            loungeId: Number(loungeId),
            title,
            content
        }),
    })

    if (response.status == 401) {
        return Response.json(
            {
                error: {
                    message: "You must be logged in to create a post.",
                },
            },
            {
                status: 401,
            }
        )
    }

    if(!response.ok){
        throw new Error("Spring backend failed to create post")
    }

    const post = await response.json()

    return Response.json(
        {
            data: post,
        },
        {
            status: 201,
        }
    )
} catch(error){
    console.error(error)

    return Response.json(
        {
            error:{
                message: "Failed to create post",
            },
        },
        {
            status: 500,
        }
    )
    }
}