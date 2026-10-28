export async function POST(request: Request) {
    try {
        const body = await request.json()
        const {username, password} = body

        if(!username || !password) {
            return Response.json(
                {
                    error:{
                        message: "username and password are required",
                    },
                },
                {
                    status: 400,
                }
            )
        }

        const response = await fetch(
            "http://localhost:8080/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, 
                    password,
                }),
            }
        )

        if(response.status === 401){
            return Response.json(
                {
                    error: {
                        message: "Invalid username or password",
                    },
                },
                {
                    status: 401,
                }
            )
        }

        if (!response.ok) {
            throw new Error("Spring backend failed to log in user")
        }

        const user = await response.json()

        return Response.json({
            data: user,
        })
    } catch (error) {
        console.error(error)

        return Response.json(
            {
                error: {
                    message: "Failed to log in",
                },
            },
            {
                status: 500,
            }
        )
    }
}