type LoungeRouteProps = {
    params: Promise<{
        slug: string
    }>
}

export async function GET(
    request: Request,
    { params } : LoungeRouteProps 
) {
    try{
        const { slug } = await params
    
        const response = await fetch(
            `http://localhost:8080/lounges/${slug}`,
            {
                cache: "no-store",
            }
    )

    if(response.status === 404) {
        return Response.json(
            {
                error: {
                    message: "Lounge not found",
                },
            },
            {
                status: 404,
            }
        )
    }
    if(!response.ok){
        throw new Error("Spring lounge request failed")
    }
    const lounge = await response.json()

    return Response.json({
        data: lounge,
    })
} catch (error) {
    console.error(error)

    return Response.json(
        {
            error: {
                message: "Failed to load lounge",
            },
        },
        {
            status: 500,
        }
    )
    }
}
    