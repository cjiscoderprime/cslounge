export async function GET(){
    try{
        const response = await fetch("http://localhost:8080/lounges", {
            cache: "no-store",
        })

        if(!response.ok){
            throw new Error("Spring lounge request failed") 
        }
        const lounges = await response.json()

        return Response.json({
            data: lounges,
        })
    } catch(error){
        console.error(error)

        return Response.json(
            {
                error: {
                    message: "Failed to load lounges",
                },
            },
            {
                status: 500,
            }
        )
    }
}

export async function POST(request:Request){
    try{
        const body = await request.json()
        const { name, slug } = body

        if(!name || !slug){
            return Response.json(
                {
                    error: {
                        message: "Name and slug are required",
                    },
                },
                {
                    status: 400,
                }
            )
        }
        const response = await fetch("http://localhost:8080/lounges", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, 
                slug,
            }),            
        })
        if(!response.ok){
            throw new Error("Spring backend failed to create lounge")
        }

        const lounge = await response.json()

        return Response.json(
            {
                data: lounge,
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
                message: "Failed to create lounge",
            },
        },
        {
            status: 500,
        }
    )
}
}