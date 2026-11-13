import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("JSESSIONID")

    if (!sessionId) {
      return Response.json(
        {
          error: {
            message: "Not logged in",
          },
        },
        {
          status: 401,
        }
      )
    }

    const response = await fetch(
      "http://localhost:8080/users/me",
      {
        headers: {
          Cookie: `JSESSIONID=${sessionId.value}`,
        },
        cache: "no-store",
      }
    )

    if (response.status === 401) {
      return Response.json(
        {
          error: {
            message: "Not logged in",
          },
        },
        {
          status: 401,
        }
      )
    }

    if (!response.ok) {
      throw new Error("Spring backend failed to load current user")
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
          message: "Failed to load current user",
        },
      },
      {
        status: 500,
      }
    )
  }
}