import { createPost, getPosts } from "@/lib/db/posts";

export async function GET(){
    try {
        const posts = await getPosts()

        return Response.json({
            data: posts,
        })
    } catch(error){
        console.error(error)

        return Response.json(
            {
                error:{
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
    try {
        const body = await request.json()

        const { title, content, loungeId } = body

        if (!title || !content || !loungeId ){
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
        
        const post = await createPost({
            authorId: "1",
            loungeId,
            title,
            content,
        })

        return Response.json(
            {
                data: post,
            },
            {
                status: 201,
            }
        )
    } catch (error){
        console.error(error)
    
    return Response.json(
        {
            error: {
                message: "Failed to create post",
            },
        },
        {
            status: 500,
        }
    )
    }
}