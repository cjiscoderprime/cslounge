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
    } catch (error){
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