import { cookies } from "next/headers"
import { BACKEND_URL } from "@/lib/backend"

export async function POST() {
    try {
        const cookieStore = await cookies()
        const sessionId = cookieStore.get("JSESSIONID")

        if (sessionId) {
            await fetch(
                `${BACKEND_URL}/users/logout`,
                {
                    method: "POST",
                    headers: {
                        Cookie: `JSESSIONID=${sessionId.value}`,
                    },
                }
            )
        }

        const response = Response.json({
            data: {
                message: "Logged out",
            },
        })

        response.headers.set(
            "Set-Cookie",
            "JSESSIONID=; Path=/; HttpOnly; Max-Age=0"
        )

        return response
    } catch (error) {
        console.error(error)

        return Response.json(
            {
                error: {
                    message: "Failed to log out",
                },
            },
            {
                status: 500,
            }
        )
    }
}