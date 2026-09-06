export async function GET(request: Request){
    try{
        const { searchParams } = new URL(request.url)
        const slug  = searchParams.get("slug")

        const springUrl = slug
            ?`http://localhost:8080/posts/by-lounge?slug=${encodeURIComponent(slug)}`
            :"http://localhost:8080/posts"

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
    const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            authorId: 1,
            loungeId: Number(loungeId),
            title,
            content
        }),
    })
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