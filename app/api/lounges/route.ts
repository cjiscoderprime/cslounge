import { getLounges } from "@/lib/db/lounges";

export async function GET(){
    try{
        const lounges = await getLounges()

        return Response.json({
            data: lounges,
        })
    } catch(error){
        console.error(error)

        return Response.json(
            {
            error:{
                message: "Failed to load lounges",
            },
        },
        {
            status: 500,
        }
    )
    }
}
