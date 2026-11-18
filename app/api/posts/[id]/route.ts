import { BACKEND_URL } from "@/lib/backend"

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const {id} = await params

        const response = await fetch(
            `${BACKEND_URL}/posts/${id}`,
            {
                cache: "no-store",
            }
        )

        if (response.status === 404) {
            return Response.json(
                {
                    error: {
                        message: "Post Not Found",
                    },
                },
                {
                    status: 404,
                }
            )
        }

        if (!response.ok) {
            throw new Error("Spring backend failed to load post")
        }

        const post = await response.json()

        return Response.json({
            data: post,
        })
    } catch (error) {
        console.error(error)

        return Response.json({
            error: {
                message: "Failed to make post",
            },
        },
        {
            status: 500,
        }
    )
    }
}