export async function POST(request: Request) {
    try{
        const body = await request.json()
        const { username, password } = body
        
        if(!username || !password){
            return Response.json(
                {
                error: {
                    message: "Username and password are required",
                },
            },
            {
                status: 400,
            }
            )
        }
        const response = await fetch(
            "http://localhost:8080/users/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username, 
                    password,
                }),
            }
        )

        if(response.status === 409){
            return Response.json(
                {
                    error: {
                        message: "Username already exists",
                    },
                },
                {
                    status: 409,
                }
            )
        }

        if(!response.ok) {
            throw new Error("Spring backend failed to register user")
        }
        const user = await response.json()

        return Response.json(
            {
                data: user,
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
                    message: "Failed to register user",
                },
            },
            {
                status: 500,
            }
        )
    }
}